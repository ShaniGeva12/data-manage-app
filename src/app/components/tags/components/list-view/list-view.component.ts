import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { SubSink } from 'subsink';
import { Tag } from '../../model/tag.model';
import { TagsService } from '../../services/tags.service';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent {
  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;
  @ViewChild(MatSort, { static: true })
  sort!: MatSort;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @Output() tagRowClicked = new EventEmitter<Tag>();

  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['color', 'name', 'createDate', 'lastUpdate', 'createdBy'];

  subs: SubSink = new SubSink();

  constructor(private tagsService: TagsService){}

  ngOnInit(): void {
    this.subs.sink = this.tagsService.tags$.subscribe((tags : Tag[])=>{
      this.dataSource.data = tags;
    });
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
