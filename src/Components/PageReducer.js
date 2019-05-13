const calculateNoOfPages = totalNoOfBooks => {
    const totalNoOfPages = Math.ceil(totalNoOfBooks/20)
    return (
        totalNoOfPages
    )
}

const PageReducer = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_NO_OF_PAGES':
            return calculateNoOfPages(action.payload)
            
        default:
            return state
    }
}

export default PageReducer;