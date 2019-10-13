import React, { useEffect, createContext, useState } from 'react'
import { getLocalStorage, updateLocalStorage } from './UsefulFunctions'


interface AuthState {
    isSignedIn: boolean
    token: string
    user: string
};

interface AuthContextState {
    state: AuthState,
    signIn: Function,
    signOut: Function
};

const falseState: AuthState = {
    isSignedIn: false,
    token: "",
    user: ""
};

export const AuthContext = createContext<AuthContextState>({
    state: falseState,
    signIn: () => {},
    signOut: () => {}
});

const Authentication = ({children}) => {
    
    const [state, setState] = useState(getLocalStorage('authState', falseState));

    const signIn = (user: string, token: string) => {
        if (confirmSignIn(user, token)){

        } else {
            setState({...falseState, isSignedIn: false});
        }
    };

    const confirmSignIn = (user: string, token: string): boolean => {
        return true;
    }

    const signOut = () => {
      setState(falseState);
    }

    useEffect(() => {
        updateLocalStorage('authState', state);
    }, [state])

    return (
      <AuthContext.Provider value={{ ...state, signOut, signIn }}>
        {children}
      </AuthContext.Provider >
    )
  }

  export default Authentication;