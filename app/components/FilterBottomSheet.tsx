import React, { useState } from "react";
import { View, RefreshControl, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { User } from "@/lib/repository/@types/User";
import { Ionicons } from "@expo/vector-icons";

const FilterBottomSheet: React.FC<{ user: User; filterFunction: Function }> = ({
	user,
	filterFunction,
}) => {
	const [tab, setTab] = useState(0);
	const [filterText, setFilterText] = useState<string>("Projekt");
	const [dataObjects, setDataObjects] = useState(user?.projects);
	const [refreshing, setRefreshing] = useState(false);

	const handlePress = async (value: string) => {
		await filterFunction(value);
	};

	return (
		<>
			<View className="px-4 h-full">
				<FlatList
					className="h-full"
					data={dataObjects}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							className="mb-3 border-primaryText/30 border-b-2 pb-1"
							onPress={() => handlePress(item.value)}
						>
							<Text
								className="text-primaryText text-lg"
								key={item.id}
							>
								{item.value}
							</Text>
						</TouchableOpacity>
					)}
					ListHeaderComponent={() => (
						<Text className=" text-primaryText text-xl pl-3 mb-4">
							Filtern nach {filterText}
						</Text>
					)}
					ListEmptyComponent={() => (
						<Text>Keine Filter vorhanden gefunden</Text>
					)}
					refreshControl={<RefreshControl refreshing={refreshing} />}
				/>
			</View>
			<View className="absolute bottom-10 h-24 w-full flex flex-row justify-center items-center">
				<View className="flex flex-row gap-6">
					<TouchableOpacity
						className={`${
							tab === 0 ? "bg-white/30" : "bg-white/10"
						} rounded-full p-2`}
						onPress={() => {
							setTab(0);
							setFilterText("Projekt");
							setDataObjects(user?.projects);
						}}
					>
						<Ionicons name="list-outline" size={28} color="white" />
					</TouchableOpacity>
					<TouchableOpacity
						className={`${
							tab === 1 ? "bg-white/30" : "bg-white/10"
						} rounded-full p-2`}
						onPress={() => {
							setTab(1);
							setFilterText("Typ");
							setDataObjects(user?.types);
						}}
					>
						<Ionicons
							name="pricetag-outline"
							size={28}
							color="white"
						/>
					</TouchableOpacity>
					<TouchableOpacity
						className={`${
							tab === 2 ? "bg-white/30" : "bg-white/10"
						} rounded-full p-2`}
						onPress={() => {
							setTab(2);
							setFilterText("Status");
							setDataObjects(user?.statuses);
						}}
					>
						<Ionicons
							name="checkmark-circle-outline"
							size={28}
							color="white"
						/>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
};

export default FilterBottomSheet;
