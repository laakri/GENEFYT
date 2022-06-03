import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { GigService } from './gig.service';

export interface categ {
  name: string;
}
@Component({
  selector: 'app-create-gig',
  templateUrl: './create-gig.component.html',
  styleUrls: ['./create-gig.component.css'],
})
export class CreateGigComponent implements OnInit {
  formGroup!: FormGroup;
  isLinear = false;
  filteredOptions!: Observable<categ[]>;
  myControl = new FormControl();
  value = 1;
  valuebase = 1;
  valuetrait = 1;
  valuevariation = 1;
  valuetype = 'Hour';
  Revisionsnumbre = '1';
  premvalue = 1;
  premvaluebase = 1;
  premvaluetrait = 1;
  premvaluevariation = 1;
  premvaluetype = 'Hour';
  premRevisionsnumbre = '1';
  imagePreview!: string;
  imageName!: string;
  private userId: any;
  PremiumAlltime!: string;
  StandarAlltime!: string;
  trueFile!: File;

  stepperOrientation: Observable<StepperOrientation>;
  get formArray(): AbstractControl | null {
    return this.formGroup.get('formArray');
  }

  constructor(
    private _formBuilder: FormBuilder,
    breakpointObserver: BreakpointObserver,
    private GigService: GigService
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  private _filter(name: string): categ[] {
    const filterValue = name.toLowerCase();

    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  displayFn(user: categ): string {
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
          categorieFormCtrl: ['', Validators.required],
          objectFormCtrl: ['', Validators.required],
          descriptionFormCtrl: ['', Validators.required],
          filePathFormCtrl: ['', Validators.required],
        }),
        this._formBuilder.group({
          StandarPriceFormCtrl: ['', Validators.required],
          StandardescriptionFormCtrl: ['', Validators.required],
          StandarDeleveryTimeFormCtrl: ['', Validators.required],
          StandarDeleveryTimedayFormCtrl: ['', Validators.required],
          StandarRevisionsFormCtrl: ['', Validators.required],
          StandarBaseArtworkTimeFormCtrl: ['', Validators.required],
          StandarTraitAccessoryTimeFormCtrl: ['', Validators.required],
          StandarVariationFormCtrl: ['', Validators.required],
          StandarMetadata: ['true'],
          StandarGeneration: ['true'],
          StandarBackground: ['true'],

          PremiumPriceFormCtrl: ['', Validators.required],
          PremiumdescriptionFormCtrl: ['', Validators.required],
          PremiumDeleveryTimeFormCtrl: ['', Validators.required],
          PremiumDeleveryTimedayFormCtrl: ['', Validators.required],
          PremiumRevisionsFormCtrl: ['', Validators.required],
          PremiumBaseArtworkTimeFormCtrl: ['', Validators.required],
          PremiumTraitAccessoryTimeFormCtrl: ['', Validators.required],
          PremiumVariationFormCtrl: ['', Validators.required],
          PremiumMetadata: ['true'],
          PremiumGeneration: ['true'],
          PremiumBackground: ['true'],
        }),
      ]),
    });
  }

  addimfo(form: FormGroup) {
    if (form.invalid) {
      return;
    }

    (this.PremiumAlltime =
      form.value.formArray[1].PremiumDeleveryTimeFormCtrl +
      ' ' +
      form.value.formArray[1].PremiumDeleveryTimedayFormCtrl),
      (this.StandarAlltime =
        form.value.formArray[1].PremiumDeleveryTimeFormCtrl +
        ' ' +
        form.value.formArray[1].PremiumDeleveryTimedayFormCtrl),
      this.GigService.addGig(
        this.userId,
        form.value.formArray[0].categorieFormCtrl.name,
        form.value.formArray[0].objectFormCtrl,
        form.value.formArray[0].descriptionFormCtrl,
        this.trueFile,

        form.value.formArray[1].StandarPriceFormCtrl,
        form.value.formArray[1].StandardescriptionFormCtrl,
        this.StandarAlltime,
        form.value.formArray[1].StandarRevisionsFormCtrl,
        form.value.formArray[1].StandarBaseArtworkTimeFormCtrl,
        form.value.formArray[1].StandarTraitAccessoryTimeFormCtrl,
        form.value.formArray[1].StandarVariationFormCtrl,
        form.value.formArray[1].StandarMetadata,
        form.value.formArray[1].StandarGeneration,
        form.value.formArray[1].StandarBackground,

        form.value.formArray[1].PremiumPriceFormCtrl,
        form.value.formArray[1].PremiumdescriptionFormCtrl,
        this.PremiumAlltime,
        form.value.formArray[1].PremiumRevisionsFormCtrl,
        form.value.formArray[1].PremiumBaseArtworkTimeFormCtrl,
        form.value.formArray[1].PremiumTraitAccessoryTimeFormCtrl,
        form.value.formArray[1].PremiumVariationFormCtrl,
        form.value.formArray[1].PremiumMetadata,
        form.value.formArray[1].PremiumGeneration,
        form.value.formArray[1].PremiumBackground
      );
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

  options: categ[] = [
    { name: 'Graphics | Design' },
    { name: 'Digital Marketing' },
    { name: 'Writing | Translation' },
    { name: 'Video | Animation' },
    { name: 'Music | Audio' },
    { name: 'Programming | Tech' },
    { name: 'Business' },
    { name: 'Tranding' },
  ];
}
