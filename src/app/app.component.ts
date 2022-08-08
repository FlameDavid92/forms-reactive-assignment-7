import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  status: string[];
  signupForm: FormGroup;

  ngOnInit(): void {
    this.status = ['Stable', 'Critical', 'Finished'];
    this.signupForm = new FormGroup({
      projectData: new FormGroup({
        name: new FormControl(
          null,
          [Validators.required],
          this.forbiddenProjectNames
        ),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      projectStatus: new FormControl(null),
    });
  }

  forbiddenProjectNames(
    control: FormControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        control.value.trim().toLowerCase() === 'test'
          ? resolve({ forbiddenName: true })
          : resolve(null);
      }, 1000);
    });
  }

  onSubmit() {
    console.log(this.signupForm.value);
    this.signupForm.reset();
  }

  get projectName() {
    return this.signupForm.get('projectData.name');
  }
  get projectEmail() {
    return this.signupForm.get('projectData.email');
  }
}
