<template>
    <div :key="count" style="width: 176px;max-height: 190px;margin-top: 10px" class="card">
      <div class="content">
        <img v-if="item.service == 'Smartproxy' && item.aff.selectProxy != 'Smartproxy'" style="width: 150px;" src="https://smartproxy.com/wp-content/themes/smartproxy/images/sp-logo-web.svg">
        <img v-if="item.service == 'Proxycheap' && item.aff.selectProxy != 'Proxycheap'" style="width: 120px;" src="https://i.ibb.co/mD5dr5Z/proxycheap.png">
        <div class="right floated ui ">
          <button style="color: white; overflow: hidden" class="ui compact icon basic circular inverted button"><i href="#" class="close icon red"></i></button>
        </div>
        <div v-if="item.name" style="margin-top: -0px" class="header">{{item.name}}</div>
        <div v-else-if="item.id" style="margin-top: -0px" class="header">{{item.id}} ID</div>
        <b style="white-space: nowrap">{{item.aff.title}} by {{$store.getters.getDropTitle(item.aff.dropId) || $store.getters.getCurrentUser.email.split('@')[1].split('.')[0]}}</b>
        <div class="meta">
          <div v-if="item.status == 'SaveProfile'" class="ui big transparent input">
            <input size="15" type="text" placeholder="Input name" v-model="item.name">
          </div>
          <p v-if="item.demo"><i :class="item.proxy.country" class="flag"></i>FS: 23</p>
          <p v-else style="overflow: hidden"><i :class="item.proxy.country" class="flag"></i>&nbsp;{{item.url}}</p>
        </div>
        <div  v-if="item.date" class="description">{{item.date}}</div>
      </div>
      <div v-if="item.status != 'StartBrowser'&&item.status != 'HideBrowser'&&item.status != 'SaveProfile'" style="height:20px; padding-top: 0px;margin-top: -10px; color: black;white-space: nowrap;" class="extra content">
        {{item.status}}
      </div>
      <div v-if="item.status == 'StartBrowser'" style="height:20px; padding-top: 0px; background-color: 8aa88b; color: white" class="ui bottom attached button" @click="StartBrowser()">
        Show Browser
      </div>
      <div v-if="item.status == 'HideBrowser'" style="height:20px; padding-top: 0px; background-color: acad63; color: white" class="ui bottom attached button" @click="StartBrowser()">
        Show Browser
      </div>
      <div v-if="item.status == 'SaveProfile'" style="height:20px; padding-top: 0px; margin-top: -12px" class="ui bottom facebook attached button" @click="SaveProfile()">
        Save Profile
      </div>
      <div v-if="item.status == 'Democlick'" style="height:20px; padding-top: 3px; margin-top: -0px; background-color: 8c6f5e; color: white" class="ui bottom attached button">
        <p :id="item.id" class="label"></p>
      </div>
    </div>
</template>

<script>
export default {
  props: ['item'],
  data: () => ({
    count: 0,
  }),
  methods: {
    democlicks() {
      console.log('Сделал клик')
    },
    async StopThread() {
      try{
        console.log("Закрыл херню")
        clearInterval(this.item.checkipfunc)
        this.item.checkipThread.StopThread()
      }catch(e){console.log(e)}
      this.item.Thread.StopThread()
      if(this.item.checkipThread){
        clearInterval(this.item.checkipfunc)
        this.item.checkipThread.StopThread()
      }
    },
    async SaveProfile() {
      let data = await this.item.Thread.RunFunction("SaveProfile", {})
      let json = {
        country: this.item.proxy.country,
        path: this.item.path || app.Setting.Files.AccsFolder + "/" + this.item.proxy.country + "_" + this.item.name + ".json",
        name: this.item.name,
        data: data,
        date: this.item.date,
        service: this.item.service
      }
      console.log(this.item)
      WriteFile(json.path, JSON.stringify(json), "UTF-8")
      StopThread()
    },
    async StartBrowser() {
      this.item.browser_id = Api.GetTasks()[this.item.id].browser_id
      Api.ShowBrowser(this.item.browser_id)
    },
    async Thread() {
      this.item.Thread = new BASThread()
      this.item.status = "Подготовка"
      this.item.id = this.item.Thread.GetId()
      this.item.id = '123123'


      //Получение отпечатка
      do{
        let fingerFlag = false
        this.item.fingerpint = await this.item.Thread.RunFunction("Fingerprint", {
          "ProxyService": this.item.service
        })
        if(!this.item.fingerpint) {
          this.item.status = "Нет отпечатков"
          continue
        }
        fingerFlag = true
      }while(!checkfingerflag)


      // Проверка FS
      do {
        let checkflag = false

        //Получение IP, проверка на уникальность, цикл в случае неуспеха Внутри BAS функции
        if (item.status == "Подготовка") this.item.status = "Получаю IP"
        this.item.proxy.clear = await this.item.Thread.RunFunction("GetIP", {
          "proxy": this.item.proxy,
        })

        //Устанавливаю Дату начало проверки FS
        this.item.date = new Date()
        this.item.date = this.item.date.toLocaleString("ru", {year: 'numeric',month: 'numeric',day: 'numeric',hour: 'numeric',minute: 'numeric',second: 'numeric'})


        if (this.item.proxy.fraudcheck !== 'none') {
          this.item.status = "Проверяю FS"
          this.item.proxy.fraud = await this.item.Thread.RunFunction("CheckFraud", {
            "Fraudcheck": this.item.proxy.fraudcheck,
            "Fingercheck": this.item.proxy.fingercheck
          })
          if (this.item.proxy.fraud === false) continue
        }
        checkflag = true
      } while (!checkflag)

      //Экономия трафика
      if(this.item.proxy.trafficSave) {
        await card.Thread.RunFunction("PreControl", {
          "TrafficSave": app.Setting.Other.TrafficSave
        })
      }

      this.item.status = "StartBrowser"


      if(this.item.proxy.hardmode){
        this.item.checksetting = await this.item.Thread.RunFunction("PreCheckIp", {})
        console.log(this.item.checksetting)
        this.item.checkipThread = new BASThread()
        this.item.checkipfunc = setInterval(()=>{
          try{
            Api.RunFunction("CheckIp", {
              "SettingProxyCheck": this.item.checksetting
            }).then(function(Result) {
              this.item.checkip = Result
              if(this.item.proxy.clear.ip != this.item.checkip){
                if(this.item.checkip && this.item.proxy.clear.ip){
                  app.StopThread(this.item)
                  clearInterval(this.item.checkipfunc)
                }
              }
            })
          }catch(e){console.log(e)}
        },500)
      }
      if(!country.path ||typeof country == "string"){
        AppendFile(app.Setting.Files.AccsFolder + "/fingerprint", card.fingerpint + "\r\n", "UTF-8")
        await card.Thread.RunFunction("UserControl", {
          "Url": app.Setting.Url,
          "TouchOn": app.Setting.Other.TouchOn
        })
      }else{
        await card.Thread.RunFunction("UserControlRepeat", {"TouchOn": app.Setting.Other.TouchOn})
      }


    },
  },
  beforeMount() {
    Api.SetEventHandler(async function(EventType, EventData) {
      // console.log(EventType, EventData)
      if (EventType == "log") {
        var Text = EventData["text"]
        console.log(Text)
      }
      if (EventType == "show_browser") {
        app.ListProfiles.forEach(item => {
          if (item.browser_id == EventData["browser_id"]) {
            item.status = "HideBrowser"
          }
        })
      }
      if (EventType == "hide_browser") {
        app.ListProfiles.forEach(item => {
          if (item.browser_id == EventData["browser_id"] && item.status != "SaveProfile") {
            item.status = "StartBrowser"
          }
        })
      }
      if (EventType == "manual_control_end") {
        console.log(EventType, EventData)
        app.ListProfiles.forEach(item => {
          if (item.browser_id == EventData["browser_id"] && item.proxy.savemode) {
            if(app.Save.indexOf(item.proxy.country) == -1){
              if (app.ListProfiles.indexOf(item) > -1) {
                console.log(item.browser_id)
                app.StopThread(item)
                console.log(item)
              }
            }else{
              if(item.path){
                app.SaveProfile(item)
              }else{
                item.status = "SaveProfile"
                if(item.checkipThread) {
                  clearInterval(item.checkipfunc)
                  item.checkipThread.StopThread()
                }
              }
            }
          }else if ((item.service == "Astroproxy"||item.service == "Proxycheap" || item.browser_id == EventData["browser_id"])&& !item.proxy.savemode) {
            if (app.ListProfiles.indexOf(item) > -1) {
              if(item.browser_id != undefined){
                if(item.browser_id == EventData["browser_id"]){
                  console.log(item.browser_id == EventData["browser_id"])
                  app.StopThread(item)
                }
              }
            }
          }
        })
      }
    })
  },
  mounted() {
    console.log(this.item)
    if (this.item.demo) {
      this.democlicks()
    } else {
      this.Thread()
    }
  },
}
</script>

<style scoped>

</style>