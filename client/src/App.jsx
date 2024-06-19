import "./App.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Login from "./Pages/Login/Login.jsx";
import Admin from "./Pages/Admin/Admin.jsx";
import Home from "./Pages/Home/Home.jsx";
import AddUser from "./Pages/Admin/Sub Pages/AddUser/AddUser.jsx";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import ClientListForm from "./Pages/Admin/Sub Pages/Form/Form.jsx";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="App">
        <QueryClientProvider client={queryClient}>
          <Outlet />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/admin",
          element: <Admin />,
        },
        {
          path: "/admin/addUser",
          element: <AddUser />,
        },
      ],
    },
  ]);
  return (
    <>
      <div>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
