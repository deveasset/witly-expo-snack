/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Input } from 'react-native-elements';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import ThemeColor from '../constants/ThemeColor';
import { InputStyle } from '../styles/component/InputStyle';

export const InputField = ({ error, onChangeText, onBlur, ...textInputProps }) => {
	const isError = Boolean(error);
	const { value, iconName = '', placeholder = '', isSecure = false } = textInputProps;

	return (
		<Input
			value={value}
			leftIcon={() =>
				iconName !== '' ? <Icon name={iconName} size={25} color={ThemeColor.PLACEHOLDER} /> : <></>
			}
			leftIconContainerStyle={{ marginEnd: 10 }}
			placeholder={placeholder}
			secureTextEntry={isSecure}
			containerStyle={[InputStyle.container, isError && { borderColor: '#F31D1D' }]}
			inputContainerStyle={InputStyle.inputContainer}
			onBlur={onBlur}
			onChangeText={(userText) => onChangeText(userText)}
			errorMessage={isError ? error : ''}
		/>
	);
};
