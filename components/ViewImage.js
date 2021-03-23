import * as React from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { validURL } from '../helper/StringUtils';
import BaseStyle from './../styles/component/BaseStyle';

export function ViewImage(fieldProps) {
	const { ImageData, FieldName } = fieldProps;
	const imageUrl = validURL(ImageData.Url)
		? { uri: ImageData.Url }
		: validURL(ImageData['Image Url'])
		? { uri: ImageData['Image Url'] }
		: { uri: '' };
	return (
		<View style={BaseStyle.fieldView}>
			<Text style={BaseStyle.fieldName}>{FieldName}</Text>
			<Image
				onPress={() => {}}
				style={{ height: 200, width: 200 }}
				resizeMode="contain"
				source={imageUrl}
				PlaceholderContent={<ActivityIndicator />}
			/>
		</View>
	);
}
