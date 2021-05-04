using EmployeesAPI.Data;
using EmployeesAPI.Models.Employees;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesAPI.Controllers
{

    [Route("employees")]
    public class EmployeesController : ControllerBase
    {
        private readonly EmployeesDataContext _context;

        public EmployeesController(EmployeesDataContext context)
        {
            _context = context;
        }


        [HttpHead("{id:int}")]
        public async Task<ActionResult> CheckForEmployee(int id)
        {
            var any = await _context.Employees.Where(e => e.Id == id && e.IsActive).AnyAsync();

            return any ? Ok() : NotFound();
        }

        [HttpHead("emails/{emailAddress}")]
        public async Task<ActionResult> CheckForEmailAddres(string emailAddress)
        {
            var any = await _context.Employees.Where(e => e.IsActive && e.EMail == emailAddress).AnyAsync();

            return any ? Ok() : NotFound();
        }

        // GET /
        [HttpGet]
        public async Task<ActionResult<GetEmployeesResponse>> GetAllEmployees()
        {
       
            var employees = await _context.Employees
                .Where(e => e.IsActive)
                .Select(e => new GetEmployeeSummaryResponse
                {
                    Id = e.Id,
                    Department = e.Department,
                    FirstName = e.FirstName,
                    LastName = e.LastName
                }).ToListAsync();


            var response = new GetEmployeesResponse();
            response.Data = employees;
            return Ok(response);
        }


        // GET /{id}

        [HttpGet("{id:int}")]
        public async Task<ActionResult> GetAnEmployee(int id)
        {
            var response = await _context.Employees
                .Where(e => e.Id == id && e.IsActive)
                .Select(e => new GetEmployeeDetailsResponse
                {
                    Id = e.Id,
                    FirstName = e.FirstName,
                    LastName = e.LastName,
                    Department = e.Department,
                    Email = e.EMail,
                    Phone = e.Phone

                }).SingleOrDefaultAsync();

            if(response == null)
            {
                return NotFound();
            } else
            {
                return Ok(response);
            }
            


        }

        // POST /
    }
}
