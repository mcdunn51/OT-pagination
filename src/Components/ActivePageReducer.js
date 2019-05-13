const ActivePageReducer = (state=[], action) => {
    switch(action.type) {
        case 'LOAD_ACTIVE_PAGE':
            return (action.payload)

        default:
            return state
    }
}

export default ActivePageReducer;
