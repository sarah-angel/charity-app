const serverUrl = 'http://192.168.43.184:8081'

const getCampaignsByCategory = (categoryId) => {
    return fetch( serverUrl + '/category/' + categoryId + '/campaigns', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }).then( response => {
        return response.json()
    }).catch(error => 
        console.log(error)
    )
}

export { getCampaignsByCategory }