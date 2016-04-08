
import React from "react";
import { connect, Provider } from "react-redux";
import store from "store/configure_store";

// Boiler Plate eliminator
// Every single Redux container follows this pattern, so it is moved out.

// The best part is that the imported 'store' is primed for logging/routing/etc
export function containerFactory(mapStateToProps, mapDispatchToProps, targetComponent) {
	const Container = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(targetComponent);

	return React.createClass({
		displayName: `${targetComponent.displayName}Container`,

		render() {
			return (
				<Provider store={store()}>
					<Container {...this.props}/>
				</Provider>
			);
		}
	});
}
