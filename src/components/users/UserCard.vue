<template>
    <li class="list-group-item">
        {{ user.firstName }} {{ user.lastName }}
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
