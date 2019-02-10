import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  baseUrl="assets/data.json";
  //baseUrl="http://localhost:51765/api/student"
  constructor(private http: HttpClient) { }

  getStudent(){
    return this.http.get(this.baseUrl);
  }
  save(data,id:number){
    if(id==0){
      return this.http.post(this.baseUrl,data);
    }
    else{
      const url = `${this.baseUrl}/${id}`;
      return this.http.put(url,data);
    }
  }
  delete(id: number){
     const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
  getOne(id: number){
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
