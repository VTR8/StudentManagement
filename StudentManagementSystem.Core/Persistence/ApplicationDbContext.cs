using JetBrains.Annotations;
using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Core.Domain.StudentModule;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Core.Persistence
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

            public DbSet<Student> Students {get; set;}
    }
}
