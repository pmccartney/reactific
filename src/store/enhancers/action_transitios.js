/*
	This enables a page transition for any action that contains the "meta" property.

	usage:

	dispatch({
		payload: ...stuff,
		type: UPDATE_STUFF,
		meta: {
			transition: () => ({
				path: "/view/stuff"
			})
		}
	})
*/
define(function() {
	"use strict";

	return function actionTransitions() {
		return (next) => (reducer, initialState) => {
			const store = next(reducer, initialState);

			return {
				...store,
				dispatch(action) {
					const { meta } = action;
					const transitionMetaFunc = meta && meta.transition ?
							meta.transition : null;

					store.dispatch(action);

					const transitionData = transitionMetaFunc ?
						transitionMetaFunc(store.getState(), action) :
						null;

					if (transitionData) {
						const { path, query, replace, state } = transitionData;
						const method = replace ? "replaceState" : "pushState";

						store.history[method](state, path, query);
					}

					return action;
				}
			};
		};
	};
});
