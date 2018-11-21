package com.pezitr.lab.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import org.json.JSONArray;
import org.json.JSONObject;

public class GoogleDistanceService {

	public static Map<String, String> getDistance(String fromLatLng, String toLatLng) {

		Map<String, String> data = new HashMap<String, String>();
		URL url;
		HttpURLConnection conn;
		try {
			url = new URL(
					"http://maps.googleapis.com/maps/api/distancematrix/json?origins="+fromLatLng+"&destinations="+toLatLng+"&mode=driving&language=en-EN&sensor=false");
			conn = (HttpURLConnection) url.openConnection();
			conn.setRequestMethod("GET");
			String line, outputString = "";
			BufferedReader reader = new BufferedReader(new InputStreamReader(conn.getInputStream()));
			while ((line = reader.readLine()) != null) {
				outputString += line;
			}
			
			JSONObject distanceData = new JSONObject(outputString);
			JSONArray elements = distanceData.getJSONArray("rows");
			if(elements.length()>0)
			{
				elements = ((JSONObject)elements.get(0)).getJSONArray("elements");
				if(elements.length()>0)
				{
					JSONObject element = ((JSONObject)elements.get(0));
					data.put("duration", ((JSONObject)element.getJSONObject("duration")).getString("text").toString()+","+ ((JSONObject)element.getJSONObject("duration")).getInt("value"));
					data.put("distance", ((JSONObject)element.getJSONObject("distance")).getString("text").toString()+","+ ((JSONObject)element.getJSONObject("distance")).getInt("value"));
				}
			}
			System.out.println(data);
		
		} catch (MalformedURLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return data;
	}
	
	public static void main(String[] args) {
		GoogleDistanceService gs  = new GoogleDistanceService();
		gs.getDistance("18.5019795,73.9289523","18.5012571,73.8605292");
	}
}
