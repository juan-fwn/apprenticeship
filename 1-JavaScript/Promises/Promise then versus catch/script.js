promise.then(f1).catch(f2); // 1

promise.then(f1, f2); // 2

// They are not equal, the fisrt one if promise have error will executes catch block
// The second one don't handle errors.
