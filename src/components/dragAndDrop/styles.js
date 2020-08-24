import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
	dropZoneWrapper: {
		width: "100%",
		minHeight: "100vh",
		position: "relative",
		overflow: "scroll",
	},
	box: {
		position: "absolute",
		cursor: "move",
		whiteSpace: "nowrap",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
});
