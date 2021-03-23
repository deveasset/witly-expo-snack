import * as React from 'react';
import { useController, useFormContext } from 'react-hook-form';
import { InputField } from './InputField';

export const FormInputField = (props) => {
	const { name, rules, defaultValue = '', ...inputProps } = props;

	const formContext = useFormContext();
	const { control, errors } = formContext;

	const { field } = useController({ name, control, rules, defaultValue });

	return (
		<InputField
			{...inputProps}
			error={errors[name]?.message}
			onChangeText={(value) => {
				field.onChange(value);
			}}
			onBlur={field.onBlur}
			value={field.value}
		/>
	);
};
