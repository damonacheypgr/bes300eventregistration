using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesAPI.Models.Employees
{
    public class GetEmployeesResponse
    {

        public IList<GetEmployeeSummaryResponse> Data { get; set; }
    }

    public class GetEmployeeSummaryResponse
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Department { get; set; }
    }

}


