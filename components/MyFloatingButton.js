import * as React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import BaseComponentStyles from '../styles/component/BaseStyle';
import ThemeColor from '../constants/ThemeColor';
export const FloatingButton = (props) => {
	const { size, icon = 'plus-circle', color, onPress, ...btnProp } = props;
	return (
		<Pressable onPress={onPress} style={[styles.fabStyle]}>
			<Icon name={icon} size={size} color={color} />
		</Pressable>
	);
};

const styles = StyleSheet.create({
	fabStyle: {
		position: 'absolute',
		alignItems: 'center',
		justifyContent: 'center',
		right: 30,
		bottom: 30
	}
});
