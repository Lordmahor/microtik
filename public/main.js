import { createApp } from 'vue'
import App from './App.vue'
import Login from "./components/Login";
import Chart from "./components/Chart";
import Navbar from './components/Navbar';
import AffilateCard from "./components/AffilateCard";
import AffilateModal from "./components/AffilateModal";
import DropModal from "./components/DropModal";
import DropCard from "./components/DropCard";
import WorkerCard from "./components/WorkerCard";
import WorkerModal from "./components/WorkerModal";
import OperationList from "./components/OperationList";
import FraudManagerCard from "./components/FraudManagerCard";
import FraudManager from "./views/FraudManager";
import FraudThreadCard from "./components/FraudThreadCard";
import Drops from "./views/Drops";
import Affilates from "./views/Affilates";
import Workers from "./views/Workers";
import Finance from "./views/Finance";
let app

let store = new Vuex.Store({
    state: {
        activeFraudThread: [],
        currentUser: '',
        adminUser: '',
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
        drops: [],
        affilates: [],
        workers: [],
        financeList: {
            income: [],
            outcome: [],
        },
    },
    mutations: {
        setActiveFraudThread(state, payload){
            state.activeFraudThread.push(payload)
        },
        setCurrentUser(state, payload){
          state.currentUser = payload
        },
        setAdminUser(state, payload){
          state.adminUser = payload
        },
        addNote(state, payload){
            if (!payload.id) payload.id = Date.now()
            state.financeList[payload.amount > 0 ? 'income' : 'outcome'].push(payload)
        },
        async setDrop(state, payload) {
            if (!payload.id) payload.id = Date.now()
            if(state.drops[state.drops.findIndex(i => i.id === payload.id)]) {
                state.drops[state.drops.findIndex(i => i.id === payload.id)] = payload
            } else {
                state.drops.push(payload)
            }
        },
        async setAff(state, payload) {
            if (!payload.id) payload.id = Date.now()
            payload.select = false
            payload.selectProxy = 'Smartproxy'
            payload.jokerSetting.savingMode = false
            payload.jokerSetting.hardmode = true
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
        getAdminUser: state => {
            return state.adminUser
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
        getActiveFraudThread(state) {
            return state.activeFraudThread
        },
        getWorkers(state){
            return state.workers
        },
        getWorkerTitle: state => id => {
            try{return state.workers.filter(i => i.id === id)[0].title}
            catch (e) {
                if(state.workers.filter(i => i.id === id).length === 0) return state.currentUser.email.split('@')[1].split('.')[0]
                return state.workers.filter(i => i.id === id)[0].title
            }
        },
        getAffilateTitle: state => id => {
            if(id === 100000000) return state.currentUser.email.split('@')[1].split('.')[0]
            try{return state.affilates.filter(i => i.id === id)[0].title}
            catch (e) {
                if(state.affilates.filter(i => i.id === id).length === 0) return state.currentUser.email.split('@')[1].split('.')[0]
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
        async login({dispatch, commit, state}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
                const user = firebase.auth().currentUser
                const data = (await firebase.database().ref(`/users/${user.uid}/info`).once('value')).val()
                if (data.type !== 'admin') {
                    await firebase.auth().signInWithEmailAndPassword(`admin@${data.adminName}`,data.adminPass)
                    const admin = firebase.auth().currentUser
                    admin.database = (await firebase.database().ref(`/users/${admin.uid}`).once('value')).val()
                    commit('setAdminUser', {...admin, password})
                    user.database = (await firebase.database().ref(`/users/${admin.uid}/workers/${user.uid}/info`).once('value')).val()
                    commit('setCurrentUser', {...user, password})
                    commit('setWorker', user.database.data)
                    console.log(admin.database)
                    console.log(user.database.data.id)
                    Object.keys(admin.database.affilates).forEach(i => {
                        if(admin.database.affilates[i].workerId === user.database.data.id) {
                            commit('setAff', admin.database.affilates[i])
                            if(!state.drops.find(c => c.id === admin.database.affilates[i].dropId)){
                                commit('setDrop', admin.database.drops[String(admin.database.affilates[i].dropId)])
                            }
                        }
                    })
                    // Object.keys(admin.database.drops).forEach(i => {
                    //     if(admin.database.drops[i].workerId === user.database.data.id) {
                    //         commit('setAff', admin.database.drops[i])
                    //     }
                    // })
                } else {
                    user.database = (await firebase.database().ref(`/users/${user.uid}/info`).once('value')).val()
                    user.database.affilates = (await firebase.database().ref(`/users/${user.uid}/affilates`).once('value')).val()
                    user.database.drops = (await firebase.database().ref(`/users/${user.uid}/drops`).once('value')).val()
                    user.database.workers = (await firebase.database().ref(`/users/${user.uid}/workers`).once('value')).val()
                    commit('setAdminUser', {...user, password})
                    commit('setCurrentUser', {...user, password})
                    commit('setWorker', user.database.data)
                    const workers = (await firebase.database().ref(`/users/${user.uid}/workers`).once('value')).val()
                    if(workers){
                        Object.keys(workers).forEach(i => {
                            commit('setWorker', workers[i].info.data)
                        })
                    }
                    const affilates = (await firebase.database().ref(`/users/${user.uid}/affilates`).once('value')).val()
                    if(affilates) {
                        Object.keys(affilates).forEach(i => {
                            commit('setAff', affilates[i])
                        })
                    }
                    const drops = (await firebase.database().ref(`/users/${user.uid}/drops`).once('value')).val()
                    if(drops) {
                        Object.keys(drops).forEach(i => {
                            commit('setDrop', drops[i])
                        })
                    }
                    const finance = (await firebase.database().ref(`/users/${user.uid}/finance`).once('value')).val()
                    if(finance) {
                        Object.keys(finance).forEach(i => {
                            commit('addNote', finance[i])
                        })
                    }
                }
            } catch (e) {throw e}
        },
        async affilate({dispatch, commit, state}, payload) {
            if(state.currentUser.uid === state.adminUser.uid) {
                await firebase.database().ref(`/users/${state.currentUser.uid}/affilates/${payload.id}`).set(payload)
            } else {
                await firebase.database().ref(`/users/${state.currentUser.uid}/affilates/${payload.id}`).set(payload)
                await firebase.database().ref(`/users/${state.adminUser.uid}/affilates/${payload.id}`).set(payload)
            }
        },
        async note({dispatch, commit, state}, payload) {
            if(state.currentUser.uid === state.adminUser.uid) {
                await firebase.database().ref(`/users/${state.currentUser.uid}/finance/${payload.id}`).set(payload)
            } else {
                await firebase.database().ref(`/users/${state.currentUser.uid}/finance/${payload.id}`).set(payload)
                await firebase.database().ref(`/users/${state.adminUser.uid}/finance/${payload.id}`).set(payload)
            }
        },
        async drop({dispatch, commit, state}, payload) {
            if(state.currentUser.uid === state.adminUser.uid) {
                await firebase.database().ref(`/users/${state.currentUser.uid}/drops/${payload.id}`).set(payload)
            } else {
                await firebase.database().ref(`/users/${state.currentUser.uid}/drops/${payload.id}`).set(payload)
                await firebase.database().ref(`/users/${state.adminUser.uid}/drops/${payload.id}`).set(payload)
            }
        },
        async register({dispatch, commit, state}, {name, password, data}) {
            try {
                await firebase.auth().createUserWithEmailAndPassword(`${name}@${state.currentUser.email.split('@')[1]}`, password)
                await dispatch('setDatabase',{name, password, data})
            } catch (e) {throw e}
        },
        async setDatabase({dispatch, commit, state}, {name, password, data}) {
            try{
                await firebase.auth().signInWithEmailAndPassword(`${name}@${state.currentUser.email.split('@')[1]}`, password)
                const user = firebase.auth().currentUser
                let adminName = state.currentUser.email.split('@')[1]
                let adminPass = state.currentUser.password
                const database = {
                    type: 'worker',
                    name,
                    adminName,
                    adminPass,
                    data,
                    status: 'active'
                }
                await firebase.database().ref(`/users/${user.uid}/info`).set(database)
                await firebase.database().ref(`/users/${state.adminUser.uid}/workers/${user.uid}/info`).set(database)
                await firebase.auth().signInWithEmailAndPassword(`admin@${adminName}`,adminPass)
            }catch (e) {throw e}
        },
        async logout() {
            try {
               await firebase.auth().signOut
            } catch (e) {}
        }
    },
});

firebase.initializeApp({
    apiKey: "AIzaSyDS0QbpWRZeZL9VPGDfjMJ6R_k2r7wOags",
    authDomain: "manager-ee7fa.firebaseapp.com",
    projectId: "manager-ee7fa",
    storageBucket: "manager-ee7fa.appspot.com",
    messagingSenderId: "83544872697",
    appId: "1:83544872697:web:5ff7d192739f8018feb428"
});
firebase.auth().onAuthStateChanged(() => {
    if(!app) {
        app = createApp(App)
        app.config.globalProperties.$filters = {dateFilter(value, format = 'date') {
            const options = {}
            if (format.includes('date')){
                options.day = '2-digit'
                options.month = 'long'
                options.year ='numeric'
            }
            if (format.includes('time')){
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second ='2-digit'
            }

            return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
        }}
        app
            .component('FraudManagerCard', FraudManagerCard)
            .component('FraudManager', FraudManager)
            .component('FraudThreadCard', FraudThreadCard)
            .component('OperationList', OperationList)
            .component('WorkerCard', WorkerCard)
            .component('Workers', Workers)
            .component('WorkerModal', WorkerModal)
            .component('DropModal', DropModal)
            .component('Drops', Drops)
            .component('DropCard', DropCard)
            .component('Finance', Finance)
            .component('AffilateCard', AffilateCard)
            .component('Affilates', Affilates)
            .component('AffilateModal', AffilateModal)
            .component('Navbar', Navbar)
            .component('Login', Login)
            .component('Chart', Chart)
            .use(store)
            .mount('#app')
    }
})

