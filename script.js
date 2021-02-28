'use script'

const API_URL = 'https://mock-api-builder.vercel.app/api/schema/get';
const btnCart = document.querySelector('.cart-button');
const btnCloseCartPopup = document.querySelector('.cart-popup__close');
const cartPopupWrap = document.querySelector('.cartPopup-wrap');

class Cart {
    constructor() {
        this.products = [];
    }

    // addOneGoodsItem(goodsItem) {
    //     const cartSumPositions = document.querySelector('.cart-sumPositions');
    //     this.products.push(goodsItem);
    //     cartSumPositions.textContent = this.products.length;
    // }

    // removeOneGoodsItem(goodsItem) {
    //     this.products.find((item, index) => {
    //         if (item.productName == goodsItem.productName) {
    //             this.products.splice(index, 1);
    //             return true;
    //         }
    //         return false;
    //     });
    // }

    // totalPrice() {
    //     return this.products.reduce((sum, item)=> {
    //         return sum + item.price;
    //     },0);
    // }
}

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        filteredGoods: [],
        searchLine: '',
        cart: {},
        isVisibleCart: false,
    },  

    methods: {
        itemFilter(event) {
            this.filteredGoods = this.goods.filter((item)=> {
                if(item.productName.toUpperCase().includes(this.searchLine.toUpperCase())) {
                    return item;
                }
            })

        },
        clickItem(good) {
            this.cart.products.push(good);
        },

        showPopup() {
            this.isVisibleCart = true;
            
        },

        removeOneGoodsItem(goodsItem) {
            this.cart.products.find((item, index) => {
                if (item.productName == goodsItem.productName) {
                    this.cart.products.splice(index, 1);
                    return true;
                }
                return false;
            });
        },
        totalPrice() {
            return this.cart.products.reduce((sum, item)=> {
                let reg = /^\d*.\d{1,3}/;
                return sum + Number(item.price.match(reg));
            },0);
        }
    },


    mounted() {
        this.cart = new Cart();
        fetch(`${API_URL}/602c166a89c4a60009ef7046`)
            .then(response => {
                return response.json();
            })
            .then(json => {
                this.goods = json;
                this.filteredGoods = this.goods;
            })
            .catch(error => {
                alert('Error');
            })
    }
});

class GoodsItem {
    constructor(id, title, price) {
        this.id_product = id;
        this.product_name = title;
        this.price = price;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
        this.filteredGoods = [];
    }
    
    summPrice() {
        return this.goods.reduce((sum, item)=> {
            return sum + item.price;
        },0);
    }

    render() {
        let list = document.querySelector('.goods-list');
        this.filteredGoods.forEach(elem => {
            list.appendChild(createCard(new GoodsItem(elem.id_product, elem.product_name, elem.price)));
        });
    }

    filterGoods(value) {
        const regexp = new RegExp(value, 'i');
        this.filteredGoods = this.goods.filter(good => regexp.test(good.product_name));
        this.render();
    }
}

class MenuPopup {
    showPopup() {
        this.renderPopup();
        cartPopupWrap.style.display = 'block';
    }

    closePopup(event) {
        cartPopupWrap.style.display = 'none';
    }

    createCartPopup(item) {
        let cartPopupWrapGoods = document.createElement('div');
        cartPopupWrapGoods.classList.add('cart-popup__wrapGoods');
        let cartPopupGoods = document.createElement('h2');
        cartPopupGoods.textContent = "Some goods";
        cartPopupGoods.classList.add('cart-popup__goods');
        let cartPopupGoodsTitle = document.createElement('p');
        cartPopupGoodsTitle.classList.add('cart-popup__goodsTitle');
        cartPopupGoodsTitle.textContent = item.product_name;
        let cartPopupGoodsPrice = document.createElement('p');
        cartPopupGoodsPrice.classList.add('cart-popup__goodsPrice');
        cartPopupGoodsPrice.textContent = item.price;
        let cartDeletBtn = document.createElement('div');
        cartDeletBtn.textContent = 'delete';

        cartPopupWrapGoods.appendChild(cartPopupGoods);
        cartPopupWrapGoods.appendChild(cartPopupGoodsTitle);
        cartPopupWrapGoods.appendChild(cartPopupGoodsPrice);
        cartPopupWrapGoods.appendChild(cartDeletBtn);

        cartDeletBtn.addEventListener('click', event => {
            cartPopupWrapGoods.remove();
            let index = cart.products.indexOf(item);
            if (index !== -1) {
                let cartTotalPrice = document.querySelector('.cart-popup__resultSum');
                cart.products.splice(index, 1);
                cartTotalPrice.textContent =  cart.totalPrice();
            }
        });
        return cartPopupWrapGoods
    }

    renderPopup() {
        let cartPopup = document.querySelector('.cart-popup');
        let cartTotalPrice = document.querySelector('.cart-popup__resultSum');

        cartPopup.querySelectorAll('.cart-popup__wrapGoods').forEach(item => {
            item.remove();
        });
        cartTotalPrice.textContent =  cart.totalPrice();

        cart.products.forEach(item => {
            let card = this.createCartPopup(item);
            cartPopup.appendChild(card);
        });
    }
}

function createCard(item) {                       
        let rand = Math.floor(Math.random() * 100) + 1;
        // let goodsItem = document.createElement('div');
        // goodsItem.classList.add('goods-item');
        // goodsItem.innerHTML = `<img class="goods-item__img" src="https://picsum.photos/seed/${rand}/200" alt="product"><h3>${item.product_name}</h3><p>${item.price}</p>`;
        goodsItem.entity = item;
        return goodsItem;
}

const menuPopup = new MenuPopup();
// const list = new GoodsList();

btnCart.addEventListener('click', menuPopup.showPopup.bind(menuPopup));
btnCloseCartPopup.addEventListener('click', menuPopup.closePopup);
