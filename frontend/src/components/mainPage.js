import { Link } from 'react-router-dom'

function MainPage(){
    return(
        <div>
            <p>
                To create a new account:
                <Link to='/signup'>
                    <button>Sign Up</button>
                </Link>
            </p>
            <p>
                To log into existing account:
                <Link to='/signin'>
                    <button>Sign In</button>
                </Link>
            </p>
            <p>
                View all users:
                <Link to='/all-users'>
                    <button>All users</button>
                </Link>
            </p>
        </div>
    )
}

export default MainPage