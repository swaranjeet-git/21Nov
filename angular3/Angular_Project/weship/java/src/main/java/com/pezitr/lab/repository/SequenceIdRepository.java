package com.pezitr.lab.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.pezitr.lab.document.SequenceId;

public interface SequenceIdRepository extends MongoRepository<SequenceId, Integer> {

	SequenceId findOneByKey(String sequenceId);

}
