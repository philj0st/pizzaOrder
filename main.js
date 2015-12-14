Vue.config.debug = true;

var userData ={
  tel:"",
  name:"",
  street:"",
  plz:"",
  place:""
};

var vm = new Vue({
  el: '#pizzaOrder',
  data: {
    selectedPizza:null ,
    pizzas: [
      { title: 'Pizza Margherita',
        ingredients: ['moz','tomato'],
        price:21
      },
      { title: 'Pizza Prosciutto',
        ingredients: ['moz','tomato','prosciutto','shroomz'],
        price:24
      }
    ],
    cart : [],
    userData:userData
  },
  computed:{
    cartTotal: function () {
      var total = 0;
      this.cart.forEach(pizza => total += pizza.price);
      return total;
    }
  },
  methods: {
    addPizzaToCart: function (pizza) {
      if (pizza) {
        //check if pizza is already stored
        for (var i = 0; i < this.cart.length; i++) {
          if (this.cart[i] === pizza) {
            //inc count if already stored
            if (this.cart[i].count) {
              //For plain data objects, you can use the global Vue.set(object, key, value) method
              //http://vuejs.org/guide/reactivity.html
              Vue.set(this.cart[i], 'count', ++this.cart[i].count)
              return i;
            }else {
              //declare count if not
              Vue.set(this.cart[i], 'count', 2)
              return i;
            }
          }
        }
        return this.cart.push(pizza);
      }
    },
    removePizzaFromCart: function (index) {
      //if count is less then 2 remove the last pizza
      if (this.cart[index].count>=2) {
        //dont remove pizza only decrement count
        Vue.set(this.cart[index], 'count', --this.cart[index].count)
      }else {
        //if count is less than 1 remove the object
        this.cart.splice(index, 1);
      }
    },
    updateLocalStorage: function (e) {
      var propName = e.target.name;
      if (this.userData[propName] === localStorage.getItem(propName)) {
        console.log("same value");
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
