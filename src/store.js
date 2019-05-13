import { createStore, combineReducers} from 'redux';
import booksReducer from './Components/BooksReducer';
import PageReducer from './Components/PageReducer';
import ActivePageReducer from './Components/ActivePageReducer'


const rootReducer = combineReducers({
    books:booksReducer,
    noOfPages: PageReducer,
    activePage : ActivePageReducer
})


const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store;