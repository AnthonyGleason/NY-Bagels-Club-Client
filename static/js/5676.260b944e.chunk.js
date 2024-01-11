"use strict";(self.webpackChunknew_york_bagels_club=self.webpackChunknew_york_bagels_club||[]).push([[5676],{5676:(e,o,t)=>{t.r(o),t.d(o,{default:()=>i});var s=t(2791),r=t(7689),a=t(5381),n=t(184);function i(){const[e,o]=(0,s.useState)(""),[t,i]=(0,s.useState)(""),[c,l]=(0,s.useState)(""),[d,w]=(0,s.useState)(!1),h=(0,r.UO)().resetID,f=(0,r.s0)();return(0,s.useEffect)((()=>{h&&(0,a.Yg)(h,w)}),[h]),d?(0,n.jsx)("div",{className:"pass-expired",children:"It appears that this password reset link has expired. Please request another password reset to proceed."}):(0,n.jsx)("div",{children:(0,n.jsxs)("form",{className:"pass-reset-form",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"New Password"}),(0,n.jsx)("input",{type:"password",value:e,onChange:e=>{o(e.target.value)}})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{children:"New Password (again)"}),(0,n.jsx)("input",{type:"password",value:t,onChange:e=>{i(e.target.value)}})]}),(0,n.jsx)("div",{children:c}),(0,n.jsx)("button",{type:"button",onClick:()=>{h&&(0,a.mW)(h,e,t,w,f,l)},children:"Submit"})]})})}},6795:(e,o,t)=>{t.d(o,{F1:()=>s,ki:()=>r});const s=function(){return"https://brendels-webstore-f2339d5fa5b2.herokuapp.com"},r=function(){return"https://nybagelsclub.com"};"".concat(s(),"/cart/checkout/success")},5381:(e,o,t)=>{t.d(o,{Cv:()=>w,Mm:()=>n,OO:()=>d,Yg:()=>c,ju:()=>h,mW:()=>l,sJ:()=>f,tI:()=>i});var s=t(6795),r=t(5739),a=t(184);const n=async function(e,o,t){try{const r=localStorage.getItem("loginToken");if(!r)throw new Error("A login token was not provided! Are you logged in?");const a=await fetch("".concat((0,s.F1)(),"/api/users/settings"),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(r)}});if(!a.ok)throw new Error("Failed to fetch account settings");const n=await a.json();e&&e(n.firstName),o&&o(n.lastName),t&&t(n.email)}catch(r){console.log(r)}},i=async function(e,o,t,a,n,i,c){try{if(!e||!o||!t||!i)throw new Error("The first name, last name, email and current password fields are required.");if(!(0,r.v)(t))throw new Error("The provided email is not a valid email");if(a&&n&&a!==n)throw new Error("New passwords do not match!");const l=await fetch("".concat((0,s.F1)(),"/api/users/settings"),{method:"PUT",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(localStorage.getItem("loginToken"))},body:JSON.stringify({firstName:e,lastName:o,emailInput:t,passwordInput:a,passwordConfInput:n,currentPasswordInput:i})});if(!l.ok)throw new Error("Failed to apply new account settings");const d=await l.json();if(d.wasUserUpdated){if(!d.loginToken)throw localStorage.removeItem("loginToken"),new Error("A new login token was not provided!");localStorage.setItem("loginToken",d.loginToken),c("/")}}catch(l){console.log(l)}},c=async function(e,o){try{const t=await fetch("".concat((0,s.F1)(),"/api/users/forgotPassword/").concat(e),{method:"GET"});if(!t.ok)throw new Error("Failed to get password reset token status.");o((await t.json()).isExpired)}catch(t){console.log(t)}},l=async function(e,o,t,r,a,n){try{if(!e||!o||!t)throw new Error("Required inputs are missing!");if(o!==t)throw new Error("Passwords do not match!");const i=await fetch("".concat((0,s.F1)(),"/api/users/forgotPassword/").concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({password:o,passwordConf:t})});if(!i.ok)throw new Error("Failed to submit the forgot password form. Please try again later.");const c=await i.json();r(c.isExpired),c.wasUpdated&&a("/login"),c.isExpired||n("Passwords do not match or user does not exist.")}catch(i){console.log(i)}},d=function(e){return e?(0,a.jsx)("p",{className:"login-error-message",children:e}):null},w=async function(e,o,t,a){try{if(!e||!o){const e="* Please ensure both the email and password fields are completed before submitting this form.";throw t(e),new Error(e)}if(!(0,r.v)(e)){const e="* Please enter a valid email to submit this form";throw t(e),new Error(e)}const n=await fetch("".concat((0,s.F1)(),"/api/users/login"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:o})});if(!n.ok)throw new Error("Failed to log in user.");const i=await n.json();if(!i.token)throw t(i.message),new Error(i.message);localStorage.setItem("loginToken",i.token),a("/")}catch(n){console.log(n)}},h=async function(e,o){try{if(!e){const e="* The email field cannot be left blank.";throw o(e),new Error(e)}if(!(0,r.v)(e)){const e="* Please ensure you have entered a valid email.";throw o(e),new Error(e)}const t=await fetch("".concat((0,s.F1)(),"/api/users/forgotPassword"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e})});if(!t.ok)throw new Error("Failed to request a forgot password email.");(await t.json()).isEmailSent&&alert("Your request has been processed. If an account exists for the provided email address you will recieve an email with a password reset link.")}catch(t){console.log(t)}},f=async function(e,o,t,a,n,i,c,l){if(!c)try{if(!e||!o||!t||!a||!n){const e="* Please ensure all fields are completed before submitting this form.";throw i(e),new Error(e)}if(!(0,r.v)(e)){const e="* Please enter a valid email to submit this form";throw i(e),new Error(e)}if(o!==t){const e="* Entered passwords do not match.";throw i(e),new Error(e)}const c=await fetch("".concat((0,s.F1)(),"/api/users/register"),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({firstName:a,lastName:n,email:e,password:o,passwordConfirm:t})});if(l(!0),!c.ok)throw new Error("An error has occured when registering the new user.");const d=await c.json();d.token?(localStorage.setItem("loginToken",d.token),l(!0),window.history.back()):(i(d.message),l(!1))}catch(d){console.log(d)}}},5739:(e,o,t)=>{t.d(o,{v:()=>s});const s=e=>/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e)}}]);
//# sourceMappingURL=5676.260b944e.chunk.js.map