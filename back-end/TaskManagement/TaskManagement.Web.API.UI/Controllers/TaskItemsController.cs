using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using TaskManagement.Web.API.UI.Data;
using TaskManagement.Web.API.UI.Models;
using TaskManagement.Web.API.UI.Models.ModelsDto;

namespace TaskManagement.Web.API.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskItemsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        private readonly ILogger<AuthController> _logger;

        public TaskItemsController(ApplicationDbContext context, ILogger<AuthController> logger)
        {
            _context = context;
            _logger = logger;
        }


        /// <summary>
        /// Retrieve the All Tasks for the User authenticate
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IActionResult> GetTaskItems()
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var tasks = await _context.TaskItems.Where(t => t.UserId == userId).ToListAsync();

                return Ok(tasks ?? null);

            }
            catch (Exception ex)
            {
                string message = "Error during the retrieving of the task: ";
                _logger.LogError($"{message}{ex.Message}");
                return StatusCode(500, message);
            }
        }

        /// <summary>
        /// Retrieve a TaskItem By Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<IActionResult> GetTaskItem(int id)
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var task = await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);
                if (task == null)
                    return NotFound(new { message = "Tâche non trouvée" });

                return Ok(task);
            }
            catch (Exception ex)
            {
                string message = "Error during the retrieving of the task: ";
                _logger.LogError($"{message}{ex.Message}");
                return StatusCode(500, message);
            }

        }

        /// <summary>
        /// Create a new TaskItem
        /// </summary>
        /// <param name="task"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<IActionResult> CreateTaskItem([FromBody] TaskItemDTO task)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                task.UserId = userId;

                TaskItem taskItem = new TaskItem
                {
                    Title = task.Title,
                    Description = task.Description,
                    DueDate = task.DueDate,
                    IsCompleted = task.IsCompleted,
                    UserId = userId
                };

                _context.TaskItems.Add(taskItem);
                await _context.SaveChangesAsync();

                _logger.LogInformation($"new taskItem added: {taskItem.Id}");
                return CreatedAtAction(nameof(GetTaskItem), new { id = taskItem.Id }, taskItem);
            }
            catch (Exception ex)
            {
                string message = "Error during the creation of the task: ";
                _logger.LogError($"{message}{ex.Message}");
                return StatusCode(500, message);
            }

        }

        /// <summary>
        /// update the task by Id
        /// </summary>
        /// <param name="id"></param>
        /// <param name="request"></param>
        /// <returns></returns>
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTaskItem(int id, [FromBody] TaskItemDTO request)
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
                var task = await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

                if (task == null)
                {
                    _logger.LogWarning($"Task not found");
                    return NotFound(new { message = "Task Not Found" });
                }

                task.Title = request.Title;
                task.Description = request.Description;
                task.DueDate = request.DueDate;
                task.IsCompleted = request.IsCompleted;

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {

                string message = "Error during the update of the task: ";
                _logger.LogError($"{message}{ex.Message}");
                return StatusCode(500, message);
            }

        }

        /// <summary>
        /// Delete The task by id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskItem(int id)
        {
            try
            {
                int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);

                var task = await _context.TaskItems.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

                if (task == null)
                {
                    _logger.LogWarning($"Task not found");
                    return NotFound(new { message = "Task not found" });

                }

                _context.TaskItems.Remove(task);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                string message = "Error during the delete of the task: ";
                _logger.LogError($"{message}{ex.Message}");
                return StatusCode(500, message);
            }

        }
    }
}
