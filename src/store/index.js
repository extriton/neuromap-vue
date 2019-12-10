import Vue from 'vue'
import Vuex from 'vuex'
import sharedMutations from 'vuex-shared-mutations'
import utils from '@/utils/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetings: [],
    users: []
  },
  getters: {
    MEETINGS: state => {
      return state.meetings
    },
    USERS: state => {
      return state.users
    }
  },
  mutations: {
    ADD_USER: (state, payload) => {
      payload.id = state.users.length + 1
      state.users.push(payload)
      const parsed = JSON.stringify(state.users);
      localStorage.setItem('users', parsed);
    },
    LOAD_USERS: (state) => {
      const users = JSON.parse(localStorage.getItem('users')) || []
      state.users = users
    },
    ADD_MEETING: (state, payload) => {
      payload.id = state.meetings.length + 1
      state.meetings.push(payload)
      const parsed = JSON.stringify(state.meetings)
      localStorage.setItem('meetings', parsed)
    },
    LOAD_MEETINGS: (state) => {
      const meetings = JSON.parse(localStorage.getItem('meetings')) || []
      for (let i = 0; i < meetings.length; i++) {
        meetings[i].startAt = new Date(meetings[i].startAt)
        meetings[i].endAt = new Date(meetings[i].endAt)
      }
      state.meetings = meetings
    },
    UPDATE_MEETINGS_STATUS: (state) => {
      for (let i = 0; i < state.meetings.length; i++) {
        state.meetings[i].status = utils.getMeetingStatus(state.meetings[i].startAt, state.meetings[i].endAt)
      }
      const parsed = JSON.stringify(state.meetings)
      localStorage.setItem('meetings', parsed)
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [sharedMutations({ predicate: ['ADD_USER', 'ADD_MEETING'] })]
})

// Статус встреч: 0 - Запланирована, 1 - Проходит, 2 - Завершена
// Роль пользователя: 0 - Участник, 1 - фасилитатор (facilitator), 2 - Секретарь (secretary)