import CreateFundraiserForm from  "../components/CreateFundraiserForm";
import { useAuth } from "../hooks/use-auth";
import LoginPage from "./LoginPage";


function CreateFundraiserPage(){
    const {auth, setAuth} = useAuth();  



    // (window.localStorage.getItem("token"))? <CreateFundraiserPage/> : <LoginPage showalert={true}/>
    return(
        auth.token ? <CreateFundraiserForm/> : <LoginPage showalert={true}/>
    )
    //  <CreateFundraiserForm/>
}

export default CreateFundraiserPage;