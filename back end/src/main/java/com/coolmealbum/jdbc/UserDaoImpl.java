package com.coolmealbum.jdbc;

import com.coolmealbum.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.PreparedStatementCreator;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.List;

@Repository
public class UserDaoImpl implements UserDao {
    @Autowired
    private JdbcTemplate template;

    @Override
    public Long add(User user) {
        KeyHolder keyHolder=new GeneratedKeyHolder();
        template.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement(
                        "insert into album_user(username, password) values(?, ?)", PreparedStatement.RETURN_GENERATED_KEYS);
                ps.setString(1,user.getUsername());
                ps.setString(2,user.getPassword());
                return ps;
            }
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    // todo
    @Override
    public int update(User user) {
        return template.update("update album_user set username=?, password=? where userid=?",
                new Object[]{user.getUsername(), user.getPassword(), 1});
    }

    @Override
    public int delete(Long userid) {
        return template.update("delete from album_user where userid=?", userid);
    }

    @Override
    public User find(Long id) {
        List<User> user=template.query("select * from album_user where userid=?",new Object[]{id},
                new BeanPropertyRowMapper(User.class));
        if(user!=null&&!user.isEmpty())
            return user.get(0);
        else
            return null;
    }
    @Override
    public User find(String username){
        List<User> user=template.query("select * from album_user where username=?",new Object[]{username},
                new BeanPropertyRowMapper(User.class));
        if(user!=null&&!user.isEmpty())
            return user.get(0);
        else
            return null;
    }

    @Override
    public List<User> findList() {
        //todo
        return null;
    }

    @Override
    public List<User> findWholeUserList() {
        return template.query("select * from album_user",new Object[]{},
                new BeanPropertyRowMapper<User>(User.class));
    }
}
