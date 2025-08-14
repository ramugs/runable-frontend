import {
  createRootRoute,
  createRoute,
  createRouter,
  lazyRouteComponent,
  Outlet,
  redirect,
} from "@tanstack/react-router";

const isAuthenticated = () => !!localStorage?.getItem("user-data");

const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
    </>
  ),
});

const logInRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  beforeLoad: () => {
    if (isAuthenticated()) throw redirect({ to: "/dashboard" });
  },
  component: lazyRouteComponent(() => import("../pages/logIn")),
});

const webEditorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/webeditor",
  beforeLoad: () => {
    if (!isAuthenticated()) throw redirect({ to: "/" });
  },
  component: lazyRouteComponent(() => import("../pages/webEditor")),
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  beforeLoad: () => {
    if (!isAuthenticated()) throw redirect({ to: "/" });
  },
  component: lazyRouteComponent(() => import("../pages/dashboard")),
});

const routeTree = rootRoute.addChildren([
  logInRoute,
  dashboardRoute,
  webEditorRoute,
]);

export const router = createRouter({ routeTree });
