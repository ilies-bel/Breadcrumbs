import {useReducer} from "react";

interface themeProps {
    fontColor: string
    bgColor: string
    fontWeight: string,
    fontSize: number
}
type theme = { theme: themeProps}

type action = {
    type: string,
    payload: themeProps
}
type state = {
    header: theme,
    mainBody: theme,
    sidebar: theme,
    button: theme,
    inputForm: theme
}

function handleColor(state: state, action: action) {
    const payload = action.payload;
    const inputState: themeProps = state[action.type].theme

    switch (action.type) {
        case 'header':
            return Object.assign({}, state, {header:{ theme: {bgColor: payload?.bgColor ?? inputState.bgColor, fontColor: action.payload?.fontColor ?? inputState?.fontColor}}})
            break;
        case 'mainBody':
            return Object.assign({}, state, {mainBody: { theme: {bgColor: payload?.bgColor ?? inputState.bgColor, fontColor: payload?.fontColor ?? inputState?.fontColor}}})
            break;
        case 'sidebar':
            return Object.assign({}, state, {sidebar: { theme: {bgColor: payload?.bgColor ?? inputState.bgColor, fontColor: payload?.fontColor ?? inputState.fontColor}}})
            break;
        default:
            throw new Error("action indéfini : " + action.type)
    }
    return state
}
export const drawerReducer: any = (initialThemeState: theme) => {
    const [state, dispatch] = useReducer<any>(handleColor, initialThemeState);
    return [ state, dispatch ]
}