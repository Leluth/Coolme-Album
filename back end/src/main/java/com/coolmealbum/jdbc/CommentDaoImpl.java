package com.coolmealbum.jdbc;

import com.coolmealbum.model.Comment;
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
public class CommentDaoImpl implements CommentDao {
    @Autowired
    private JdbcTemplate template;

    @Override
    public Long add(Comment comment) {
        KeyHolder keyHolder=new GeneratedKeyHolder();
        template.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement(
                        "insert into comment(eleid, userid, tarid, comments) values(?, ?, ?, ?)", PreparedStatement.RETURN_GENERATED_KEYS);
                ps.setLong(1,comment.getEleid());
                ps.setLong(2,comment.getUserid());
                ps.setLong(3,comment.getTarid());
                ps.setString(4,comment.getComments());
                return ps;
            }
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    @Override
    public int delete(Comment comment) {
        return template.update("delete from comment where commentid=?",
                comment.getCommentid());
    }

    @Override
    public List<Comment> findUserComments(Long userid) {
        return template.query("select * from comment where userid=?", new Object[]{userid},
                new BeanPropertyRowMapper<>(Comment.class));
    }

    @Override
    public List<Comment> findEleComments(Long eleid) {
        return template.query("select * from comment where eleid=?", new Object[]{eleid},
                new BeanPropertyRowMapper<>(Comment.class));
    }
}
