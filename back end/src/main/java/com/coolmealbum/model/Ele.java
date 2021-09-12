package com.coolmealbum.model;

import com.coolmealbum.utils.Constant;

import java.util.ArrayList;

public class Ele {
    private String prePath;

    private Long eleid;
    private String source;
    private String description;
    // like ".png"
    private String type;

    private ArrayList<Comment> comments;

    public Ele() {
    }

    // image ele constructor
    public Ele(String type, String description) {
        this.prePath =Constant.IMAGE_PREPATH;
        this.type = type;
        this.comments=null;
        this.eleid = System.currentTimeMillis();
        this.source=eleid +"."+type;
        this.description=description;
    }

    // todo other ele constructor
    public Ele(Long eleid, String source, String description) {
        this.eleid=eleid;
        this.source=source;
        this.description=description;
    }


    public Ele(String description) {
        this.description = description;
    }

    public String getPrePath() {
        return prePath;
    }

    public void setPrePath(String prePath) {
        this.prePath = prePath;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comment> comments) {
        this.comments = comments;
    }

    public Long getEleid() {
        return eleid;
    }

    public void setEleid(Long eleid) {
        this.eleid = eleid;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
