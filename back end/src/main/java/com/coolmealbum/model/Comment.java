package com.coolmealbum.model;

public class Comment {
    private Long commentid;
    private Long eleid;
    private Long userid;
    private Long tarid;
    private String comments;

    public Comment() {
    }

    public Comment(Long eleid, Long userid, String comments) {
        this.commentid=null;
        this.eleid = eleid;
        this.userid = userid;
        this.comments=comments;
        this.tarid=null;
    }

    public Comment(Long eleid, Long userid, Long tarid, String comments) {
        this(eleid, userid, comments);
        this.tarid = tarid;
    }

    public Long getCommentid() {
        return commentid;
    }

    public void setCommentid(Long commentid) {
        this.commentid = commentid;
    }

    public Long getEleid() {
        return eleid;
    }

    public void setEleid(Long eleid) {
        this.eleid = eleid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public Long getTarid() {
        return tarid;
    }

    public void setTarid(Long tarid) {
        this.tarid = tarid;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
