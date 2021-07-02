<template>


    <div @click.prevent ref="modal" class="ui modal drop">
      <i class="close icon"></i>
      <form class="ui mini form" style="padding: 20px">
        <h4 class="ui dividing header">
          <i
              @click="information = !information"
              :class="[information === true ? 'green up' : 'red down', ]"
              class="angle icon"
          ></i>
          Information
        </h4>
        <div v-if="information">
          <div class="fields">
            <div class="three wide field">
              <label>First and Last name</label>
              <input placeholder="First and Last name" v-model="data.title">
            </div>
            <div class="four wide field">
              <label>Proxy     (127.0.0.1:8000:login:pass)</label>
              <input placeholder="ipv4:port:login:pass" v-model="data.info.proxy">
            </div>
            <div class="four wide field">
              <label>Phone</label>
              <input v-model="data.info.phone">
            </div>
            <div class="two wide field">
              <label>Latitude</label>
              <input placeholder="78.21312" v-model="data.info.geo.latitude">
            </div>
            <div class="two wide field">
              <label>Longitude</label>
              <input placeholder="48.24312" v-model="data.info.geo.longitude">
            </div>
            <div class="one wide field">
              <button @click.prevent="showingMap" style="background: none" class="ui icon button">
                <i :class="[showMap === true ? 'green' : 'red']" class="world big icon"></i>
              </button>
            </div>
          </div>
          <div v-if="showMap" id="map" style="width: 100%; height: 400px"></div>
          <div class="three fields">
            <div class="field">
              <label>Email's</label>
              <textarea rows="3" style="resize: none;" v-model="data.info.email"></textarea>
            </div>
            <div class="field">
              <label>Contact's</label>
              <textarea rows="3" style="resize: none;" v-model="data.info.contacts"></textarea>
            </div>
            <div class="field">
              <label>Wallet's</label>
              <textarea rows="3" style="resize: none;" v-model="data.info.wallets"></textarea>
            </div>
          </div>
          <div @click.prevent="onSubmit" class="ui mini primary active button">Submit</div>
        </div>
        <div  style="margin-top: 20px" v-if="affilates.length > 0">
          <h4 class="ui dividing header">
            <i
                @click="partnerInfo = !partnerInfo"
                :class="[partnerInfo === true ? 'green up' : 'red down', ]"
                class="angle icon"
            ></i>Affiliate information
          </h4>
          <div :key="count" v-if="partnerInfo " class="ui four link cards">
            <AffilateCard
                @edit="onEdit"
                @delete="onDelete"
                v-for="aff in affilates"
                :aff="aff"
            />
          </div>
        </div>


      </form>
    </div>
  <AffilateModal
      @closeModal="onCloseModal"
      :aff="selectAff"
  />
</template>

<script>
export default {
  props: ['drop'],
  emits: ['closeModal'],
  data: () => ({
    affilates: [],
    count: 0,
    selectAff: {},
    information: true,
    partnerInfo: true,
    data: {
      title: '',
      info: {
        phone: '',
        email: '',
        contacts: '',
        proxy: '',
        wallets: '',
        geo: {
          latitude: 55.731781,
          longitude: 37.413341
        }
      },
    },
    showMap: false,
  }),
  methods: {
    onCloseModal() {
      this.affilates = this.$store.getters.getDropAffilates(this.drop.id)
      this.count = this.count+1
      this.$forceUpdate()
      const transition = ['scale', 'zoom', 'fade', 'fade up', 'fade down', 'fade left','fade right',
        'horizontal flip', 'vertical flip', 'drop', 'fly left', 'fly right','fly up', 'fly down',
        'browse','browse right','slide left', 'slide right', 'slide up', 'slide down']
      // $('.ui.modal.aff').modal('hide');
      setTimeout(() => {
        $('.ui.modal.drop')
            .modal('setting', {
              transition: transition[Math.floor(Math.random()*transition.length)],
              allowMultiple: true,
              closable: false
            })
            .modal('show')
      }, 400)
    },
    onDelete(i){
      if (confirm(`Точно удалить ${i.title} ?`)) {
        this.$store.commit('deleteAff', i)
      }
    },
    onEdit(i) {
      this.selectAff = i
      const transition = ['scale', 'zoom', 'fade', 'fade up', 'fade down', 'fade left','fade right',
        'horizontal flip', 'vertical flip', 'drop', 'fly left', 'fly right','fly up', 'fly down',
        'browse','browse right','slide left', 'slide right', 'slide up', 'slide down']
      $('.ui.modal.drop').modal('hide');
      $('.ui.modal.aff')
          .modal('setting', {
            transition: transition[Math.floor(Math.random()*transition.length)],
            context: $('.ui.modal.drop'),
            allowMultiple: true,
            duration: '10',
            closable: false
          })
          .modal('show')
    },
    async onSubmit() {
      if (confirm(`Вы уверенны ?`)) {
        this.data.id = this.drop.id
        try{
          await this.$store.dispatch('drop', this.data)
          await this.$store.commit('setDrop', this.data)
        }catch (e) {alert(e)}
        this.$emit('closeModal')
        $('.ui.modal.drop').modal('hide')
      }
    },
    showingMap() {
      this.showMap = !this.showMap
    },
  },
  watch: {
    drop(v) {
      this.affilates = this.$store.getters.getDropAffilates(this.drop.id)
      this.showMap = false
      this.data = {
        title: v.title,
        info: {
          phone: v.info.phone,
          email: v.info.email,
          contacts: v.info.contacts,
          proxy: v.info.proxy,
          wallets: v.info.wallets,
          geo: {
            latitude: v.info.geo.latitude,
            longitude: v.info.geo.longitude
          }
        },
      }
    },
    showMap(newV) {
      if(newV === true) {
        this.map = ymaps.ready(() => {
          let geo = this.data.info.geo
          let myPlacemark,
              myMap = new ymaps.Map("map", {
            center: [this.data.info.geo.latitude, this.data.info.geo.longitude],
            zoom: 8
          });

          this.$store.getters.getPlacemarkCoords.forEach(async function(item){
            try{
              myMap.geoObjects.add(new ymaps.Placemark([item.latitude, item.longitude], {
                iconCaption: item.title,
                // balloonContent: '<strong>серобуромалиновый</strong> цвет'
              }, {
                preset: 'islands#dotIcon',
                iconColor: '#735184'
              }))
            }
            catch(e){console.log(e)}
          })
          myMap.controls.remove('geolocationControl');
          myMap.controls.remove('searchControl');
          myMap.controls.remove('trafficControl');
          myMap.controls.remove('typeSelector');
          myMap.controls.remove('fullscreenControl');
          myMap.controls.remove('rulerControl');
          document.querySelector(`.${document.querySelector('ymaps').className.slice(0,-4)}-copyrights-pane`).remove()


          myMap.events.add('drag', function (e) {
            alert(myMap.geometry.getCoordinates())
          });
          myMap.events.add('click',async function (e) {
            let coords = e.get('coords');
            // Если метка уже создана – просто передвигаем ее.
            if (myPlacemark) {
              geo.latitude = (String(coords[0])).slice(0, 9)
              geo.longitude = (String(coords[1])).slice(0, 9)
              myPlacemark.properties.set({iconCaption: [coords]});
              myPlacemark.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
              geo.latitude = (String(coords[0])).slice(0, 9)
              geo.longitude = (String(coords[1])).slice(0, 9)
              myPlacemark = createPlacemark(coords);
              myMap.geoObjects.add(myPlacemark);
              // Слушаем событие окончания перетаскивания на метке.
              myPlacemark.events.add('dragend',async function () {
                getAddress(myPlacemark.geometry.getCoordinates());
                coords = myPlacemark.geometry.getCoordinates();
              });
            }
          });

          // Создание метки.
          function createPlacemark(coords) {
            return new ymaps.Placemark(coords, {
              iconCaption: coords
            }, {
              preset: 'islands#violetDotIconWithCaption',
              draggable: true
            });
          }
          // Определяем адрес по координатам (обратное геокодирование).
          async function getAddress(coords) {
            geo.latitude = (String(coords[0])).slice(0, 9)
            geo.longitude = (String(coords[1])).slice(0, 9)
            myPlacemark.properties.set({iconCaption: [coords]});
          }
        });
      }
      else {
        if(document.querySelector('ymaps')){
          document.querySelector('ymaps').remove()
        }
      }
    }
  },
}
</script>

<style>
/*copyrights-pane*/
</style>