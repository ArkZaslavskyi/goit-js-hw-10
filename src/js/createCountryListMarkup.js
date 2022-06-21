export function createCountryListMarkup(countryList) {
    return countryList.map(createCountryListItemMarkup).join('');

    function createCountryListItemMarkup({ flags, name }) {
        return `
        <li class="country-list__item">
            <img class="country-list__img" src="${flags.svg}" />
            <span class="country-list__name">
                ${name.common}
            </span>
        </li>
        `;
    };
}

