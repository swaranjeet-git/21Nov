package com.pezitr.lab.controller;

import java.util.HashMap;
import java.util.Map;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.EmailDoc;
import com.pezitr.lab.document.Otp;
import com.pezitr.lab.repository.OtpRepository;
import com.pezitr.lab.services.OTPGenrator;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/email")
public class EmailController {

	@Autowired
	private JavaMailSender sender;
	
	@Autowired
	private OtpRepository oTPRepository;

	@PostMapping("otp")
	public @ResponseBody ResponseEntity<Map<String, String>> sendOtp(@RequestBody EmailDoc email) throws Exception {
		Map<String, String> res = new HashMap<String, String>();
		try {
			String otp = String.valueOf(OTPGenrator.OTP(6));
			email.setSubject("Varification code for WeShip");
			email.setMessage(getMessage(email.getName(), otp));
			sendEmail(email);
			oTPRepository.delete(email.getTo());
			oTPRepository.save(new Otp(email.getTo(), otp));
			res.put("message", "Email Sent!");
			return new ResponseEntity<Map<String, String>>(res, HttpStatus.OK);
		} catch (Exception ex) {
			res.put("error", "Error in sending email: " + ex);
			return new ResponseEntity<Map<String, String>>(res, HttpStatus.FORBIDDEN);
		}
	}

	private String getMessage(String name, String otp) {
		// TODO Auto-generated method stub
		return "Hi " + name + ", "
				+ "\nThanks for showing your intrested,"
				+ "\nPlease use "+ otp +" OTP for your varification, your OTP will be valid till 15 Min."

				+ "\nIf you have any questions, call us @ 020-67090767 / 7976796113 Or write us at info@pezitr.com."

				+ "\nThanks," 
				+ "\nWeship Team";
	}

	private void sendEmail(EmailDoc email) throws Exception {
		MimeMessage message = sender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message);

		helper.setTo(email.getTo());
		helper.setText(email.getMessage());
		helper.setSubject(email.getSubject());

		sender.send(message);
	}
}