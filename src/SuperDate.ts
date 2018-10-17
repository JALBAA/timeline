export default class SuperDate extends Date {
    subDays (days: number) {
        if (days < 0) throw new Error('no negative')
        this.setTime(this.getTime() + days * 1000 * 60 * 60 * 24)
    }
    addDays (days: number) {
        if (days < 0) throw new Error('no negative')
        this.setTime(this.getTime() + days * 1000 * 60 * 60 * 24)
    }
    daysBetween2Date (date: SuperDate): number {
        return Math.abs((this.getTime() - date.getTime()) / 24 / 60 / 60 /1000)
    }
    isBefore (date: SuperDate): Boolean {
        if (this.getTime() >= date.getTime()) {
            return false
        } else {
            return true
        }
    }
    isAfter (date: SuperDate): Boolean {
        if (this.getTime() <= date.getTime()) {
            return false
        } else {
            return true
        }
    }
    update (date: SuperDate) : SuperDate {
        this.setTime(date.getTime())
        return this
    }
}