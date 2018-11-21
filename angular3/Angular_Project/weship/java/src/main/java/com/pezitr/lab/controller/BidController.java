package com.pezitr.lab.controller;

import java.io.IOException;
import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

//import com.google.api.client.http.HttpHeaders;
import com.google.api.services.drive.Drive;
import com.pezitr.lab.document.Bid;
import com.pezitr.lab.repository.BidRepository;
import com.pezitr.lab.services.GoogleAuthorizationService;
import com.pezitr.lab.services.SequenceIdService;
//import com.google.api.client.auth.oauth2.Credential;
//import com.google.api.client.http.FileContent;
//import com.google.api.services.drive.model.*;
//import com.google.api.services.drive.Drive;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/bid")
public class BidController {

	BidRepository bidRepository;

	@Autowired
	SequenceIdService sequenceIdService;

	public BidController(BidRepository bidRepository, SequenceIdService sequenceIdService) {
		super();
		this.bidRepository = bidRepository;
	}

	@GetMapping()
	public List<Bid> getAll() {
		return bidRepository.findAll();
	}

	@GetMapping("/{id}")
	public Bid getAll(@PathVariable(value = "id") String id) {
		return bidRepository.findById(id);
	}
	
	@GetMapping("userbid/{transId}")
	public List<Bid> getUserBid(@PathVariable(value = "transId") String transId, @RequestParam("listId")Integer listId) {
		return bidRepository.findByTransIdAndListId(transId,listId);
	}

	@PostMapping()
	public @ResponseBody ResponseEntity<Bid> addBid(@RequestBody Bid bid) throws Exception {
		Instant instant = Instant.now();
		bid.setId((int)sequenceIdService.getNext(bid));
		bid.setDate(instant);
		return  new ResponseEntity<Bid>(bidRepository.insert(bid), HttpStatus.CREATED);
	}

// Testing code to upload and download files
//	@PostMapping("/upload")
//	public void addUser(@RequestParam("extraField") String extraField,
//			@RequestParam("files") MultipartFile[] uploadfiles) throws Exception {
//
//		File fileMetadata = new File();
//		fileMetadata.setName("photo.jpg");
//		java.io.File filePath = new java.io.File("files/photo.jpg");
//		FileContent mediaContent = new FileContent("image/jpeg", filePath);
////		Drive driveService = getDriveService();
////		File file = driveService.files().create(fileMetadata, mediaContent).setFields("id").execute();
//		// System.out.println("File ID: " + file.getId());
//		System.out.println("");
//	}
	

	/*@PostMapping("/upload")
	public void addUser(@RequestParam("extraField") String extraField,
			@RequestParam("files") MultipartFile[] uploadfiles) throws Exception {

		if (uploadfiles.length > 0) {
			java.io.File convFile = new java.io.File(Instant.now() + "_" + uploadfiles[0].getOriginalFilename());
			convFile.createNewFile();
			FileOutputStream fos = new FileOutputStream(convFile);
			fos.write(uploadfiles[0].getBytes());
			fos.close();
			File fileMetadata = new File();
			fileMetadata.setName(convFile.getName());
			FileContent mediaContent = new FileContent(uploadfiles[0].getContentType(), convFile);
			File file = driveService.files().create(fileMetadata, mediaContent).setFields("id").execute();
			System.out.println("File ID: " + file.getId());
			System.out.println("");
		}
	}

	@GetMapping("/download")
//	@RequestMapping(value = "/download", produces = "image/png")
	public @ResponseBody ResponseEntity<byte[]> getImage(@RequestParam String imgUrl) throws Exception {
		
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
	        	
	        
	        return new ResponseEntity<byte[]>(bao.toByteArray(), header, HttpStatus.CREATED);
//	        return bao.toByteArray();
	    } catch (IOException e) {
	        throw new RuntimeException(e);
	    }
	}

*/
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

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<Bid> updateBid(@PathVariable Integer id, @RequestBody Bid bid) {
		bid.setId(id);

		return new ResponseEntity<Bid>(bidRepository.save(bid), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeBid(@PathVariable(value = "id") Integer id) {
		bidRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
