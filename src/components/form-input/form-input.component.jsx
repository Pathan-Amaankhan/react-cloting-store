import {FormInputContainer, FormInputLabel, Group} from "./form-input.styles";

const FormInput = ( { label, ...otherProps } ) => {
    return (
        <Group>
            <FormInputContainer { ...otherProps } />
            { label && (
                <FormInputLabel className={`${ otherProps.value.length ? 'shrink' : '' }`}>
                    { label }
                </FormInputLabel>
            ) }
        </Group>
    );
}

export default FormInput;