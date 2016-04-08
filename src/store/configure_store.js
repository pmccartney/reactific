
/*global module*/

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "reducers/root_reducer";
import thunk from "redux-thunk";
import createHistory from "history/lib/createBrowserHistory";
import { reduxReactRouter } from "redux-router";
import actionTransitions from "store/enhancers/action_transitions";
import { Iterable } from "immutable";
import createLogger from "redux-logger";

const { keys } = Object;
const { isIterable } = Iterable;

const reduxLogger = createLogger({
	level: "debug",
	collapsed: true,
	duration: true,
	stateTransformer: (state) => {
		//  Define how you want to take the current state object,
		//  and transform it to the object you want to appear in the console.
		//  The common way follows: Itterate over the keys and serialize waht you
		//  can.
		const newState = {};

		for (const i of keys(state)) {
			if (isIterable(state[i])) {
				newState[i] = state[i].toJS();
			} else {
				newState[i] = state[i];
			}
		}

		return newState;
	}
});

const middleware = [thunk];

/*
	To enable the logger, open dev tools run:
	localStorage.__ENABLE_REDUX_LOGGER = "..."
	and refresh the page.
*/
if (localStorage && localStorage.__ENABLE_REDUX_LOGGER) {
	middleware.push(reduxLogger);

	//Enable supplemental logger:
	if (!localStorage.debug || !localStorage.debug.includes(`GAMELIST:`)) {
		localStorage.debug = `GAMELIST:*`;
	}
}

let store = null;

export default function configureStore(initialState = {}) {
	if (!store) {
		//  'Compose' is how Redux binds up all the things you want done.
		//  In this case:
		//  1) possible logger as the middleware along with the 'thunk'
		//  2) actionTransitions, which allow you to route to a different url after action
		//  3) ReduxReactRouter - Places the history object in the store!!
		store = compose(
			applyMiddleware.apply(this, middleware),
			actionTransitions(),
			reduxReactRouter({
				createHistory
			})
		)(createStore)(rootReducer, initialState);
	}

	if (module && module.hot) {
		// Enable Webpack hot module replacement for reducers
		module.hot.accept("reducers/root_reducer", () => {
			const nextRootReducer = require("reducers/root_reducer");
			store.replaceReducer(nextRootReducer);
		});
	}

	//  The 'store' that is returned here is primed for a container!
	return store;
}
