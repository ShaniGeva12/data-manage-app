import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { ItemsView } from './model/items-view';
import { Tag } from './model/tag.model';
import { Observable } from 'rxjs';
import { TagsService } from './services/tags.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubSink } from 'subsink';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent {

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;


  @Input() view = ItemsView.List;
  @Output() tagRowClicked = new EventEmitter<Tag>();

  dataSource$: Observable<Tag[]> = this.tagsService.tags$;
  viewOptions = ItemsView;
  pageEvent: PageEvent | undefined = undefined;

  subs: SubSink = new SubSink();

  constructor(private tagsService: TagsService){}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe;
  }

  tagClicked(tag: Tag): void{
    this.tagRowClicked.emit(tag);
  }

  onPageChanged(pageEvent: PageEvent){
    this.pageEvent = pageEvent;
  }

}
