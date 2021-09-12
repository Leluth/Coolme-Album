package com.coolmealbum.model;

import com.coolmealbum.utils.Constant;

import java.util.ArrayList;

public class User {
    private Long userid;
    private String username;
    private String password;
    private String avatar;

    private ArrayList<Album> albums;

    private ArrayList<Long> friendsid;

    public User() {
    }

    public User(String username, String password) {
        this.userid=null;
        this.username = username;
        this.password = password;
        this.avatar =Constant.DEFAULT_AVATAR;
        //todo
    }

    public User(User user){
        this.userid=user.getUserid();
        this.username=user.getUsername();
        this.password=user.getPassword();
        this.avatar =user.getAvatar();
        this.friendsid=user.getFriendsid();
    }

    public Long getUserid() {
        return userid;
    }

    // 模型类的id不允许直接修改
    public void setUserid(Long userid) {
        this.userid = userid;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public ArrayList<Album> getAlbums() {
        return albums;
    }

    public void setAlbums(ArrayList<Album> albums) {
        this.albums = albums;
    }

    public ArrayList<Long> getFriendsid() {
        return friendsid;
    }

    public void setFriendsid(ArrayList<Long> friendsid) {
        this.friendsid = friendsid;
    }
}
