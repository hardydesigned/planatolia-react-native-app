import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FilledButton from "../components/FilledButton";

describe("FilledButton", () => {
	it("should call handlePress when pressed", () => {
		const handlePress = jest.fn();
		const { getByText } = render(
			<FilledButton
				title="Test Button"
				handlePress={handlePress}
				containerStyles=""
				textStyles=""
				isLoading={false}
			/>
		);

		const button = getByText("Test Button");
		fireEvent.press(button);

		expect(handlePress).toHaveBeenCalled();
	});

	it("should display an activity indicator when isLoading is true", () => {
		const handlePress = jest.fn();
		const { getByTestId } = render(
			<FilledButton
				title="Test Button"
				handlePress={handlePress}
				containerStyles=""
				textStyles=""
				isLoading={true}
			/>
		);

		const activityIndicator = getByTestId("activityIndicator");

		expect(activityIndicator).toBeTruthy();
	});
});
