import {
  createBrowserRouter,
  Route,
  RouterProvider,
  createRoutesFromElements,
} from "react-router-dom";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import SendMoney from "./pages/SendMoney";
import AuthProvider from "./authProvider";
import Home from "./pages/Home";

function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const router = createBrowserRouter(
  //   createRoutesFromElements(
  //     <Route>
  //       <Route path="/" element={<Home />} />
  //       <Route path="/signup" element={<Signup />} />
  //       <Route path="/signin" element={<Signin />} />
  //       <Route path="/dashboard" element={<Dashboard />} />
  //       <Route path="/send" element={<SendMoney />} />
  //     </Route>
  //   )
  // );

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      index: true,
    },
    {
      path: "/signup",
      element: <Signup />,
    },
    {
      path: "/signin",
      element: <Signin />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/send",
      element: <SendMoney />,
    },
  ]);
  return (
    <AuthProvider>
      <RouterProvider router={router}>
        <div>
          <Home />
        </div>
      </RouterProvider>
    </AuthProvider>
  );
}

export default App;
