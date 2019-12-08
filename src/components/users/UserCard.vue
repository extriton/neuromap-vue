<template>
    <li class="list-group-item">
        {{ user.name }} {{ user.surname }}
    </li>
</template>

<script>
export default {
    name: 'UserCard',
    props: {
        user: {
            type: Object,
            reuired: true
        }
    }
}
</script>
