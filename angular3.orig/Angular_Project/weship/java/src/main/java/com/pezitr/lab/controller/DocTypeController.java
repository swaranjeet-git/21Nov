package com.pezitr.lab.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.DocumentType;
import com.pezitr.lab.repository.DocTypeRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/doctype")
public class DocTypeController {
	
	DocTypeRepository docTypeRepository;
	
	@Autowired
	SequenceIdService sequenceIdService;

	public DocTypeController(DocTypeRepository docTypeRepository/*, SequenceIdService sequenceIdService*/) {
		super();
		this.docTypeRepository = docTypeRepository;
	}
	
	@GetMapping()
	public List<DocumentType> getAll() {
		return docTypeRepository.findAll();
	}
	
	@PostMapping()
	public @ResponseBody ResponseEntity<DocumentType> addDocumentType(@RequestBody DocumentType documentType) throws Exception {
		documentType.setId((int)sequenceIdService.getNext(documentType));
		return new ResponseEntity<DocumentType>(docTypeRepository.insert(documentType), HttpStatus.CREATED);
	}
	
	@PostMapping("/bulk")
	public @ResponseBody ResponseEntity<List<DocumentType>> addDocumentType(
			@RequestBody List<DocumentType> documentTypeList) throws Exception {
		documentTypeList.forEach(documentType -> {
			try {
				documentType.setId((int) sequenceIdService.getNext(documentType));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			docTypeRepository.insert(documentType);
		});

		// domainObject = documentTypeRepository.insert(domainObject);
		return new ResponseEntity<List<DocumentType>>(documentTypeList, HttpStatus.CREATED);
	}

}
