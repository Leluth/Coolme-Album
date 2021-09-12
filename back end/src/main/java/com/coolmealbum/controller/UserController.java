package com.coolmealbum.controller;

import com.coolmealbum.model.*;
import com.coolmealbum.service.AlbumService;
import com.coolmealbum.service.UserService;
import com.coolmealbum.utils.Constant;
import com.coolmealbum.utils.FileSaver;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.io.*;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private AlbumService albumService;

    // get userinfo for current user
    @RequestMapping(value = "")
    public User getUserInfo(@SessionAttribute User currentuser){
        User user=new User(currentuser);
        ArrayList<Album> albums=new ArrayList<>(albumService.getUserAlbums(user.getUserid()));
        user.setAlbums(albums);
        return user;
    }

    @RequestMapping(value = "/skech")
    public User getUserSkech(@RequestParam(name = "userid", required = false, defaultValue = "") Long userid,
                             @SessionAttribute(name = "currentuser") User currentuser) {
        if(userid==null) {
            userid=currentuser.getUserid();
        }
        return userService.getUser(userid);
    }

    // get messages
    @RequestMapping(value = "/messages")
    public List<Message> getUnreadMessages(@SessionAttribute(name = "currentuser") User currentuser) {
        return userService.getUserUnreadMessages(currentuser.getUserid());
    }

    @RequestMapping(value = "/main")
    public List<Message> getMainMessages(@SessionAttribute(name = "currentuser") User currentuser) {
        return userService.getUserMainMessages(currentuser.getUserid());
    }

    @RequestMapping(value = "/explore")
    public List<Ele> explore() {
        List<Ele> eles=albumService.getAllEles();
        eles.sort(new Comparator<Ele>() {
            @Override
            public int compare(Ele o1, Ele o2) {
                return -1;
            }
        });
        return eles;
    }

    // like a ele
    @RequestMapping(value = "/like")
    public int like(@RequestParam(name = "eleid") Long eleid,
                    @SessionAttribute(name = "currentuser") User currentuser) {
        return userService.likeEle(currentuser.getUserid(), eleid);
    }

    @RequestMapping(value = "/like/cancel")
    public int cancelLike(@RequestParam(name = "eleid") Long eleid,
                          @SessionAttribute(name = "currentuser") User currentuser) {
        return userService.cancelLike(currentuser.getUserid(), eleid);
    }

    @RequestMapping(value = "/like/likes")
    public List<Ele> getLikes(@RequestParam(name = "userid", required = false, defaultValue = "") Long userid,
                               @SessionAttribute(name = "currentuser") User currentuser) {
        if(userid==null) {
            userid=currentuser.getUserid();
        }
        return userService.getUserLikes(userid);
    }

    @RequestMapping(value = "/like/likers")
    public List<Long> getLikers(@RequestParam(name = "eleid") Long eleid) {
        // todo
        return userService.getEleLikers(eleid);
    }

    // comment a ele
    @RequestMapping(value = "/comment")
    public Long comment(@RequestParam(name = "eleid") Long eleid,
                        @RequestParam(name = "comments") String comments,
                        @RequestParam(name = "tarid") Long tarid,
                        @SessionAttribute(name = "currentuser") User currentuser) {
        Long commentid=albumService.addCommentToEle(new Comment(eleid, currentuser.getUserid(), tarid, comments));
        return commentid;
    }

    @RequestMapping(value = "/elecomments")
    public List<Comment> getEleComments(@RequestParam(name = "eleid") Long eleid) {
        return albumService.getEleComments(eleid);
    }

    // add a friend/following
    @RequestMapping(value = "/follow")
    public int follow(@RequestParam(name = "friendid") Long friendid,
                      @SessionAttribute(name = "currentuser") User currentuser) {
        int rs=userService.addFriend(currentuser.getUserid(), friendid);
        if(rs>0) {
            userService.createMessage(new Message(currentuser.getUserid(), friendid, Message.FOLLOW_MESSAGE, friendid));
        }
        return rs;
    }

    // unfollow
    @RequestMapping(value = "/follow/cancel")
    public int unfollow(@RequestParam(name = "friendid") Long friendid,
                        @SessionAttribute(name = "currentuser") User currentuser) {
        return userService.deleteFriend(currentuser.getUserid(), friendid);
    }

    // get your followers' list
    @RequestMapping(value = "/followers")
    public List<Long> getUserFollowers(@RequestParam(name = "userid", required = false, defaultValue = "") Long userid,
                                       @SessionAttribute(name = "currentuser") User currentuser){
        if(userid==null) {
            userid=currentuser.getUserid();
        }
        // todo
        return userService.getFollowers(userid);
    }

    // get your following's list
    @RequestMapping(value = "/followings")
    public List<Long> getUserFollowings(@RequestParam(name = "userid", required = false, defaultValue = "") Long userid,
                                        @SessionAttribute(name = "currentuser") User currentuser){
        if(userid==null) {
            userid=currentuser.getUserid();
        }
        // todo
        return userService.getFollowings(currentuser.getUserid());
    }

    // get your saved eles' list
    @RequestMapping(value = "/saved")
    public String getUserSavedList(){
        return null;
    }

    // get other users' info
    @RequestMapping(value = "/other")
    public User getOtherUserInfo(@RequestParam(name = "username") String otherUsername){
        return userService.getUser(otherUsername);
    }

    // current user account management
    // nothing to edit now
    @RequestMapping(value = "/account/edit")
    public int editUserAccount(@RequestParam(name = "password") String password,
                               @RequestParam(name = "avatar") MultipartFile avatar,
                                  HttpSession session) {
        User user = (User) session.getAttribute("currentuser");
        if (password != null) {
            user.setPassword(password);
        }
        if (avatar != null) {
            try {
                String path = avatar.getName() + avatar.getContentType().replaceAll("image/", "");
                FileSaver.Save(avatar.getBytes(), Constant.IMAGE_PREPATH + path);
                user.setAvatar(path);
            } catch (IOException e) {
                e.printStackTrace();
                return 0;
            }
        }
        int rs;
        if ((rs=userService.updateUser(user)) > 0) {
            session.setAttribute("currentuser", user);
        }
        return rs;
    }

    @RequestMapping(value = "/account/login")
    public Long loginUserAccount(@RequestParam(name = "username") String username,
                                 @RequestParam(name = "password") String password,
                                 HttpSession session){
        User user=new User(username,password);
        user=userService.verifyUser(user);
        Long userid=null;
        if(user!=null) {
            userid=user.getUserid();
            user.setUserid(userid);
            List<Long> friends=userService.getFollowers(userid);
            if(friends!=null) {
                user.setFriendsid(new ArrayList<>(friends));
            }
            session.setAttribute("currentuser",user);
        }
        return userid;
    }
    @RequestMapping(value = "/account/signup")
    public Long signupUserAccount(@RequestParam(name = "username") String username,
                                  @RequestParam(name = "password") String password,
                                  HttpSession session){
        User user=new User(username,password);
        Long userid=userService.createUser(user);
        if(userid!=null){
            user.setUserid(userid);
            session.setAttribute("currentuser",user);
        }
        return userid;
    }

    // user password management
    @RequestMapping(value = "/password/change")
    public int changeUserPassword(@RequestParam(name = "password") String password,
                                  @SessionAttribute(name = "currentuser") User currentUser){
        currentUser.setPassword(password);
        return userService.updateUser(currentUser);
    }

    // user album management
    @RequestMapping(value = "/album")
    public Album getAlbumInfo(@RequestParam(name = "albumid") Long albumid){
        return albumService.getAlbum(albumid);
    }
    @RequestMapping(value = "/albums")
    public List<Album> getAlbums(@SessionAttribute(name = "currentuser") User currentuser) {
        return albumService.getUserAlbums(currentuser.getUserid());
    }
    @RequestMapping(value = "/album/create")
    public Long createAlbum(@RequestParam(name = "albumname") String albumName,
                            @SessionAttribute(name = "currentuser") User currentuser){
        Long albumid=albumService.createAlbum(new Album(currentuser.getUserid(),albumName));
        if(albumid!=null) {
            Long userid=currentuser.getUserid();
            userService.createMessage(new Message(userid, userid, Message.ALBUM_MESSAGE, albumid));
            List<Long> friends=currentuser.getFriendsid();
            if(friends!=null) {
                for (Long friendid:
                        friends) {
                    userService.createMessage(new Message(userid, friendid, Message.ALBUM_MESSAGE, albumid));
                }
            }
        }
        return albumid;
    }
    @RequestMapping(value = "/album/delete")
    public int deleteAlbum(@RequestParam(name = "albumid") Long albumid){
        return albumService.deleteAlbum(albumid);
    }
    @RequestMapping(value = "/album/addele")
    public Long addAlbumEle(@RequestParam(name = "albumid") Long albumid,
                            @RequestParam(name = "file") List<MultipartFile> files,
                            @RequestParam(name = "description") String eleDescription,
                            @SessionAttribute(name = "currentuser") User currentuser) {
        // todo else file types
        Long eleid=null;
        for (MultipartFile file:
                files){
            String type = file.getContentType().replaceAll("image/", "");
            Ele ele = new Ele(type, eleDescription);
            try {
                FileSaver.Save(file.getBytes(), ele.getPrePath() + ele.getSource());
            } catch (IOException e) {
                e.printStackTrace();
                return Long.parseLong("-1");
            }
            if((eleid = albumService.addAlbumEle(albumid, ele))<=0) {
                break;
            }
            Long userid = currentuser.getUserid();
            userService.createMessage(new Message(userid, userid, Message.SHARE_MESSAGE, eleid));
            List<Long> friends = currentuser.getFriendsid();
            if (friends != null) {
                for (Long friendid :
                        friends) {
                    userService.createMessage(new Message(userid, friendid, Message.SHARE_MESSAGE, eleid));
                }
            }
        }
        return eleid;
    }
}
