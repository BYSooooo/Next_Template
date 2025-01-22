import { use } from "react";

const header = { 'X-Forwarded-Host' : 'api.themoviedb.org'}
export async function getPopular() {
    try {
        const response = await fetch('/api/movies/popular', {headers : header});
        const { results } = await (response).json()
        return results;
    } catch (err) {
        console.error(err)
        throw new Error('Failed to Fetch Movie_Popular')
    }
}

export async function getTopRate() {
    try {
        const response = await (await fetch('/api/movies/topRate',{ headers : header})).json();
        return response.results
    } catch(err) {
        console.error(err);
        throw new Error('Failed to Fetch Getting Top Rate List')
    }
}

export async function getGenre() {
    try {
        const response = await (await fetch('/api/movies/genre',{ headers : header})).json();
        return response.genres        
    }catch(err) {
        console.error(err)
        throw new Error('Failed to Fetch Getting Genre list')
    }
}

export async function getUpcoming() {
    try {
        const response = await (await fetch('/api/movies/upComing', { headers : header})).json()
        return response.results
    }catch(err) {
        console.error(err)
        throw new Error('Failed to Fetch Getting Up-Coming List')
    }
}

export async function getDetail(id : string) {
    try {
        console.log(id)
        const response = await(await fetch(`/api/movies/detail/${id}`,{ headers : header})).json();
        return response.results
    } catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Modie Detail for Movie : ${id}`)
    }
}

export async function getPerson(id : number) {
    try {
        const response = await (await fetch(`/api/movies/person/${id}`,{ headers : header})).json()
        console.log(response)
        return response
    }catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Person for Person ID : ${id}`)
    }
}

export async function getCollection(id : number) {
    try {
        const response = await (await fetch(`/api/movies/collection/${id}`,{ headers : header})).json()
        console.log(response);
        return response
    }catch(error) {
        console.log(error);
        throw new Error(`Failed to Fetch Collection for Col ID : ${id}`)
    }
}

export async function getCompany(id: number) {
    try {
        const response = await (await fetch(`/api/movies/company/${id}`,{ headers : header})).json();
        console.log(response);
        return response
    } catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Company ID : ${id}`)
    }
}

export async function getSearchResult(keyword: string){
    try {
        const movieResponse = await (await fetch(`/api/movies/search/movie/${keyword}`,{ headers : header})).json()
        const collectionResponse = await (await fetch(`/api/movies/search/collection/${keyword}`,{ headers : header})).json();
        const companyResponse = await ( await fetch(`/api/movies/search/company/${keyword}`,{ headers : header})).json()
        const personResponse = await (await fetch(`/api/movies/search/person/${keyword}`,{ headers : header})).json()
        return { 
            movie : movieResponse, 
            collection : collectionResponse, 
            company : companyResponse,
            person : personResponse
        }
    } catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Search Movie : ${keyword}`)
    }
};