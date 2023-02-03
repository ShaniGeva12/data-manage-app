import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './components/loading/loading.component';



@NgModule({
  declarations: [
    ColorPickerComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    ColorPickerComponent,
    LoadingComponent
  ]
})
export class SharedModule { }
