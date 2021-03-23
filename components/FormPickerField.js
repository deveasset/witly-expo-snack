import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';

export const FormPickerField = (props) => {
	const { name, rules, defaultValue = '', ...pickerProps } = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });
	return (
		<PickerField
			{...pickerProps}
			error={errors[name]?.message}
			onValueChange={(value) => {
				field.onChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value}
		/>
	);
};

export const PickerField = ({ error, onValueChange, onBlur, ...pickerProps }) => {
	const { choices } = pickerProps;
	let selectedValue = pickerProps?.value;

	let selectItems = choices
		? choices.map(({ label, value }, index) => {
				let latestValue = '';
				if (typeof value === 'object') {
					if (value['Display As'] === 'None') {
						latestValue = label;
					} else if (value['Display As'] === 'Icon') {
						latestValue = label;
					} else if (value['Display As'] === 'Color') {
						latestValue = label;
					} else {
						latestValue = label;
					}
				} else {
					latestValue = label;
				}
				return <Picker.Item key={index} value={latestValue} label={label} />;
		  })
		: [];

	return (
		<View style={{ borderWidth: 1, borderColor: '#b5b5b5', borderRadius: 4, paddingHorizontal: 8 }}>
			<Picker
				selectedValue={selectedValue}
				onValueChange={(value) => {
					onValueChange(value);
				}}
				style={{ height: 50 }}>
				{selectItems}
			</Picker>
		</View>
	);
};
