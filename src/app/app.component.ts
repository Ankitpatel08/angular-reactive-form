import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Ankit', 'Akshay'];
  
  constructor() {

  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],  this.forbiddenEmails),
      }),
      'gender': new FormControl('male'),
      hobbies: new FormArray([])
    });

    /* this.signupForm.valueChanges.subscribe((value)=> {
      console.log(value);
    }); */

    this.signupForm.statusChanges.subscribe((status) => {
      console.log(status);
    });

    this.signupForm.setValue({
      'userData': {
        'username': 'Test',
        'email': 'test@test.com'
      },
      gender: 'male',
      hobbies: []
    });

    this.signupForm.patchValue({
      'userData': {
        'username': 'test 1'
      }
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);

    this.signupForm.reset();
  }

  AddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbiddenNames(control: FormControl): {[s: string] : boolean} {
    if (this.forbiddenUsernames.indexOf(control.value) !== -1) {
      return {
        'nameisForbidden': true
      };
    }  else {
      return null;
    }
  } 

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'a@a.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      }, 1000);
    });
    return promise;
  }
}
