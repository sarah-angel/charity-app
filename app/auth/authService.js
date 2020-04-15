import { AsyncStorage } from 'react-native'

async function isAuthenticated() {
    let userToken

    try {
        userToken = await AsyncStorage.getItem('userToken')
    }catch (error) {
        //failed
        console.log(error)
    }

    //TODO: Validate restored token

    return userToken

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
const signIn = async (data) => {
    //TODO: authenticate
    //response from the server, .json then return
    var response = 'success'
    try {
        await AsyncStorage.setItem('userToken', 'dummy')
    }catch (error){
        console.log(error)
    }

    return response
}

//Register user in the server and store retrieved token
const register = async (data) => {
    //TODO: server

    try {
        await AsyncStorage.setItem('userToken', 'dummy')
    }catch (error){
        console.log(error)
    }
}

export { isAuthenticated, logOut, signIn, register }