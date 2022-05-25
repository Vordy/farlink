import { RouteObject } from "react-router";
import { useRoutes } from "react-router-dom";
import { Base } from "./pages/Base";
import { EasyPeer } from "./pages/EasyPeer";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Base />,
  },
  {
    path: "/:id",
    element: <Base />,
  },
  {
    path: "/peer/:source/to/:peer",
    element: <EasyPeer />,
  },
];

export const Routes = () => useRoutes(routes);
