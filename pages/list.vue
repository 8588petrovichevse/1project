<template>
    <div>
      <v-data-table 
      :headers="headers"
      :items="teams"
      :items-per-page="10"
      class="elevation-1"
      color="grey-lighten-5"
  >
  <template #[`item.name`] = "{ item }">
    <a :href="`/calendarmatches?id=${item.id}`">{{ item.name }} </a>
  </template>
  <template #[`item.crest`] = "{ item}">
     <img :src = "item.crest" :height="30">
    </template>
    </v-data-table>
    </div>
  </template>
  <script>
  export default {
    name: 'Teams',
    data () {
      return {
        teams: [],
        headers: [
          {text: 'Название команды', value: 'name'},
          {text: 'Логотип', value: 'crest'}
        ]
      }
    },
    mounted() {
        this.getData();
       },
    methods: {
      getData() {
        this.$axios.$get('api/teams/')
          .then(res => {
            this.teams=res.teams;
       })
      }
    }
  }
  </script>