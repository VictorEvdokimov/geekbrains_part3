const productComponent = Vue.component('product', {
    props: ['product', 'remove_product'],
    template: 
    `<div class="cart-popup__wrapGoods" >
        <h2 class="cart-popup__goods">Goods</h2>
        <p class="cart-popup__goodsTitle">{{ product.productName }}</p>
        <p class="cart-popup__goodsPrice">{{ product.price }}</p>
        <button class="cart-popup__btnDelete" @click="remove_product(product)">Удалить</button>
    </div>`,
});

export default productComponent;
