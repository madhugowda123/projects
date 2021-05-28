export default (state, action) => {
    switch(action.type) {
      // to delete transaction action
      case 'DELETE_TRANSACTION':
        return {
          ...state,//holding old transaction
          transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
        }
        // to add transaction action
      case 'ADD_TRANSACTION':
        return {
          ...state,//holding old transaction
          transactions: [action.payload, ...state.transactions]
        }
      default:
        return state;
    }
  }