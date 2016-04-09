
import { createSelector } from "reselect";

import {
	pageSizeSelector,
	totalPagesSelector,
	totalRecordsSelector
} from "selectors/paging_selectors";

function gameListLoadingSelector(state) {
	return state.games.loading;
}

function gameListErrorSelector(state) {
	return state.games.error;
}

function gameListGamesSelector(state) {
	return state.games.games.toList();
}

function sortColumnSelector(state) {
	return state.router.location.query.column;
}

function sortDirectionSelector(state) {
	return state.router.location.query.direction;
}

function queryStatusSelector(state) {
	return state.router.location.query.status;
}

function querySearchTextSelector(state) {
	return state.router.location.query.search;
}

function filtersSelector(state) {
	return state.games.filters;
}

export default createSelector([
		gameListErrorSelector,
		gameListLoadingSelector,
		gameListGamesSelector,
		sortColumnSelector,
		sortDirectionSelector,
		pageSizeSelector,
		totalPagesSelector,
		totalRecordsSelector
	], function mapStateToProps(
			error,
			loading,
			games,
			sortColumn,
			sortDirection,
			pageSize,
			totalPages,
			totalRecords
		) {
		return {
			error,
			loading,
			games,
			sortColumn,
			sortDirection,
			pageSize,
			totalPages,
			totalRecords
		};
	}
);
