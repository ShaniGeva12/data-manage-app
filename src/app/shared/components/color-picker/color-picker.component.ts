import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ColorRgba } from '../../model/color-rgba';

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
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  @ViewChild('matSelect', { read: MatSelect })
  matSelect!: MatSelect;

  basicRGBA: ColorRgba[] = [
    new ColorRgba(250, 235, 59, 1),
    new ColorRgba(38, 150, 136, 1),
    new ColorRgba(58, 188, 212, 1),
    new ColorRgba(64, 169, 244, 1),
    new ColorRgba(62, 150, 243, 1),
    new ColorRgba(103, 58, 183, 1),
    new ColorRgba(233, 30, 98, 1),
    new ColorRgba(244, 67, 54, 1),
    new ColorRgba(0, 0, 0, 1),
  ];
  basicColors: string[] = this.basicRGBA.map(item=> item.getColorString() || '');

  colorsPaletteRgba: ColorRgba[][] = [];
  colorsPaletteString: string[][] = this.colorsPaletteRgba.map(item=> item.map(item=> item.getColorString() || ''));

  colorSelect = new FormControl();

  isOpen = false;
  disabled = false;
  onChanged: any = () => {};
  onTouched: any = () => {};
  colorValue: any;

  ngOnInit(): void {
    this.colorsPaletteRgba = this.createColorsPalette(this.basicRGBA);
    this.colorsPaletteString = this.colorsPaletteRgba.map(item=> item.map(item=> item.getColorString() || ''));
  }

  createColorsPalette(basicRgbaColors: ColorRgba[]) : ColorRgba[][] {
    let colorsPalette: ColorRgba[][] = [];
    for(let i = 0; i < basicRgbaColors.length; i++) {
      colorsPalette[i] = [];
      for(let j = 0; j< 9; j++) {
        colorsPalette[i][j] = ColorRgba.createFromColor(basicRgbaColors[i], j*0.1);
      }
    }
    return colorsPalette;
  }

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
