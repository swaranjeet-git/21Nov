package com.pezitr.lab.services.serviceImpl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pezitr.lab.document.SequenceId;
import com.pezitr.lab.repository.SequenceIdRepository;
import com.pezitr.lab.services.SequenceIdService;

@Service
public class SequenceIdServiceImpl implements SequenceIdService {
	@Autowired
	private SequenceIdRepository sequenceIdRepository;

	private String sequenceIdKey;

	// @Autowired
	// private MongoOperations mongoOperation;

	@Override
	public synchronized long getNext(Object obj) throws Exception {

		// Query query = new Query(Criteria.where("_id").is(sequenceId));
		//
		// // increase sequence id by 1
		// Update update = new Update();
		// update.inc("seq", 1);
		//
		// // return new increased id
		// FindAndModifyOptions options = new FindAndModifyOptions();
		// options.returnNew(true);
		//
		// // this is the magic happened.
		// SequenceId seqId = mongoOperation.findAndModify(query, update, options,
		// SequenceId.class);
		//
		// // if no id, throws SequenceException
		// // optional, just a way to tell user when the sequence id is failed to
		// generate.
		// if (seqId == null) {
		// throw new Exception("Unable to get sequence id for key : " + sequenceId);
		// }
		//
		// return seqId.getSeq();

		sequenceIdKey = obj.getClass().getSimpleName() + "_SEQ";
		SequenceId seq = sequenceIdRepository.findOneByKey(sequenceIdKey);
		long id;
		if (seq == null) {
			seq = new SequenceId();
			seq.setKey(sequenceIdKey);
			id = 1;

		} else {
			id = seq.getSeq() + 1;
		}
		seq.setSeq(id);
		sequenceIdRepository.save(seq);
		return id;

	}

	@Override
	public long getCurrent(Object obj) {
		sequenceIdKey = obj.getClass().getSimpleName() + "_SEQ";
		SequenceId seq = sequenceIdRepository.findOneByKey(sequenceIdKey);
		return seq.getSeq();
	}

}
