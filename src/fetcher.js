export const fetcher = async url => {
    const res = await fetch(url)
    if(!res.ok){
        const error = new Error("Error while fetching data")
        error.info = await res.json()
        error.status = res.status
        throw error
    }
    return res.json()
};