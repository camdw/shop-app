import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class NavService {
  public _subject = new Subject<Object>();
  public event = this._subject.asObservable();

  public publish(data: any) {
   this._subject.next(data);
  }

  constructor() { }

}