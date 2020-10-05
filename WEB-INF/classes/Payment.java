import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.*;

@WebServlet("/Payment")

public class Payment extends HttpServlet {
	
		protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		

		Utilities utility = new Utilities(request, pw);
		if(!utility.isLoggedin())
		{
			HttpSession session = request.getSession(true);				
			session.setAttribute("login_msg", "Please Login to Pay");
			response.sendRedirect("Login");
			return;
		}
		// get the payment details like credit card no address processed from cart servlet	

		String userName = request.getParameter("userName");
		String userAddress1 = request.getParameter("userAddress1");
		String userAddress2 = request.getParameter("userAddress2");
		String city = request.getParameter("city");
		String state = request.getParameter("state");
		String zip = request.getParameter("zip");

		


		String creditCardNo = request.getParameter("creditCardNo");
		String deliveryType = request.getParameter("deliveryType");

		// System.out.print("the user address is" +userAddress);
		// System.out.print(creditCardNo);
		String selectedStore = request.getParameter("store");
		HashMap<String, HashMap<String, String>> allStores = new HashMap<String, HashMap<String, String>>();
		
		// STORE1 Details
		HashMap<String, String> store1 = new HashMap<String, String>();
		store1.put("address", "2901 S King Drive");
		store1.put("city", "Chicago");
		store1.put("state", "Illinois");
		store1.put("zip", "60616");
		allStores.put("store1", store1);

		// STORE2 Details
		HashMap<String, String> store2 = new HashMap<String, String>();
		store2.put("address", "1615 S Clark St");
		store2.put("city", "Chicago");
		store2.put("state", "Illinois");
		store2.put("zip", "60617");
		allStores.put("store2", store2);
		
		// STORE3 Details
		HashMap<String, String> store3 = new HashMap<String, String>();
		store3.put("address", "2168 S Archer Ave");
		store3.put("city", "Chicago");
		store3.put("state", "Illinois");
		store3.put("zip", "60618");
		allStores.put("store3", store3);

		// STORE4 Details
		HashMap<String, String> store4 = new HashMap<String, String>();
		store4.put("address", "1224 S Wabash Ave, Chicago");
		store4.put("city", "Chicago");
		store4.put("state", "Illinois");
		store4.put("zip", "60605");
		allStores.put("store4", store4);
		
		// STORE5 Details
		HashMap<String, String> store5 = new HashMap<String, String>();
		store5.put("address", "433 W Harrison St Fl Lbby");
		store5.put("city", "Chicago");
		store5.put("state", "Illinois");
		store5.put("zip", "60699");
		allStores.put("store5", store5);
		
		// STORE6 Details
		HashMap<String, String> store6 = new HashMap<String, String>();
		store6.put("address", "333 N Des Plaines St");
		store6.put("city", "Chicago");
		store6.put("state", "Illinois");
		store6.put("zip", "60661");
		allStores.put("store6", store6);
		
		// STORE7 Details
		HashMap<String, String> store7 = new HashMap<String, String>();
		store7.put("address", "300 N Central Park Ave");
		store7.put("city", "Chicago");
		store7.put("state", "Illinois");
		store7.put("zip", "60625");
		allStores.put("store7", store7);
		
		// STORE8 Details
		HashMap<String, String> store8 = new HashMap<String, String>();
		store8.put("address", "3835 Roosevelt Rd");
		store8.put("city", "Chicago");
		store8.put("state", "Illinois");
		store8.put("zip", "60624");
		allStores.put("store8", store8);
		
		// STORE9 Details
		HashMap<String, String> store9 = new HashMap<String, String>();
		store9.put("address", "3200 W Roosevelt Rd");
		store9.put("city", "Chicago");
		store9.put("state", "Illinois");
		store9.put("zip", "60629");
		allStores.put("store9", store9);
		
		// STORE10 Details
		HashMap<String, String> store10 = new HashMap<String, String>();
		store10.put("address", "4055 W Arthington St");
		store10.put("city", "Chicago");
		store10.put("state", "Illinois");
		store10.put("zip", "60691");
		allStores.put("store10", store10);


		if(deliveryType.equals("pickup")){
			HashMap<String, String> currentStore = allStores.get(selectedStore);
			userAddress1 = currentStore.get("address");
			city = currentStore.get("city");
			state = currentStore.get("state");
			zip = currentStore.get("zip");
		}

		// System.out.println("\n :" + userName + " - " + userAddress1 + " - " + userAddress2 + " - " + city + " - " + state + " - " + zip + " - " + creditCardNo);



		String userAddress = userName + ", " + userAddress1 + ", " + userAddress2 + ", " + city + ", " + state + ", " + zip;
		if(!userName.isEmpty() && !userAddress1.isEmpty() && !city.isEmpty() && !state.isEmpty() && !zip.isEmpty() && !creditCardNo.isEmpty())
		{
			// Generate a delivery date
			Random rand = new Random(); 
			int deliveryBy = 14 + rand.nextInt(5);
			
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
			//Getting current date
			Calendar cal = Calendar.getInstance();		
			//Number of Days to add
			cal.add(Calendar.DAY_OF_MONTH, deliveryBy); 
			//Date after adding the days to the current date
			Date deliveryDate = cal.getTime(); 
			

			int orderId=utility.getOrderPaymentSize()+1;

			//iterate through each order

			for (OrderItem oi : utility.getCustomerOrders())
			{

				//set the parameter for each column and execute the prepared statement

				utility.storePayment(orderId, oi.getName(), oi.getPrice(), userAddress, creditCardNo, deliveryDate);
			}

			//remove the order details from cart after processing
			
			OrdersHashMap.orders.remove(utility.username());	
			utility.printHtml("Header.html");
			utility.printHtml("LeftNavigationBar.html");
			pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
			pw.print("<a style='font-size: 24px;'>Order</a>");
			pw.print("</h2><div style='overflow:hidden' class='entry'>");

			if(deliveryType.equals("pickup"))
			{
				String storeAddress = userAddress1 + ", " + city + ", " + state + ", " + zip;
				pw.print("<h3></br>Dear " + (userName) + "," + "</h3>");
				pw.print("<h6></br>You have selected Pickup for your order with order ID: " + (orderId) + "</h6></br>");
				pw.print("<h6>Please pick up your order from the store within " + (deliveryBy) + " business days. Latest by " + (deliveryDate) + "</br></br></br> Here is the address for your reference : </h6>");
				pw.print("<h6 style='font-style: italic;'>" + (storeAddress) + "</h6>");
				pw.print("</br></br><a href='Account'><span class='btnbuy'>Manage your orders</span></a><div id='page'/>");

			}
			else{
				pw.print("<h3></br>Dear " + (userName) + "," + "</h3>");
				pw.print("<h6></br>You have selected Delivery for your order with order ID: " + (orderId) + "</h6>");
				pw.print("<h6>Estimated arrival date for your order is : " + (deliveryDate) + "</h6></br></br>");
				pw.print("<p style='font-style: italic;'>Please note that orders must be cancelled 5 days prior to the delivery date.</p>");
				pw.print("</br></br><a href='Account'><span class='btnbuy'>Manage your orders</span></a><div id='page'/>");		
			
			// pw.print("<h2>Your Order");
			// pw.print("&nbsp&nbsp");  
			// pw.print("is stored ");
			// pw.print("<br>Your Order is successful with Order ID : "+(orderId));

			// pw.print("<br>Your Order will be delivered to your selected address : "+(userAddress));
			// pw.print("<br>Selected Delivery Type : "+(deliveryType));
			}

			pw.print("</h2></div></div></div>");		
			utility.printHtml("Footer.html");
		}else
		{
			String errorMsg = "";

			if(userName.isEmpty()){
				errorMsg = "Name ";
			}
			if(userAddress1.isEmpty()){
				if(!errorMsg.isEmpty()){
					errorMsg = errorMsg + ", ";
				}
				errorMsg = errorMsg + "Delivery Address ";
			}
			if(city.isEmpty()){
				if(!errorMsg.isEmpty()){
					errorMsg = errorMsg + ", ";
				}
				errorMsg = errorMsg + "City Name ";
			}
			if(state.isEmpty()){
				if(!errorMsg.isEmpty()){
					errorMsg = errorMsg + ", ";
				}
				errorMsg = errorMsg + "State Name ";
			}
			if(zip.isEmpty()){
				if(!errorMsg.isEmpty()){
					errorMsg = errorMsg + ", ";
				}
				errorMsg = errorMsg + "Zip Code ";
			}
			if(creditCardNo.isEmpty()){
				if(!errorMsg.isEmpty()){
					errorMsg = errorMsg + ", ";
				}
				errorMsg = errorMsg + "Valid Credit Card Number ";
			}

			utility.printHtml("Header.html");
			utility.printHtml("LeftNavigationBar.html");
			pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
			pw.print("<a style='font-size: 24px;'>Order</a>");
			pw.print("</h2><div class='entry'>");
			pw.print("<h4>Please enter the following details correctly : </h4>");
			pw.print("<h4 style='color:#be0029;font-weight: bold;'>"+(errorMsg));
			pw.print("</h4>");
			pw.print("</br></br><a href='Cart'><span class='btnbuy'>Back to Cart</span></a></ul></div></div><div id='page'>");
			pw.print("</h2></div></div></div>");		
			utility.printHtml("Footer.html");
		}	
	}
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();
		Utilities utility = new Utilities(request, pw);
		
		
	}
}
