import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { LoadingService } from '../components/loading/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../shared/components/dialog/dialog.component';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loadingService: LoadingService, public dialog: MatDialog) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loadingService.show();
    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
                this.loadingService.hide();
              }
         },
        error: err => {
          this.loadingService.hide();
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Error',
              contentMsg: err.message
            },
          });
        },
      })
    );
  }
}
