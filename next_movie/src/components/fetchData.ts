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
        const response = await(await fetch(`/api/movie/detail/${id}`)).json();
        return response
    } catch(error) {
        console.log(error)
        throw new Error(`Failed to Fetch Modie Detail for Movie : ${id}`)
    }
}