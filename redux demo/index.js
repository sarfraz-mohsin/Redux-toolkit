const redux = require("redux");
const createStore = redux.legacy_createStore;

const CAKE_ORDERED = "CAKE_ORDERED";

function orderCake() {
  return {
    type: CAKE_ORDERED,
    quantity: 1,
  };
}

const initialState = {
  numOfCakes: 10,
};

//(PreviousState, action) => newState

const reducer = (state = initialState, action) => {
  //This is also application state
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, //This creates a copy of the state object so it does not manipulate the data
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("Initial state", store.getState());

const unsubscribe = store.subscribe(() =>
  //This listener logs the state anytime it changes;
  console.log("Updated state", store.getState())
);

store.dispatch(orderCake());
store.dispatch(orderCake());
store.dispatch(orderCake());

unsubscribe();
