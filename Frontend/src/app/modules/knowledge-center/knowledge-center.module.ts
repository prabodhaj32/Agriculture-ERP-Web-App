import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { KnowledgeCenterComponent } from './knowledge-center.component';
import { KnowledgeCenterRoutingModule } from './knowledge-center-routing.module';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    KnowledgeCenterRoutingModule,
    KnowledgeCenterComponent
  ]
})
export class KnowledgeCenterModule { }
