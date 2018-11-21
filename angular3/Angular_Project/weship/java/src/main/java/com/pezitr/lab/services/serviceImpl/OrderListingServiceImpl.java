package com.pezitr.lab.services.serviceImpl;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import com.pezitr.lab.document.shipper.Listing;
import com.pezitr.lab.services.OrderListingService;

@Service
public class OrderListingServiceImpl implements OrderListingService {
	@Autowired
	MongoTemplate mongoTemplate;
	
	@Override
	public List<Listing> getAll(Map<String, String> queryParameters, Pageable pageable) {
		
		Query query = new Query();
		query.addCriteria(Criteria.where("toDate").gt(LocalDate.now()));
//		query.with(new Sort(Sort.Direction.ASC, "toDate"));
		query.with(pageable);
		
		if(queryParameters.get("city") != null) {
			if(!queryParameters.get("city").equals("all")) {
				Criteria criteria = new Criteria();
				criteria.orOperator(Criteria.where("fromCity").is(queryParameters.get("city")), Criteria.where("toCity").is(queryParameters.get("city")));
				query.addCriteria(criteria);
			}
		}
		if(queryParameters.get("isCovered") != null) {
			if(queryParameters.get("isCovered").equals("true")) {
				query.addCriteria(Criteria.where("covered").is(true));
			} else {
				query.addCriteria(Criteria.where("covered").is(false));
			}
		}
		if(queryParameters.get("isShared") != null) {
			if(queryParameters.get("isShared").equals("true")) {
				query.addCriteria(Criteria.where("shared").is(true));
			} else {
				query.addCriteria(Criteria.where("shared").is(false));
			}
		}
		
		List<Listing> listing = mongoTemplate.find(query,Listing.class);
		
		return listing;
	}
	
	public long getCount(Map<String, String> queryParameters) {
		
		Query query = new Query();
		query.addCriteria(Criteria.where("toDate").gt(LocalDate.now()));
		query.with(new Sort(Sort.Direction.ASC, "toDate"));
		//query.with(pageable);
		
		if(queryParameters.get("city") != null) {
			if(!queryParameters.get("city").equals("all")) {
				Criteria criteria = new Criteria();
				criteria.orOperator(Criteria.where("fromCity").is(queryParameters.get("city")), Criteria.where("toCity").is(queryParameters.get("city")));
				query.addCriteria(criteria);
			}
		}
		if(queryParameters.get("isCovered") != null) {
			if(queryParameters.get("isCovered").equals("true")) {
				query.addCriteria(Criteria.where("covered").is(true));
			} else {
				query.addCriteria(Criteria.where("covered").is(false));
			}
		}
		if(queryParameters.get("isShared") != null) {
			if(queryParameters.get("isShared").equals("true")) {
				query.addCriteria(Criteria.where("shared").is(true));
			} else {
				query.addCriteria(Criteria.where("shared").is(false));
			}
		}
		
		return mongoTemplate.count(query,Listing.class);
	
	}

	@Override
	public List<String> findDistinctFromCity() {
		return mongoTemplate.getCollection("listing").distinct("fromCity");
	}

	@Override
	public List<String> findDistinctToCity() {
		// TODO Auto-generated method stub
		return mongoTemplate.getCollection("listing").distinct("toCity");
	}
	
	
}
