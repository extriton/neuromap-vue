<template>
<form action="#" @submit.prevent="onSubmit">
    <div class="form-group">
        <label for="firstName">Имя</label>
        <input
            type="text"
            class="form-control"
            id="firstName"
            v-model="firstName"
            placeholder="Введите имя"
            required
        />
    </div>
    <div class="form-group">
        <label for="lastName">Фамилия</label>
        <input
            type="text"
            class="form-control"
            id="lastName"
            v-model="lastName"
            placeholder="Введите фамилию"
            required
        />
    </div>
    <button type="submit" class="btn btn-primary">Добавить</button>
</form>
</template>

<script>
export default {
    name: 'UserAddForm',
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            firstName: '',
            lastName: ''
        }
    },
    methods: {
        onSubmit () {
            if (!this.validateForm) return

            const user = {
                firstName: this.firstName,
                lastName: this.lastName
            }
            this.$store.commit('ADD_USER', user)
            this.$emit('submit')
        },
        initForm () {
            this.firstName = ''
            this.lastName = ''
        },
        validateForm () {
            if (!this.firstName || !this.lastName) return false

            return true
        }
    },
    watch : {
        show (val) {
            if (val === true) {
                this.initForm()
            }
        }
    }
}
</script>
