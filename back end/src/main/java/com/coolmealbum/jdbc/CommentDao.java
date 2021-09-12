package com.coolmealbum.jdbc;

import com.coolmealbum.model.Comment;

import java.util.List;

public interface CommentDao {
    Long add(Comment comment);

    int delete(Comment comment);

    List<Comment> findUserComments(Long userid);

    List<Comment> findEleComments(Long eleid);
}
