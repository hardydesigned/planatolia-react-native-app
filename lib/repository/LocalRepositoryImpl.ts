import { User } from "./@types/User";
import { WorkPackage } from "./@types/WorkPackage";
import IRepository from "./IRepository";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class LocalRepositoryImpl implements IRepository {
	static localRepository: LocalRepositoryImpl = new LocalRepositoryImpl();

	static getInstance(): LocalRepositoryImpl {
		return this.localRepository;
	}

	constructor() {}

	async saveWorkPackage(
		id: number,
		description: string,
		due_date: string,
		start_date: string,
		project: string,
		status: string,
		type: string
	) {
		try {
			if (id === 0) {
				const user = await this.getCurrentUser();

				const proj = user.projects!.find((item) => item === project)!;
				const stat = user.statuses!.find((item) => item === status)!;
				const typ = user.types!.find((item) => item === type)!;

				const wps = await this.getAllWorkPackages();

				const latestId = wps.reduce(
					(acc, item) => Math.max(acc, item.id),
					0
				);

				const workPackage = {
					id: latestId + 1,
					description,
					due_date,
					start_date,
					project: proj,
					status: stat,
					type: typ,
				};

				await AsyncStorage.setItem(
					"workPackage-" + Number(latestId + 1),
					JSON.stringify(workPackage)
				);
			} else {
				const wps = await this.getAllWorkPackages();

				const workPackage = wps.find((item) => item.id === id);

				if (workPackage) {
					const user = await this.getCurrentUser();

					workPackage.description = description;
					workPackage.due_date = due_date;
					workPackage.start_date = start_date;
					workPackage.project = user.projects!.find(
						(item) => item === project
					)!;
					workPackage.status = user.statuses!.find(
						(item) => item === status
					)!;
					workPackage.type = user.types!.find(
						(item) => item === type
					)!;

					await AsyncStorage.mergeItem(
						"workPackage-" + id,
						JSON.stringify(workPackage)
					);
				}
			}
		} catch (error) {
			throw new Error("Failed to save work package locally on Repo");
		}
	}

	async deleteWorkPackage(id: number) {
		try {
			await AsyncStorage.removeItem("workPackage-" + id);
		} catch (error) {
			throw new Error("Failed to delete work package locally.");
		}
	}

	async getAllWorkPackages(): Promise<WorkPackage[]> {
		try {
			const keys = await AsyncStorage.getAllKeys();

			const values = await AsyncStorage.multiGet(keys);

			let wps: any = [];

			values.map((item) => {
				if (item[0].includes("workPackage-")) {
					wps.push(JSON.parse(item[1]?.toString() || ""));
				}
			});

			//await AsyncStorage.clear();

			return wps;
		} catch (e) {
			console.log(e);

			throw new Error("Failed to get work packages locally.");
		}
	}
	async getFilteredWorkPackages(filter: string): Promise<WorkPackage[]> {
		if (filter === "") {
			return await this.getAllWorkPackages();
		}
		const wps = await this.getAllWorkPackages();
		return wps.filter(
			(item) =>
				item.project === filter ||
				item.status === filter ||
				item.type === filter
		);
	}

	async getCurrentUser(): Promise<User> {
		try {
			const values = await AsyncStorage.multiGet([
				"firstName",
				"projects",
				"statuses",
				"types",
			]);

			const projs = JSON.parse(values[1][1]?.toString() || "");
			const stats = JSON.parse(values[2][1]?.toString() || "");
			const typs = JSON.parse(values[3][1]?.toString() || "");

			return {
				firstName: values[0][1]?.toString() || "",
				projects: projs,
				statuses: stats,
				types: typs,
			};
		} catch (error) {
			throw new Error("Failed to getCurrentUser locally on Repo");
		}
	}

	async saveUser(
		firstname: string,
		projects: string[],
		statuses: string[],
		types: string[]
	) {
		try {
			console.log(firstname);

			await AsyncStorage.setItem("firstName", firstname);
			await AsyncStorage.setItem("projects", JSON.stringify(projects));
			await AsyncStorage.setItem("statuses", JSON.stringify(statuses));
			await AsyncStorage.setItem("types", JSON.stringify(types));
		} catch (error) {
			throw new Error("Failed to save work package locally on Repo");
		}
	}
}
