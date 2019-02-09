using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Core.Domain.StudentModule;
using StudentManagementSystem.Core.Persistence;

namespace StudentManagementSystem.WebApp.Controllers
{
    [Produces("application/json")]
    [Route("api/student")]
    public class StudentController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Student> _dbSet;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
            _dbSet = context.Set<Student>();
        }

       [HttpGet]

       public async Task<IEnumerable<Student>> GetStudents(){
           var students = await _context.Students.ToListAsync();
           return students.ToList();
       }

        [HttpGet("{id}")]
        public async Task<Student> GetStudentById(int id){

            var student = await _context.Students.SingleOrDefaultAsync();
            return student;
        }  

        [HttpPost]

        public async Task<IActionResult> CreateStudent([FromBody] Student model) {
            var student = new Student(model.Name, model.Department, model.Roll);
            _dbSet.Add(student);
            await _context.SaveChangesAsync();
            return Ok("Saved Successfully");
              }

        [HttpPut("{id}")]

        public async Task<IActionResult> UpdateStudent(int id, [FromBody] Student model){

            if(!ModelState.IsValid)
            return BadRequest(ModelState);

            var studentFromDb = await _context.Students.SingleOrDefaultAsync(s=> s.Id == id);
            
            if((studentFromDb==null))
            {return NotFound();}
            
            studentFromDb.Modify(model.Name, model.Department, model.Roll);
            await _context.SaveChangesAsync();
            return Ok("updated");
}

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id){
            var studentFromDb = await _context.Students.SingleOrDefaultAsync(s=> s.Id == id);

            if(studentFromDb == null)
            {
                return NotFound();
            }
            _dbSet.Remove(studentFromDb);
            await _context.SaveChangesAsync();
            return Ok("Deleted");
        }

    }
}