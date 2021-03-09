const cartPopupComponent = Vue.component('cart-popup', {
    props: ['products', 'close_function'],
   
    template: 
    `<div class="cartPopup-wrap">
        <div class="cart-popup">
            <div class="cart-popup__close" @click="close_function()">&#10060</div>
            <product v-for="productCart in products" :product="productCart" :remove_product="removeOneGoodsItem"></product>
            <div class="cart-popup__resultSum">{{ totalPrice() }}</div>
            <button class="cart-popup__btn" type="button">Купить</button>
        </div>
    </div>`,

    methods: {
        totalPrice: function() {
            return this.products.reduce((sum, item)=> {
                let reg = /^\d+\.\d{1,3}/;
                const res = sum + Number(item.price.match(reg));
                return res;
            },0).toFixed(2);
        },

        removeOneGoodsItem: function(event) {
            this.products.find((item, index) => {
                if (item.productName == event.productName) {
                    this.products.splice(index, 1);
                    return true;
                }
                return false;
            });
        }
    }
});

export default cartPopupComponent;
