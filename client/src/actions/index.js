import axios from 'axios'

export const GET_DOGS = 'GET_DOGS', ORDER_WEIGHT='ORDER WEIGHT', GET_TEMPERAMENTS = 'GET_TEMPERAMENTS', GET_DOG_DETAILS = 'GET_DOG_DETAILS', ALL = "ALL", DB = "DB", API="API", ORDER_AL = 'ORDER_AL', FILTER = 'FILTER';


export let getDogs = (dog) => {

    return (dispatch) => {
        let url = 'http://localhost:3001/dogs';
        if (dog) {
            url = `http://localhost:3001/dogs?name=${dog}`
        }
        return axios.get(url)
            .then((dogRes) => {
                dispatch({
                    type: GET_DOGS,
                    payload: dogRes.data
                });
            });
    }
}

export let getDogDetails = (id) => {

    return function (dispatch) {
        dispatch({
            type: GET_DOG_DETAILS,
            payload: id
        });
    };
}

export function getTemperaments() {
    return (dispatch) => {
        return axios.get('http://localhost:3001/temperaments')
            .then((temps) => {
                dispatch({
                    type: GET_TEMPERAMENTS,
                    payload: temps.data
                });
            });
    }
}

export let getZA = () => {
    return (dispatch) => {
        return dispatch({
            type: ORDER_AL,
            payload: 'ZA'
        })
    }
};
export let getAZ = () => {
    return (dispatch) => {
        return dispatch({
            type: ORDER_AL,
            payload: 'AZ'
        })
    }
};
export let getWeight = (order) => {
    return (dispatch) => {
        return dispatch({
            type: ORDER_WEIGHT,
            payload: order
        })
    }
};
export function filterTemp(array) {
    return {
        type: FILTER,
        payload: array
    }
  }
export let getSource = (value) => {
    if (value === DB) {
        return {
            type: DB,
        };
    } else if (value === API) {
        return {
            type: API,
        };
    } else if (value === ALL) {
        return {
            type: ALL,
        };
    }
}

