let list = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 3,
      next: {
        value: 4,
        next: null
      }
    }
  }
};

printList(list);

// function printList(list) {
//   let listAux = list;

//   while (!!listAux) {
//     alert(listAux.value);
//     listAux = listAux.next;
//   }
// }
function printList(list) {
  alert(list.value);

  if (list.next) {
    printList(list.next);
  }
}