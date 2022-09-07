export const getCookie = (key) => {
  const cookies = document.cookie;
  const cookieArray = cookies.split(";");
  const foundCookie = cookieArray.find((cookie) => cookie.includes(key));

  if (foundCookie) {
    return foundCookie.split("=")[1];
  }
  return "";
};
