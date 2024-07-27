import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import { useFonts } from "expo-font";
import { Alert } from "react-native";
import RootLayout from "./_layout";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SplashScreen } from "expo-router";

jest.mock("expo-font", () => ({
	useFonts: jest.fn(),
}));

jest.mock("react-native", () => ({
	Alert: {
		alert: jest.fn(),
	},
}));

jest.mock("expo", () => ({
	SplashScreen: {
		preventAutoHideAsync: jest.fn(),
		hideAsync: jest.fn(),
	},
}));

describe("RootLayout", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it("should render the component without errors", async () => {
		(useFonts as jest.Mock).mockReturnValue([true, null]);

		const { getByTestId } = render(<GestureHandlerRootView />);

		await waitFor(() => {
			expect(getByTestId("rootLayout")).toBeTruthy();
		});
	});

	it("should show an error alert if there is an error", async () => {
		(useFonts as jest.Mock).mockReturnValue([true, null]);

		const errorMessage = "Test error message";
		const error = true;

		render(<GestureHandlerRootView />);

		await waitFor(() => {
			expect(Alert.alert).toHaveBeenCalledWith("Fehler", errorMessage);
		});
	});

	it("should hide the splash screen after fonts are loaded", async () => {
		(useFonts as jest.Mock).mockReturnValue([true, null]);

		render(<GestureHandlerRootView />);

		await waitFor(() => {
			expect(SplashScreen.hideAsync).toHaveBeenCalled();
		});
	});

	it("should throw an error if there is a font loading error", async () => {
		const fontError = new Error("Test font error");

		(useFonts as jest.Mock).mockReturnValue([false, fontError]);

		expect(() => {
			render(<GestureHandlerRootView />);
		}).toThrow(fontError);
	});

	it("should render null if fonts are not loaded yet", async () => {
		(useFonts as jest.Mock).mockReturnValue([false, null]);

		const { queryByTestId } = render(<GestureHandlerRootView />);

		await waitFor(() => {
			expect(queryByTestId("rootLayout")).toBeNull();
		});
	});

	it("should render null if fonts are not loaded and there is no font error", async () => {
		(useFonts as jest.Mock).mockReturnValue([false, null]);

		const { queryByTestId } = render(<GestureHandlerRootView />);

		await waitFor(() => {
			expect(queryByTestId("rootLayout")).toBeNull();
		});
	});
});
