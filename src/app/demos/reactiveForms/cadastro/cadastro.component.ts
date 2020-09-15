
import { Usuario } from './models/usuario';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormControlName } from '@angular/forms';
import { NgBrazilValidators } from 'ng-brazil';
import { Observable, fromEvent, merge } from 'rxjs';
import { utilsBr } from 'js-brasil';
import { CustomValidators } from 'ng2-validation';
import { ValidationMessages, GenericValidator, DisplayMessage } from './generic-form-validation';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})

export class CadastroComponent implements OnInit, AfterViewInit {

  @ViewChildren(FormControlName, { read: ElementRef }) formInputElements: ElementRef[]

  cadastroForm: FormGroup
  usuario: Usuario
  formResult: string = ''
  MASKS = utilsBr.MASKS

  validationMessages: ValidationMessages
  genericValidator: GenericValidator
  displayMessage: DisplayMessage = {}

  constructor(private fb: FormBuilder) { 

    this.validationMessages = {
      nome: {
        required: 'O nome é requerido',
        minlength: 'O nome precisa no minimo 2 caracteres',
        maxlength: 'O nome precisa ter no maximo 150 caracteres'
      },
      cpf: {
        required: 'Informe o CPF',
        cpf: 'CPF em formato invalido'
      },
      email: {
        required: 'Informe o e-mail',
        email: 'Email invalido'
      },
      senha: {
        required: 'Informe a senha',
        rangelength: 'A senha deve possuir entre 6 e 15 caracteres'
      },
      senhaConfirmacao: {
        required: 'Informe a senha novamente',
        rangelength: 'A senha deve possuir entre 6 e 15 caracteres',
        equalTo: 'As senha não conferem'
      }
    }
    this.genericValidator = new GenericValidator(this.validationMessages)
  }

  //abaixo campos que seram preenchido e enviados quando for submetido
  ngOnInit() {
    let senha = new FormControl('', [Validators.required, CustomValidators.rangelength([6,5])]) //duas variaveis fazem a confirmaçao se a senha é igual a outra
    let senhaConfirm = new FormControl('', [Validators.required, CustomValidators.rangelength([6,5]), CustomValidators.equalTo(senha)])

    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(150)] ],
      cpf: ['', [Validators.required, NgBrazilValidators.cpf] ],
      email: ['', [Validators.required, Validators.email] ],
      senha: senha,
      senhaConfirmacao: senhaConfirm
    })
  }

  ngAfterViewInit(): void {
    let controlBlurs: Observable<any>[] = this.formInputElements
    .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, ' blur'))

    merge(...controlBlurs).subscribe(() => {
      this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm)
    })
  }

  adicionarUsuario() {
    if (this.cadastroForm.dirty && this.cadastroForm.valid) {
      // abaixo ele traz o OBJ usuario preenchido com os dados do formulario!
      this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value)
      this.formResult = JSON.stringify(this.cadastroForm.value) // abaixo ele verifica se os campos foram preenchido e retorna o valor dele
    }
    else {
      this.formResult = "Não Enviado!!!"
    }
  }
}
