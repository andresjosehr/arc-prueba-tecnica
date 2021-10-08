import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from './sidebar/sidebar.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuModule } from './menu/menu.module';
import { MenuComponent } from './menu/menu.component';
import { ConfirmDialogModule } from './confirm-dialog/confirm-dialog.module';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarModule,
    MenuModule,
    ConfirmDialogModule
  ],
  exports: [
    SidebarComponent,
    MenuComponent,
    ConfirmDialogComponent
  ]
})
export class GeneralModule { }
