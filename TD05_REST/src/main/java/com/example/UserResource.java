package com.example;

import java.net.URI;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.FormParam;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriBuilder;

import org.bson.types.ObjectId;

@Path("/user")
public class UserResource {
	
	// insert a user in the database and then display the list
	@POST
	@Path("/insert")
	public Response insertUser(@Context ServletContext context, @Context HttpServletRequest request, @FormParam("firstname") String firstName, @FormParam("lastname") String lastName, @FormParam("phonenumber") String phoneNumber, @FormParam("birthdate") String birthDate) {
		User user = new User(new ObjectId().toString(), firstName, lastName, phoneNumber, birthDate);
		MongoHelper.addContact(user);
		
		URI uri = UriBuilder.fromUri(URI.create(request.getContextPath()))
				.path("success.jsp")
				.build();		
		
		context.setAttribute("message", "inserted a new contact");
		
		return Response.seeOther(uri).build();	
	}
	
	// insert a user with parameters given in the URL, then display the list
	@GET
	@Path("/insert/{FirstName}/{LastName}/{PhoneNumber}/{BirthDate}")
	public Response insertUserWithAddress(@Context ServletContext context, @Context HttpServletRequest request, @PathParam("FirstName") String firstName, @PathParam("LastName") String lastName, @PathParam("PhoneNumber") String phoneNumber, @PathParam("BirthDate") String birthDate){
		User user = new User(new ObjectId().toString(), firstName, lastName, phoneNumber, birthDate);
		MongoHelper.addContact(user);

		URI uri = UriBuilder.fromUri(URI.create(request.getContextPath()))
				.path("success.jsp")
				.build();		
		
		context.setAttribute("message", "inserted a new contact");
		
		return Response.seeOther(uri).build();
	}
	
	// get the pre-filled form in order to modify a contact
	@POST
	@Path("/modifyForm/{index}")
	public Response modifyForm(@Context ServletContext context, @Context HttpServletRequest request, @PathParam("index") String index){
		User user = MongoHelper.getContact(index);
		
		URI uri = UriBuilder.fromUri(URI.create(request.getContextPath()))
				.path("modifyForm.jsp")
				.build();		
		
		context.setAttribute("contact", user);

		return Response.seeOther(uri).build();
	}
	
	// modify a contact the database
	@POST
	@Path("/modify/{index}")
	public Response modify(@Context ServletContext context, @Context HttpServletRequest request, @PathParam("index") String index, @FormParam("firstname") String firstName, @FormParam("lastname") String lastName, @FormParam("phonenumber") String phoneNumber, @FormParam("birthdate") String birthDate){
		MongoHelper.modifyContact(index, new User(new ObjectId().toString(), firstName, lastName, phoneNumber, birthDate));
		URI uri = UriBuilder.fromUri(URI.create(request.getContextPath()))
				.path("success.jsp")
				.build();		
		
		context.setAttribute("message", "updated your contact");
		return Response.seeOther(uri).build();
	}
	
	// delete a contact
	@POST
	@Path("/delete/{index}")
	public Response delete(@Context ServletContext context, @Context HttpServletRequest request, @PathParam("index") String index, @FormParam("firstname") String firstName, @FormParam("lastname") String lastName, @FormParam("phonenumber") String phoneNumber, @FormParam("birthdate") String birthDate){
		MongoHelper.deleteContact(index);
		URI uri = UriBuilder.fromUri(URI.create(request.getContextPath()))
				.path("success.jsp")
				.build();		
		
		context.setAttribute("message", "deleted your contact");
		return Response.seeOther(uri).build();
	}
	
	// display the contacts' list in JSON format
	@GET
	@Path("/getJSONList")
	@Produces({MediaType.APPLICATION_JSON})
	public List<User> getJSONList(){
		return MongoHelper.getAllContacts();
	}
	
	// display the contacts' list in Text format
	@GET
	@Path("/getTextList")
	public Response getTextList(@Context ServletContext context, @Context HttpServletRequest request){
		
		List<User> contactList = MongoHelper.getAllContacts();
		
		URI uri = UriBuilder.fromUri(URI.create(request.getContextPath()))
				.path("contactList.jsp")
				.build();		
		
		context.setAttribute("contactList", contactList);
		
		return Response.seeOther(uri).build();	
	}
	
	// delete the contacts' list
	@GET
	@Path("/deleteList")
	public Response delete(@Context ServletContext context, @Context HttpServletRequest request){
		MongoHelper.deleteAllContacts();
		URI uri = UriBuilder.fromUri(URI.create(request.getContextPath()))
				.path("success.jsp")
				.build();		
		
		context.setAttribute("message", "deleted all your contacts");

		return Response.seeOther(uri).build();
	}
}
