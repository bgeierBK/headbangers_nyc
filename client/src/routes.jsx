import About from "./pages/About"
import Error from "./pages/Error"
import Home from "./pages/Home"
import App from "./pages/App"
import Scrapbook from "./pages/Scrapbook"
import UserProfile from "./pages/UserProfile"
import VenuePage from "./pages/VenuePage"
import SignUpPage from "./pages/SignUpPage"

const routes = [
{
    path: "/",
    element: <App />,
    children:[
        {
            index: true,
            element: <Home />

        },
        {
            path: "/about",
            element: <About />,
            errorElement: <Error />
        },
        {
            path: "/scrapbook",
            element: <Scrapbook />,
            errorElement: <Error />
        },
        {
            path: "/profile/:id",
            element: <UserProfile />,
            errorElement: <Error />
        },
        {
            path: "/venue/:id",
            element: <VenuePage />,
            errorElement: <Error />
        },
        {
            path: "/signup",
            element: <SignUpPage />,
            errorElement: <Error />
        },
        {
            path: "/login",
            element: <SignUpPage />,
            errorElement: <Error />
        }
    ]
}


]

export default routes