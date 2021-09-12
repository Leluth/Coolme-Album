package com.coolmealbum.model;

public class Relation {
    private Long albumid;
    private Long eleid;

    public Relation() {
    }

    public Relation(Long albumid, Long eleid) {
        this.albumid = albumid;
        this.eleid = eleid;
    }

    public Long getAlbumid() {
        return albumid;
    }

    public void setAlbumid(Long albumid) {
        this.albumid = albumid;
    }

    public Long getEleid() {
        return eleid;
    }

    public void setEleid(Long eleid) {
        this.eleid = eleid;
    }
}
