import { OpenProjectData } from "./@types/OpenProjectData";
import { OpenProjectDataObject } from "./@types/OpenProjectDataObject";
import { User } from "./@types/User";
import { WorkPackage } from "./@types/WorkPackage";
import IRepository from "./IRepository";

export default class OpenProjectRepositoryImpl implements IRepository {
	static localRepository: OpenProjectRepositoryImpl =
		new OpenProjectRepositoryImpl();

	static getInstance(): OpenProjectRepositoryImpl {
		return this.localRepository;
	}

	private projects: OpenProjectDataObject[] = [
		{ id: 1, value: "Project 1" },
		{ id: 2, value: "Project 2" },
		{ id: 3, value: "Project 3" },
	];

	private statuses: OpenProjectDataObject[] = [
		{ id: 1, value: "Status 1" },
		{ id: 2, value: "Status 2" },
		{ id: 3, value: "Status 3" },
	];

	private types: OpenProjectDataObject[] = [
		{ id: 1, value: "Type 1" },
		{ id: 2, value: "Type 2" },
		{ id: 3, value: "Type 3" },
	];

	private workPackages: WorkPackage[] = [
		{
			id: 1,
			description: "Work Package 1",
			due_date: "2021-01-01",
			created_at: "2021-01-01",
			updated_at: "2021-01-01",
			start_date: "2021-01-01",
			project: this.projects[0],
			status: this.statuses[0],
			type: this.types[0],
		},
		{
			id: 2,
			description: "Work Package 2",
			due_date: "2021-01-02",
			created_at: "2021-01-02",
			updated_at: "2021-01-02",
			start_date: "2021-01-02",
			project: this.projects[1],
			status: this.statuses[1],
			type: this.types[1],
		},
		{
			id: 3,
			description: "Work Package 3",
			due_date: "2021-01-03",
			created_at: "2021-01-03",
			updated_at: "2021-01-03",
			start_date: "2021-01-03",
			project: this.projects[1],
			status: this.statuses[2],
			type: this.types[3],
		},
		{
			id: 4,
			description: "Work Package 4",
			due_date: "2021-01-04",
			created_at: "2021-01-04",
			updated_at: "2021-01-04",
			start_date: "2021-01-04",
			project: this.projects[2],
			status: this.statuses[2],
			type: this.types[2],
		},
		{
			id: 5,
			description: "Work Package 5",
			due_date: "2021-01-05",
			created_at: "2021-01-05",
			updated_at: "2021-01-05",
			start_date: "2021-01-05",
			project: this.projects[1],
			status: this.statuses[0],
			type: this.types[1],
		},
	];

	constructor() {}

	saveWorkPackage(
		id: number,
		description: string,
		due_date: string,
		created_at: string,
		updated_at: string,
		start_date: string,
		project: OpenProjectDataObject,
		status: OpenProjectDataObject,
		type: OpenProjectDataObject
	): WorkPackage {
		try {
			const workPackage = {
				id,
				description,
				due_date,
				created_at,
				updated_at,
				start_date,
				project,
				status,
				type,
			};
			this.workPackages.push(workPackage);
			return workPackage;
		} catch (error) {
			throw new Error("Failed to save work package locally");
		}
	}
	deleteWorkPackage(id: number): WorkPackage {
		try {
			const workPackage = this.workPackages.find(
				(item) => item.id === id
			);
			if (workPackage) {
				this.workPackages = this.workPackages.filter(
					(item) => item.id !== id
				);
				return workPackage;
			} else {
				throw new Error("Work package not found.");
			}
		} catch (error) {
			throw new Error("Failed to delete work package locally.");
		}
	}
	getAllWorkPackages(): WorkPackage[] {
		return this.workPackages;
	}
	getFilteredWorkPackages(filter: string): WorkPackage[] {
		return this.workPackages.filter((item) => item.description === filter);
	}

	getCurrentUser(): User {
		return {
			firstName: "Dieter",
			theme: "dark",
		};
	}

	getOpenProjectData(): OpenProjectData {
		return {
			url: "http://localhost:8080",
			apiKey: "123456",
			projects: this.projects,
			statuses: this.statuses,
			types: this.types,
			projectDefault: this.projects[0],
			typeDefault: this.types[0],
			statusDefault: this.statuses[0],
		};
	}
}
