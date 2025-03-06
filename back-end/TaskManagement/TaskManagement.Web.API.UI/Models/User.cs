using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TaskManagement.Web.API.UI.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [JsonIgnore]
        public string PasswordHash { get; set; }
        public DateTime RegistrationDate { get; set; } = DateTime.UtcNow;
        public ICollection<TaskItem> Tasks { get; set; } 
    }
}
