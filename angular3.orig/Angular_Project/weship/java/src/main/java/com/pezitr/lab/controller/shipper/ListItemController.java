package com.pezitr.lab.controller.shipper;

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
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.pezitr.lab.document.shipper.ListItem;
import com.pezitr.lab.repository.shipper.ListItemRepository;
import com.pezitr.lab.services.SequenceIdService;

@RestController
@CrossOrigin(origins = {"https://pezitr-163717.firebaseapp.com", "http://localhost:4200"}, methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
@RequestMapping("/listItem")
public class ListItemController {

	ListItemRepository listItemRepository;
	
	@Autowired
	SequenceIdService sequenceIdService;

	public ListItemController(ListItemRepository listItemRepository, SequenceIdService sequenceIdService) {
		super();
		this.listItemRepository= listItemRepository;
	}

	@GetMapping()
	public List<ListItem> getAll() {
		return listItemRepository.findAll();
	}

	@GetMapping("/{id}")
	public ListItem getAll(@PathVariable(value = "id") Integer id) {
		return listItemRepository.findById(id);
	}
	
	/*Get  List Of ItemList  */
	@GetMapping("itemList/{listingId}")
	public List<ListItem> getDetailItemList(@PathVariable(value = "listingId") Integer listingId) {
		return listItemRepository.findByListId(listingId);
	}
	
	

	@PostMapping("/list")
	public @ResponseBody ResponseEntity<List<ListItem>> addListItem(@RequestBody List<ListItem> listItem) throws Exception {
		listItem.forEach((val) -> {
			try {
				val.setId((int)sequenceIdService.getNext(val));
				listItemRepository.insert(val);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		});
//		listItem.setId((int)sequenceIdService.getNext(listItem));
		return new ResponseEntity<List<ListItem>>(listItem, HttpStatus.CREATED);
	}
	
	@PostMapping()
	public @ResponseBody ResponseEntity<ListItem> addListing(@RequestBody ListItem listItem) throws Exception {
		listItem.setId((int)sequenceIdService.getNext(listItem));
		return new ResponseEntity<ListItem>(listItemRepository.insert(listItem), HttpStatus.CREATED);
	}
	
	

	@PutMapping("/{id}")
	public @ResponseBody ResponseEntity<ListItem> updateListItem(@PathVariable Integer id, @RequestBody ListItem listItem) {
		listItem.setId(id);

		return new ResponseEntity<ListItem>(listItemRepository.save(listItem), HttpStatus.OK);

	}

	@DeleteMapping("/{id}")
	public @ResponseBody ResponseEntity<Void> removeListItem(@PathVariable(value = "id") Integer id) {
		listItemRepository.delete(id);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

}
