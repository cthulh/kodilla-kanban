// Card constructor ______________________________________
function Card(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.element = generateTemplate('card-template', { description: this.name }, 'li');

  this.element.querySelector('.card').addEventListener('click', function (event) {
    event.stopPropagation();
    console.log(self.element.movedFrom);
    if (event.target.classList.contains('btn-delete')) {
      self.removeCard();
    }
    if (event.target.classList.contains('btn-rename')) {
      self.renameCard();
    }
  });

  /*this.element.ondrop = function() {
    self.moveCard(self.element.movedTo);
  }*/
  this.element.ondragend = function() {
    self.moveCard(self.element.movedTo);
  }
}
// Card prototype
Card.prototype = {
  removeCard: function() {
  var self = this;

  fetch(params.baseUrl + '/card/' + self.id, { method: 'DELETE', headers: params.myHeaders })
    .then(function(resp) {
      return resp.json();
    })
    .then(function(resp) {
      self.element.parentNode.removeChild(self.element);
    })
  },
  renameCard: function() {
    var self = this;
    var newName;

    while(!newName) {
      newName = prompt('Enter a new card name');
    }
    var data = new FormData();
    data.append('name', newName);
    data.append('bootcamp_kanban_column_id', self.element.parentNode.id)
    fetch(params.baseUrl + '/card/' + self.id, { method: 'PUT', headers: params.myHeaders, body: data })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        console.log(resp.id);
        self.name = newName;
        self.element.querySelector('.card-description').innerHTML = newName;
      })
  },
  moveCard: function(newColumnId) {
    var self = this;
    var data = new FormData();
    data.append('id', self.id)
    data.append('name', self.name);
    console.log(self.name);
    data.append('bootcamp_kanban_column_id', newColumnId)
    console.log(newColumnId);
    console.log(params.baseUrl + '/card/' + self.id);
    fetch(params.baseUrl + '/card/' + self.id, { method: 'PUT', headers: params.myHeaders, body: data })
      .then(function(resp) {
        return resp.json();
      })
      .then(function(resp) {
        console.log('card ' + resp.id + ' moved');
      })
  }
}
