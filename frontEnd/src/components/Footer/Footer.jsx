
import './Foter.css'
import { SiFacebook } from "react-icons/si";
import { FaTelegramPlane } from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import { Fade } from 'react-awesome-reveal';



const Footer = () => {
    return (
        // <animate__bounceInRight>
        

      
        <footer 
        style={{backgroundColor:'var(--bgColor)',color:'var(--text-color)'}} 
        className='p-4 mt-3 w-100 d-flex justify-content-evenly
        align-items-center fs-2'>
            <Fade delay={0} direction='up' triggerOnce={true} cascade> 
                <SiFacebook />
                <FaTelegramPlane/>
                <BsWhatsapp/> 
            </Fade>
        </footer>
    );
}

export default Footer;
