import { AsyncPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { ConvertFormComponent } from '@components/convert-form/convert-form.component';
import { FileChipComponent } from '@components/file-chip/file-chip.component';
import { LoaderComponent } from '@components/loader/loader.component';
import { ConvertedFile } from '@models/converted-file.model';
import { LoadingService } from '@services/loading/loading.service';
import { PdfService } from '@services/pdf/pdf.service';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ToastrService } from 'ngx-toastr';
import { finalize, Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    NgxExtendedPdfViewerModule,
    FileChipComponent,
    ConvertFormComponent,
    AsyncPipe,
    LoaderComponent,
  ],
})
export class AppComponent {

  public currentFile = signal<ConvertedFile | null>(null);
  public convertedFilesList$: Observable<ConvertedFile[]> = this._pdfService.convertedFilesList;

  constructor(
    private readonly _pdfService: PdfService,
    private readonly _toastr: ToastrService,
    private readonly _loadingService: LoadingService,
  ) {
    this._fetchConvertedFiles();
  }

  public onConvert(text: string): void {
    this._convertToPDF(text);
  }

  public onViewFile(fileId: number): void {
    this._pdfService.getConvertedFileById(fileId)
      .subscribe((file) => this.currentFile.set(file));
  }

  public onDeleteFile(fileId: number): void {
    this._pdfService.deleteConvertedFileById(fileId)
      .subscribe({
        next: () => {
          this._fetchConvertedFiles();
          if (this.currentFile()?.id === fileId) {
            this.currentFile.set(null);
          }
          this._toastr.success($localize`Converted file has been deleted`);
        },
        error: () => this._toastr.error($localize`Could not delete file`),
      });
  }

  private _convertToPDF(text: string): void {
    this._loadingService.setLoadingState(true);
    this._pdfService.convert(text)
      .pipe(finalize(() => this._loadingService.setLoadingState(false)))
      .subscribe({
        next: (res) => {
          this.currentFile.set(res);
          this._toastr.success($localize`Successfully converted`);
        },
        error: () => this._toastr.error($localize`Error converting file`),
      });
  }

  private _fetchConvertedFiles(): void {
    this._pdfService.fetchConvertedFilesList();
  }

}
