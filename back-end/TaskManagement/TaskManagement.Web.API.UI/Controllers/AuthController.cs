using Azure;
using Azure.Core;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using TaskManagement.Web.API.UI.Data;
using TaskManagement.Web.API.UI.Models;
using TaskManagement.Web.API.UI.Models.ModelsDto;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace TaskManagement.Web.API.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        private readonly ILogger<AuthController> _logger;
        public AuthController(IConfiguration configuration, ApplicationDbContext context, ILogger<AuthController> logger)
        {
            _configuration = configuration;
            _context = context;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpPost]
        [Route("Login")]
        public async Task<IActionResult> LoginAsync([FromBody] LoginRequestDTO login, HttpResponseMessage response)
        {
            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Login attempt with invalid data");
                return BadRequest(ModelState);
            }
            try
            {
                User? user = _context.Users.SingleOrDefault(x => x.Email == login.Email);

                if (user == null || !BCrypt.Net.BCrypt.Verify(login.Password, user.PasswordHash))
                {
                    string message = "Email or password not correct";
                    _logger.LogWarning($" {message} {login.Email}");
                    return Unauthorized(new { message });
                }

                var token = GenerateToken(user);
                if (user.RefreshTokenExpiryTime.HasValue && user.RefreshTokenExpiryTime.Value >= DateTime.Now)
                {
                    user.RefreshToken = GenerateRefreshTokenString();
                    user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(3);

                    _context.Users.Update(user);
                    await _context.SaveChangesAsync();
                }
           
                return Ok(new { user, token });

            }
            catch (Exception ex)
            {
                string message = "Error during the login: ";
                _logger.LogError($"{message}{ex.Message}");
                return StatusCode(500, message);
            }
        }
        /// <summary>
        /// Regiter an user
        /// </summary>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPost("Register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegistrationRequestDTO request)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            try
            {
                var existingUser = await _context.Users.FirstOrDefaultAsync(x => x.Email.Equals(request.Email));
                if (existingUser != null)
                {
                    _logger.LogWarning($"failure during the registration : Email is alredy exist ({request.Email})");
                    return BadRequest(new { Message = "ths email is already exist" });

                }

                var newUser = new User
                {
                    Email = request.Email,
                    Name = request.Name,
                    PasswordHash = BCrypt.Net.BCrypt.HashPassword(request.Password)
                };
                _context.Users.Add(newUser);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"new user added: {newUser.Email}");
                return Ok(new { message = "Registration success!" });

            }
            catch (Exception ex)
            {
                string message = "Error during the registration: ";
                _logger.LogError($"{message}{ex.Message}");
                return StatusCode(500, message);
            }

        }

        /// <summary>
        /// Allos to refresh the token
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("RefreshToken")]
        public async Task<IActionResult> RefreshAsync([FromBody] RefreshTokenModelDTO model)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(x => x.Email.Equals(model.Email));

                if (user == null)
                    return Unauthorized();

                string newAccessToken = GenerateToken(user);
                string newRefreshToken = GenerateRefreshTokenString();

                user.RefreshToken = newRefreshToken;
                user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(3);

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { user, newAccessToken });
            }
            catch (Exception)
            {

                throw;
            }

        }

        /// <summary>
        /// Logout for the user login
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost("Logout")]
        public async Task<IActionResult> LogoutAsync([FromBody] LogoutRequestDTO model)
        {
            try
            {
                var user = _context.Users.FirstOrDefault(x => x.Email.Equals(model.Email));
                if (user == null)
                {
                    return BadRequest("Invalid request");
                }

                user.RefreshToken = null;
                user.RefreshTokenExpiryTime = DateTime.UtcNow;

                _context.Users.Update(user);
                await _context.SaveChangesAsync();

                return Ok(new { Message = "Successfully logged out" });

            }
            catch (Exception ex)
            {
                string message = "Error during the logout. ";
                _logger.LogError($"{message}{ex.Message}");
                return StatusCode(500, message);
            }
        }

        //Generate a refresh token
        private string GenerateRefreshTokenString()
        {
            var randomNumber = new byte[64];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(randomNumber);
            }
            return Convert.ToBase64String(randomNumber);
        }

        // Create method to genrate Token
        private string GenerateToken(User user)
        {

            SymmetricSecurityKey? securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            SigningCredentials? credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                new Claim(JwtRegisteredClaimNames.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddHours(1),
                    signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
