import moment from 'moment'

export function format(date: Date) {
    return moment(date).format('DD/MM/YYYY')
}

export function nowDate() {
    return moment(Date.now())
}