export async function getPopular() {
    try {
        const response = await (await fetch('/api/movies/popular')).json();
        console.log(response.results)
        return response.results;
    } catch (err) {
        console.error(err)
        throw new Error('Failed to Fetch Movie_Popular')
    }
}

export async function getTopRate() {
    try {
        const response = await (await fetch('/api/movies/topRate')).json();
        return response.results
    } catch(err) {
        console.error(err);
        throw new Error('Failed to Fetch Getting Top Rate List')
    }
}

export async function getGenre() {
    try {
        const response = await (await fetch('/api/movies/genre')).json();
        return response.genres        
    }catch(err) {
        console.error(err)
        throw new Error('Failed to Fetch Getting Genre list')
    }
}

export async function getUpcoming() {
    try {
        const response = await (await fetch('/api/movies/upComing')).json()
        console.log(response)
        return response.results
    }catch(err) {
        console.error(err)
        throw new Error('Failed to Fetch Getting Up-Coming List')
    }
}

export async function getDetail(id : string) {
    try {
        const response = await(await fetch(`/api/movies/detail/${id}`)).json();
        console.log(response)
        return response
    } catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Modie Detail for Movie : ${id}`)
    }
}

export async function getPerson(id : number) {
    try {
        const response = await (await fetch(`/api/movies/person/${id}`)).json()
        console.log(response)
        return response
    }catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Person for Person ID : ${id}`)
    }
}

export async function getCollection(id : number) {
    try {
        const response = await (await fetch(`/api/movies/collection/${id}`)).json()
        console.log(response);
        return response
    }catch(error) {
        console.log(error);
        throw new Error(`Failed to Fetch Collection for Col ID : ${id}`)
    }
}

export async function getCompany(id: number) {
    try {
        const response = await (await fetch(`/api/movies/company/${id}`)).json();
        console.log(response);
        return response
    } catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Company ID : ${id}`)
    }
}

export async function getSearchResult(keyword: string){
    try {
        const movieResponse = await (await fetch(`/api/movies/search/${keyword}`)).json()
        const collectionResponse = await (await fetch(`/api/collection/search/${keyword}`)).json();
        const companyResponse = await ( await fetch(`/api/person/search/${keyword}`)).json()
        return { movie : movieResponse, collection : collectionResponse}
    } catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Search Movie : ${keyword}`)
    }
};