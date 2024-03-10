const USE_LOCALHOST:boolean = false; //FALSE FOR PRODUCTION

export const IS_MAINTENANCE_MODE:boolean = false;
export const HOME_LOADING_DELAY:number= 4000 //in milliseconds

export const getServerUrlPrefix = function(){
  if (USE_LOCALHOST){
    return('http://localhost:5000');
  }else{
    return('https://nybc-server-f069d08697f3.herokuapp.com');
  };
};

export const getClientUrlPrefix = function(){
  if (USE_LOCALHOST){
    return('http://localhost:3000');
  }else{
    return('https://nybagelsclub.com/')
  };
};
export const CHECKOUT_SUCCESS_REDIRECT_URL:string = `${getServerUrlPrefix()}/cart/checkout/success`;