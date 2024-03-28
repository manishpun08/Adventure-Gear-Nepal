export const generateOtp = () => {
  return (Math.floor(Math.random() * 10000) + 1000000).toString().substring(1);
};
