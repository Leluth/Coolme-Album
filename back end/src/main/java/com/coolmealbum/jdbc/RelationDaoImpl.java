package com.coolmealbum.jdbc;

import com.coolmealbum.model.Relation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class RelationDaoImpl implements RelationDao {
    @Autowired
    private JdbcTemplate template;

    @Override
    public int add(Relation relation) {
        return template.update("insert into relation(albumid, eleid) values (?, ?)",
                relation.getAlbumid(), relation.getEleid());
    }

    // relation不提供修改功能
    @Override
    public int update(Relation relation) {
        return 0;
    }

    @Override
    public int delete(Relation relation) {
        return template.update("delete from relation where albumid=? and eleid=?",
                relation.getAlbumid(), relation.getEleid());
    }

    @Override
    public int deleteAlbumEles(Long albumid) {
        return template.update("delete from relation where albumid=?", albumid);
    }

    @Override
    public List<Long> findAlbumElesList(Long albumid) {
        return template.query("select * from relation where albumid=?", new Object[]{albumid},
                new RowMapper<Long>() {
                    @Override
                    public Long mapRow(ResultSet resultSet, int i) throws SQLException {
                        return resultSet.getLong("eleid");
                    }
                });
    }

    @Override
    public List<Relation> findWholeRelationList() {
        return template.query("select * from relation where albumid=?", new Object[]{},
                new BeanPropertyRowMapper<>(Relation.class));
    }
}
