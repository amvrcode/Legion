<template>
    <div class="set__key__container">
        <div class="set__key">
            <div class="set__key__title">Введите сюда ключ:</div>
            <input type="text" class="paid__input not__margin" v-model="key__input" placeholder="Ключ" required>
            <div v-on:click="setKey()" class="paid__button">
                <div class="paid__button__text">Отправить</div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'vSetKey',
    data() {
        return {
            key__input: ''
        }
    },
    methods: {
        setKey() {
            console.log(this.key__input)
            localStorage.setItem('userKey', this.key__input)
        }
    }
}
</script>

<style>
.set__key__container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}
.set__key {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.set__key__title {
    font-family: 'Inter';
    font-style: normal;
    font-weight: 600;
    font-size: 25.7576px;
    line-height: 31px;
    margin: 0px 0px 20px 0px;
    color: white;
}
.not__margin {
    margin: 0px 0px 25px 0px;
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
}
</style>