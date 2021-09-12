package com.coolmealbum.jdbc;

import com.coolmealbum.model.Ele;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class EleDaoImpl implements EleDao {
    @Autowired
    private JdbcTemplate template;

    @Override
    public Long add(Ele ele) {
        Long eleid=ele.getEleid();
        template.update("insert into ele(eleid, source, description) values(?, ?, ?)",
                eleid, ele.getSource(), ele.getDescription());
        return eleid;
    }

    // 相册元素暂不提供修改功能
    @Override
    public int update(Ele ele) {
        return 0;
    }

    // 不允许直接使用此方法删除ele
    @Override
    public int delete(Long id) {
        return template.update("delete from ele where eleid=?", id);
    }

    @Override
    public Ele find(Long id) {
        List<Ele> ele=template.query("select * from ele where eleid=?", new Object[]{id},
                new BeanPropertyRowMapper<>(Ele.class));
        if(!ele.isEmpty())
            return ele.get(0);
        else
            return null;
    }

    @Override
    public List<Ele> findWholeEleList() {
        return template.query("select * from ele", new Object[]{},
                new BeanPropertyRowMapper<>(Ele.class));
    }
}
