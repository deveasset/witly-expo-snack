/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { StyleSheet, Text, SafeAreaView, View, Pressable } from 'react-native';
import { Input } from 'react-native-elements';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import ThemeColor from '../constants/ThemeColor';
import Autocomplete from 'react-native-autocomplete-input';
import { nanoid } from 'nanoid';
import { FlatList } from 'react-native-gesture-handler';
import { LogBox } from 'react-native';

export const FormLookupField = (props) => {
	const { name, rules, defaultValue = '', ...lookupProps } = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });

	return (
		<LookupField
			{...lookupProps}
			onValueChange={(value) => {
				field.onChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value}
			//listUrl={lookupProps?.listUrl}
		/>
	);
};

export const LookupField = ({ error, onValueChange, onBlur, ...lookupProps }) => {
	LogBox.ignoreAllLogs();
	const [query, setQuery] = React.useState('');
	const [FilterData, setFilterData] = React.useState([]);

	const data = ['A', 'B', 'C', 'D', 'DE', 'DF', 'DG', 'H'];
	const SearchInDataList = (typeQuery) => {
		if (typeQuery === '') {
			setFilterData([]);
			return;
		}

		const regex = new RegExp(`${typeQuery.trim()}`, 'i');
		const filterResult = data.filter((d) => d.search(regex) >= 0);

		setFilterData(filterResult);
	};

	const SelectChoice = (selectedText) => {
		setQuery(selectedText);
		setFilterData([]);
	};

	return (
		<View style={{}}>
			<Autocomplete
				containerStyle={{}}
				listContainerStyle={{
					position: 'absolute',
					left: 0,
					right: 0,
					top: 42,
					zIndex: 1,
					flex: 1
				}}
				listStyle={{}}
				autoCapitalize="none"
				autoCorrect={false}
				defaultValue={query} //query
				data={FilterData}
				onChangeText={(typeQuery) => {
					SearchInDataList(typeQuery);
				}}
				keyExtractor={(item) => nanoid(10)}
				flatListProps={{
					renderItem: ({ item, index, separators }) => {
						return (
							<Pressable
								key={index}
								onPress={() => {
									SelectChoice(item);
								}}>
								<Text style={styles.itemText}>{item}</Text>
							</Pressable>
						);
					},
					keyExtractor: (item) => nanoid(10)
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		padding: 16,
		marginTop: 40
	},
	autocompleteContainer: {
		backgroundColor: '#ffffff',
		borderWidth: 0,
		left: 0,
		position: 'absolute',
		right: 0,
		top: 0,
		zIndex: 1
	},
	descriptionContainer: {
		flex: 1,
		justifyContent: 'center'
	},
	itemText: {
		fontSize: 15,
		paddingTop: 5,
		paddingBottom: 5,
		margin: 2
	},
	infoText: {
		textAlign: 'center',
		fontSize: 16
	}
});
