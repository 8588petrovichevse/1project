<template>
  <v-img
   :height = "650"
   aspect-ratio="16/9"
   cover
    src="https://fikiwiki.com/uploads/posts/2022-02/1644725610_19-fikiwiki-com-p-krasivie-kartinki-futbolnoe-pole-21.jpg"
  >
    <div>
      <v-data-table
       :headers="headers"
       :items="filteredCompetitions"
       :items-per-page="10"
       class="elevation-1"
  >
  <template #top>
    <v-menu 
    ref="menu"
    v-model="showMenu"
    >
    <template #activator="{ on, attrs}">
      <v-text-field
      v-model="dateRangeText"
        label="Выберите дату начала и окончания"
        prepend-icon="mdi-calendar"
        readonly
        color="blue darken-3"
        v-bind="attrs"
        v-on="on"
      ></v-text-field>
    </template>
       <v-date-picker
          v-model="dates"
          range
          no-title
          scrollable
          color="blue darken-3"
          header-color="blue darken-3"
       ></v-date-picker>
     </v-menu>
     </template>
      <template #[`item.name`] = "{ item }">
          <a :href="`/inspire?id=${item.id}`">{{ item.name }} </a>
      </template>
      <template #[`item.startDate`] = "{ item }">
          {{ item.startDate | formatDate}}
      </template>
      <template #[`item.endDate`] = "{ item }">
          {{ item.endDate | formatDate}}
      </template>
      <template #[`item.emblem`] = "{ item }">
          <img :src = "item.logo" :height="30">
      </template>
     </v-data-table>
   </div>
  </v-img>
  </template>
  <script>
  import {mapState} from 'vuex'
  import CompetitionsServices from '../services/competitions'
  export default {
    name: 'Competitions',
    filters: {
        formatDate: d => {
          const date = new Date(d);
          const options = { year: 'numeric', month: 'numeric', day: 'numeric'}
          return date.toLocaleString('ru-Ru', options);
        }
      },
    data: () => {
      return {
       dates:[],
       showMenu: false,
       headers: [
        { text: 'Название лиги', value: 'name'},
        { text: 'Код лиги', value: 'code'},
        { text: 'Дата начала', value: 'startDate', align: 'center'},
        { text: 'Дата окончания', value: 'endDate', align: 'center'},
        { text: 'Флаг', value: 'logo', align: 'center'},
       ]
     }
    },
    computed: {
      ...mapState({
        competitions : state => state.competitions
      }),
      dateRangeText () {
        return this.dates.join(' ~ ')
      },
 filteredCompetitions() {
          return this.date ? this.competitions.filter(comp => {
            return new Date(comp.currentSeason?.startDate) > new Date(this.date)
          })  : this.competitions;
        }
      },
     mounted() {
      CompetitionsServices.getList()
     }
  }
  </script>
