import LoginForm from  "../components/LoginForm";

function LoginPage(props){
    // return<h1>This is the Login Page!</h1>
    return <LoginForm showalert={props.showalert}/>
}

export default LoginPage;