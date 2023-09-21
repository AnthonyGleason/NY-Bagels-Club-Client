const USE_LOCALHOST:boolean = true;

export const getServerUrlPrefix = function(){
  if (USE_LOCALHOST){
    return('http://localhost:5000');
  }else{
    return('https://brendels-webstore-f2339d5fa5b2.herokuapp.com');
  };
};