import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { Tag } from '../../model/tag.model';
import { TagsService } from '../../services/tags.service';
import { Filter } from '../utils/filter';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListViewComponent {
  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;

  @Input() paginator!: MatPaginator;
  @Input() tagsData : any;
  @Input() filterString = '';
  @Output() tagRowClicked = new EventEmitter<Tag>();
  @Output() filteredLength = new EventEmitter<number>();

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['color', 'name', 'createDate', 'lastUpdate', 'createdBy'];

  subs: SubSink = new SubSink();
  lastFilter: string = '';
  filter = new Filter();

  constructor(private tagsService: TagsService){}

  ngOnChanges(changes: SimpleChanges) {
    if(changes['tagsData'] || changes['filterString']){
      this.dataSource.data = this.filter.getTags((this.filterString || ''), this.tagsData);
      this.filteredLength.emit(this.dataSource.data.length);
    }
    if(changes['paginator'] ){
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnInit(): void {
    this.dataSource.sortingDataAccessor = (data, sortHeaderId) => data[sortHeaderId].toLocaleLowerCase();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  rowClicked(row: Tag): void{
    this.tagRowClicked.emit(row);
  }
}
