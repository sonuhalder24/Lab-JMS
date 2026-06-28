<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<title>CodeLab - Register</title>
<link rel="stylesheet" href="/css/registerpage.css">
</head>
<body>
    <div class="container">
        <h2>Register</h2>
        <form action="/register" method="post">
            <input type="text" name="fullname" placeholder="Full Name" />
            <input type="text" name="username" placeholder="Username (email)" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Register</button>
        </form>
        <a href="/login">Login</a>
    </div>
</body>
</html>
