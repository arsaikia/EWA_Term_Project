
/*********


http://www.saxproject.org/

SAX is the Simple API for XML, originally a Java-only API. 
SAX was the first widely adopted API for XML in Java, and is a �de facto� standard. 
The current version is SAX 2.0.1, and there are versions for several programming language environments other than Java. 

The following URL from Oracle is the JAVA documentation for the API

https://docs.oracle.com/javase/7/docs/api/org/xml/sax/helpers/DefaultHandler.html


*********/
import org.xml.sax.InputSource;

import java.io.IOException;
import java.text.ParseException;
import java.util.*;
import  java.io.StringReader;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

import org.xml.sax.Attributes;
import org.xml.sax.SAXException;
import org.xml.sax.helpers.DefaultHandler;


////////////////////////////////////////////////////////////

/**************

SAX parser use callback function  to notify client object of the XML document structure. 
You should extend DefaultHandler and override the method when parsin the XML document

***************/

////////////////////////////////////////////////////////////

public class SaxParserDataStore extends DefaultHandler {
    Console console;
	Tv tv;
	Sound sound;
	Phone phone;
	Laptop laptop;
	Va va;
	Wireless wireless;
	// INSERT
    Tablet tablet;
    Accessory accessory;
    static HashMap<String,Console> consoles;
	static HashMap<String,Tv> tvs;
	static HashMap<String,Sound> sounds;
	static HashMap<String,Phone> phones;
	static HashMap<String,Laptop> laptops;
	static HashMap<String,Va> vas;
	static HashMap<String,Wireless> wirelesss;
	// INSERT
    static HashMap<String,Tablet> tablets;
    static HashMap<String,Accessory> accessories;
    String consoleXmlFileName;
	HashMap<String,String> accessoryHashMap;
    String elementValueRead;
	String currentElement="";
    public SaxParserDataStore()
	{
	}
	public SaxParserDataStore(String consoleXmlFileName) {
    this.consoleXmlFileName = consoleXmlFileName;
    consoles = new HashMap<String, Console>();
	tvs = new  HashMap<String, Tv>();
	sounds = new  HashMap<String, Sound>();
	phones = new  HashMap<String, Phone>();
	laptops = new  HashMap<String, Laptop>();
	vas = new  HashMap<String, Va>();
	wirelesss = new  HashMap<String, Wireless>();
	// INSERT
	tablets=new HashMap<String, Tablet>();
	accessories=new HashMap<String, Accessory>();
	accessoryHashMap=new HashMap<String,String>();
	parseDocument();
    }

   //parse the xml using sax parser to get the data
    private void parseDocument() 
	{
        SAXParserFactory factory = SAXParserFactory.newInstance();
        try 
		{
	    SAXParser parser = factory.newSAXParser();
	    parser.parse(consoleXmlFileName, this);
        } catch (ParserConfigurationException e) {
            System.out.println("ParserConfig error");
        } catch (SAXException e) {
            System.out.println("SAXException : xml not well formed");
        } catch (IOException e) {
            System.out.println("IO error");
        }
	}

   

////////////////////////////////////////////////////////////

/*************

There are a number of methods to override in SAX handler  when parsing your XML document :

    Group 1. startDocument() and endDocument() :  Methods that are called at the start and end of an XML document. 
    Group 2. startElement() and endElement() :  Methods that are called  at the start and end of a document element.  
    Group 3. characters() : Method that is called with the text content in between the start and end tags of an XML document element.


There are few other methods that you could use for notification for different purposes, check the API at the following URL:

https://docs.oracle.com/javase/7/docs/api/org/xml/sax/helpers/DefaultHandler.html

***************/

////////////////////////////////////////////////////////////
	
	// when xml start element is parsed store the id into respective hashmap for console,tvs etc 
    @Override
    public void startElement(String str1, String str2, String elementName, Attributes attributes) throws SAXException {

        if (elementName.equalsIgnoreCase("console")) 
		{
			currentElement="console";
			console = new Console();
            console.setId(attributes.getValue("id"));
		}
        if (elementName.equalsIgnoreCase("tablet"))
		{
			currentElement="tablet";
			tablet = new Tablet();
            tablet.setId(attributes.getValue("id"));
        }
        if (elementName.equalsIgnoreCase("tv"))
		{
			currentElement="tv";
			tv= new Tv();
            tv.setId(attributes.getValue("id"));
		}
        if (elementName.equalsIgnoreCase("sound"))
		{
			currentElement="sound";
			sound= new Sound();
            sound.setId(attributes.getValue("id"));
		}
        if (elementName.equalsIgnoreCase("phone"))
		{
			currentElement="phone";
			phone= new Phone();
            phone.setId(attributes.getValue("id"));
		}
        if (elementName.equalsIgnoreCase("laptop"))
		{
			currentElement="laptop";
			laptop= new Laptop();
            laptop.setId(attributes.getValue("id"));
		}
        if (elementName.equalsIgnoreCase("va"))
		{
			currentElement="va";
			va= new Va();
            va.setId(attributes.getValue("id"));
		}
        if (elementName.equalsIgnoreCase("wireless"))
		{
			currentElement="wireless";
			wireless= new Wireless();
            wireless.setId(attributes.getValue("id"));
		}
		// INSERT

        if (elementName.equals("accessory"))
		{
			currentElement="accessory";
			accessory=new Accessory();
			accessory.setId(attributes.getValue("id"));
	    }


    }
	// when xml end element is parsed store the data into respective hashmap for console,tvs etc respectively
    @Override
    public void endElement(String str1, String str2, String element) throws SAXException {
		
 
        if (element.equals("console")) {
			consoles.put(console.getId(),console);
			return;
        }
 
        if (element.equals("tv")) {	 
			tvs.put(tv.getId(),tv);
			return;
		}
        if (element.equals("sound")) {	  
			sounds.put(sound.getId(),sound);
			return;
		}
        if (element.equals("phone")) {	  
			phones.put(phone.getId(),phone);
			return;
		}
        if (element.equals("laptop")) {	  
			laptops.put(laptop.getId(),laptop);
			return;
		}
        if (element.equals("va")) {	  
			vas.put(va.getId(),va);
			return;
		}
        if (element.equals("wireless")) {	  
			wirelesss.put(wireless.getId(),wireless);
			return;
		}

		// INSERT
		if (element.equals("accessory")) {
			accessories.put(accessory.getId(),accessory);
			accessory.setFoundAccessories(accessory.getId());
			return;
		}
		
		// Check accessory data is loaded
		if (element.equals("accessory") && currentElement.equals("console"))
		{	
			accessoryHashMap.put(elementValueRead,elementValueRead);
		}

		if (element.equals("tvaccessory") && currentElement.equals("tv"))
		{	
			accessoryHashMap.put(elementValueRead,elementValueRead);
		}

		if (element.equals("soundaccessory") && currentElement.equals("sound"))
		{	
			accessoryHashMap.put(elementValueRead,elementValueRead);
		}

		if (element.equalsIgnoreCase("accessory") && currentElement.equals("console")) {
			console.setAccessories(accessoryHashMap);
			accessoryHashMap=new HashMap<String,String>();
		}

		if (element.equalsIgnoreCase("tvaccessories") && currentElement.equals("tv")) {
			tv.setAccessories(accessoryHashMap);
			accessoryHashMap=new HashMap<String,String>();
		}

		if (element.equalsIgnoreCase("soundaccessories") && currentElement.equals("sound")) {
			sound.setAccessories(accessoryHashMap);
			accessoryHashMap=new HashMap<String,String>();
		}
	
		
		// INSERT
        if (element.equalsIgnoreCase("image")) {
		    if(currentElement.equals("console"))
				console.setImage(elementValueRead);
        	if(currentElement.equals("tv"))
				tv.setImage(elementValueRead);
        	if(currentElement.equals("sound"))
				sound.setImage(elementValueRead);
        	if(currentElement.equals("phone"))
				phone.setImage(elementValueRead);
        	if(currentElement.equals("laptop"))
				laptop.setImage(elementValueRead);
        	if(currentElement.equals("va"))
				va.setImage(elementValueRead);
        	if(currentElement.equals("wireless"))
			wireless.setImage(elementValueRead);
			// INSERT

            if(currentElement.equals("tablet"))
				tablet.setImage(elementValueRead);
            if(currentElement.equals("accessory"))
				accessory.setImage(elementValueRead);          
			return;
        }
        

		if (element.equalsIgnoreCase("discount")) {
            if(currentElement.equals("console"))
				console.setDiscount(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("tv"))
				tv.setDiscount(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("sound"))
				sound.setDiscount(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("phone"))
				phone.setDiscount(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("laptop"))
				laptop.setDiscount(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("va"))
				va.setDiscount(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("wireless"))
			wireless.setDiscount(Double.parseDouble(elementValueRead));
			// INSERT

            if(currentElement.equals("accessory"))
				accessory.setDiscount(Double.parseDouble(elementValueRead));          
			return;
	    }


		if (element.equalsIgnoreCase("condition")) {
            if(currentElement.equals("console"))
				console.setCondition(elementValueRead);
        	if(currentElement.equals("tv"))
				tv.setCondition(elementValueRead);
        	if(currentElement.equals("sound"))
				sound.setCondition(elementValueRead);
        	if(currentElement.equals("phone"))
				phone.setCondition(elementValueRead);
        	if(currentElement.equals("laptop"))
				laptop.setCondition(elementValueRead);
        	if(currentElement.equals("va"))
				va.setCondition(elementValueRead);
        	if(currentElement.equals("wireless"))
				wireless.setCondition(elementValueRead);
			// INSERT

            if(currentElement.equals("accessory"))
				accessory.setCondition(elementValueRead);          
			return;  
		}

		if (element.equalsIgnoreCase("manufacturer")) {
            if(currentElement.equals("console"))
				console.setRetailer(elementValueRead);
        	if(currentElement.equals("tv"))
				tv.setRetailer(elementValueRead);
        	if(currentElement.equals("sound"))
				sound.setRetailer(elementValueRead);
        	if(currentElement.equals("phone"))
				phone.setRetailer(elementValueRead);
        	if(currentElement.equals("laptop"))
				laptop.setRetailer(elementValueRead);
        	if(currentElement.equals("va"))
				va.setRetailer(elementValueRead);
        	if(currentElement.equals("wireless"))
				wireless.setRetailer(elementValueRead);
			// INSERT
            if(currentElement.equals("accessory"))
				accessory.setRetailer(elementValueRead);          
			return;
		}

        if (element.equalsIgnoreCase("name")) {
            if(currentElement.equals("console"))
				console.setName(elementValueRead);
        	if(currentElement.equals("tv"))
				tv.setName(elementValueRead);
        	if(currentElement.equals("sound"))
				sound.setName(elementValueRead);
        	if(currentElement.equals("phone"))
				phone.setName(elementValueRead);
        	if(currentElement.equals("laptop"))
				laptop.setName(elementValueRead);
        	if(currentElement.equals("va"))
				va.setName(elementValueRead);
        	if(currentElement.equals("wireless"))
				wireless.setName(elementValueRead);
			// INSERT
            if(currentElement.equals("accessory"))
				accessory.setName(elementValueRead);          
			return;
	    }
	
        if(element.equalsIgnoreCase("price")){
			if(currentElement.equals("console"))
				console.setPrice(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("tv"))
				tv.setPrice(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("sound"))
				sound.setPrice(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("phone"))
				phone.setPrice(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("laptop"))
				laptop.setPrice(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("va"))
				va.setPrice(Double.parseDouble(elementValueRead));
        	if(currentElement.equals("wireless"))
				wireless.setPrice(Double.parseDouble(elementValueRead));
			// INSERT
            if(currentElement.equals("accessory"))
				accessory.setPrice(Double.parseDouble(elementValueRead));          
			return;
		}
		
		if (element.equalsIgnoreCase("description")) {
            if(currentElement.equals("tv"))
				tv.setDescription(elementValueRead);
			if(currentElement.equals("sound"))
				sound.setDescription(elementValueRead);
			if(currentElement.equals("phone"))
				phone.setDescription(elementValueRead);
			if(currentElement.equals("laptop"))
				laptop.setDescription(elementValueRead);
			if(currentElement.equals("va"))
				va.setDescription(elementValueRead);
			if(currentElement.equals("wireless"))
				wireless.setDescription(elementValueRead);
			return;
	    }

	}
	//get each element in xml tag
    @Override
    public void characters(char[] content, int begin, int end) throws SAXException {
        elementValueRead = new String(content, begin, end);
    }


    /////////////////////////////////////////
    // 	     Kick-Start SAX in main       //
    ////////////////////////////////////////
	
//call the constructor to parse the xml and get product details
 public static void addHashmap() {
		String TOMCAT_HOME = System.getProperty("catalina.home");	
		new SaxParserDataStore(TOMCAT_HOME+"\\webapps\\Tutorial_1\\ProductCatalog.xml");
    } 
}
