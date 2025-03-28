import './App.css';
import Headder from './Headder';
import Footter from './Footter';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import SignupPage from './SignupPage';
import Nests from './Nests';
import Profile from './Profile';
import ShowTreesUrls from './ShowTreeUrls';
import ShowLinkTree from './ShowLinkTree';
import NotFoundPage from "./NotFoundPage";
import { UserProvider } from './CONTEXT_PROVIDERS/UserProvider';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';


const router = createBrowserRouter([
  { path: "/login", element: <LoginPage /> },
  { path: "/sign_up", element: <SignupPage /> },
  { path: "/", element: <> <Headder /> <HomePage /> <Footter /> </> },
  { path: "/nests/:tree_id", element: <> <ShowLinkTree /> </> },
  { path: "/nests", element: <> <Headder /> <Nests /> <Footter /> </> },
  { path: "/profile", element: <> <Headder /> <Profile /> <Footter /> </> },
  { path: "/profile/:tree_id", element: <> <Headder /> <ShowTreesUrls /> <Footter /> </> },
  { path: "*", element: <> <NotFoundPage /> </>  }
]);

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  );
}

export default App;