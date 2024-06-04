import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {

  private _loadingState$ = new BehaviorSubject<boolean>(false);

  public get isLoading$(): Observable<boolean> {
    return this._loadingState$.asObservable();
  }

  public setLoadingState(value: boolean): void {
    this._loadingState$.next(value);
  }

}
