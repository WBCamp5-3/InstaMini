import {GET_ERRORS} from '../actions/types';

const initialState={};

// optional to use spread since we don't need to keep track of changes in errors
export default function(state=initialState, action){
  switch (action.type){
    case GET_ERRORS:
      return action.payload; //data returned to store (not dispatcher)
    default:
      return state; //when app first runs, initial state is empty
  }
}