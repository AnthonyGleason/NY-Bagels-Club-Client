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

export interface SpreadItem{
  price: number,
  name: string,
  _id: string //unique id given by mongodb,
  cat:string,
};

//item
export interface BagelItem{
  dozenPrice:number,
  fourPrice:number,
  name: string,
  _id: string, // unique id given by mongodb
  cat:string,
};

export interface CartItem{
  itemData: BagelItem | SpreadItem,
  selection?: string
  quantity: number,
  unitPrice: number,
};

//address
export interface Address{
  line1: string,
  line2?: string | null,
  city: string,
  state: string,
  postal_code: string,
  country: string,
  phone: string,
  fullName: string
};

export interface Cart{
  items:CartItem[];
  subtotal:number;
  tax:number;
  totalQuantity:number;
};

//order
export interface Order{
  dateCreated:Date,
  userID:string,
  status:string,
  totalAmount:number,
  cart:Cart,
  shippingAddress:Address,
  trackingNumber?:string,
  giftMessage?:string  
  _id: string // unique id given by mongodb
};
