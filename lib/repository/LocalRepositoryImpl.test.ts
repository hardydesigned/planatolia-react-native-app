import LocalRepositoryImpl from "./LocalRepositoryImpl";
import AsyncStorage from "@react-native-async-storage/async-storage";

jest.mock("@react-native-async-storage/async-storage");

describe("LocalRepositoryImpl", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe("getAllWorkPackages", () => {
		it("should return an empty array if no work packages are stored", async () => {
			(AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue([]);
			(AsyncStorage.multiGet as jest.Mock).mockResolvedValue([]);

			const repository = new LocalRepositoryImpl();
			const result = await repository.getAllWorkPackages();

			expect(result).toEqual([]);
			expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
			expect(AsyncStorage.multiGet).not.toHaveBeenCalled();
		});

		it("should return an array of work packages if they are stored", async () => {
			const keys = ["workPackage-1", "workPackage-2"];
			const values = [
				[
					"workPackage-1",
					JSON.stringify({ id: 1, description: "Work Package 1" }),
				],
				[
					"workPackage-2",
					JSON.stringify({ id: 2, description: "Work Package 2" }),
				],
			];

			(AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue(keys);
			(AsyncStorage.multiGet as jest.Mock).mockResolvedValue(values);

			const repository = new LocalRepositoryImpl();
			const result = await repository.getAllWorkPackages();

			expect(result).toEqual([
				{ id: 1, description: "Work Package 1" },
				{ id: 2, description: "Work Package 2" },
			]);
			expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
			expect(AsyncStorage.multiGet).toHaveBeenCalledWith(keys);
		});

		it("should ignore keys that do not start with 'workPackage-'", async () => {
			const keys = ["workPackage-1", "workPackage-2", "otherKey"];
			const values = [
				[
					"workPackage-1",
					JSON.stringify({ id: 1, description: "Work Package 1" }),
				],
				[
					"workPackage-2",
					JSON.stringify({ id: 2, description: "Work Package 2" }),
				],
				[
					"otherKey",
					JSON.stringify({ id: 3, description: "Other Key" }),
				],
			];

			(AsyncStorage.getAllKeys as jest.Mock).mockResolvedValue(keys);
			(AsyncStorage.multiGet as jest.Mock).mockResolvedValue(values);

			const repository = new LocalRepositoryImpl();
			const result = await repository.getAllWorkPackages();

			expect(result).toEqual([
				{ id: 1, description: "Work Package 1" },
				{ id: 2, description: "Work Package 2" },
			]);
			expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
			expect(AsyncStorage.multiGet).toHaveBeenCalledWith(keys);
		});

		it("should handle errors and throw an error", async () => {
			(AsyncStorage.getAllKeys as jest.Mock).mockRejectedValue(
				new Error("AsyncStorage error")
			);

			const repository = new LocalRepositoryImpl();

			await expect(repository.getAllWorkPackages()).rejects.toThrowError(
				"Failed to get work packages locally."
			);
			expect(AsyncStorage.getAllKeys).toHaveBeenCalled();
			expect(AsyncStorage.multiGet).not.toHaveBeenCalled();
		});
	});
});
