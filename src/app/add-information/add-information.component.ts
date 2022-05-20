import { UsersService } from './../login/user.service';
import { Component, OnInit } from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {StepperOrientation} from '@angular/material/stepper';
import {concat, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
export interface User {
  name: string;
}
@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.css']
})

export class AddInformationComponent implements OnInit {
  formGroup!: FormGroup;
  isLinear = false;
  myControl = new FormControl();
  filteredOptions!: Observable<User[]>;
  toppings = new FormControl();
  public userId :any;
  filePreview!: string;
  fileName!:string;
  value = 1;
  valuetype = "Hour";
  Alltime!: string;
 

  stepperOrientation: Observable<StepperOrientation>;

  get formArray(): AbstractControl | null { return this.formGroup.get('formArray')  ; }
  
  
  
  constructor(private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private UsersService: UsersService,
  )
    
  { 
    this.stepperOrientation = breakpointObserver
    .observe('(min-width: 800px)')
    .pipe(map(({matches}) => (matches ? 'horizontal' : 'vertical')));
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }
  
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );


    this.formGroup = this._formBuilder.group({
      formArray: this._formBuilder.array([
        this._formBuilder.group({
          walletFormCtrl: ['', Validators.required],
          countryFormCtrl: ['', Validators.required],
          responseTimeFormCtrl: ['', Validators.required],
          responseTimedaysFormCtrl: ['', Validators.required],
          filePathFormCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          descriptionFormCtrl: ['', Validators.required]
        }),
      ])
    });


    this.userId= this.UsersService.getUserId();



  }
  addimfo(form : FormGroup ){
    /*if (form.invalid) {
      console.log('form invalid !')
      return
    }*/
    this.Alltime =form.value.formArray[0].responseTimeFormCtrl+" "+ form.value.formArray[0].responseTimedaysFormCtrl;
    this.UsersService.modifyUser(
      this.userId,
      form.value.formArray[0].walletFormCtrl,
      form.value.formArray[0].countryFormCtrl,
      this.Alltime,
      form.value.formArray[1].descriptionFormCtrl,
      );


    console.log(
      form.value.formArray[0].walletFormCtrl,
      form.value.formArray[0].countryFormCtrl,
      this.Alltime,
      form.value.formArray[1].descriptionFormCtrl,
      );
  
  }
  
onFilePicked(event: Event) {
  const file =((event.target as HTMLInputElement ).files as FileList)[0];
  this.formGroup.patchValue({ filePath: file });
  ( (this.formGroup.get('filePath') as any ).updateValueAndValidity());
  const reader = new FileReader();
  reader.onload =() => {
    this.filePreview = (reader.result as string );
  };
  reader.readAsDataURL(file);
  this.fileName = file.name;
}
  

  
  
toppingList: string[] = [
  'Graphic design', 'Motion design', 'Illustration',
  'NFT art', 'Sausage', 'Tomato'
];
  

  
options: User[]  = 
[
  {name: 'Graphics & Design' },
  {name: 'Digital Marketing' },
  {name: 'Writing & Translation' },
  {name: 'Video & Animation' },
  {name: 'Music & Audio' },
  {name: 'Programming & Tech' },
  {name: 'Business' },
  {name: 'Tranding' },

];


  
  
  

  

  

  
  
}