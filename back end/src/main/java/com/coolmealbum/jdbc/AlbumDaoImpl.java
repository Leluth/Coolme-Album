package com.coolmealbum.jdbc;

import com.coolmealbum.model.Album;
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
public class AlbumDaoImpl implements AlbumDao {
    @Autowired
    private JdbcTemplate template;

    @Override
    public Long add(Album album) {
        KeyHolder keyHolder=new GeneratedKeyHolder();
        template.update(new PreparedStatementCreator() {
            @Override
            public PreparedStatement createPreparedStatement(Connection connection) throws SQLException {
                PreparedStatement ps = connection.prepareStatement(
                        "insert into album(userid, albumname) values(?, ?)", PreparedStatement.RETURN_GENERATED_KEYS);
                ps.setLong(1,album.getUserid());
                ps.setString(2,album.getAlbumName());
                return ps;
            }
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    @Override
    public int update(Album album) {
        return template.update("update album set albumname=? where albumid=?",
                album.getAlbumName(), album.getAlbumid());
    }

    @Override
    public int delete(Long albumid) {
        return template.update("delete from album where albumid=?", albumid);
    }

    @Override
    public Album find(Long albumid) {
        List<Album> album=template.query("select * from album where albumid=?", new Object[]{albumid},
                new BeanPropertyRowMapper(Album.class));
        if(album!=null&&!album.isEmpty()) {
            return album.get(0);
        } else {
            return null;
        }
    }

    @Override
    public List<Album> findUserAlbumsList(Long userid) {
        return template.query("select * from album where userid=?", new Object[]{userid},
                new BeanPropertyRowMapper<Album>(Album.class));
    }

    @Override
    public List<Album> findWholeAlbumList() {
        return template.query("select * from album", new Object[]{},
                new BeanPropertyRowMapper<Album>(Album.class));
    }
}
