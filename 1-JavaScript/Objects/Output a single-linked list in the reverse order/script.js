let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null,
      },
    },
  },
};

printReverseList(list);

// function printReverseList(list) {
//   let array = [];
//   let listAux = list;

//   while (listAux) {
//     array.push(listAux.value);
//     listAux = listAux.next;
//   }

//   for (let i = array.length - 1; i >= 0; i--) {
//     alert(array[i]);
//   }
// }

function printReverseList(list) {
  if (list.next) {
    printReverseList(list.next);
  }

  alert(list.value);
}
