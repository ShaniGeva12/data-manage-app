export class ColorRgba  {
  r: number;
  g: number;
  b: number;
  a: number;

  constructor(r: number,
    g: number,
    b: number,
    a?: number,) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a || 1;
  }

  static createFromColor(rgbColor: ColorRgba, a?: number,) {
    const newColor = new ColorRgba(rgbColor.r, rgbColor.g, rgbColor.b, rgbColor.a);
    newColor.a = a || newColor.a;
    return newColor;
  }

  getColorString() : string {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  compare(color: ColorRgba) : boolean {
    return (this.r === color.r && this.g === color.g && this.b === color.b && this.a === color.a)? true : false;
  }
}
