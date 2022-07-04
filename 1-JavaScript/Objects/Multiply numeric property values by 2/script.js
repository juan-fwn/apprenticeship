// before the call
let menu = {
    width: 200,
    height: 300,
    title: "My menu"
  };
  
  multiplyNumeric(menu);
  
  // after the call
  menu = {
    width: 400,
    height: 600,
    title: "My menu"
  };

function multiplyNumeric(object) {
    console.log(object);
    for (let key in object) {
        if (typeof object[key] === "number") object[key] *= 2;
    }
    console.log(object);
}