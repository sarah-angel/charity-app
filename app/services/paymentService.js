const stripeURL = 'https://api.stripe.com/v1/tokens'
const STRIPE_PUBLIC_KEY = 'pk_test_sHnZDFCFuu6b6sHMaHzolLA100RN8ksrRC'
const paymentURL = 'http://192.168.43.184:8080'

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
    }

    return fetch(stripeURL, {
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
 * @param  cardData 
 */
const saveCardAndPay = (cardData) => {
    return fetch( paymentURL + '/customer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(cardData)
    }).then( response => 
        response.json()
    ).then(response => {
        cardData.stripeCustomerId = response.id
        //save in db
        return pay(cardData)
    }).catch(error => 
        console.log(error)
    )
}

const pay = (cardData) => {
    return fetch( paymentURL + '/charge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(cardData)
    }).then( response => 
        response.json()
    ).catch(error => 
        console.log(error)
    )
}

export { getCreditCardToken, saveCardAndPay, pay }