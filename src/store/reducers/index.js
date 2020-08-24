import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import { ui } from "./uiReducer";

const rootReducer = () =>
	combineReducers({
		tasks: taskReducer,
		ui,
	});

export default rootReducer;
