Vue.config.debug = true;

var userData ={
  tel:"",
  name:"",
  street:"",
  plz:"",
  place:""
};

var pizzas =[
  { title: 'Pizza Margherita',
    ingredients: ['moz','tomato'],
    price:21
  },
  { title: 'Pizza Prosciutto',
    ingredients: ['moz','tomato','prosciutto','shroomz'],
    price:24
  },
  { title: 'Pizza Hawai',
    ingredients: ['Ananas','Cheese','prosciutto','Oregano'],
    price:24
  },
  { title: 'Pizza Calzone',
    ingredients: ['Artischocken','Cheese','prosciutto','Oregano'],
    price:24
  }
];

var vm = new Vue({
  el: '#pizzaOrder',
  data: {
    pizzas: pizzas,
    selectedPizza: this.pizzas[0] ,
    userData:userData
  },
  computed:{
    cartTotal: function () {
      var total = 0;
      //cheack all pizzas if they have a count prop and return count * price if they do so. else just retrun price
      this.pizzas.forEach(pizza => pizza.count ? total += pizza.count * pizza.price : total += pizza.price);
      return total;
    }
  },
  methods: {
    addPizzaToCart: function (index) {
      if(this.pizzas[index].count){
        //For plain data objects, you can use the global Vue.set(object, key, value) method
        //http://vuejs.org/guide/reactivity.html
        Vue.set(this.pizzas[index], 'count', ++this.pizzas[index].count);
      }else {
        //declare count if not
        Vue.set(this.pizzas[index], 'count', 1);
      }
    },
    removePizzaFromCart: function (index) {
      //avoid count becoming a negativ value
      if (this.pizzas[index].count) {
        Vue.set(this.pizzas[index], 'count', --this.pizzas[index].count)
      }
    },
    updateLocalStorage: function (e) {
      //example <input name="street">
      var propName = e.target.name;
      if (this.userData[propName] === localStorage.getItem(propName)) {
      }else {
        localStorage.setItem(propName, this.userData[e.target.name]);
      }
    }
  },
  created:function () {
    //load userData from localStorage
    if (localStorageSupported()) {
      for(var prop in this.userData){
        this.userData[prop] = localStorage.getItem(prop);
      }
    }
  }
})

function localStorageSupported() {
    var mod = 'modernizr';
    try {
        localStorage.setItem(mod, mod);
        localStorage.removeItem(mod);
        return true;
    } catch(e) {
        return false;
    }
};
