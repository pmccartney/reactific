
import React from "react";

//  Each row of the game listing table can be a stateless component.

//  Defining functions inline for events can lead to rebinding on
//  each update.  However, since we are binding to id, and this is
//  pretty simple case, we go ahead and do it.
const GameListing = ({
	game: {
		id,
		name,
		year,
	system
	},
	onOpenDetails
}) => (
	<tr className="game-row">

		<td className="game-name" onClick={() => {onOpenDetails(id);}}>
			{name}
		</td>

		<td className="game-year">
			{year}
		</td>

		<td className="game-system" >
			{system}
		</td>
	</tr>
);

export default GameListing;
