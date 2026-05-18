import { createRouter, createWebHistory } from 'vue-router';
import i18n from './i18n.js';

const routes = [
  { path: '/', redirect: '/home' },
  {
    path: '/home',
    name: 'home',
    component: () => import('./shared/presentation/views/home.vue'),
    meta: { titleKey: 'home.title' }
  },
  {
    path: '/preservation/items/new',
    name: 'new-preservation-item',
    component: () => import('./shared/presentation/views/new-preservation-item.vue'),
    meta: { titleKey: 'newPreservationItem.title' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./shared/presentation/views/page-not-found.vue'),
    meta: { titleKey: 'pageNotFound.title' }
  }
];

/**
 * Vue Router instance for the application.
 * Uses HTML5 history mode with the base URL provided by Vite.
 *
 * @type {import('vue-router').Router}
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

/**
 * Global navigation guard that updates the document title.
 *
 * @param {import('vue-router').RouteLocationNormalized} to - Target route.
 * @param {import('vue-router').RouteLocationNormalized} from - Previous route.
 * @param {import('vue-router').NavigationGuardNext} next - Guard continuation callback.
 * @returns {void}
 */
router.beforeEach((to, from, next) => {
  const titleKey = to.meta.titleKey;
  const pageTitle = titleKey ? i18n.global.t(titleKey) : '';
  document.title = pageTitle ? `${i18n.global.t('app.title')} - ${pageTitle}` : i18n.global.t('app.title');
  return next();
});

export default router;