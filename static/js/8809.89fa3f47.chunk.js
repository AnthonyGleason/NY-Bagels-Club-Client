"use strict";(self.webpackChunknew_york_bagels_club=self.webpackChunknew_york_bagels_club||[]).push([[8809],{8809:(e,t,a)=>{a.r(t),a.d(t,{default:()=>g});var o=a(2791),n=a(7579),r=a(184);const i=(0,o.lazy)((()=>Promise.all([a.e(8310),a.e(5262),a.e(3190)]).then(a.bind(a,5262)))),c=(0,o.lazy)((()=>Promise.all([a.e(8310),a.e(8293)]).then(a.bind(a,9800)))),s=(0,o.lazy)((()=>a.e(9251).then(a.bind(a,8632)))),l=(0,o.lazy)((()=>Promise.all([a.e(8310),a.e(3288)]).then(a.bind(a,3288)))),u=(0,o.lazy)((()=>Promise.all([a.e(8310),a.e(5242)]).then(a.bind(a,8947)))),m=(0,o.lazy)((()=>Promise.all([a.e(8310),a.e(2540)]).then(a.bind(a,2540)))),h=(0,o.lazy)((()=>Promise.all([a.e(8310),a.e(2400)]).then(a.bind(a,2400))));function g(){const[e,t]=(0,o.useState)(!1),[a,g]=(0,o.useState)(!1),[d,p]=(0,o.useState)(n.UY),f=(0,o.useRef)(!0);return(0,o.useEffect)((()=>{if(f.current){f.current=!1;localStorage.getItem("cartToken")&&(0,n.sQ)(p)}}),[f]),(0,r.jsxs)("main",{className:"home",children:[(0,r.jsx)(i,{cart:d,isExpanded:a,setIsExpanded:g,isSignedIn:e,setIsSignedIn:t}),(0,r.jsxs)("div",{className:"home-content-wrapper",onClick:()=>{g(!1)},children:[(0,r.jsx)(u,{}),(0,r.jsx)(c,{}),(0,r.jsx)(s,{}),(0,r.jsx)(m,{isSignedIn:e,cart:d,setCart:p}),(0,r.jsx)(h,{}),(0,r.jsx)(l,{})]})]})}},6795:(e,t,a)=>{a.d(t,{F1:()=>o,ki:()=>n});const o=function(){return"https://nybc-server-f069d08697f3.herokuapp.com"},n=function(){return"https://anthonygleason.github.io/NY-Bagels-Club-Client"};"".concat(o(),"/cart/checkout/success")},4545:(e,t,a)=>{a.d(t,{Fm:()=>r,UA:()=>i,gC:()=>n,hY:()=>c,sg:()=>s});var o=a(6795);const n=async function(e,t){const a=t?"clubCartToken":"cartToken";try{const t=await fetch("".concat((0,o.F1)(),"/api/shop/carts/verify"),{method:"GET",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(a)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}});if(200!==t.status)throw new Error("No valid cart detected. Either the user does not have a cart token or the token expired.");const n=await t.json();return e(n.cart),n.isValid}catch(n){return console.log(n),!1}},r=async function(e){const t=await fetch("".concat((0,o.F1)(),"/api/shop/carts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isClub:e})}),a=await t.json();if(a.cartToken)return a.cartToken},i=async function(e,t,a){let n=!1;if(!localStorage.getItem("loginToken"))return e&&e(!1),t&&t(!1),!1;try{const r=await fetch("".concat((0,o.F1)(),"/api/users/verify"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),i=await r.json();return!1===r.ok||403===r.status?(localStorage.removeItem("loginToken"),n=!1):n=i.isValid,t&&!0===i.isAdmin&&t(!0),e&&e(n),a&&a(i.userID),n}catch(r){return console.log(r),t&&t(!1),!1}},c=async function(e){await fetch("".concat((0,o.F1)(),"/api/users/logout"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),e&&e(!1),localStorage.removeItem("loginToken")},s=async function(e,t,a){try{if(!localStorage.getItem("loginToken"))throw new Error("You are not signed in");const n=await fetch("".concat((0,o.F1)(),"/api/users/membershipLevel"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),r=await n.json();return e&&e(r.membershipLevel),t&&t(r.remainingDeliveries),a&&a(new Date(r.expirationDate).toDateString()),r.membershipLevel}catch(n){return console.log(n+", showing non-member pricing"),e&&e("Non-Member"),"Non-Member"}}},7579:(e,t,a)=>{a.d(t,{Lb:()=>s,Lc:()=>c,UY:()=>m,W:()=>d,Z6:()=>l,pQ:()=>g,qi:()=>r,r:()=>u,sQ:()=>i,wp:()=>h});var o=a(6795),n=a(4545);const r=async function(e,t,a,i,c,s,l){let u="";u=!1===l?"cartToken":"clubCartToken";try{if(i)throw new Error("A request is already pending. Please wait for the current request to complete.");if(c(!0),!t||e<0)throw new Error("One or more required inputs were left blank.");if(!u)throw new Error("Your request for a local storage cart token was invalid. Did you provide a isClub value to this function?");const m=await fetch("".concat((0,o.F1)(),"/api/shop/carts"),{method:"PUT",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(u)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))},body:JSON.stringify({itemID:t,updatedQuantity:e,selection:s,isClubCart:l||void 0})});if(510===m.status&&alert("You have reached the maximum allowed quantity for the selected item."),403===m.status&&(localStorage.setItem(u,await(0,n.Fm)(l||!1)),r(e,t,a,i,c,s,l)),!m.ok)throw new Error("An error occurred in the request to update the cart.");const h=await m.json();h.cartToken&&h.cart&&(localStorage.setItem(u,h.cartToken),a(h.cart)),c(!1)}catch(m){c(!1)}},i=async function(e,t){try{const a=t?"clubCartToken":"cartToken";localStorage.getItem(a)||localStorage.setItem(a,await(0,n.Fm)(t||!1)),await(0,n.gC)(e,t)||(localStorage.setItem(a,await(0,n.Fm)(t||!1)),e([]))}catch(a){console.log(a)}},c=function(e,t,a,o,n,i,c,s){const l=parseInt(e.target.value);l?r(l,a.itemData._id,o,n,i,c,s):t("")},s=function(e){return"bagel"===e.itemData.cat&&"six"===e.selection?"Six Pack(s)":"bagel"===e.itemData.cat&&"dozen"===e.selection?"Baker's Dozen(s)":"bagel"===e.itemData.cat&&"two"===e.selection?"Two Pack(s)":"spread"===e.itemData.cat&&"halflb"===e.selection?"1/2 LB":"spread"===e.itemData.cat?"One Pound":"pastry"===e.itemData.cat?"Six Pack(s)":"mystery"===e.itemData.cat?"Single(s)":"N/A"},l=function(e){return e.quantity*e.unitPriceInDollars},u=function(e,t,a){if(!e||!e.items)return 0;let o=0;for(let n=0;n<e.items.length;n++){const r=e.items[n];if(r.selection===a&&"bagel"===r.itemData.cat&&r.itemData.name===t){o=r.quantity;break}if("spread"===r.itemData.cat&&r.itemData.name===t){o=r.quantity;break}if("pastry"===r.itemData.cat&&r.itemData.name===t){o=r.quantity;break}}return o},m={items:[],subtotalInDollars:0,taxInDollars:0,totalQuantity:0,discountAmountInDollars:0,finalPriceInDollars:0,desiredShipDate:new Date,isGuest:!1},h=async function(e){const t=localStorage.getItem("cartToken"),a=localStorage.getItem("loginToken");if(t){const n=await fetch("".concat((0,o.F1)(),"/api/shop/carts/applyMembershipPricing"),{method:"POST",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(t),Authorization:"Bearer ".concat(a)}});if(n.ok){const t=await n.json();localStorage.setItem("cartToken",t.cartToken),e&&e(t.cart),console.log("Membership pricing successfully applied!")}else console.log("User is not a member.")}},g=function(e){let t=0,a=0;return e.items.map((e=>{switch(e.itemData.cat){case"bagel":a+=e.quantity;break;case"spread":t+=e.quantity}})),1===t&&6===a},d=async function(e,t,a,n){if(t)if(n)if(a<=0)alert("You do not have any deliveries remaining this billing cycle.");else{const e=await fetch("".concat((0,o.F1)(),"/api/memberships/create-club-checkout-session"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken")),"cart-token":"Bearer ".concat(localStorage.getItem("clubCartToken"))},body:JSON.stringify({shipDate:n})}),t=await e.json();t.sessionUrl&&(window.location.href=t.sessionUrl)}else alert("You must select a ship date to place your order.");else alert('To place your order you must have 6 "Two Packs" and 1 "1/2 LB" spread in your cart.')}}}]);
//# sourceMappingURL=8809.89fa3f47.chunk.js.map