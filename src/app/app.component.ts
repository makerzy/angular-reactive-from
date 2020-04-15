import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from '@angular/forms';
import { forbiddenNameValidator } from './shared/user-name.validator';
import { pwdValidator } from './shared/pwd-validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'reactive-form';

  //Reactive form FormGroup method
  // newUserForm = new FormGroup({
  //   userName: new FormControl(''),
  //   password: new FormControl(''),
  //   validatePassword: new FormControl(''),
  //   address: new FormGroup({
  //     street: new FormControl(''),
  //     city: new FormControl(''),
  //     state: new FormControl(''),
  //   }),
  // });

  get userName() {
    return this.newUserForm.get('userName');
  }
  get email() {
    return this.newUserForm.get('email');
  }

  //Reactive Form formBuilder method with validation
  newUserForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.newUserForm = this.fb.group(
      {
        userName: [
          '',
          Validators.required,
          Validators.minLength(3),
          forbiddenNameValidator(/username/),
        ],
        email: [''],
        subscribe: false,
        password: [''],
        validatePassword: [''],
        address: this.fb.group({
          street: [''],
          city: [''],
          state: [''],
        }),
      },
      { validator: pwdValidator }
    );
    //conditional validation
    this.newUserForm.get('subscribe').valueChanges.subscribe((checked) => {
      const email = this.newUserForm.get('email');
      if (checked) {
        email.setValidators(Validators.required);
      } else {
        email.clearValidators();
      }
      email.updateValueAndValidity();
    });
  }

  //pre-fill input field
  //this.newUserForm.patchValue allows for partial filling of form fields
  loadData() {
    //   this.newUserForm.setValue({
    //     userName: 'sam',
    //     password: 'true',
    //     validatePassword: 'true',
    //     address: {
    //       street: 'angular street',
    //       city: 'TypeScript',
    //       state: 'Front-End',
    //     },
    //   });
  }
}
