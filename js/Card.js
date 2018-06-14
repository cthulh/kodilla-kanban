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
  });
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
  }
}
