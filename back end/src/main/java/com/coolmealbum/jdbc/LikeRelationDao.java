package com.coolmealbum.jdbc;

import com.coolmealbum.model.LikeRelation;

import java.util.List;

public interface LikeRelationDao {
    int add(LikeRelation likeRelation);

    int delete(LikeRelation likeRelation);

    int deleteUserRelations(Long userid);

    int deleteEleRelations(Long eleid);

    List<Long> findUserLikes(Long userid);

    List<Long> findEleLikers(Long eleid);

    List<LikeRelation> findWholeLikeRelationList();
}
