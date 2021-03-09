const searchInputComponent = Vue.component('search-input', {
    props: ['origingoods', 'filtergoods'],
    data() {
        return {
            searchLine: ''
        }
    },
    template: 
    `<input class="search-input" 
    type="text" 
    @input="itemFilter($event)"
    v-model="searchLine" 
    placeholder="search">`,

    methods: {
        itemFilter: function(event) {
            this.$emit('update:filtergoods', this.origingoods.filter((item)=> {
                if(item.productName.toUpperCase().includes(this.searchLine.toUpperCase())) {
                    return item;
                }
            }))
        },
    },
});

export default searchInputComponent;
