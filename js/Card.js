// Card constructor ______________________________________
function Card(id, name) {
  var self = this;

  this.id = id;
  this.name = name || 'No name given';
  this.element = generateTemplate('card-template', { description: this.name }, 'li');

  this.element.querySelector('.card').addEventListener('click', function (event) {
    event.stopPropagation();

    if (event.target.classList.contains('btn-delete')) {
      self.removeCard();
    }
    if (event.target.classList.contains('btn-rename')) {
      self.renameCard();
    }
  });

  this.element.ondragend = function() {
    self.moveCard(self.element.movedTo);
  }
}
// Card prototype
Card.prototype = {
  removeCard: function() {
  var self = this;

  axios({
    url: params.baseUrl + '/card/' + self.id,
    method: 'delete',
    headers: params.myHeaders
  })
    .then( resp => self.element.parentNode.removeChild(self.element) )
  },
  renameCard: function() {
    var self = this;
    var newName;

    while(!newName) {
      newName = prompt('Enter a new card name');
    }

    const data = {
      name: newName,
      bootcamp_kanban_column_id: self.element.parentNode.id
    }

    axios({
      url: params.baseUrl + '/card/' + self.id,
      method: 'put',
      headers: params.myHeaders,
      data
    })
      .then( () => {
        self.name = newName;
        self.element.querySelector('.card-description').innerHTML = newName;
      })
  },
  moveCard: function(newColumnId) {
    var self = this;

    const data = {
      id: self.id,
      name: self.name,
      bootcamp_kanban_column_id: newColumnId
    }

    axios({
      url: params.baseUrl + '/card/' + self.id,
      method: 'put',
      headers: params.myHeaders,
      data
    })
      .then( resp => console.log('card ' + resp.data.id + ' moved'))
  }
}
