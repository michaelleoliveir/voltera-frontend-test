import type { Load } from '@sveltejs/kit';

export const load: Load = async ({ fetch, url }) => {
    const name = url.searchParams.get('name');

    if (!name) {
        return { age: null, error: false };
    };

    try {
        // fetching api
        const responseApi = await fetch(`https://api.agify.io/?name=${name}`);

        // checando resposta recebida
        if (!responseApi.ok) {
            return { age: null, error: true };
        }

        // obtendo resposta
        const dataApi = await responseApi.json();

        // checando se a idade é nula
        if (dataApi.age === null) {
            return {
                age: null,
                error: true,
            };
        }

        // retornando dados
        return {
            age: dataApi.age ?? null,
            error: false
        };

    } catch (error) {
        return {
            age: null,
            error: true
        };
    }
}