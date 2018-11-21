package com.pezitr.lab.configuration;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.pezitr.lab.controller.ItemCategoryController;
import com.pezitr.lab.document.ItemCategory;
import com.pezitr.lab.document.User;
import com.pezitr.lab.repository.ItemCategoryRepository;
import com.pezitr.lab.repository.SequenceIdRepository;
import com.pezitr.lab.repository.UserRepository;

@EnableMongoRepositories(basePackageClasses = UserRepository.class)
@Configuration
public class DataSeed {

	@Bean
	CommandLineRunner init(UserRepository userRepository, SequenceIdRepository sequenceIdRepository,
			ItemCategoryController itemCategoryController, ItemCategoryRepository itemCategoryRepository) {
		return (evt) -> {
			User user = new User("Vijay", "Vyas", "vijay.bhilwara@gmail.com", "9823416496");
			user.setId("1");
			// userRepository.save(user);

			user = new User("Neelam", "Vyas", "neelu.vyas@gmail.com", "9823416496");
			user.setId("2");
			// userRepository.save(user);
			// String sequenceIdKey = new User().getClass().getSimpleName() +
			// "_SEQ";
			// SequenceId seq =
			// sequenceIdRepository.findOneByKey(sequenceIdKey);
			// if (seq == null) {
			// seq = new SequenceId();
			// seq.setKey(sequenceIdKey);
			// seq.setSeq(2);
			// sequenceIdRepository.save(seq);
			// }
			boolean insert = false;
			if (itemCategoryRepository.findByName("Vehicle") == null && insert) {
				itemCategoryController.addItemCategory(
						new ItemCategory("Vehicle", "Any big vehicle with 3 and more wheels", null, null));
				itemCategoryController.addItemCategory(
						new ItemCategory("Electronics & Appliances", "Electronics & Appliances", "appliances", null));
				itemCategoryController.addItemCategory(new ItemCategory("Furniture", "", "furniture", null));
				itemCategoryController.addItemCategory(new ItemCategory("Animals", "", "", null));
				itemCategoryController.addItemCategory(new ItemCategory("House hold items", "", "", null));
				itemCategoryController.addItemCategory(new ItemCategory("Others", "", "", null));

				itemCategoryController.addItemCategory(
						new ItemCategory("Cars", "", null, itemCategoryRepository.findByName("Vehicle")));
				itemCategoryController.addItemCategory(
						new ItemCategory("Two Wheelers", "", "vehicle", itemCategoryRepository.findByName("Vehicle")));
				itemCategoryController.addItemCategory(new ItemCategory("Commercial Vehicle", "", "vehicle",
						itemCategoryRepository.findByName("Vehicle")));
				itemCategoryController.addItemCategory(new ItemCategory("Farming Vehicle", "", "vehicle",
						itemCategoryRepository.findByName("Vehicle")));
				itemCategoryController.addItemCategory(new ItemCategory("Construction Vehicle", "", "vehicle",
						itemCategoryRepository.findByName("Vehicle")));
				itemCategoryController.addItemCategory(
						new ItemCategory("Spare Parts", "", "vehicle", itemCategoryRepository.findByName("Vehicle")));

				itemCategoryController.addItemCategory(
						new ItemCategory("Hatchback", "", "vehicle", itemCategoryRepository.findByName("Cars")));
				itemCategoryController.addItemCategory(
						new ItemCategory("Sedan", "", "vehicle", itemCategoryRepository.findByName("Cars")));
				itemCategoryController.addItemCategory(
						new ItemCategory("Van", "", "vehicle", itemCategoryRepository.findByName("Cars")));
				itemCategoryController.addItemCategory(
						new ItemCategory("SUV/MUV", "", "vehicle", itemCategoryRepository.findByName("Cars")));

				itemCategoryController.addItemCategory(
						new ItemCategory("Bike", "", "vehicle", itemCategoryRepository.findByName("Two Wheelers")));
				itemCategoryController.addItemCategory(
						new ItemCategory("Scooter", "", "vehicle", itemCategoryRepository.findByName("Two Wheelers")));

			}
		};
	}
}
