using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskManagement.Web.API.UI.Models
{
    public class User
    {
        [Key]
        public int? Id { get; set; }
        [Required]
        public string Name { get; set; }

        [Required, EmailAddress(ErrorMessage = "Invalid Email Address")]
        public string Email { get; set; }
        [Required]
        public string PasswordHash { get; set; }
        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;

        public string? RefreshToken { get; set; } 
        public DateTime? RefreshTokenExpiryTime { get; set; }

        public ICollection<TaskItem>? Tasks { get; set; } 
    }
}
