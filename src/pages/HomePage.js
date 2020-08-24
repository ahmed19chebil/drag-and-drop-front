import React, { useEffect, useState } from "react";
import { withI18n } from "react-i18next";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
	DragDropZone,
	ToolsSideBar,
	TaskActionForm,
	CustomDialog,
	TaskEditForm,
	DeleteDialog,
} from "../components";
import { useStyles } from "./styles";
import {
	taskFormDialog,
	fetchTasks,
	taskUpdateDialog,
	taskDeleteDialog,
	addTask,
	deleteTask,
	updatetask,
} from "../store/actions";
import { useDispatch, useSelector } from "react-redux";

/**
 * Component HomePage
 *
 * @component
 *
 * @example
 * return (
 *   <HomePage/>
 * )
 */
function HomePage({ t }) {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.tasks);
	const [taskId, setIdTask] = useState(null);
	const [taskToEdit, setTask] = useState({});

	useEffect(() => {
		dispatch(fetchTasks());
	}, []);

	const classes = useStyles();

	const addNewTask = ({ task }) => {
		dispatch(addTask(task));
	};

	const updateTask = ({ task }) => {
		dispatch(updatetask(task));
	};

	const openTaskDialog = (task) => {
		setTask(task);
		dispatch(taskFormDialog(true));
	};

	const handleCloseDialog = () => {
		dispatch(taskFormDialog(false));
	};

	const openDeleteDialog = () => {
		dispatch(taskDeleteDialog(true));
	};
	const openUpdateDialog = () => {
		dispatch(taskUpdateDialog(true));
	};

	const handleCloseDeleteDialog = () => {
		dispatch(taskDeleteDialog(false));
	};
	const handleCloseUpdateDialog = () => {
		dispatch(taskUpdateDialog(false));
	};
	const handleDeleteTask = () => {
		dispatch(deleteTask(taskToEdit._id));
	};

	const handelUpdateTask = (title, form, icon, color, relations) => {
		dispatch(
			updatetask({
				_id: taskToEdit._id,
				left: taskToEdit.left,
				top: taskToEdit.top,
				title,
				form,
				icon,
				color,
				linkedTasks: relations,
			})
		);
	};

	return (
		<div>
			<DndProvider backend={HTML5Backend}>
				<div className={classes.container}>
					<ToolsSideBar />
					<div className={classes.DropWrapper}>
						<DragDropZone
							tasks={tasks.data}
							addNewTask={addNewTask}
							updateTask={updateTask}
							openDialog={openTaskDialog}
						/>
					</div>
				</div>
			</DndProvider>

			<DeleteDialog
				dialogTitle="common.delete"
				dialogContent="tasks.delete.confirm"
				open={tasks.openDeleteDialog}
				handleClose={handleCloseDeleteDialog}
				handleClickDelete={handleDeleteTask}
			/>

			<CustomDialog
				openDialog={tasks.openUpdateDialog}
				title={"tasks.update.title"}
				handleCloseDialog={handleCloseUpdateDialog}
			>
				<TaskEditForm
					handleClose={handleCloseUpdateDialog}
					textButton="common.save"
					task={taskToEdit}
					handelUpdateTask={handelUpdateTask}
				/>
			</CustomDialog>

			<CustomDialog
				openDialog={tasks.openDialog}
				title={"tasks.dialog.title"}
				handleCloseDialog={handleCloseDialog}
			>
				<TaskActionForm
					deleteTask={openDeleteDialog}
					updateTask={openUpdateDialog}
				/>
			</CustomDialog>
		</div>
	);
}

const connectedHomePage = withI18n()(HomePage); //Higher-Order Component
export { connectedHomePage as HomePage };
