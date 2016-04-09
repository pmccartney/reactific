
import { OrderedMap } from "immutable";
import { handleActions } from "redux-actions";
import GameRecord from "records/game_record";
import GameStatRecord from "records/game_state_record";

const {
	GAMES_LOADED,
	GAMES_LOADING_CHANGED,
	GAMES_LOADING_FAILED
} = require("actions/game_list_actions").constants;


const initialState = new GameStateRecord();

//  A little immutable helper
function mergeAdditionalFields(state, { loading = false, error = "" } = {}) {
	return state.merge({ loading, error });
}

/*eslint-disable no-redeclare, no-use-before-define*/
export default handleActions({
	[GAMES_LOADING_CHANGED]: (state, { payload }) => mergeAdditionalFields(state, payload),
	[GAMES_LOADING_FAILED]: (state, { payload }) => mergeAdditionalFields(state, payload),
	[GAMES_LOADED]: (state, { payload }) => {
		const { response } = payload;
		let newState = state;

		if (response.data) {
			//  Clear out the current list of games.
			newState = state.setIn(["games"], OrderedMap());

			//  Construct an ordered map of game records we just loaded.
			response.data.forEach((game) => {
				const {
					id,
					name,
					system
				} = game;

				game.id = id;
				game.name = name;
				game.system = system;

				newState = newState.setIn(["games", game.id], new GameRecord(game));
			});
		}

		newState = mergeAdditionalFields(newState, payload);

		return newState;
	}

}, initialState);
