import { ProdutoDetalheComponent } from './../componentes/produto-card-detalhe.component';
import { ProdutoCountComponent } from './../componentes/produto-count.component';
import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { Produto } from '../models/produto';
import { fromEvent, Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-produto-dashboard',
  templateUrl: './produto-dashboard.component.html',
  styles: []
})
export class ProdutoDashboardComponent implements OnInit, AfterViewInit {

  produtos: Produto[]

  @ViewChild(ProdutoCountComponent, { static: false }) contador: ProdutoCountComponent
  @ViewChild('teste', { static: false }) mensagemTela: ElementRef

  @ViewChildren(ProdutoDetalheComponent) botoes: QueryList<ProdutoDetalheComponent>

  constructor(private route: ActivatedRoute) { } // rota ativa

  ngOnInit() {
    //aqui estamos trazendo os produtos
    this.produtos = this.route.snapshot.data['produtos'] // data = filtro, snapshot = captura da rota 
    console.log(this.route.snapshot.data['teste'])
  }

  ngAfterViewInit(): void {
    console.log('Objeto do contador:',  )

    let clickTexto: Observable<any> = fromEvent(this.mensagemTela.nativeElement,'click')
      clickTexto.subscribe(() => {
      alert('Clicou no texto!')
      return
    })

    console.log(this.botoes)
    this.botoes.forEach(p => {
      console.log(p.produto)
    })
  }

  mudarStatus(event: Produto) {
    event.ativo = !event.ativo // pega o evento ativo recebe a negaçao do estado atual
  }
}
