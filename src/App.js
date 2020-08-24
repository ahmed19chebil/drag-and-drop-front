import React, { Component } from "react";
import { Route } from "react-router-dom";
import { SnackBar } from "./components";
import { HomePage } from "./pages/HomePage";

class App extends Component {
	render() {
		return (
			<div>
				<SnackBar />
				<Route component={HomePage} />
			</div>
		);
	}
}
export default App;
