
<<<<<<< HEAD
//todo: lieferzeit z.b 12:30, inkl. MwSt | numberRepresentation for piza price /plz finder ort automatisch / rechnig überem price wo nomal zämefasst gruppieren(snacks pizzas döner getränke usw)

//total price every pizza gets counted once?
=======
//todo: lieferzeit z.b 12:30, inkl. MwSt /plz finder ort automatisch / rechnig überem price wo nomal zämefasst gruppieren(snacks pizzas döner getränke usw)

>>>>>>> 79f1fa9... removed deliverytime, added number representation and order overview, fixed total price miscalculatio
Vue.config.debug = true;

Vue.filter('numberRepresentation', function (value) {
  //check if it's an integer
  if (typeof value==='number' && (value%1)===0) {
    return value+".-";
  }else if(typeof value==='number'){
    return value.toFixed(2);
  }
});

var userData ={
  tel:"",
  name:"",
  street:"",
  plz:"",
  place:""
};

var categories = [
  {
    name : "Pizzas",
    items : [
      { title: 'Pizza mit Lieferung',
        descr: ['moz','tomato'],
        price:21,
      },
      { title: 'Pizza Margherita',
        descr: ['moz','tomato'],
        price:21
      },
      { title: 'Pizza Prosciutto',
        descr: ['moz','tomato','prosciutto','shroomz'],
        price:24.5
      },
      { title: 'Pizza Hawai',
        descr: ['Ananas','Cheese','prosciutto','Oregano'],
        price:24
      },
      { title: 'Pizza Calzone',
        descr: ['Artischocken','Cheese','prosciutto','Oregano'],
        price:24
      },
      { title: 'Pizza Raffaelo',
        descr: ['white chocolate','Cheese','prosciutto','Oregano'],
        price:24
      }
    ]
  },
  {
    name : "Doener",
    items : [
      {
        title: 'Falafel',
        descr: 'humus, karotten',
        price: 12.6
      },
      {
        title: 'Crispy Chicken Special',
        descr: 'mit Doenerfleisch und Huenerbrust',
        price: 14.2
      }
    ]
  },
  {
    name : "Getraenke",
    items : [
      { title: 'Heineken',
        descr: '5dl',
        price:4.5,
      },
      { title: 'Coca Cola',
        descr: '1l',
        price:3
      }
    ]
  }
]

var vm = new Vue({
  el: '#pizzaOrder',
  data: {
    categories : categories,
    userData : userData
  },
  computed:{
    cartTotal: function () {
      var total = 0;
      this.categories.forEach(function (category, index, array) {
        category.items.forEach(function (item, index) {
          if (item.count) {
            total += item.count * item.price
          }
        })
      })
      //cheack all pizzas if they have a count prop and return count * price if they do so. else just retrun price. removed arrow functions for IE support
      //this.pizzas.forEach(pizza => pizza.count ? total += pizza.count * pizza.price : 0);
      return total;
    }
  },
  methods: {
    addItemToCart: function (index, categoryIndex) {
      if(this.categories[categoryIndex].items[index].count){
        //For plain data objects, you can use the global Vue.set(object, key, value) method
        //http://vuejs.org/guide/reactivity.html
        Vue.set(this.categories[categoryIndex].items[index], 'count', ++this.categories[categoryIndex].items[index].count);
      }else {
        //declare count if not
        Vue.set(this.categories[categoryIndex].items[index], 'count', 1);
      }
    },
    removeItem: function (index, categoryIndex) {
      //avoid count becoming a negativ value
      if (this.categories[categoryIndex].items[index].count) {
        Vue.set(this.categories[categoryIndex].items[index], 'count', --this.categories[categoryIndex].items[index].count);
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
  },
  ready:function () {
    //register eventhandler for the postal code lookup
    document.getElementById('postal').addEventListener('blur', function () {
      postalLookup(this.value);
    })
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

function postalLookup(zip) {
  var request = new XMLHttpRequest();
  //credits to www.geonames.org
  request.open('GET', 'http://api.geonames.org/postalCodeLookupJSON?postalcode='+ zip +'&country=CH&username=demo', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      // Success!
      var data = JSON.parse(request.responseText);
      //if search was successful
      if (data.postalcodes.length) {
        document.getElementById('place').value = data.postalcodes[0].adminName3
      }
    } else {
      // We reached our target server, but it returned an error

    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
  };

  request.send();
}
