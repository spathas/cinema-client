import { Fragment } from "react";

import MainNavigation from "./MainNavigation";
import Footer from "./Footer";

const Layout = (props) => {
  return (
    <Fragment>
      <header>
        <MainNavigation />
      </header>
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
