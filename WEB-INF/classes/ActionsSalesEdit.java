import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;
import java.io.*;
import java.sql.*;

@WebServlet("/ActionsSalesEdit")

public class ActionsSalesEdit extends HttpServlet {
	private String error_msg;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		Utilities utility = new Utilities(request, pw);

		String actionType = request.getParameter("actionType");
		if(actionType != null && actionType.equals("REGISTER_USER")){
			registerUser(request, response);
		}else{

			if(!utility.usertype().equals("customer")){
				displayActions(request, response);
			}else{
				displayWarning(request, response);
			}
		}
	}

	/* Display Actions Details of the Customer (Name and Usertype) */

	protected void displayActions(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		HttpSession session=request.getSession(); 
		PrintWriter pw = response.getWriter();
		Utilities utility = new Utilities(request, pw);

		try
         {  
           response.setContentType("text/html");
			if(!utility.isLoggedin())
			{
							
				session.setAttribute("login_msg", "Please Login to add items to cart");
				response.sendRedirect("Login");
				return;
			}
				
			utility.printHtml("Header.html");
			utility.printHtml("LeftNavigationBar.html");
			pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
			pw.print("<a style='font-size: 24px;'>Actions</a>");
			pw.print("</h2><div class='entry'>");
			User user=utility.getUser();
			pw.print("<table class='gridtable'>");
			pw.print("<tr>");
			pw.print("<td><strong>User Name:</strong></td>");
			pw.print("<td>" +user.getName()+ "</td>");
			pw.print("</tr>");
			pw.print("<tr>");
			pw.print("<td><strong>User Type:</strong></td>");
			pw.print("<td>" +user.getUsertype()+ "</td>");
			pw.print("</tr>");
			pw.print("</table>");		
			pw.print("</h2></br>");

			
			
			utility.printHtml("EditSales.html");

			//--------------------------------------------------------------------------
			if(user.getUsertype().equals("manager")){

				HashMap<String, User> allUsersHashMap=new HashMap<String, User>();
				String TOMCAT_HOME = System.getProperty("catalina.home");

				try{
					FileInputStream fileInputStream = new FileInputStream(new File(TOMCAT_HOME+"\\webapps\\Tutorial_1\\UserDetails.txt"));
					ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);	      
					allUsersHashMap= (HashMap)objectInputStream.readObject();
				}
					catch(Exception e)
				{
					System.out.println("\nHere in Exception!");
					
				}


				pw.print("</br></br>");
				pw.print("<table class='gridtable'>");
				pw.print("<tr><td>User Name:<td></td></td>");
				for(Map.Entry<String, User> entry : allUsersHashMap.entrySet()){

					pw.print("<td>"+entry.getKey()+"</td>");
					

				
				}
				pw.print("</tr>");

				pw.print("<tr><td>User Type:<td></td></td>");
				for(Map.Entry<String, User> entry : allUsersHashMap.entrySet()){

					pw.print("<td>"+entry.getValue().getUsertype()+"</td>");
					

				
				}
				pw.print("</tr>");
				
				pw.print("</table>");
					
					
					
				}
			//--------------------------------------------------------------------------
			
			pw.print("</div></div></div>");		
			utility.printHtml("Footer.html");	        	
		}
		catch(Exception e)
		{
		}		
	}
	
	protected void displayWarning(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		Utilities utility = new Utilities(request, pw);

		try
         {  
           response.setContentType("text/html");
			if(!utility.isLoggedin())
			{
				HttpSession session = request.getSession(true);				
				session.setAttribute("login_msg", "Please Login to add items to cart");
				response.sendRedirect("Login");
				return;
			}
			HttpSession session=request.getSession(); 	
			utility.printHtml("Header.html");
			utility.printHtml("LeftNavigationBar.html");
			pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
			pw.print("<a style='font-size: 24px;'>Actions</a>");
			pw.print("<h4 style='color:red'>You need admin rights to access actions</h4>");
			pw.print("</div></div>");
			utility.printHtml("Footer.html");	        	
		}
		catch(Exception e)
		{
		}		
	}


	protected void registerUser(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		Utilities utility = new Utilities(request, pw);

		String username = request.getParameter("username");
		String password = request.getParameter("password");
		String repassword = request.getParameter("repassword");
		String usertype = request.getParameter("usertype");

		if(!password.equals(repassword))
		{
			error_msg = "Passwords doesn't match!";
		}
		else
		{
			HashMap<String, User> hm=new HashMap<String, User>();
			String TOMCAT_HOME = System.getProperty("catalina.home");

			try
			{
 			 FileInputStream fileInputStream = new FileInputStream(new File(TOMCAT_HOME+"\\webapps\\Tutorial_1\\UserDetails.txt"));
			 ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);	      
			 hm= (HashMap)objectInputStream.readObject();
			}
			catch(Exception e)
			{
				
			}

			if(hm.containsKey(username))
				error_msg = "Username already exist as " + usertype;
			else
			{
				User user = new User(username,password,usertype);
				hm.put(username, user);
			    FileOutputStream fileOutputStream = new FileOutputStream(TOMCAT_HOME+"\\webapps\\Tutorial_1\\UserDetails.txt");
        		ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
           	 	objectOutputStream.writeObject(hm);
				objectOutputStream.flush();
				objectOutputStream.close();       
				fileOutputStream.close();

				// Show some html and redirecr
				utility.printHtml("Header.html");
				utility.printHtml("LeftNavigationBar.html");
				pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
				pw.print("<a style='font-size: 24px;'>Actions</a>");
				pw.print("</h2><div class='entry'>");
				pw.print("</h2></br>");
				
				utility.printHtml("Loader.html");
				
				pw.print("</div></div></div>");		
				utility.printHtml("Footer.html");
			}


		}

		// Error MSG
		utility.printHtml("Header.html");
		utility.printHtml("LeftNavigationBar.html");
		pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
		pw.print("<a style='font-size: 24px;'>Actions</a>");
		pw.print("</h2><div class='entry'>");
		pw.print("</h2></br><h2>" + (error_msg) + "</h2>");		
		pw.print("</div></div></div>");		
		utility.printHtml("Footer.html");
	}
}
