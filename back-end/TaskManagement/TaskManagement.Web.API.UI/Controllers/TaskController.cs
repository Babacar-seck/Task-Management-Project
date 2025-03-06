using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using TaskManagement.Web.API.UI.Data;
using TaskManagement.Web.API.UI.Models;

namespace TaskManagement.Web.API.UI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TaskController(ApplicationDbContext context) {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        [Route("GetData")]
        public string GetData()
        {
            return "Authencated with JWT";
        }


        [HttpGet]
        [Route("GetDetails")]
        public string GetDetails()
        {
            return "Authencated without JWT";
        }

        [Authorize]
        [HttpPost]
        [Route("AddUser")]
        public string AddUser(User user)
        {
            return "User Added with userName" + user.Name;
        }



        [HttpPost]
        public async Task<IActionResult> CreateTask(TaskItem task)
        {
            //var userId = _context.Users.FirstOrDefault(x => x.Id == task.UserId);
            if (task == null)
            {

            
            }
            return CreatedAtAction(nameof(CreateTask), task);
        }
    }
}
