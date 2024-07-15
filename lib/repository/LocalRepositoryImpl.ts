import { DataObject } from "./@types/DataObject";
import { User } from "./@types/User";
import { WorkPackage } from "./@types/WorkPackage";
import IRepository from "./IRepository";

export default class LocalRepositoryImpl implements IRepository {
	static localRepository: LocalRepositoryImpl = new LocalRepositoryImpl();

	static getInstance(): LocalRepositoryImpl {
		return this.localRepository;
	}

	private projects: DataObject[] = [
		{ id: 1, value: "Project 1" },
		{ id: 2, value: "Project 2" },
		{ id: 3, value: "Project 3" },
	];

	private statuses: DataObject[] = [
		{ id: 1, value: "Offen" },
		{ id: 2, value: "In Bearbeitung" },
		{ id: 3, value: "Abgeschlossen" },
	];

	private types: DataObject[] = [
		{ id: 1, value: "Type 1" },
		{ id: 2, value: "Type 2" },
		{ id: 3, value: "Type 3" },
	];

	private workPackages: WorkPackage[] = [
		{
			id: 1,
			description: "Work Pak 1",
			due_date: "2021-01-01",
			start_date: "2021-01-01",
			project: this.projects[0],
			status: this.statuses[0],
			type: this.types[0],
		},
		{
			id: 2,
			description: "Work Package 2",
			due_date: "2021-01-02",
			start_date: "2021-01-02",
			project: this.projects[1],
			status: this.statuses[1],
			type: this.types[1],
		},
		{
			id: 3,
			description: "Work Package 3",
			due_date: "2021-01-03",
			start_date: "2021-01-03",
			project: this.projects[1],
			status: this.statuses[2],
			type: this.types[1],
		},
		{
			id: 4,
			description: "Work Package 4",
			due_date: "2021-01-04",
			start_date: "2021-01-04",
			project: this.projects[2],
			status: this.statuses[2],
			type: this.types[2],
		},
		{
			id: 5,
			description: "Work Package 5",
			due_date: "2021-01-05",
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
		start_date: string,
		project: DataObject,
		status: DataObject,
		type: DataObject
	): WorkPackage {
		try {
			const workPackage = {
				id,
				description,
				due_date,
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
		return this.workPackages.filter(
			(item) =>
				item.project.value === filter ||
				item.status.value === filter ||
				item.type.value === filter
		);
	}

	getCurrentUser(): User {
		return {
			firstName: "Dieter",
			theme: "dark",
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
