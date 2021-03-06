import { AsyncStorage } from 'react-native'

import { CHARITY_SERVER_URL } from 'react-native-dotenv'

async function isAuthenticated() {
    let userToken

    try {
        userToken = await AsyncStorage.getItem('userToken')
    }catch (error) {
        //failed
        console.log(error)
    }

    //TODO: Validate restored token

    return JSON.parse(userToken)

}

const logOut = async () => {
    try {
        await AsyncStorage.removeItem('userToken')
    }catch (error) {
        console.log(error)
    }
}

//Authenticate user in the server and 
//store retrieved token
const signIn = async (user) => {
    var response = null

    await fetch( CHARITY_SERVER_URL + '/signin', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
		body: JSON.stringify(user)
    }).then( response => 
        response.json()
    ).then( async data => {
        response = data

        if ( !data.error ) //store token
            try {
                await AsyncStorage.setItem('userToken', JSON.stringify(data.token))
            }catch (error){
                console.log(error)
            }
    }).catch( error =>
        console.log(error)
    )

    return response
}

//Register user in the server and store retrieved token
const register = async (user) => {
    var response = null
    
    await fetch( CHARITY_SERVER_URL + '/signup', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
		body: JSON.stringify(user)
    }).then( response => 
        response.json()
    ).then( async data => {
        response = data
        
        if ( !data.error ) //store token: in this case token is userId
            try {
                await AsyncStorage.setItem('userToken', response.token)
            }catch (error){
                console.log(error)
            }
    }).catch( error =>
        console.log(error)
    )

    return response
}

export { isAuthenticated, logOut, signIn, register }