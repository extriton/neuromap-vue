import Vue from 'vue'
import Vuex from 'vuex'
import sharedMutations from 'vuex-shared-mutations'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetings: [], // getMeetingsList(),
    users: [] //getUsersList()
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
      state.users.push(payload)
      const parsed = JSON.stringify(state.users);
      localStorage.setItem('users', parsed);
    },
    LOAD_USERS: (state) => {
      let users = JSON.parse(localStorage.getItem('users'))
      if (users === null) users = []
      state.users = users
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [sharedMutations({ predicate: ['ADD_USER'] })]
})

/*
// Заглушка
function getMeetingsList () {
  return [
    {
      subject: 'Первая встреча',
      startAt: '10-00',
      endAt: '11-00',
      status: 0,
      users: [
        {
          name: 'AAA',
          surname: 'AA',
          role: 0
        },
        {
          name: 'BBB',
          surname: 'BB',
          role: 0
        },
        {
          name: 'CCC',
          surname: 'CC',
          role: 0
        }
      ]
    },
    {
      subject: 'Вторая встреча',
      startAt: '12-00',
      endAt: '13-00',
      status: 0,
      users: [
        {
          name: 'DDD',
          surname: 'DD',
          role: 0
        },
        {
          name: 'EEE',
          surname: 'EE',
          role: 0
        },
        {
          name: 'FFF',
          surname: 'FF',
          role: 0
        }
      ]
    }
  ]
}

function getUsersList () {
  return [
    {
      name: 'LLL',
      surname: 'LL'
    },
    {
      name: 'AAA',
      surname: 'AA'
    },
    {
      name: 'BBB',
      surname: 'BB'
    },
    {
      name: 'CCC',
      surname: 'CC'
    },
    {
      name: 'DDD',
      surname: 'DD'
    },
    {
      name: 'EEE',
      surname: 'EE'
    },
    {
      name: 'FFF',
      surname: 'FF'
    }
  ]
}

*/
// Статус встреч: 0 - Запланирована, 1 - Проходит, 2 - Завершена
// Роль пользователя: 0 - Участник, 1 - фасилитатор (facilitator), 2 - Секретарь (secretary)