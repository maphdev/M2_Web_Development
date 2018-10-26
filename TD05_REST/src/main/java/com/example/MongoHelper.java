package com.example;

import java.util.ArrayList;
import java.util.List;
import org.bson.Document;
import org.bson.types.ObjectId;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import com.mongodb.MongoClient;
import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;


public class MongoHelper {
	
	public static final String DATABASE = "usersData";
	public static final String COLLECTION_CONTACTS = "contacts";

	public static void addContact(User user){
		MongoClient mongoClient = new MongoClient();
		try {
		    MongoDatabase db = mongoClient.getDatabase(DATABASE);
		    MongoCollection<Document> collection = db.getCollection(COLLECTION_CONTACTS);
		    ObjectMapper mapper = new ObjectMapper();
		    String jsonString = mapper.writeValueAsString(user);
		    Document doc = Document.parse(jsonString);
		    collection.insertOne(doc);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mongoClient.close();
		}
	}
	
	public static User getContact(String id){
		MongoClient mongoClient = new MongoClient();
		User user = new User();
		try {
		    MongoDatabase db = mongoClient.getDatabase(DATABASE);
		    MongoCollection<Document> collection = db.getCollection(COLLECTION_CONTACTS);
		    
		    BasicDBObject filter = new BasicDBObject()
		    		.append("id", id);
		    
		    Document o = collection.find(filter).first();
		    
    		user = new User((String) o.get("id"), (String) o.get("First Name"), (String) o.get("Last Name"), (String) o.get("Phone Number"), (String) o.get("Birthday date"));

		    
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mongoClient.close();
		}
		return user;
	}
	
	public static void modifyContact(String id, User user){
		MongoClient mongoClient = new MongoClient();
		try {
		    MongoDatabase db = mongoClient.getDatabase(DATABASE);
		    MongoCollection<Document> collection = db.getCollection(COLLECTION_CONTACTS);
		    
		    BasicDBObject filter = new BasicDBObject()
		    		.append("id", id);
		    
		    BasicDBObject updateFields = new BasicDBObject()
		    		.append("First Name", user.getFirstName())
		    		.append("Last Name", user.getLastName())
		    		.append("Phone Number", user.getPhoneNumber())
		    		.append("Birthday date", user.getBirthdayDate());
		    
		    BasicDBObject setQuery = new BasicDBObject()
		    		.append("$set", updateFields);
		    
		    collection.updateOne(filter, setQuery);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mongoClient.close();
		}
	}
	
	public static void deleteContact(String id){
		MongoClient mongoClient = new MongoClient();
		try {
		    MongoDatabase db = mongoClient.getDatabase(DATABASE);
		    MongoCollection<Document> collection = db.getCollection(COLLECTION_CONTACTS);
		    
		    BasicDBObject filter = new BasicDBObject()
		    		.append("id", id);
		    
		    Document o = collection.findOneAndDelete(filter);	    
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mongoClient.close();
		}
	}
	
	public static List<User> getAllContacts() {
		List<User> list = new ArrayList<User>();
		
		MongoClient mongoClient = new MongoClient();
		try {
		    MongoDatabase db = mongoClient.getDatabase(DATABASE);
		    MongoCollection<Document> collection = db.getCollection(COLLECTION_CONTACTS);
		    // perform read operation on the collection
	        FindIterable<Document> fi = collection.find();
	        MongoCursor<Document> cursor = fi.iterator();
	        try {
	        	while(cursor.hasNext()) {
	        		Document o = cursor.next();
	        		User user = new User((String) o.get("id"), (String) o.get("First Name"), (String) o.get("Last Name"), (String) o.get("Phone Number"), (String) o.get("Birthday date"));
	        		list.add(user);
	        	}
	        } finally {
	        	cursor.close();
	        }
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mongoClient.close();
		}
		return list;
	}
	
	public static void deleteAllContacts() {
		
		MongoClient mongoClient = new MongoClient();
		try {
		    MongoDatabase db = mongoClient.getDatabase(DATABASE);
		    MongoCollection<Document> collection = db.getCollection(COLLECTION_CONTACTS);
	        collection.drop();
	        
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			mongoClient.close();
		}
	}
	
}
