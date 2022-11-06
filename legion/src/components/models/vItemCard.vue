<template>
    <div class="itemcard" v-for="item in filteredItems" :key="item.id">
        <div class="itemcard__price">
            <div class="itemcard__price__text">{{ item.price }}₽</div>
        </div>
        <div class="itemcard__img">
            <img :src="item.img" alt="pubg">
        </div>
        <div class="itemcard__title">{{ item.title }}</div>
        <router-link :to="`/item/` + item.id" v-on:click="sendItemId(item.id)" class="itemcard__button">Заказать</router-link>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'vItemCard',
    data() {
        return {
            items: [],
            filter__items: []
        }
    },
    methods: {
        async getItems() {
            const {data} = await axios.get('product')
            this.items = data
        },
        sendItemId(id) {
            this.$route.params.itemId = id
        }
    },
    computed: {
        filteredItems() {
            if (this.$store.state.categoryId != 'popular') {
                return this.items.filter(item => item.category.id === this.$store.state.categoryId)
            } else if (this.$store.state.categoryId == 'popular') {
                return this.items.sort((a, b) => b.rate - a.rate)
            }
        }
    },
    mounted() {
        this.getItems()
    }
}
</script>

<style>
.itemcard {
    position: relative;
    width: 413px;
    height: 332px;
    display: flex;
    padding: 45px;
    border-radius: 40px;
    margin: 0px 88px 106px 0px;
    background-color: rgba(24, 25, 29, 1);
    flex-direction: column;
    align-items: center;
}
.itemcard__price {
    position: absolute;
    margin-top: -18px;
    margin-right: -25px;
    right: 0;
    top: 0;
    width: 137px;
    height: 57px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(43, 45, 51, 1);
    border-radius: 15px;
}
.itemcard__price__text {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 23.4491px;
    line-height: 28px;
    color: white;
}
.itemcard__img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 190px;
    max-height: 190px;
}
.itemcard__title {
    position: absolute;
    bottom: 62px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 23.0504px;
    line-height: 28px;
    color: white;
}
.itemcard__button {
    position: absolute;
    bottom: 0;
    margin-bottom: -28px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 19.0772px;
    line-height: 23px;
    color: white;
    padding: 16px 70px;
    background: radial-gradient(87.24% 880.95% at 97.2% -21.67%, #D0593E 0%, #B63F78 100%);
    border-radius: 10.5985px;
}
/* ====REQUEST==== */
/* pc */
@media (max-width: 1537px) {
    [class*="__container"] {
        max-width: 970px;
    }
}
/* tablet */
@media (max-width: 991.98px) {
    [class*="__container"] {
        max-width: 750px;
    }
}
/* phone */
@media (max-width: 767.98px) {
    [class*="__container"] {
        max-width: 590px;
    }
}
/* small phone */
@media (max-width: 479.98px) {
    [class*="__container"] {
        max-width: 330px;
    }
    .itemcard {
        width: 240px;
        height: 193px;
        border-radius: 22px;
        margin: 0px 0px 40px 0px;
    }
    .itemcard__price {
        width: 80px;
        height: 33px;
        margin-top: -10px;
        margin-right: -14px;
        border-radius: 9px;
    }
    .itemcard__price__text {
        font-size: 13.5983px;
        line-height: 16px;
    }
    .itemcard__img {
        max-width: 90px;
    }
    .itemcard__title {
        font-size: 13.3671px;
        line-height: 16px;
        bottom: 37px;
    }
    .itemcard__button {
        padding: 10px 40px;
        font-size: 11.063px;
        line-height: 13px;
        margin-bottom: -15px;
    }
}
</style>