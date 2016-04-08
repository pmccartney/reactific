
import React from "react";
import GameRecord from "records/game_record";
import GameListing from "components/game_listing/game_listing";

import {
	shouldComponentUpdate
} from "react-immutable-render-mixin";

import {
	listOf,
	orderedMapOf
} from "react-immutable-proptypes";

const {
	instanceOf,
	string,
	func
} = React.PropTypes;

export default class GameList extends React.Component {

	static displayName = "GameList";

	static propTypes = {

		// Actions - This are pre-dispatched wrapped, and handed in
		// from the container..or perhaps they are just simple functions.
		// It doesn't matter at this point, and that is a great thing!
		getGames: func.isRequired,
		newGame: func.isRequired,
		editGame: func.isRequired,
		deleteGame: func.isRequired

		// Optional Parameters
		// This will be empty the first time in.
		game: orderedMapOf(
			listOf(
				instanceOf(GameRecord)
			)
		)
	};

	constructor() {
		super();

		//  Override React's shouldComponentUpdate with Immutable's nice ref one.
		this.shouldComponentUpdate = shouldComponentUpdate;
	}

	renderGameList() {
		const {
			games,
			getGames,
			newGame,
			editGame,
			deleteGame
		} = this.props;

		return games.map((game) => {

			const {
				id,
				name,
				system,
				date
			} = game;

			return (
				<GameListing
					id={id}
					name={name}
					system={system}
					date={date}
				/>
			)
		});
	}

	render() {

		return (
			<tbody>
				{this.renderGameList()}
			</tbody>
		);
	}
}
