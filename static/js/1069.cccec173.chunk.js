"use strict";(self.webpackChunknew_york_bagels_club=self.webpackChunknew_york_bagels_club||[]).push([[1069,3190],{8594:(e,t,o)=>{o.r(t),o.d(t,{default:()=>u});var a=o(2791),n=o(7689),r=o(5262),i=o(7579),s=o(5381),c=o(8310),l=o(184);function u(){const e=(0,n.s0)(),[t,o]=(0,a.useState)(""),[u,d]=(0,a.useState)(""),[h,m]=(0,a.useState)(""),[p,g]=(0,a.useState)(!0),[w,f]=(0,a.useState)(!1),[y,k]=(0,a.useState)(i.UY),T=(0,a.useRef)(!0);return(0,a.useEffect)((()=>{T.current&&(T.current=!1,(0,i.sQ)(k))}),[]),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.default,{cart:y,isExpanded:w,setIsExpanded:f,isSignedIn:p,setIsSignedIn:g}),(0,l.jsx)("section",{className:"login-wrapper",onClick:()=>{f(!1)},children:(0,l.jsxs)(c.E.form,{initial:{opacity:0},whileInView:{opacity:1},transition:{duration:3},viewport:{once:!1},className:"login",children:[(0,l.jsx)("h3",{children:"Login"}),(0,l.jsx)("div",{children:(0,l.jsx)("input",{placeholder:"Email",value:u,onChange:e=>{d(e.target.value)},type:"email",required:!0})}),(0,l.jsx)("div",{children:(0,l.jsx)("input",{placeholder:"Password",value:h,onChange:e=>{m(e.target.value)},type:"password",required:!0})}),(0,s.OO)(t),(0,l.jsxs)("ol",{children:[(0,l.jsx)("li",{children:(0,l.jsx)("button",{type:"button",onClick:()=>{(0,s.Cv)(u,h,o,e)},children:"Submit"})}),(0,l.jsx)("li",{children:(0,l.jsx)("button",{type:"button",onClick:()=>{e("/register")},children:"Register"})}),(0,l.jsx)("li",{children:(0,l.jsx)("button",{type:"button",onClick:()=>{(0,s.ju)(u,o)},children:"Forgot Password"})})]})]})})]})}},6795:(e,t,o)=>{o.d(t,{F1:()=>a,ki:()=>n});const a=function(){return"https://nybc-server-f069d08697f3.herokuapp.com"},n=function(){return"https://anthonygleason.github.io/NY-Bagels-Club-Client"};"".concat(a(),"/cart/checkout/success")},5381:(e,t,o)=>{o.d(t,{Cv:()=>d,Mm:()=>i,OO:()=>u,Yg:()=>c,ju:()=>h,mW:()=>l,sJ:()=>m,tI:()=>s});var a=o(6795),n=o(5739),r=o(184);const i=async function(e,t,o){try{const n=localStorage.getItem("loginToken");if(!n)throw new Error("A login token was not provided! Are you logged in?");const r=await fetch("".concat((0,a.F1)(),"/api/users/settings"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n)}});if(!r.ok)throw new Error("Failed to fetch account settings");const i=await r.json();e&&e(i.firstName),t&&t(i.lastName),o&&o(i.email)}catch(n){console.log(n)}},s=async function(e,t,o,r,i,s,c){try{if(!e||!t||!o||!s)throw new Error("The first name, last name, email and current password fields are required.");if(!(0,n.v)(o))throw new Error("The provided email is not a valid email");if(r&&i&&r!==i)throw new Error("New passwords do not match!");const l=await fetch("".concat((0,a.F1)(),"/api/users/settings"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))},body:JSON.stringify({firstName:e,lastName:t,emailInput:o,passwordInput:r,passwordConfInput:i,currentPasswordInput:s})});if(!l.ok)throw new Error("Failed to apply new account settings");const u=await l.json();if(u.wasUserUpdated){if(!u.loginToken)throw localStorage.removeItem("loginToken"),new Error("A new login token was not provided!");localStorage.setItem("loginToken",u.loginToken),c("/")}}catch(l){console.log(l)}},c=async function(e,t){try{const o=await fetch("".concat((0,a.F1)(),"/api/users/forgotPassword/").concat(e),{method:"GET"});if(!o.ok)throw new Error("Failed to get password reset token status.");t((await o.json()).isExpired)}catch(o){console.log(o)}},l=async function(e,t,o,n,r,i){try{if(!e||!t||!o)throw new Error("Required inputs are missing!");if(t!==o)throw new Error("Passwords do not match!");const s=await fetch("".concat((0,a.F1)(),"/api/users/forgotPassword/").concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:t,passwordConf:o})});if(!s.ok)throw new Error("Failed to submit the forgot password form. Please try again later.");const c=await s.json();n(c.isExpired),c.wasUpdated&&r("/login"),c.isExpired||i("Passwords do not match or user does not exist.")}catch(s){console.log(s)}},u=function(e){return e?(0,r.jsx)("p",{className:"login-error-message",children:e}):null},d=async function(e,t,o,r){try{if(!e||!t){const e="* Please ensure both the email and password fields are completed before submitting this form.";throw o(e),new Error(e)}if(!(0,n.v)(e)){const e="* Please enter a valid email to submit this form";throw o(e),new Error(e)}const i=await fetch("".concat((0,a.F1)(),"/api/users/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:t})});if(!i.ok)throw new Error("Failed to log in user.");const s=await i.json();if(!s.token)throw o(s.message),new Error(s.message);localStorage.setItem("loginToken",s.token),r("/")}catch(i){console.log(i)}},h=async function(e,t){try{if(!e){const e="* The email field cannot be left blank.";throw t(e),new Error(e)}if(!(0,n.v)(e)){const e="* Please ensure you have entered a valid email.";throw t(e),new Error(e)}const o=await fetch("".concat((0,a.F1)(),"/api/users/forgotPassword"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(!o.ok)throw new Error("Failed to request a forgot password email.");(await o.json()).isEmailSent&&alert("Your request has been processed. If an account exists for the provided email address you will recieve an email with a password reset link.")}catch(o){console.log(o)}},m=async function(e,t,o,r,i,s,c,l){if(!c)try{if(!e||!t||!o||!r||!i){const e="* Please ensure all fields are completed before submitting this form.";throw s(e),new Error(e)}if(!(0,n.v)(e)){const e="* Please enter a valid email to submit this form";throw s(e),new Error(e)}if(t!==o){const e="* Entered passwords do not match.";throw s(e),new Error(e)}const c=await fetch("".concat((0,a.F1)(),"/api/users/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:r,lastName:i,email:e,password:t,passwordConfirm:o})});if(l(!0),!c.ok)throw new Error("An error has occured when registering the new user.");const u=await c.json();u.token?(localStorage.setItem("loginToken",u.token),l(!0),window.history.back()):(s(u.message),l(!1))}catch(u){console.log(u)}}},4545:(e,t,o)=>{o.d(t,{Fm:()=>r,UA:()=>i,gC:()=>n,hY:()=>s,sg:()=>c});var a=o(6795);const n=async function(e,t){const o=t?"clubCartToken":"cartToken";try{const t=await fetch("".concat((0,a.F1)(),"/api/shop/carts/verify"),{method:"GET",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(o)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}});if(200!==t.status)throw new Error("No valid cart detected. Either the user does not have a cart token or the token expired.");const n=await t.json();return e(n.cart),n.isValid}catch(n){return console.log(n),!1}},r=async function(e){const t=await fetch("".concat((0,a.F1)(),"/api/shop/carts"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({isClub:e})}),o=await t.json();if(o.cartToken)return o.cartToken},i=async function(e,t,o){let n=!1;if(!localStorage.getItem("loginToken"))return e&&e(!1),t&&t(!1),!1;try{const r=await fetch("".concat((0,a.F1)(),"/api/users/verify"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),i=await r.json();return!1===r.ok||403===r.status?(localStorage.removeItem("loginToken"),n=!1):n=i.isValid,t&&!0===i.isAdmin&&t(!0),e&&e(n),o&&o(i.userID),n}catch(r){return console.log(r),t&&t(!1),!1}},s=async function(e){await fetch("".concat((0,a.F1)(),"/api/users/logout"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),e&&e(!1),localStorage.removeItem("loginToken")},c=async function(e,t,o){try{if(!localStorage.getItem("loginToken"))throw new Error("You are not signed in");const n=await fetch("".concat((0,a.F1)(),"/api/users/membershipLevel"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))}}),r=await n.json();return e&&e(r.membershipLevel),t&&t(r.remainingDeliveries),o&&o(new Date(r.expirationDate).toDateString()),r.membershipLevel}catch(n){return console.log(n+", showing non-member pricing"),e&&e("Non-Member"),"Non-Member"}}},7579:(e,t,o)=>{o.d(t,{Lb:()=>c,Lc:()=>s,UY:()=>d,W:()=>p,Z6:()=>l,pQ:()=>m,qi:()=>r,r:()=>u,sQ:()=>i,wp:()=>h});var a=o(6795),n=o(4545);const r=async function(e,t,o,i,s,c,l){let u="";u=!1===l?"cartToken":"clubCartToken";try{if(i)throw new Error("A request is already pending. Please wait for the current request to complete.");if(s(!0),!t||e<0)throw new Error("One or more required inputs were left blank.");if(!u)throw new Error("Your request for a local storage cart token was invalid. Did you provide a isClub value to this function?");const d=await fetch("".concat((0,a.F1)(),"/api/shop/carts"),{method:"PUT",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(localStorage.getItem(u)),Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))},body:JSON.stringify({itemID:t,updatedQuantity:e,selection:c,isClubCart:l||void 0})});if(510===d.status&&alert("You have reached the maximum allowed quantity for the selected item."),403===d.status&&(localStorage.setItem(u,await(0,n.Fm)(l||!1)),r(e,t,o,i,s,c,l)),!d.ok)throw new Error("An error occurred in the request to update the cart.");const h=await d.json();h.cartToken&&h.cart&&(localStorage.setItem(u,h.cartToken),o(h.cart)),s(!1)}catch(d){s(!1)}},i=async function(e,t){try{const o=t?"clubCartToken":"cartToken";localStorage.getItem(o)||localStorage.setItem(o,await(0,n.Fm)(t||!1)),await(0,n.gC)(e,t)||(localStorage.setItem(o,await(0,n.Fm)(t||!1)),e([]))}catch(o){console.log(o)}},s=function(e,t,o,a,n,i,s,c){const l=parseInt(e.target.value);l?r(l,o.itemData._id,a,n,i,s,c):t("")},c=function(e){return"bagel"===e.itemData.cat&&"six"===e.selection?"Six Pack(s)":"bagel"===e.itemData.cat&&"dozen"===e.selection?"Baker's Dozen(s)":"bagel"===e.itemData.cat&&"two"===e.selection?"Two Pack(s)":"spread"===e.itemData.cat&&"halflb"===e.selection?"1/2 LB":"spread"===e.itemData.cat?"One Pound":"pastry"===e.itemData.cat?"Six Pack(s)":"mystery"===e.itemData.cat?"Single(s)":"N/A"},l=function(e){return e.quantity*e.unitPriceInDollars},u=function(e,t,o){if(!e||!e.items)return 0;let a=0;for(let n=0;n<e.items.length;n++){const r=e.items[n];if(r.selection===o&&"bagel"===r.itemData.cat&&r.itemData.name===t){a=r.quantity;break}if("spread"===r.itemData.cat&&r.itemData.name===t){a=r.quantity;break}if("pastry"===r.itemData.cat&&r.itemData.name===t){a=r.quantity;break}}return a},d={items:[],subtotalInDollars:0,taxInDollars:0,totalQuantity:0,discountAmountInDollars:0,finalPriceInDollars:0,desiredShipDate:new Date,isGuest:!1},h=async function(e){const t=localStorage.getItem("cartToken"),o=localStorage.getItem("loginToken");if(t){const n=await fetch("".concat((0,a.F1)(),"/api/shop/carts/applyMembershipPricing"),{method:"POST",headers:{"Content-Type":"application/json","Cart-Token":"Bearer ".concat(t),Authorization:"Bearer ".concat(o)}});if(n.ok){const t=await n.json();localStorage.setItem("cartToken",t.cartToken),e&&e(t.cart),console.log("Membership pricing successfully applied!")}else console.log("User is not a member.")}},m=function(e){let t=0,o=0;return e.items.map((e=>{switch(e.itemData.cat){case"bagel":o+=e.quantity;break;case"spread":t+=e.quantity}})),1===t&&6===o},p=async function(e,t,o,n){if(t)if(n)if(o<=0)alert("You do not have any deliveries remaining this billing cycle.");else{const e=await fetch("".concat((0,a.F1)(),"/api/memberships/create-club-checkout-session"),{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken")),"cart-token":"Bearer ".concat(localStorage.getItem("clubCartToken"))},body:JSON.stringify({shipDate:n})}),t=await e.json();t.sessionUrl&&(window.location.href=t.sessionUrl)}else alert("You must select a ship date to place your order.");else alert('To place your order you must have 6 "Two Packs" and 1 "1/2 LB" spread in your cart.')}},5739:(e,t,o)=>{o.d(t,{v:()=>a});const a=e=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)}}]);
//# sourceMappingURL=1069.cccec173.chunk.js.map