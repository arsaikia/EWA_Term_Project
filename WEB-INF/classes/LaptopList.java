import java.io.*;
import java.util.*;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.InputStreamReader;

@WebServlet("/LaptopList")

public class LaptopList extends HttpServlet {

	/* Laptop Page Displays all the laptops and their Information in Best Deals */

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		String name = null;
		String CategoryName = request.getParameter("maker");
	

		HashMap<String, Laptop> hm = new HashMap<String, Laptop>();
		if(CategoryName==null){
			hm.putAll(SaxParserDataStore.laptops);
			name = "";
		}
		else
		{
		   if(CategoryName.equals("lennovo"))
		   {
			 for(Map.Entry<String,Laptop> entry : SaxParserDataStore.laptops.entrySet())
			 {
				if(entry.getValue().getRetailer().equals("Lennovo"))
				 {
					 hm.put(entry.getValue().getId(),entry.getValue());
				 }
			 }
				name = "Lennovo";
		   }
		   else if(CategoryName.equals("sony"))
		    {
			for(Map.Entry<String,Laptop> entry : SaxParserDataStore.laptops.entrySet())
				{
				 if(entry.getValue().getRetailer().equals("Sony"))
				 {
					 hm.put(entry.getValue().getId(),entry.getValue());
				 }
				}
				 name = "Sony";
			}
			else if(CategoryName.equals("apple"))
			{
				for(Map.Entry<String,Laptop> entry : SaxParserDataStore.laptops.entrySet())
				{
				 if(entry.getValue().getRetailer().equals("Apple"))
				 {
					 hm.put(entry.getValue().getId(),entry.getValue());
				 }
				}
			   	 name = "Apple";
			}
		}

		
		/* Header, Left Navigation Bar are Printed.

		All the Laptop and Laptop information are dispalyed in the Content Section

		and then Footer is Printed*/

		Utilities utility = new Utilities(request,pw);
		utility.printHtml("Header.html");
		utility.printHtml("LeftNavigationBar.html");
		pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
		pw.print("<a style='font-size: 24px;'>"+name+" Laptops</a>");
		pw.print("</h2><div class='entry'><table id='bestseller'>");
		int i = 1; int size= hm.size();
		for(Map.Entry<String, Laptop> entry : hm.entrySet())
		{
			Laptop laptop = entry.getValue();
			if(i%3==1) pw.print("<tr>");
			pw.print("<td><div id='shop_item'>");
			pw.print("<h3>"+laptop.getName()+"</h3>");
			pw.print("<strong>Price :$"+laptop.getPrice()+"</strong><ul>");
			pw.print("<strong>Discount : "+laptop.getDiscount()+" %</strong><ul>");
			
			
			pw.print("<li id='item'><img src='images/laptops/"+laptop.getImage()+"' alt='' /></li>");
			pw.print("</br><h6>"+ laptop.getDescription() + "</h6><br>");
			pw.print("<li><form method='post' action='Cart'>" +
					"<input type='hidden' name='name' value='"+entry.getKey()+"'>"+
					"<input type='hidden' name='type' value='laptops'>"+
					"<input type='hidden' name='maker' value='"+CategoryName+"'>"+
					"<input type='hidden' name='access' value=''>"+
					"<input type='submit' class='btnbuy' value='Buy Now'></form></li>");
			pw.print("<li><form method='post' action='WriteReview'>"+"<input type='hidden' name='name' value='"+entry.getKey()+"'>"+
					"<input type='hidden' name='type' value='laptops'>"+
					"<input type='hidden' name='maker' value='"+CategoryName+"'>"+
					"<input type='hidden' name='access' value=''>"+
				    "<input type='submit' value='WriteReview' class='btnreview'></form></li>");
			pw.print("<li><form method='post' action='ViewReview'>"+"<input type='hidden' name='name' value='"+entry.getKey()+"'>"+
					"<input type='hidden' name='type' value='laptops'>"+
					"<input type='hidden' name='maker' value='"+CategoryName+"'>"+
					"<input type='hidden' name='access' value=''>"+
				    "<input type='submit' value='ViewReview' class='btnreview'></form></li>");
			pw.print("</ul></div></td>");
			if(i%3==0 || i == size) pw.print("</tr>");
			i++;
		}	
		pw.print("</table></div></div></div>");
   
		utility.printHtml("Footer.html");
		
	}
}
