import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import Home from "./views/Home.tsx";
import Messenger from "./views/Messenger.tsx";
import Login from "./views/Login.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home/>,
    },
    {
        path: "/messenger",
        element: <Messenger/>,
    },
    {
        path: "login",
        element: <Login/>,
    },
    {
        path: "about",
        element: <div>About</div>,
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}/>
    </StrictMode>,
)
