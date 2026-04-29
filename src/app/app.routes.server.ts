import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'Question/:examid',
    renderMode: RenderMode.Server
  },
  {
    path: 'Exam/:id/:title',
    renderMode: RenderMode.Server
  },
   {
    path: 'Answer/:id',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
