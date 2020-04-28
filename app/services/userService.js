import { CHARITY_SERVER_URL } from 'react-native-dotenv'

/**
 * 
 * @param userId 
 */
const getStripeCustomerId = (userId) => {
    return fetch(CHARITY_SERVER_URL + '/user/' + userId, {
        method: 'GET',
        headers: {
            Accept: 'application/json', //server format
            'Content-Type': 'application/json', 
        },  
    }).then( response => {
        return response.json()
    }).catch( error =>
        console.log(error)
    )

}

/**
 * 
 * @param data 
 * @param data.userId
 * @param data.stripeCustomerId
 */
const saveStripeCustomerId = (data) => {
    return fetch(CHARITY_SERVER_URL + '/user/update/stripeCustomerId', {
        method: 'POST',
        headers: {
            Accept: 'application/json', //server format
            'Content-Type': 'application/json', 
        },  
        body: JSON.stringify(data)
    }).then( response => 
        response.json()
    ).catch( error =>
        console.log(error)
    )
}


const getUserDetails = (userId) => {
    return fetch(CHARITY_SERVER_URL + '/user/' + userId, {
        method: 'GET',
        headers: {
            Accept: 'application/json', //server format
            'Content-Type': 'application/json', 
        },  
    }).then( response => {
        return response.json()
    }).catch( error =>
        console.log(error)
    )

}
export { getStripeCustomerId, saveStripeCustomerId, getUserDetails }