package com.pezitr.lab.controller;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.ItemCategory;
import com.pezitr.lab.repository.ItemCategoryRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"})
@RequestMapping("/itemtype")
public class ItemCategoryController {

	ItemCategoryRepository itemCategoryRepository;

	@Autowired
	SequenceIdService sequenceIdService;
	
	public ItemCategoryController(ItemCategoryRepository itemCategoryRepository) {
		super();
		this.itemCategoryRepository = itemCategoryRepository;
	}

	@GetMapping()
	public List<ItemCategory> getAll() {
		return itemCategoryRepository.findAll();
	}

	@GetMapping("/parent")
	public List<ItemCategory> getAllParent() {
		return itemCategoryRepository.findByParentIdNullOrderById();
	}
	
	@GetMapping("/{id}")
	public ItemCategory getAll(@PathVariable(value = "id") Integer id) {
		return itemCategoryRepository.findById(id);
	}
	@GetMapping("/parent/{id}")
	public List<ItemCategory>  getChildOfParentId(@PathVariable(value = "id") Integer id) {
		return itemCategoryRepository.findByParentId(id);
	}

	@PostMapping()
	public @ResponseBody ResponseEntity<ItemCategory> addItemCategory(@RequestBody ItemCategory itemCategory) throws Exception {
		itemCategory.setId((int)sequenceIdService.getNext(itemCategory));
		return new ResponseEntity<ItemCategory>(itemCategoryRepository.insert(itemCategory), HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<ItemCategory> updateItemCategory(@PathVariable Integer id, @RequestBody ItemCategory itemCategory) {
		itemCategory.setId(id);

		return new ResponseEntity<ItemCategory>(itemCategoryRepository.save(itemCategory), HttpStatus.OK);

	}
	
	
	@PostMapping("/bulk")
	public @ResponseBody ResponseEntity<List<ItemCategory>> addVehicleMaster(
			@RequestBody List<ItemCategory> itemCategoryList) throws Exception {
		itemCategoryList.forEach(itemCategory -> {
			try {
				itemCategory.setId((int) sequenceIdService.getNext(itemCategory));
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			itemCategoryRepository.insert(itemCategory);
		});

		// domainObject = vehicleMasterRepository.insert(domainObject);
		return new ResponseEntity<List<ItemCategory>>(itemCategoryList, HttpStatus.CREATED);
	}

	
	@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeItemCategory(@PathVariable(value = "id") Integer id) {
		itemCategoryRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
