import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../helpers";
import Avatar from "@material-ui/core/Avatar";
import { useStyles } from "./styles";
import * as icons from "@material-ui/icons";
import { Pentagon } from "../";

export const TaskTypeItem = ({ title, form, color, icon }) => {
	const classes = useStyles();
	const Icon = icons[icon];

	const [, drag] = useDrag({
		item: {
			type: ItemTypes.TOOL,
			title,
			form,
			color,
			icon,
		},
	});

	return (
		<div>
			{(() => {
				switch (form) {
					case "pentagon":
						return (
							<div ref={drag}>
								{" "}
								<Pentagon color={color} icon={icon} />
							</div>
						);
						break;
					default:
						return (
							<Avatar
								className={classes.avatar}
								alt={title}
								variant={form}
								style={{ backgroundColor: color }}
								ref={drag}
							>
								<Icon />
							</Avatar>
						);
				}
			})()}
		</div>
	);
};
