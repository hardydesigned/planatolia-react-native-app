import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useGlobalContext } from "./context/GlobalProvider";
import Home from "./home";

jest.mock("./context/GlobalProvider", () => ({
	useGlobalContext: jest.fn(),
}));

describe("Home", () => {
	it("should render loader when loading is true", () => {
		(useGlobalContext as jest.Mock).mockReturnValue({
			user: { firstName: "John" },
			loading: true,
			workPackages: [],
			getAllWorkPackages: jest.fn(),
			getFilteredWorkPackages: jest.fn(),
		});

		const { getByTestId } = render(<Home />);
		expect(getByTestId("loader")).toBeTruthy();
	});

	it("should render user's first name", () => {
		const { getByText } = render(<Home />);
		expect(getByText("Hallo, John!")).toBeTruthy();
	});

	it("should render work packages", () => {
		const { getByText } = render(<Home />);
		expect(getByText("WP1")).toBeTruthy();
		expect(getByText("WP2")).toBeTruthy();
	});

	it("should call getAllWorkPackages on refresh", () => {
		const getAllWorkPackages = jest.fn();
		(useGlobalContext as jest.Mock).mockReturnValue({
			user: { firstName: "John" },
			loading: false,
			workPackages: [],
			getAllWorkPackages,
			getFilteredWorkPackages: jest.fn(),
		});

		const { getByTestId } = render(<Home />);
		fireEvent(getByTestId("flatList"), "refresh");

		expect(getAllWorkPackages).toHaveBeenCalled();
	});

	// Add more tests for other functionalities and scenarios
});
