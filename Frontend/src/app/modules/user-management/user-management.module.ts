import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserManagementRoutingModule } from './user-management-routing.module';


import { UserListComponent } from './components/user-list/user-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MatDialogModule } from '@angular/material/dialog'

@NgModule({
  
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    UserListComponent,
    UserFormComponent,
    UserManagementRoutingModule,
     MatDialogModule
  ],

  exports: [UserListComponent] 
})
export class UserManagementModule {}