import UserForm from './UserForm';

function LoginPage() {
  return (
    <UserForm
      submitAction={() => { }}
      title="Login"
      switchButton={
        <p className="sign-up text-left mt-1">
          <a href="/signup">Sign up</a>
        </p>
        }
    />
  )
}

export default LoginPage;