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
                <div class="admin__cont">
                    <div class="admin__cont__row">
                        <div class="admin__cont__add">
                            <div class="admin__cont__add__сategory">
                                <div class="admin__header">Добавить новую категорию</div>
                                <div class="admin__inputs">
                                    <input type="text" class="admin__input" placeholder="Название" v-model="category__name" required>
                                    <input type="text" class="admin__input" placeholder="Ссылка на картинку" v-model="category__img" required>
                                </div>
                                <div v-on:click="add__category()" class="admin__cont__button">
                                    <div class="admin__cont__button__text">Добавить</div>
                                </div>
                            </div>
                            <div class="admin__cont__add__item">
                                <div class="admin__header">Добавить новый товар</div>
                                <div class="admin__inputs">
                                    <select class="admin__select margin__input" placeholder="Название категории" v-model="item__category">
                                        <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.title }}</option>
                                    </select>
                                    <input type="text" class="admin__input margin__input" placeholder="Название товара" v-model="item__title" required>
                                    <input type="text" class="admin__input margin__input" placeholder="Ссылка на картинку" v-model="item__img" required>
                                    <input type="text" class="admin__input margin__input" placeholder="Цена товара (в рублях)" v-model="item__price" required>
                                    <input type="text" class="admin__input margin__input" placeholder="Поле при покупке #1" v-model="item__input1" required>
                                    <input type="text" class="admin__input margin__input" placeholder="Поле при покупке #2" v-model="item__input2" required>
                                    <input type="text" class="admin__input margin__input" placeholder="Поле при покупке #3" v-model="item__input3" required>
                                    <input type="text" class="admin__input margin__input" placeholder="Поле при покупке #4" v-model="item__input4" required>
                                    <input type="text" class="admin__input big__input" placeholder="Описание товара" v-model="item__description" required>
                                </div>
                                <div v-on:click="add__item()" class="admin__cont__button">
                                    <div class="admin__cont__button__text">Добавить</div>
                                </div>
                            </div>
                        </div>
                        <div class="admin__cont__list">
                            <div class="admin__cont__list__сategory">
                                <div class="admin__cont__list__title">Список категорий</div>
                                <div class="admin__cont__list__scroll" id="admin__scroll">
                                    <div class="admin__cont__list__scroll__item" v-for="category in categories" :key="category.id">{{ category.title }}
                                        <div class="admin__cont__list__scroll__item__cross" v-on:click="del__category(category.id)"></div>
                                    </div>
                                </div>
                            </div>
                            <div class="admin__cont__list__items">
                                <div class="admin__cont__list__title">Список товаров</div>
                                <div class="admin__cont__list__scroll scroll__items">
                                    <div class="admin__cont__list__scroll__item" v-for="item in items" :key="item.id">{{ item.title }}
                                        <div class="admin__cont__list__scroll__item__cross" v-on:click="del__item(item.id)"></div>
                                    </div>
                                </div>
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
                <div v-on:click="scrollTo()" class="button__layout">
                    <div class="button__layout__text">Наверх</div>
                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import { instance } from '../../utils/axios';

(function(){
var x = document.getElementById('content');
var scroll = 48;
var win = document.documentElement.scrollHeight;
window.addEventListener('scroll', function(){
    x.scrollTop = scroll / win * (document.documentElement.scrollTop);
});

})();

export default {
    name: 'vAdminPage',
    components: {
    },
    data() {
        return {
            categories: [],
            items: [],
            category__name: '',
            category__img: '',
            item__category: '',
            item__title: '',
            item__img: '',
            item__price: '',
            item__input1: '',
            item__input2: '',
            item__input3: '',
            item__input4: '',
            item__description: ''
        }
    },
    methods: {
        async add__category() {
            await instance.post('category',
            { title: this.category__name, img: this.category__img },
            { headers: { 'Authorization': `${localStorage.getItem('userKey')}` }}
            )
        },
        async get__categories() {
            const {data} = await instance.get('category')
            this.categories = data
        },
        async get__items() {
            const {data} = await instance.get('product')
            this.items = data
        },
        async add__item() {
            let price__number = Number(this.item__price)
        
            await instance.post('product',
            {
                title: this.item__title,
                categoryId: this.item__category,
                img: this.item__img,
                price: price__number,
                description: this.item__description,
                inputs: [
                    this.item__input1,
                    this.item__input2,
                    this.item__input3,
                    this.item__input4
                ].filter(item => item !== "")
            },
            { headers: { 'Authorization': `${localStorage.getItem('userKey')}` }})
        },
        async del__category(productId) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${localStorage.getItem('userKey')}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": productId
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://donutgame.ru/category", requestOptions)
            var search = this.categories.findIndex(item => item.id === productId)
            this.categories.splice(search, 1)
        },
        async del__item(id) {
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `${localStorage.getItem('userKey')}`);
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({
                "id": productId
            });

            var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            fetch("http://donutgame.ru/product", requestOptions)
            var search = this.items.findIndex(item => item.id === productId)
            this.items.splice(search, 1)
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
        this.get__categories(),
        this.get__items()
    }
}
</script>

<style>
.admin__cont {
    margin: 90px 0px 64px 0px;
}
.admin__cont__row {
    margin: 0px 0px 90px 0px;
    display: flex;
    flex-direction: row;
}
.admin__cont__add {
    margin: 0px 25px 0px 0px;
}
.admin__cont__add__сategory {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(24, 25, 29, 1);
    margin: 0px 0px 35px 0px;
    padding: 25px 40px;
    border-radius: 40px;
    width: 950px;
    height: 289px;
}
.admin__header {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 27.036px;
    line-height: 33px;
    color: white;
}
.admin__inputs {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
}
.admin__input {
    position: relative;
    width: 416px;
    height: 68px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20.6112px;
    line-height: 25px;
    color: rgba(71, 74, 82, 1);
    border: 1.41607px solid rgba(71, 74, 82, 1);
    border-radius: 12px;
    background-color: rgba(24, 25, 29, 1);
    padding: 30px 0px 30px 30px;
    box-shadow: none;
    outline: none;
    appearance: none;
}
.admin__select {
    position: relative;
    width: 416px;
    height: 68px;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20.6112px;
    line-height: 25px;
    color: rgba(71, 74, 82, 1);
    border: 1.41607px solid rgba(71, 74, 82, 1);
    background-color: rgba(24, 25, 29, 1);
    padding: 0px 0px 0px 30px;
    border-radius: 12px;
    background: url(../../assets/arrow.svg) right 25px top 30px no-repeat;
    box-shadow: none;
    outline: none;
    appearance: none;
}
.margin__input {
    margin: 0px 0px 30px 0px;
}
.big__input {
    width: 100%;
}
.admin__cont__button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 177px;
    height: 54px;
    cursor: pointer;
    background: radial-gradient(87.24% 880.95% at 97.2% -21.67%, #D0593E 0%, #B63F78 100%);
    border-radius: 10px;
}
.admin__cont__button__text {
    position: relative;
    color: rgba(255, 255, 255, 1);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 19.0772px;
    line-height: 23px;
}
.admin__cont__add__item {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(24, 25, 29, 1);
    padding: 25px 40px;
    border-radius: 40px;
    width: 950px;
    height: 686px;
}
.admin__cont__list {
    display: flex;
    flex-direction: column;
}
.admin__cont__list__сategory {
    padding: 25px;
    width: 426px;
    height: 289px;
    border-radius: 39px;
    background-color: rgba(24, 25, 29, 1);
    margin: 0px 0px 35px 0px;
}
.admin__cont__list__title {
    margin: 0px 0px 20px 0px;
    position: relative;
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 27.036px;
    line-height: 33px;
    color: white;
}
.admin__cont__list__scroll {
    position: relative;
    width: 352px;
    height: 152px;
    overflow-y: scroll;
}
.scroll__items {
    width: 352px;
    height: 235px;
}
.admin__cont__list__scroll {
    scrollbar-width: 8px;
    scrollbar-color: rgba(42, 44, 50, 1);
}
.admin__cont__list__scroll::-webkit-scrollbar {
    width: 8px;
}
.admin__cont__list__scroll::-webkit-scrollbar-thumb {
    background-color:rgba(42, 44, 50, 1);
    border-radius: 10px;
}
.admin__cont__list__items {
    padding: 25px;
    width: 426px;
    height: 386px;
    border-radius: 39px;
    background-color: rgba(24, 25, 29, 1);
}
.admin__cont__list__scroll__item {
    position: relative;
    width: 237.73px;
    height: 90px;
    padding: 21px 0px 22px 26px;
    border-radius: 12px;
    border: 1.0848px solid rgba(71, 74, 82, 1);
    font-family: 'Inter';
    font-style: normal;
    font-weight: 500;
    font-size: 20.6112px;
    line-height: 25px;
    color: rgba(71, 74, 82, 1);
    margin: 0px 0px 15px 0px;
}
.admin__cont__list__scroll__item__cross {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    margin: 10px 10px 0px 0px;
    width: 10px;
    height: 10px;
    --weight: 1px;
    --aa: 1px;
    --color: rgba(71, 74, 82, 1);
    border-radius: 1px;
    background:
    linear-gradient(45deg, transparent calc(50% - var(--weight) - var(--aa)), var(--color) calc(50% - var(--weight)), var(--color) calc(50% + var(--weight)), transparent calc(50% + var(--weight) + var(--aa))),
    linear-gradient(-45deg, transparent calc(50% - var(--weight) - var(--aa)), var(--color) calc(50% - var(--weight)), var(--color) calc(50% + var(--weight)), transparent calc(50% + var(--weight) + var(--aa)));
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
    /* ====admin==== */
    .admin__cont {
        margin: 25px 0px 80px 0px;
    }
    .admin__cont__title {
        font-size: 14.2514px;
        line-height: 17px;
        margin: 0px 0px 10px 0px;
    }
    .admin__cont__title span {
        font-size: 12.3483px;
        line-height: 15px;
    }
    .admin__cont__add__сategory {
        width: 300px;
        height: 222px;
        padding: 15px 25px;
        border-radius: 22px;
    }
    .admin__header {
        font-size: 15.5674px;
        line-height: 19px;
    }
    .admin__input {
        width: 267px;
        height: 39px;
        padding: 12px 0px 12px 15px;
        border-radius: 7px;
        font-size: 11.868px;
        line-height: 14px;
    }
    .admin__select {
        width: 267px;
        height: 39px;
        padding: 12px 0px 12px 15px;
        border-radius: 7px;
        font-size: 11.868px;
        background: url(../../assets/arrow.svg) right 15px top 15px no-repeat;
        line-height: 14px;
    }
    .margin__input {
        margin: 0px 0px 15px 0px;
    }
    .admin__input:not(:last-child) {
        margin: 0px 0px 15px 0px;
    }
    .admin__cont__button {
        width: 102px;
        height: 31px;
        border-radius: 6px;
    }
    .admin__cont__button__text {
        font-size: 10.6465px;
        line-height: 13px;
    }
    .admin__cont__add__item {
        width: 300px;
        height: 633px;
        padding: 15px 25px;
        border-radius: 22px;
    }
    .admin__cont__row {
        flex-wrap: wrap;
    }
    .admin__cont__list__сategory {
        width: 300px;
        height: 167px;
        border-radius: 22px;
        margin: 25px 0px 0px 0px;
        padding: 20px;
    }
    .admin__cont__list__title {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 600;
        font-size: 15.5674px;
        line-height: 19px;
    }
    .admin__cont__list__scroll {
        width: 275px;
        height: 90px;
    }
    .scroll__items {
        width: 275px;
        height: 135px;
    }
    .admin__cont__list__items {
        margin: 25px 0px 0px 0px;
        width: 300px;
        height: 222px;
        border-radius: 22px;
        padding: 20px;
    }
    .admin__cont__list__scroll__item {
        padding: 12px 0px 12px 15px;
        border-radius: 8px;
        width: 135px;
        height: 55px;
        margin: 0px 0px 9px 0px;
        font-family: 'Inter';
        font-style: normal;
        font-weight: 500;
        font-size: 11.868px;
        line-height: 14px;
    }
}

</style>
