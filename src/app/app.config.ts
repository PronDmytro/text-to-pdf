import { provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DB_CONFIG } from '@constants/db-config.constant';
import { apiKeyInterceptor } from '@interceptors/api-key.interceptor';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    importProvidersFrom(NgxIndexedDBModule.forRoot(DB_CONFIG)),
    provideHttpClient(
      withInterceptors([apiKeyInterceptor]),
      withInterceptorsFromDi(),
    ),
    provideAnimations(),
    provideToastr(),
  ],
};
