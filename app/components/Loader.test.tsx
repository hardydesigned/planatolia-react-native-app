import React from "react";
import { render } from "@testing-library/react-native";
import Loader from "../components/Loader";

describe("Loader", () => {
	it("should render null when isLoading is false", () => {
		const { queryByTestId } = render(<Loader isLoading={false} />);
		const loader = queryByTestId("loader");

		expect(loader).toBeNull();
	});

	it("should render the loader when isLoading is true", () => {
		const { getByTestId } = render(<Loader isLoading={true} />);
		const loader = getByTestId("loader");

		expect(loader).toBeDefined();
	});

	it("should render the ActivityIndicator component", () => {
		const { getByTestId } = render(<Loader isLoading={true} />);
		const activityIndicator = getByTestId("activityIndicator");

		expect(activityIndicator).toBeDefined();
	});

	// Add more tests as needed...
});
