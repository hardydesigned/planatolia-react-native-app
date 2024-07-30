import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FloatingActionButton from "../components/FAB";

describe("FloatingActionButton", () => {
	it("should call handlePress when pressed", () => {
		const handlePress = jest.fn();
		const { getByTestId } = render(
			<FloatingActionButton handlePress={handlePress} />
		);

		const button = getByTestId("floatingActionButton");
		fireEvent.press(button);

		expect(handlePress).toHaveBeenCalled();
	});

	it("should render the Ionicons component", () => {
		const handlePress = jest.fn();

		const { getByTestId } = render(
			<FloatingActionButton handlePress={handlePress} />
		);
		const ionicons = getByTestId("ionicons");

		expect(ionicons).toBeDefined();
	});
});
