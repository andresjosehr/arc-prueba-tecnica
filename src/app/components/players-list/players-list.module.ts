import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayersListComponent } from './players-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SidebarModule } from '../general/sidebar/sidebar.module';
import { GeneralModule } from '../general/general.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatPaginatorModule} from '@angular/material/paginator';







@NgModule({
  declarations: [
    PlayersListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    GeneralModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    MatTableModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatSortModule,
    MatPaginatorModule
  ]
})
export class PlayersListModule { }
