import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';

//import components
import Nav from './Components/Nav/Nav';
import Footer from './Components/Home/Footer/Footer';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Club from './Components/Club/Club';

//import css
import './index.css';
import CheckoutSuccess from './Components/Checkout/CheckoutSuccess/CheckoutSuccess';
import SubscriptionPage from './Components/Accounts/SubscriptionPage/SubscriptionPage';
import MyOrders from './Components/Accounts/MyOrders/MyOrders';
import AccountSettings from './Components/Accounts/AccountSettings/AccountSettings';
import ResetPassword from './Components/Accounts/ResetPassword/ResetPassword';
import Admin from './Components/Admin/Admin';
import Snowfall from 'react-snowfall';
import Support from './Components/Support/Support';
import CartSummary from './Components/Checkout/CartSummary/CartSummary';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Snowfall 
        style={{
          position: 'fixed',
          width: '100vw',
          height: '100%',
          zIndex: '100'
        }}
        snowflakeCount={3}
      />
      <Routes>
        <Route path='/' element={
          <>
            <Nav />
            <Home />
            <Footer />
          </>
        } />
        <Route
          path='/admin'
          element={
            <>
              <Nav />
              <Admin />
              <Footer />
            </>
          }
        />
        <Route
          path='/login'
          element={
            <>
              <Nav />
              <Login />
              <Footer />
            </>
          }
        />
        <Route
          path='/register'
          element={
            <>
              <Nav />
              <Register />
              <Footer />
            </>
          }
        />
        <Route
          path='/subscribe'
          element={
            <>
              <Nav />
              <SubscriptionPage />
              <Footer />
            </>
          }
        />
        <Route
          path='/cart/checkout/success/:pendingOrderDocID'
          element={
            <>
              <Nav />
              <CheckoutSuccess />
              <Footer />
            </>
          }
        />
        <Route
          path='/cart'
          element={
            <>
              <Nav />
              <CartSummary />
              <Footer />
            </>
          }
        />
        <Route
          path='/club'
          element={
            <>
              <Nav />
              <Club />
              <Footer />
            </>
          }
        />
        <Route
          path='/accounts/password/reset/:resetID'
          element={
            <>
              <Nav />
              <ResetPassword />
              <Footer />
            </>
          }
        />
        <Route
          path='/accounts/orders'
          element={
            <>
              <Nav />
              <MyOrders />
              <Footer />
            </>
          }
        />
        <Route
          path='/accounts/settings'
          element={
            <>
              <Nav />
              <AccountSettings />
              <Footer />
            </>
          }
        />
        <Route
          path='/support'
          element={
            <>
              <Nav />
              <Support />
              <Footer />
            </>
          }
        />
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
