package com.pezitr.lab.controller;

import java.awt.image.BufferedImage;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Collections;
import java.util.Date;

import javax.imageio.ImageIO;

import org.apache.tomcat.util.http.fileupload.ByteArrayOutputStream;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.client.http.FileContent;
import com.google.api.services.drive.model.File;
import com.pezitr.lab.document.VehicleMaster;
import com.pezitr.lab.document.shipper.ListItem;
import com.pezitr.lab.repository.VehicleMasterRepository;
import com.pezitr.lab.repository.shipper.ListItemRepository;
//import java.io.FileInputStream;
//import com.google.auth.oauth2.ServiceAccountCredentials;
//import com.google.cloud.storage.BlobId;
//import com.google.cloud.storage.BlobInfo;
//import com.google.cloud.storage.Bucket;
//import com.google.cloud.storage.BucketInfo;
//import com.google.cloud.storage.Storage;
//import com.google.cloud.storage.StorageOptions;
import com.pezitr.lab.services.GoogleAuthorizationService;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/image")
public class PhotoController {

	@Autowired
	GoogleAuthorizationService googleAuthorization;
//	Drive driveService = GoogleAuthorization.getDriveService();
	
	String vehicleFolder = "1kRMmRv1rdtjTPq1JE8iKu6fvbsMo8dcE";
	String itemFolder = "1HR4oBx41dT5dTZTDI2R-7SrB15m24e1z";
	@Autowired
	ListItemRepository listItemRepository;
	@Autowired
	VehicleMasterRepository vehicleMasterRepository;
	// private static final java.io.File DATA_STORE_DIR = new
	// java.io.File(GooglePhotoService.class.getClassLoader().getResource("").getPath(),
	// ".files/drive-java-apid");

	public PhotoController(SequenceIdService sequenceIdService) {
		super();
	}

	// Testing code to upload and download files
	// @PostMapping("/upload")
	// public void addUser(@RequestParam("extraField") String extraField,
	// @RequestParam("files") MultipartFile[] uploadfiles) throws Exception {
	//
	// File fileMetadata = new File();
	// fileMetadata.setName("photo.jpg");
	// java.io.File filePath = new java.io.File("files/photo.jpg");
	// FileContent mediaContent = new FileContent("image/jpeg", filePath);
	//// Drive driveService = getDriveService();
	//// File file = driveService.files().create(fileMetadata,
	// mediaContent).setFields("id").execute();
	// // System.out.println("File ID: " + file.getId());
	// System.out.println("");
	// }
	// @PostMapping("/upload")
	// public void addImage() throws Exception {
	//// public void addImage(@RequestParam("extraField") String extraField,
	//// @RequestParam("files") MultipartFile[] uploadfiles) throws Exception {
	//
	// InputStream in =
	// GooglePhotoService.class.getResourceAsStream("/EZShipper-75716a19f66d.json");
	// Storage storage =
	// StorageOptions.newBuilder().setProjectId("ezshipper-196413")
	// .setCredentials(ServiceAccountCredentials.fromStream(in))
	// .build().getService();
	//// Bucket bucket = new Bucket();
	//
	// String bucketName = "images";
	// Bucket bucket = storage.create(BucketInfo.of(bucketName));
	// System.out.printf("Bucket %s created.%n", bucket.getName());
	// String blobName = "truck.png";
	// BlobId blobId = BlobId.of("images", blobName);
	// InputStream inputStream = new FileInputStream(new
	// java.io.File("/home/vijay/Documents/truck.png"));
	//// BlobInfo blobInfo =
	// BlobInfo.newBuilder(blobId).setContentType("image/jpeg").build();
	// BlobInfo blobInfo = BlobInfo.newBuilder("images1",
	// "truck.png").setContentType("image/jpeg").build();
	// blobInfo.getBucket();
	// System.out.println();
	// }
	@GetMapping("/verify")
	public @ResponseBody ResponseEntity verify() {
		String fileId = "0BzCh5MTLC7yreHBPOWxnZjYwS2M";
		File file;
		try {
			file = googleAuthorization.getDriveService().files().get(fileId).setFields("id, name, webContentLink").execute();
			System.out.printf("URL : %s ", file.getWebContentLink());
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		// .executeMediaAndDownloadTo(outputStream);
		
		return new ResponseEntity(HttpStatus.OK);
		
	}
	
	@PostMapping("/upload/{id}")
	public ResponseEntity addUser(@PathVariable Integer id, @RequestParam("type") String resource,
			@RequestParam("image") MultipartFile[] uploadfiles) throws Exception {

		if (uploadfiles.length > 0) {
			Date currentDate = new Date();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String formattedDate = formatter.format(currentDate);
			java.io.File convFile = new java.io.File(/*Instant.now().getEpochSecond()*/formattedDate + "_" + uploadfiles[0].getOriginalFilename());
			System.out.println("process");
			convFile.createNewFile();
			System.out.println("Success");
			FileOutputStream fos = new FileOutputStream(convFile);
			fos.write(uploadfiles[0].getBytes());
			fos.close();
			File fileMetadata = new File();
			fileMetadata.setName(convFile.getName());
			FileContent mediaContent = new FileContent(uploadfiles[0].getContentType(), convFile);
			if (resource.equals("item")) {
				fileMetadata.setParents(Collections.singletonList(itemFolder));
			} else if (resource.equals("vehicle")) {
				fileMetadata.setParents(Collections.singletonList(vehicleFolder));
			}
			File file = googleAuthorization.getDriveService().files()
					.create(fileMetadata, mediaContent)
					.setFields("id, webContentLink")
					.execute();
			String imagUrl = "https://drive.google.com/uc?id=" + file.getId();
			// System.out.println(""+ file.getWebContentLink());

			if (imagUrl != null) {
				if (resource.equals("item")) {
					ListItem item = listItemRepository.findById(id);
					item.setImageUrl(imagUrl);
					listItemRepository.save(item);
				} else if (resource.equals("vehicle")) {
					VehicleMaster vMaster = vehicleMasterRepository.findById(id);
					vMaster.setImageUrl(imagUrl);
					vehicleMasterRepository.save(vMaster);
				}
			}
			convFile.delete();
		}
		return new ResponseEntity(HttpStatus.CREATED);
	}

	@GetMapping("/view/{id}")
	// @RequestMapping(value = "/download", produces = "image/png")
	public @ResponseBody ResponseEntity<byte[]> getImage(@PathVariable Integer id,
			@RequestParam("type") String resource) throws Exception {
		String imgUrl = null;
		if (resource.equals("item")) {
			imgUrl = listItemRepository.findById(id).getImageUrl();
		} else if (resource.equals("vehicle")) {
			imgUrl = vehicleMasterRepository.findById(id).getImageUrl();
		}

		URL obj = new URL(imgUrl);
		HttpURLConnection con = (HttpURLConnection) obj.openConnection();

		try {
			// Retrieve image from the classpath.
			InputStream is = con.getInputStream();

			// Prepare buffered image.
			BufferedImage img = ImageIO.read(is);

			// Create a byte array output stream.
			ByteArrayOutputStream bao = new ByteArrayOutputStream();

			// Write to output stream
			ImageIO.write(img, "png", bao);
			HttpHeaders header = new HttpHeaders();
			header.add(HttpHeaders.CONTENT_TYPE, "image/png");
			header.add(HttpHeaders.CONNECTION, "keep-alive");

			return new ResponseEntity<byte[]>(bao.toByteArray(), header, HttpStatus.OK);
			// return bao.toByteArray();
		} catch (IOException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * Build and return an authorized Drive client service.
	 * 
	 * @return an authorized Drive client service
	 * @throws IOException
	 */
	// public static Drive getDriveService() throws IOException {
	// Credential credential = authorize();
	// return new Drive.Builder(
	// HTTP_TRANSPORT, JSON_FACTORY, credential)
	// .setApplicationName(APPLICATION_NAME)
	// .build();
	// }
	// public static void main(String[] args) {
	// PhotoController photoController = new PhotoController(null);
	// try {
	// // photoController.addImage();
	// } catch (Exception e) {
	// // TODO Auto-generated catch block
	// e.printStackTrace();
	// }
	// }

}
