
import keyMirror from "fbjs/lib/keyMirror";
import GamesApi from "api/games_api";
import { createAction } from "redux-actions";

//  TODO _ Move these contstants out.
export const constants = keyMirror({
	GAMES_LOADED: null,
	GAMES_LOADING_CHANGED: null,
	GAMES_LOADING_FAILED: null
});

const {
	GAMES_LOADED,
	GAMES_LOADING_CHANGED,
	GAMES_LOADING_FAILED
} = constants;

const changeLoadingTo = createAction(GAMES_LOADING_CHANGED, (bool) => {
	return { loading: bool };
});

const loadGamesSuccess = createAction(GAMES_LOADED, (response = {}) => {
	return {
		error: "",
		loading: false,
		response
	};
});

const loadGamesFailed = createAction(GAMES_LOADING_FAILED, (error) => {
	return {
		error,
		loading: false
	};
});

export function loadGames({ pageNumber, pageSize, sortDirection }) {
	return function dispatchLoadGames(dispatch) {
		dispatch(changeLoadingTo(true));

		GamesApi.getGames({ pageNumber, pageSize, sortDirection })
		.then((response) => {
			dispatch(
				loadGamesSuccess(response)
			);
		})
		.fail(() => {
			dispatch(
				loadGamesFailed("Failed to load games.")
			);
		});
	};
}
