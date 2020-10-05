import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.*;
import java.io.*;

@WebServlet("/EditSales")

public class EditSales extends HttpServlet {
	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setContentType("text/html");
		PrintWriter pw = response.getWriter();


		/* From the HttpServletRequest variable name,type,maker and acessories information are obtained.*/

		Utilities utility = new Utilities(request, pw);
		String id = request.getParameter("name");	//THIS IS ACTUALLY PRODUCT ID
		String type = request.getParameter("type");
		String maker = request.getParameter("maker");
		String access = request.getParameter("access");

		// For manager added orders
		HttpSession session = request.getSession(true);
		String originalUserName =session.getAttribute("username").toString();
		String userName = request.getParameter("userName");
		session.setAttribute("username", userName);
		session.setAttribute("usertype", "customer");
		String uname =session.getAttribute("username").toString();
		utility.storeProduct(id, type, maker, access);
		
        if (utility.CartCount() > 0) {
            int i = 1;
            double total = 0;
            double discount = 0;
            for (OrderItem oi: utility.getCustomerOrders()) {
                total += oi.getPrice();
                discount += oi.getPrice() * (oi.getDiscount() / 100);
                i++;
            }

            double finaltotal = total - discount;
			Random rand = new Random(); 
			int deliveryBy = 14 + rand.nextInt(5);
			
			SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
			Calendar cal = Calendar.getInstance();		
			cal.add(Calendar.DAY_OF_MONTH, deliveryBy); 
			Date deliveryDate = cal.getTime();

			int orderId=utility.getOrderPaymentSize()+1;
			for (OrderItem oi : utility.getCustomerOrders())
			{
				//set the parameter for each column and execute the prepared statement
				utility.storePayment(orderId, oi.getName(), oi.getPrice(), "userAddress", "creditCardNo", deliveryDate);
			}

			// Revert back to the original SALSEMAN (type : manager) user and set the session user name
			session.setAttribute("username", originalUserName);
			session.setAttribute("usertype", "manager");

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
			// response.sendRedirect("ActionsSalesEdit");

        } else {
            pw.print("<h4 style='color:red'>Your Cart is empty</h4>");
        }
    }
		
	}

