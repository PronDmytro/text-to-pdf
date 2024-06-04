import { AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { LoadingService } from '@services/loading/loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    AsyncPipe,
  ],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.scss',
})
export class LoaderComponent {

  public isLoading$ = this._loadingService.isLoading$;

  constructor(
    private readonly _loadingService: LoadingService,
  ) {
  }

}
