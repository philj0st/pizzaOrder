var pizzaChoice = document.getElementById('pizzaChoice');
var sizeChoice = document.getElementById('sizeChoice');
var pizzaCart = document.getElementById('pizzaCart');
var addPizzaButton = document.querySelector('button[name="addPizza"]');

addPizzaButton.addEventListener('click', function () {
  //add selected pizza to the cart
  pizzaSele.addToCart(pizzaSele.getSelectedPizza(), pizzaSele.getSelectedSize());
})

//adjust size selection upon pizza selected
pizzaChoice.addEventListener('change', function(e) {
  //clear element from children
  while (sizeChoice.firstElementChild) {
    sizeChoice.remove(sizeChoice.firstElementChild);
  }

  // create the <option> elements for the size choice dropdown
  var sizes = pizzaSele.getSelectedPizza().sizes;
  var options = sizes.map((size, index) => size.toOptionElement(index));
  var docFrag = document.createDocumentFragment();
  options.forEach(option => docFrag.appendChild(option));
  sizeChoice.appendChild(docFrag);
})

/**
*	Pizza constructor
*	@param	{string}	        title
*	@param	{Array<Size>}	    sizes
*	@param	{Array<String>}		ingredients
*/
function Pizza(title, sizes, ingredients) {
  this.title = title;
  this.sizes = sizes;
  this.ingredients = ingredients;
  //reference to the DOM element gets set upon .toOptionElement invocation
  this.elementRef;
  //reference added when stored in PizzaList
  this.pizzaSelectionRef;
  //gets assigned when a pizza is added to the cart with a chosen size
  this.chosenSize;
}

//creates DOM element from Pizza
Pizza.prototype.toOptionElement = function (listindex) {
  var optionEle = document.createElement('option');
  var textNode = document.createTextNode(this.title);
  //add index of the object in pizzaList as data-atribute to recognize the according object to the HTMLElement #TODO: looking for a better solution
  optionEle.setAttribute("data-listindex", listindex);
  optionEle.appendChild(textNode);
  this.elementRef = optionEle;
  return optionEle;
};

/**
*	creates <li> element with a size
*	@param	{number}	listindex where the Pizza is stored in PizzaSelection.cart
*	@param	{Size}	size to be appended to list element
*/
Pizza.prototype.toListElementWithPrice = function (listindex, size) {
  var liEle = document.createElement('li');
  var textNode = document.createTextNode(this.title);
  liEle.setAttribute("data-listindex", listindex);
  liEle.appendChild(textNode);
  this.elementRef = liEle;
  var ulEle = document.createElement('ul');
  ulEle.appendChild(size.toListElement());
  liEle.appendChild(ulEle);
  return liEle;
};

/**
*	Size constructor
*	@param	{number}	diameter
*	@param	{number}	price
*/
function Size (diameter, price) {
  this.diameter = diameter;
  this.price = price;
}

Size.prototype.toOptionElement = function (listindex) {
  var optionEle = document.createElement('option');
  var textNode = document.createTextNode(this.diameter + "cm - " + this.price + "Chf");
  optionEle.setAttribute("data-listindex", listindex);
  optionEle.appendChild(textNode);
  return optionEle;
};

Size.prototype.toListElement = function () {
  var liEle = document.createElement('li');
  var textNode = document.createTextNode(this.diameter + "cm - " + this.price + "Chf");
  liEle.appendChild(textNode);
  return liEle;
};

/**
*	PizzaSelection constructor
*	@param	{Array<Pizza>}	pizzaList
*	@param	{Element}	      selectElement - refernce to the <select> element to store the pizzas in.
* @param  {Element}       listElement - reference to the <ul> element to display the cart.
*/
function PizzaSelection (pizzaList, selectElement, sizeSelectElement, listElement) {
  this.pizzaList = [];
  pizzaList.forEach(pizza => this.addPizzaToList(pizza));
  //set reference to every Pizza stored in PizzaList
  this.pizzaList.forEach(function(pizza){pizza.pizzaSelectionRef = this});
  this.selectElement = selectElement;
  this.listElement = listElement;
  this.sizeSelectElement = sizeSelectElement;
  this.cart = [];
}

//gets Pizza from pizzaList with the index stored in the data-listindex attribute of the <option> element
PizzaSelection.prototype.getSelectedPizza = function () {
  return this.pizzaList[this.selectElement.selectedOptions[0].dataset["listindex"]];
};

PizzaSelection.prototype.getSelectedSize = function () {
  var listindexOfSelectedPizza = this.selectElement.selectedOptions[0].dataset["listindex"];
  var listindexOfSelectedSize = this.sizeSelectElement.selectedOptions[0].dataset["listindex"];
  return this.pizzaList[listindexOfSelectedPizza].sizes[listindexOfSelectedSize];
};

PizzaSelection.prototype.addPizzaToList = function (pizza) {
  pizza.pizzaSelectionRef = this;
  this.pizzaList[this.pizzaList.length] = pizza;
};

PizzaSelection.prototype.drawSelectElement = function () {
  //invoke .toOptionElement on every Pizza stored in pizzaList #firstTimeArrowFunc :D
  //resulting in an Array full of <option> elements
  var options = this.pizzaList.map((pizza, index) => pizza.toOptionElement(index));
  var docFrag = document.createDocumentFragment();
  //using arrow function to avoid binding 'this' to the instance of PizzaSelection
  options.forEach(option => docFrag.appendChild(option));
  this.selectElement.appendChild(docFrag);
  /*
  options.forEach(function(option){
  console.log(this);
  this.selectElement.appendChild(option)
});
*/
};

//append pizza to the cart
PizzaSelection.prototype.addToCart = function (pizza, size) {
  var index = this.cart.length;
  pizza.chosenSize = size;
  this.cart[index] = pizza;
  //update view
  this.listElement.appendChild(pizza.toListElementWithPrice(index, size));
};

PizzaSelection.prototype.drawCartList = function () {
  //clear the cart list
  while(this.listElement.firstChild){
    this.listElement.remove(this.listElement.firstChild);
  }

  //invoke .toListElementWithPrice on every Pizza stored in pizzaList
  //resulting in an Array full of <li> elements
  var listItems = this.cart.map((pizza, index) => pizza.toListElementWithPrice(index));
  listItems.forEach(listItem => this.listElement.appendChild(listItem));

};

//debuging purposes dummy data
//var jsonDummyData = '[{"title":"Pizza Margherita","sizes":[{"diameter":21,"price":15}],"ingredients":["shrooms","mozz"]},{"title":"Pizza Prosciutto","sizes":[{"diameter":21,"price":15}],"ingredients":["shrooms","prosci"]}]';

var size21 = new Size(21,15);
var size32 = new Size(32,18);
var size40 = new Size(40,28);
var pizzaMar = new Pizza("Pizza Margherita",[size21, size32, size40],["shrooms","mozz"]);
var pizzaPro = new Pizza("Pizza Prosciutto",[size21, size32],["shrooms","prosci"]);
var pizzaGra = new Pizza("Pizza Grandoso",[size40],["shrooms","prosci"]);
var pizzaSele = new PizzaSelection([pizzaMar, pizzaPro, pizzaGra], pizzaChoice, sizeChoice, pizzaCart);
pizzaSele.drawSelectElement();


//fire the event once on page load so we have an initial selection
var event = new Event('change');
pizzaChoice.dispatchEvent(event);

//#TODO find a way to reference pizza objects via elements. like jQuery's .data() -> http://stackoverflow.com/questions/29222027/vanilla-alternative-to-jquery-data-function-any-native-javascript-alternati
//#TODO change size selection according to selected pizza.
