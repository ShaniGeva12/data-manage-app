import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { Observable } from 'rxjs';
import { Tag } from '../../model/tag.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewComponent {
  @Input() tagsData : any = [];
  @Input() paginator!: MatPaginator;
  @Input() pageEvent: PageEvent | undefined = undefined;
  @Output() tagClicked = new EventEmitter<Tag>();

  activePageDataChunk: Tag[] = [];

  constructor(){

  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['tagsData'] && this.paginator){
      this.activePageDataChunk = this.tagsData.slice(0, this.paginator.pageSize);
    }
    if(changes['pageEvent'] ){
      this.onPageChanged(changes['pageEvent'].currentValue);
    }
  }

  onPageChanged(pageEvent: PageEvent) {
    if(pageEvent){
      let firstCut = pageEvent.pageIndex * pageEvent.pageSize;
      let secondCut = firstCut + pageEvent.pageSize;
      this.activePageDataChunk = this.tagsData.slice(firstCut, secondCut);
    }
  }

  tagItemClicked(tag: Tag): void{
    this.tagClicked.emit(tag);
  }
}
