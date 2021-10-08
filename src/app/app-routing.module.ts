import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayersListComponent } from './components/players-list/players-list.component';

const routes: Routes = [
  {
    path        : 'auth',
    loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path        : 'players-list',
    component   : PlayersListComponent
  },
  {
    path      : 'auth/',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path      : '**',
    redirectTo: '/auth/login'
  },
  {
    path      : '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
