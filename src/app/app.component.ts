import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SubSink } from 'subsink';
import { ColorRgba } from './shared/model/color-rgba';
import { Tag } from './components/tags/model/tag.model';
import { MatDrawer } from '@angular/material/sidenav';
import { ItemsView } from './components/tags/model/items-view';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @ViewChild( MatDrawer)
  drawer!:  MatDrawer;

  title = 'data-manage-app';
  subs = new SubSink();

  tagToEdit: Tag | undefined;

  viewOptions = ItemsView;
  view = ItemsView.List;

  filterSearch = new FormControl();

  constructor(
    ) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  refreshDrawer() {
    this.tagToEdit = undefined;
    this.drawer.toggle();
  }

  openEditTag(tag: Tag) {
    this.tagToEdit = tag;
    this.drawer.open();
  }

  tagSubmitted(isSuccess: boolean) {
    if(isSuccess) {
      this.refreshDrawer();
    }
  }

  toggleView(newView: ItemsView) {
    this.view = newView;
  }
}
