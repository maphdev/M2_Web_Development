<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>That's a success!</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body class="container">
	<div class="jumbotron">
		<div class="title-page centered-element">That's a success!</div>
	</div>

	<div class="big-margin centered-element">
		<p>You successfully ${message}!</p>
	</div>
	<div class="big-margin centered-element">
		<a href="webapi/user/getTextList"><Button class="btn btn-secondary text-center">Go back to my contact list !</Button></a>
	</div>
</body>
</html>