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

export interface SpreadItem extends Product{
  price: number
};

//item
export interface BagelItem extends Product{
  dozenPrice:number,
  sixPrice:number,
  twoPrice:number
};

export interface PastryItem extends Product{
  price: number
};

export interface MysteryItem extends Product{
  price: number
};

export interface Product{
  price: number;
  name: string;
  _id: string;
  cat: string;
  desc: string;
};

export interface CartItem{
  itemData: BagelItem | SpreadItem,
  selection?: string
  quantity: number,
  unitPriceInDollars: number,
};

export interface CartItem{
  itemData: BagelItem | SpreadItem,
  selection?: string
  quantity: number,
  unitPriceInDollars: number,
};

export interface Address{
  line1:string,
  line2?:string,
  city:string,
  state:string,
  postal_code:string,
  country:string,
  phone: string,
  fullName: string,
  email:string
};

export interface Cart{
  items:CartItem[];
  subtotalInDollars:number;
  taxInDollars:number;
  totalQuantity:number;
  discountAmountInDollars:number;
  finalPriceInDollars:number;
  desiredShipDate: Date;
  isGuest:boolean;
};

//order
export interface Order{
  dateCreated:Date,
  userID:string,
  status:string,
  cart:Cart,
  shippingAddress:Address,
  trackingNumberArr?:string[],
  giftMessage?:string,
  isClubOrder?:boolean,
  _id: string // unique id given by mongodb
};

//membership
export interface Membership{
  expirationDate?: Date,
  tier: string,
  userID: string,
  _id: string //unique id given by mongodb
};