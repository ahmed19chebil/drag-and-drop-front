import {
	OPEN_SNACKBAR,
	GET_TASK_SUCCESS,
	GET_TASK_FAILED,
	TASK_OPEN_FORM_DIALOG,
	TASK_OPEN_UPDATE_DIALOG,
	TASK_OPEN_DELETE_DIALOG,
	ADD_TASK_FAILED,
	CHANGE_DISABLED_DIALOG,
	DELETE_TASK_SUCCESS,
	TASK_UPDATE_SUCCESS,
	TASK_UPDATE_FAILED,
} from "../types";

import { ENDPOINT_TASK } from "../../helpers/endPoint";

import { methodsServices } from "../services";

/**
 * Action Creator to get all tasks
 */
export function fetchTasks() {
	return (dispatch) => {
		let apiEndpoint = ENDPOINT_TASK;

		methodsServices
			.get(apiEndpoint)
			.then((response) => {
				dispatch({
					type: GET_TASK_SUCCESS,
					payload: response.data,
				});
			})
			.catch((error) => {
				dispatch({
					type: OPEN_SNACKBAR,
					payload: error,
					severity: "error",
				});
				dispatch({ type: GET_TASK_FAILED });
			});
	};
}

/**
 * Action Creator to add a new task
 */
export function addTask(task) {
	return (dispatch) => {
		let apiEndpoint = ENDPOINT_TASK;

		methodsServices
			.post(apiEndpoint, task)
			.then(() => {
				dispatch(fetchTasks());
			})
			.catch((error) => {
				dispatch({
					type: OPEN_SNACKBAR,
					payload: error,
					severity: "error",
				});
				dispatch({ type: ADD_TASK_FAILED });
			});
	};
}

/**
 * Action Creator to update a task
 */
export function updatetask(task) {
	return (dispatch) => {
		dispatch({ type: CHANGE_DISABLED_DIALOG, payload: true });
		let apiEndpoint = `${ENDPOINT_TASK}/${task._id}`;

		methodsServices
			.put(apiEndpoint, task)
			.then(() => {
				dispatch(fetchTasks());
				dispatch({ type: CHANGE_DISABLED_DIALOG, payload: false });
				dispatch({ type: TASK_UPDATE_SUCCESS });
			})
			.catch((error) => {
				dispatch({
					type: OPEN_SNACKBAR,
					payload: error,
					severity: "error",
				});
				dispatch({ type: CHANGE_DISABLED_DIALOG, payload: false });
				dispatch({ type: TASK_UPDATE_FAILED });
			});
	};
}

/**
 * Action Creator to delete a task
 */
export function deleteTask(taskId) {
	return (dispatch) => {
		dispatch({ type: CHANGE_DISABLED_DIALOG, payload: true });
		let apiEndpoint = `${ENDPOINT_TASK}/${taskId}`;
		methodsServices
			.deleteDetail(apiEndpoint)
			.then((response) => {
				dispatch(fetchTasks());
				dispatch({ type: DELETE_TASK_SUCCESS });
				dispatch({
					type: OPEN_SNACKBAR,
					payload: "tasks.deleted.success",
					severity: "success",
				});
				dispatch({ type: CHANGE_DISABLED_DIALOG, payload: false });
			})
			.catch((error) => {
				dispatch({
					type: OPEN_SNACKBAR,
					payload: error,
					severity: "error",
				});

				dispatch({ type: CHANGE_DISABLED_DIALOG, payload: false });
			});
	};
}

/**
 * Action Creator to open and close the Form dialog (tasks)
 *
 * @param {boolean} value
 *
 * @returns an action
 */
export const taskFormDialog = (value) => {
	return {
		type: TASK_OPEN_FORM_DIALOG,
		payload: value,
	};
};

/**
 * Action Creator to open and close the delete dialog (tasks)
 *
 * @param {boolean} value
 *
 * @returns an action
 */
export const taskDeleteDialog = (value) => {
	return {
		type: TASK_OPEN_DELETE_DIALOG,
		payload: value,
	};
};

/**
 * Action Creator to open and close the update dialog (tasks)
 *
 * @param {boolean} value
 *
 * @returns an action
 */
export const taskUpdateDialog = (value) => {
	return {
		type: TASK_OPEN_UPDATE_DIALOG,
		payload: value,
	};
};
