<template>
<form action="#" @submit.prevent="onAdd">
    <div class="form-group">
        <label for="userName">Имя</label>
        <input type="text"
            class="form-control"
            id="userName"
            v-model="name"
            placeholder="Введите имя"
            required
        />
    </div>
    <div class="form-group">
        <label for="userSurname">Фамилия</label>
        <input type="text"
            class="form-control"
            id="userSurname"
            v-model="surname"
            placeholder="Введите фамилию"
            required
        />
    </div>
    <button type="submit" class="btn btn-primary">Добавить</button>
</form>
</template>

<script>
export default {
    name: 'MeetingAddForm',
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            name: '',
            surname: ''
        }
    },
    methods: {
        onAdd () {
            if (this.name === '' || this.surname === '') {
                return
            }

            const meeting = {
                name: this.name,
                surname: this.surname
            }
            this.$store.commit('ADD_MEETING', meeting)
            this.$emit('submit')
        },
        clearFields () {
            this.name = ''
            this.surname = ''
        }
    },
    watch : {
        show (val) {
            if (val === true) {
                this.clearFields()
            }
        }
    }
}
</script>