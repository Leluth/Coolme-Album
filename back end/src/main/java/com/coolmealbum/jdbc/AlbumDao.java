package com.coolmealbum.jdbc;

import com.coolmealbum.model.Album;

import java.util.List;

public interface AlbumDao {
    Long add(Album album);
    int update(Album album);
    int delete(Long albumid);
    Album find(Long albumid);

    List<Album> findUserAlbumsList(Long userid);

    List<Album> findWholeAlbumList();
}
