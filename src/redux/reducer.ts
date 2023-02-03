import {
    MONTH_NOW,
    YEAR_NOW,
    MONTH,
    YEAR,
    SHOW_SIDE_BAR
} from "./action";

const initialState : object = {
    monthNow : 1,
    yearNow : '',
    month: 2,
    year : '2023',
    isShowSideBar : true
}

function userReducer(state = initialState, action : any) {
    switch (action.type) {
        case MONTH_NOW:
            return { ...state, monthNow: action.payload };
        case YEAR_NOW:
            return { ...state, yearNow: action.payload };
        case MONTH:
            return { ...state, month: action.payload };
        case YEAR:
            return { ...state, year: action.payload };
        case SHOW_SIDE_BAR:
            return { ...state, isShowSideBar: action.payload };
        default:
            return state;
    }
}

export default userReducer;