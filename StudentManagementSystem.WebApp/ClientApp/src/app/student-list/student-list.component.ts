import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students;
  id: number;
  constructor(private studentService:StudentService,private router: Router) { }

  ngOnInit() {
    this.getDetails();
  }
  getDetails(){
    this.studentService.getStudent().subscribe(res=>{this.students=res;
      console.log(this.students)
    });
    
  }
  delete(event){
    this.id = event.id;
    this.studentService.delete(this.id).subscribe(res=>{this.students=res;
      console.log(this.students)
    });
    
  }
  studentToEdit(event){
    this.id = event.id;
    this.router.navigate(['/studentForm',this.id]);
    console.log(this.id);
    

  }
  addStudent(){
    this.router.navigate(['/studentForm']);
  }

}
