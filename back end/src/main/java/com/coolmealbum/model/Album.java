package com.coolmealbum.model;

import java.util.ArrayList;

public class Album {
    private Long albumid;
    private Long userid;
    private String albumName;

    private ArrayList<Ele> eleList;

    public Album(){}

    public Album(Long userid,String albumName){
        this.albumid=null;
        this.userid=userid;
        this.albumName=albumName;
        this.eleList=null;
    }

    public Long getAlbumid() {
        return albumid;
    }

    // 模型类的id不允许修改
    public void setAlbumid(Long albumid) {
        this.albumid = albumid;
    }

    public Long getUserid() {
        return userid;
    }

    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getAlbumName() {
        return albumName;
    }

    public void setAlbumName(String albumName) {
        this.albumName = albumName;
    }

    public ArrayList<Ele> getEleList() {
        return eleList;
    }

    public void setEleList(ArrayList<Ele> eleList) {
        this.eleList = eleList;
    }
}
