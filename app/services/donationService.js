import { CHARITY_SERVER_URL } from 'react-native-dotenv'

const saveDonationDetails = (data) => {
    return fetch( CHARITY_SERVER_URL + '/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then( response => {
        return response.json()
    }).catch(error => 
        console.log(error)
    )
}

const getTotalByUser = (userId) => {
    return fetch( CHARITY_SERVER_URL + '/user/' + userId + '/donations/total', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }).then( response => {
        return response.json()
    }).catch(error => 
        console.log(error)
    )
}

export { saveDonationDetails, getTotalByUser }