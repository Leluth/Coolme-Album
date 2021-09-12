package com.coolmealbum.model;

public class LikeRelation {
    private Long userid;
    private Long eleid;

    public LikeRelation() {
    }

    public LikeRelation(Long userid, Long eleid) {
        this.userid = userid;
        this.eleid = eleid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getEleid() {
        return eleid;
    }

    public void setEleid(Long eleid) {
        this.eleid = eleid;
    }
}
