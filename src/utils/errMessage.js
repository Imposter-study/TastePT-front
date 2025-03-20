export const errMessage = (error) => {
  let errorMessage = "";
  const errKeys = Object.keys(error.response.data);
  errKeys.forEach((key) => {
    errorMessage += error.response.data[key];
  });
  return errorMessage;
};
