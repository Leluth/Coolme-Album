package com.coolmealbum.jdbc;

import com.coolmealbum.model.Ele;

import java.util.List;

public interface EleDao {
    Long add(Ele ele);
    int update(Ele ele);
    int delete(Long eleid);
    Ele find(Long eleid);

    List<Ele> findWholeEleList();
}
