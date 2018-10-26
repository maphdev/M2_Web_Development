<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
 <%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>My Contacts</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
<link rel="stylesheet" type="text/css" href="theme.css">
</head>
<body class="container">
	<div class="jumbotron">
		<div class="title-page centered-element">My Contacts</div>
	</div>

	<div class="notice big-margin">
		<c:if test="${fn:length(contactList) gt 0}">
		   	<p class="centered-element">Modify or delete a contact by clicking on it !</p>
		</c:if>
		<c:if test="${fn:length(contactList) == 0}">
		   	<p class="centered-element">No contacts !</p>
		</c:if>
	</div>
	
	<div class="big-margin">
	<ul>
		<c:forEach var="contact" items="${contactList}">
			<form  method="post" action="webapi/user/modifyForm/${contact.id}">
		       <Button name="contact" class="btn btn-secondary small-margin"><i class="fas fa-user"></i> &emsp;&emsp;&emsp; ${contact.firstName} &emsp;&emsp;&emsp; ${contact.lastName} &emsp;&emsp;&emsp; ${contact.phoneNumber} &emsp;&emsp;&emsp; ${contact.birthdayDate}</button>
			</form>
		</c:forEach>
	</ul>
	</div>
	
	<div class="row text-center big-margin">
		<a href="insertForm.jsp"><Button class="btn btn-info small-margin"><i class="fas fa-plus-circle"></i> Add a new contact</Button></a>
		<c:if test="${fn:length(contactList) gt 0}">
			<a href="webapi/user/deleteList"><Button class="btn btn-danger small-margin"><i class="fas fa-minus-circle"></i> Delete all contacts</Button></a>
		</c:if>
	</div>
	<div class="row text-center big-margin">
		<a href="index.jsp"><Button class="btn btn-secondary small-margin"><i class="fas fa-arrow-circle-left"></i> Go back to main page</Button></a>
	</div>
	
</body>
</html>