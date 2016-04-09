
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

	componentDidMount() {
		const {
			getGames
		} = this.props;

		// For the top level components, calling any actions that retrieve
		// data is done in the componentDidMount.
		getGames();
	}

	bindMethods() {
		//  Pre-bind the callbacks.
		//  By doing this, you can set these right into the onClick events.
		//  If you do onClick={{} => this.onEditGame}
		//  then it recreates an anoymous function EVERY time it updates.
		//  With this, you can just do onClick={this.onEditGame}
		this.onNewGame = this.onNewGame.bind(this);
		this.onEditGame = this.onEditGame.bind(this);
		this.onDeleteGame = this.onDeleteGame.bind(this);
	}

	onNewGame(id) {
		// TODO
	}

	onEditGame(id) {
		// TODO
	}

	onDeleteGame(id) {
		// TODO
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
