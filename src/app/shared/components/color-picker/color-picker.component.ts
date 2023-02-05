import { ChangeDetectionStrategy, Component, OnInit, Self, ViewChild } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, NgControl, ValidationErrors, Validators } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ColorRgba } from '../../model/color-rgba';
import { SubSink } from 'subsink';

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
    },
    {
      provide: NG_VALIDATORS,
      useExisting: ColorPickerComponent,
      multi: true
    }
  ]
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

  colorsPaletteRgba: ColorRgba[][] = [];
  colorsPaletteString: string[][] = this.colorsPaletteRgba.map(item=> item.map(item=> item.getColorString() || ''));

  colorSelect = new FormControl();
  subs = new SubSink();

  isOpen = false;
  disabled = false;
  isValidatorRequired = false;
  onChanged: any = (color: string) => {};
  onTouched: any = () => {};
  colorValue: any;

  ngOnInit(): void {
    this.colorsPaletteRgba = this.createColorsPalette(this.basicRGBA);
    this.colorsPaletteString = this.colorsPaletteRgba.map(item=> item.map(item=> item.getColorString() || ''));

    this.subs.sink = this.colorSelect.valueChanges.subscribe(value => {
      this.colorValue = value;
      this.onChanged(value);
    });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  createColorsPalette(basicRgbaColors: ColorRgba[]) : ColorRgba[][] {
    return basicRgbaColors.map(color => {
      const shades = [];
      for (let i = 0; i < 9; i++) {
        shades.push(ColorRgba.createFromColor(color, i * 0.1));
      }
      return shades;
    });
  }

  validate(control: AbstractControl): ValidationErrors | null {
    let validate: ValidationErrors | null = null;
    this.isValidatorRequired = control.hasValidator(Validators.required) as boolean;
    if (this.isValidatorRequired) {
      this.colorSelect.setValidators(Validators.required);
      const forbidden = control.value?.length === 0;
      validate = forbidden ? { required: { value: control.value } } : null;
    } else {
      this.colorSelect.setValidators([]);
    }
    return validate;
  }

  writeValue(color: string | ColorRgba): void {
    if (color instanceof ColorRgba) {
      if(this.colorsPaletteRgba.find(colorsArr => colorsArr.find(item => item.compare(color)))) {
        this.colorSelect.setValue(color.getColorString());
      } else {
        this.colorSelect.reset();
      }
    } else {
      if(this.colorsPaletteString.find(colorsArr => colorsArr.find(item => item == color))) {
        this.colorSelect.setValue(color);
      } else {
        this.colorSelect.reset();
      }
    }
  }
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this.disabled? this.colorSelect.disable() : this.colorSelect.enable();
  }

}
