class ExtendedClock extends Clock {
  constructor(clockOptions) {
    super(clockOptions);
    let { precision = 1000 } = clockOptions;
    this.precision = precision;
  }

  start() {
    this.render();
    this.timer = setInterval(() => this.render(), this.precision);
  }
}

let twoSecondsTickClock = new ExtendedClock({
  template: "h:m:s",
  precision: 2000,
});

twoSecondsTickClock.start();
