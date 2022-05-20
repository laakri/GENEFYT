import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-gig',
  templateUrl: './create-gig.component.html',
  styleUrls: ['./create-gig.component.css']
})
export class CreateGigComponent implements OnInit {
  formGroup!: FormGroup;
  isLinear = false;

  
  stepperOrientation: Observable<StepperOrientation>;
  get formArray(): AbstractControl | null { return this.formGroup.get('formArray')  ; }

  constructor(private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
   }

  ngOnInit(): void {

    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          categorieFormCtrl: ['', Validators.required],
          objectFormCtrl: ['', Validators.required],
          descriptionFormCtrlz: ['', Validators.required],

        }),
        this._formBuilder.group({
          descriptionFormCtrl: ['', Validators.required],
        }),
      ])
    });
  }



  addimfo(form : FormGroup ){
    if (form.invalid){
      return
    }

    console.log(form.value.formArray[0].countryFormCtrl);
  
}

}
