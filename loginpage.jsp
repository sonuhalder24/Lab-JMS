<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CodeLab - Login</title>
<link rel="stylesheet" href="/css/registerpage.css">
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <form action="/login" method="post">
            <input type="text" id="username" name="username" placeholder="Username (email)" />
            <input type="password" id="password" name="password" placeholder="Password" />
            <button type="submit">Login</button>
        </form>
        <a href="/register">Register</a>
    </div>
</body>
</html>
