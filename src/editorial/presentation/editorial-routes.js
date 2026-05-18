/**
 * Editorial Presentation Layer - Routes Configuration
 */

export const editorialRoutes = [
  {
    path: '/home',
    name: 'editorAnalyticsHome',
    component: () => import('./views/editor-analytics.vue'),
    meta: { title: 'Home' }
  },
  {
    path: '/support/editors/new',
    name: 'newEditor',
    component: () => import('./views/new-editor.vue'),
    meta: { title: 'New Editor' }
  }
];

export default editorialRoutes;

