using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesAPI.Models.Employees
{
    // C# 9 - .NET 5.
    public record GetEmployeeDetailsResponse
    {
        public int Id { get; init; }
        public string FirstName { get; init; }
        public string LastName { get; init; }
        public string Department { get; init; }
        public decimal Salary { get; init; }
        public string Email { get; init; }
        public string Phone { get; init; }
    }

    // public record GetEmployeeDetailsResponse2(int Id, string FirstName, string LastName, string Department);
}
