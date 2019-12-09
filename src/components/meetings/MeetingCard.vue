<template>
    <li class="list-group-item meeting-card">
        <p>Тема: <b>{{ meeting.subject }}</b></p>
        <p>Время: <b>{{ meeting.startAt | formatDate }} &mdash; {{ meeting.endAt | formatDate }}</b></p>
        <p>Статус: 
            <span
                class="meeting-card__status--wait"
                v-show="meeting.status == 0"
            >
                Запланирована
            </span>
            <span
                class="meeting-card__status--run"
                v-show="meeting.status == 1"
            >
                Проходит
            </span>
            <span
                class="meeting-card__status--completed"
                v-show="meeting.status == 2"
            >
                Завершена
            </span>
        </p>
        <p>
            Участники:<br />
            <span
                class="meeting-card__member"
                v-for="member in sortedMembers"
                :key="member.id"
            >
                {{ member.firstName }} {{ member.lastName }}
                <i v-show="member.role == 1">(фасилитатор)</i>
                <i v-show="member.role == 2">(секретарь)</i>
            </span>
        </p>
    </li>
</template>

<script>
import moment from 'moment'

export default {
    name: 'MeetingCard',
    props: {
        meeting: {
            type: Object,
            reuired: true
        }
    },
    computed: {
        sortedMembers () {
            return this.meeting.members.slice().sort(sortByRole)
        }
    },
    filters: {
        formatDate (value) {
            if (value) {
                return moment(String(value)).format('DD.MM.YYYY HH:mm')
            }
        }
    }
}

const sortByRole = function (d1, d2) { return (d1.role < d2.role) ? 1 : -1; }
</script>

<style lang="scss">
.meeting-card {
    & > p {
        margin-bottom: 5px;
    }
    &__status {
        font-style: italic;
        &--wait {
            color: yellow;
        }
        &--run {
            color: green;
        }
        &--completed {
            color: red;
        }
    }
    &__member {
        display: inline-block;
        background-color: #555;
        border-radius: 5px;
        padding: 5px 10px;
        margin-right: 10px;
        margin-bottom: 5px;
        color: #fff;
    }
}
</style>
