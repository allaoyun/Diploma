import { createStore } from "vuex";

const removerAcentos = (string) => {
  const mapaAcentosHex = {
    a: /[\xE0-\xE6]/g,
    e: /[\xE8-\xEB]/g,
    i: /[\xEC-\xEF]/g,
    o: /[\xF2-\xF6]/g,
    u: /[\xF9-\xFC]/g,
    c: /\xE7/g,
  };
  for (let letra in mapaAcentosHex) {
    var expressaoRegular = mapaAcentosHex[letra];
    string = string.replace(expressaoRegular, letra);
  }
  return string;
};

export default createStore({
  state: {
    women: [
      {
        title: "Цифровая камера ",
        src: require("@/assets/img/women/1.jpeg"),
        price: 1849.99,
        description:
          "Kizizoom VTech",
        type: "",
        color: "",
        brand: "",
        gender: "women",
        id: 1,
      },

      {
        title: "Швейная машинка Винкс",
        src: require("@/assets/img/women/2.jpeg"),
        price: 1379.99,
        description:
          "",
        type: "",
        color: "",
        brand: "",
        gender: "women",
        id: 2,
      },
      {
        title: "Детский набор творчество",
        src: require("@/assets/img/women/3.jpeg"),
        price: 859.99,
        description:
          "",
        type: "",
        color: "",
        brand: "",
        gender: "women",
        id: 3,
      },
      {
        title: "Кукла Barbie набор",
        src: require("@/assets/img/women/4.jpeg"),
        price: 1319.99,
        description:
          "",
        type: "",
        color: "",
        brand: "",
        gender: "women",
        id: 4,
      },
      {
        title: "Музыкальный телефон",
        src: require("@/assets/img/women/5.jpeg"),
        price: 2899.99,
        description:
          "",
        type: "",
        color: "",
        brand: "",
        gender: "women",
        id: 5,
      },
    ],
    men: [
      {
        title: "Гремелки для игрушек",
        src: require("@/assets/img/men/1.jpeg"),
        price: 979.99,
        description:
          "Гремелки для игрушек, диаметр 24 мм. Цена за штуку.",
        type: "Top",
        color: "Black",
        brand: "Alexander McQueen",
        gender: "men",
        id: 6,
      },
      {
        title: "Шахматы",
        src: require("@/assets/img/men/2.jpeg"),
        price: 779.99,
        description:
          "Отлично подойдут для развития головномго мозга ребенка",
        type: "",
        color: "",
        brand: "",
        gender: "men",
        id: 7,
      },
      {
        title: "Многоуровневая парковка",
        src: require("@/assets/img/men/3.jpeg"),
        price: 779.99,
        description:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic impedit eveniet alias sint nam cum ad animi eius praesentium ea, nemo ab nihil assumenda maxime rem aliquam facere vitae quos.",
        type: "Top",
        color: "Brown",
        brand: "Burberry",
        gender: "men",
        id: 8,
      },
      {
        title: "Водяной пистолет",
        src: require("@/assets/img/men/4.jpeg"),
        price: 3779.99,
        description:
          "Веселое развлечение для детворы жарким летом в компании любимых мультперсонажей.",
        type: "",
        color: "",
        brand: "",
        gender: "men",
        id: 9,
      },
      {
        title: "Модель вертолёта Ambulance",
        src: require("@/assets/img/men/5.jpeg"),
        price: 3779.99,
        description:
          "Масштабная модель вертолета скорой помощи изготовлена из прочного алюминия с элементами пластика. Лопасти винта могут вращаться, что добавляет и транспортному средству, и игре большей реалистичности.",
        type: "",
        color: "",
        brand: "",
        gender: "men",
        id: 10,
      },
    ],
    cart: [],
    product: {},
    searchWord: null,
    filteredProducts: null,
    tax: 5,
    shipping: 15,
  },
  getters: {
    allProducts: (state) => state.women.concat(state.men),
    getWomen: (state) => state.women,
    getMen: (state) => state.men,

    getCart: (state) => state.cart,
    cartItemCount: (state) => state.cart.length,

    getSearchWord: (state) => state.searchWord,

    getFilteredProduct: (state) => state.filteredProducts,

    getProductByIdWomen: (state) => (id) =>
      state.women.find((women) => women.id === parseInt(id)),

    getProductByIdMen: (state) => (id) =>
      state.men.find((men) => men.id === parseInt(id)),

    cartTotalPrice: (state) => {
      let total = 0;
      state.cart.forEach((item) => {
        total += item.quantityPrice;
      });
      return total.toFixed(2);
    },

    getTax: (state) => state.tax,
    getShipping: (state) => state.shipping,

    cartCheckoutPrice: (state) => {
      let total = 0;

      state.cart.forEach((item) => {
        total = item.quantityPrice + state.shipping;
        total = total + (total * state.tax) / 100;
      });
      return total.toFixed(2);
    },
  },
  mutations: {
    ADD_TO_CART: (state, { product, quantity, size, quantityPrice }) => {
      let productInCart = state.cart.find((item) => {
        return item.product.id === product.id;
      });
      if (productInCart) {
        productInCart.quantity += quantity;
        productInCart.quantityPrice += productInCart.product.price;
        productInCart.quantityPrice =
          Math.round(productInCart.quantityPrice * 100) / 100;
        return;
      }
      state.cart.push({ product, quantity, size, quantityPrice });
    },

    REMOVE_FROM_CART: (state, product) => {
      state.cart = state.cart.filter((item) => {
        return item.product.id !== product.id;
      });
    },

    GET_PRODUCT_DETAILS: (state, product) => {
      state.productDetails.push(product);
    },

    FILTERED_PRODUCTS(state, word) {
      if (!word || word === "{}") {
        state.searchWord = null;
        state.filteredProducts = null;
      } else {
        state.searchWord = word;
        word = removerAcentos(word.trim().toLowerCase());
        state.filteredProducts = state.women
          .concat(state.men)
          .filter((product) => {
            return (
              product.title.toLowerCase().includes(word) ||
              product.brand.toLowerCase().includes(word) ||
              product.color.toLowerCase().includes(word) ||
              product.type.toLowerCase().includes(word)
            );
          });
      }
    },

    ORDER_SUCCESSFUL(state) {
      state.cart = [];
    },
  },
  actions: {
    addProductToCart: (
      { commit },
      { product, quantity, size, quantityPrice }
    ) => {
      commit("ADD_TO_CART", { product, quantity, size, quantityPrice });
    },
    removeProductFromCart: ({ commit }, product) => {
      commit("REMOVE_FROM_CART", product);
    },
    filterProducts({ commit }, word) {
      commit("FILTERED_PRODUCTS", word);
    },
    orderSuccess({ commit }) {
      commit("ORDER_SUCCESSFUL");
    },
  },
  modules: {},
});
