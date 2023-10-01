//user
export interface User{
  firstName:string,
  lastName:string,
  email:string,
  hashedPassword:string,
  group?:string
};

//item
export interface Item{
  price: number,
  name: string,
  quantity: number,
  _id: string,
  index: number
};