import {
  createBrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { Home, AddContact } from "./pages";
import { Layout } from "./components";

function Root(){
  return (
    <Routes>
      <Route  element={<Layout/>}>
        <Route path="/" element={<Home />} />
        <Route path="/add-contact" element={<AddContact />} />
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