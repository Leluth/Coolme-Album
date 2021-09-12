package com.coolmealbum.service;

import com.coolmealbum.jdbc.*;
import com.coolmealbum.model.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserServiceImpl implements UserService {
    @Autowired
    private UserDao userDao;
    @Autowired
    private UserRelationDao userRelationDao;
    @Autowired
    private LikeRelationDao likeRelationDao;
    @Autowired
    private MessageDao messageDao;
    @Autowired
    private EleDao eleDao;


    @Override
    public Long createUser(User user) {
        return userDao.add(user);
    }

    @Override
    public int updateUser(User user) {
        return userDao.update(user);
    }

    @Override
    public int deleteUser(User user) {
        return userDao.delete(user.getUserid());
    }

    @Override
    public User getUser(Long userid) {
        return userDao.find(userid);
    }

    @Override
    public User getUser(String username) {
        return userDao.find(username);
    }

    // friend/following service
    @Override
    public int addFriend(Long userid, Long friendid) {
        return userRelationDao.add(new UserRelation(userid, friendid));
    }

    @Override
    public int deleteFriend(Long userid, Long friendid) {
        return userRelationDao.deleteRelation(new UserRelation(userid, friendid));
    }

    @Override
    public int deleteUserFriends(Long userid) {
        return userRelationDao.deleteUserRelations(userid);
    }

    @Override
    public List<Long> getFollowers(Long userid) {
        return userRelationDao.findUserFollowers(userid);
    }

    @Override
    public List<Long> getFollowings(Long userid) {
        return userRelationDao.findUserFollowings(userid);
    }

    // like service
    @Override
    public int likeEle(Long userid, Long eleid) {
        return likeRelationDao.add(new LikeRelation(userid, eleid));
    }

    @Override
    public int cancelLike(Long userid, Long eleid) {
        return likeRelationDao.delete(new LikeRelation(userid, eleid));
    }
    // todo big cancel

    @Override
    public List<Ele> getUserLikes(Long userid) {
        List<Long> likes=likeRelationDao.findUserLikes(userid);
        ArrayList<Ele> eles=new ArrayList<>();
        for(Long id: likes) {
            eles.add(eleDao.find(id));
        }
        return eles.subList(0,eles.size());
    }

    @Override
    public List<Long> getEleLikers(Long eleid) {
        return likeRelationDao.findEleLikers(eleid);
    }

    @Override
    public User verifyUser(User user) {
        User userInfo=null;
        if(user!=null) {
            userInfo=userDao.find(user.getUsername());
        }
        if(userInfo!=null) {
            if(user.getPassword().equals(userInfo.getPassword())) {
                return userInfo;
            }
        }
        return null;
    }

    @Override
    public Long createMessage(Message message) {
        return messageDao.add(message);
    }

    @Override
    public List<Message> getUserMessages(Long userid) {
        return messageDao.findUserMessages(userid);
    }

    @Override
    public List<Message> getUserUnreadMessages(Long userid) {
        List<Message> messages=messageDao.findUserMessages(userid);
        List<Message> unreadMessages=new ArrayList<>();
        if(messages!=null) {
            for (Message message:
                    messages) {
                if(message.isFlag()) {
                    unreadMessages.add(message);
                    message.setUser(userDao.find(message.getUserid()));
                    messageDao.update(message.getMessageid());
                }
            }
        }
        return unreadMessages;
    }

    @Override
    public List<Message> getUserMainMessages(Long userid) {
        List<Message> messages=messageDao.findUserMessages(userid);
        List<Message> mainMessages=new ArrayList<>();
        if(messages!=null) {
            for (Message message:
                    messages) {
                if(message.getType()==Message.SHARE_MESSAGE) {
                    message.setEle(eleDao.find(message.getInfo()));
                    message.setUser(userDao.find(message.getUserid()));
                    List<Long> likes=likeRelationDao.findUserLikes(userid);
                    if(likes!=null&&message.getEle()!=null) {
                        message.setLikingEle(likes.contains(message.getEle().getEleid()));
                    } else {
                        message.setLikingEle(false);
                    }
                    mainMessages.add(message);
                }
            }
        }
        return mainMessages;
    }
}
