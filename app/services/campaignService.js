import { CHARITY_SERVER_URL } from 'react-native-dotenv'

const getCampaignsByCategory = (categoryId) => {
    return fetch( CHARITY_SERVER_URL + '/category/' + categoryId + '/campaigns', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json'},
    }).then( response => {
        return response.json()
    }).catch(error => 
        console.log(error)
    )
}

const saveCampaign = (campaign) => {
    return fetch( CHARITY_SERVER_URL + '/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(campaign)
    }).then( response => {
        return response.json()
    }).catch(error => 
        console.log(error)
    )
}

const uploadCampaignLogo = (image) => {
    let data = new FormData()
    data.append('file', {
        uri: image.uri,
        name: image.name,
        type: `image/${image.fileType}`

    } )

    return fetch( CHARITY_SERVER_URL + '/campaign/' + image.campaignId + '/logo' , {
        method: 'POST',
        headers: { 
            'Content-Type': 'multipart/form-data',
            Accept: 'application/json'
        },
        body: data
    }).then( response => {
        return response.json()
    }).catch(error => 
        console.log(error)
    )
}

const getLogo = (campaignId) => {
    return fetch(CHARITY_SERVER_URL + '/campaign/' + campaignId + '/image/logo')
}

export { getCampaignsByCategory, saveCampaign, uploadCampaignLogo, getLogo }