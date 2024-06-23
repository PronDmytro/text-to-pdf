import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DB_CONFIG } from '@constants/db-config.constant';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { provideQuillConfig } from 'ngx-quill';
import { provideToastr } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    importProvidersFrom(NgxIndexedDBModule.forRoot(DB_CONFIG)),
    provideHttpClient(
      // withInterceptors([apiKeyInterceptor]),
      withInterceptorsFromDi(),
    ),
    provideAnimations(),
    provideToastr(),
    provideQuillConfig({
      modules: {
        syntax: false,
      },
    }),
  ],
};
