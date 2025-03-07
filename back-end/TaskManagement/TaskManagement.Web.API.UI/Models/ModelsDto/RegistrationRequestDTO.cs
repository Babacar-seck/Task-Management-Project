using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Web.API.UI.Models.ModelsDto
{
    public class RegistrationRequestDTO
    {
        [Required]
        public string Name { get; set; }
        [Required, EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
