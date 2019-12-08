<template>
    <button
        type="button" 
        class="btn btn-success add-button"
        @click="onClick"
    >
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'AddButton',
    props: {
        text: {
            type: String,
            required: true
        }
    },
    methods: {
        onClick () {
            this.$emit('click')
        }
    }
}
</script>

<style lang="scss">
.add-button {
    margin-bottom: 15px;
}
</style>
