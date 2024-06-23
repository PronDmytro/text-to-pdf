import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { ConvertedFile } from '@models/converted-file.model';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PdfService {

  private readonly _BASE_URL: string = `${environment.apiUrl}`;

  private _convertedFilesList$ = new BehaviorSubject<ConvertedFile[]>([]);

  private readonly _STORE_NAME = 'converted-files';

  constructor(
    private readonly _http: HttpClient,
    private readonly _dbService: NgxIndexedDBService,
  ) {
  }

  public get convertedFilesList(): Observable<ConvertedFile[]> {
    return this._convertedFilesList$.asObservable();
  }

  public convert(text: string): Observable<ConvertedFile> {
    return this._http.post<Blob>(`${this._BASE_URL}/text-to-pdf`, { text }, { responseType: 'blob' as 'json' })
      .pipe(
        switchMap((blob: Blob) => this._insertFileToDb(blob)),
        tap((convertedFile) => this._convertedFilesList$.next([...this._convertedFilesList$.value, convertedFile])),
      );
  }

  public fetchConvertedFilesList(): void {
    this._dbService.getAll<ConvertedFile>(this._STORE_NAME)
      .subscribe((list) => this._convertedFilesList$.next(list));
  }

  public getConvertedFileById(id: number): Observable<ConvertedFile> {
    return this._dbService.getByID(this._STORE_NAME, id);
  }

  public deleteConvertedFileById(id: number): Observable<boolean> {
    return this._dbService.deleteByKey(this._STORE_NAME, id);
  }

  private _insertFileToDb(file: Blob): Observable<ConvertedFile> {
    return this._dbService.add(this._STORE_NAME, { createdAt: new Date().toISOString(), file });
  }

}
