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
  sixPrice:number,
  name: string,
  _id: string, // unique id given by mongodb
  cat:string,
};

export interface CartItem{
  itemData: BagelItem | SpreadItem,
  selection?: string
  quantity: number,
  unitPriceInDollars: number,
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
  subtotalInDollars:number;
  taxInDollars:number;
  totalQuantity:number;
  promoCodeID:string;
  discountAmountInDollars:number;
  finalPriceInDollars:number;
  desiredShipDate: Date;
};

//order
export interface Order{
  dateCreated:Date,
  userID:string,
  status:string,
  cart:Cart,
  shippingAddress:Address,
  trackingNumberArr?:string[],
  giftMessage?:string
  _id: string // unique id given by mongodb
};

//membership
export interface Membership{
  renewalDate?: Date,
  tier: string,
  userID: string,
  _id: string //unique id given by mongodb
};

export interface PromoCode{
  code: string,
  dateOfExpiry:Date,
  totalAllowedUses?:number,
  totalTimesUsed:number,
  createdByUserID:string,
  description:string,
  disabled: boolean,
  perk: string, // for example "Free Shipping", "15% Off", "$25 Off",
  _id: string //mongodb unique id
};