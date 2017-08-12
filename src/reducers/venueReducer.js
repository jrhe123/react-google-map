import constants from '../constants';

var initialState = {
	test: null,


	selectedVenue: null
}

export default (state = initialState, action) => {

	// copy the original state
	let newState = Object.assign({}, state)

	switch(action.type){

		// TEST
		case constants.TEST:
			console.log('In reducer: received');
			newState['test'] = action.data;
			return newState;





		case constants.SELECT_VENUE:
			console.log('In reducer: received');
			newState['selectedVenue'] = action.data;
			return newState;



		default:
			return state;
	}

}