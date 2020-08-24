import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../../helpers";
import Avatar from "@material-ui/core/Avatar";
import { useStyles } from "./styles";
import * as icons from "@material-ui/icons";

export const Pentagon = ({ color, icon }) => {
	const classes = useStyles();
	const Icon = icons[icon];

	return (
		<div className="pentagen-container">
			<svg viewBox="0 0 120 100" className="entagen-svg">
				<path
					fill={color}
					d="M38,2 
           L82,2 
           A12,12 0 0,1 94,10 
           L112,44 
           A12,12 0 0,1 112,56
           L94,90       
           A12,12 0 0,1 82,98
           L38,98
           A12,12 0 0,1 26,90
           L8,56
           A12,12 0 0,1 8,44
           L26,10
           A12,12 0 0,1 38,2"
				/>
			</svg>
			<Icon className="pentagen-icon" />
		</div>
	);
};
