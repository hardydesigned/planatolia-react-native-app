import {
	View,
	Text,
	StatusBar,
	TouchableOpacity,
	FlatList,
	RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { useGlobalContext } from "./context/GlobalProvider";
import Loader from "./components/Loader";
import { Ionicons } from "@expo/vector-icons";
import WorkPackageItem from "./components/WorkPackageItem";
import EmptyState from "./components/EmptyState";
import FloatingActionButton from "./components/FAB";

const Home = () => {
	const { user, loading, workPackages, getAllWorkPackages } =
		useGlobalContext();
	const [refreshing, setRefreshing] = useState(false);

	// console.log(workPackages);
	// console.log(contextState);

	const onRefresh = async () => {
		setRefreshing(true);
		console.log(getAllWorkPackages());
		setRefreshing(false);
	};

	useEffect(() => {
		getAllWorkPackages();
	}, []);

	return (
		<SafeAreaView className="bg-background h-full p-4">
			<Loader isLoading={loading} />

			<View className="flex flex-row justify-end gap-4">
				<Ionicons
					name="filter-circle-outline"
					size={28}
					color="white"
				/>
				<TouchableOpacity onPress={() => router.push("/settings")}>
					<Ionicons name="settings-outline" size={28} color="white" />
				</TouchableOpacity>
			</View>

			<FlatList
				data={workPackages}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => (
					<WorkPackageItem
						workPackage={item}
						handlePress={() => {}}
						key={item.$id}
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

			<FloatingActionButton handlePress={() => {}} />
			<StatusBar backgroundColor="#161622" />
		</SafeAreaView>
	);
};

export default Home;
