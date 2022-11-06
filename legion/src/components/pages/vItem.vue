<template>
    <div class="wrapper">
        <header class="header">
            <div class="header__container">
                <div class="header__logo__menu">
                    <router-link to="/" class="header__logo">
                        <span>Donut</span>game
                    </router-link>
                    <div class="header__menu">
                        <ul class="header__menu__list">
                            <router-link to="/help" class="header__menu__item">Помощь</router-link>
                            <router-link to="/help" class="header__menu__item">Гарантии</router-link>
                            <router-link to="/help" class="header__menu__item hidden__item">Правила сервиса</router-link>
                        </ul>
                    </div>
                </div>
                <router-link to="/catalog" class="button__layout">
                    <div class="button__layout__text">В каталог</div>
                </router-link>
            </div>
        </header>
        <main class="main">
            <div class="main__container">
                <div class="item">
                    <div class="item__img__button phone__hidden">
                        <img :src="itemObject.img" class="item__img">
                        <div class="item__buy__button" v-on:click="createOrder(itemObject.id)">Купить</div>
                    </div>
                    <div class="item__info">
                        <div class="item__title__back">
                            <img :src="itemObject.img" class="item__img phone__over">
                            <div class="item__title">{{ itemObject.title }}</div>
                            <router-link to="/catalog" class="item__back__button phone__hidden">Назад</router-link>
                            <div class="item__hidden__button phone__over">
                                <div class="item__buy__button phone__over" v-on:click="createOrder(itemObject.id)">Купить</div>
                                <router-link to="/catalog" class="item__back__button phone__over">Назад</router-link>
                            </div>
                        </div>
                        <div class="item__info__die">
                            <div class="item__info__text">{{ itemObject.description }}</div>
                            <div class="item__info__text__title">🕗 Как проходит покупка? </div>
                            <ul class="item__info__list">
                                <li class="item__info__item">Оплата товара</li>
                                <li class="item__info__item">Потребуется ввести почту к которой привязан ваш Supersell ID</li>
                                <li class="item__info__item">Ввести контактную почту на которую будут приходить уведомления о ходе выполнения заказа</li>
                                <li class="item__info__item">Ждать выполния</li>
                            </ul>
                            <div class="item__info__text__title">Сколько будет выполняться заказ? </div>
                            <ul class="item__info__list">
                                <li class="item__info__item">Заказы выполняются в порядке очереди</li>
                                <li class="item__info__item">Мы стараемся выполнять заказы в течении часа с момента заказа</li>
                                <li class="item__info__item">Если вы ждете больше часа, то вы получите больше игровыx ресурсов, чем заказывали</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <footer class="footer">
            <div class="footer__container">
                <div class="footer__logo__menu">
                    <div class="footer__logo">
                        <span>Donut</span>game
                    </div>
                    <div class="footer__menu">
                        <ul class="footer__menu__list">
                            <router-link to="/help" class="footer__menu__item">Помощь</router-link>
                            <router-link to="/help" class="footer__menu__item hidden__item">Правила сервиса</router-link>
                            <router-link to="/help" class="footer__menu__item">Гарантии</router-link>
                        </ul>
                    </div>
                </div>
                <div v-on:click="scrollTo()" class="button__layout">
                    <div class="button__layout__text">Наверх</div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'vItem',
    data() {
        return {
            itemObject: ''
        }
    },
    methods: {
        async getItemObject() {
            let itemId = this.$route.params.itemId

            const {data} = await axios.get(`product/${itemId}`)
            this.itemObject = data
        },
        async createOrder(id) {
            let orderItemId = Number(id)
        
            const {data} = await axios.post('order/create', { itemId: orderItemId }, {headers: { 'Authorization': `${localStorage.getItem('userKey')}`}})
            window.open(data)
        },
        scrollTo(to, duration = 0) {
            const
                element = document.scrollingElement || document.documentElement,
                start = element.scrollTop,
                change = to - start,
                startDate = +new Date(),
                // t = current time
                // b = start value
                // c = change in value
                // d = duration
                easeInOutQuad = function (t, b, c, d) {
                    t /= d / 2;
                    if (t < 1) return c / 2 * t * t + b;
                    t--;
                    return -c / 2 * (t * (t - 2) - 1) + b;
                },
                animateScroll = function () {
                    const currentDate = +new Date();
                    const currentTime = currentDate - startDate;
                    element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
                    if (currentTime < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                    else {
                        element.scrollTop = to;
                    }
        }
        animateScroll();
        }
    },
    mounted() {
        this.getItemObject()
    }
}
</script>

<style>
.item {
    width: 1180px;
    display: flex;
    margin: 115px 0px 300px 0px;
    flex-direction: row;
    justify-content: space-between;
}
.item__img__button {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 450px;
    align-items: center;
}
.item__img {
    position: relative;
    width: 250px;
    height: 250px;
}
.item__buy__button {
    margin: 43px 0px 0px 0px;
    position: relative;
    width: 200px;
    height: 50px;
    cursor: pointer;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16.8119px;
    line-height: 20px;
    color: white;
    padding: 15px 69px;
    background: radial-gradient(87.24% 880.95% at 97.2% -21.67%, #D0593E 0%, #B63F78 100%);
    border-radius: 9.33994px;
}
.item__info {
    display: flex;
    flex-direction: column;
}
.item__title__back {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 0px 0px 48px 0px;
    align-items: center;
}
.item__title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 35.5375px;
    line-height: 43px;
    color: white;
}
.item__back__button {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16.8119px;
    line-height: 20px;
    color: white;
    background-color: rgba(41, 42, 46, 1);
    border-radius: 10px;
    padding: 15px 73px;
    width: 200px;
    height: 50px;
}
.item__info__die {
    display: flex;
    flex-direction: column;
    background-color: rgba(24, 25, 29, 1);
    border-radius: 17px;
    padding: 44px 45px 64px 45px;
    width: 794px;
    height: 628px;
}
.item__info__text {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 21.1501px;
    word-break: break-all;
    line-height: 26px;
    color: white;
}
.item__info__text__title {
    margin: 32px 0px 0px 0px;
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 700;
    font-size: 21.1501px;
    color: white;
}
.item__info__list {
    position: relative;
    list-style: inside !important;
}
.item__info__item {
    margin: 0px 0px 0px 10px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 21.1501px;
    color: white;
}
.phone__over {
    display: none
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
    .item {
        width: 318px;
        flex-wrap: wrap;
        flex-direction: column;
        margin: 30px 0px 100px 0px;
    }
    .item__img {
        width: 170px;
        height: 170px;
    }
    .item__hidden__button {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 75%;
    }
    .phone__hidden {
        display: none;
    }
    .phone__over {
        display: flex;
        margin: 20px 0px 20px 0px;
    }
    .item__buy__button {
        padding: 10px 31px;
        width: 100px;
        height: 35px;
        font-weight: 500;
        font-size: 11.9866px;
        line-height: 15px;
    }
    .item__title__back {
        align-items: center;
        flex-direction: column;
        margin: 0px 0px 0px 0px;
    }
    .item__back__button {
        padding: 10px 31px;
        width: 100px;
        height: 35px;
        font-weight: 500;
        font-size: 11.9866px;
        line-height: 15px;
    }
    .item__info__die {
        border-radius: 10px;
        padding: 30px;
        width: 310px;
        height: 619px;
    }
    .item__info__text {
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
    }
    .item__info__text__title {
        font-size: 14px;
        line-height: 23px;
    }
    .item__info__item {
        font-size: 14px;
        line-height: 162.02%;
    }
    .item__title {
        font-weight: 600;
        font-size: 18.9433px;
        line-height: 23px;
    }
}
</style>