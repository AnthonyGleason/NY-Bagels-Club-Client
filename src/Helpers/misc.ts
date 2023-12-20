export const scrollToID = function(elementID:string){
  const element: HTMLElement | null= document.getElementById(elementID);
  
  if (element) {
    element.scrollIntoView();
  };
};