"use strict";(self.webpackChunknew_york_bagels_club=self.webpackChunknew_york_bagels_club||[]).push([[6687,3190],{2761:(e,t,a)=>{a.r(t),a.d(t,{default:()=>u});var n=a(2791),o=a(7689),r=a(4545),i=a(5262),c=a(7579),s=a(6795),l=a(184);function u(){const e=(0,o.s0)(),[t,a]=(0,n.useState)(!1),[u,d]=(0,n.useState)("");(0,n.useEffect)((()=>{const e=document.createElement("script");return e.src="https://js.stripe.com/v3/pricing-table.js",document.head.appendChild(e),()=>{document.head.removeChild(e)}}),[]);const[h,g]=(0,n.useState)(!1),[m,p]=(0,n.useState)(c.UY),[f,y]=(0,n.useState)(""),[b,k]=(0,n.useState)(""),w=(0,n.useRef)(!0);return(0,n.useEffect)((()=>{!0===w.current&&(w.current=!1,(0,c.sQ)(p),async function(e,t){const a=await fetch("".concat((0,s.F1)(),"/api/memberships/pricingTableKeys"),{method:"GET"}),n=await a.json();e(n.publishableKey),t(n.pricingTableID)}(k,y))}),[]),(0,n.useEffect)((()=>{!async function(){a(await(0,r.UA)(void 0,void 0,d))}()}),[]),t&&u&&0!==u.length&&"undefined"!==u?(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.default,{cart:m,isExpanded:h,setIsExpanded:g,isSignedIn:t,setIsSignedIn:a}),b&&f?(0,l.jsxs)("section",{className:"pricing-table",onClick:()=>{g(!1)},children:[(0,l.jsx)("script",{async:!0,src:"https://js.stripe.com/v3/pricing-table.js"}),(0,l.jsx)("stripe-pricing-table",{"pricing-table-id":f,"publishable-key":b,"client-reference-id":u})]}):null]}):(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(i.default,{cart:m,isExpanded:h,setIsExpanded:g,isSignedIn:t,setIsSignedIn:a}),(0,l.jsxs)("div",{className:"checkout-logged-out",children:[(0,l.jsx)("h3",{children:"Please login or register to join the club."}),(0,l.jsxs)("div",{className:"checkout-button-wrapper",children:[(0,l.jsx)("button",{onClick:()=>{e("/login")},children:"Login"}),(0,l.jsx)("button",{onClick:()=>{e("/register")},children:"Register"})]})]})]})}},6795:(e,t,a)=>{a.d(t,{$J:()=>n,F1:()=>r,ki:()=>i,lK:()=>o});const n=!1,o=2250,r=function(){return"https://nybagelsclub-7eb3cdcd8d53.herokuapp.com"},i=function(){return"https://anthonygleason.github.io/NY-Bagels-Club-Client"};"".concat(r(),"/cart/checkout/success")},4545:(e,t,a)=>{a.d(t,{Fm:()=>r,UA:()=>i,gC:()=>o,hY:()=>c,sg:()=>s});var n=a(6795);const o=async function(e,t){const a=t?"clubCartToken":"cartToken";try{const t=await fetch("".concat((0,n.F1)(),"/api/shop/carts/verify"),{method:"GET",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(a)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}});if(200!==t.status)throw new Error("No valid cart detected. Either the user does not have a cart token or the token expired.");const o=await t.json();return e(o.cart),o.isValid}catch(o){return console.log(o),!1}},r=async function(e){const t=await fetch("".concat((0,n.F1)(),"/api/shop/carts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isClub:e})}),a=await t.json();if(a.cartToken)return a.cartToken},i=async function(e,t,a){let o=!1;if(!localStorage.getItem("loginToken"))return e&&e(!1),t&&t(!1),!1;try{const r=await fetch("".concat((0,n.F1)(),"/api/users/verify"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),i=await r.json();return!1===r.ok||403===r.status?(localStorage.removeItem("loginToken"),o=!1):o=i.isValid,t&&!0===i.isAdmin&&t(!0),e&&e(o),a&&a(i.userID),o}catch(r){return console.log(r),t&&t(!1),!1}},c=async function(e){await fetch("".concat((0,n.F1)(),"/api/users/logout"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),e&&e(!1),localStorage.removeItem("loginToken")},s=async function(e,t,a){try{if(!localStorage.getItem("loginToken"))throw new Error("You are not signed in");const o=await fetch("".concat((0,n.F1)(),"/api/users/membershipLevel"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),r=await o.json();return e&&e(r.membershipLevel),t&&t(r.remainingDeliveries),a&&a(new Date(r.expirationDate).toDateString()),r.membershipLevel}catch(o){return console.log("You are not signed in, showing non-member pricing."),e&&e("Non-Member"),"Non-Member"}}},7579:(e,t,a)=>{a.d(t,{Lb:()=>s,Lc:()=>c,UY:()=>d,W:()=>m,Z6:()=>l,pQ:()=>g,qi:()=>r,r:()=>u,sQ:()=>i,wp:()=>h});var n=a(6795),o=a(4545);const r=async function(e,t,a,i,c,s,l){let u="";u=!1===l?"cartToken":"clubCartToken";try{if(i)throw new Error("A request is already pending. Please wait for the current request to complete.");if(c(!0),!t||e<0)throw new Error("One or more required inputs were left blank.");if(!u)throw new Error("Your request for a local storage cart token was invalid. Did you provide a isClub value to this function?");const d=await fetch("".concat((0,n.F1)(),"/api/shop/carts"),{method:"PUT",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(u)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))},body:JSON.stringify({itemID:t,updatedQuantity:e,selection:s,isClubCart:l||void 0})});if(510===d.status&&alert("You have reached the maximum allowed quantity for the selected item."),403===d.status&&(localStorage.setItem(u,await(0,o.Fm)(l||!1)),r(e,t,a,i,c,s,l)),!d.ok)throw new Error("An error occurred in the request to update the cart.");const h=await d.json();h.cartToken&&h.cart&&(localStorage.setItem(u,h.cartToken),a(h.cart)),c(!1)}catch(d){c(!1)}},i=async function(e,t){try{const a=t?"clubCartToken":"cartToken";localStorage.getItem(a)||localStorage.setItem(a,await(0,o.Fm)(t||!1)),await(0,o.gC)(e,t)||(localStorage.setItem(a,await(0,o.Fm)(t||!1)),e([]))}catch(a){console.log(a)}},c=function(e,t,a,n,o,i,c,s){const l=parseInt(e.target.value);l?r(l,a.itemData._id,n,o,i,c,s):t("")},s=function(e){return"bagel"===e.itemData.cat&&"six"===e.selection?"Six Pack(s)":"bagel"===e.itemData.cat&&"dozen"===e.selection?"Baker's Dozen(s)":"bagel"===e.itemData.cat&&"two"===e.selection?"Two Pack(s)":"spread"===e.itemData.cat&&"halflb"===e.selection?"1/2 LB":"spread"===e.itemData.cat?"One Pound":"pastry"===e.itemData.cat?"Six Pack(s)":"mystery"===e.itemData.cat?"Single(s)":"N/A"},l=function(e){return e.quantity*e.unitPriceInDollars},u=function(e,t,a){if(!e||!e.items)return 0;let n=0;for(let o=0;o<e.items.length;o++){const r=e.items[o];if(r.selection===a&&"bagel"===r.itemData.cat&&r.itemData.name===t){n=r.quantity;break}if("spread"===r.itemData.cat&&r.itemData.name===t){n=r.quantity;break}if("pastry"===r.itemData.cat&&r.itemData.name===t){n=r.quantity;break}}return n},d={items:[],subtotalInDollars:0,taxInDollars:0,totalQuantity:0,discountAmountInDollars:0,finalPriceInDollars:0,desiredShipDate:new Date,isGuest:!1},h=async function(e){const t=localStorage.getItem("cartToken"),a=localStorage.getItem("loginToken");if(t){const o=await fetch("".concat((0,n.F1)(),"/api/shop/carts/applyMembershipPricing"),{method:"POST",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(t),Authorization:"Bearer ".concat(a)}});if(o.ok){const t=await o.json();localStorage.setItem("cartToken",t.cartToken),e&&e(t.cart),console.log("Membership pricing successfully applied!")}else console.log("User is not a member.")}},g=function(e){let t=0,a=0;return e.items.map((e=>{switch(e.itemData.cat){case"bagel":a+=e.quantity;break;case"spread":t+=e.quantity}})),1===t&&6===a},m=async function(e,t,a,o){if(t)if(o)if(a<=0)alert("You do not have any deliveries remaining this billing cycle.");else{const e=await fetch("".concat((0,n.F1)(),"/api/memberships/create-club-checkout-session"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken")),"cart-token":"Bearer ".concat(localStorage.getItem("clubCartToken"))},body:JSON.stringify({shipDate:o})}),t=await e.json();t.sessionUrl&&(window.location.href=t.sessionUrl)}else alert("You must select a ship date to place your order.");else alert('To place your order you must have 6 "Two Packs" and 1 "1/2 LB" spread in your cart.')}}}]);
//# sourceMappingURL=6687.4d3f1042.chunk.js.map