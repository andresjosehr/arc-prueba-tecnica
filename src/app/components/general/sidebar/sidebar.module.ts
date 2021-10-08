import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatIconModule,
  ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
