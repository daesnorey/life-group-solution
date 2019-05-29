import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray, AbstractControl } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-col101-form',
  templateUrl: './col101-form.component.html',
  styleUrls: ['./col101-form.component.less']
})
export class Col101FormComponent implements OnInit, AfterViewInit {

  public header = [
    {
      title: 'Allianz Seguros de Vida S.A.',
      nit: '860.027.405-1'
    },
    {
      title: 'Seguro de Vida Grupo',
      subtitle: 'Solicitud Individual de Seguro'
    },
    {
      text: 'Le recordamos la importancia de declarar el verdadero estado de salud al momento de ' +
            'diligenciar la solicitud de seguro, favor leer con detenimiento la declaración de ' +
            'asegurabilidad consentida en el presente cerfificado'
    }
  ];

  public col101Form: FormGroup;

  /**
   * Constructor
   * @param formBuilder FormBuilder service
   * @param loadingService Service to start or stop loading control
   */
  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar
    ) {
    this.col101Form = this.createCol10FormGroup();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.loadingService.isLoading = false;
    }, 1000);
  }

  get dateCompletion(): FormControl {
    return this.col101Form.get('dateCompletion') as FormControl;
  }

  get actionForm(): FormControl {
    return this.col101Form.get('actionForm') as FormControl;
  }

  get applicantDocumentType(): FormControl {
    return this.col101Form.get('applicantDocumentType') as FormControl;
  }

  private createCol10FormGroup(): FormGroup {
    return this.formBuilder.group({
      dateCompletion: new FormControl('', [Validators.required]),
      actionForm: new FormControl('', Validators.required),
      policyNumber: new FormControl({value: '', disabled: true}),
      takerEntityName: new FormControl('', [Validators.required, Validators.minLength(10)]),
      takerDocumentNumber: new FormControl('', [Validators.required, Validators.pattern(/^(?:[0-9]+){1}[\-]{0,1}[0-9]{1}$/)]),
      applicantName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/[^0-9]/)]),
      applicantFirstLastName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/[^0-9]/)]),
      applicantSecondLastName: new FormControl(''),
      applicantDocumentType: new FormControl('', [Validators.required]),
      applicantDocumentNumber: new FormControl('', [Validators.required, Validators.pattern(/^(?:[0-9]+){1}[\-]{0,1}[0-9]{1}$/)]),
      applicantBirthDate: new FormControl('', [Validators.required]),
      applicantAddress: new FormControl('', [Validators.required]),
      applicantPhone: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{7,10}$/)]),
      applicantCity: new FormControl('', [Validators.required], [/*Pendiente validar ciudad*/]),
      insuredValue: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+\.{0,1}[0-9]{1}$/)]),
      requestIncreaseInsuredValue: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+\.{0,1}[0-9]{1}$/)]),
      applicantSex: new FormControl('', [Validators.required]),
      applicantHeight: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1}\.{0,1}[0-9]{1,3}$/)]),
      applicantWeight: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{1}\.{0,1}[0-9]{1,3}$/)]),
      applicantOccupation: new FormControl('', [Validators.required]),
      applicantSport: new FormControl('', [Validators.required]),
      // table
      healthDisclaimer: new FormControl(false, [Validators.required]),
      ilnes: new FormControl(false),
      ilnesList: new FormGroup({
        mental: new FormControl(false),
        intestine: new FormControl(false),
        drugs: new FormControl(false),
        heart: new FormControl(false),
        brain: new FormControl(false),
        arterialHypertension: new FormControl(false),
        lungs: new FormControl(false),
        arthritis: new FormControl(false),
        cancer: new FormControl(false),
        kidney: new FormControl(false),
        aids: new FormControl(false),
        diabetes: new FormControl(false),
        smoking: new FormControl(false),
        dailyCigarettes: new FormControl({value: false, disabled: true}),
        alcoholism: new FormControl(false),
        weeklyDrinks: new FormControl({value: false, disabled: true}),
        anotherDisease: new FormControl(false),
        whichDisease: new FormControl({value: '', disabled: true})
      }),
    });
  }

  public submitCol101(): void {
    if (this.col101Form.invalid) {
      this.snackBar.open('El formulario tiene errores, por favor revisar', 'Entendido', {
        duration: 5000
      });
      this.showFormErrors(this.col101Form);
    } else {
      this.snackBar.open('Solicitud procesada correctamente', 'Cerrar');
      this.col101Form.reset();
      this.resetForm(this.col101Form);
    }
  }

  /**
   * Resets from controls
   * @param control control to reset
   */
  private resetForm(control: AbstractControl | FormControl | FormArray) {
    if (control instanceof FormArray || control instanceof FormGroup) {
      Object.keys((control as FormArray).controls).forEach((key, index) => {
        const currentControl = control.get(key);
        this.resetForm(currentControl);
      });
    } else {
      control.reset();
      control.markAsUntouched();
      control.markAsPristine();
      control.markAsPending();
    }
  }

  /**
   * Shows errors
   * @param control AbstractControl | FormControl | FormArray to show errors
   * @param controlName key control name
   */
  private showFormErrors(control: AbstractControl | FormControl | FormArray, controlName: string = null) {
    if (control instanceof FormArray || control instanceof FormGroup) {
      Object.keys((control as FormArray).controls).forEach((key, index) => {
        const currentControl = control.get(key);
        this.showFormErrors(currentControl, key);
      });
    } else {
      if (control.errors) {
        console.log(control, controlName, control.errors);
      }
      control.markAsTouched();
    }
  }
}
