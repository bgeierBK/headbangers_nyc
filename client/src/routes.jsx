import About from "./pages/About"
import Error from "./pages/Error"
import Home from "./pages/Home"
import Scrapbook from "./pages/Scrapbook"
import UserProfile from "./pages/UserProfile"
import VenuePage from "./pages/VenuePage"

const routes = [
{
    path: "/",
    element: <Home />,
    errorElement: <Error />
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
}

]

export default routes