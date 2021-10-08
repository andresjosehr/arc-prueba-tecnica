import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarModule } from './sidebar/sidebar.module';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MenuModule } from './menu/menu.module';
import { MenuComponent } from './menu/menu.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarModule,
    MenuModule,
  ],
  exports: [
    SidebarComponent,
    MenuComponent,
  ]
})
export class GeneralModule { }
