import * as React from 'react'
//import AsyncStorage from '@react-native-community/async-storage'
import { AsyncStorage } from 'react-native'
import { Text } from 'react-native-paper'

import SignInScreen from './SignInScreen'

const AuthContext = React.createContext()

export default function Auth({navigation}) {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'RESTORE_TOKEN':
                    return {
                        ...prevState,
                        userToken: action.token,
                        isLoading: false,
                    }
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        isSignout: false,
                        userToken: action.token,
                    }
                case 'SIGN_OUT':
                    return {
                        ...prevState,
                        isSignout: true,
                        userToken: null
                    }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
        }
    )

    React.useEffect(() => {
        //Fetch token from storage
        const bootstrapAsync = async () => {
            let userToken

            try {
                userToken = await AsyncStorage.getItem('userToken')
            }catch (error) {
                //failed
                console.log(error)
            }

            //TODO: Validate restored token

            dispatch({type: 'RESTORE_TOKEN', token: userToken})
        }

        bootstrapAsync()
    }, [] )

    const authContext = React.useMemo(
        () => ({
            signIn: async data => {

                try {
                    await AsyncStorage.setItem('userToken', 'dummy')
                }catch (error){
                    console.log(error)
                }

                dispatch({ type: 'SIGN_IN', token: 'dummy'})
            },
            signOut: () => dispatch({ type: 'SIGN_OUT'}),
            register: async data => {

                dispatch({ type: 'SIGN_IN', token: 'dummy'})
            },
        }),
        []
    )

    return (
        <AuthContext.Provider value={authContext}>
            {state.userToken == null ? (
               <SignInScreen AuthContext={AuthContext}/> 
            ) : (
                <Text>I'm in...</Text>
            )}
            
        </AuthContext.Provider>
    )
}