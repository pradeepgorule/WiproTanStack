import { createRootRoute, createRoute, createRouter } from '@tanstack/react-router';
import App from './App';
import CharacterList from './components/CharacterList';
import CharacterDetail from './components/CharacterDetails';

const rootRoute = createRootRoute({
  component: App,
});

const listRoute = createRoute({
  path: '/',
  getParentRoute: () => rootRoute,
  component: CharacterList,
});

const detailRoute = createRoute({
  path: '/character/$id',
  getParentRoute: () => rootRoute,
  component: CharacterDetail,
});

const routeTree = rootRoute.addChildren([listRoute, detailRoute]);

export const router = createRouter({ routeTree });