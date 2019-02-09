using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Core.Domain.StudentModule
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Department { get; set; }
        public int Roll { get; set; }

        public Student()
        {

        }

        public Student(string name, string department, int roll)
        {
            Name = name;
            Department = department;
            Roll = roll;
        }

        public void Modify(string name, string department, int roll)
        {
            Name = name;
            Department = department;
            Roll = roll;
        }
    }

}
