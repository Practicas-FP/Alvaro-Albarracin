package com.example.climaapp

import androidx.room.Database
import androidx.room.RoomDatabase

@Database(
    entities = [fav::class],
    version = 1
)
abstract class favDB : RoomDatabase() {

    abstract fun favDAO(): favDAO
}