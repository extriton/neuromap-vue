<template>
<form action="#" @submit.prevent="onSubmit">
    <!-- Subject -->
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
    <!-- Time -->
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
    <!-- Members -->
    <div class="form-group">
        <div class="row">
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <label>Участники</label>
                <div class="user-list-box">
                    <div
                        class="user-list-box__item"
                        v-for="(member, index) in members"
                        :key="'m' + index"
                        @click="removeMember(index)"
                    >
                        {{ member.firstName }} {{ member.lastName }}
                    </div>
                </div>
            </div>
            <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <label>Пользователи</label>
                <div class="user-list-box">
                    <div
                        class="user-list-box__item"
                        v-for="(user, index) in USERS"
                        :key="'u' + index"
                        @click="addMember(index)"
                    >
                        {{ user.firstName }} {{ user.lastName }}
                    </div>
                </div>
            </div>
        </div>
        <p v-show="errorText" class="members-error-message">Пользователи заняты в указанное время: {{ errorText }}</p>
    </div>
    <!-- Facilitator -->
    <div class="form-group">
        <label for="meetingFacilitator">Фасилитатор</label>
        <select
            id="meetingFacilitator"
            class="form-control"
            v-model="facilitator"
            required
        >
            <option
                v-for="(member, index) in filteredForFacilitator"
                :key="'f' + index"
                :value="member"
            >
                {{ member.firstName }}  {{ member.lastName }}
            </option>
        </select>
    </div>
    <!-- Secretary -->
    <div class="form-group">
        <label for="meetingFacilitator">Секретарь</label>
        <select
            id="meetingSecretary"
            class="form-control"
            v-model="secretary"
            required
        >
            <option
                v-for="(member, index) in filteredForSecretary"
                :key="'s' + index"
                :value="member"
            >
                {{ member.firstName }}  {{ member.lastName }}
            </option>
        </select>
    </div>
    <button type="submit" class="btn btn-primary">Добавить</button>
</form>
</template>

<script>
import DateTimePicker from 'vue-vanilla-datetime-picker'

import { mapGetters } from 'vuex'
import utils from '@/utils/utils'

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
            endAt: new Date(),
            members: [],
            facilitator: null,
            secretary: null,
            status: 0,
            errorText: ''
        }
    },
    computed: {
        filteredForFacilitator () {
            return this.members.filter((item) => { return item.role == 0 || item.role == 1 })
        },
        filteredForSecretary () {
            return this.members.filter((item) => { return item.role == 0 || item.role == 2 })
        },
        ...mapGetters(['USERS', 'MEETINGS'])
    },
    methods: {
        onSubmit () {
            if (!this.validateForm()) return

            const meeting = {
                subject: this.subject,
                startAt: this.startAt,
                endAt: this.endAt,
                members: this.members,
                facilitator: this.facilitator,
                secretary: this.secretary,
                status: this.status
            }
            this.$store.commit('ADD_MEETING', meeting)
            this.$emit('submit')
        },
        addMember (index) {
            // Check dublicate members
            for (let i = 0; i < this.members.length; i++) {
                if (this.members[i].id === this.USERS[index].id) return
            }

            // Push new member to array
            const newMember = Object.assign({}, this.USERS[index])
            newMember.role = 0
            this.members.push(newMember)
        },
        removeMember (index) {
            // Remove facilitator if need
            if (this.facilitator && this.members[index].id === this.facilitator.id) {
                this.facilitator = null
            }
            // Remove secretary if need
            if (this.secretary && this.members[index].id === this.secretary.id) {
                this.secretary = null
            }
            // Remove member
            this.members.splice(index, 1)
        },
        initForm () {
            this.subject = ''
            this.startAt = new Date()
            this.endAt = new Date()
            this.members = []
            this.facilitator = null
            this.secretary = null
            this.errorText = ''
        },
        validateForm () {
            // Validate required fields
            if (!this.subject) return false
            if (!this.facilitator) return false
            if (!this.secretary) return false
            // Validate user busyness
            if (!this.validateMemberFree()) return false
            
            // Reverse startAt and endAt if need
            if (this.startAt.getTime() > this.endAt.getTime()) {
                const tmpTime = new Date(this.startAt)
                this.startAt = new Date(this.endAt)
                this.endAt = new Date(tmpTime)
            }
            
            // Define status
            this.status = utils.getMeetingStatus(this.startAt, this.endAt)
      
            return true
        },
        validateMemberFree () {
            const tmpArr = []
            this.errorText = ''
            for (let i = 0; i < this.members.length; i++) {
                for (let j = 0; j < this.MEETINGS.length; j++) {
                    for (let k = 0; k < this.MEETINGS[j].members.length; k++) {
                        if (this.members[i].id == this.MEETINGS[j].members[k].id &&
                            ((this.startAt.getTime() >= this.MEETINGS[j].startAt.getTime() &&
                            this.startAt.getTime() <= this.MEETINGS[j].endAt.getTime()) ||
                            (this.endAt.getTime() >= this.MEETINGS[j].startAt.getTime() &&
                            this.endAt.getTime() <= this.MEETINGS[j].endAt.getTime()))) {
                                const isFind = tmpArr.find((elem) => { return elem.id == this.members[i].id ? true : false })
                                if (isFind === undefined) {
                                    tmpArr.push(this.members[i])
                                }
                                break
                        }
                    }
                }
            }
            
            for (let i = 0; i < tmpArr.length; i++) {
                this.errorText += `${tmpArr[i].firstName} ${tmpArr[i].lastName},`    
            }
            if (this.errorText) {
                this.errorText = this.errorText.slice(0, -1)
            }

            return tmpArr.length > 0 ? false : true
        }
    },
    watch : {
        show (val) {
            if (val === true) {
                this.initForm()
            }
        },
        facilitator (val, oldVal) {
            if (oldVal) {
                for (let i = 0; i < this.members.length; i++) {
                    if (this.members[i].id === oldVal.id) {
                        this.members[i].role = 0
                        break
                    }
                }
            }
            if (val) {
                for (let i = 0; i < this.members.length; i++) {
                    if (this.members[i].id === val.id) {
                        this.members[i].role = 1
                        break
                    }
                }
            }

        },
        secretary (val, oldVal) {
            if (oldVal) {
                for (let i = 0; i < this.members.length; i++) {
                    if (this.members[i].id === oldVal.id) {
                        this.members[i].role = 0
                        break
                    }
                }
            }
            if (val) {
                for (let i = 0; i < this.members.length; i++) {
                    if (this.members[i].id === val.id) {
                        this.members[i].role = 2
                        break
                    }
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import "node_modules/vue-vanilla-datetime-picker/dist/DateTimePicker";

.user-list-box {
    height: 200px;
    max-height: 200px;
    overflow-y: scroll;
    border: 1px solid #aaa;
    border-radius: 3px;
    &__item {
        padding: 5px 10px;
        text-align: left;
        &:hover {
            cursor: pointer;
            background-color: #aaa;
        }
    }
}

.members-error-message {
    color: red;
}
</style>
