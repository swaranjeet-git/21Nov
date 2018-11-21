package com.pezitr.lab.repository.shipper;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.shipper.ListItem;

public interface ListItemRepository extends MongoRepository<ListItem, Integer> {

	public ListItem findById(Integer itemId);
	public List<ListItem> findByListId(Integer listingId);

}
