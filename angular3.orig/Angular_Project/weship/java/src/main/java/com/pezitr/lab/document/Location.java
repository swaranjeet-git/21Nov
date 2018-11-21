package com.pezitr.lab.document;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.data.annotation.Id;

import com.google.gson.Gson;

public class Location {
	@Id
	private String id;
	private String route;
	private String sublocality2;
	private String sublocality1;
	private String locality;
	private String city;
	private String stateShort;
	private String stateLong;
	private String countryShort;
	private String countryLong;
	private String postalCode;

	private String lat;
	private String lng;

	public String getRoute() {
		return route;
	}

	public void setRoute(String route) {
		this.route = route;
	}

	public String getSublocality2() {
		return sublocality2;
	}

	public void setSublocality2(String sublocality2) {
		this.sublocality2 = sublocality2;
	}

	public String getSublocality1() {
		return sublocality1;
	}

	public void setSublocality1(String sublocality1) {
		this.sublocality1 = sublocality1;
	}

	public String getLocality() {
		return locality;
	}

	public void setLocality(String locality) {
		this.locality = locality;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getStateShort() {
		return stateShort;
	}

	public void setStateShort(String stateShort) {
		this.stateShort = stateShort;
	}

	public String getStateLong() {
		return stateLong;
	}

	public void setStateLong(String stateLong) {
		this.stateLong = stateLong;
	}

	public String getCountryShort() {
		return countryShort;
	}

	public void setCountryShort(String countryShort) {
		this.countryShort = countryShort;
	}

	public String getCountryLong() {
		return countryLong;
	}

	public void setCountryLong(String countryLong) {
		this.countryLong = countryLong;
	}

	public String getPostalCode() {
		return postalCode;
	}

	public void setPostalCode(String postalCode) {
		this.postalCode = postalCode;
	}

	// {"latlng":{"lat":18.5236284,"lng":73.93795790000001},
	// "address":[
	// {"long_name":"Greenfield Road","short_name":"Greenfield
	// Rd","types":["route"]}
	// ,{"long_name":"Amanora Park Town","short_name":"Amanora Park
	// Town","types":["political","sublocality","sublocality_level_2"]}
	// ,{"long_name":"Hadapsar","short_name":"Hadapsar","types":["political","sublocality","sublocality_level_1"]}
	// ,{"long_name":"Pune","short_name":"Pune","types":["locality","political"]}
	// ,{"long_name":"Pune","short_name":"Pune","types":["administrative_area_level_2","political"]}
	// ,{"long_name":"Maharashtra","short_name":"MH","types":["administrative_area_level_1","political"]}
	// ,{"long_name":"India","short_name":"IN","types":["country","political"]}
	// ,{"long_name":"411028","short_name":"411028","types":["postal_code"]}]}

	public String getLat() {
		return lat;
	}

	public void setLat(String lat) {
		this.lat = lat;
	}

	public String getLng() {
		return lng;
	}

	public void setLng(String lng) {
		this.lng = lng;
	}
	
	public String getLatLng()
	{
		return lat+","+lng;
	}
	
	public Location() {
		// TODO Auto-generated constructor stub
	}

	public Location(String locationStr) {
		if (locationStr != null) {
			try {

				JSONObject loc = new JSONObject(locationStr);
				// console.log(loc);
				JSONObject coordinate = loc.getJSONObject("latlng");
				this.lat = Double.toString(coordinate.getDouble("lat"));
				this.lng = Double.toString(coordinate.getDouble("lng"));
				List<Map> address = new ArrayList<Map>();

				JSONArray jSONArray = loc.getJSONArray("address");
				for (int i = 0; i < jSONArray.length(); i++) {
					Map addressElements = new HashMap();
					addressElements.put("short_name", ((JSONObject) jSONArray.get(i)).getString("short_name"));
					addressElements.put("long_name", ((JSONObject) jSONArray.get(i)).getString("long_name"));
					List<String> typelist = new ArrayList();
					JSONArray typeObj = ((JSONObject) jSONArray.get(i)).getJSONArray("types");
					for (int j = 0; j < typeObj.length(); j++) {
						typelist.add(typeObj.getString(j));
					}
					addressElements.put("types", typelist);
					address.add(addressElements);

				}

				List<Map> temp;

				temp = address.parallelStream().filter((element) -> {
					return ((List<String>) element.get("types")).indexOf("route") >= 0;
				}).collect(Collectors.toList());
				this.route = temp != null && temp.size() > 0 ? (String) temp.get(0).get("long_name") : "";
				temp = address.parallelStream().filter((element) -> {
					return ((List<String>) element.get("types")).indexOf("sublocality_level_1") >= 0
							&& ((List<String>) element.get("types")).indexOf("sublocality") >= 0;
				}).collect(Collectors.toList());
				this.sublocality1 = temp != null && temp.size() > 0 ? (String) temp.get(0).get("short_name") : "";
				temp = address.parallelStream().filter((element) -> {
					return (((List<String>) element.get("types")).indexOf("sublocality_level_2") >= 0
							|| ((List<String>) element.get("types")).indexOf("sublocality_level_3") >= 0)
							&& ((List<String>) element.get("types")).indexOf("sublocality") >= 0;

				}).collect(Collectors.toList());
				this.sublocality2 = temp != null && temp.size() > 0 ? (String) temp.get(0).get("short_name") : "";
				temp = address.parallelStream().filter((element) -> {
					return ((List<String>) element.get("types")).indexOf("locality") >= 0;
				}).collect(Collectors.toList());
				this.locality = temp != null && temp.size() > 0 ? (String) temp.get(0).get("short_name") : "";
				temp = address.parallelStream().filter((element) -> {
					return ((List<String>) element.get("types")).indexOf("administrative_area_level_2") >= 0;
				}).collect(Collectors.toList());
				this.city = temp != null && temp.size() > 0 ? (String) temp.get(0).get("short_name") : "";

				temp = address.parallelStream().filter((element) -> {
					return ((List<String>) element.get("types")).indexOf("administrative_area_level_1") >= 0;
				}).collect(Collectors.toList());
				this.stateShort = temp != null && temp.size() > 0 ? (String) temp.get(0).get("short_name") : "";
				this.stateLong = temp != null && temp.size() > 0 ? (String) temp.get(0).get("long_name") : "";

				temp = address.parallelStream().filter((element) -> {
					return ((List<String>) element.get("types")).indexOf("country") >= 0;
				}).collect(Collectors.toList());
				this.countryShort = temp != null && temp.size() > 0 ? (String) temp.get(0).get("short_name") : "";
				this.countryLong = temp != null && temp.size() > 0 ? (String) temp.get(0).get("long_name") : "";
				temp = address.parallelStream().filter((element) -> {
					return ((List<String>) element.get("types")).indexOf("postal_code") >= 0;
				}).collect(Collectors.toList());
				this.postalCode = temp != null && temp.size() > 0 ? (String) temp.get(0).get("short_name") : "";
				// console.log(this);
			} catch (Exception e) {
				// TODO: handle exception
			}
		}
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public static void main(String[] args) {
		Location loc = new Location(
				"{\"latlng\":{\"lat\":19.0759837,\"lng\":72.87765590000004},\"address\":[{\"long_name\":\"192\",\"short_name\":\"192\",\"types\":[\"street_number\"]},{\"long_name\":\"CST Road\",\"short_name\":\"Central Salsette Tramway Road\",\"types\":[\"route\"]},{\"long_name\":\"Friends Colony\",\"short_name\":\"Friends Colony\",\"types\":[\"political\",\"sublocality\",\"sublocality_level_3\"]},{\"long_name\":\"Hallow Pul\",\"short_name\":\"Hallow Pul\",\"types\":[\"political\",\"sublocality\",\"sublocality_level_2\"]},{\"long_name\":\"Kurla\",\"short_name\":\"Kurla\",\"types\":[\"political\",\"sublocality\",\"sublocality_level_1\"]},{\"long_name\":\"Mumbai\",\"short_name\":\"Mumbai\",\"types\":[\"locality\",\"political\"]},{\"long_name\":\"Mumbai Suburban\",\"short_name\":\"Mumbai Suburban\",\"types\":[\"administrative_area_level_2\",\"political\"]},{\"long_name\":\"Maharashtra\",\"short_name\":\"MH\",\"types\":[\"administrative_area_level_1\",\"political\"]},{\"long_name\":\"India\",\"short_name\":\"IN\",\"types\":[\"country\",\"political\"]},{\"long_name\":\"400070\",\"short_name\":\"400070\",\"types\":[\"postal_code\"]}]}");
		System.out.println(loc.toJSONString());
	}

	public String toJSONString() {
		Gson gson = new Gson();
		return gson.toJson(this);
	}

}
