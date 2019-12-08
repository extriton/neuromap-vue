<template>
  <ul class="list-group users-list">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'UsersList',
}
</script>

<style lang="scss">
.users-list {
  width: 100%;
}
</style>
