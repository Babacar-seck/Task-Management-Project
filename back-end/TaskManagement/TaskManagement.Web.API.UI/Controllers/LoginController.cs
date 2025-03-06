using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using TaskManagement.Web.API.UI.Models;

namespace TaskManagement.Web.API.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LoginController : ControllerBase
    {
        private IConfiguration _configuration;
        public LoginController(IConfiguration configuration)
        {
            _configuration = configuration; 
        }


        private User AuthencateUser(User user)
        {
            User _user = null;
            if (user.Name == "admin" && user.PasswordHash == "12345") {
                _user = new User { Name = "Babacar", PasswordHash = "12345"};
            }
            return _user;
        }

        // Create method to genrate Token
        private string GenerateToken(User user)
        {
            SymmetricSecurityKey? securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            SigningCredentials? credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                    _configuration["Jwt:Issuer"],
                    _configuration["Jwt:Issuer"],
                    null,
                    expires: DateTime.Now.AddMinutes(60),
                    signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Signing(User user)
        {
            IActionResult response = Unauthorized();
            var _user = AuthencateUser(user);
            if (_user != null)
            {
                var token = GenerateToken(user);
                response = Ok(new { token });

            }  
            return response;
        }
    }
}
