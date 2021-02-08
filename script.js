'use script'

const goods = [
    { title: 'Shirt', price: 150 },
    { title: 'Socks', price: 50 },
    { title: 'Jacket', price: 350 },
    { title: 'Shoes', price: 250 },
];

const renderGoodsItem = (title = Product, price = 0) => {
    let rand = Math.floor(Math.random() * 100) + 1;
    return `<div class="goods-item"><img class="goods-item__img" src="https://picsum.photos/seed/${rand}/200" alt="product"><h3>${title}</h3><p>${price}</p></div>`;
};

const renderGoodsList = (list) => {
    // let goodsList = list.map(item => renderGoodsItem(item.title, item.price));
    // document.querySelector('.goods-list').innerHTML = goodsList;
    list.map(item => renderGoodsItem(item.title, item.price))
    .map(item => document.querySelector('.goods-list').innerHTML += item);
}

renderGoodsList(goods);