import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';
import { AddTagRequest, Tag } from '../model/tag.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  private readonly TagsServiceUrl = 'http://localhost:3002/tags';

  private _tags$: BehaviorSubject<Tag[]> = new BehaviorSubject<Tag[]>([]);
  public tags$: Observable<Tag[]> = this._tags$.asObservable();

  constructor(private http: HttpClient) {
    this.refreshTagsList();
  }

  private refreshTagsList(): void {
    this.getTags().subscribe(res => {
      this._tags$.next(res);
    });
  }

  private getTags(): Observable<Array<Tag>> {
    return this.http.get<Array<Tag>>(this.TagsServiceUrl)
    .pipe(
      catchError(err => this.handleError(err, 'getTags'))
    );
  }

  private postTag(tag: AddTagRequest): Observable<Tag> {
    return this.http.post<Tag>(this.TagsServiceUrl, tag)
    .pipe(
      catchError(err => this.handleError(err, 'postTag', tag))
    );
  }

  private putTag(tag: Tag): Observable<Tag> {
    return this.http.put<Tag>( `${this.TagsServiceUrl}/${tag.id}X` , <AddTagRequest>tag)
      .pipe(
        catchError(err => this.handleError(err, 'putTag', tag))
      );
  }

  private deleteTag(id: number): Observable<unknown> {
    const url = this.TagsServiceUrl + '/' + id;
    return this.http.delete(url)
      .pipe(
        catchError(err => this.handleError(err, 'deleteTag', id))
      );
  }

  private handleError(error: HttpErrorResponse, methodName? : string, obj? : any) {
    if (error.status === 0) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status} from method "${methodName}". Full error and obj: `, error, obj);
    }
    return throwError(() => error);
  }

  addTag(tag: AddTagRequest) : Observable<Tag> {
    return this.postTag(tag)
      .pipe(
        tap(() => this.refreshTagsList()),
      );
  }

  updateTag(tag: Tag) : Observable<Tag> {
    return this.putTag(tag)
      .pipe(
        tap(() => this.refreshTagsList()),
      )
  }

  removeTag(tagId: number) {
    this.deleteTag(tagId)
      .pipe(
        tap(() => this.refreshTagsList()),
      )
    .subscribe();
  }
}
