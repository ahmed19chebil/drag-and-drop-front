import React from "react";
import { ItemTypes } from "../../helpers";
import { Box } from "..";
import { useDrop } from "react-dnd";
import { useStyles } from "./styles";
import Xarrow from "react-xarrows";

export const DragDropZone = ({ tasks, addNewTask, updateTask, openDialog }) => {
	const classes = useStyles();
	const [collectedProps, drop] = useDrop({
		accept: [ItemTypes.TOOL, ItemTypes.ELEMENT],
		drop: (task, monitor) => {
			const delta = monitor.getDifferenceFromInitialOffset();
			const left = delta.x;
			const top = delta.y;
			if (monitor.getItemType() == ItemTypes.TOOL) {
				addNewTask({
					task: {
						title: task.title,
						color: task.color,
						form: task.form,
						left: Math.round(0 + left < 0 ? 0 : left),
						top: Math.round(0 + top < 0 ? 0 : top),
						icon: task.icon,
					},
				});
			} else {
				const newLeft = Math.round(tasks[task.id].left + left);
				const newTop = Math.round(tasks[task.id].top + top);

				tasks[task.id].left = newLeft < 0 ? 0 : newLeft;
				tasks[task.id].top = newTop < 0 ? 0 : newTop;

				updateTask({ task: tasks[task.id] });
			}
		},
	});

	return (
		<div>
			<div className={classes.dropZoneWrapper} ref={drop}>
				{tasks.map((task, key) => {
					return (
						<Box
							task={task}
							openDialog={openDialog}
							id={key}
							key={task.title + "-" + key}
						/>
					);
				})}
				{tasks.map((task, key) => {
					return task.linkedTasks.map((link, index) => {
						return (
							<div>
								<Xarrow start={task._id} end={link._id} label={link.relation} />
							</div>
						);
					});
				})}
			</div>
		</div>
	);
};
