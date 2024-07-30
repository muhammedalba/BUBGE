import './LoadingPage.css'
import logo from '../../imges/logo.png'
const LoadingPage = () => {
    return (
        <div className='loading'>
            <div className="spinner">
                <div className="spinner_items">
                    <img  src={logo} alt="logo" />
                </div>
                <p className='fs-4 pt-3'>جار التحميل . . .</p>
            </div>
        </div>
    );
}

export default LoadingPage;
