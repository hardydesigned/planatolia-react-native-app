export type GlobalContextType = {
	user: User;
	loading: boolean;
	isLoggedIn: boolean;
	error: boolean;
	errorMessage: string;
	workPackages: WorkPackage[];
	openProjectData: OpenProjectDataObject;
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
	getAllWorkPackages: () => Promise<WorkPackage[]>;
	getFilteredWorkPackages: (filter: string) => Promise<WorkPackage[]>;
	getCurrentUser: () => Promise<User>;
	saveUser: (
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
	) => any;
};
