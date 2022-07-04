let calculator = {
    // ... your code ...
    read: function() {
      this.a = Number(prompt("Put value a", 0));
      this.b = Number(prompt("Put value b", 0));
    },
    sum: function() {
      return this.a + this.b;
    },
    mul: function() {
      return this.a * this.b;
    }
  };
  
  calculator.read();
  alert( calculator.sum() );
  alert( calculator.mul() );