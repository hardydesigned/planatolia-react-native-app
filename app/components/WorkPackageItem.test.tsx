import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import WorkPackageItem from "../components/WorkPackageItem";

describe("WorkPackageItem", () => {
	const workPackage = {
		id: 1,
		description: "Description 1",
		project: "Project 1",
		status: "Offen",
		type: "Type 1",
		start_date: "2021-01-01",
		due_date: "2021-01-02",
	};

	it("should render the work package details correctly", () => {
		const { getByText } = render(
			<WorkPackageItem workPackage={workPackage} handlePress={() => {}} />
		);

		expect(getByText("Project 1")).toBeTruthy();
		expect(getByText("Type 1")).toBeTruthy();
		expect(getByText("Description 1")).toBeTruthy();
	});

	it("should call handlePress when pressed", () => {
		const handlePress = jest.fn();
		const { getByTestId } = render(
			<WorkPackageItem
				workPackage={workPackage}
				handlePress={handlePress}
			/>
		);

		const item = getByTestId("workPackageItem");
		fireEvent.press(item);

		expect(handlePress).toHaveBeenCalled();
	});
});
