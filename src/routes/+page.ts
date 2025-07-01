export const load = async({ fetch, url }) => {
    const name = url.searchParams.get('name');

    if(!name) {
        return { age: null };
    };

    const responseApi = await fetch(`https://api.agify.io/?name=${name}`);
    const dataApi = await responseApi.json();

    return {
        age: dataApi.age ?? null,
    }
}