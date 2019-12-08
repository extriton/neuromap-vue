<template>
    <button type="button" 
        class="btn btn-success user-add-button"
        data-toggle="modal"
        data-target="#user-add-popup"
        @click="onClick"
    >
        Добавить пользователя
    </button>
</template>

<script>
export default {
    name: 'UserAddButton',
    methods: {
        onClick () {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
.user-add-button {
    margin-bottom: 15px;
}
</style>
