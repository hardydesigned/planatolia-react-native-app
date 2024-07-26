import * as React from "react";
import { GlobalContextType } from "./GlobalContextType";
import { User } from "@/lib/repository/@types/User";
import { WorkPackage } from "@/lib/repository/@types/WorkPackage";
import LocalRepositoryImpl from "@/lib/repository/LocalRepositoryImpl";

export const GlobalContext = React.createContext<GlobalContextType>({} as any);
export const useGlobalContext = () => React.useContext(GlobalContext);

const GlobalProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [user, setUser] = React.useState<User | null>(null);
	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<boolean>(false);
	const [errorMessage, setErrorMessage] = React.useState<string>("");
	const [workPackages, setWorkPackages] = React.useState<WorkPackage[]>([]);

	const localRepository = new LocalRepositoryImpl();

	const saveWorkPackage = async (
		id: number,
		description: string,
		due_date: string,
		start_date: string,
		project: string,
		status: string,
		type: string
	) => {
		try {
			await localRepository.saveWorkPackage(
				id,
				description,
				due_date,
				start_date,
				project,
				status,
				type
			);
			await getAllWorkPackages();
		} catch (error) {
			setErrorMessage("Failed to save work package locally.");
			setError(true);
			throw new Error("Failed to save work package locally on Provider");
		}
	};

	const deleteWorkPackage = async (id: number) => {
		try {
			await localRepository.deleteWorkPackage(id);
			await getAllWorkPackages();
		} catch (error) {
			setErrorMessage("Failed to delete work package locally.");
			setError(true);
			throw new Error("Failed to delete work package locally.");
		}
	};

	const getAllWorkPackages = async () => {
		try {
			const wps = await localRepository.getAllWorkPackages();
			setWorkPackages(wps);

			return wps;
		} catch (error) {
			setErrorMessage("Failed to get work packages locally.");
			setError(true);
			throw new Error("Failed to get work packages locally.");
		}
	};

	const getFilteredWorkPackages = async (filter: string) => {
		try {
			const wps = await localRepository.getFilteredWorkPackages(filter);
			setWorkPackages(wps);
			return wps;
		} catch (error) {
			setErrorMessage("Failed to get filtered work packages locally.");
			setError(true);
			throw new Error("Failed to get filtered work packages locally.");
		}
	};

	const getCurrentUser = async () => {
		try {
			const user1 = await localRepository.getCurrentUser();
			setUser(user1);
			return user1;
		} catch (error) {
			setErrorMessage("Failed to get user locally.");
			setError(true);
			throw new Error("Failed to get user locally.");
		}
	};

	const saveName = (firstName: string) => {
		setUser({ ...user, firstName });
	};

	const saveUser = async (
		firstname: string,
		projects: string[],
		statuses: string[],
		types: string[]
	) => {
		try {
			await localRepository.saveUser(
				firstname,
				projects,
				statuses,
				types
			);
			await getCurrentUser();
		} catch (error) {
			setErrorMessage("Failed to save User locally.");
			setError(true);
			throw new Error("Failed to save User locally on Provider");
		}
	};

	React.useEffect(() => {
		const init = async () => {
			setLoading(true);

			try {
				const currentUser = await localRepository.getCurrentUser();
				setUser(currentUser);
			} catch (error) {
				setError(true);
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
				setError,
				setErrorMessage,
				setLoading,
				setWorkPackages,
				saveWorkPackage,
				deleteWorkPackage,
				getAllWorkPackages,
				getFilteredWorkPackages,
				getCurrentUser,
				saveUser,
				loading,
				error,
				errorMessage,
				workPackages,
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};

export default GlobalProvider;
