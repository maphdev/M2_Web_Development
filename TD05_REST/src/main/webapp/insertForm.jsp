<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert form</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body class="container">
	<div class="jumbotron">
		<div class="title-page centered-element">Add a new contact</div>
	</div>

	<form action="webapi/user/insert" method="post">
		<div class="form-group">
			<label>First Name</label>
			<input type="text" name="firstname" class="form-control"/>
		</div>
		<div class="form-group">
			<label>Last Name</label>
			<input type="text" name="lastname" class="form-control"/>
		</div>
		<div class="form-group">
			<label>Phone Number</label>
			<input type="text" name="phonenumber" class="form-control"/>
		</div>
		<div class="form-group">
			<label>Birthday date</label>
			<input type="text" name="birthdate" class="form-control"/>
		</div>
		<button type="submit" class="btn btn-info small-margin text-center">Add User</button>
	</form>
	
	<div class="row text-center big-margin">
		<a href="webapi/user/getTextList"><Button class="btn btn-secondary small-margin"><i class="fas fa-arrow-circle-left"></i> Go back to contact list</Button></a>
	</div>
</body>
</html>