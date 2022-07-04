// class Rabbit {
//   constructor(name) {
//     this.name = name;
//   }
// }

// let rabbit = new Rabbit("Rab");

// // hasOwnProperty method is from Object.prototype
// alert(rabbit.hasOwnProperty("name")); // true

class Rabbit extends Object {
  constructor(name) {
    super(); // with this have no Error.
    this.name = name;
  }
}

let rabbit = new Rabbit("Rab");

alert(rabbit.hasOwnProperty("name")); // Error
