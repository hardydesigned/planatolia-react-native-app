import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import StartPage from "./";
import { useGlobalContext } from "./context/GlobalProvider";
import { projects, statuses, types } from "@/lib/domain/constants/standards";

jest.mock("./context/GlobalProvider", () => ({
	useGlobalContext: jest.fn(),
}));

describe("StartPage", () => {
	beforeEach(() => {
		(useGlobalContext as jest.Mock).mockReturnValue({
			loading: false,
			saveUser: jest.fn(),
			getCurrentUser: jest.fn().mockResolvedValue({ firstName: "" }),
		});
	});

	it("should render welcome message", () => {
		const { getByText } = render(<StartPage />);
		expect(getByText("Willkommen bei Planatolia!")).toBeTruthy();
	});

	it("should navigate to settings page and save user on button press", () => {
		const saveUserMock = jest.fn();
		const replaceMock = jest.fn();
		(useGlobalContext as jest.Mock).mockReturnValue({
			loading: false,
			saveUser: saveUserMock,
			getCurrentUser: jest.fn().mockResolvedValue({ firstName: "" }),
		});
		jest.mock("expo-router", () => ({
			router: {
				replace: replaceMock,
			},
		}));

		const { getByText } = render(<StartPage />);
		fireEvent.press(getByText("Starten"));

		expect(replaceMock).toHaveBeenCalledWith("/settings");
		expect(saveUserMock).toHaveBeenCalledWith(
			"",
			projects,
			statuses,
			types
		);
	});

	it("should navigate to home page if user is already logged in", async () => {
		const replaceMock = jest.fn();
		(useGlobalContext as jest.Mock).mockReturnValue({
			loading: false,
			saveUser: jest.fn(),
			getCurrentUser: jest.fn().mockResolvedValue({ firstName: "John" }),
		});
		jest.mock("expo-router", () => ({
			router: {
				replace: replaceMock,
			},
		}));

		render(<StartPage />);

		expect(replaceMock).toHaveBeenCalledWith("/home");
	});
});
