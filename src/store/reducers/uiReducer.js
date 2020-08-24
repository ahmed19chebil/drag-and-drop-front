import {
	SET_ERRORS,
	CLEAR_ERRORS,
	OPEN_SNACKBAR,
	CLOSE_SNACKBAR,
	CHANGE_DISABLED_DIALOG,
} from "../types";

const initialState = {
	message: "",
	snackbar: false,
	severity: "",
	varaible: "",
	disabledDialog: false,
};

export function ui(state = initialState, action) {
	switch (action.type) {
		case SET_ERRORS:
			return {
				...state,
				loading: false,
				errors: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				errors: null,
			};
		case OPEN_SNACKBAR:
			return {
				...state,
				snackbar: true,
				message: action.payload,
				severity: action.severity,
				varaible: action.varaible,
			};
		case CLOSE_SNACKBAR:
			return {
				...state,
				snackbar: false,
				message: "",
				severity: "",
			};
		case CHANGE_DISABLED_DIALOG:
			return { ...state, disabledDialog: action.payload };
		default:
			return state;
	}
}
export const reducer = (state = initialState, action) => {};
