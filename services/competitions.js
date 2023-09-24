import axios from 'axios'
import CompetitionModel from '../models/competition'
import BaseServise from './base'

export default class Competitions extends BaseServise {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static  getList( params = {} ) {
    return axios.get('api/competitions/')
    .then(res => {
      console.log(res);
      const competitions = []
      res.data.competitions.forEach(comp => {
        competitions.push(new CompetitionModel(comp))
      })
      this.vuex.dispatch('setCompetitions', competitions)
    })
  }
}