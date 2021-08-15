import {useReducer} from "react";

interface themeProps {
    fontColor: string
    bgColor: string
    fontWeight: string,
    fontSize: number
}

type action = {
    type: string,
    payload: themeProps
}
type state = {
    header: themeProps,
    mainBody: themeProps,
    sidebar: themeProps,
    button: themeProps,
    inputForm: themeProps
}

function handleColor(state: state, action: action) {
    const payload = action.payload;
    switch (action.type) {
        case 'header':
            return Object.assign({}, state, {header: {bgColor: action.payload?.bgColor, fontColor: action.payload?.fontColor ?? state?.header?.fontColor}})
            break;
        case 'mainBody':
            return Object.assign({}, state, {mainBody: {bgColor: payload?.bgColor ?? state.mainBody.bgColor, fontColor: payload?.fontColor ?? state.mainBody?.fontColor}})
            break;
        case 'sidebar':
            return Object.assign({}, state, {sidebar: {bgColor: payload?.bgColor ?? state.sidebar.bgColor, fontColor: payload?.fontColor ?? state.sidebar?.fontColor}})
            break;
        default:
            throw new Error("action indéfini : " + action.type)
    }
    return state
}
export const drawerReducer: any = (initialThemeState: themeProps) => {
    const [state, dispatch] = useReducer<any>(handleColor, initialThemeState);
    return [ state, dispatch ]
}