export default function(state = [], action) {
  switch (action.type) {
    case 'FETCH_MESSAGES': {
      return action.payload;
    }
    case 'MESSAGE_CREATED': {
      const stateMessagesList = state.slice(0);
      //slice crea una copia del tableu dans state y modifca la copia y no el tableau directament 
      stateMessagesList.push(action.payload);
      return stateMessagesList;
    }
    default:
      return state;
  }
}
