using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Web.API.UI.Models.ModelsDto
{
    public class LogoutRequestDTO
    {
        [Required]
        public string Email { get; set; }
   
    }
}
