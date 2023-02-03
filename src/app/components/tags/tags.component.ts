import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItemsView } from './model/items-view';
import { Tag } from './model/tag.model';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  viewOptions = ItemsView;
  @Input() view = ItemsView.List;

  @Output() tagRowClicked = new EventEmitter<Tag>();

  constructor(){}

  ngOnInit(): void {

  }

  rowClicked(tag: Tag): void{
    this.tagRowClicked.emit(tag);
  }

}
