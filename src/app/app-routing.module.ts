import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProbListComponent } from './prob/prob-list/prob-list.component';
import { ProbSolveComponent } from './prob/prob-solve/prob-solve.component';
import { ProbAddComponent } from './prob/prob-add/prob-add.component';


const routes: Routes = [
  { path: '', component: ProbListComponent },
  { path: 'add', component: ProbAddComponent},
  { path: 'solve/:id', component: ProbSolveComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
