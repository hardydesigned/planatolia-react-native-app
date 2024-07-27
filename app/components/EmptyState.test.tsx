import React from "react";
import { render } from "@testing-library/react-native";
import { Ionicons } from "@expo/vector-icons";
import EmptyState from "@/app/components/EmptyState";

describe("EmptyState", () => {
	const mockTitle = "No Data Available";
	const mockSubtitle = "Please check back later.";

	it("renders correctly with given title and subtitle", () => {
		const { getByText } = render(
			<EmptyState title={mockTitle} subtitle={mockSubtitle} />
		);
		expect(getByText(mockTitle)).toBeTruthy();
		expect(getByText(mockSubtitle)).toBeTruthy();
	});
});
