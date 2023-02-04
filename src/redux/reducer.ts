import {
    MONTH_NOW,
    YEAR_NOW,
    MONTH,
    YEAR,
    YEAR_TOUCH,
    MONTH_TOUCH,
    DAY_TOUCH,
    SHOW_SIDE_BAR,
    TRIGER
} from "./action";

const initialState : object = {
    monthNow : 1,
    yearNow : 1,
    month: 1,
    year : 1,
    monthTouch: 1,
    yearTouch : 1,
    dayTouch : 1,
    isShowSideBar : true,
    triger : true
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
        case MONTH_TOUCH:
            return { ...state, monthTouch: action.payload };
        case YEAR_TOUCH:
            return { ...state, yearTouch: action.payload };
        case DAY_TOUCH:
            return { ...state, dayTouch: action.payload };
        case SHOW_SIDE_BAR:
            return { ...state, isShowSideBar: action.payload };
        case TRIGER:
            return { ...state, triger: action.payload };
        default:
            return state;
    }
}

export default userReducer;