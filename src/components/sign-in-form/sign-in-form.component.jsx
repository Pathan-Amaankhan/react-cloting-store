import FormInput from "../form-input/form-input.component";
import {useState} from "react";
import {
    createUserDocFromAuth,
    signInUserWithEmailAndPassword,
    signInWithGooglePopup
} from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';

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
            console.log(await signInUserWithEmailAndPassword(email, password));
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

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocFromAuth( user );
    }

    return (
        <div className='sign-in-container'>
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

                <div className='buttons-container'>
                    <Button type='submit'>Sign In</Button>
                    <Button type='button' buttonType='google' onClick={logGoogleUser}>Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;