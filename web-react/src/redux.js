import rootReducer from "./store/reducers/rootReducer";
import { persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import { thunk } from "redux-thunk"; // Use named import

const reduxStore = () => {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk) // Apply middleware here
    );
    const persistor = persistStore(store);

    return { store, persistor };
};

export default reduxStore;