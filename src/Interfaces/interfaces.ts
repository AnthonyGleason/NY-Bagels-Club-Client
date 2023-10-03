//user
export interface User{
  firstName:string,
  lastName:string,
  email:string,
  hashedPassword:string,
  group?:string,
  dateCreated:Date,
  frozen:boolean,
  _id:string //unique id given by mongodb
};

//item
export interface Item{
  price: number,
  name: string,
  quantity: number,
  _id: string, // unique id given by mongodb
  index:number
};