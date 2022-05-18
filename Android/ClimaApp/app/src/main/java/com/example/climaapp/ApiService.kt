package com.example.climaapp

import com.example.climaapp.data.ResponseApi
import com.example.climaapp.forecast.ResponseApiF
import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Url

interface ApiService {
    @GET
    suspend fun getBy (@Url url:String):Response<ResponseApi>
    @GET
    suspend fun getByF (@Url url:String):Response<ResponseApiF>
}