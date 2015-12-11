//#TODO: bug - when app crashes when deleting pizza wiht index != cart.length
//#TODO: add - localStorage support

var userData ={
  tel:"",
  name:"",
  street:"",
  plz:"",
  place:""
};
if (localStorage.userData) {
  console.log("Welcome Back");
  userData = JSON.parse(localStorage.userData);
  console.log(userData);
}

//clone an object
function clone(obj) {
  var target = {};
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
      target[i] = obj[i];
    }
  }
  return target;
}


var vm = new Vue({
  el: '#pizzaOrder',
  data: {
    selectedPizza:{} ,
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
        //cant push same object multiple times so clone it
        //this.cart.push(clone(pizza));

        //check if pizza is already stored
        for (var i = 0; i < this.cart.length; i++) {
          if (this.cart[i] === pizza) {
            //inc count if already stored
            if (this.cart[i].count) {
              this.cart[i].count++;
              return i;
            }else {
              //declare count if not
              this.cart[i].count = 2;
              return i;
            }
          }
        }
        return this.cart.push(pizza);
      }
    },
    removePizzaFromCart: function (index) {
      //var indexOfPizza = this.cart.indexOf(pizza);
      //console.log(indexOfPizza);
      this.cart.splice(index, 1)
    },
    updateLocalStorage: function (e) {
      if (eval("this.userData."+e.target.name) === e.target.value) {
        console.log("same value");
      }else {
        console.log("made changees");
      }
    }
  }
})
