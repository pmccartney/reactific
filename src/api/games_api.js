
export default {
	getGames(/*{startPage, numberPerPage, sortDirection}*/) {
		//  At this point you probably want to wrap this up in a url server
		// ex url = urlBuilder(GAME_URL, {...params...});
		const url = "/games";

		// Also a good idea is to wrap this up in another ajax service
		// ex: AjaxService.get(url)
		// That way you can change from $.ajax to fetch when you are ready.
		return fetch(url, { method: "get" }).then(function(games) {
			//  Transform the data any way you want, and return what is expected.
			return games;
		});
		//  TODO - Handle error cases.
	}
};
