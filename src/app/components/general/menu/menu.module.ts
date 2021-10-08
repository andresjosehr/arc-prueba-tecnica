import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    FlexLayoutModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
