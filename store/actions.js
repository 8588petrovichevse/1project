export default {
    setCompetitions ({commit}, competitions) {
        return new Promise(function (resolve) {
            commit('setCompetitions', competitions)
            resolve()
        })
    }
}