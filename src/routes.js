import { lazy } from 'ice';

const UserLayout = lazy(() => import('./layouts/UserLayout'));
const BasicLayout = lazy(() => import('./layouts/BasicLayout'));
const ScreenLayout = lazy(() => import('./layouts/ScreenLayout'));

const routes = [
  {
    path: '/',
    component: BasicLayout,
    exact: true
  },
  {
    path: '/pages',
    component: ScreenLayout,
  },
  {
    path: '/user',
    component: UserLayout,
  }
];

export default routes;
