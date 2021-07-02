import { createStore } from 'vuex'

export default createStore({
  state: {
    currentUser: '',
    defaultSetting: {
      proxyServices: {
        Smartproxy: {
          login: 'DEFAULT',
          pass: 'DEFAULT',
          savingMode: true,
        },
        ProxyCheap: {
          login: 'DEFAULT',
          pass: 'DEFAULT',
          ipv4: 'proxy.proxy-cheap.com',
          port: '10000'
        }
      }
    },
    drops: [{
      id: 7749291930,
      title: 'Ivanov Ivan',
      info: {
        phone: '+7900895859',
        email: 'vankob49@gmail.com',
        contacts: 'Telegram: @inban&@',
        proxy: '127.0.0.1:8000',
        wallets: 'paypal',
        geo: {
          latitude: 54.731781,
          longitude: 36.413341
        }
      },
    },
      {
        id: 284938142,
        title: 'Sergeev Sergey',
        info: {
          phone: '+7965895859',
          email: 'ebanko@gmail.com',
          contacts: 'Jabber: @jaba,  \nTelegram: @inban&@ \nTelegram: @12321&@',
          proxy: '127.127.0.1:8000',
          wallets: 'qiwi',
          geo: {
            latitude: 34.731781,
            longitude: 56.413341
          }
        },
      }],
    affilates: [{
      dropId: 7749291930,
      id: 895032182,
      title: 'Moneta',
      login: 'test1@mail.ru',
      pass: 'Jjmd,,~Kl3',
      wallet: 'WebMoney: Z0974903920',
      link: 'https://dastepro.site/Jdlmm23',
      workerId: 83423543,
      jokerSetting: {country: 'de,gb,bg,ru'},
    },{
      dropId: 284938142,
      id: 895372882,
      title: 'Advidi',
      login: 'test3@mail.ru',
      pass: 'Pkmdn783',
      wallet: 'BTV: 1L8848Hkmnmfk940KKdl',
      link: 'https://dastepro.site/Jdlmm23',
      workerId: 100000000,
      jokerSetting: {country: 'us,ca,ro,kz'},
    }],
    workers: [{
      id: 100000000,
      title: 'ADMIN',
      login: 'ADMIN',
      pass: 'ADMIN',
      setting: {
        proxyServices: {
          Smartproxy: {
            login: 'Maks89tinabris',
            pass: '89tinabris',
            savingMode: true,
          },
          ProxyCheap: {
            login: 'login',
            pass: 'pass',
            ipv4: 'proxy.proxy-cheap.com',
            port: '10000'
          }
        }
      }
    },
      {
      id: 83473292343,
      title: 'Pavel',
      login: 'Pashka8874',
      pass: 'HHfiOokd123',
      setting: {
        proxyServices: {
          Smartproxy: {
            login: 'Maks89tinabris',
            pass: '89tinabris',
            savingMode: true,
          },
          ProxyCheap: {
            login: 'login',
            pass: 'pass',
            ipv4: 'proxy.proxy-cheap.com',
            port: '10000'
          }
        }
      }
    },
      {
      id: 83423543,
      title: 'Vlad ',
      login: 'bibo8874',
      pass: 'sdgfgdd2343',
      setting: {
        proxyServices: {
          Smartproxy: {
            login: 'ArtyToe',
            pass: 'Sadjaabris',
            savingMode: false,
          },
          ProxyCheap: {
            login: 'login',
            pass: 'pass',
            ipv4: 'proxy.proxy-cheap.com',
            port: '10000'
          }
        }
      }
    }],
    financeList: {
      income: [
          {
        id: 1621529581061,
        amount: 234,
        description: 'Выплата',
        type: 'C 20 мая 2021 г. по 20 мая 2021 г.',
        title: 'Moneta',
        titleId: 895032182,
        workerId: 83423543
      },{
          id: 1621529581061,
          amount: 234,
          description: 'Выплата',
          type: 'C 20 мая 2021 г. по 20 мая 2021 г.',
          title: 'Moneta',
          titleId: 895032182,
          workerId: 83423543
        }
      ],
      outcome: [
          {
        id: 1621529591061,
        amount: -234,
        description: '100шт',
        type: 'Почты',
        title: 'Vlad',
        titleId: 83423543,
      },{
        id: 1621321591061,
        amount: -2324,
        description: '20шт',
        type: 'Почты',
        title: 'Pavel',
        titleId: 83473292343,
      },{
        id: 1621529647291,
        amount: -1354,
        description: '100шт',
        type: 'Почты',
        title: 'Pavel',
        titleId: 83473292343,
      },{
        id: 162132432061,
        amount: -500,
        description: '200шт',
        type: 'Почты',
        title: 'Vlad',
        titleId: 83423543,
      },
      ],
    },
  },
  mutations: {
    setCurrentUser(state, payload) {
      state.currentUser = payload
    },
    addNote(state, payload){
      if (!payload.id) payload.id = Date.now()
      state.financeList[payload.amount > 0 ? 'income' : 'outcome'].push(payload)
    },
    setDrop(state, payload) {
      if (!payload.id) payload.id = Date.now()
      if(state.drops[state.drops.findIndex(i => i.id === payload.id)]) {
        state.drops[state.drops.findIndex(i => i.id === payload.id)] = payload
      } else {
        state.drops.push(payload)
      }
    },
    setAff(state, payload) {
      if (!payload.id) payload.id = Date.now()
      if(!payload.workerId) payload.workerId = 100000000
      if(state.affilates[state.affilates.findIndex(i => i.id === payload.id)]) {
        state.affilates[state.affilates.findIndex(i => i.id === payload.id)] = payload
      } else {
        state.affilates.push(payload)
      }
    },
    setWorker(state, payload) {
      console.log(payload)
      if (!payload.id) payload.id = Date.now()
      if(state.workers[state.workers.findIndex(i => i.id === payload.id)]) {
        state.workers[state.workers.findIndex(i => i.id === payload.id)] = payload
      } else {
        state.workers.push(payload)
      }
    },
    deleteDrop(state, payload) {
      state.drops.splice((state.drops.findIndex(i => i.id === payload.id)), 1)
    },
    deleteAff(state, payload) {
      state.affilates.splice((state.affilates.findIndex(i => i.id === payload.id)), 1)
    },
    deleteWorker(state, payload) {
      state.workers.splice((state.workers.findIndex(i => i.id === payload.id)), 1)
    }
  },
  getters: {
    getFinanceList: state => type => {
      if(!type) return state.financeList
      return state.financeList[type]
    },
    getDrops(state){
      return state.drops.map(i => {
        return {...i, affilate: state.affilates.filter(c => c.dropId === i.id)}
      })
    },
    getAffilates(state) {
      return state.affilates
    },
    getWorkers(state){
      return state.workers
    },
    getWorkerTitle: state => id => {
      if(id === 100000000) return 'ADMIN'
      try{return state.workers.filter(i => i.id === id)[0].title}
      catch (e) {
        if(state.workers.filter(i => i.id === id).length === 0) return 'ADMIN'
        return state.workers.filter(i => i.id === id)[0].title
      }
    },
    getAffilateTitle: state => id => {
      if(id === 100000000) return 'ADMIN'
      try{return state.affilates.filter(i => i.id === id)[0].title}
      catch (e) {
        if(state.affilates.filter(i => i.id === id).length === 0) return 'ADMIN'
        return state.affilates.filter(i => i.id === id)[0].title
      }
    },
    getDropTitle: state => id => {
      if(state.drops.filter(i => i.id === id).length >= 1) return state.drops.filter(i => i.id === id)[0].title
      return  state.admin
    },
    getDropAffilates: state => id => {
      return state.affilates.filter(i => i.dropId === id)
    },
    getPlacemarkCoords(state){
      return state.drops.map(i => {
        return {...i.info.geo,title: i.title}
      })
    },
    defaultSetting: state => proxy => {
      if(proxy === 'service') return state.defaultSetting.proxyServices
      return state.defaultSetting
    }
  },
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {

      } catch (e) {
        
      }
    }
  },
})















let store = new Vuex.Store({
  state: {
    currentUser: '',
    defaultSetting: {
      proxyServices: {
        Smartproxy: {
          login: 'DEFAULT',
          pass: 'DEFAULT',
          savingMode: true,
        },
        ProxyCheap: {
          login: 'DEFAULT',
          pass: 'DEFAULT',
          ipv4: 'proxy.proxy-cheap.com',
          port: '10000'
        }
      }
    },
    drops: [{
      id: 7749291930,
      title: 'Ivanov Ivan',
      info: {
        phone: '+7900895859',
        email: 'vankob49@gmail.com',
        contacts: 'Telegram: @inban&@',
        proxy: '127.0.0.1:8000',
        wallets: 'paypal',
        geo: {
          latitude: 54.731781,
          longitude: 36.413341
        }
      },
    },
      {
        id: 284938142,
        title: 'Sergeev Sergey',
        info: {
          phone: '+7965895859',
          email: 'ebanko@gmail.com',
          contacts: 'Jabber: @jaba,  \nTelegram: @inban&@ \nTelegram: @12321&@',
          proxy: '127.127.0.1:8000',
          wallets: 'qiwi',
          geo: {
            latitude: 34.731781,
            longitude: 56.413341
          }
        },
      }],
    affilates: [{
      dropId: 7749291930,
      id: 895032182,
      title: 'Moneta',
      login: 'test1@mail.ru',
      pass: 'Jjmd,,~Kl3',
      wallet: 'WebMoney: Z0974903920',
      link: 'https://dastepro.site/Jdlmm23',
      workerId: 83423543,
      jokerSetting: {country: 'de,gb,bg,ru'},
    },{
      dropId: 284938142,
      id: 895372882,
      title: 'Advidi',
      login: 'test3@mail.ru',
      pass: 'Pkmdn783',
      wallet: 'BTV: 1L8848Hkmnmfk940KKdl',
      link: 'https://dastepro.site/Jdlmm23',
      workerId: 100000000,
      jokerSetting: {country: 'us,ca,ro,kz'},
    }],
    workers: [{
      id: 100000000,
      title: 'ADMIN',
      login: 'ADMIN',
      pass: 'ADMIN',
      setting: {
        proxyServices: {
          Smartproxy: {
            login: 'Maks89tinabris',
            pass: '89tinabris',
            savingMode: true,
          },
          ProxyCheap: {
            login: 'login',
            pass: 'pass',
            ipv4: 'proxy.proxy-cheap.com',
            port: '10000'
          }
        }
      }
    },
      {
        id: 83473292343,
        title: 'Pavel',
        login: 'Pashka8874@sharah71.bot',
        pass: 'HHfiOokd123',
        setting: {
          proxyServices: {
            Smartproxy: {
              login: 'Maks89tinabris',
              pass: '89tinabris',
              savingMode: true,
            },
            ProxyCheap: {
              login: 'login',
              pass: 'pass',
              ipv4: 'proxy.proxy-cheap.com',
              port: '10000'
            }
          }
        }
      },
      {
        id: 83423543,
        title: 'Vlad ',
        login: 'bibo8874@sharah71.bot',
        pass: 'sdgfgdd2343',
        setting: {
          proxyServices: {
            Smartproxy: {
              login: 'ArtyToe',
              pass: 'Sadjaabris',
              savingMode: false,
            },
            ProxyCheap: {
              login: 'login',
              pass: 'pass',
              ipv4: 'proxy.proxy-cheap.com',
              port: '10000'
            }
          }
        }
      }],
    financeList: {
      income: [
        {
          id: 1621529581061,
          amount: 234,
          description: 'Выплата',
          type: 'C 20 мая 2021 г. по 20 мая 2021 г.',
          title: 'Moneta',
          titleId: 895032182,
          workerId: 83423543
        },{
          id: 1621529581061,
          amount: 234,
          description: 'Выплата',
          type: 'C 20 мая 2021 г. по 20 мая 2021 г.',
          title: 'Moneta',
          titleId: 895032182,
          workerId: 83423543
        }
      ],
      outcome: [
        {
          id: 1621529591061,
          amount: -234,
          description: '100шт',
          type: 'Почты',
          title: 'Vlad',
          titleId: 83423543,
        },{
          id: 1621321591061,
          amount: -2324,
          description: '20шт',
          type: 'Почты',
          title: 'Pavel',
          titleId: 83473292343,
        },{
          id: 1621529647291,
          amount: -1354,
          description: '100шт',
          type: 'Почты',
          title: 'Pavel',
          titleId: 83473292343,
        },{
          id: 162132432061,
          amount: -500,
          description: '200шт',
          type: 'Почты',
          title: 'Vlad',
          titleId: 83423543,
        },
      ],
    },
  },
  mutations: {
    setCurrentUser(state, payload){
      state.currentUser = payload
    },
    addNote(state, payload){
      if (!payload.id) payload.id = Date.now()
      state.financeList[payload.amount > 0 ? 'income' : 'outcome'].push(payload)
    },
    setDrop(state, payload) {
      if (!payload.id) payload.id = Date.now()
      if(state.drops[state.drops.findIndex(i => i.id === payload.id)]) {
        state.drops[state.drops.findIndex(i => i.id === payload.id)] = payload
      } else {
        state.drops.push(payload)
      }
    },
    setAff(state, payload) {
      if (!payload.id) payload.id = Date.now()
      if(!payload.workerId) payload.workerId = 100000000
      if(state.affilates[state.affilates.findIndex(i => i.id === payload.id)]) {
        state.affilates[state.affilates.findIndex(i => i.id === payload.id)] = payload
      } else {
        state.affilates.push(payload)
      }
    },
    setWorker(state, payload) {
      if (!payload.id) payload.id = Date.now()
      if(state.workers[state.workers.findIndex(i => i.id === payload.id)]) {
        state.workers[state.workers.findIndex(i => i.id === payload.id)] = payload
      } else {
        state.workers.push(payload)
      }
    },
    deleteDrop(state, payload) {
      state.drops.splice((state.drops.findIndex(i => i.id === payload.id)), 1)
    },
    deleteAff(state, payload) {
      state.affilates.splice((state.affilates.findIndex(i => i.id === payload.id)), 1)
    },
    deleteWorker(state, payload) {
      state.workers.splice((state.workers.findIndex(i => i.id === payload.id)), 1)
    }
  },
  getters: {
    getCurrentUser: state => {
      return state.currentUser
    },
    getFinanceList: state => type => {
      if(!type) return state.financeList
      return state.financeList[type]
    },
    getDrops(state){
      return state.drops.map(i => {
        return {...i, affilate: state.affilates.filter(c => c.dropId === i.id)}
      })
    },
    getAffilates(state) {
      return state.affilates
    },
    getWorkers(state){
      return state.workers
    },
    getWorkerTitle: state => id => {
      if(id === 100000000) return 'ADMIN'
      try{return state.workers.filter(i => i.id === id)[0].title}
      catch (e) {
        if(state.workers.filter(i => i.id === id).length === 0) return 'ADMIN'
        return state.workers.filter(i => i.id === id)[0].title
      }
    },
    getAffilateTitle: state => id => {
      if(id === 100000000) return 'ADMIN'
      try{return state.affilates.filter(i => i.id === id)[0].title}
      catch (e) {
        if(state.affilates.filter(i => i.id === id).length === 0) return 'ADMIN'
        return state.affilates.filter(i => i.id === id)[0].title
      }
    },
    getDropTitle: state => id => {
      if(state.drops.filter(i => i.id === id).length >= 1) return state.drops.filter(i => i.id === id)[0].title
      return  state.admin
    },
    getDropAffilates: state => id => {
      return state.affilates.filter(i => i.dropId === id)
    },
    getPlacemarkCoords(state){
      return state.drops.map(i => {
        return {...i.info.geo,title: i.title}
      })
    },
    defaultSetting: state => proxy => {
      if(proxy === 'service') return state.defaultSetting.proxyServices
      return state.defaultSetting
    }
  },
  actions: {
    async login({dispatch, commit}, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
        commit('setCurrentUser', {...firebase.auth().currentUser, password})
      } catch (e) {throw e}
    },
    async register({dispatch, commit, state}, {name, password, data}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(`${name}@${state.currentUser.email.split('@')[1]}`, password)
        const user = firebase.auth().currentUser
        // const admin = await firebase.database().ref(`/users/${state.currentUser.uid}/info`).once('value')
        let adminName = state.currentUser.email.split('@')[1]
        let adminPass = state.currentUser.password
        await firebase.database().ref(`/users/${user.uid}/info`).set({
          type: 'worker',
          name,
          adminName,
          adminPass,
          data,
          status: 'active'
        })
        await firebase.auth().signInWithEmailAndPassword(`admin@${adminName}`,adminPass)
      } catch (e) {throw e}
    },
    getUid() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async logout() {
      try {
        await firebase.auth().signOut
      } catch (e) {}
    }
  },
});
