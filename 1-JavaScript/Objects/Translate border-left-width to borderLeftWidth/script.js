console.log(camelize("background-color") == 'backgroundColor');
console.log(camelize("list-style-image") == 'listStyleImage');
console.log(camelize("-webkit-transition") == 'WebkitTransition');

function camelize(string) {
  const stringWithoutDash = string.split("-");
  let avoidFirstWord = true;

  const capitalizeArray = stringWithoutDash.map(element => {
    if (avoidFirstWord) {
      avoidFirstWord = false;
      return element;
    }
    return element.charAt(0).toUpperCase() + element.substring(1).toLowerCase();
  });

  return capitalizeArray.join("");
}