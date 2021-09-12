package com.coolmealbum.controller;

import com.coolmealbum.jdbc.EleDao;
import com.coolmealbum.jdbc.UserDao;
import com.coolmealbum.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/test")
public class MockController {
    @Autowired
    private UserDao userDao;
    @Autowired
    private EleDao eleDao;

    @RequestMapping(value = "/adduser", method = RequestMethod.GET)
    public String mockAddUser(@RequestParam String username,
                              @RequestParam String password){
        return String.valueOf(userDao.add(new User(username,password)));
    }

    @RequestMapping(value = "/getuser", method = RequestMethod.GET)
    public String mockGetUser(@RequestParam String username){
        return (userDao.find(username)).toString();
    }

    @RequestMapping(value = "/updateuser", method = RequestMethod.GET)
    public String mockUpdateUser(@RequestParam String username,
                                 @RequestParam String password){
        return String.valueOf(userDao.update(new User(username,password)));
    }

    @RequestMapping(value = "/getele", method = RequestMethod.GET)
    public String mockGetEle(@RequestParam Long eleid){
        return (eleDao.find(eleid)).toString();
    }
}
