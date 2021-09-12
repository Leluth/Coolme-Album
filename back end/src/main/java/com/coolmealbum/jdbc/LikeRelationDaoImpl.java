package com.coolmealbum.jdbc;

import com.coolmealbum.model.LikeRelation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class LikeRelationDaoImpl implements LikeRelationDao {
    @Autowired
    private JdbcTemplate template;

    @Override
    public int add(LikeRelation likeRelation) {
        return template.update("insert into like_relation(userid, eleid) values (?, ?)",
                likeRelation.getUserid(), likeRelation.getEleid());
    }

    @Override
    public int delete(LikeRelation likeRelation) {
        return template.update("delete from like_relation where userid=? and eleid=?",
                likeRelation.getUserid(), likeRelation.getEleid());
    }

    @Override
    public int deleteUserRelations(Long userid) {
        return template.update("delete from like_relation where userid=?",
                userid);
    }

    @Override
    public int deleteEleRelations(Long eleid) {
        return template.update("delete from like_relation where eleid=?",
                eleid);
    }

    @Override
    public List<Long> findUserLikes(Long userid) {
        return template.query("select * from like_relation where userid=?", new Object[]{userid},
                new RowMapper<Long>() {
                    @Override
                    public Long mapRow(ResultSet resultSet, int i) throws SQLException {
                        return resultSet.getLong("eleid");
                    }
                });
    }

    @Override
    public List<Long> findEleLikers(Long eleid) {
        return template.query("select * from like_relation where eleid=?", new Object[]{eleid},
                new RowMapper<Long>() {
                    @Override
                    public Long mapRow(ResultSet resultSet, int i) throws SQLException {
                        return resultSet.getLong("userid");
                    }
                });
    }

    @Override
    public List<LikeRelation> findWholeLikeRelationList() {
        return template.query("select * from like_relation", new Object[]{},
                new BeanPropertyRowMapper<>(LikeRelation.class));
    }
}
