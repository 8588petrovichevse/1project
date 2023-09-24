import mutations from './mutations'
import actions from './actions'
export default {
    namespased: true,
    state:() => {
        return {
            competitions:[{
                id: '1', name: 'Liga1', code: 'LIGA', startDate: new Date(), endDate: new Date(), logo: ''
         }]
       }
    },
    mutations,
    actions
}