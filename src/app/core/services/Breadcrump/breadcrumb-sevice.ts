import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject, filter } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private router = inject(Router);
  private _breadcrumbs$ = new BehaviorSubject<Array<{ label: string, url: string }>>([]);
  breadcrumbs$ = this._breadcrumbs$.asObservable();

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Array<{ label: string, url: string }> = [];
      this.addBreadcrumb(root, [], breadcrumbs);
      this._breadcrumbs$.next(breadcrumbs);
    });
  }
private addBreadcrumb(route: ActivatedRouteSnapshot, parentUrl: string[], breadcrumbs: any[]) {
  if (route) {
    const routeUrl = parentUrl.concat(route.url.map(url => url.path));

    let label = route.data['breadcrumb'];

    if (route.params['name']) {
      label = route.params['name'];
    }

    if (label) {
      breadcrumbs.push({
        label: label,
        url: '/' + routeUrl.join('/')
      });
    }

    if (route.firstChild) {
      this.addBreadcrumb(route.firstChild, routeUrl, breadcrumbs);
    }
  }
}
}
