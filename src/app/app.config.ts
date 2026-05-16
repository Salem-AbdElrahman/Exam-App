import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth-interceptor';
import { errorsInterceptor } from './core/interceptors/errors/errors-interceptor';
import { provideToastr } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(withFetch(),withInterceptors([authInterceptor,errorsInterceptor,loadingInterceptor])),
    provideRouter(routes), provideClientHydration(withEventReplay()),
        provideToastr(), // Toastr providers
        importProvidersFrom(NgxSpinnerModule),

  ]
};
