import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Produto } from '../models/produto';


@Component({
    selector: 'produto-card-detalhe',
    templateUrl: './produto-card-detalhe.component.html'
})

export class ProdutoDetalheComponent {

    @Input()// decorator, criar variavel passando por bindin
    produto: Produto  

    @Output() //Enviando evento pro pai
    status: EventEmitter<any> = new EventEmitter()

    emitirEvento() {
        this.status.emit(this.produto)
    }

}