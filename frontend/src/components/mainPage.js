import { Link } from 'react-router-dom'
import './style.css'

function MainPage(){
    return(
        <div>
            <div className='container-main'>
                <p>
                    Create a new account:<br></br>
                    <Link to='/signup'>
                        <button>Sign Up</button>
                    </Link>
                </p>
                <p>
                    Or log into existing account:<br></br>
                    <Link to='/signin'>
                        <button>Sign In</button>
                    </Link>
                </p>
                <p>
                    View all users:<br></br>
                    <Link to='/all-users'>
                        <button>All users</button>
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default MainPage