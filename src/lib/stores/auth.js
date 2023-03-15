import {writable} from 'svelte/store';
const authenticated = writable('false');
const userRole = writable('');
export {authenticated, userRole}