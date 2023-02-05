import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  count = 0;
  visibility: BehaviorSubject<boolean>;

  constructor() {
    this.visibility = new BehaviorSubject(false);
  }

  increaseLoadersCount() {
    this.visibility.next(true);
    this.count++;
  }

  decreaseLoadersCount() {
    this.count--;
    if(this.count === 0) {
      this.visibility.next(false);
    }
  }
}
