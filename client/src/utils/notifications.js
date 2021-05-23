import {getNotifications}from '../actions/manageNotifications'

export const checknf = () => {
    console.log('called')
    getNotifications()
}