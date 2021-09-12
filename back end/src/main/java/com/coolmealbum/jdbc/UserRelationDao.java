package com.coolmealbum.jdbc;

import com.coolmealbum.model.UserRelation;

import java.util.List;

public interface UserRelationDao {
    int add(UserRelation relation);

    int deleteRelation(UserRelation relation);

    int deleteUserRelations(Long userid);

    List<Long> findUserFollowers(Long userid);

    List<Long> findUserFollowings(Long userid);

    List<UserRelation> findWholeUserRelationList();
}
