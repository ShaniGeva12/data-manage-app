import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { TagsService } from './services/tags.service';
import { SubSink } from 'subsink';
import { Tag } from './model/tag.model';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
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
