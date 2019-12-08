<template>
    <li class="list-group-item">
        {{ meeting.name }} {{ meeting.surname }}
    </li>
</template>

<script>
export default {
    name: 'MeetingCard',
    props: {
        meeting: {
            type: Object,
            reuired: true
        }
    }
}
</script>
