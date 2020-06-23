import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
//import Auth from "../hoc/auth";
// pages for this product
import LandingPage from "./views/LandingPage/LandingPage.js";
// import LoginPage from "./views/LoginPage/LoginPage.js";
// import RegisterPage from "./views/RegisterPage/RegisterPage.js";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer"
// import UploadProductPage from './views/UploadProductPage/UploadProductPage'
// import DetailProductPage from './views/DetailProductPage/DetailProductPage';
// import CartPage from './views/CartPage/CartPage';
// import HistoryPage from './views/HistoryPage/HistoryPage';

function App() {
  return (
    <Suspense fallback={(<div>Loading...</div>)}>
      <NavBar />
      <div style={{ paddingTop: '75px', minHeight: 'calc(100vh - 80px)' }}>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          

        </Switch>
      </div>
      <Footer />
    </Suspense>
  );
}

export default App;
