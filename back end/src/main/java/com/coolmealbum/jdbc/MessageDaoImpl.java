package com.coolmealbum.jdbc;

import com.coolmealbum.model.Message;
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
import java.sql.Statement;
import java.util.List;

@Repository
public class MessageDaoImpl implements MessageDao {
    @Autowired
    private JdbcTemplate template;

    @Override
    public Long add(Message message) {
        KeyHolder keyHolder=new GeneratedKeyHolder();
        template.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps=connection.prepareStatement("insert into message(userid, tarid, type, info) values(?, ?, ?, ?)",
                        Statement.RETURN_GENERATED_KEYS);
                ps.setLong(1, message.getUserid());
                ps.setLong(2, message.getTarid());
                ps.setInt(3, message.getType());
                ps.setLong(4, message.getInfo());
                return ps;
            }
        },keyHolder);
        return keyHolder.getKey().longValue();
    }

    @Override
    public int update(Long messageid) {
        return template.update("update message set flag=? where messageid=?", new Object[]{false, messageid});
    }

    @Override
    public List<Message> findUserMessages(Long userid) {
        return template.query("select * from message where tarid=?", new Object[]{userid},
                new BeanPropertyRowMapper<>(Message.class));
    }
}
