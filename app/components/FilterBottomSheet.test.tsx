import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FilterBottomSheet from "../components/FilterBottomSheet";
import { act } from "react-test-renderer";

describe("FilterBottomSheet", () => {
	const user = {
		projects: ["Project 1", "Project 2"],
		types: ["Type 1", "Type 2"],
		statuses: ["Status 1", "Status 2"],
	};

	it("should render the filter options correctly", () => {
		const { getByText } = render(
			<FilterBottomSheet user={user} filterFunction={() => {}} />
		);

		expect(getByText("Filtern nach Projekt")).toBeTruthy();
		expect(getByText("Project 1")).toBeTruthy();
		expect(getByText("Project 2")).toBeTruthy();
	});

	it("should call filterFunction when a filter option is pressed", () => {
		const filterFunction = jest.fn();
		const { getByText } = render(
			<FilterBottomSheet user={user} filterFunction={filterFunction} />
		);

		fireEvent.press(getByText("Project 1"));

		expect(filterFunction).toHaveBeenCalledWith("Project 1");
	});

	it("should call filterFunction with an empty string when refresh button is pressed", () => {
		const filterFunction = jest.fn();
		const { getByTestId } = render(
			<FilterBottomSheet user={user} filterFunction={filterFunction} />
		);
		fireEvent.press(getByTestId("refreshButton"));
		expect(filterFunction).toHaveBeenCalledWith("");
	});
});
