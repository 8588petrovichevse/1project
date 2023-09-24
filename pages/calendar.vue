<template>
    <div>
      <v-data-table 
      :headers="headers"
      :items="filteredMatches"
      :items-per-page="10"
      class="elevation-1"
      color="grey-lighten-5"
  >
  <template #top>
    <v-menu
    ref="menu"
    v-model="showMenu"
    >
    <template #activator="{ on, attrs }">
    <v-text-field
              v-model="date"
              clearable
              label="Выберите дату начала"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
     </template>
     <v-date-picker
            v-model="date"
            scrollable
            color="blue darken-3"
            header-color="blue darken-3"
         ></v-date-picker>
    </v-menu>
    </template>
    <template #[`item.area.name`] = "{ item }">
      <a :href="`/calendarmatches?id=${item.id}`">{{ item.area.name }} </a>
    </template>
  <template #[`item.awayTeam.crest`] = "{ item}">
     <img :src = "item.awayTeam.crest" :height="30">
    </template>
  
    <template #[`item.area.flag`] = "{ item}">
     <img :src = "item.area.flag" :height="30">
    </template>
    </v-data-table>
    </div>
  </template>
  <script>
  export default {
    name: 'Matches',
    data () {
      return {
        matches: [],
        date: '',
        showMenu: false,
        headers: [
          {text: 'Название матча', value: 'area.name'},
          {text: 'Название лиги', value: 'competition.name'},
          {text: 'Гостевая команда', value: 'awayTeam.name'},
          {text: 'Домашняя команда', value: 'homeTeam.name'},
          {text: 'data', value: 'utcDate'},
          {text: 'Начало матча', value: 'season.startDate'},
          {text: 'Конец матча', value: 'season.endDate'},
          {text: 'Текущий день матча', value: 'season.currentMatchday'},
        ]
     }
    },
    computed: {
      filteredMatches() {
        return this.date ? this.matches.filter(comp => {
          return new Date(comp.season?.startDate) > new Date(this.date)
        }): this.matches;
      }
    },
    mounted() {
        this.getData();
       },
    methods: {
      getData() {
        this.$axios.$get('api/matches/')
          .then(res => {
            this.matches=res.matches;
      })
     }
    }
  }
  </script>