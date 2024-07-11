import * as React from "react";
import { GlobalContextType } from "./GlobalContextType";
import { User } from "@/lib/repository/@types/User";
import { WorkPackage } from "@/lib/repository/@types/WorkPackage";
import LocalRepositoryImpl from "@/lib/repository/LocalRepositoryImpl";
import OpenProjectRepositoryImpl from "@/lib/repository/OpenProjectRepositoryImpl";
import { OpenProjectDataObject } from "@/lib/repository/@types/OpenProjectDataObject";
import IRepository from "@/lib/repository/IRepository";

export const GlobalContext = React.createContext<GlobalContextType>({} as any);
export const useGlobalContext = () => React.useContext(GlobalContext);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<User | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(true);
	const [error, setError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>("");
	const [workPackages, setWorkPackages] = React.useState<WorkPackage[]>([]);
	const [repository, setRepository] = React.useState<IRepository | null>(
		null
	);
	const [openProjectData, setOpenProjectData] =
		React.useState<OpenProjectDataObject | null>(null);

	const saveName = (firstName: string) => {
		setUser({ ...user, firstName });
	};

	const saveTheme = (theme: string) => {
		setUser({ ...user, theme });
	};

	const getName = () => user?.firstName;

	const getTheme = () => user?.theme;

	const saveWorkPackage = (
		id: number,
		description: string,
		due_date: string,
		created_at: string,
		updated_at: string,
		start_date: string,
		project: OpenProjectDataObject,
		status: OpenProjectDataObject,
		type: OpenProjectDataObject
	) => {
		try {
			const workPackage = repository!.saveWorkPackage(
				id,
				description,
				due_date,
				created_at,
				updated_at,
				start_date,
				project,
				status,
				type
			);
			return workPackage;
		} catch (error) {
			setErrorMessage("Failed to save work package locally.");
			setError(true);
			throw new Error("Failed to save work package locally");
		}
	};

	const deleteWorkPackage = (id: number) => {
		try {
			const workPackage = repository!.deleteWorkPackage(id);
			return workPackage;
		} catch (error) {
			setErrorMessage("Failed to delete work package locally.");
			setError(true);
			throw new Error("Failed to delete work package locally.");
		}
	};

	const getAllWorkPackages = () => {
		try {
			const workPackages = repository!.getAllWorkPackages();
			setWorkPackages(workPackages);
			return workPackages;
		} catch (error) {
			setErrorMessage("Failed to get work packages locally.");
			setError(true);
			throw new Error("Failed to get work packages locally.");
		}
	};

	const getFilteredWorkPackages = (filter: string) => {
		try {
			const workPackages = repository!.getFilteredWorkPackages(filter);
			return workPackages;
		} catch (error) {
			setErrorMessage("Failed to get filtered work packages locally.");
			setError(true);
			throw new Error("Failed to get filtered work packages locally.");
		}
	};

	const getCurrentUser = () => {
		try {
			const user = repository!.getCurrentUser();
			return user;
		} catch (error) {
			setErrorMessage("Failed to get user locally.");
			setError(true);
			throw new Error("Failed to get user locally.");
		}
	};

	const getOpenProjectData = () => {
		try {
			const opdata = repository!.getOpenProjectData();
			return opdata;
		} catch (error) {
			setErrorMessage("Failed to get Openproject Data locally.");
			setError(true);
			throw new Error("Failed to get Openproject Data locally.");
		}
	};

	React.useEffect(() => {
		const init = async () => {
			setLoading(true);
			try {
				const localRepository = new LocalRepositoryImpl();
				setRepository(localRepository);
				const currentUser = localRepository.getCurrentUser();
				setUser(currentUser);
				setIsLoggedIn(true);

				const opData = localRepository.getOpenProjectData();
				if (opData.apiKey !== "" && opData.url !== "") {
					const opRepository = new OpenProjectRepositoryImpl();
					setRepository(opRepository);
				}
			} catch (error) {
				setError(true);
				setIsLoggedIn(false);
				setErrorMessage("Fehler beim Abrufen der Nutzerdaten.");
			} finally {
				setLoading(false);
			}
		};

		init();
	}, []);

	return (
		<GlobalContext.Provider
			value={{
				user,
				saveName,
				saveTheme,
				getName,
				getTheme,
				setError,
				setErrorMessage,
				setLoading,
				setWorkPackages,
				saveWorkPackage,
				deleteWorkPackage,
				getAllWorkPackages,
				getFilteredWorkPackages,
				getCurrentUser,
				getOpenProjectData,
				loading,
				isLoggedIn,
				error,
				errorMessage,
				workPackages,
				openProjectData,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
