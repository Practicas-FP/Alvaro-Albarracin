package com.example.climaapp

import androidx.room.*

@Dao
interface favDAO {

    @Query("SELECT * FROM fav WHERE id = :id")
    suspend fun getFav(id: Int): fav

    @Insert(onConflict = OnConflictStrategy.IGNORE)
    suspend fun setFav(favorite: fav)

    @Delete
    suspend fun delFav(favorite: fav)

}