// Column constructor ______________________________________
function Column(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.element = generateTemplate('column-template', { name: this.name, id: this.id });

  this.element.querySelector('.column').addEventListener('click', function (event) {
    if (event.target.classList.contains('btn-delete')) {
      self.removeColumn();
    }
    if (event.target.classList.contains('btn-rename')) {
      self.renameColumn();
    }
    if (event.target.classList.contains('add-card')) {
      self.addCard();
    }
  });
}
// Column prototype
Column.prototype = {
  addCard: function() {
    var self = this;
    var name;

    while (!name){
      name = prompt('Enter the name of the card');
    }

    const data = {
      name,
      bootcamp_kanban_column_id: self.id
    }

    axios({
      url: params.baseUrl + '/card',
      method: 'post',
      headers: params.myHeaders,
      data
    })
      .then( resp => {
        var card = new Card(resp.data.id, name);
        this.element.querySelector('ul').appendChild(card.element);
      });
  },
  removeColumn: function() {
    var self = this;

    axios({
      url: params.baseUrl + '/column/' + self.id,
      method: 'delete',
      headers: params.myHeaders
    })
      .then(function(resp) {
        self.element.parentNode.removeChild(self.element);
      });
  },
  renameColumn: function() {
    var self = this;

    var newName;
    while (!newName) {
      newName = prompt('Enter a new column name');
    }

    const data = {
      name: newName
    }

    axios({
      url: params.baseUrl + '/column/' + self.id,
      method: 'put',
      headers: params.myHeaders,
      data
    })
      .catch( error => console.log('Error', error))
      .then( resp => {
        self.name = newName;
        self.element.querySelector('.column-title').innerHTML = newName;
      })
  }
}
