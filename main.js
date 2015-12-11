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
      console.log(index);
      if (this.cart[index].count) {
        //dont remove pizza only decrement count
        Vue.set(this.cart[index], 'count', --this.cart[index].count)
      }else {
        //if count is less than 1 remove the object
        this.cart.splice(index, 1)
      }
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
