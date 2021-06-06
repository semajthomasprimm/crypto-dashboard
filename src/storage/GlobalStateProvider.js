import useGlobalState from "./useGlobalState";
import Context from './context';

export function GlobalStateProvider({children}){
    return <Context.Provider value={useGlobalState()}>{children}</Context.Provider>
}