export type GlobalContextType = {
	user: User;
	loading: boolean;
	isLoggedIn: boolean;
	error: boolean;
	errorMessage: string;
	workPackages: WorkPackage[];
	openProjectData: OpenProjectDataObject;
	saveName: (firstName: string) => void;
	saveTheme: (firstName: string) => void;
	getName: () => string | undefined;
	getTheme: () => string | undefined;
	setError: (error: boolean) => void;
	setErrorMessage: (errorMessage: string) => void;
	setLoading: (loading: boolean) => void;
	setWorkPackages: (workPackages: WorkPackage[]) => void;
	saveWorkPackage: (
		id: number,
		description: string,
		due_date: string,
		start_date: string,
		project: OpenProjectDataObject,
		status: OpenProjectDataObject,
		type: OpenProjectDataObject
	) => WorkPackage;
	deleteWorkPackage: (id: number) => WorkPackage;
	getAllWorkPackages: () => WorkPackage[];
	getFilteredWorkPackages: (filter: string) => WorkPackage[];
	getCurrentUser: () => User;
};
