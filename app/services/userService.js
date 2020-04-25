const serverUrl = 'http://192.168.43.184:8081'

/**
 * 
 * @param userId 
 */
const getStripeCustomerId = (userId) => {
    return fetch(serverUrl + '/user/' + userId, {
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
    return fetch(serverUrl + '/user/update/stripeCustomerId', {
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
    return fetch(serverUrl + '/user/' + userId, {
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