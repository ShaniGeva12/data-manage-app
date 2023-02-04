import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ItemsView } from './model/items-view';
import { Tag } from './model/tag.model';
import { Observable, tap } from 'rxjs';
import { TagsService } from './services/tags.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SubSink } from 'subsink';
import { Filter } from './components/utils/filter';

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
  @Input() filterString = '';
  @Output() tagRowClicked = new EventEmitter<Tag>();

  filter = new Filter();

  dataSource$: Observable<Tag[]> = this.tagsService.tags$.pipe(tap((tags) => {
    let filtered = this.filter.getTags((this.filterString || ''), tags);
    this.dataLength = filtered.length;
  }));
  viewOptions = ItemsView;
  pageEvent: PageEvent | undefined = undefined;

  subs: SubSink = new SubSink();

  dataLength = 0;

  constructor(private tagsService: TagsService){}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['filterString'] && this.view === ItemsView.Grid){
      this.dataSource$ = this.tagsService.tags$.pipe(tap((tags) => {
        let filtered = this.filter.getTags((this.filterString || ''), tags);
        this.dataLength = filtered.length;
      }));
    }
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe;
  }

  tagClicked(tag: Tag): void {
    this.tagRowClicked.emit(tag);
  }

  onPageChanged(pageEvent: PageEvent) {
    this.pageEvent = pageEvent;
  }

  // onDataLengthChanged(length: number) {
  //   this.dataLength = length;
  // }


}
