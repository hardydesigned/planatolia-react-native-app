import React from "react";
import { render, fireEvent, renderHook } from "@testing-library/react-native";
import GlobalProvider, { useGlobalContext } from "../context/GlobalProvider";
import LocalRepositoryImpl from "@/lib/repository/LocalRepositoryImpl";

jest.mock("@/lib/repository/LocalRepositoryImpl");

describe("GlobalProvider", () => {
	it("should save work package when saveWorkPackage is called", async () => {
		const { result } = renderHook(() => useGlobalContext());
		const { saveWorkPackage } = result.current;

		await saveWorkPackage(
			1,
			"Description",
			"2022-01-01",
			"2022-01-01",
			"Project 1",
			"Status 1",
			"Type 1"
		);

		expect(
			LocalRepositoryImpl.prototype.saveWorkPackage
		).toHaveBeenCalledWith(
			1,
			"Description",
			"2022-01-01",
			"2022-01-01",
			"Project 1",
			"Status 1",
			"Type 1"
		);
	});

	it("should delete work package when deleteWorkPackage is called", async () => {
		const { result } = renderHook(() => useGlobalContext());
		const { deleteWorkPackage } = result.current;

		await deleteWorkPackage(1);

		expect(
			LocalRepositoryImpl.prototype.deleteWorkPackage
		).toHaveBeenCalledWith(1);
	});

	it("should get all work packages when getAllWorkPackages is called", async () => {
		const { result } = renderHook(() => useGlobalContext());
		const { getAllWorkPackages } = result.current;

		await getAllWorkPackages();

		expect(
			LocalRepositoryImpl.prototype.getAllWorkPackages
		).toHaveBeenCalled();
	});

	it("should get filtered work packages when getFilteredWorkPackages is called", async () => {
		const { result } = renderHook(() => useGlobalContext());
		const { getFilteredWorkPackages } = result.current;

		await getFilteredWorkPackages("filter");

		expect(
			LocalRepositoryImpl.prototype.getFilteredWorkPackages
		).toHaveBeenCalledWith("filter");
	});

	it("should get current user when getCurrentUser is called", async () => {
		const { result } = renderHook(() => useGlobalContext());
		const { getCurrentUser } = result.current;

		await getCurrentUser();

		expect(LocalRepositoryImpl.prototype.getCurrentUser).toHaveBeenCalled();
	});

	it("should save user when saveUser is called", async () => {
		const { result } = renderHook(() => useGlobalContext());
		const { saveUser } = result.current;

		await saveUser("First Name", ["Project 1"], ["Status 1"], ["Type 1"]);

		expect(LocalRepositoryImpl.prototype.saveUser).toHaveBeenCalledWith(
			"First Name",
			["Project 1"],
			["Status 1"],
			["Type 1"]
		);
	});
});
