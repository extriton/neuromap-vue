<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3">
        <AddButton
          text="Добавить пользователя"
          @click="showPopup"
        />
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
    <ModalBox
      :show="showModal"
      caption="Добавление пользователя"
      @cancel="hidePopup"
    >
      <UserAddForm :show="showModal" @submit="hidePopup" />
    </ModalBox>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton.vue'
import ModalBox from '@/components/shared/ModalBox.vue'
import UsersList from '@/components/users/UsersList.vue'
import UserCard from '@/components/users/UserCard.vue'
import UserAddForm from '@/components/users/UserAddForm.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'UsersPage',
  components: {
    AddButton,
    ModalBox,
    UsersList,
    UserCard,
    UserAddForm
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
    }
  }
}
</script>

<style lang="scss">
.users-list-wrap {
  height: 70vh;
  overflow-y: auto;
}
</style>
