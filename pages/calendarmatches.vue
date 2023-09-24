<template>
    <div>
      <v-data-table 
      :headers="headers"
      :items="filteredMatches"
      :items-per-page="10"
      class="elevation-1"
      color="brown lighten-1"
  >
  <template #top>
          <v-menu
            ref="menu"
            v-model="menu"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="filterDate"
                label="Выберите дату начала  и завершения"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="filterDate"
              no-title
              scrolable
            >
            </v-date-picker>
          </v-menu>
        </template>
      </v-data-table>
    </div>
  </template>
  <script>
  export default {
    name: 'Matches',
    filters: {
      formatDate: d => {
        const date = new Date(d);
        const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
        return date.toLocaleString('ru-RU', options)
      }
    },
    data () {
      return {
        filterName: '',
        menu: false,
        filterDate: '',
        matches: [],
        headers: [
           {text: 'Название матча', value: 'area.name', align:'center'},
           {text: 'Гостевая команда', value: 'awayTeam.name', align:'center'},
           {text: 'Домашняя команда', value: 'homeTeam.name', align:'center'},
           {text: 'Время', value: 'utcDate', align:'center'},
           {text: 'Счёт гостевой команды в основное время', value: 'score.fullTime.away', align:'center'},
           {text: 'Счёт домашней команды в основное время', value: 'score.fullTime.home', align:'center'},
           {text: 'Счёт гостевой команды в дополнительное время', value: 'score.halfTime.away', align:'center'},
           {text: 'Счёт домашней команды в дополнительное время', value: 'score.halfTime.home', align:'center'},
           {text: 'Победитель', value: 'score.winner', align:'center'},
           {text: 'Начало матча', value: 'season.startDate', align:'center'},
           {text: 'Конец матча', value: 'season.endDate', align:'center'},
           {text: 'Конец матча', value: 'season.currentMatchday', align:'center'},
      ]
     }
    },
    computed: {
      filteredMatches() {
        return this.filterDate
          ? this.matches.filter(comp => new Date(comp.season.startDate) > new Date(this.filterDate))
          : this.matches
      }
    },
    mounted() {
        this.getData();
       },
    methods: {
      getData() {
        this.$axios.$get('/api/matches/')
          .then(res => {
           this.matches = res.matches;
       })
      }
    }
  }
  </script>
  
  