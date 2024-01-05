 // Custom email validation function
export const isValidEmail = (email:string):boolean => {
  // You can use a regular expression to validate the email format
  const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return regex.test(email);
};