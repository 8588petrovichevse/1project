import Base from './base'

export default class Competition extends Base {
    constructor (data = {}) {
        super(data)
        this.id = data.id
        this.name = data.name
        this.code = data.code
        this.startDate = data.currentSeason?.startDate
        this.endDate = data.currentSeason?.endDate
        this.logo = data.emblem
    }
}