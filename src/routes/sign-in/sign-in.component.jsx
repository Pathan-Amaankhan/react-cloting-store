import {createUserDocFromAuth, signInWithGooglePopup} from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import Button from "../../components/button/button.component";

const SignIn = () => {
    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        createUserDocFromAuth( user );
    }

    return (
      <div>
          <h1>Sign In Page</h1>
          <Button buttonType='google' onClick={logGoogleUser}>
              Sign In With Google
          </Button>

          <SignUpForm />
      </div>
    );
}

export default SignIn;