const USE_LOCALHOST:boolean = false; //FALSE FOR PRODUCTION

export const IS_MAINTENANCE_MODE:boolean = false;
export const HOME_LOADING_DELAY:number= 2000 //in milliseconds

export const getServerUrlPrefix = function(){
  if (USE_LOCALHOST){
    return('http://localhost:5000');
  }else{
    return('https://brendels-webstore-f2339d5fa5b2.herokuapp.com');
  };
};

export const getClientUrlPrefix = function(){
  if (USE_LOCALHOST){
    return('http://localhost:3000');
  }else{
    return('https://anthonygleason.github.io/NY-Bagels-Club-Client')
  };
};
export const CHECKOUT_SUCCESS_REDIRECT_URL:string = `${getServerUrlPrefix()}/cart/checkout/success`;