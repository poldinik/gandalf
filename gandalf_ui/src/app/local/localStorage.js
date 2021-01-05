// Pass in Redux store's state to save it to the user's browser local storage
import {getCurrentTime} from "../redux/appReducer";
import release from './release-id.js';

export const saveLocalState = (state) =>
{
    try
    {
        state.last = getCurrentTime();
        const serializedState = JSON.stringify(state);
        localStorage.setItem('mrdrill-state' + release.id, serializedState);
    }
    catch
    {
        // We'll just ignore write errors
    }
};

export const refreshLocalState = () => {

    return new Promise((resolve, reject) => {
        try
        {
            localStorage.clear();
            location.replace("/");
            resolve(true);
        }
        catch
        {
            reject(false);
        }
    });
}

// Loads the state and returns an object that can be provided as the
// preloadedState parameter of store.js's call to configureStore
export const loadLocalState = () =>
{
    try
    {
        const serializedState = localStorage.getItem('mrdrill-state' + release.id);
        if (serializedState === null)
        {
            return undefined;
        }
        return JSON.parse(serializedState);
    }
    catch (error)
    {
        return undefined;
    }
};
