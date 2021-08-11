import {useReducer} from "react";

function handleColor(state, action) {
    const payload = action.payload;
    switch (action.type) {
        case 'header':
            state.header= {bgColor: action.payload?.bgColor, fontColor: action.payload?.fontColor ?? state?.header?.fontColor}
            break;
        case 'mainBody':
            state.mainBody= {bgColor: payload?.bgColor ?? state.mainBody.bgColor, fontColor: payload?.fontColor ?? state.mainBody?.fontColor}
            break;
        case 'sidebar':
            state.sidebar= {bgColor: payload?.bgColor ?? state.sidebar.bgColor, fontColor: payload?.fontColor ?? state.sidebar?.fontColor}
            break;
        default:
            throw new Error("action indéfini : " + action.type)
    }
    return state
}
export const drawerReducer = (initialThemeState) => {
    const [state, dispatch] = useReducer(handleColor, initialThemeState);
    return [ state, dispatch ]
}