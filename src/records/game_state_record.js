
import { Record } from "immutable";
import { OrderedMap } from "immutable";
import PagingRecord from "records/paging_record";

//  XXXX_STATE_RECORDS are used to help initiatlize the state of the store
//  for a particular key.
export default Record({
	error: "",
	loading: false,
	games: OrderedMap(),
	paging: new PagingRecord()
	},
	"GameState"
);
