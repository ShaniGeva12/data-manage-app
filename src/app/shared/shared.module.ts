import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './components/color-picker/color-picker.component';
import { MaterialModule } from './material.module';



@NgModule({
  declarations: [
    ColorPickerComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    ColorPickerComponent
  ]
})
export class SharedModule { }
