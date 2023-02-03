import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { ColorRgba } from './shared/model/color-rgba';
import { Tag } from './components/tags/model/tag.model';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild( MatDrawer)
  drawer!:  MatDrawer;

  title = 'data-manage-app';
  subs = new SubSink();

  tagToEdit: Tag | undefined;
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

  createNewTag() {
    this.tagToEdit = undefined;
    this.drawer.toggle();
  }

  openEditTag(tag: Tag) {
    this.tagToEdit = tag;
    this.drawer.open();
  }
}
