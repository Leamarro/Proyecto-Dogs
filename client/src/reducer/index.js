import { GET_DOGS, GET_DOG_DETAILS, GET_TEMPERAMENTS, ORDER_AL, ORDER_WEIGHT, FILTER, ALL, DB, API } from '../actions/index.js';

const initialState = {
  dogsToShow: [],
  dogDetails: [],
  temperaments: [],
  filtered: [],
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_DOGS:
      if (typeof action.payload[0] != 'string') {
        let pay = [...action.payload];
        pay.forEach((dog) => {
          if (!dog.image && dog.reference_image_id) {
            let image_id = dog.reference_image_id;
            dog.image = `https://cdn2.thedogapi.com/images/${image_id}.jpg`
          } else if (!dog.image && !dog.reference_image_id) {
            dog.image = `https://icon-library.com/images/not-found-icon/not-found-icon-4.jpg`
          }
        });
      }
      return {
        ...state,
        dogsToShow: action.payload,
        filtered: action.payload
      }

    case GET_DOG_DETAILS:
      let found = state.dogsToShow.filter((element) => element.id === Number(action.payload) || element.id === action.payload);
      return {
        ...state,
        dogDetails: found
      }

    case ORDER_AL:

      let filtered = ''
      action.payload === 'ZA' ? filtered = [...state.filtered].sort((b, a) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0;
      }) : filtered = [...state.filtered].sort((a, b) => {
        if (a.name > b.name) return 1
        if (a.name < b.name) return -1
        return 0;
      })
      return {
        ...state,
        filtered: filtered
      }

    case ORDER_WEIGHT:
      console.log(state.filtered)

      let filteredByWeight = [];
      action.payload === 'ASC' ? filteredByWeight= [...state.filtered].sort(function (a, b) {
        let pesoA, pesoB;
        a.weight.imperial ? pesoA = a.weight.imperial : pesoA = a.weight;
        b.weight.imperial ? pesoB = b.weight.imperial : pesoA = b.weight;
        if (parseInt(pesoA) < parseInt(pesoB)) return 1;
        if (parseInt(pesoA) > parseInt(pesoB)) return -1;
        return 0;
      }) : filteredByWeight = [...state.filtered].sort(function (a, b) {
        let pesoA, pesoB;
        a.weight.imperial ? pesoA = a.weight.imperial: pesoA = a.weight;
        b.weight.imperial ? pesoB = b.weight.imperial: pesoA = b.weight;
        if (parseInt(pesoA) > parseInt(pesoB)) return 1;
        if (parseInt(pesoA) < parseInt(pesoB)) return -1;
        console.log('Peso A - mayor a menor', pesoA)
        return 0;
      })
      console.log('filtered by weight reducer: ', filteredByWeight)

      return {
        ...state,
        filtered: filteredByWeight
      }

    case GET_TEMPERAMENTS:
      return {
        ...state,
        temperaments: action.payload
      }

    case FILTER:
      return {
        ...state,
        filtered: action.payload
      }

    case DB:
      return {
        ...state,
        filtered: state.dogsToShow.filter(b => b.id.length > 6).sort()
      }
    case API:
      return {
        ...state,
        filtered: state.dogsToShow.filter(b => typeof b.id === 'number').sort()
      }
    case ALL:
      return {
        ...state,
        filtered: state.dogsToShow
      }

    default:
      return {
        ...state
      };
  }
}