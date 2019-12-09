<template>
    <li class="list-group-item meeting-card">
        <p>Тема: <b>{{ meeting.subject }}</b></p>
        <p>Время: <b>{{ meeting.startAt | formatDate }} &mdash; {{ meeting.endAt | formatDate }}</b></p>
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
    filters: {
        formatDate (value) {
            if (value) {
                return moment(String(value)).format('DD.MM.YYYY HH:mm')
            }
        }
    }
}
</script>

<style lang="scss">
.meeting-card {
    & > p {
        margin-bottom: 5px;
    }
}
</style>
