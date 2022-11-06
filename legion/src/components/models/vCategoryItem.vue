<template>
    <div class="categoryitem" v-on:click="sendCategoryId(category.id)" v-for="category in categories" :key="category">
        <div class="categoryitem__img">
            <img :src="category.img" alt="категория">
        </div>
        <div class="categoryitem__title">{{ category.title }}</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'vCategoryItem',
    data() {
        return {
            categories: []
        }
    },
    methods: {
        async getCategories() {
            const {data} = await axios.get('category')
            this.categories = [
                {
                    id: 'popular',
                    title: 'Популярное',
                    img: 'https://i.ibb.co/r5bQBt6/image-18.png'
                },
                ...data
            ]
        },
        sendCategoryId(id) {
            this.$store.commit('getCategoryId', id)
        }
    },
    mounted() {
        this.getCategories()
    }
}
</script>

<style>
.categoryitem {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0px 40px 30px 0px;
    cursor: pointer;
}
.categoryitem__img {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 121px;
    height: 121px;
    border-radius: 39px;
    background-color: rgba(24, 25, 29, 1);
    margin: 0px 0px 20px 0px;
}
.categoryitem__img img {
    width: 85px;
    height: 85px;
}
.categoryitem__title {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 23.2967px;
    line-height: 28px;
    color: white;
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
    .categoryitem {
        margin: 0px 23px 20px 0px;
    }
    .categoryitem__img {
        width: 57px;
        height: 57px;
        border-radius: 18px;
        margin: 0px 0px 8px 0px;
    }
    .categoryitem__img img {
        width: 45px;
        height: 45px;
    }
    .categoryitem__title {
        font-size: 11.008px;
        line-height: 13px;
    }
}
</style>