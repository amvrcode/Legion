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
                <div class="main__sale">
                    <div class="main__sale__info">
                        <div class="main__sale__header">Внутриигровое имущество по скидке</div>
                        <div class="main__sale__text">Через нас можно приобрести внутриигровое имущество у разработчиков по низкой цене</div>
                        <router-link to="/catalog" class="main__sale__button">В каталог</router-link>
                    </div>
                    <div class="main__sale__img">
                        <img src="../../assets/man.png">
                    </div>
                </div>
                <div class="main__benefit">
                    <div class="main__benefit__info">
                        <div class="main__benefit__header">Наши преимущества</div>
                        <div class="main__benefit__text">Наш сервис существует около года, за это время наши операторы начислили дешевые ресурсы несколько тысяч раз. Нам можно доверять!</div>
                    </div>
                    <div class="main__benefit__items">
                        <div class="main__benefit__item">
                            <div class="main__benefit__item__header">Легально</div>
                            <div class="main__benefit__item__text">Наш магазин полностью <span>законен</span> и <span>не подвергает</span> ваш аккаунт риску бана</div>
                            <div class="main__benefit__item__img">
                                <img src="../../assets/zamok.png">
                            </div>
                        </div>
                        <div class="main__benefit__item">
                            <div class="main__benefit__item__header">На слуху</div>
                            <div class="main__benefit__item__text">Сотни постоянных <span>клиентов</span> уже закупаются у нас</div>
                            <div class="main__benefit__item__img">
                                <img src="../../assets/grom.png">
                            </div>
                        </div>
                        <div class="main__benefit__item">
                            <div class="main__benefit__item__header">Дёшево</div>
                            <div class="main__benefit__item__text">Ниже чем в <br/><span>официальном</span> магазине</div>
                            <div class="main__benefit__item__img">
                                <img src="../../assets/kow.png">
                            </div>
                            <div class="main__benefit__item__payments">
                                <img src="../../assets/visa.svg" class="main__benefit__item__payment">
                                <img src="../../assets/mastercard.svg" class="main__benefit__item__payment">
                                <img src="../../assets/qiwi.svg" class="main__benefit__item__payment">
                                <div class="main__benefit__item__payment__text">+ 3 способа</div>
                            </div>
                        </div>
                        <div class="main__benefit__item">
                            <div class="main__benefit__item__header">Быстрое начисление</div>
                            <div class="main__benefit__item__text">Вы получите <span>больше</span>, чем заказывали, если ждете больше <span>двух часов</span></div>
                            <div class="main__benefit__item__img raketa__width raketa">
                                <img src="../../assets/raketa.png">
                            </div>
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
                <div v-on:click="scrollTo()" class="footer__button__layout">
                    <div class="footer__button__layout__text">Наверх</div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import { instance } from '../../utils/axios';

export default {
    name: 'vMainPage',
    data() {
        return {
            
        }
    },
    methods: {
        async userIndificate() {
            const user__key = localStorage.getItem('userKey')
            if (!user__key) {
                const {data} = await instance.post('/user')
                localStorage.setItem('userKey', data.key)
            }
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
        this.userIndificate()
    }
}
</script>

<style>
body {
    background-color: #101112;
    background-image: url(../../assets/backgorund.png);
    background-repeat: repeat;
    background-size: cover;
    font-family: 'Montserrat', sans-serif;


    margin: 0;
}
body,
html {
    height: 100%;
}
* {
    box-sizing: border-box;
}
h1,h2,h3,h4,h5,h6 {
    margin: 0;
}
::before,
::after {
    padding: 0;
    margin: 0;
    border: 0;
}
.wrapper {
    overflow: hidden;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    margin: 0 auto;
}
img {
    vertical-align: top;
}
a {
    text-decoration: none;
}
[class*="__container"] {
    max-width: 1537px;
    margin: 0px auto;
    padding: 0px 15px;
}
/* ====HEADER==== */
.header{
    position: relative;
    background-color: rgba(19, 20, 23, 1);
    z-index: 100;
    width: 100%;
    left: 0;
    top: 0;
}
.header__container {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    min-height: 108px;
}
.header__logo__menu {
    position: relative;
    display: flex;
    width: 851px;
    align-items: center;
    justify-content: space-between;
}
.header__logo {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 37.2444px;
    line-height: 45px;
    color: white;
}
.header__logo span {
    color: rgba(233, 66, 66, 1);
}
.header__menu {
    position: relative;
}
.header__menu__list {
    display: flex;
    flex-direction: row;
    list-style-type: none;
}
.header__menu__item {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 23.5452px;
    line-height: 28px;
    cursor: pointer;
    color: rgba(184, 190, 207, 1);
}
.header__menu__item:not(:last-child) {
    margin: 0px 72px 0px 0px;
}
.button__layout {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 183px;
    height: 56px;
    cursor: pointer;
    background: radial-gradient(87.24% 880.95% at 97.2% -21.67%, #D0593E 0%, #B63F78 100%);
    border-radius: 10.5985px;
}
.button__layout__text {
    position: relative;
    color: rgba(255, 255, 255, 1);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 19.0772px;
    line-height: 23px;
}
/* =====MAIN===== */
.main {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
}
.main__sale {
    position: relative;
    display: flex;
    margin: 160px 0px 0px 0px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}
.main__sale__info {
    position: relative;
    max-width: 808px;
    display: flex;
    flex-direction: column;
}
.main__sale__header {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 71px;
    color: white;
    margin: 0px 0px 35px 0px;
}
.main__sale__text {
    position: relative;
    max-width: 450px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 29.9762px;
    line-height: 36px;
    margin: 0px 0px 49px 0px;
    color: rgba(138, 141, 149, 1);
}
.main__sale__button {
    position: relative;
    z-index: 100;
    max-width: 259px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 27px;
    line-height: 33px;
    padding: 24px 65px;
    color: rgba(255, 255, 255, 1);
    cursor: pointer;
    background: radial-gradient(87.24% 880.95% at 97.2% -21.67%, #D0593E 0%, #B63F78 100%);
    border-radius: 10.5985px;
}
.main__sale__img {
    position: absolute;
    display: inline-block;
    z-index: -100;
    right: 0;
}
.main__benefit {
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    margin: 200px 0px 0px 0px;
}
.main__benefit__info {
    position: relative;
    display: flex;
    flex-direction: column;
    max-width: 528px;
}
.main__benefit__header {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 46.9134px;
    line-height: 57px;
    margin: 0px 0px 25px 0px;
    color: rgba(255, 255, 255, 1);
}
.main__benefit__text {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 27.4305px;
    line-height: 33px;
    color: rgba(138, 141, 149, 1);
}
.main__benefit__items {
    position: relative;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    flex-wrap: wrap;
}
.main__benefit__item {
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: rgba(24, 25, 29, 1);
    margin: 0px 0px 50px 0px;
    border-radius: 14px;
    padding: 30px 40px;
    width: 422px;
    height: 212px;
}
.main__benefit__item:not(:nth-child(2n)) {
    margin: 0px 56px 50px 0px;
}
.main__benefit__item__header {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 25.7576px;
    line-height: 31px;
    margin: 0px 0px 22px 0px;
    color: rgba(255, 255, 255, 1);
}
.main__benefit__item__text {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 21.4136px;
    line-height: 26px;
    max-width: 280px;
    color: rgba(255, 255, 255, 1);
}
.main__benefit__item__text span {
    color: rgba(240, 86, 86, 1);
}
.main__benefit__item__img {
    position: absolute;
    margin-top: -50px;
    margin-right: -50px;
    right: 0;
    top: 0;
}
.raketa {
    margin-right: -120px;
}
.main__benefit__item__payments {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.main__benefit__item__payment {
    margin: 0px 20px 0px 0px;
}
.main__benefit__item__payment__text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16.2224px;
    line-height: 20px;
    color: white;
}
/* ====FOOTER==== */
.footer {
    position: relative;
    background-color: rgba(19, 20, 23, 1);
    z-index: 100;
    width: 100%;
    left: 0;
    top: 0;
}
.footer__container {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    min-height: 170px;
}
.footer__logo__menu {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    width: 438px;
}
.footer__logo {
    max-width: 110px;
    position: relative;
    word-wrap: break-word;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 37.2444px;
    line-height: 37px;
    color: rgba(255, 255, 255, 1);
}
.footer__logo span {
    color: rgba(233, 66, 66, 1);
}
.footer__menu {
    position: relative;
}
.footer__button__layout {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 183px;
    height: 56px;
    cursor: pointer;
    background: radial-gradient(87.24% 880.95% at 97.2% -21.67%, #D0593E 0%, #B63F78 100%);
    border-radius: 10.5985px;
}
.footer__button__layout__text {
    position: relative;
    color: rgba(255, 255, 255, 1);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 19.0772px;
    line-height: 23px;
}
.footer__menu__list {
    display: flex;
    flex-direction: column;
    list-style-type: none;
}
.footer__menu__item {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 23.5452px;
    line-height: 28px;
    cursor: pointer;
    color: rgba(184, 190, 207, 1);
}
.footer__menu__item:not(:last-child) {
    margin: 0px 0px 14px 0px;
}
/* ====REQUEST==== */
/* pc */
@media (max-width: 1537px) {
    [class*="__container"] {
        max-width: 970px;
    }
    .header__logo__menu {
        width: 730px;
    }
    .header__menu__item:not(:last-child) {
        margin: 0px 40px 0px 0px;
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
    /* ====main==== */
    .header__container {
        min-height: 60px;
    }
    .header__logo {
        font-size: 15px;
    }
    .header__logo__menu {
        width: 200px;
    }
    .hidden__item {
        display: none;
    }
    .header__menu__item {
        font-size: 9px;
        margin: 0px !important;
    }
    .header__menu__item:nth-child(1) {
        margin: 0px 21px 0px 0px !important;
    }
    .button__layout {
        width: 74px;
        height: 23px;
        border-radius: 4px;
    }
    .button__layout__text {
        font-size: 8px;
        line-height: 9px;
    }
    .main__sale {
        margin: 35px 0px 0px 0px;
    }
    .main__sale__header {
        font-size: 23px;
        margin: 0px 0px 25px 0px;
    }
    .main__sale__text {
        font-size: 14px;
        line-height: 17px;
        margin: 0px 0px 32px 0px;
    }
    .main__sale__button {
        max-width: 125px;
        font-size: 13px;
        line-height: 16px;
        padding: 11px 31px;
    }
    .main__sale__img {
        width: 350px;
        top: 190px;
        right: -55px;
    }
    .main__benefit {
        margin: 290px 0px 0px 0px;
    }
    .main__benefit__items {
        flex-direction: column;
        align-items: flex-start;
    }
    .main__benefit__info {
        margin: 0px 0px 35px 0px;
    }
    .main__benefit__header {
        font-size: 23px;
        line-height: 28px;
    }
    .main__benefit__text {
        font-size: 13px;
        line-height: 17px;
        max-width: 260px;
    }
    .main__benefit {
        flex-wrap: wrap;
    }
    .main__benefit__item {
        width: 271px;
        height: 136px;
        padding: 17px 24px;
        margin: 0px 0px 25px 0px;
    }
    .main__benefit__item:not(:nth-child(2n)) {
        margin: 0px 0px 25px 0px;
    }   
    .main__benefit__item__header {
        font-size: 16px;
        line-height: 20px;
        margin: 0px 0px 13px 0px;
    }
    .main__benefit__item__text {
        max-width: 170px;
        font-size: 13px;
        line-height: 17px;
    }
    .main__benefit__item__img {
        width: 80px;
        height: 80px;
        margin-top: -15px;
        margin-right: -15px;
    }
    .raketa__width {
        width: 110px;
        height: 110px;
        margin-top: -25px;
        margin-right: -40px;
    }
    .main__benefit__item__payment {
        width: 50px;
        margin: 0px 10px 0px 0px;
    }
    .main__benefit__item__payment__text {
        font-size: 10px;
        line-height: 13px;
    }
    .footer__container {
        min-height: 87px;
    }
    .footer__logo__menu {
        width: 136px;
    }
    .footer__logo {
        max-width: 50px;
        font-size: 17px;
        line-height: 17px;
    }
    .footer__menu__item {
        font-size: 11px;
        line-height: 13px;
    }
    .footer__menu__item:not(:last-child) {
        margin: 0px 0px 7px 0px;
    }
    .footer__button__layout {
        width: 94px;
        height: 30px;
        border-radius: 5.44703px;
    }
    .footer__button__layout__text {
        font-size: 10px;
        line-height: 12px;
    }
}
</style>
