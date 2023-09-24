<template>
  <div>
    <v-data-table 
    :headers="headers"
    :items="filteredCompetitions"
    :items-per-page="10"
    class="elevation-1"
    color="grey-lighten-5"
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
      <template #[`item.name`] = "{ item }">
    <a :href="`/matches?id=${item.id}`">{{ item.name }} </a>
  </template>
    <template #[`item.emblem`] = "{ item}">
     <img :src = "item.emblem" :height="30">
    </template>
 
  <template #[`item.startDate`]="{ item }">
        {{ item.currentSeason.startDate | formatDate}}
      </template>

      <template #[`item.endDate`]="{ item }">
        {{ item.currentSeason.endDate | formatDate}}
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  name: 'IndexPage',
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
      competitions: [],
      headers: [
        {text: 'Название лиги', value: 'name'},
        {text: 'Страна', value: 'area.name'},
        {text: 'Флаг', value: 'emblem'},
        { text: 'Дата начала', value: 'startDate', align: 'center'},
        { text: 'Дата окончания', value: 'endDate', align: 'center'},
      ]
    }
  },
  computed: {
    filteredCompetitions() {
      return this.filterDate
        ? this.competitions.filter(comp => new Date(comp.currentSeason.startDate) > new Date(this.filterDate))
        : this.competitions
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$axios.$get('/api/competitions/')
        .then(res => {
         this.competitions = res.competitions;
     })
    }
  }
}
</script>

