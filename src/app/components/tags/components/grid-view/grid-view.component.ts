import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { TagsService } from '../../services/tags.service';
import { Observable } from 'rxjs';
import { Tag } from '../../model/tag.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Filter } from '../utils/filter';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridViewComponent {
  @Input() tagsData : any[] = [];
  @Input() paginator!: MatPaginator;
  @Input() pageEvent: PageEvent | undefined = undefined;
  @Input() filterString = '';
  @Output() tagClicked = new EventEmitter<Tag>();

  activePageDataChunk: Tag[] = [];
  filteredTags: Tag[] = this.tagsData;
  filter = new Filter();

  constructor(){
  }

  ngOnChanges(changes: SimpleChanges) {
    if((changes['tagsData'] || changes['filterString']) && this.paginator){
      this.filteredTags = this.filter.getTags((this.filterString || ''), this.tagsData);
      this.activePageDataChunk = this.filteredTags.slice(0, this.paginator.pageSize);
    }
    if(changes['pageEvent'] ){
      this.onPageChanged(changes['pageEvent'].currentValue);
    }
  }

  ngOnInit() : void {
  }

  onPageChanged(pageEvent: PageEvent) {
    if(pageEvent){
      let firstCut = pageEvent.pageIndex * pageEvent.pageSize;
      let secondCut = firstCut + pageEvent.pageSize;
      this.activePageDataChunk = this.filteredTags.slice(firstCut, secondCut);
    }
  }

  tagItemClicked(tag: Tag): void{
    this.tagClicked.emit(tag);
  }
}
