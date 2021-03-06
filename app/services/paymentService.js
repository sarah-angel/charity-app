import { saveStripeCustomerId } from './userService'

import { STRIPE_URL, STRIPE_PUBLIC_KEY, PAYMENT_SERVICE_URL } from 'react-native-dotenv'

/**
 * 
 * @param cardData : the credit card data object
 */
const getCreditCardToken = (cardData) => {
    const card = {
        'card[number]': cardData.cardNumber,
        'card[exp_month]': cardData.cardExpiry.split('/')[0],
        'card[exp_year]': cardData.cardExpiry.split('/')[1],
        'card[cvc]': cardData.cardCvc,
        'card[name]': cardData.cardName
    }

    return fetch(STRIPE_URL, {
        method: 'POST',
        headers: {
            Accept: 'application/json', //server format
            'Content-Type': 'application/x-www-form-urlencoded', //stripe format
            Authorization: `Bearer ${STRIPE_PUBLIC_KEY}`
        },
        //Format card data to a string of key-value pairs
        body: Object.keys(card) 
                .map(key => key + '=' + card[key])
                .join('&')    
    }).then( response => 
        response.json()
    ).catch( error =>
        console.log(error)
    )

}

/**
 * Save customer card in stripe
 * Returns stripeCustomerId if card saved successfully
 * Save stripeCustomerId in the database for user
 * then calls pay
 * @param  data 
 */
const saveCard = (data) => {

    return fetch( PAYMENT_SERVICE_URL + '/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then( response => 
        response.json()
    ).then(response => {
        data.stripeCustomerId = data.stripeCustomerId ? data.stripeCustomerId : response.id
        
        //save in db
        var user = {
            id: data.userId,
            stripeCustomerId: data.stripeCustomerId,
        }

        return saveStripeCustomerId(user)

    }).catch(error => 
        console.log(error)
    )

}

//Make payment 
const pay = (data) => {
    return fetch( PAYMENT_SERVICE_URL + '/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then( response => 
        response.json()
    ).catch(error => 
        console.log(error)
    )
}

const getSavedCards = (data) => {
    return fetch( PAYMENT_SERVICE_URL + '/cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then( response => {
        return response.json()
    }).catch(error => 
        console.log(error)
    )
}

export { getCreditCardToken, saveCard, pay, getSavedCards }