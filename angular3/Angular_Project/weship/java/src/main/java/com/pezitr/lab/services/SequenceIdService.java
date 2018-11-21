package com.pezitr.lab.services;

public interface SequenceIdService {
	
	public long getNext(Object obj) throws Exception;
	
	public long getCurrent(Object obj);
}
