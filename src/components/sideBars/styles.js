import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles({
	toolWrapper: {
		width: "100px",
		display: "flex",
		alignItems: "center",
		flexDirection: "column",
		borderRight: "2px solid #eceaea",
		boxShadow: "inset 1px 1px 3px #eceaea",
	},
	title: {
		color: "#6dc5f7",
		margin: "15px 0 !important",
	},
});
