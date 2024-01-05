import React, { useEffect, useRef, useState } from 'react';
import { Cart, Order } from '../../../Interfaces/interfaces';
import './MyOrders.css';
import Sidebar from '../../Sidebar/Sidebar';
import { emptyCart, fetchAndHandleCart } from '../../../Helpers/cart';
import { verifyLoginToken } from '../../../Helpers/auth';
import OrderItem from './OrderItem/OrderItem';
import { getServerUrlPrefix } from '../../../Config/clientSettings';
import './MyOrders.css';

export default function MyOrders(){
  const [emailInput,setEmailInput] = useState<string>('');
  const [orderIDInput,setOrderIDInput] =useState<string>('#');

  const [order,setOrder] = useState<Order>();
  const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
  const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
  const [cart,setCart] = useState<Cart>(emptyCart);

  const isInitialLoad = useRef(true);

  useEffect(()=>{
    if(isInitialLoad.current){
      isInitialLoad.current = false;
      //fetch and set cart
      fetchAndHandleCart(setCart);
      //verify login token
      verifyLoginToken(setIsSignedIn);
    };
  },[]);

  const handleRequestOrder = async function(){
    if (!emailInput){
      alert('The email field cannot be left blank.')
      return;
    };
    if (!orderIDInput){
      alert('The orderID field cannot be left blank.')
      return;
    };
    //trim #
    const formattedOrderID: string = orderIDInput[0] === '#' ? orderIDInput.substring(1) : orderIDInput;

    const response = await fetch(`${getServerUrlPrefix()}/api/shop/orders/${formattedOrderID}`,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: emailInput
      })
    })
    
    if (response.status===404){
      alert('An order was not found for the provided email and order number.');
    }else if(response.status===401){
      alert('The provided email or order number are incorrect. Please review the entered order number and ensure you entered the same email as the one you provided during checkout.')
    };

    const responseData = await response.json();
    if (responseData.orderData) setOrder(responseData.orderData);
  };

  const handleOrderIDInputChange = function(newVal:string){
    if (newVal[0]!=='#'){
      setOrderIDInput('#'+newVal);
    }else{
      setOrderIDInput(newVal);
    };
  };

  return(
    <>
      <Sidebar 
          cart={cart}
          isExpanded={isSidebarExpanded} 
          setIsExpanded={setIsSidebarExpanded}
          isSignedIn={isSignedIn}
          setIsSignedIn={setIsSignedIn}
        />
      <div className='guest-order-tracking' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
        <form className='guest-order-tracking-form'>
          <h3 className='store-items-heading'>Track My Order</h3>
          <p>
            Please enter both the same email as entered during checkout along with the order number generated on your New York Bagels Club order confirmation email.
          </p>
          <div className='email-input'>
            <label>Email Address:</label>
            <input  value={emailInput} onChange={(e)=>{setEmailInput(e.target.value)}} placeholder='example@example.com' />
          </div>
          <div className='order-input'>
            <label>Order Number:</label>
            <input  value={orderIDInput} onChange={(e)=>{handleOrderIDInputChange(e.target.value)}} placeholder='#1234567890' />
          </div>
          <button className='search-guest-order-button' type='button' onClick={()=>{handleRequestOrder()}}>View My Order</button>
          {
            order ?     
              <OrderItem 
                cart={order.cart}
                dateCreated={new Date(order.dateCreated)}
                giftMessage={order.giftMessage || ''}
                shippingAddress={order.shippingAddress}
                status={order.status}
                totalAmount={order.cart.finalPriceInDollars}
                trackingNumberArr={order.trackingNumberArr || []}
                order={order}
              />
            :
              null
          }
        </form>
      </div>
    </>
  )
};
// export default function MyOrders(){
//   const [orders,setOrders] = useState<Order[]>([]);
//   const [isSignedIn,setIsSignedIn] = useState<boolean>(true);
//   const [isSidebarExpanded,setIsSidebarExpanded] = useState<boolean>(false);
//   const [cart,setCart] = useState<Cart>(emptyCart);

//   const isInitialLoad = useRef(true);

//   useEffect(()=>{
//     if(isInitialLoad.current){
//       isInitialLoad.current = false;
//       //fetch orders
//       fetchOrders(setOrders);
//       //fetch and set cart
//       fetchAndHandleCart(setCart);
//       //verify login token
//       verifyLoginToken(setIsSignedIn);
//     };
//   },[]);

//   return(
//     <>
//       <Sidebar 
//         cart={cart}
//         isExpanded={isSidebarExpanded} 
//         setIsExpanded={setIsSidebarExpanded}
//         isSignedIn={isSignedIn}
//         setIsSignedIn={setIsSignedIn}
//       />
//       <div className='my-orders' onClick={()=>{setIsSidebarExpanded(isSidebarExpanded===true ? false: false)}}>
//         <h3 className='my-orders-heading'>My Orders</h3>
//         <ul className='orders-container'>
//           {
//             orders.length<=0
//             ?
//               <li>Place your first order to get started!</li>
//             :
//             orders.sort((a,b)=>{
//               if (a.dateCreated>b.dateCreated) return -1;
//               return 1;
//             }).map((order:Order,index:number)=>{
//               const orderDate = new Date(order.dateCreated);
//               const dateCreated = new Date(orderDate.getUTCFullYear(), orderDate.getUTCMonth(), orderDate.getUTCDate(), orderDate.getUTCHours(), orderDate.getUTCMinutes(), orderDate.getUTCSeconds());
//               const giftMessage:string = order.giftMessage || '';
//               const shippingAddress:Address = order.shippingAddress;
//               const status:string = order.status;
//               const totalAmount:number = order.cart.finalPriceInDollars;
//               const trackingNumberArr:string[] = order.trackingNumberArr || [];
//               const orderCart:Cart = order.cart;
              
//               return(
//                 <OrderItem 
//                   cart={orderCart}
//                   dateCreated={dateCreated}
//                   giftMessage={giftMessage}
//                   shippingAddress={shippingAddress}
//                   status={status}
//                   totalAmount={totalAmount}
//                   trackingNumberArr={trackingNumberArr}
//                   order={order}
//                   key={index}
//                 />
//               )
//             })
//           }
//         </ul>
//       </div>
//     </>
//   )
// }