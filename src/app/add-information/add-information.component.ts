import { UsersService } from './../login/user.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/material/stepper';
import { Observable, Subscription } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  AbstractControl,
  FormControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
export interface User {
  name: string;
}
@Component({
  selector: 'app-add-information',
  templateUrl: './add-information.component.html',
  styleUrls: ['./add-information.component.css'],
})
export class AddInformationComponent implements OnInit {
  formGroup!: FormGroup;
  isLinear = false;
  myControl = new FormControl();
  filteredOptions!: Observable<User[]>;
  toppings = new FormControl();
  private userId: any;
  imagePreview!: string;
  imageName!: string;
  value = 1;
  valuetype = 'Hour';
  Alltime!: string;
  trueFile!: File;

  stepperOrientation: Observable<StepperOrientation>;
  saif: any;
  saifff: any;
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  UserID!: string;

  private routeSub: Subscription | undefined;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private UsersService: UsersService,
    public route: ActivatedRoute
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.options.slice()))
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
          descriptionFormCtrl: ['', Validators.required],
          occupationFormCtrl: ['', Validators.required],
          skillFormCtrl: ['', Validators.required],
        }),
      ]),
    });
  }
  addimfo(form: FormGroup) {
    if (form.invalid) {
      console.log('form invalid !');
      return;
    }

    this.Alltime =
      form.value.formArray[0].responseTimeFormCtrl +
      ' ' +
      form.value.formArray[0].responseTimedaysFormCtrl;
    this.UsersService.modifyUser(
      this.userId,
      form.value.formArray[0].walletFormCtrl,
      form.value.formArray[0].countryFormCtrl,
      this.Alltime,
      this.trueFile,

      form.value.formArray[1].descriptionFormCtrl,
      form.value.formArray[1].occupationFormCtrl.name,
      form.value.formArray[1].skillFormCtrl.toString()
    );
    this.router.navigate(['/Profile/' + this.userId]);
  }

  onFilePicked(event: Event) {
    const file = ((event.target as HTMLInputElement).files as FileList)[0];
    this.formGroup.patchValue({ filePath: file });
    this.formGroup.get('filePath') as any;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
    this.trueFile = file;
    this.imageName = file.name;
  }

  toppingList: string[] = [
    'Graphic design',
    'Motion design',
    'Illustration',
    'NFT art',
    'Sausage',
    'Tomato',
  ];

  options: User[] = [
    { name: 'Graphics & Design' },
    { name: 'Digital Marketing' },
    { name: 'Writing & Translation' },
    { name: 'Video & Animation' },
    { name: 'Music & Audio' },
    { name: 'Programming & Tech' },
    { name: 'Business' },
    { name: 'Tranding' },
  ];
}
