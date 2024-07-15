import * as React from "react";
import { GlobalContextType } from "./GlobalContextType";
import { User } from "@/lib/repository/@types/User";
import { WorkPackage } from "@/lib/repository/@types/WorkPackage";
import LocalRepositoryImpl from "@/lib/repository/LocalRepositoryImpl";
import OpenProjectRepositoryImpl from "@/lib/repository/OpenProjectRepositoryImpl";
import { DataObject } from "@/lib/repository/@types/DataObject";

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
	const [openProjectData, setOpenProjectData] =
		React.useState<DataObject | null>(null);
	const [useOpenproject, setUseOpenproject] = React.useState<boolean>(false);

	const localRepository = new LocalRepositoryImpl();
	const openprojectRepository = new OpenProjectRepositoryImpl();

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
		start_date: string,
		project: DataObject,
		status: DataObject,
		type: DataObject
	) => {
		try {
			const workPackage = localRepository.saveWorkPackage(
				id,
				description,
				due_date,
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
			const workPackage = localRepository.deleteWorkPackage(id);
			setWorkPackages(workPackages.filter((item) => item.id !== id));
			return workPackage;
		} catch (error) {
			setErrorMessage("Failed to delete work package locally.");
			setError(true);
			throw new Error("Failed to delete work package locally.");
		}
	};

	const getAllWorkPackages = () => {
		try {
			const wps = localRepository.getAllWorkPackages();
			setWorkPackages(wps);

			return wps;
		} catch (error) {
			setErrorMessage("Failed to get work packages locally.");
			setError(true);
			throw new Error("Failed to get work packages locally.");
		}
	};

	const getFilteredWorkPackages = (filter: string) => {
		try {
			console.log(filter);

			const wps = localRepository.getFilteredWorkPackages(filter);
			setWorkPackages(wps);
			return wps;
		} catch (error) {
			setErrorMessage("Failed to get filtered work packages locally.");
			setError(true);
			throw new Error("Failed to get filtered work packages locally.");
		}
	};

	const getCurrentUser = () => {
		try {
			const user1 = localRepository.getCurrentUser();
			setUser(user1);
			return user1;
		} catch (error) {
			setErrorMessage("Failed to get user locally.");
			setError(true);
			throw new Error("Failed to get user locally.");
		}
	};

	React.useEffect(() => {
		const init = async () => {
			setLoading(true);

			try {
				const currentUser = localRepository.getCurrentUser();
				setUser(currentUser);
				setIsLoggedIn(true);

				if (currentUser.apiKey !== "" && currentUser.url !== "") {
					setUseOpenproject(true);
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
