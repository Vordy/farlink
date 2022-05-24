import { RouteObject } from "react-router";
import { useRoutes } from "react-router-dom";
import { Base } from "./pages/Base";
import { Link } from "./pages/Link";

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
    path: "/link/:link",
    element: <Link />,
  },
];

export const Routes = () => useRoutes(routes);
