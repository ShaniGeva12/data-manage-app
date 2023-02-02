import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { ColorRgba } from './shared/model/color-rgba';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'data-manage-app';
  subs = new SubSink();
  // color = new FormControl();
  // myColor = new ColorRgba(103, 58, 183, 1);
  // myStringColor = 'rgba(244, 67, 54, 1)';

  ngOnInit(): void {

    // this.subs.sink = this.color.valueChanges.subscribe(value => {
    //   console.log(value);
    // });

    // this.color.setValue(this.myStringColor);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
