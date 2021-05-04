using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeesAPI.Data
{
    public class EmployeesDataContext : DbContext
    {

        public EmployeesDataContext(DbContextOptions<EmployeesDataContext> options) : base(options)
        {

        }

        public DbSet<Employee> Employees { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Employee>()
                  .Property(e => e.Salary)
                  .HasPrecision(16, 3);
            modelBuilder.Entity<Employee>()
                   .Property(e => e.FirstName)
                   .HasMaxLength(200);
        }
    }
}
