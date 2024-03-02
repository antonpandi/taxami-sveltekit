import {writable} from 'svelte/store';
import {browser} from "$app/environment"


const defaultValue = false
const stored = browser ? JSON.parse(window.localStorage.getItem("auth")) ?? defaultValue : defaultValue;



export const authenticated = writable(stored);



authenticated.subscribe((value)=> {
    if(browser) {
        window.localStorage.setItem("auth", JSON.stringify(value))
    }
})



