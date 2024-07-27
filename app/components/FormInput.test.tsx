import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FormInput from "../components/FormInput";

describe("FormInput", () => {
	it("should render with initial text and placeholder", () => {
		const initialText = "Hello";
		const placeholder = "Enter text";
		const setTextInput = jest.fn();

		const { getByPlaceholderText } = render(
			<FormInput
				initialText={initialText}
				placeholder={placeholder}
				setTextInput={setTextInput}
			/>
		);

		const input = getByPlaceholderText(placeholder);
		expect(input.props.value).toBe(initialText);
	});

	it("should call setTextInput when text is changed", () => {
		const setTextInput = jest.fn();

		const { getByPlaceholderText } = render(
			<FormInput setTextInput={setTextInput} />
		);

		const input = getByPlaceholderText("Enter text");
		const newText = "New Text";

		fireEvent.changeText(input, newText);

		expect(setTextInput).toHaveBeenCalledWith(newText);
	});
});
