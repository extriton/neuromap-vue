<template>
<div class="user-add-modal"
    v-show="show"
    @click="onClose"
>
    <div class="modal-dialog" @click.stop>
        <div class="modal-content">
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Добавить пользователя</h4>
                <button type="button" class="close" @click="onClose">&times;</button>
            </div>
            <!-- Modal body -->
            <div class="modal-body">
                <form 
                    action="#"
                    @submit.prevent="onAdd"
                >
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
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'UserAddPopup',
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
            this.$emit('add', { name: this.name, surname: this.surname })
        },
        onClose () {
            this.$emit('cancel')
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

<style lang="scss">
.modal-dialog {
    &:hover {
        cursor: default;
    }
}
</style>
