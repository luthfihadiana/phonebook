import { Header, Toaster } from "..";
import { LayouContent, LayoutContainer } from "./index.styles";
import { Outlet } from "react-router-dom";

function Layout(){
  return(
    <LayoutContainer>
      <Header/>
      <LayouContent>
        <Outlet/>
      </LayouContent>
      <Toaster/>
    </LayoutContainer>
  );
}

export default Layout;