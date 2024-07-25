import { DataObject } from "./@types/DataObject";
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

				const proj = user.projects!.find(
					(item) => item.value === project
				)!;
				const stat = user.statuses!.find(
					(item) => item.value === status
				)!;
				const typ = user.types!.find((item) => item.value === type)!;

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
						(item) => item.value === project
					)!;
					workPackage.status = user.statuses!.find(
						(item) => item.value === status
					)!;
					workPackage.type = user.types!.find(
						(item) => item.value === type
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

			const wps = values.map((item) => {
				return JSON.parse(item[1]?.toString() || "");
			});

			//await AsyncStorage.clear();

			return wps;
		} catch (e) {
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
				item.project.value === filter ||
				item.status.value === filter ||
				item.type.value === filter
		);
	}

	async getCurrentUser(): Promise<User> {
		const values = await AsyncStorage.multiGet([
			"firstName",
			"theme",
			"url",
			"apiKey",
			"projects",
			"statuses",
			"types",
		]);

		const projs = JSON.parse(values[4][1]?.toString() || "");
		const stats = JSON.parse(values[5][1]?.toString() || "");
		const typs = JSON.parse(values[6][1]?.toString() || "");

		return {
			firstName: values[0][1]?.toString() || "",
			theme: values[1][1]?.toString() || "",
			url: values[2][1]?.toString() || "",
			apiKey: values[3][1]?.toString() || "",
			projects: projs,
			statuses: stats,
			types: typs,
			projectDefault: projs[0],
			typeDefault: typs[0],
			statusDefault: stats[0],
		};
	}

	async saveUser(
		firstname: string,
		theme: string,
		apiKey: string,
		url: string,
		projects: DataObject[],
		statuses: DataObject[],
		types: DataObject[],
		projectDefault: DataObject,
		typeDefault: DataObject,
		statusDefault: DataObject
	) {
		try {
			await AsyncStorage.setItem("firstName", firstname);
			await AsyncStorage.setItem("theme", theme);
			await AsyncStorage.setItem("apiKey", apiKey);
			await AsyncStorage.setItem("url", url);
			await AsyncStorage.setItem("projects", JSON.stringify(projects));
			await AsyncStorage.setItem("statuses", JSON.stringify(statuses));
			await AsyncStorage.setItem("types", JSON.stringify(types));
			await AsyncStorage.setItem(
				"projectDefault",
				JSON.stringify(projectDefault)
			);
			await AsyncStorage.setItem(
				"typeDefault",
				JSON.stringify(typeDefault)
			);
			await AsyncStorage.setItem(
				"statusDefault",
				JSON.stringify(statusDefault)
			);
		} catch (error) {
			throw new Error("Failed to save work package locally on Repo");
		}
	}
}
