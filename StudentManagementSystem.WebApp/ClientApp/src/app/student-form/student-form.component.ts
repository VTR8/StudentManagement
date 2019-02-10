import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  student;
  id: number;
  students;
  studentForm : FormGroup;

  constructor( private studentService:StudentService,private fb:FormBuilder,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.studentForm = this.newForm();
  this.route.params.subscribe(params => {
    this.id = params['id'];
    this.getStudent(this.id);
  });
  }

  newForm():FormGroup{
    return this.fb.group({
      name: "",
      rollNo: "",
      address : ""
           
  });
  }

  private getStudent(id):void{
    this.studentService.getOne(id)
    .subscribe(res=>{
      this.student=res;
    this.onStudentRetrieved(this.student)}
    );
  }
  private onStudentRetrieved(student){
  
    this.students = student;
  
     if(this.id == 0){
       this.studentForm = this.newForm();
     }
     else
     {
      
      this.studentForm.patchValue({
          name: this.student.name,
          rollNo: this.student.rollNo,
          Address: this.student.Address
  
      
  });
  
    }
  
  
  }

  getDetails(){
    this.studentService.getStudent().subscribe(res=>{this.students=res;
      console.log(this.students)
    });
    
  }
  
  saveStudentForm(): void {
    if (this.studentForm.valid) {

        let p = Object.assign({},this.studentForm.value);
        this.studentService.save(p, this.id)
            .subscribe(() => this.onSaveComplete());
            this.studentForm.reset();

    }


    else if (!this.studentForm.dirty) {
        this.onSaveComplete();
    }
}
private onSaveComplete(): void {
  this.studentForm.reset();
        this.router.navigate(['/studentList']);
}
}
