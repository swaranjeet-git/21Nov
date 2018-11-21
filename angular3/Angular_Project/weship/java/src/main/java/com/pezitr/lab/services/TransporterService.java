package com.pezitr.lab.services;

import java.util.List;

import org.springframework.web.bind.annotation.PathVariable;

import com.pezitr.lab.document.Bid;
import com.pezitr.lab.document.CompanyDetails;
import com.pezitr.lab.document.User;
import com.pezitr.lab.document.UserVehicleDetails;
import com.pezitr.lab.document.UserVehicleDocument;
import com.pezitr.lab.document.shipper.ListItem;
import com.pezitr.lab.document.shipper.Listing;
import com.pezitr.lab.document.Transporter;
import com.pezitr.lab.document.TransporterTxn;

public interface TransporterService {
	
//	public User addUser(User user) throws Exception;
	public CompanyDetails addCompanyDetails(CompanyDetails companyDetails) throws Exception;
	public UserVehicleDetails addUserVehicleDetails(UserVehicleDetails userVehicleDetails) throws Exception;
	public UserVehicleDocument addUserVehicleDocument(UserVehicleDocument UserVehicleDocument) throws Exception;
	public List<Transporter> getTransporters(Integer id);
	public List<TransporterTxn> getTranTxnByStatusListing(String id,String status);
	public List<TransporterTxn> getTranTxnByUser(String id);
	public List<ListItem> getOrderDetail(Integer id);
	public List<TransporterTxn> getTransporterTxn(Integer id, String status);
	public TransporterTxn getUserTransporterTxn(Integer listingId, String userId);
}
