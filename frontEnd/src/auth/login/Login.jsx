


import './login.css'
// icons
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import FormInputs from "../../components/FormInput/FormInputs";

const Login = () => {
  // inputs data
const inputs= [

  { id: "email", type: "email", placeholder: "أدخل الايميل", icon: <MdOutlineEmail />, label: "الايميل" },
  { id: "password", type: "password", placeholder: "ادخل كلمة المرور", icon: <RiLockPasswordFill />, label: "كلمة المرور" },

]

  return (
    <>
    
    <FormInputs formdata={{email: "", password: "",}} 
    InputData={inputs}
    name='login'
    title={'تسجيل دخول'}
    method={'post'}
    path={'login'}
    />
    
    </>)
};

export default Login;
