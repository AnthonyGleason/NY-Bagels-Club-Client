const USE_LOCALHOST:boolean = true;
export const HOME_LOADING_DELAY:number= 4000 //in milliseconds
export const CHECKOUT_SUCCESS_REDIRECT_URL:string = "http://localhost:3000/cart/checkout/success";

export const getServerUrlPrefix = function(){
  if (USE_LOCALHOST){
    return('http://localhost:5000');
  }else{
    return('https://brendels-webstore-f2339d5fa5b2.herokuapp.com');
  };
};
