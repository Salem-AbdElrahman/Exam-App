import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const logedGuard: CanActivateFn = (route, state) => {

  let router=inject(Router)
  let pLATFORM_ID=inject(PLATFORM_ID)
if (isPlatformBrowser(pLATFORM_ID)) {
 if (localStorage.getItem('userToken')!==null) {

router.navigate(['/Diplomas'])
return false;
 }
 else{
  return true;
 }
}
return false;
};
