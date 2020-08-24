import {
	GET_TASK_SUCCESS,
	TASK_OPEN_FORM_DIALOG,
	TASK_OPEN_DELETE_DIALOG,
	TASK_OPEN_UPDATE_DIALOG,
	DELETE_TASK_SUCCESS,
	TASK_UPDATE_SUCCESS,
	TASK_UPDATE_FAILED,
} from "../types";

const initialState = {
	data: [],
	loading: true,
	error: null,
	openDialog: false,
	openDeleteDialog: false,
	openUpdateDialog: false,
};

const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case GET_TASK_SUCCESS:
			return {
				...state,
				data: action.payload.data,
				loading: false,
			};
		case TASK_OPEN_FORM_DIALOG:
			return { ...state, openDialog: action.payload };
		case TASK_OPEN_DELETE_DIALOG:
			return { ...state, openDeleteDialog: action.payload, openDialog: false };
		case TASK_OPEN_UPDATE_DIALOG:
			return { ...state, openUpdateDialog: action.payload, openDialog: false };
		case DELETE_TASK_SUCCESS:
			return { ...state, openDeleteDialog: false };
		case TASK_UPDATE_SUCCESS:
			return { ...state, openUpdateDialog: false };
		case TASK_UPDATE_FAILED:
			return { ...state, openUpdateDialog: false };
		default:
			return state;
	}
};

export default taskReducer;
