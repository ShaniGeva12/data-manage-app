import { Component, EventEmitter, Output } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { Observable } from 'rxjs';
import { Tag } from '../../model/tag.model';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss']
})
export class GridViewComponent {
  dataSource$: Observable<Tag[]> = this.tagsService.tags$;
  @Output() tagClicked = new EventEmitter<Tag>();

  constructor(private tagsService: TagsService){}

  tagItemClicked(tag: Tag): void{
    this.tagClicked.emit(tag);
  }
}
