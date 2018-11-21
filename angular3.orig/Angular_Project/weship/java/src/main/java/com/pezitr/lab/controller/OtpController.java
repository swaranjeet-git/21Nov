package com.pezitr.lab.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.Otp;
import com.pezitr.lab.repository.OtpRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/otp")
public class OtpController {

	OtpRepository otpRepository;
	
	@Autowired
	SequenceIdService sequenceIdService;

	public OtpController(OtpRepository otpRepository, SequenceIdService sequenceIdService) {
		super();
		this.otpRepository = otpRepository;
	}



	@GetMapping("/validate/{id}/{otp}")
	public Map<String, Boolean> getAll(@PathVariable(value = "id") String id, @PathVariable(value = "otp") String otp) {
		Map<String, Boolean> res = new HashMap<String, Boolean>();
		Otp otpTemp = otpRepository.findById(id);
		Instant instant = Instant.now();
		instant = instant.minus(15,ChronoUnit.MINUTES);
		res.put("valid", otpTemp.getOtp().equals(otp) && otpTemp.getModifiedDate().isAfter(instant));
		return res;
//		return otpRepository.findByIdAndOtp(id, otp)!=null;
	}

	

}
