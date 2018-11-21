package com.pezitr.lab.services;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.Collection;
import java.util.List;

import org.springframework.stereotype.Service;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.extensions.java6.auth.oauth2.AuthorizationCodeInstalledApp;
import com.google.api.client.extensions.jetty.auth.oauth2.LocalServerReceiver;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeFlow;
import com.google.api.client.googleapis.auth.oauth2.GoogleAuthorizationCodeTokenRequest;
import com.google.api.client.googleapis.auth.oauth2.GoogleClientSecrets;
import com.google.api.client.googleapis.auth.oauth2.GoogleTokenResponse;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.FileContent;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.client.util.store.FileDataStoreFactory;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.DriveScopes;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;

@Service
public class GoogleAuthorizationService {
	/** Application name. */
	private static final String APPLICATION_NAME = "Drive API Java Quickstart";
	
	private String redirectUri;

	/** Directory to store user credentials for this application. */
//	private static final java.io.File DATA_STORE_DIR = new java.io.File(GoogleAuthorizationService.class.getClassLoader().getResource("").getPath(),
			// ".credentials/drive-java-quickstart");
	private static final java.io.File DATA_STORE_DIR = new java.io.File(System.getProperty("user.home"),
			".files/drive-java-api");

	/** Global instance of the {@link FileDataStoreFactory}. */
	private static FileDataStoreFactory DATA_STORE_FACTORY;

	/** Global instance of the JSON factory. */
	private static final JsonFactory JSON_FACTORY = JacksonFactory.getDefaultInstance();

	/** Global instance of the HTTP transport. */
	private static HttpTransport HTTP_TRANSPORT;

	private static Credential credential = null;

	private static GoogleAuthorizationCodeFlow flow;
	
	private static String userId;
	private static String clientId;
	private static String clientSecret;

	/**
	 * Global instance of the scopes required by this quickstart.
	 *
	 * If modifying these scopes, delete your previously saved credentials at
	 * ~/.credentials/drive-java-quickstart
	 */
	private static final Collection<String> SCOPES = DriveScopes.all();

	static {
		try {
			HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
			DATA_STORE_FACTORY = new FileDataStoreFactory(DATA_STORE_DIR);
//			clientId = System.getenv("client_id")? ;
//			clientSecret = System.getenv("client_secret");
//			userId = System.getenv("client_name");
			clientId = "10823445495-rc09qlt99fi2l20ithk6gg0raebr44p1.apps.googleusercontent.com";
			clientSecret = "k_B406HxwXi95rGMq8Mnfy1z";
			userId = "vijay";
		} catch (Throwable t) {
			t.printStackTrace();
			System.exit(1);
		}
	}

	public GoogleAuthorizationService() {
		authorize(System.getenv("http://localhost:8080/Callback"));
//		authorize(System.getenv("redirect_url"));
	}
	/**
	 * Creates an authorized Credential object.
	 * 
	 * @return an authorized Credential object.
	 * @throws IOException
	 */
	public void authorize(String redirectUri){
		System.out.println("user Id is : "+userId);
		this.redirectUri = redirectUri;
		// Load client secrets.
//		InputStream in = GoogleAuthorizationService.class.getResourceAsStream("/client_secret.json");
//		GoogleClientSecrets clientSecrets = GoogleClientSecrets.load(JSON_FACTORY, new InputStreamReader(in));
		 System.out.println("Credentials will be saved to " +
		 DATA_STORE_DIR.getAbsolutePath());
		// Build flow and trigger user authorization request.
		if (flow == null) {
			try {
				flow = new GoogleAuthorizationCodeFlow.Builder(HTTP_TRANSPORT, JSON_FACTORY, clientId, clientSecret, SCOPES)
						.setDataStoreFactory(DATA_STORE_FACTORY).setAccessType("offline").setApprovalPrompt("force")
						.build();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
//		Credential credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize(userId);
		// System.out.println("Credentials saved to " +
		// DATA_STORE_DIR.getAbsolutePath());
//		return credential;
	}

	/**
	 * Build and return an authorized Drive client service.
	 * 
	 * @return an authorized Drive client service
	 * @throws IOException
	 */
	public Drive getDriveService() {

		try {
			if (credential == null) {
				credential = new AuthorizationCodeInstalledApp(flow, new LocalServerReceiver()).authorize(userId);
			}
		} catch (IOException e) {
			// TODO: handle exception
		}
		return new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential).setApplicationName(APPLICATION_NAME).build();
	}

	public void exchangeAccessToken(String authorizationCode) {
		GoogleTokenResponse token = null;
		try {
			token = new GoogleAuthorizationCodeTokenRequest(flow.getTransport(), flow.getJsonFactory(),
					flow.getClientId(), clientSecret, authorizationCode, redirectUri)
							.execute();
			flow.createAndStoreCredential(token, userId);
		} catch (IOException e) {
			throw new RuntimeException(e);
		}

	}

	private void getAllFiles(Drive service) throws IOException {
		// Build a new authorized API client service.
		// Drive service = getDriveService();

		// Print the names and IDs for up to 10 files.
		FileList result = service.files().list().setPageSize(10)
				.setFields("nextPageToken, files(id, name, webContentLink)").execute();
		List<File> files = result.getFiles();
		if (files == null || files.size() == 0) {
			System.out.println("No files found.");
		} else {
			System.out.println("Files:");
			for (File file : files) {
				System.out.printf("%s (%s)--URL is : %s\n", file.getName(), file.getId(), file.getWebContentLink());
				file.getWebContentLink();
			}
		}

	}

	private void getSingleFile(Drive service) throws IOException {

		String fileId = "0BzCh5MTLC7yreHBPOWxnZjYwS2M";
		File file = service.files().get(fileId).setFields("id, name, webContentLink").execute();
		// .executeMediaAndDownloadTo(outputStream);
		System.out.printf("URL : %s ", file.getWebContentLink());

	}

	private void fileUpload(Drive service) throws IOException {
		File fileMetadata = new File();
		fileMetadata.setName("photo.jpg");
		java.io.File filePath = new java.io.File("/home/vijay/Documents/back_truck.jpg");
		FileContent mediaContent = new FileContent("image/jpeg", filePath);
		File file = service.files().create(fileMetadata, mediaContent).setFields("id").execute();
		System.out.println("File ID: " + file.getId());
	}

	public static void main(String[] args) throws IOException {
		GoogleAuthorizationService authorization = new GoogleAuthorizationService();
		Drive service = authorization.getDriveService();
//		authorization.getAllFiles(service);
		authorization.getSingleFile(service);
		// fileUpload(service);

	}

}