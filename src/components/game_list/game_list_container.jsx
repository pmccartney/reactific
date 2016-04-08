import GameList from "components/game_list/game_list";

//  Redux
import GameListSelector from "selectors/game_list_selector";
import { bindActionCreators } from "redux";
import { containerFactory } from "helpers/redux_helpers";

import {
	newGame,
	editGame,
	deleteGame,
	getGames
} from "actions/game_actions";

// The container calls containerFactory.
// All it is doing is calling connect and settign up the Provider with the
// given component.

// The important thing here is calling bindActionCreators.
// This pre-wraps the actios with dispatch so you don't have to
// introduce middleware, and huge switches for all your actions.
// All actions passed in here will be seen as simple functions to the
// given component.
export default containerFactory(GameListSelector, (dispatch) => {
	return bindActionCreators({
		getGames,
		newGame,
		editGame,
		deleteGame
	}, dispatch);
}, GameList);
