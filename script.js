'use script'

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const btnCart = document.querySelector('.cart-button');
const btnCloseCartPopup = document.querySelector('.cart-popup__close');
const cartPopupWrap = document.querySelector('.cartPopup-wrap');

function makeGETRequest (url, callback) {
    var xhr;
    if (window.XMLHttpRequest) { 
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            callback(xhr.responseText); 
        }
    }
    xhr.open('GET', url, true);
    xhr.send(); 
}

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
    }
    
    fetchGoods() {
        return fetch(`${API_URL}/catalogData.json`)
        .then(response => {
            return response.json();
        })
        .then(json => {
            list.goods = json;
            // list.render();
            
        })
        // .then(() => {
        //     let product = document.querySelectorAll('.goods-item'); 
        //     product.forEach(elem => {
        //     elem.addEventListener('click', clickItem)
        //     });
        // })
        .catch(error => {
            alert('Error');
        })

        // this.goods = [                              
        //     { title: 'Shirt', price: 150 },
        //     { title: 'Socks', price: 50 },
        //     { title: 'Jacket', price: 350 },
        //     { title: 'Shoes', price: 250 },
        // ];
    }

    summPrice() {
        return this.goods.reduce((sum, item)=> {
            return sum + item.price;
        },0);
    }

    render() {
        let list = document.querySelector('.goods-list');
        this.goods.forEach(elem => {
            list.appendChild(createCard(new GoodsItem(elem.id_product, elem.product_name, elem.price)));
        });
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

class Cart {
    constructor() {
        this.products = [];
    }

    addOneGoodsItem(goodsItem) {
        const cartSumPositions = document.querySelector('.cart-sumPositions');
        this.products.push(goodsItem);
        cartSumPositions.textContent = this.products.length;
    }

    removeOneGoodsItem(goodsItem) {
        this.products.find((item, index) => {
            if (item.product_name == goodsItem.product_name) {
                this.products.splice(index, 1);
                return true;
            }
            return false;
        });
    }

    totalPrice() {
        return this.products.reduce((sum, item)=> {
            return sum + item.price;
        },0);
    }
}

function createCard(item) {                       
        let rand = Math.floor(Math.random() * 100) + 1;
        let goodsItem = document.createElement('div');
        goodsItem.classList.add('goods-item');
        goodsItem.innerHTML = `<img class="goods-item__img" src="https://picsum.photos/seed/${rand}/200" alt="product"><h3>${item.product_name}</h3><p>${item.price}</p>`;
        goodsItem.entity = item;
        return goodsItem;
}

function clickItem(event) {
    cart.addOneGoodsItem(event.currentTarget.entity); 
}

const cart = new Cart();
const menuPopup = new MenuPopup();
const list = new GoodsList();

list.fetchGoods()
.then(() => {
    list.render();
})
.then(() => {
    let product = document.querySelectorAll('.goods-item'); 
    product.forEach(elem => {
    elem.addEventListener('click', clickItem)
    });
})

btnCart.addEventListener('click', menuPopup.showPopup.bind(menuPopup));
btnCloseCartPopup.addEventListener('click', menuPopup.closePopup);
