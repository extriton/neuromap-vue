<template>
  <ul class="list-group meetings-list">
    <slot />
  </ul>
</template>

<script>
export default {
  name: 'MeetingsList',
}
</script>

<style lang="scss">
.meetings-list {
  width: 100%;
}
</style>
