import About from "./pages/About"
import Error from "./pages/Error"
import Home from "./pages/Home"
import App from "./pages/App"
import UserProfile from "./pages/UserProfile"
import VenuePage from "./pages/VenuePage"
import SignUpPage from "./pages/SignUpPage"
import LogInPage from "./pages/LogInPage"

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
            path: "/users/:id",
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
            element: <LogInPage />,
            errorElement: <Error />
        }
    ]
}


]

export default routes