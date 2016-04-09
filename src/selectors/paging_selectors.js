
function pageSizeSelector(state) {
	return state.plans.getIn(["paging", "pageSize"], 0);
}

function totalPagesSelector(state) {
	return state.plans.getIn(["paging", "totalPages"], 0);
}

function totalRecordsSelector(state) {
	return state.plans.getIn(["paging", "totalRecords"], 0);
}

export default {
	pageSizeSelector,
	totalPagesSelector,
	totalRecordsSelector
};
