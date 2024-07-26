import { User } from "./@types/User";
import { WorkPackage } from "./@types/WorkPackage";

export default interface IRepository {
	saveWorkPackage(
		id: number,
		description: string,
		due_date: string,
		start_date: string,
		project: string,
		status: string,
		type: string
	): any;
	deleteWorkPackage(id: number): any;
	getAllWorkPackages(): Promise<WorkPackage[]>;
	getFilteredWorkPackages(filter: string): Promise<WorkPackage[]>;
	getCurrentUser(): Promise<User>;
	saveUser: (
		firstname: string,
		projects: string[],
		statuses: string[],
		types: string[]
	) => any;
}
