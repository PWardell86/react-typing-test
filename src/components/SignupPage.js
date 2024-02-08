import UserForm from './UserForm';

function SignUpPage() {
  return (
    <UserForm
      submitAction={() => { }}
      title="Sign Up"
      switchButton={
        <p className="sign-up text-left mt-1">
          <a href="/login">Log In</a>
        </p>
        }
    />
  )
}

export default SignUpPage;