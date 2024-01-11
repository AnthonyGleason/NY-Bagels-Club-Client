"use strict";(self.webpackChunknew_york_bagels_club=self.webpackChunknew_york_bagels_club||[]).push([[1799,3190],{999:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var o=a(2791),r=a(5262),n=a(7579);const c=a.p+"static/media/bubble-loading.b33d30713a00cb69a09f4b5a72d38f04.svg";var s=a(6795),i=a(7689),l=a(184);function u(){const[e,t]=(0,o.useState)(""),[a,u]=(0,o.useState)(!1),[d,h]=(0,o.useState)(!1),[m,g]=(0,o.useState)(!0),p=(0,i.s0)(),f=(0,i.UO)().pendingOrderDocID,y=(0,o.useRef)(!0);return(0,o.useEffect)((()=>{y.current&&(y.current=!1,localStorage.removeItem("cartToken"),localStorage.removeItem("clubCartToken"),e||async function(e){if(!f)return;const t=await fetch("".concat((0,s.F1)(),"/api/shop/orders/checkout/fetchPlacedOrder/").concat(f.toString()),{method:"GET"}),a=await t.json();a.orderNumber&&(e(a.orderNumber),g(a.isGuest))}(t))}),[]),(0,o.useEffect)((()=>{let t;return e||(t=setTimeout((()=>{window.location.reload()}),5e3)),()=>{clearTimeout(t)}}),[e]),e?e?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.default,{cart:n.UY,isExpanded:a,setIsExpanded:u,isSignedIn:d,setIsSignedIn:h}),(0,l.jsx)("div",{className:"checkout-success",children:(0,l.jsxs)("div",{className:"checkout-success-content",children:[(0,l.jsxs)("div",{className:"checkout-success-heading-wrapper",children:[(0,l.jsx)("h3",{children:"Your Order Has Been Placed!"}),(0,l.jsxs)("h3",{children:["Order #",e]})]}),(0,l.jsx)("p",{children:"Thank you for choosing New York Bagels Club for your purchase. If you have any questions or need assistance with your order, please don't hesitate to reach out. We look forward to delivering your order with care and ensuring your satisfaction. Welcome to the New York Bagels Club family!"}),(0,l.jsx)("p",{children:'To track the status of your order please visit the "Orders" page.'}),(0,l.jsx)("button",{className:"my-orders",onClick:()=>{p("/accounts/orders")},children:"View Order"})]})})]}):(0,l.jsx)("div",{children:"If you are seeing this message it means that an error has occured when processing your order. (This typically is the result of a card decline). If you were charged and do not see your order please contact our customer support and we will review your order."}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.default,{cart:n.UY,isExpanded:a,setIsExpanded:u,isSignedIn:d,setIsSignedIn:h}),(0,l.jsxs)("div",{className:"checkout-loading",children:[(0,l.jsx)("p",{children:"Loading..."}),(0,l.jsx)("img",{src:c,alt:"loading",loading:"lazy"})]})]})}},6795:(e,t,a)=>{a.d(t,{F1:()=>o,ki:()=>r});const o=function(){return"https://brendels-webstore-f2339d5fa5b2.herokuapp.com"},r=function(){return"https://anthonygleason.github.io/NY-Bagels-Club-Client"};"".concat(o(),"/cart/checkout/success")},4545:(e,t,a)=>{a.d(t,{Fm:()=>n,UA:()=>c,gC:()=>r,hY:()=>s,sg:()=>i});var o=a(6795);const r=async function(e,t){const a=t?"clubCartToken":"cartToken";try{const t=await fetch("".concat((0,o.F1)(),"/api/shop/carts/verify"),{method:"GET",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(a)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}});if(200!==t.status)throw new Error("No valid cart detected. Either the user does not have a cart token or the token expired.");const r=await t.json();return e(r.cart),r.isValid}catch(r){return console.log(r),!1}},n=async function(e){const t=await fetch("".concat((0,o.F1)(),"/api/shop/carts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isClub:e})}),a=await t.json();if(a.cartToken)return a.cartToken},c=async function(e,t,a){let r=!1;if(!localStorage.getItem("loginToken"))return e&&e(!1),t&&t(!1),!1;try{const n=await fetch("".concat((0,o.F1)(),"/api/users/verify"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),c=await n.json();return!1===n.ok||403===n.status?(localStorage.removeItem("loginToken"),r=!1):r=c.isValid,t&&!0===c.isAdmin&&t(!0),e&&e(r),a&&a(c.userID),r}catch(n){return console.log(n),t&&t(!1),!1}},s=async function(e){await fetch("".concat((0,o.F1)(),"/api/users/logout"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),e&&e(!1),localStorage.removeItem("loginToken")},i=async function(e,t,a){try{if(!localStorage.getItem("loginToken"))throw new Error("You are not signed in");const r=await fetch("".concat((0,o.F1)(),"/api/users/membershipLevel"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),n=await r.json();return e&&e(n.membershipLevel),t&&t(n.remainingDeliveries),a&&a(new Date(n.expirationDate).toDateString()),n.membershipLevel}catch(r){return console.log(r+", showing non-member pricing"),e&&e("Non-Member"),"Non-Member"}}},7579:(e,t,a)=>{a.d(t,{Lb:()=>i,Lc:()=>s,UY:()=>d,W:()=>g,Z6:()=>l,pQ:()=>m,qi:()=>n,r:()=>u,sQ:()=>c,wp:()=>h});var o=a(6795),r=a(4545);const n=async function(e,t,a,c,s,i,l){let u="";u=!1===l?"cartToken":"clubCartToken";try{if(c)throw new Error("A request is already pending. Please wait for the current request to complete.");if(s(!0),!t||e<0)throw new Error("One or more required inputs were left blank.");if(!u)throw new Error("Your request for a local storage cart token was invalid. Did you provide a isClub value to this function?");const d=await fetch("".concat((0,o.F1)(),"/api/shop/carts"),{method:"PUT",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(u)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))},body:JSON.stringify({itemID:t,updatedQuantity:e,selection:i,isClubCart:l||void 0})});if(510===d.status&&alert("You have reached the maximum allowed quantity for the selected item."),403===d.status&&(localStorage.setItem(u,await(0,r.Fm)(l||!1)),n(e,t,a,c,s,i,l)),!d.ok)throw new Error("An error occurred in the request to update the cart.");const h=await d.json();h.cartToken&&h.cart&&(localStorage.setItem(u,h.cartToken),a(h.cart)),s(!1)}catch(d){s(!1)}},c=async function(e,t){try{const a=t?"clubCartToken":"cartToken";localStorage.getItem(a)||localStorage.setItem(a,await(0,r.Fm)(t||!1)),await(0,r.gC)(e,t)||(localStorage.setItem(a,await(0,r.Fm)(t||!1)),e([]))}catch(a){console.log(a)}},s=function(e,t,a,o,r,c,s,i){const l=parseInt(e.target.value);l?n(l,a.itemData._id,o,r,c,s,i):t("")},i=function(e){return"bagel"===e.itemData.cat&&"six"===e.selection?"Six Pack(s)":"bagel"===e.itemData.cat&&"dozen"===e.selection?"Baker's Dozen(s)":"bagel"===e.itemData.cat&&"two"===e.selection?"Two Pack(s)":"spread"===e.itemData.cat&&"halflb"===e.selection?"1/2 LB":"spread"===e.itemData.cat?"One Pound":"pastry"===e.itemData.cat?"Six Pack(s)":"mystery"===e.itemData.cat?"Single(s)":"N/A"},l=function(e){return e.quantity*e.unitPriceInDollars},u=function(e,t,a){if(!e||!e.items)return 0;let o=0;for(let r=0;r<e.items.length;r++){const n=e.items[r];if(n.selection===a&&"bagel"===n.itemData.cat&&n.itemData.name===t){o=n.quantity;break}if("spread"===n.itemData.cat&&n.itemData.name===t){o=n.quantity;break}if("pastry"===n.itemData.cat&&n.itemData.name===t){o=n.quantity;break}}return o},d={items:[],subtotalInDollars:0,taxInDollars:0,totalQuantity:0,discountAmountInDollars:0,finalPriceInDollars:0,desiredShipDate:new Date,isGuest:!1},h=async function(e){const t=localStorage.getItem("cartToken"),a=localStorage.getItem("loginToken");if(t){const r=await fetch("".concat((0,o.F1)(),"/api/shop/carts/applyMembershipPricing"),{method:"POST",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(t),Authorization:"Bearer ".concat(a)}});if(r.ok){const t=await r.json();localStorage.setItem("cartToken",t.cartToken),e&&e(t.cart),console.log("Membership pricing successfully applied!")}else console.log("User is not a member.")}},m=function(e){let t=0,a=0;return e.items.map((e=>{switch(e.itemData.cat){case"bagel":a+=e.quantity;break;case"spread":t+=e.quantity}})),1===t&&6===a},g=async function(e,t,a,r){if(t)if(r)if(a<=0)alert("You do not have any deliveries remaining this billing cycle.");else{const e=await fetch("".concat((0,o.F1)(),"/api/memberships/create-club-checkout-session"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken")),"cart-token":"Bearer ".concat(localStorage.getItem("clubCartToken"))},body:JSON.stringify({shipDate:r})}),t=await e.json();t.sessionUrl&&(window.location.href=t.sessionUrl)}else alert("You must select a ship date to place your order.");else alert('To place your order you must have 6 "Two Packs" and 1 "1/2 LB" spread in your cart.')}}}]);
//# sourceMappingURL=1799.fd8df756.chunk.js.map