import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoDashboardComponent } from './produto-dashboard/produto-dashboard.component';
import { EditarProdutoComponent } from './editar-produto/editar-produto.component';
import { ProdutoAppComponent } from './produto.app.component';
import { ProdutoResolve } from './services/produto.resolve';

const produtoRouterConfig: Routes = [
    {
        path: '', component: ProdutoAppComponent,
        children: [
            { path: '', redirectTo: 'todos' },
            {
                path: ':estado', //recebo parametro
                component: ProdutoDashboardComponent,
                resolve: { // com esse codigo de resolve, 
                    produtos: ProdutoResolve //vamos resolver a rota e vai alimentar os produtos comos dados da rota 
                },
                data: { // obter dados atraves da palavra teste
                    teste: 'informação',
                }
            },
            { path: 'editar/:id', component: EditarProdutoComponent }
        ]
    },

]

@NgModule({
    imports: [
        RouterModule.forChild(produtoRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class ProdutoRoutingModule { }