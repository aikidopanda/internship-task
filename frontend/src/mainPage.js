function MainPage(){
    return(
        <div>
            <p><button onClick={() => { localStorage.removeItem('token'); window.location.reload(); }}>Log out</button></p>
        </div>
    )
}

export default MainPage