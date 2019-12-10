<template>
    <div id="nav">
      <router-link to="/">Встречи</router-link> |
      <router-link to="/users">Пользователи</router-link>
    </div>
</template>

<script>
export default {
  name: 'TheNavbar',
}
</script>

<style lang="scss">
#nav {
  padding: 30px;
  text-align: center;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
