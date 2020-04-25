const serverUrl = 'http://192.168.43.184:8081'

const saveDonationDetails = (data) => {
    return fetch( serverUrl + '/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then( response => {
        return response.json()
    }).catch(error => 
        console.log(error)
    )
}

export { saveDonationDetails }