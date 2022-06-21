export function fetchCountries(restCountry) {
    const webRequest = {
        link: 'https://restcountries.com/v3.1/name',
        options: 'name,capital,population,languages,flags',
    }
    
    return fetch(`${webRequest.link}/${restCountry}?fields=${webRequest.options}`)
        .then(response => {
            if (!response.ok) {
                throw Error(response.status);
            };

            return response.json();
        });
};
