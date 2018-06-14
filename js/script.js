(function(){
  // Random id generator ______________________________________
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
        str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }
  // Template generator ______________________________________
  function generateTemplate(name, data, basicElement) {
    var template = document.getElementById(name).innerHTML;
    var element = document.createElement(basicElement || 'div');

    Mustache.parse(template);
    element.innerHTML = Mustache.render(template, data);

    return element;
  }

  // Init Sortable ______________________________________
  function initSortable(id) {
    var el = document.getElementById(id);
    var sortable = Sortable.create(el, {
      group: 'kanban',
      sort: true
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Board ______________________________________
    var board = {
      name: 'Kanban Board',
      addColumn: function(column) {
        this.element.appendChild(column.element);
        initSortable(column.id); //About this feature we will tell later
      },
      element: document.querySelector('#board .column-container')
    };
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

    // Column constructor ______________________________________
    function Column(name) {
      var self = this;

      this.id = randomString();
      this.name = name;
      this.element = generateTemplate('column-template', { name: this.name, id: this.id });

      this.element.querySelector('.column').addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-delete')) {
          self.removeColumn();
        }

        if (event.target.classList.contains('add-card')) {
          var cardName;
          // prevent empty string names or cancellation leading to a new card
          while (!cardName){
            cardName = prompt('Enter the name of the card');
          }
          self.addCard(new Card(cardName));
        }
      });
    }
    // Column prototype
    Column.prototype = {
      addCard: function(card) {
        this.element.querySelector('ul').appendChild(card.element);
      },
      removeColumn: function() {
        this.element.parentNode.removeChild(this.element);
      }
    };

    // Card constructor ______________________________________
    function Card(description) {
      var self = this;

      this.id = randomString();
      this.description = description;
      this.element = generateTemplate('card-template', { description: this.description }, 'li');

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
    		this.element.parentNode.removeChild(this.element);
        }
    }

    // Setup of elements ______________________________________

    // Columns
    board.addColumn(new Column('To do'));
    board.addColumn(new Column('Doing'));
    board.addColumn(new Column('Done'));

    // Cards
    todoColumn.addCard(new Card('New task'));
    doingColumn.addCard(new Card('Create kanban boards'));

  });
}());
