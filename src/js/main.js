'use strict';

import '../css/style.css'
import { searchMovie } from './api';

const APP_CONTAINER = document.querySelector('#app');

function initApp() {
  APP_CONTAINER.innerHTML = "HELLO MOVIES";
}

window.addEventListener('DOMContentLoaded', initApp);
