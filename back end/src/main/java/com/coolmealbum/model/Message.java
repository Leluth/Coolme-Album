package com.coolmealbum.model;

public class Message {
    private Long messageid;
    private Long userid;
    private Long tarid;
    private boolean flag;
    private int type;
    private Long info;

    private User user;
    // todo
    private Comment comment;
    private Ele ele;

    private boolean isLikingEle;

    // to userid
    public final static int FOLLOW_MESSAGE=1;
    public final static int LIKE_MESSAGE=2;
    // to commentid
    public final static int COMMENT_MESSAGE=3;
    // to eleid
    public final static int SHARE_MESSAGE=4;
    // to album
    public final static int ALBUM_MESSAGE=5;

    public Message() {
    }

    public Message(Long userid, Long tarid, int type, Long info) {
        this.userid = userid;
        this.tarid = tarid;
        this.type=type;
        this.info=info;
        this.messageid=null;
        this.flag=true;
    }

    public Long getMessageid() {
        return messageid;
    }

    public void setMessageid(Long messageid) {
        this.messageid = messageid;
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

    public boolean isFlag() {
        return flag;
    }

    public void setFlag(boolean flag) {
        this.flag = flag;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }

    public Long getInfo() {
        return info;
    }

    public void setInfo(Long info) {
        this.info = info;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Ele getEle() {
        return ele;
    }

    public void setEle(Ele ele) {
        this.ele = ele;
    }

    public boolean isLikingEle() {
        return isLikingEle;
    }

    public void setLikingEle(boolean likingEle) {
        isLikingEle = likingEle;
    }
}
