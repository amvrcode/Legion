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
            <div class="paid__container">
                <div v-if="WAIT_FOR_PAY" class="paid__payments">Подождите, платеж еще не прошел.<br>Попробуйте обновить страницу</div>
                <div v-if="WAIT_FOR_INPUT" class="paid">
                    <div class="paid__title">Заказ успешно оплачен!</div>
                    <div class="paid__text paid__text__margin">Для начисления заказа нам потребуются некоторые данные о вашем аккаунте. </div>
                    <div class="paid__text paid__text__margin__2">🛡️ Мы гарнатируем их сохранность и конфиденциальность.</div>
                    <div class="paid__data">Введите данные в поля ниже:</div>
                    <div v-if="!hidden__inputs" class="paid__input__cont">
                        <input type="text" class="paid__input" :placeholder="input.title" v-for="(input, key) in inputs" :key="input.id" v-model="request__inputs[key].value" required>
                    </div>
                    <div v-if="hidden__inputs" class="paid__input__cont">
                        <input type="text" class="paid__input" placeholder="E-mail" v-model="order__email" required>
                    </div>
                    <div class="paid__button" v-on:click="hiddenInputs()" v-if="!hidden__inputs">
                        <div class="paid__button__text">Далее</div>
                    </div>
                    <div class="paid__button" v-on:click="setInputs()" v-if="hidden__inputs">
                        <div class="paid__button__text">Далее</div>
                    </div>
                    <div v-if="sended__email" class="paid__text paid__text__margin">Данные успешно отправлены</div>
                    <div v-if="null__inputs" class="paid__text paid__text__margin">Обновите страницу и заполните все поля!</div>
                </div>
                <div v-if="WAIT_FOR_EXTRA_INPUT" class="paid extra__cod">
                    <div class="paid__title extra__cod__title">Заказ в процессе выполнения!</div>
                    <div class="paid__data extra__cod__data">Введите код подтверждения который приешел вам на почту:</div>
                    <div class="paid__input__cont extra__margin">
                        <input type="text" class="paid__input" placeholder="Код" v-model="extra__cod" required>
                    </div>
                    <div class="paid__button" v-on:click="setExtraCod()">
                        <div class="paid__button__text">Отправить</div>
                    </div>
                    <div v-if="sended__extra" class="paid__text paid__text__margin">Код успешно отправлены</div>
                </div>
                <div v-if="IN_EXECUTION" class="paid extra__cod">
                    <div class="paid__title extra__cod__title">Заказ в процессе выполнения!</div>
                    <div class="paid__data extra__cod__data">Вы далеко не единственный покупатель, поэтому иногда приходится ждать. Просим относиться с пониманием.</div>
                    <div class="paid__data extra__cod__data">Если вы ждете больше двух часов, то напишите в техническую поддержку: </div>
                    <a href="http://t.me/Donutgame_help" class="paid__button"> 
                        <div class="paid__button__text">Поддержка</div>
                    </a>
                </div>
                <div v-if="DONE" class="paid done">
                    <img src="../../assets/icons8-проверено-240.png" class="img">
                    <div class="paid__title extra__cod__title">Заказ успешно выполнен!</div>
                    <div class="paid__data extra__cod__data">Товар уже на вашем аккаунте, или поступит в ближайшее время.</div>
                </div>
                <div v-if="MONEYBACK" class="paid done">
                    <div class="paid__title extra__cod__title">Возвращение денежных стредств</div>
                    <div class="paid__data extra__cod__data">Вскоре денежные средства поступят на ваш баланс</div>
                    <div class="paid__data extra__cod__data">Вывести баланс вы можете, написав в техническую поддержку</div>
                    <a href="http://t.me/Donutgame_help" class="paid__button"> 
                        <div class="paid__button__text">Поддержка</div>
                    </a>
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
import { instance } from '../../utils/axios';

export default {
    name: 'vPaidOrder',
    components: {
    },
    data() {
        return {
            inputs: [],
            hidden__inputs: false,
            sended__email: false,
            sended__extra: false,
            null__inputs: false,
            // инпуты
            order__email: '',
            request__inputs: [],
            // статусы
            WAIT_FOR_PAY: false,
            WAIT_FOR_INPUT: false,
            IN_EXECUTION: false,
            WAIT_FOR_EXTRA_INPUT: false,
            DONE: false,
            MONEYBACK: false
        }
    },
    methods: {
        async getOrder() {
            const {data} = await instance.get(`order/${this.$route.params.orderId}`)
            this.inputs = data.product.inputs

            this.request__inputs = this.inputs.map(item => {
                return {title:item.title, value: ""}
            })

            if (data.status == 'WAIT_FOR_PAY') {
                this.WAIT_FOR_PAY = true
            }
            if (data.status == 'WAIT_FOR_INPUT') {
                this.WAIT_FOR_INPUT = true
            }
            if (data.status == 'IN_EXECUTION') {
                this.IN_EXECUTION = true
            }
            if (data.status == 'WAIT_FOR_EXTRA_INPUT') {
                this.WAIT_FOR_EXTRA_INPUT = true
            }
            if (data.status == 'DONE') {
                this.DONE = true
            }
            if (data.status == 'MONEYBACK') {
                this.MONEYBACK = true
            }
        },
        hiddenInputs() {
            this.hidden__inputs = true
        },
        async setInputs() {
            if (this.request__inputs.filter(item => item.value == '').length) {
                this.null__inputs = true
            } else {
                await instance.post('order/setInputs', {
                email: this.order__email,
                path: this.$route.params.orderId,
                inputs: this.request__inputs
                })
                this.sended__email = true
                window.location.reload()
            }
        },
        async setExtraCod() {
            await instance.post('order/setExtraInput', {
                extra: this.extra__cod,
                path: this.$route.params.orderId
            }).then(()=> {
                this.sended__extra = true
            })
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
        this.getOrder()
    }
}
</script>

<style>
.img {
    width: 150px;
    height: 150px;
    margin: 0px 0px 40px 0px;
}
.paid__container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.paid {
    margin: 97px 0px 300px 0px;
    position: relative;
    width: 890px;
    min-height: 744px;
    padding: 30px 0px 30px 0px;
    display: flex;
    background-color: rgba(24, 25, 29, 1);
    border-radius: 36px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.paid__title {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 41.6749px;
    line-height: 50px;
    color: white;
    max-width: 650px;
    margin: 0px 0px 30px 0px;
}
.paid__payments {
    position: relative;
    text-align: center;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 41.6749px;
    line-height: 50px;
    color: white;
    max-width: 650px;
    margin: 0px 0px 30px 0px;
}
.paid__text {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 21.241px;
    line-height: 26px;
    max-width: 650px;
    text-align: center;
    color: rgba(138, 141, 149, 1);
    margin: 0px 0px 40px 0px;
}
.paid__text__margin {
    margin: 30px 0px 0px 0px;
}
.paid__data {
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 21.241px;
    line-height: 26px;
    color: white;
    margin: 0px 0px 40px 0px;
}
.paid__input__cont {
    position: relative;
    max-width: 543px;
}
.paid__input {
    position: relative;
    margin: 0px 0px 25px 0px;
    width: 543px;
    height: 90px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 26.9053px;
    line-height: 33px;
    color: rgba(71, 74, 82, 1);
    border: 1.41607px solid rgba(71, 74, 82, 1);
    border-radius: 15px;
    background-color: rgba(24, 25, 29, 1);
    padding: 30px 0px 30px 30px;
    box-shadow: none;
    outline: none;
    appearance: none;
}
.last__input {
    margin: 0px 0px 40px 0px !important;
}
.paid__button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 208px;
    height: 64px;
    cursor: pointer;
    background: radial-gradient(87.24% 880.95% at 97.2% -21.67%, #D0593E 0%, #B63F78 100%);
    border-radius: 10.5985px;
}
.paid__button__text {
    position: relative;
    color: rgba(255, 255, 255, 1);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 21.7741px;
    line-height: 26px;
    line-height: 23px;
}
.extra__cod {
    height: 597px;
}
.extra__cod__title {
    text-align: center;
    max-width: 500px;
}
.extra__cod__data {
    text-align: center;
    max-width: 373px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 26px;
    line-height: 31px;
}
.extra__margin {
    margin: 0px 0px 70px 0px;
}
.done {
    height: 300px;
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
    /* ====paid==== */
    .extra__cod__data {
        max-width: 250px;
    }
    .paid__text__margin {
        margin: 0;
    }
    .paid {
        margin: 15px 0px 250px 0px;
        width: 330px;
        min-height: 550px;
        border-radius: 15px;
    }
    .paid__title {
        max-width: 230px;
        font-size: 22px;
        line-height: 27px;
        text-align: center;
        margin: 40px 0px 30px 0px;
    }
    .paid__text {
        font-size: 13px;
        line-height: 17px;
    }
    .paid__text__margin {
        margin: 0px 0px 30px 0px;
    }
    .paid__text__margin__2 {
        margin: 0px 0px 20px 0px;
    }
    .paid__data {
        margin: 0px 0px 30px 0px;
        font-size: 13px;
        line-height: 17px;
    }
    .paid__input {
        width: 274px;
        height: 45px;
        padding: 14px 0px 14px 16px;
        font-size: 13px;
        line-height: 16px;
        border-radius: 8px;
        margin: 0px 0px 18px 13px;
    }
    .paid__button {
        width: 130px;
        height: 40px;
        border-radius: 7px;
        margin: 0px 0px 30px 0px;
    }
    .paid__button__text {
        font-size: 13px;
        line-height: 16px;
    }
}
</style>
