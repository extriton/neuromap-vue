<template>
<form action="#" @submit.prevent="onAdd">
    <div class="form-group">
        <label for="subject">Тема</label>
        <input 
            type="text"
            class="form-control"
            id="meetingSubject"
            v-model="subject"
            placeholder="Введите тему встречи"
            required
        />
    </div>
    <div class="form-group">
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <label>Начало</label>
                <date-time-picker v-model="startAt"></date-time-picker>        
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <label>Завершение</label>
                <date-time-picker v-model="endAt"></date-time-picker>
            </div>
        </div>
    </div>
    <button type="submit" class="btn btn-primary">Добавить</button>
</form>
</template>

<script>
import DateTimePicker from 'vue-vanilla-datetime-picker'

export default {
    name: 'MeetingAddForm',
    components: {
        DateTimePicker
    },
    props: {
        show: {
            type: Boolean,
            required: true
        }
    },
    data () {
        return {
            subject: '',
            startAt: new Date(),
            endAt: new Date()
        }
    },
    methods: {
        onAdd () {
            if (!this.validateForm) return

            const meeting = {
                subject: this.subject,
                startAt: this.startAt,
                endAt: this.endAt
            }
            this.$store.commit('ADD_MEETING', meeting)
            this.$emit('submit')
        },
        initForm () {
            this.subject = ''
            this.startAt = new Date()
            this.endAtAt = new Date()
        },
        validateForm () {
            if (this.subject === '') return false

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

<style lang="scss">
@import "node_modules/vue-vanilla-datetime-picker/dist/DateTimePicker"
</style>
