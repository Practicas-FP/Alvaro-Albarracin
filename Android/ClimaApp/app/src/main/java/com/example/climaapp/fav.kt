package com.example.climaapp

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity
data class fav (
    @PrimaryKey
    val id: Int,
    val city: String?,
    val country: String?
)