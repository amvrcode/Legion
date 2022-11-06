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
                <div class="catalog">
                    <div class="catalog__categories">
                        <vCategoryItem></vCategoryItem>
                    </div>
                    <div class="catalog__items">
                        <vItemCard></vItemCard>
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
import vItemCard from '../models/vItemCard.vue'
import vCategoryItem from '../models/vCategoryItem.vue'

export default {
    name: 'vCatalogPage',
    components: {
        vItemCard,
        vCategoryItem
    },
    data() {
        return {

        }
    },
    methods: {
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
    }
}
</script>

<style>
.catalog {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 72px 0px 0px 0px;
}
.catalog__categories {
    width: 1190px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin: 0px 0px 100px 0px;
    flex-wrap: wrap;
}
.catalog__items {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
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
    .catalog {
        margin: 30px 0px 0px 0px;
    }
    .catalog__categories {
        justify-content: center;
        margin: 0px 0px 30px 0px;
    }
    .catalog__items {
        justify-content: center;
    }
}
</style>