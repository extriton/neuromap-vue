<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <UserAddButton @click="showPopup"/>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 users-list-wrap">
        <UsersList>
          <UserCard v-for="(user, index) in USERS"
            :key="'u' + index"
            :user="user"
          />
        </UsersList>
      </div>
    </div>
    <UserAddPopup
      :show="showModal"
      @add="addUser"
      @cancel="hidePopup"
    />
  </div>
</template>

<script>
import UserAddButton from '@/components/UserAddButton.vue'
import UserAddPopup from '@/components/UserAddPopup.vue'
import UsersList from '@/components/UsersList.vue'
import UserCard from '@/components/UserCard.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'UsersPage',
  components: {
    UserAddButton,
    UserAddPopup,
    UsersList,
    UserCard
  },
  data () {
    return {
      showModal: false,
    }
  },
  computed: {
    ...mapGetters(['USERS'])
  },
  methods: {
    showPopup () {
      this.showModal = true
    },
    hidePopup () {
      this.showModal = false
    },
    addUser (data) {
      this.showModal = false
      this.$store.commit('ADD_USER', data)
    }
  }
}
</script>

<style lang="scss">
.users-list-wrap {
  height: 70vh;
  overflow-y: auto;
}
.user-add-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  &:hover {
    cursor: pointer;
  }
}
</style>
