import React from "react";
import { useDrag } from "react-dnd";
import { useStyles } from "./styles";
import { ItemTypes } from "../../helpers";
import Avatar from "@material-ui/core/Avatar";
import * as icons from "@material-ui/icons";
import { Pentagon } from "../";

export const Box = ({ id, task, openDialog }) => {
	const classes = useStyles();
	const Icon = icons[task.icon];
	const [{ isDragging }, drag] = useDrag({
		item: {
			id,
			_id: task._id,
			left: task.left,
			color: task.color,
			form: task.form,
			top: task.top,
			type: ItemTypes.ELEMENT,
			title: task.title,
			icon: task.icon,
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	if (isDragging) {
		return <div ref={drag} />;
	}

	return (
		<div
			className={classes.box}
			style={{ left: task.left, top: task.top }}
			id={task._id}
		>
			{(() => {
				switch (task.form) {
					case "pentagon":
						return (
							<div ref={drag} onClick={() => openDialog(task)}>
								<Pentagon color={task.color} icon={task.icon} />
							</div>
						);
						break;
					default:
						return (
							<Avatar
								alt={task.title}
								variant={task.form}
								style={{ backgroundColor: task.color }}
								ref={drag}
								onClick={() => openDialog(task)}
							>
								<Icon />
							</Avatar>
						);
				}
			})()}
			{task.title}
		</div>
	);
};
