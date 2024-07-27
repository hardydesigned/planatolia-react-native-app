import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import OutlinedButton from "../components/OutlinedButton";

describe("OutlinedButton", () => {
	it("should call handlePress when pressed", () => {
		const handlePress = jest.fn();
		const { getByText } = render(
			<OutlinedButton
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

	it("should be disabled when isLoading is true", () => {
		const handlePress = jest.fn();
		const { getByText } = render(
			<OutlinedButton
				title="Test Button"
				handlePress={handlePress}
				containerStyles=""
				textStyles=""
				isLoading={true}
			/>
		);

		const button = getByText("Test Button");
		fireEvent.press(button);

		expect(handlePress).not.toHaveBeenCalled();
	});

	// Add more tests as needed...
});
