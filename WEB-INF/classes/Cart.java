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

@WebServlet("/Cart")

public class Cart extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter pw = response.getWriter();

        /* From the HttpServletRequest variable name,type,maker and acessories information are obtained.*/
        Utilities utility = new Utilities(request, pw);
		HttpSession session = request.getSession(true);

        String name = request.getParameter("name"); //THIS IS ACTUALLY PRODUCT ID
        String type = request.getParameter("type");
        String maker = request.getParameter("maker");
        String access = request.getParameter("access");

        // For manager added orders
        String managerOrdered = request.getParameter("managerOrdered");
        if (managerOrdered != null) {
            
            String userName = request.getParameter("userName");
            session.setAttribute("username", userName);
            session.setAttribute("usertype", "customer");
        }
		String uname = session.getAttribute("username").toString();
        /* StoreProduct Function stores the Purchased product in Orders HashMap.*/
        utility.storeProduct(name, type, maker, access);

        displayCart(request, response);

    }

    /* displayCart Function shows the products that users has bought, these products will be displayed with Total Amount.*/
    protected void displayCart(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html");
        PrintWriter pw = response.getWriter();
        Utilities utility = new Utilities(request, pw);
        Carousel carousel = new Carousel();
        if (!utility.isLoggedin()) {
            HttpSession session = request.getSession(true);
            session.setAttribute("login_msg", "Please Login to add items to cart");
            response.sendRedirect("Login");
            return;
        }

        utility.printHtml("Header.html");
        utility.printHtml("LeftNavigationBar.html");
        pw.print("<div id='content'><div class='post'><h2 class='title meta'>");
        pw.print("<a style='font-size: 24px;'>Cart(" + utility.CartCount() + ")</a>");
        pw.print("</h2><div class='entry'>");
        if (utility.CartCount() > 0) {
            pw.print("<table  class='gridtable'>");
            int i = 1;
            double total = 0;
            double discount = 0;
            for (OrderItem oi: utility.getCustomerOrders()) {

                pw.print("<tr>");
                pw.print("<td>" + i + ".</td><td>" + oi.getName() + "</td><td>: " + oi.getPrice() + "</td>");
                pw.print("<td><form name ='Cart1' action='Cart' method='get'><input type='hidden' name='orderName' value='" + oi.getName() + "'><input type='submit' name='RemoveItem' value='Remove' class='btnremove'></form></td>");
                pw.print("</tr>");
                total += oi.getPrice();
                discount += oi.getPrice() * (oi.getDiscount() / 100);
                i++;


            }

            double finaltotal = total - discount;


            pw.print("<tr><th></th><th>Total</th><th>" + total + "</th>");
            pw.print("<tr><th></th><th>Discount</th><th>" + discount + "</th>");
            pw.print("<tr><th></th><th>Grand Total</th><th>" + finaltotal + "</th>");


            pw.print("<form name ='Cart' action='CheckOut' method='post'>");
            pw.print("<input type='hidden' name='orderTotal' value='" + finaltotal + "'>");
            pw.print("<tr><td></td><td></td><td><input type='submit' name='CheckOut' value='CheckOut' class='btnbuy' /></form></td>");
            pw.print("</table>");
            /* This code is calling Carousel.java code to implement carousel feature*/
            pw.print(carousel.carouselfeature(utility));
        } else {
            pw.print("<h4 style='color:red'>Your Cart is empty</h4>");
        }

        pw.print("</div></div></div>");
        utility.printHtml("Footer.html");
    }
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        response.setContentType("text/html");
        PrintWriter pw = response.getWriter();
        Utilities utility = new Utilities(request, pw);
        if (request.getParameter("RemoveItem") != null && request.getParameter("RemoveItem").equals("Remove")) {
            String removeItem = request.getParameter("orderName");
            HttpSession session = request.getSession(true);
            String uname = session.getAttribute("username").toString();
            ArrayList < OrderItem > neworders = new ArrayList < OrderItem > ();
            for (OrderItem oi: OrdersHashMap.orders.get(uname)) {
                if (!oi.getName().equals(removeItem))
                    neworders.add(oi);
            }
            OrdersHashMap.orders.put(uname, neworders);

        }

        displayCart(request, response);

    }
}