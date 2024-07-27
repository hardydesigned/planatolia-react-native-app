import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useGlobalContext } from "../context/GlobalProvider";
import { useRouter } from "expo-router";
import WorkPackageItem from "./[item]";

jest.mock("../context/GlobalProvider");

describe("WorkPackageItem", () => {
	it("should render the component", () => {
		const { getByTestId } = render(<WorkPackageItem />);
		expect(getByTestId("workPackageItem")).toBeTruthy();
	});

	it("should save work package when save button is pressed", () => {
		const { getByTestId } = render(<WorkPackageItem />);
		const saveButton = getByTestId("saveButton");

		fireEvent.press(saveButton);

		expect(useGlobalContext().saveWorkPackage).toHaveBeenCalled();
	});

	it("should display error message if required fields are not filled", () => {
		const { getByTestId, getByText } = render(<WorkPackageItem />);
		const saveButton = getByTestId("saveButton");

		fireEvent.press(saveButton);

		expect(getByText("Erst alle Felder ausfüllen!")).toBeTruthy();
	});

	it("should navigate back when close button is pressed", () => {
		const { getByTestId } = render(<WorkPackageItem />);
		const closeButton = getByTestId("closeButton");

		fireEvent.press(closeButton);

		expect(useRouter().back).toHaveBeenCalled();
	});

	// Add more tests for other functionality and scenarios
});
