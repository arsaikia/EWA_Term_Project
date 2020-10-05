import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.ArrayList;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.text.SimpleDateFormat;
import java.text.ParseException; 
import java.io.*;

@WebServlet("/Utilities")

/* 
	Utilities class contains class variables of type HttpServletRequest, PrintWriter,String and HttpSession.

	Utilities class has a constructor with  HttpServletRequest, PrintWriter variables.
	  
*/

public class Utilities extends HttpServlet{
	HttpServletRequest req;
	PrintWriter pw;
	String url;
	HttpSession session; 
	public Utilities(HttpServletRequest req, PrintWriter pw) {
		this.req = req;
		this.pw = pw;
		this.url = this.getFullURL();
		this.session = req.getSession(true);
	}



	/*  Printhtml Function gets the html file name as function Argument, 
		If the html file name is Header.html then It gets Username from session variables.
		Account ,Cart Information ang Logout Options are Displayed*/

	public void printHtml(String file) {
		String result = HtmlToString(file);
		boolean userLoggedIn = session.getAttribute("username")!=null;
		//to print the right navigation in header of username cart and logout etc
		if (file == "Header.html") {
				result=result+"<div id='menu' style='float: right;'><ul>";
			if (userLoggedIn){
				String username = session.getAttribute("username").toString();
				String userrole = session.getAttribute("usertype").toString();
				username = Character.toUpperCase(username.charAt(0)) + username.substring(1);
				result = result +	"<li><a class=\"navButtons btn btn-dark btn-lg active\" role=\"button\" aria-pressed=\"true\">Hello, "+username+"</a></li>";

				if (userLoggedIn){
					result = result +	"<li><a href='ViewOrder' class=\"navButtons btn btn-dark btn-lg active\" id='viewOrderButton' role=\"button\">View Order</a></li>";
				}
								
				result = result +	"<li><div class=\"dropdown \"><button id='overrideDropdown' class=\"dropbtn\">User Actions</button>"
					+	"<div class=\"dropdown-content\">"
					+	"<a href='Account'>View Account</a>";

				if(userrole.equals("retailer")){
					result = result +"<a href=\"Actions\">Manage Products</a>";
				}else if(userrole.equals("manager")){
					result = result +"<a href=\"ActionsSales\">Cancel Orders</a>";
					result = result +"<a href=\"ActionsSalesEdit\">Manage Customers</a>";
				}
				result = result +"</div></div></li>"
			+ "<li><a class='overrideIcons' href='Logout'><img style='height:34px; padding: 3px 0px !important;' src='images/site/logout.svg'></a></li>";
			}
			else
			
				result = result + "<li><a class='overrideIcons' href='Login'><img style='height:34px; padding: 3px 0px !important;' src='images/site/login.svg'></a></li>";
				
				if (userLoggedIn){
					result = result +"<li><a class='overrideIcons' href='Cart'><img style='height:34px; padding: 3px 0px !important;' src='images/site/shopping-cart.svg'><span style='color:#6a5acd; font-weight: bold !important;' class='glyphicon'> " + " " + CartCount()+" </span></a></li></ul>";
				}
				result = result +"</div></div><div id='page'>";
				pw.print(result);
		} else
				pw.print(result);
	}
	

	/*  getFullURL Function - Reconstructs the URL user request  */

	public String getFullURL() {
		String scheme = req.getScheme();
		String serverName = req.getServerName();
		int serverPort = req.getServerPort();
		String contextPath = req.getContextPath();
		StringBuffer url = new StringBuffer();
		url.append(scheme).append("://").append(serverName);

		if ((serverPort != 80) && (serverPort != 443)) {
			url.append(":").append(serverPort);
		}
		url.append(contextPath);
		url.append("/");
		return url.toString();
	}

	/*  HtmlToString - Gets the Html file and Converts into String and returns the String.*/
	public String HtmlToString(String file) {
		String result = null;
		try {
			String webPage = url + file;
			URL url = new URL(webPage);
			URLConnection urlConnection = url.openConnection();
			InputStream is = urlConnection.getInputStream();
			InputStreamReader isr = new InputStreamReader(is);

			int numCharsRead;
			char[] charArray = new char[1024];
			StringBuffer sb = new StringBuffer();
			while ((numCharsRead = isr.read(charArray)) > 0) {
				sb.append(charArray, 0, numCharsRead);
			}
			result = sb.toString();
		} 
		catch (Exception e) {
		}
		return result;
	} 

	/*  logout Function removes the username , usertype attributes from the session variable*/

	public void logout(){
		session.removeAttribute("username");
		session.removeAttribute("usertype");
	}
	
	/*  logout Function checks whether the user is loggedIn or Not*/

	public boolean isLoggedin(){
		if (session.getAttribute("username")==null)
			return false;
		return true;
	}

	/*  username Function returns the username from the session variable.*/
	
	public String username(){
		if (session.getAttribute("username")!=null)
			return session.getAttribute("username").toString();
		return null;
	}
	
	/*  usertype Function returns the usertype from the session variable.*/
	public String usertype(){
		if (session.getAttribute("usertype")!=null)
			return session.getAttribute("usertype").toString();
		return null;
	}
	
	/*  getUser Function checks the user is a customer or retailer or manager and returns the user class variable.*/
	public User getUser(){
		String usertype = usertype();
		HashMap<String, User> hm=new HashMap<String, User>();
		String TOMCAT_HOME = System.getProperty("catalina.home");
			try
			{		
				FileInputStream fileInputStream=new FileInputStream(new File(TOMCAT_HOME+"\\webapps\\Tutorial_1\\UserDetails.txt"));
				ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);	      
				hm= (HashMap)objectInputStream.readObject();
			}
			catch(Exception e)
			{
			}	
		User user = hm.get(username());
		return user;
	}
	
	/*  getCustomerOrders Function gets  the Orders for the user*/
	public ArrayList<OrderItem> getCustomerOrders(){
		ArrayList<OrderItem> order = new ArrayList<OrderItem>(); 
		if(OrdersHashMap.orders.containsKey(username()))
			order= OrdersHashMap.orders.get(username());
		return order;
	}

	/*  getOrdersPaymentSize Function gets  the size of OrderPayment */
	public int getOrderPaymentSize(){
		HashMap<Integer, ArrayList<OrderPayment>> orderPayments = new HashMap<Integer, ArrayList<OrderPayment>>();
		String TOMCAT_HOME = System.getProperty("catalina.home");
			try
			{
				FileInputStream fileInputStream = new FileInputStream(new File(TOMCAT_HOME+"\\webapps\\Tutorial_1\\PaymentDetails.txt"));
				ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);	      
				orderPayments = (HashMap)objectInputStream.readObject();
			}
			catch(Exception e)
			{
			
			}
			int size=0;
			for(Map.Entry<Integer, ArrayList<OrderPayment>> entry : orderPayments.entrySet()){
					 size=size + 1;
					 
			}
			return size;		
	}

	/*  CartCount Function gets  the size of User Orders*/
	public int CartCount(){
		if(isLoggedin())
		return getCustomerOrders().size();
		return 0;
	}
	
	/* StoreProduct Function stores the Purchased product in Orders HashMap according to the User Names.*/

	public void storeProduct(String name,String type,String maker, String acc){
		if(!OrdersHashMap.orders.containsKey(username())){	
			ArrayList<OrderItem> arr = new ArrayList<OrderItem>();
			OrdersHashMap.orders.put(username(), arr);
		}
		ArrayList<OrderItem> orderItems = OrdersHashMap.orders.get(username());
		if(type.equals("consoles")){
			Console console;
			console = SaxParserDataStore.consoles.get(name);
			OrderItem orderitem = new OrderItem(console.getId(),console.getName(), console.getPrice(), console.getImage(), console.getRetailer(), 10.10);
			orderItems.add(orderitem);
		}
		if(type.equals("tvs")){
			Tv tv = null;
			tv = SaxParserDataStore.tvs.get(name);
			OrderItem orderitem = new OrderItem(tv.getId(),tv.getName(), tv.getPrice(), tv.getImage(), tv.getRetailer(), tv.getDiscount());
			orderItems.add(orderitem);
		}
		if(type.equals("sounds")){
			Sound sound = null;
			sound = SaxParserDataStore.sounds.get(name);
			OrderItem orderitem = new OrderItem(sound.getId(),sound.getName(), sound.getPrice(), sound.getImage(), sound.getRetailer(), sound.getDiscount());
			orderItems.add(orderitem);
		}
		if(type.equals("phones")){
			Phone phone = null;
			phone = SaxParserDataStore.phones.get(name);
			OrderItem orderitem = new OrderItem(phone.getId(),phone.getName(), phone.getPrice(), phone.getImage(), phone.getRetailer(), phone.getDiscount());
			orderItems.add(orderitem);
		}
		if(type.equals("laptops")){
			Laptop laptop = null;
			laptop = SaxParserDataStore.laptops.get(name);
			OrderItem orderitem = new OrderItem(laptop.getId(),laptop.getName(), laptop.getPrice(), laptop.getImage(), laptop.getRetailer(), laptop.getDiscount());
			orderItems.add(orderitem);
		}
		if(type.equals("vas")){
			Va va = null;
			va = SaxParserDataStore.vas.get(name);
			OrderItem orderitem = new OrderItem(va.getId(),va.getName(), va.getPrice(), va.getImage(), va.getRetailer(), va.getDiscount());
			orderItems.add(orderitem);
		}
		if(type.equals("wirelesss")){
			Wireless wireless = null;
			wireless = SaxParserDataStore.wirelesss.get(name);
			OrderItem orderitem = new OrderItem(wireless.getId(),wireless.getName(), wireless.getPrice(), wireless.getImage(), wireless.getRetailer(), wireless.getDiscount());
			orderItems.add(orderitem);
		}
		if(type.equals("tablets")){
			Tablet tablet = null;
			tablet = SaxParserDataStore.tablets.get(name);
			OrderItem orderitem = new OrderItem(tablet.getId(),tablet.getName(), tablet.getPrice(), tablet.getImage(), tablet.getRetailer(), 10.10);
			orderItems.add(orderitem);
		}
		if(type.equals("accessories")){	
			Accessory accessory = SaxParserDataStore.accessories.get(name); 
			OrderItem orderitem = new OrderItem(accessory.getId(),accessory.getName(), accessory.getPrice(), accessory.getImage(), accessory.getRetailer(), 10.10);
			orderItems.add(orderitem);
		}
		
	}
	// store the payment details for orders
	public void storePayment(int orderId,
		String orderName,double orderPrice,String userAddress,String creditCardNo, Date deliveryDate){
		HashMap<Integer, ArrayList<OrderPayment>> orderPayments= new HashMap<Integer, ArrayList<OrderPayment>>();
		String TOMCAT_HOME = System.getProperty("catalina.home");
			// get the payment details file 
			try
			{
				FileInputStream fileInputStream = new FileInputStream(new File(TOMCAT_HOME+"\\webapps\\Tutorial_1\\PaymentDetails.txt"));
				ObjectInputStream objectInputStream = new ObjectInputStream(fileInputStream);	      
				orderPayments = (HashMap)objectInputStream.readObject();
			}
			catch(Exception e)
			{
			
			}
			if(orderPayments==null)
			{
				orderPayments = new HashMap<Integer, ArrayList<OrderPayment>>();
			}
			// if there exist order id already add it into same list for order id or create a new record with order id
			
			if(!orderPayments.containsKey(orderId)){	
				ArrayList<OrderPayment> arr = new ArrayList<OrderPayment>();
				orderPayments.put(orderId, arr);
			}

			// Generate an future date for testing that we will use to set order date.
			// Set date as current for odd and future for even
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss"); 
			Date orderedDate = new Date();
			
			try { 
				orderedDate = sdf.parse("10-10-2020 01:10:20");
			} 
			catch (ParseException e) { 
				e.printStackTrace(); 
			}

			if(orderId % 2 != 0){
				orderedDate = new Date();
			}


			ArrayList<OrderPayment> listOrderPayment = orderPayments.get(orderId);		
			OrderPayment orderpayment = new OrderPayment(orderId,username(),orderName,orderPrice,userAddress,creditCardNo, orderedDate, deliveryDate); // DATE : new Date()
			listOrderPayment.add(orderpayment);	
			


			// add order details into file

			try
			{	
				FileOutputStream fileOutputStream = new FileOutputStream(new File(TOMCAT_HOME+"\\webapps\\Tutorial_1\\PaymentDetails.txt"));
				ObjectOutputStream objectOutputStream = new ObjectOutputStream(fileOutputStream);
            	objectOutputStream.writeObject(orderPayments);
				objectOutputStream.flush();
				objectOutputStream.close();       
				fileOutputStream.close();
			}
			catch(Exception e)
			{
				System.out.println("inside exception file not written properly");
			}	
	}

	
	/* getConsoles Functions returns the Hashmap with all consoles in the store.*/

	public HashMap<String, Console> getConsoles(){
			HashMap<String, Console> hm = new HashMap<String, Console>();
			hm.putAll(SaxParserDataStore.consoles);
			return hm;
	}

	/* getGames Functions returns the  Hashmap with all Games in the store.*/

	public HashMap<String, Tv> getTvs(){
		HashMap<String, Tv> hm = new HashMap<String, Tv>();
		hm.putAll(SaxParserDataStore.tvs);
		return hm;
}
	
	/* getTablets Functions returns the Hashmap with all Tablet in the store.*/

	public HashMap<String, Tablet> getTablets(){
			HashMap<String, Tablet> hm = new HashMap<String, Tablet>();
			hm.putAll(SaxParserDataStore.tablets);
			return hm;
	}
	
	/* getProducts Functions returns the Arraylist of consoles in the store.*/

	public ArrayList<String> getProducts(){
		ArrayList<String> ar = new ArrayList<String>();
		for(Map.Entry<String, Console> entry : getConsoles().entrySet()){			
			ar.add(entry.getValue().getName());
		}
		return ar;
	}
	

	/* getProducts Functions returns the Arraylist of games in the store.*/

	public ArrayList<String> getProductsTv(){		
		ArrayList<String> ar = new ArrayList<String>();
		for(Map.Entry<String, Tv> entry : getTvs().entrySet()){
			ar.add(entry.getValue().getName());
		}
		return ar;
	}
	
	/* getProducts Functions returns the Arraylist of Tablets in the store.*/

	public ArrayList<String> getProductsTablets(){		
		ArrayList<String> ar = new ArrayList<String>();
		for(Map.Entry<String, Tablet> entry : getTablets().entrySet()){
			ar.add(entry.getValue().getName());
		}
		return ar;
	}
	
	

}
