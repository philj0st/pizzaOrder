var sizes = ["21 cm", "32cm", "42cm"];

var pizzas = {
  "margeritha": {
    "title": "pizza margherita",
    "price": 21,
    "ingredients": ["mozzarella","whatever"]
  },
  "prosciutto": {
    "title": "pizza prosciutto",
    "price": 24,
    "ingredients": ["mushrooms", "prosciutto"]
  }
}

var pizzaChoice = document.getElementById('pizzaChoice');
var addPizzaButton = document.querySelector('[name="addPizza"]');
addPizzaButton.addEventListener('click', function () {

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
}

//creates DOM element from Pizza
Pizza.prototype.toOptionElement = function () {
  var optionEle = document.createElement('option');
  var textNode = document.createTextNode(this.title);
  optionEle.appendChild(textNode);
  this.elementRef = optionEle;
  return optionEle;
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

/**
*	PizzaSelection constructor
*	@param	{Array<Pizza>}	pizzaList
*	@param	{element}	      selectElement - refernce to the <select> element to store the pizzas in.
*/
function PizzaSelection (pizzaList, selectElement) {
	this.pizzaList = pizzaList;
	this.selectElement = selectElement;
}

PizzaSelection.prototype.drawSelectElement = function () {
  //invoke .toOptionElement on every Pizza stored in pizzaList #firstTimeArrowFunc :D
  //resulting in an Array full of <option> elements
  var options = this.pizzaList.map(pizza => pizza.toOptionElement());

  //using arrow function to avoid binding 'this' to the instance of PizzaSelection
  options.forEach(option => this.selectElement.appendChild(option));
  /*
  options.forEach(function(option){
    console.log(this);
    this.selectElement.appendChild(option)
  });
  */
};

//debuging purposes dummy data
//var jsonDummyData = '[{"title":"Pizza Margherita","sizes":[{"diameter":21,"price":15}],"ingredients":["shrooms","mozz"]},{"title":"Pizza Prosciutto","sizes":[{"diameter":21,"price":15}],"ingredients":["shrooms","prosci"]}]';

var size21 = new Size(21,15);
var pizzaMar = new Pizza("Pizza Margherita",[size21],["shrooms","mozz"]);
var pizzaPro = new Pizza("Pizza Prosciutto",[size21],["shrooms","prosci"]);
var pizzaSele = new PizzaSelection([pizzaMar, pizzaPro],document.getElementById('pizzaChoice'));

//#TODO find a way to reference pizza objects via elements. like jQuery's .data() -> http://stackoverflow.com/questions/29222027/vanilla-alternative-to-jquery-data-function-any-native-javascript-alternati
//#TODO change size selection according to selected pizza.
