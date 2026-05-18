import {createRouter, createWebHistory} from "vue-router";
import editorialRoutes from "./editorial/presentation/editorial-routes.js";

// Define lazy-loaded components for routes
const pageNotFound = () => import('./shared/presentation/views/page-not-found.vue');

/**
 * Application route definitions for YouTube Music Editorial Platform.
 * Includes editorial bounded context routes and catch-all routes.
 *
 * @type {import('vue-router').RouteRecordRaw[]}
 */
const routes = [
    ...editorialRoutes,
    { path: '/',                        redirect: '/home' },
    { path: '/:pathMatch(.*)*',         name: 'not-found',      component: pageNotFound, meta: { title: 'Page Not Found' } }
];

/**
 * Vue Router instance for the application.
 * Uses HTML5 history mode with the base URL provided by Vite.
 *
 * @type {import('vue-router').Router}
 */
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
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
    console.log(`Navigating from ${from.name} to ${to.name}`);
    // Set the page title
    let baseTitle = 'YouTube Music Editorial Platform';
    document.title = `${baseTitle} - ${to.meta['title']}`;
    return next();
});

export default router;