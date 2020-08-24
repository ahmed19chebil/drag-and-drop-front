import { applyMiddleware, compose, createStore } from "redux";
import { routerMiddleware } from "connected-react-router";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore(history, preloadedState) {
	const store = createStore(
		rootReducer(history), // root reducer with router state
		preloadedState,
		compose(applyMiddleware(thunk, routerMiddleware(history)))
	);

	return store;
}
