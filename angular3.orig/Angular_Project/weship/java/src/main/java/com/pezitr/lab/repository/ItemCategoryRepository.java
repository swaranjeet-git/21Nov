package com.pezitr.lab.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.ItemCategory;

public interface ItemCategoryRepository extends MongoRepository<ItemCategory, Integer> {

	
	public ItemCategory findById(Integer itemId);
	
	public ItemCategory findByName(String name);
	
	public List<ItemCategory> findByParentIdNullOrderById();
	
	public List<ItemCategory> findByParentId(Integer itemId);

}
