import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoadingComponent {
  isVisible$ = this.loadingService.visibility;

  constructor(private loadingService: LoadingService){}
}
