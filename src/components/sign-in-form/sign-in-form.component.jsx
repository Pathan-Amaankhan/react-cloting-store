import FormInput from "../form-input/form-input.component";
import {useState} from "react";
import {
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import Button, {BUTTON_TYPE_CLASSES} from "../button/button.component";
import './sign-in-form.styles';
import {ButtonsContainer, SignInContainer} from "./sign-in-form.styles";

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState( defaultFormFields );
    const { email, password } = formFields;

    const handleChange = ( event ) => {
        event.preventDefault();

        const { name, value } = event.target;

        setFormFields( { ...formFields, [name]: value } );
    }

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        try {
            await signInUserWithEmailAndPassword(email, password);
        } catch ( error ) {
            switch ( error.code ) {
                case 'auth/wrong-password':
                    alert( 'Incorrect password for email.' );
                    break;
                case 'auth/user-not-found':
                    alert( 'No user associated with this email.' );
                    break;
                default:
                    console.log( error );
            }
        }
    }

    const logUserWithGoogle = async () => {
        try {
            await signInWithGooglePopup();
        } catch ( error ) {
            switch ( error.code ) {
                case 'auth/wrong-password':
                    alert( 'Incorrect password for email.' );
                    break;
                case 'auth/user-not-found':
                    alert( 'No user associated with this email.' );
                    break;
                default:
                    console.log( error );
            }
        }
    }

    return (
        <SignInContainer>
            <h2>I already have an account</h2>
            <span>Sign in wity your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput label='email'
                           type='email'
                           name='email'
                           onChange={handleChange}
                           value={email} />

                <FormInput label='password'
                           type='password'
                           name='password'
                           onChange={handleChange}
                           value={password} />

                <ButtonsContainer>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={logUserWithGoogle}>Google Sign In</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;