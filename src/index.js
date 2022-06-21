import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { fetchCountries } from './js/fetchCountries';
import { createCountryListMarkup } from './js/createCountryListMarkup';
import { createCountryInfoMarkup } from './js/createCountryInfoMarkup';

const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};

refs.input.addEventListener('input', debounce(evt => onSearchInput(evt), DEBOUNCE_DELAY));

function onSearchInput(evt) {
    evt.preventDefault();

    const value = evt.target.value.trim();

    if (!value) {
        clearMarkup();
        return;
    }

    fetchCountries(value)
        .then(showCountries)
        .catch(error => {
            if (error.message === '404') {
                Notify.failure('Oops, there is no country with that name');
            } else {
                Notify.failure(error);
            };
    });
}

function clearMarkup() {
    refs.countryList.innerHTML = "";
    refs.countryInfo.innerHTML = "";
}
//
function showCountries(countries) {
    // получили массив объектов стран

    clearMarkup(); // очистка разметки
    
    const amount = countries.length; // кол-во стран

    if (amount > 10) {
    // number of countries > 10
        Notify.info('Too many matches found. Please enter a more specific name.');
        return;
    };

    if (amount > 1) {
    // number of countries [2..10]
        refs.countryList.innerHTML = createCountryListMarkup(countries);
        return;
    };

    // 1 country
    refs.countryInfo.innerHTML = createCountryInfoMarkup(countries[0]);
    return;
}

