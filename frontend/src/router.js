import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import NotFound from './views/NotFound.vue';
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/profile',
      name: 'profile',
      // lazy-loaded
      component: () => import('./views/Profile.vue')
    },
    {
      path: "/products",
      name: "products",
      component: () => import("./views/ProductsList")
    },
    {
      path: "/products/:id",
      name: "products-details",
      component: () => import("./views/Product")
    },
    {
      path: "/addProduct",
      name: "addProduct",
      component: () => import("./views/AddProduct")
    },
    {
      path: '/:pathMatch(.*)*', //will match everything and put it under `$route.params.pathMatch`
      name: 'not-found',
      component: NotFound
    }
  ]
  
});
router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');
    // redirect to login page
    if (authRequired && !loggedIn) {
      next('/login');
    } else {
      next();
    }
  });