import * as React from 'react';
import { View, Text } from 'react-native';
import BaseStyle from './../styles/component/BaseStyle';

export function ViewText(props) {
	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{props?.FieldName}</Text>
			<Text style={{ fontSize: 16 }}>{props.TextValue}</Text>
		</View>
	);
}
