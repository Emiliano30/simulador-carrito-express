

function buildPaginationLinks(baseURL,products,query){
    const queryParams = new URLSearchParams(query);

    const createLink = (page)=>{
        const newParams = new URLSearchParams(queryParams);
        newParams.set('page',page);
        return `${baseURL}?${newParams.toString()}`
    }

    return {
        prevLink: products.hasPrevPage ? createLink(products.prevPage) : null,
        nextLink: products.hasNextPage ? createLink(products.nextPage) : null}
}

module.exports = {buildPaginationLinks}