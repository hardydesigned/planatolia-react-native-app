// Not tested

import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
	RefreshControl,
	Button,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { router } from "expo-router";
import { useGlobalContext } from "./context/GlobalProvider";
import Loader from "./components/Loader";
import { Ionicons } from "@expo/vector-icons";
import WorkPackageItem from "./components/WorkPackageItem";
import EmptyState from "./components/EmptyState";
import FloatingActionButton from "./components/FAB";
import { WorkPackage } from "@/lib/repository/@types/WorkPackage";
import FilterBottomSheet from "./components/FilterBottomSheet";
import {
	BottomSheetModalProvider,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import "react-native-gesture-handler";

const Home = () => {
	const {
		user,
		loading,
		workPackages,
		getAllWorkPackages,
		getFilteredWorkPackages,
	} = useGlobalContext();
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await getAllWorkPackages();
		setRefreshing(false);
	};
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	const snapPoints = useMemo(() => ["50%", "50%"], []);
	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	useEffect(() => {
		const init = async () => {
			await getAllWorkPackages();
		};
		init();
	}, []);

	return (
		<SafeAreaView className="bg-background h-full p-4">
			<Loader isLoading={loading} testID="loader" />

			<View className="flex flex-row justify-end gap-4">
				<TouchableOpacity onPress={handlePresentModalPress}>
					<Ionicons
						name="filter-circle-outline"
						size={28}
						color="white"
					/>
					<BottomSheetModal
						ref={bottomSheetModalRef}
						index={1}
						snapPoints={snapPoints}
						backgroundStyle={{
							backgroundColor: "rgba(0, 0, 0, 0.8)",
						}}
					>
						<BottomSheetView>
							<FilterBottomSheet
								user={user}
								filterFunction={getFilteredWorkPackages}
							/>
						</BottomSheetView>
					</BottomSheetModal>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => router.push("/settings")}>
					<Ionicons name="settings-outline" size={28} color="white" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={workPackages}
				testID="flatList"
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => (
					<WorkPackageItem
						workPackage={item}
						handlePress={() => {
							router.push("/details/" + item.id);
						}}
						key={item.id}
					/>
				)}
				ListHeaderComponent={() => (
					<View className="flex my-6 px-4 space-y-6">
						<View className="flex justify-between items-start flex-row mb-6">
							<View>
								<Text className="font-pmedium text-sm text-gray-100">
									Hallo, {user.firstName}!
								</Text>
								<Text className="text-4xl font-psemibold text-white">
									Meine Aufgaben
								</Text>
							</View>
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="Keine Aufgaben gefunden"
						subtitle="Erstelle jetzt eine neue!"
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>

			<FloatingActionButton
				handlePress={() => {
					router.push("/details/new");
				}}
			/>
			<StatusBar backgroundColor="#161622" />
		</SafeAreaView>
	);
};

export default Home;
