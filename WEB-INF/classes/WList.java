import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/WList")

public class WList extends HttpServlet {

	/* Trending Page Displays all the Wirelesss and their Information in Game Speed */

	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();

	/* Checks the Wirelesss type whether it is microsft or apple or samsung */

		String name = null;
		String CategoryName = request.getParameter("maker");
		HashMap<String, Wireless> hm = new HashMap<String, Wireless>();

		if (CategoryName == null)	
		{
			hm.putAll(SaxParserDataStore.wirelesss);
			name = "";
		} 
		else 
		{
			if(CategoryName.equals("fitness")) 
			{	
				for(Map.Entry<String,Wireless> entry : SaxParserDataStore.wirelesss.entrySet())
				{
				  if(entry.getValue().getRetailer().equals("Fitness"))
				  {
					 hm.put(entry.getValue().getId(),entry.getValue());
				  }
				}
				name ="Fitness";
			} 
			else if (CategoryName.equals("smart"))
			{
				for(Map.Entry<String,Wireless> entry : SaxParserDataStore.wirelesss.entrySet())
				{
				  if(entry.getValue().getRetailer().equals("Smart"))
				  {
					 hm.put(entry.getValue().getId(),entry.getValue());
				  }
				}
				name = "Smart";
			} 
			else if (CategoryName.equals("headphone")) 
			{
				for(Map.Entry<String,Wireless> entry : SaxParserDataStore.wirelesss.entrySet())
				{
				  if(entry.getValue().getRetailer().equals("Headphone"))
				 {
					 hm.put(entry.getValue().getId(),entry.getValue());
				 }
				}	
				name = "Headphone";
			}
			else if (CategoryName.equals("vr")) 
			{
				for(Map.Entry<String,Wireless> entry : SaxParserDataStore.wirelesss.entrySet())
				{
				  if(entry.getValue().getRetailer().equals("VR"))
				 {
					 hm.put(entry.getValue().getId(),entry.getValue());
				 }
				}	
				name = "VR";
			}
			else if (CategoryName.equals("pettracker")) 
			{
				for(Map.Entry<String,Wireless> entry : SaxParserDataStore.wirelesss.entrySet())
				{
				  if(entry.getValue().getRetailer().equals("PetTracker"))
				 {
					 hm.put(entry.getValue().getId(),entry.getValue());
				 }
				}	
				name = "PetTracker";
			}
	    }

		/* Header, Left Navigation Bar are Printed.

		All the wirelesss and va information are dispalyed in the Content Section

		and then Footer is Printed*/

		Utilities utility = new Utilities(request, pw);
		utility.printHtml("Header.html");
		utility.printHtml("LeftNavigationBar.html");
		pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
		pw.print("<a style='font-size: 24px;'>" + name + " Wireless Tech</a>");
		pw.print("</h2><div class='entry'><table id='bestseller'>");
		int i = 1;
		int size = hm.size();
		for (Map.Entry<String, Wireless> entry : hm.entrySet()) {
			Wireless Wireless = entry.getValue();
			if (i % 3 == 1)
				pw.print("<tr>");
			pw.print("<td><div id='shop_item'>");
			pw.print("<h3>" + Wireless.getName() + "</h3>");
			pw.print("<strong>" + Wireless.getPrice() + "$</strong><ul>");
			pw.print("<strong>Discount : "+Wireless.getDiscount()+" %</strong><ul>");
			pw.print("<li id='item'><img src='images/wirelesss/"
					+ Wireless.getImage() + "' alt='' /></li>");
			pw.print("</br><h6>"+ Wireless.getDescription() + "</h6><br>");	
			pw.print("<li><form method='post' action='Cart'>" +
					"<input type='hidden' name='name' value='"+entry.getKey()+"'>"+
					"<input type='hidden' name='type' value='wirelesss'>"+
					"<input type='hidden' name='maker' value='"+CategoryName+"'>"+
					"<input type='hidden' name='access' value=''>"+
					"<input type='submit' class='btnbuy' value='Buy Now'></form></li>");
			pw.print("<li><form method='post' action='WriteReview'>"+"<input type='hidden' name='name' value='"+entry.getKey()+"'>"+
					"<input type='hidden' name='type' value='wirelesss'>"+
					"<input type='hidden' name='maker' value='"+CategoryName+"'>"+
					"<input type='hidden' name='access' value=''>"+
				    "<input type='submit' value='WriteReview' class='btnreview'></form></li>");
			pw.print("<li><form method='post' action='ViewReview'>"+"<input type='hidden' name='name' value='"+entry.getKey()+"'>"+
					"<input type='hidden' name='type' value='wirelesss'>"+
					"<input type='hidden' name='maker' value='"+CategoryName+"'>"+
					"<input type='hidden' name='access' value=''>"+
				    "<input type='submit' value='ViewReview' class='btnreview'></form></li>");
			pw.print("</ul></div></td>");
			if (i % 3 == 0 || i == size)
				pw.print("</tr>");
			i++;
		}
		pw.print("</table></div></div></div>");
		utility.printHtml("Footer.html");
	}
}
