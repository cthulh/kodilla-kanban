// Params
var params = {
  baseUrl: 'https://kodilla.com/pl/bootcamp-api',
  myHeaders: {
    'X-Client-Id': '3315',
    'X-Auth-Token': '8ca33a0b25d4db9d3806e1bc43c69b83'
  }
}
// Fetch board
fetch(params.baseUrl + '/board', { headers: params.myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });

// Add columns to the board
function setupColumns(columns) {
  columns.forEach(function(column) {
  	var col = new Column(column.id, column.name);
      board.addColumn(col);
      setupCards(col, column.cards);
  });
}

// Add cards to the relevant column (passed in)
function setupCards(col, cards) {
	cards.forEach(function (card) {
    var cardObj = new Card(card.id, card.name);
  	col.addCard(cardObj);
	});
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
    sort: true,
    onAdd: function (/**Event*/evt) {
  		var itemEl = evt.item;  // dragged HTMLElement
      itemEl.movedTo = itemEl.parentNode.id;
      itemEl.movedFrom = evt.from.id;
      console.log(itemEl);
  	}
  });
}
