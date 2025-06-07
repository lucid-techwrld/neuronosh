import Header from "./Header";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="w-full max-h-screen relative ">
      <Header />
      <main className="mt-20 font-myFont ">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
