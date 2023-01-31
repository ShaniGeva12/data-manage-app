import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: ColorPickerComponent,
      multi: true
    }]
})
export class ColorPickerComponent implements ControlValueAccessor {
  @ViewChild('matSelect', { read: MatSelect })
  matSelect!: MatSelect;

  basicColors = '#FFF,#000, #F00,#FFC000,#FFFF00,#92D050,#00B050,#00B0F0,#0070C0,#7030A0'.split(','); //10*10 table from these base colors
  colorSelect = new FormControl();

  isOpen = false;
  disabled = false;
  onChanged: any = () => {};
  onTouched: any = () => {};
  colorValue: any;

  writeValue(obj: any): void {
    this.colorValue = obj;
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}
