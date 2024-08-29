import Hero from "./components/Hero"
import Home from "./components/Home/Home"
import Login from "./components/Login/Login"
import Navbar from "./components/Navbar"
import ForgotPassword from "./components/Signin/ForgotPassword"
import OtpVerification from "./components/Signin/OtpVerification"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Hero />,
    },
    {
      path: "/auth",
      element: <Navbar />,
      children: [
        {
          path: "main",
          element: <Login />,
        },
        {
          path: "home",
          element: <Home />,
        },
      ],
    },

    {
      path: "/reset-password",
      element: <ForgotPassword />,
    },
    {
      path: "/otp-verification",
      element: <OtpVerification />,
    },
    {
      path: "*",
      element: <div>Page not found</div>,
    },
    
  ])

  /*  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/",
        element: (
          <UserRouteGuard>
            <Home />
          </UserRouteGuard>
        ),
      },
      {
        path: "/dashboard/delete-books",
        element: (
          <UserRouteGuard>
             <AdminRouteGuard />
          </UserRouteGuard>
        ),
      },
      {
        path: "/dashboard/add-book",
        element: (
          <UserRouteGuard>
            <AddBook />
          </UserRouteGuard>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <UserRouteGuard>
            <Profile />
          </UserRouteGuard>
        ),
      },
    ],
  }, */

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App

