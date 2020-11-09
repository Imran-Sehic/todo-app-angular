import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActiveTodosComponent } from './components/active-todos/active-todos.component';
import { CompletedTodosComponent } from './components/completed-todos/completed-todos.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RemovedTodosComponent } from './components/removed-todos/removed-todos.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'active-todos', component: ActiveTodosComponent, canActivate: [AuthGuard]},
  {path: 'completed-todos', component: CompletedTodosComponent, canActivate: [AuthGuard]},
  {path: 'removed-todos', component: RemovedTodosComponent, canActivate: [AuthGuard]},
  {path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
