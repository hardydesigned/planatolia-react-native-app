import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FormField from "../components/FormField";

describe("FormField", () => {
	it("should render the title correctly", () => {
		const title = "Username";
		const { getByText } = render(
			<FormField
				title={title}
				value=""
				placeholder=""
				handleChangeText={() => {}}
			/>
		);

		expect(getByText(title)).toBeTruthy();
	});

	it("should call handleChangeText when input value changes", () => {
		const handleChangeText = jest.fn();
		const { getByPlaceholderText } = render(
			<FormField
				title=""
				value=""
				placeholder="Enter your username"
				handleChangeText={handleChangeText}
			/>
		);

		const input = getByPlaceholderText("Enter your username");
		fireEvent.changeText(input, "testuser");

		expect(handleChangeText).toHaveBeenCalledWith("testuser");
	});

	it("should autofocus the input field if autoFocus prop is true", () => {
		const { getByPlaceholderText } = render(
			<FormField
				title=""
				value=""
				placeholder="Enter your username"
				handleChangeText={() => {}}
			/>
		);

		const input = getByPlaceholderText("Enter your username");

		expect(input.props.autoFocus).toBe(true);
	});
});
