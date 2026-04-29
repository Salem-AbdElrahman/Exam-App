import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    const token = localStorage.getItem('userToken');
    // console.log('Token From storage',token);


    if (localStorage.getItem('userToken')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('userToken')}`
      }
    });
    }
     return next(req);
  }
  return next(req);
  };


