import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading...</div>
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))
const TodoIndex1 = lazy(() => import("../pages/todo/MenuPage"))

const root = createBrowserRouter([
    {
      path: "categories",
      element: <Suspense fallback={Loading}><TodoIndex1 /></Suspense>,
    },
    {
        path: "categories/:id",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    }
])

export default root;