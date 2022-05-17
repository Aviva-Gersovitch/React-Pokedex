export async function getAllPokemon(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
    })

}


export function getPokemon( {url} ) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            });
    });
}


export function getPokemonBio (id) {
    return new Promise ((resolve, reject ) => {
        
        fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
            .then(res => res.json())
            .then(data => {
                let description = 'Placeholder description';
                data.flavor_text_entries.forEach(flavor => {
                    if (flavor.language.name === 'en') {
                        description = flavor.flavor_text;
            }});
            resolve(description);
    });
    }
)}