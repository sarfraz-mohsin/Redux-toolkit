const redux = require("redux");
const produce = require("immer").produce;

const createStore = redux.legacy_createStore;

//Immer is used to to manage the nested states inside the state

const initialState = {
  name: "sarfraz",
  address: {
    street: "sikroda",
    city: "ghaziabad",
    state: "up",
  },
};

const STREET_UPDATED = "STREET_UPDATED";

function updateStreet(street) {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      //   return {
      //     ...state,
      //     address: {
      //       ...state.address,
      //       street: action.payload,
      //     },
      //   };
      return produce(state, (draft) => {
        //It receives a draft copy of the state
        draft.address.street = action.payload;
      });
    default:
      return state;
  }
};

const store = createStore(reducer);
console.log("initial state ", store.getState());
const unsubscribe = store.subscribe(() =>
  console.log("updated state ", store.getState())
);
store.dispatch(updateStreet("umarMasjid"));

unsubscribe();
