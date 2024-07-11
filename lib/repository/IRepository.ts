import { OpenProjectData } from "./@types/OpenProjectData";
import { OpenProjectDataObject } from "./@types/OpenProjectDataObject";
import { User } from "./@types/User";
import { WorkPackage } from "./@types/WorkPackage";

export default interface IRepository {
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
	): WorkPackage;
	deleteWorkPackage(id: number): WorkPackage;
	getAllWorkPackages(): WorkPackage[];
	getFilteredWorkPackages(filter: string): WorkPackage[];
	getCurrentUser(): User;
	getOpenProjectData(): OpenProjectData;
}
