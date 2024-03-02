import {writable} from 'svelte/store';
import { browser } from '$app/environment';


const defaultValue = [];
const stored = browser ? JSON.parse(window.localStorage.getItem("workers")) ?? defaultValue : defaultValue;




export const workers = writable(stored);


workers.subscribe((value)=> {
    if(browser) {
        window.localStorage.setItem("workers", JSON.stringify(value))
    }
})