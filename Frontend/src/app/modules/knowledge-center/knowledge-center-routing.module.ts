import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KnowledgeCenterComponent } from './knowledge-center.component';

const routes: Routes = [
  { path: '', component: KnowledgeCenterComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KnowledgeCenterRoutingModule {}
