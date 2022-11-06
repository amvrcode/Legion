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
                <div class="help__recommended__cont">
                    <div class="help">
                        <div class="help__item">
                            <div class="help__item__text">Помощь</div>
                            <div class="help__item__cont">
                                <div class="help__item__cont__text">Мы всегда можем вам помочь в случае ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки</div>
                                <a href="http://t.me/Donutgame_help" class="paid__button absolute">
                                    <div class="paid__button__text">Помощь</div>
                                </a>
                            </div>
                        </div>
                        <div class="help__item">
                            <div class="help__item__text">Гарантии</div>
                            <div class="help__item__cont">
                                <div class="help__item__cont__text">Мы всегда можем вам помочь в случае ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки </div>
                            </div>
                        </div>
                        <div class="help__item">
                            <div class="help__item__text">Правила сервиса</div>
                            <div class="help__item__cont">
                                <div class="help__item__cont__text">Мы всегда можем вам помочь в случае ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки ошибки </div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="recommended">
                        <div class="recommended__text">Нас рекомендуют:</div>
                        <div class="recommended__cont">
                            <div class="recommended__item">
                                <img src="../../assets/player.png" alt="Образцовый Игрок" class="recommended__item__img">
                                <div class="recommended__item__info">
                                    <div class="recommended__item__info__title">Образцовый Игрок</div>
                                    <div class="recommended__item__info__text">59,8 тыс. подписчиков</div>
                                </div>
                            </div>
                            <div class="recommended__item">
                                <img src="../../assets/player.png" alt="Образцовый Игрок" class="recommended__item__img">
                                <div class="recommended__item__info">
                                    <div class="recommended__item__info__title">Образцовый Игрок</div>
                                    <div class="recommended__item__info__text">59,8 тыс. подписчиков</div>
                                </div>
                            </div>
                            <div class="recommended__item">
                                <img src="../../assets/player.png" alt="Образцовый Игрок" class="recommended__item__img">
                                <div class="recommended__item__info">
                                    <div class="recommended__item__info__title">Образцовый Игрок</div>
                                    <div class="recommended__item__info__text">59,8 тыс. подписчиков</div>
                                </div>
                            </div>
                            <div class="recommended__item">
                                <img src="../../assets/player.png" alt="Образцовый Игрок" class="recommended__item__img">
                                <div class="recommended__item__info">
                                    <div class="recommended__item__info__title">Образцовый Игрок</div>
                                    <div class="recommended__item__info__text">59,8 тыс. подписчиков</div>
                                </div>
                            </div>
                        </div>
                    </div> -->
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
export default {
    name: 'vHelpPage',
    components: {
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
.absolute {
    position: absolute;
    display: inline-flex;
    margin: 0px 20px -30px 0px;
    bottom: 0;
    right: 0;
}
.help__recommended__cont {
    margin: 70px 0px 0px 0px
}
.help {
    position: relative;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.help__item {
    display: flex;
    flex-direction: column;
    margin: 0px 86px 30px 0px;
}
.help__item__text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 25.3395px;
    line-height: 31px;
    color: white;
    margin: 0px 0px 20px 0px;
}
.help__item__cont {
    position: relative;
    background-color: rgba(24, 25, 29, 1);
    border-radius: 10px;
    padding: 40px;
    width: 517px;
    min-height: 410px;
}
.help__item__cont__text {
    word-break: break-all;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 25.3395px;
    line-height: 31px;
    color: white;
}
.recommended {
    display: flex;
    flex-direction: column;
    max-width: 1100px;
}
.recommended__text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 25.3395px;
    line-height: 31px;
    color: white;
    margin: 0px 0px 25px 0px;
}
.recommended__cont {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
.recommended__item {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin: 0px 25px 25px 0px;
    background-color: rgba(24, 25, 29, 1);
    border-radius: 10px;
    padding: 30px;
    width: 493px;
    height: 174px;
}
.recommended__item__img {
    position: relative;
}
.recommended__item__info {
    margin: 0px 0px 0px 30px;
}
.recommended__item__info__title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 25.3395px;
    margin: 0px 0px 10px 0px;
    line-height: 31px;
    color: white;
}
.recommended__item__info__text {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 16.6567px;
    line-height: 20px;
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
    /* ====help==== */
    .help__recommended__cont {
        margin: 35px 0px 0px 0px;
    }
    .help__item {
        margin: 0px 0px 35px 0px;
    }
    .help__item__text {
        font-size: 20px;
        line-height: 24px;
        margin: 0px 0px 15px 0px;
    }
    .help__item__cont {
        padding: 20px;
        width: 300px;
        min-height: 382px;
    }
    .help__item__cont__text {
        font-size: 20px;
        line-height: 24px;
    }
    .recommended {
        max-width: none;
    }
    .recommended__text {
        font-size: 19px;
        line-height: 23px;
    }
    .recommended__item {
        border-radius: 7px;
        padding: 16px 18px;
        margin: 0px 0px 15px 0px;
        width: 318px;
        height: 112px;
    }
    .recommended__item__img {
        width: 77px;
        height: 77px;
    }
    .recommended__item__info {
        margin: 0px 0px 0px 15px;
    }
    .recommended__item__info__title {
        white-space: nowrap;
        font-size: 18px;
        line-height: 22px;
    }
    .recommended__item__info__text {
        font-size: 13px;
        line-height: 16px;
    }
}
</style>