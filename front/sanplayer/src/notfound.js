import logo from './logo.png';
import './notfound.css';

function NotFound () {
    return (
        <div className='notfound_page'>
            <img src={logo} className="logo" alt="logo" width="150" height="200"/>
            <p>
                SanPlayer
            </p>

            <p>
                404 NotFound
            </p>
        </div>
    );
}

export default NotFound;
