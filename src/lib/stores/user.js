import {writable} from 'svelte/store';
import {browser} from "$app/environment"

const defaultValue = {}
const stored = browser ? JSON.parse(window.localStorage.getItem("user")) ?? defaultValue : defaultValue;

const user  = writable(stored)


user.subscribe((value)=> {
    if(browser) {
        window.localStorage.setItem("user", JSON.stringify(value))
    }
})


export default  user;

