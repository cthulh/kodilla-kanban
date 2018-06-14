// Board ______________________________________
var board = {
  name: 'Kanban Board',
  addColumn: function(column) {
    this.element.appendChild(column.element);
    initSortable(column.id); //About this feature we will tell later
  },
  element: document.querySelector('#board .column-container')
}
// Add column event
document.querySelector('#board .create-column').addEventListener('click', function() {
  var name;
  // prevent empty string names or cancellation leading to a new column
  while (!name){
    name = prompt('Enter a column name');
  }
  var column = new Column(name);
  board.addColumn(column);
});
