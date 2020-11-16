import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';
import fetchCountries from './js/fetchCountries';
import countriesListTemplate from './templates/countries-list.hbs';
import countryTemplate from './templates/country.hbs';
const debounce = require('lodash.debounce');
const input = document.querySelector('#country-name');
const outputCont = document.querySelector('.output-container');

input.addEventListener('input', debounce(renderCountries, 500));

function renderCountries() {
  outputCont.innerHTML = ' ';
  const searchQuery = input.value;
  let markup = '';
  fetchCountries(searchQuery)
    .then(response => response.json())
    .then(countries => {
      if (countries.length >= 2 && countries.length <= 10) {
        markup = countriesListTemplate(countries);
        outputCont.insertAdjacentHTML('beforeend', markup);
      } else if (countries.length > 10) {
        error({
          text: 'Too many matches found. Please enter more specific query!',
          type: 'error',
        });
      } else if (countries.length === 1) {
        markup = countryTemplate(countries);
        outputCont.insertAdjacentHTML('beforeend', markup);
      } else {
        error({
          text: 'Nothing found!',
          type: 'error',
        });
      }
    })
    .catch(error => console.log(error));
}
