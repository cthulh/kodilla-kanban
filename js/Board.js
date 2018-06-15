// Board ______________________________________
var board = {
  name: 'Kanban Board',
  addColumn: () => {
    var name;
    // prevent empty string names or cancellation leading to a new column
    while (!name){
      name = prompt('Enter a column name');
    }

    const data ={
      name
    }

    axios({
      url: params.baseUrl + '/column',
      method: 'post',
      headers: params.myHeaders,
      data
    })
      .then( resp => {
        var column = new Column(resp.data.id, name);
        board.element.appendChild(column.element);
        initSortable(column.id);
      });
  },
  element: document.querySelector('#board .column-container')
}
// Add column event
document.querySelector('#board .create-column').addEventListener('click', () => { board.addColumn() });
