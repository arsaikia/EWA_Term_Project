import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.*;
import java.io.*;

@WebServlet("/AddProduct")

public class AddProduct extends HttpServlet {	
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		
		


		/* From the HttpServletRequest variable name,type,maker and acessories information are obtained.*/

		Utilities utility = new Utilities(request, pw);
		String id = request.getParameter("id");
		String category = request.getParameter("category");
		String name = request.getParameter("name");
		String description = request.getParameter("description");
		String price = request.getParameter("price");
		String maker = request.getParameter("maker");
		String discount = request.getParameter("discount");
		String condition = request.getParameter("condition");
		String image = request.getParameter("image");

		
		if(category.toLowerCase().equals("tv")){			
			Tv tv = new Tv();
			tv.setId(id);
			tv.setName(name);
			tv.setDescription(description);
			tv.setPrice(Double.parseDouble(price));
			tv.setImage(image);
			tv.setRetailer(maker);
			tv.setCondition(condition);
			tv.setDiscount(Double.parseDouble(discount));
			SaxParserDataStore.tvs.put(id,tv);
			
			
			HashMap<String, Tv> hm=new HashMap<String, Tv>();
			String TOMCAT_HOME = System.getProperty("catalina.home");
			
			try
			{
 			 FileInputStream fileInputStream = new FileInputStream(new File(TOMCAT_HOME+"\\webapps\\Tutorial_1\\AddedTv.txt"));
			 ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);	      
			 hm= (HashMap)objectInputStream.readObject();
			}
			catch(Exception e)
			{
				
			}
			 
			 hm.put(id,tv);
			 
			 FileOutputStream fileOutputStream = new FileOutputStream(TOMCAT_HOME+"\\webapps\\Tutorial_1\\AddedTv.txt");
			 ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
			 objectOutputStream.writeObject(hm);
			 objectOutputStream.flush();
			 objectOutputStream.close();       
			 fileOutputStream.close();
			
			
		}
		
		utility.printHtml("Header.html");
		utility.printHtml("LeftNavigationBar.html");
		pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
		pw.print("<a style='font-size: 24px;'>Actions</a>");
		pw.print("</h2><div class='entry'>");
		pw.print("</h2></br>");

		utility.printHtml("LoaderOne.html");

		pw.print("<div style='display:flex;justify-content:center;align-items:center;'></br><h3>"+id+"</h3></div>");
		pw.print("</div></div>");		
		utility.printHtml("Footer.html");
		
		
		//displayCart(request, response);
		
	}
}
