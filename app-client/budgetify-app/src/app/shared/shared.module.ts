import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatButtonToggleModule,
    MatListModule
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatTableModule,
    MatButtonToggleModule,
    MatListModule
  ],
  providers: [MatDatepickerModule],
})
export class SharedModule {}
