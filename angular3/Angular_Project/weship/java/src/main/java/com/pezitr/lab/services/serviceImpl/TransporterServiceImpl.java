package com.pezitr.lab.services.serviceImpl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pezitr.lab.document.Bid;
import com.pezitr.lab.document.CompanyDetails;
import com.pezitr.lab.document.Transporter;
import com.pezitr.lab.document.TransporterTxn;
import com.pezitr.lab.document.User;
import com.pezitr.lab.document.UserVehicleDetails;
import com.pezitr.lab.document.UserVehicleDocument;
import com.pezitr.lab.document.shipper.ListItem;
import com.pezitr.lab.document.shipper.Listing;
import com.pezitr.lab.repository.CompanyDetailsRepository;
import com.pezitr.lab.repository.TransportRepository;
import com.pezitr.lab.repository.TransporterTxnRepository;
import com.pezitr.lab.repository.UserRepository;
import com.pezitr.lab.repository.UserVehicleDetailsRepository;
import com.pezitr.lab.repository.UserVehicleDocRepository;
import com.pezitr.lab.repository.shipper.ListItemRepository;
import com.pezitr.lab.repository.shipper.ListingRepository;
import com.pezitr.lab.services.SequenceIdService;
import com.pezitr.lab.services.TransporterService;

@Service
public class TransporterServiceImpl implements TransporterService {
	
	@Autowired
	SequenceIdService sequenceIdService;
	
	@Autowired
	TransportRepository transportRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	CompanyDetailsRepository companyDetailsRepository;
	
	@Autowired
	UserVehicleDetailsRepository userVehicleDetailsRepository;
	
	@Autowired
	UserVehicleDocRepository userVehicleDocRepository;
	
	@Autowired
	TransporterTxnRepository transporterTxnRepository;
	
	@Autowired
	ListingRepository listingRepository;
	
	@Autowired
	ListItemRepository listItemRepository;
	
	
	
//	public User addUser(User user) throws Exception{
//		
//		user.setId((int)sequenceIdService.getNext(user));
//		return user = userRepository.insert(user);
//			
//	}
	
	public CompanyDetails addCompanyDetails(CompanyDetails companyDetails) throws Exception{
		
		companyDetails.setId((int)sequenceIdService.getNext(companyDetails));
		return companyDetails = companyDetailsRepository.insert(companyDetails);
	}
	
	public UserVehicleDetails addUserVehicleDetails(UserVehicleDetails userVehicleDetails) throws Exception{
		
		userVehicleDetails.setId((int)sequenceIdService.getNext(userVehicleDetails));
		return userVehicleDetails = userVehicleDetailsRepository.insert(userVehicleDetails);
		
	}
	
	public UserVehicleDocument addUserVehicleDocument(UserVehicleDocument userVehicleDocument) throws Exception{
		userVehicleDocument.setId((int)sequenceIdService.getNext(userVehicleDocument));
		return userVehicleDocument = userVehicleDocRepository.insert(userVehicleDocument);
		
	}
	
	public List<Transporter> getTransporters(Integer id){
		
		
		List <UserVehicleDetails> listUserVehicleDetails = userVehicleDetailsRepository.findByVehicleMasterId(id);
		
		List<Integer> ids = new ArrayList<Integer>();
		
		listUserVehicleDetails.forEach(vehicleDetails -> {
			ids.add(vehicleDetails.getId());
		});
		return transportRepository.findByVehicleDetailIn(ids);
		 
	}
	
	//List <Integer> listingIds = null;
	public List<TransporterTxn> getTranTxnByStatusListing(String id,String status){
		
		return transporterTxnRepository.findByUserIdAndStatus(id, status);
		
		
	}
	public List<TransporterTxn> getTranTxnByUser(String id){
		
		return transporterTxnRepository.findByUserId(id);
		
		
	}
	
	
	public List<ListItem> getOrderDetail(Integer listingId){
		
		return listItemRepository.findByListId(listingId);
	}
	
	
	public List<TransporterTxn> getTransporterTxn(Integer id, String status){
		
		return transporterTxnRepository.findByListingIdAndStatus(id, status);
	}
	
	
	@Override
	public TransporterTxn getUserTransporterTxn(Integer listingId, String userId) {
		// TODO Auto-generated method stub
		return transporterTxnRepository.findByListingIdAndUserId(listingId, userId);
	}
}
