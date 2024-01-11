"use strict";(self.webpackChunknew_york_bagels_club=self.webpackChunknew_york_bagels_club||[]).push([[7482,3190],{3801:(e,t,a)=>{a.r(t),a.d(t,{default:()=>m});var r=a(2791),n=a(5262),s=a(7579),o=a(4545),i=a(184);function c(e){let{trackingNumber:t,order:a,index:r}=e;return""!==t?(0,i.jsxs)("div",{children:[(0,i.jsxs)("h4",{children:["Tracking Number #",r+1]}),(0,i.jsxs)("p",{children:["USPS Priority Mail: ",t]})]},t):(0,i.jsx)(i.Fragment,{})}const l=a.p+"static/media/order-pending.8b69ec909280340960d7738541a90d3b.svg";const d=a.p+"static/media/order-processing.eeadd9934b7fb58c68ba17a4edef0b72.svg";const u=a.p+"static/media/order-shipped.c032e3e0cb0c3061b4c049aeede7bcbd.svg";function h(e){let{cart:t,dateCreated:a,giftMessage:n,shippingAddress:o,status:h,totalAmount:p,trackingNumberArr:m,order:g}=e;const[x,j]=(0,r.useState)(!0),f=function(){switch(h.toLowerCase()){case"pending":default:return 0;case"processing":return 1;case"shipped":return 2}}(),b=f>=0?"#006400":"grey",k=f>=1?"#006400":"grey",y=f>=2?"#006400":"grey";return x?(0,i.jsxs)("div",{className:"order-item",children:[(0,i.jsxs)("button",{className:"order-item-expand-toggle",children:[(0,i.jsxs)("span",{className:"order-date",children:["Order Date: ",a.toUTCString().split(" ").slice(0,4).join(" ")]}),(0,i.jsxs)("span",{className:"order-id",children:["Order Number: #",g._id]})]}),(0,i.jsxs)("div",{className:"order-info-wrapper",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{children:"Shipping Address"}),(0,i.jsxs)("ul",{className:"order-item-shipping",children:[(0,i.jsx)("li",{children:o.fullName}),(0,i.jsx)("li",{children:o.phone}),(0,i.jsx)("li",{children:o.line1}),(0,i.jsx)("li",{children:o.city}),(0,i.jsxs)("li",{children:[o.state,", ",o.postal_code]}),(0,i.jsx)("li",{children:o.country})]})]}),(0,i.jsxs)("div",{className:"order-summary",children:[(0,i.jsx)("h4",{children:"Item Summary"}),(0,i.jsx)("ul",{children:t.items.map(((e,t)=>{const a=(0,s.Lb)(e);return(0,i.jsxs)("li",{children:[(0,i.jsxs)("span",{children:[e.quantity,"x ",e.itemData.name,", ",a,":"]}),(0,i.jsx)("span",{children:(0,i.jsxs)("strong",{children:["$",(e.unitPriceInDollars*e.quantity).toFixed(2)]})})]},t)}))})]}),(0,i.jsxs)("div",{className:"order-costs",children:[(0,i.jsx)("h4",{children:"Order Costs:"}),(0,i.jsxs)("p",{children:[(0,i.jsx)("span",{children:"Basket Subtotal:"}),(0,i.jsx)("span",{children:(0,i.jsxs)("strong",{children:["$",g.cart.subtotalInDollars.toFixed(2)]})})]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("span",{children:"Calculated Tax:"}),(0,i.jsx)("span",{children:(0,i.jsxs)("strong",{children:["$",g.cart.taxInDollars.toFixed(2)]})})]}),(0,i.jsxs)("p",{children:[(0,i.jsx)("span",{children:"Shipping Cost:"}),(0,i.jsx)("span",{children:(0,i.jsx)("strong",{children:"Free"})})]}),g.cart.discountAmountInDollars>0?(0,i.jsxs)("p",{children:[(0,i.jsx)("span",{children:"Discount Applied:"}),(0,i.jsx)("span",{children:(0,i.jsxs)("strong",{children:["-$",g.cart.discountAmountInDollars.toFixed(2)]})})]}):null,(0,i.jsxs)("p",{children:[(0,i.jsx)("span",{children:"Total Cost:"}),(0,i.jsx)("span",{children:(0,i.jsxs)("strong",{children:["$",g.cart.finalPriceInDollars.toFixed(2)]})})]})]}),""!==n?(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{children:"Gift Message:"}),(0,i.jsx)("p",{children:n})]}):null,(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{children:"Order Status"}),(0,i.jsxs)("p",{className:"order-tracking-visual",children:[(0,i.jsx)("img",{src:l,alt:"order pending",style:{backgroundColor:b}}),(0,i.jsx)("img",{src:d,alt:"order processing",style:{backgroundColor:k}}),(0,i.jsx)("img",{src:u,alt:"order shipped",style:{backgroundColor:y}})]}),(0,i.jsxs)("p",{children:["Current Status: ",h]})]}),m.length>0?m.map(((e,t)=>(0,i.jsx)(c,{index:t,trackingNumber:e,order:g},t))):(0,i.jsxs)("div",{children:[(0,i.jsx)("h4",{children:"Track Your Order"}),(0,i.jsx)("p",{children:"Check Back Soon!"}),(0,i.jsxs)("p",{children:["Your selected ship date is ",(0,i.jsx)("strong",{children:new Date(g.cart.desiredShipDate).toUTCString().split(" ").slice(0,4).join(" ")}),"."]})]},"noTracking")]})]}):(0,i.jsxs)("button",{className:"order-item-expand-toggle",onClick:()=>{!function(e,t){t(!e)}(x,j)},children:[(0,i.jsxs)("span",{className:"order-date",children:["Order Date: ",a.toUTCString().split(" ").slice(0,4).join(" ")]}),(0,i.jsxs)("span",{className:"order-id",children:["Order Number: #",g._id]})]})}var p=a(6795);function m(){const[e,t]=(0,r.useState)(""),[a,c]=(0,r.useState)("#"),[l,d]=(0,r.useState)(),[u,m]=(0,r.useState)(!0),[g,x]=(0,r.useState)(!1),[j,f]=(0,r.useState)(s.UY),b=(0,r.useRef)(!0);(0,r.useEffect)((()=>{b.current&&(b.current=!1,(0,s.sQ)(f),(0,o.UA)(m))}),[]);return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.default,{cart:j,isExpanded:g,setIsExpanded:x,isSignedIn:u,setIsSignedIn:m}),(0,i.jsx)("div",{className:"guest-order-tracking",onClick:()=>{x(!1)},children:(0,i.jsxs)("form",{className:"guest-order-tracking-form",children:[(0,i.jsx)("h3",{className:"store-items-heading",children:"Track My Order"}),(0,i.jsx)("p",{children:"Please enter both the same email as entered during checkout along with the order number generated on your New York Bagels Club order confirmation email."}),(0,i.jsxs)("div",{className:"email-input",children:[(0,i.jsx)("label",{children:"Email Address:"}),(0,i.jsx)("input",{value:e,onChange:e=>{t(e.target.value)},placeholder:"example@example.com"})]}),(0,i.jsxs)("div",{className:"order-input",children:[(0,i.jsx)("label",{children:"Order Number:"}),(0,i.jsx)("input",{value:a,onChange:e=>{var t;"#"!==(t=e.target.value)[0]?c("#"+t):c(t)},placeholder:"#1234567890"})]}),(0,i.jsx)("button",{className:"search-guest-order-button",type:"button",onClick:()=>{!async function(){if(!e)return void alert("The email field cannot be left blank.");if(!a)return void alert("The orderID field cannot be left blank.");const t="#"===a[0]?a.substring(1):a,r=await fetch("".concat((0,p.F1)(),"/api/shop/orders/").concat(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({userEmail:e})});404===r.status?alert("An order was not found for the provided email and order number."):401===r.status&&alert("The provided email or order number are incorrect. Please review the entered order number and ensure you entered the same email as the one you provided during checkout.");const n=await r.json();n.orderData&&d(n.orderData)}()},children:"View My Order"}),l?(0,i.jsx)(h,{cart:l.cart,dateCreated:new Date(l.dateCreated),giftMessage:l.giftMessage||"",shippingAddress:l.shippingAddress,status:l.status,totalAmount:l.cart.finalPriceInDollars,trackingNumberArr:l.trackingNumberArr||[],order:l}):null]})})]})}},6795:(e,t,a)=>{a.d(t,{F1:()=>r,ki:()=>n});const r=function(){return"https://brendels-webstore-f2339d5fa5b2.herokuapp.com"},n=function(){return"https://anthonygleason.github.io/NY-Bagels-Club-Client"};"".concat(r(),"/cart/checkout/success")},4545:(e,t,a)=>{a.d(t,{Fm:()=>s,UA:()=>o,gC:()=>n,hY:()=>i,sg:()=>c});var r=a(6795);const n=async function(e,t){const a=t?"clubCartToken":"cartToken";try{const t=await fetch("".concat((0,r.F1)(),"/api/shop/carts/verify"),{method:"GET",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(a)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}});if(200!==t.status)throw new Error("No valid cart detected. Either the user does not have a cart token or the token expired.");const n=await t.json();return e(n.cart),n.isValid}catch(n){return console.log(n),!1}},s=async function(e){const t=await fetch("".concat((0,r.F1)(),"/api/shop/carts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isClub:e})}),a=await t.json();if(a.cartToken)return a.cartToken},o=async function(e,t,a){let n=!1;if(!localStorage.getItem("loginToken"))return e&&e(!1),t&&t(!1),!1;try{const s=await fetch("".concat((0,r.F1)(),"/api/users/verify"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),o=await s.json();return!1===s.ok||403===s.status?(localStorage.removeItem("loginToken"),n=!1):n=o.isValid,t&&!0===o.isAdmin&&t(!0),e&&e(n),a&&a(o.userID),n}catch(s){return console.log(s),t&&t(!1),!1}},i=async function(e){await fetch("".concat((0,r.F1)(),"/api/users/logout"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),e&&e(!1),localStorage.removeItem("loginToken")},c=async function(e,t,a){try{if(!localStorage.getItem("loginToken"))throw new Error("You are not signed in");const n=await fetch("".concat((0,r.F1)(),"/api/users/membershipLevel"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),s=await n.json();return e&&e(s.membershipLevel),t&&t(s.remainingDeliveries),a&&a(new Date(s.expirationDate).toDateString()),s.membershipLevel}catch(n){return console.log(n+", showing non-member pricing"),e&&e("Non-Member"),"Non-Member"}}},7579:(e,t,a)=>{a.d(t,{Lb:()=>c,Lc:()=>i,UY:()=>u,W:()=>m,Z6:()=>l,pQ:()=>p,qi:()=>s,r:()=>d,sQ:()=>o,wp:()=>h});var r=a(6795),n=a(4545);const s=async function(e,t,a,o,i,c,l){let d="";d=!1===l?"cartToken":"clubCartToken";try{if(o)throw new Error("A request is already pending. Please wait for the current request to complete.");if(i(!0),!t||e<0)throw new Error("One or more required inputs were left blank.");if(!d)throw new Error("Your request for a local storage cart token was invalid. Did you provide a isClub value to this function?");const u=await fetch("".concat((0,r.F1)(),"/api/shop/carts"),{method:"PUT",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(d)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))},body:JSON.stringify({itemID:t,updatedQuantity:e,selection:c,isClubCart:l||void 0})});if(510===u.status&&alert("You have reached the maximum allowed quantity for the selected item."),403===u.status&&(localStorage.setItem(d,await(0,n.Fm)(l||!1)),s(e,t,a,o,i,c,l)),!u.ok)throw new Error("An error occurred in the request to update the cart.");const h=await u.json();h.cartToken&&h.cart&&(localStorage.setItem(d,h.cartToken),a(h.cart)),i(!1)}catch(u){i(!1)}},o=async function(e,t){try{const a=t?"clubCartToken":"cartToken";localStorage.getItem(a)||localStorage.setItem(a,await(0,n.Fm)(t||!1)),await(0,n.gC)(e,t)||(localStorage.setItem(a,await(0,n.Fm)(t||!1)),e([]))}catch(a){console.log(a)}},i=function(e,t,a,r,n,o,i,c){const l=parseInt(e.target.value);l?s(l,a.itemData._id,r,n,o,i,c):t("")},c=function(e){return"bagel"===e.itemData.cat&&"six"===e.selection?"Six Pack(s)":"bagel"===e.itemData.cat&&"dozen"===e.selection?"Baker's Dozen(s)":"bagel"===e.itemData.cat&&"two"===e.selection?"Two Pack(s)":"spread"===e.itemData.cat&&"halflb"===e.selection?"1/2 LB":"spread"===e.itemData.cat?"One Pound":"pastry"===e.itemData.cat?"Six Pack(s)":"mystery"===e.itemData.cat?"Single(s)":"N/A"},l=function(e){return e.quantity*e.unitPriceInDollars},d=function(e,t,a){if(!e||!e.items)return 0;let r=0;for(let n=0;n<e.items.length;n++){const s=e.items[n];if(s.selection===a&&"bagel"===s.itemData.cat&&s.itemData.name===t){r=s.quantity;break}if("spread"===s.itemData.cat&&s.itemData.name===t){r=s.quantity;break}if("pastry"===s.itemData.cat&&s.itemData.name===t){r=s.quantity;break}}return r},u={items:[],subtotalInDollars:0,taxInDollars:0,totalQuantity:0,discountAmountInDollars:0,finalPriceInDollars:0,desiredShipDate:new Date,isGuest:!1},h=async function(e){const t=localStorage.getItem("cartToken"),a=localStorage.getItem("loginToken");if(t){const n=await fetch("".concat((0,r.F1)(),"/api/shop/carts/applyMembershipPricing"),{method:"POST",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(t),Authorization:"Bearer ".concat(a)}});if(n.ok){const t=await n.json();localStorage.setItem("cartToken",t.cartToken),e&&e(t.cart),console.log("Membership pricing successfully applied!")}else console.log("User is not a member.")}},p=function(e){let t=0,a=0;return e.items.map((e=>{switch(e.itemData.cat){case"bagel":a+=e.quantity;break;case"spread":t+=e.quantity}})),1===t&&6===a},m=async function(e,t,a,n){if(t)if(n)if(a<=0)alert("You do not have any deliveries remaining this billing cycle.");else{const e=await fetch("".concat((0,r.F1)(),"/api/memberships/create-club-checkout-session"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken")),"cart-token":"Bearer ".concat(localStorage.getItem("clubCartToken"))},body:JSON.stringify({shipDate:n})}),t=await e.json();t.sessionUrl&&(window.location.href=t.sessionUrl)}else alert("You must select a ship date to place your order.");else alert('To place your order you must have 6 "Two Packs" and 1 "1/2 LB" spread in your cart.')}}}]);
//# sourceMappingURL=7482.4b20b00e.chunk.js.map