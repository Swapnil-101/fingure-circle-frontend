import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import ProtectedRoutes from 'routes/protected/ProtectedRoutes';
import PublicRoutes from 'routes/public/PublicRoutes';

import PublicRoutesOutlet from 'routes/public/PublicRoutesOutlet';
import ProtectedRoutesOutlet from 'routes/protected/ProtectedRoutesOutlet';

import PageNotFound from './pages/404';

interface RouteI {
  path: string;
  component: React.ReactNode;
}

function App() {
  return (
    <main className="h-screen">
      <ToastContainer />
      <Routes>
        <Route element={<ProtectedRoutesOutlet />}>
          {
            ProtectedRoutes?.map((route: RouteI) => <Route key={route.path} path={route.path} element={route.component} />)
          }
        </Route>
        <Route element={<PublicRoutesOutlet />} >
          {
            PublicRoutes?.map((route: RouteI) => <Route key={route.path} path={route.path} element={route.component} />)
          }
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </main>
  );
}

export default App;
