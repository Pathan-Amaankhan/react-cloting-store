import {useState} from "react";
import {createAuthUserWithEmailAndPassword, createUserDocFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles';
import {SignUpContainer} from "./sign-up-form.styles";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmedPassword: '',
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState( defaultFormFields );
    const { displayName, email, password, confirmedPassword } = formFields;

    const resetFormFields = () => setFormFields( defaultFormFields );

    const handleChange = ( event ) => {
        event.preventDefault();

        const { name, value } = event.target;

        setFormFields( { ...formFields, [name]: value } );
    }

    const handleSubmit = async ( event ) => {
        event.preventDefault();

        if ( password !== confirmedPassword ) {
            alert( 'Password do not match.' );
            return;
        }

        try {
            const userCredentials = await createAuthUserWithEmailAndPassword( email, password );

            const { user } = userCredentials;

            await createUserDocFromAuth( user, { displayName } );

            alert( 'User Created Successfully' );

            resetFormFields();
        } catch ( error ) {
            if ( 'auth/email-already-in-use' === error.code ) {
                alert( 'User Already Exists' );
                return;
            }

            console.error( 'User creation failed!' );
        }
    }

    return (
       <SignUpContainer>
           <h2>Don't have an account?</h2>
           <span>Sign up with your email and password. </span>
           <form onSubmit={handleSubmit}>

               <FormInput label='Display Name'
                          type='text'
                          required name='displayName'
                          onChange={handleChange}
                          value={displayName} />

               <FormInput label='Email'
                          type='email'
                          required name='email'
                          onChange={handleChange}
                          value={email} />

               <FormInput label='Password'
                          type='password'
                          minLength='8'
                          required name='password'
                          onChange={handleChange}
                          value={password} />

               <FormInput label='Confirm Password'
                          type='password'
                          minLength='8'
                          required name='confirmedPassword'
                          onChange={handleChange}
                          value={confirmedPassword} />

               <Button type='submit'>Sign Up</Button>
           </form>
       </SignUpContainer>
    );
}

export default SignUpForm;