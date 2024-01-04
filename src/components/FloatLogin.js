function FloatLogin() {
    return (
    <div className="float-login">
        <h1>Login</h1>
        <input type="text" placeholder="Username" id="username"></input>
        <input type="password" placeholder="Password" id="password"></input>
        <div className="login-btns">
            <button className="button" onClick="login()">Login</button>
            <a href="register.php" className="register-btn">Sign up</a>
        </div>

    </div>
    );
}