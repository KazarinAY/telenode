package telegram;

import java.net.HttpURLConnection;
import java.net.URL;
import java.io.DataOutputStream;
import java.io.InputStream;
import java.io.BufferedReader;
import java.io.InputStreamReader;

public class Application {
	private static final String TARGET = "http://89.108.79.137:7777/?param1=TEST";
	
	public static void main(String[] args) {
		System.out.println(excuteGet(TARGET));
	}

	public static String excuteGet(String targetURL) {
		URL url;
		BufferedReader rd;
		String line;
      	String result = "";
		HttpURLConnection connection = null;  
		try {
			//Create connection
			url = new URL(targetURL);
			connection = (HttpURLConnection)url.openConnection();
			connection.setRequestMethod("GET");
			rd = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			while ((line = rd.readLine()) != null) {
				result += line;
			}
			rd.close();			
			return result;
		} catch (Exception e) {

			e.printStackTrace();
			return null;

		} finally {

			if(connection != null) {
				connection.disconnect(); 
			}
		}
	}
}
