package com.pezitr.lab.controller.shared;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pezitr.lab.document.Address;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/upload")

public class ImageUploadController {
	
	private static final String UPLOAD_FOLDER = "D://temp//";
	
	public ImageUploadController() {
		System.out.println("====ImageUploadController===");
	}
	
	@PostMapping("/image")
	public @ResponseBody ResponseEntity<String> uploadImage(@RequestParam("extraField") String extraField,
			@RequestParam("files") MultipartFile[] uploadImagefile) throws Exception {
		
		if (uploadImagefile==null || uploadImagefile.length == 0) {
            return new ResponseEntity("please select a file!", HttpStatus.OK);
        }
		
	try {
			saveUploadedFiles(Arrays.asList(uploadImagefile));
			
        } 
	catch (IOException e) {
		System.out.println(e.getMessage());
		e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        return new ResponseEntity("Successfully uploaded - " +
        		uploadImagefile[0].getOriginalFilename(), new HttpHeaders(), HttpStatus.OK);
		
		
	}
	
	
	private void saveUploadedFiles(List<MultipartFile> files) throws IOException {
		//private void saveUploadedFiles(MultipartFile file) throws IOException {

        for (MultipartFile file : files) {

            if (file.isEmpty()) {
                continue; //next pls
            }

            byte[] bytes = file.getBytes();
           Path path = Paths.get(UPLOAD_FOLDER + file.getOriginalFilename());
           Files.write(path, bytes);

        }

    }
}
