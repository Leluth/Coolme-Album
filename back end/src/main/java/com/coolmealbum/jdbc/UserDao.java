package com.coolmealbum.jdbc;

import com.coolmealbum.model.User;

import java.util.List;

public interface UserDao {
    Long add(User user);
    int update(User user);
    int delete(Long userid);
    User find(Long userid);

    User find(String username);

    List<User> findList();

    List<User> findWholeUserList();
}
