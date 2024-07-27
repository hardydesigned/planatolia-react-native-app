import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import Settings from "./";
import { useGlobalContext } from "./context/GlobalProvider";
import { router } from "expo-router";

jest.mock("./context/GlobalProvider", () => ({
	useGlobalContext: jest.fn(),
}));

describe("Settings", () => {
	const mockUser = {
		firstName: "John",
		projects: ["Project 1", "Project 2"],
		statuses: ["Status 1", "Status 2"],
		types: ["Type 1", "Type 2"],
	};

	beforeEach(() => {
		(useGlobalContext as jest.Mock).mockReturnValue({
			user: mockUser,
			loading: false,
			saveUser: jest.fn(),
		});
	});

	it("should render the settings form", () => {
		const { getByText, getByPlaceholderText } = render(<Settings />);

		expect(getByText("Name")).toBeTruthy();
		expect(getByPlaceholderText("Benutzername")).toBeTruthy();
		expect(getByText("Projekte")).toBeTruthy();
		expect(
			getByPlaceholderText("Projekte (Standard zuerst, kommagetrennt)")
		).toBeTruthy();
		expect(getByText("Aufgabenstatuse")).toBeTruthy();
		expect(
			getByPlaceholderText(
				"Aufgabenstatus (Standard zuerst, kommagetrennt)"
			)
		).toBeTruthy();
		expect(getByText("Aufgabentypen")).toBeTruthy();
		expect(
			getByPlaceholderText(
				"Aufgabentypen (Standard zuerst, kommagetrennt)"
			)
		).toBeTruthy();
		expect(getByText("Speichern")).toBeTruthy();
	});

	it("should update the form input values when user data changes", () => {
		const { getByPlaceholderText } = render(<Settings />);

		expect(getByPlaceholderText("Benutzername")).toBe(mockUser.firstName);
		expect(
			getByPlaceholderText("Projekte (Standard zuerst, kommagetrennt)")
		).toBe(mockUser.projects.join(","));
		expect(
			getByPlaceholderText(
				"Aufgabenstatus (Standard zuerst, kommagetrennt)"
			)
		).toBe(mockUser.statuses.join(","));
		expect(
			getByPlaceholderText(
				"Aufgabentypen (Standard zuerst, kommagetrennt)"
			)
		).toBe(mockUser.types.join(","));
	});

	it("should display an error message if the first name is empty on save", () => {
		const { getByText, getByPlaceholderText } = render(<Settings />);
		const saveButton = getByText("Speichern");

		fireEvent.press(saveButton);

		expect(
			getByText("Bitte gebe zumindest einen Benutzernamen an.")
		).toBeTruthy();
		expect(useGlobalContext().saveUser).not.toHaveBeenCalled();
	});

	it("should save user data and navigate to home on save", () => {
		const { getByText, getByPlaceholderText } = render(<Settings />);
		const saveButton = getByText("Speichern");
		const firstNameInput = getByPlaceholderText("Benutzername");
		const projectsInput = getByPlaceholderText(
			"Projekte (Standard zuerst, kommagetrennt)"
		);
		const statusesInput = getByPlaceholderText(
			"Aufgabenstatus (Standard zuerst, kommagetrennt)"
		);
		const typesInput = getByPlaceholderText(
			"Aufgabentypen (Standard zuerst, kommagetrennt)"
		);

		fireEvent.changeText(firstNameInput, "Jane");
		fireEvent.changeText(projectsInput, "Project 3, Project 4");
		fireEvent.changeText(statusesInput, "Status 3, Status 4");
		fireEvent.changeText(typesInput, "Type 3, Type 4");
		fireEvent.press(saveButton);

		expect(useGlobalContext().saveUser).toHaveBeenCalledWith(
			"Jane",
			["Project 3", "Project 4"],
			["Status 3", "Status 4"],
			["Type 3", "Type 4"]
		);
		expect(router.push).toHaveBeenCalledWith("/home");
	});
});
