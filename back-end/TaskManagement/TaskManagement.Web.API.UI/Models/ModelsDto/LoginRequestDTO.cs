﻿using System.ComponentModel.DataAnnotations;

namespace TaskManagement.Web.API.UI.Models.ModelsDto
{
    public class LoginRequestDTO
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
