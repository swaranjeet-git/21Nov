package com.pezitr.lab.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
@Document
public class SequenceId {

	@Id 
	private String id;
	private String key;
	private long seq;
	private String type;
	
	public SequenceId() {
	}
	
	   

	public SequenceId(String key, long seq, String type) {
		super();
		this.key = key;
		this.seq = seq;
	}



	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public long getSeq() {
		return seq;
	}

	public void setSeq(long seq) {
		this.seq = seq;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
