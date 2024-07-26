export type GlobalContextType = {
	user: User;
	loading: boolean;
	error: boolean;
	errorMessage: string;
	workPackages: WorkPackage[];
	setError: (error: boolean) => void;
	setErrorMessage: (errorMessage: string) => void;
	setLoading: (loading: boolean) => void;
	setWorkPackages: (workPackages: WorkPackage[]) => void;
	saveWorkPackage: (
		id: number,
		description: string,
		due_date: string,
		start_date: string,
		project: string,
		status: string,
		type: string
	) => WorkPackage;
	deleteWorkPackage: (id: number) => WorkPackage;
	getAllWorkPackages: () => Promise<WorkPackage[]>;
	getFilteredWorkPackages: (filter: string) => Promise<WorkPackage[]>;
	getCurrentUser: () => Promise<User>;
	saveUser: (
		firstname: string,
		projects: string[],
		statuses: string[],
		types: string[]
	) => any;
};
