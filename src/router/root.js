import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";

const { createBrowserRouter } = require("react-router-dom");
const Loading = <div>Loading...</div>
const TodoIndex = lazy(() => import("../pages/todo/IndexPage"))

const root = createBrowserRouter([
    {
        path: ":id",
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    }
])

export default root;