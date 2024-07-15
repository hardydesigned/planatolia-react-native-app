import { DataObject } from "./@types/DataObject";
import { User } from "./@types/User";
import { WorkPackage } from "./@types/WorkPackage";

export default interface IRepository {
	saveWorkPackage(
		id: number,
		description: string,
		due_date: string,
		start_date: string,
		project: DataObject,
		status: DataObject,
		type: DataObject
	): WorkPackage;
	deleteWorkPackage(id: number): WorkPackage;
	getAllWorkPackages(): WorkPackage[];
	getFilteredWorkPackages(filter: string): WorkPackage[];
	getCurrentUser(): User;
}
