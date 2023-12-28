import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading...</div>
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))

const root = createBrowserRouter([
    {
        path: "1",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    },
    {
        path: "2",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    },
    {
        path: "3",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    },
    {
        path: "4",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    }
])

export default root;