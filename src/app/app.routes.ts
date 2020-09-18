import { NotFoundComponent } from './navegacao/not-found/not-found.component';
import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { CadastroComponent } from './demos/reactiveForms/cadastro/cadastro.component';
import { AuthGuard } from './services/app.guard';
import { CadastroGuard } from './services/cadastro.guard';


const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'sobre', component: SobreComponent },
    {
        path: 'cadastro', component: CadastroComponent,
        canDeactivate: [CadastroGuard] // deixar o usuario preso na rota
    },
    {
        path: 'produtos',
        loadChildren: () => import('./demos/arquitetura-componentes/produto.module')
            .then(m => m.ProdutoModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module') // lazy load
            .then(m => m.AdminModule),
        canLoad: [AuthGuard],
        canActivate: [AuthGuard]
    },
    { path: '**', component: NotFoundComponent }, //sempre por ultimo na rota

];

@NgModule({
    imports: [
        RouterModule.forRoot(rootRouterConfig, { enableTracing: true })
    ],
    exports: [
        RouterModule
    ]
})
export class appRoutingModule { }