export const scrollToID = function(elementID:string,isMenuItem?:boolean,useSmoothScroll?:boolean){
  const element: HTMLElement | null= document.getElementById(elementID);
  
  if (useSmoothScroll && element){
    element.scrollIntoView({behavior: 'smooth'});
  }else if(element){
    element.scrollIntoView();
  };
  if (isMenuItem && element){
    setTimeout(() => {
      element.scrollIntoView({ behavior: 'smooth' });
    }, 1000);
  }
};