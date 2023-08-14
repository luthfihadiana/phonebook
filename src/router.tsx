import {
  createBrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Layout, LoadingIndicator } from "./components";
import { lazy, Suspense } from "react";

const HomePage = lazy(()=> import('./pages/Home'));
const AddContact = lazy(()=> import('./pages/AddContact'));

function Root(){
  return (
    <Routes>
      <Route  element={<Layout/>}>
        <Route path="/" element={
          <Suspense fallback={<LoadingIndicator/>}>
            <HomePage/>
          </Suspense>
        } />
        <Route path="/add-contact" element={
          <Suspense fallback={<LoadingIndicator/>}>
            <AddContact/>
          </Suspense>
        } />
        <Route path="*" element={<Navigate to="/" replace/>}/>
      </Route>
    </Routes>
  );
}

const router = createBrowserRouter([
  {
    path: "*",
    Component: Root,
  }
]);

export default router;