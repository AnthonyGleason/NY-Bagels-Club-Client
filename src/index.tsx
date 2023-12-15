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
import Careers from './Components/Careers/Careers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HashRouter>
      <Nav />
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
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/subscribe' element={<SubscriptionPage />} />
        <Route path='/cart/checkout/success/:pendingOrderDocID' element={<CheckoutSuccess />} />
        <Route path='/cart' element={<CartSummary />} />
        <Route path='/club' element={<Club />} />
        <Route path='/accounts/password/reset/:resetID' element={<ResetPassword />} />
        <Route path='/accounts/orders' element={<MyOrders />} />
        <Route path='/accounts/settings' element={<AccountSettings />} />
        <Route path='/careers' element={<Careers />} />
        <Route path='/support' element={<Support />} />
      </Routes>
      <Footer />
    </HashRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
