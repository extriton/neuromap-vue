<template>
  <div class="container">
    <div class="row">
      <div class="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-10 offset-lg-1">
        <AddButton
          text="Добавить встречу"
          @click="showPopup"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-xs-10 offset-xs-1 col-sm-10 offset-sm-1 col-md-10 offset-md-1 col-lg-10 offset-lg-1 meetings-list-wrap">
        <MeetingsList>
          <MeetingCard
            v-for="(meeting, index) in MEETINGS"
            :key="'m' + index"
            :meeting="meeting"
          />
        </MeetingsList>
      </div>
    </div>
    <ModalBox
      :show="showModal"
      caption="Добавление встречи"
      @cancel="hidePopup"
    >
      <MeetingAddForm :show="showModal" @submit="hidePopup" />
    </ModalBox>
  </div>
</template>

<script>
import AddButton from '@/components/shared/AddButton.vue'
import ModalBox from '@/components/shared/ModalBox.vue'
import MeetingsList from '@/components/meetings/MeetingsList.vue'
import MeetingCard from '@/components/meetings/MeetingCard.vue'
import MeetingAddForm from '@/components/meetings/MeetingAddForm.vue'

import { mapGetters } from 'vuex'

export default {
  name: 'MeetingsPage',
  components: {
    AddButton,
    ModalBox,
    MeetingsList,
    MeetingCard,
    MeetingAddForm
  },
  data () {
    return {
      showModal: false,
      intervalId: null
    }
  },
  computed: {
    ...mapGetters(['MEETINGS'])
  },
  methods: {
    showPopup () {
      this.showModal = true
    },
    hidePopup () {
      this.showModal = false
    }
  },
  mounted () {
    this.$store.commit('UPDATE_MEETINGS_STATUS')
    this.intervalId = setInterval(() => {
      this.$store.commit('UPDATE_MEETINGS_STATUS')
    }, 60 * 1000)
  },
  beforeDestroy () {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId)
      this.intervalId = null
    }
  }
}
</script>

<style lang="scss">
.meetings-list-wrap {
  height: 70vh;
  overflow-y: auto;
}
</style>
