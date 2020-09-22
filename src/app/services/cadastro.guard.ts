import { Injectable } from "@angular/core";
import { CanDeactivate } from '@angular/router';

import { CadastroComponent } from '../demos/reactiveForms/cadastro/cadastro.component';



@Injectable()
export class CadastroGuard implements CanDeactivate<CadastroComponent> {
    
    canDeactivate(component: CadastroComponent) { // impede que você saia da rota
        if (component.mudancasNaoSalvas) {
            return window.confirm('Tem certeza que deseja sair? preenchimento imcompleto!')
        }
        return true
    }

}