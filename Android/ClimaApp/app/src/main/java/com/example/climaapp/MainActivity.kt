package com.example.climaapp

import android.os.Bundle
import android.view.Menu
import android.view.MenuItem
import android.view.inputmethod.InputMethodManager
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.room.Room
import com.squareup.picasso.Picasso
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.*

class MainActivity : AppCompatActivity(), SearchView.OnQueryTextListener {

    lateinit var ciudad: TextView
    lateinit var city: String
    lateinit var country: String
    lateinit var cityF: String
    lateinit var countryF: String
    lateinit var fecha: TextView
    lateinit var texto: TextView
    lateinit var temp: TextView
    lateinit var precipitaciones: TextView
    lateinit var viento: TextView
    lateinit var humedad: TextView
    lateinit var visibilidad: TextView
    lateinit var f1: TextView
    lateinit var f2: TextView
    lateinit var f3: TextView
    lateinit var f4: TextView
    lateinit var maxmin: TextView
    lateinit var sol: TextView
    lateinit var image: ImageView
    lateinit var i1: ImageView
    lateinit var i2: ImageView
    lateinit var i3: ImageView
    lateinit var i4: ImageView
    lateinit var searchbar: SearchView
    lateinit var spinner: Spinner
    lateinit var fav: fav
    var seek: String = "0"

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        ciudad = findViewById(R.id.ciudad)
        fecha = findViewById(R.id.fecha)
        texto = findViewById(R.id.texto)
        temp = findViewById(R.id.temp)
        maxmin = findViewById(R.id.maxmin)
        precipitaciones = findViewById(R.id.precipitaciones)
        viento = findViewById(R.id.viento)
        humedad = findViewById(R.id.humedad)
        visibilidad = findViewById(R.id.visibilidad)
        sol = findViewById(R.id.sol)
        f1 = findViewById(R.id.f1)
        f2 = findViewById(R.id.f2)
        f3 = findViewById(R.id.f3)
        f4 = findViewById(R.id.f4)
        image = findViewById(R.id.image)
        i1 = findViewById(R.id.i1)
        i2 = findViewById(R.id.i2)
        i3 = findViewById(R.id.i3)
        i4 = findViewById(R.id.i4)
        searchbar = findViewById(R.id.buscar)
        searchbar.setOnQueryTextListener(this)
        spinner = findViewById(R.id.spinner)
        spinner.clearFocus()

        val paises = mutableListOf("")
        val isoCountryCodes = Locale.getISOCountries()
        for (countryCode in isoCountryCodes){
            if(countryCode != "ES") {
                val locale = Locale(Locale.getDefault().isO3Language, countryCode)
                val countryName = locale.displayCountry
                paises += "$countryName ($countryCode)"
            }
        }
        paises.sort()
        paises[0] = "España (ES)"

        val adaptador = ArrayAdapter(this, android.R.layout.simple_spinner_item, paises)
        spinner.adapter = adaptador

        val room: favDB = Room
            .databaseBuilder(this, favDB::class.java, "fav")
            .build()

        CoroutineScope(Dispatchers.IO).launch {

            if(room.favDAO().getFav(0) == null) {
                val favorite = fav(0, "Málaga", "España (ES)")
                room.favDAO().setFav(favorite)
                fav = room.favDAO().getFav(0)
                cityF = favorite.city.toString()
                countryF = favorite.country.toString().substring(favorite.country!!.length - 3, favorite.country!!.length - 1)
            } else {
                fav = room.favDAO().getFav(0)
                cityF = fav.city.toString()
                countryF = fav.country.toString().substring(fav.country!!.length - 3, fav.country!!.length - 1)
            }
            val call = getRetrofit().create(ApiService::class.java).getBy("current?key=02fb56a5630245268115bacef6e717db&city=$cityF&country=$countryF&lang=es")
            val resp = call.body()
            val callF = getRetrofit().create(ApiService::class.java).getByF("forecast/daily?city=$cityF&country=$countryF&lang=es&key=02fb56a5630245268115bacef6e717db")
            val respF = callF.body()
            var amanecerH: Int
            var atardecerH: Int
            var amanecerM: String
            var atardecerM: String
            runOnUiThread {
                if (respF != null) {
                    maxmin.setText("Max: ${respF.data[0].max_temp}º | Min: ${respF.data[0].min_temp}º")
                    f1.setText("${respF.data[1].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                    f2.setText("${respF.data[2].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                    f3.setText("${respF.data[3].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                    f4.setText("${respF.data[4].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                    val ic1 = ("https://www.weatherbit.io/static/img/icons/${respF.data[1].weather.icon}.png")
                    Picasso.get().load(ic1).into(i1)
                    val ic2 = ("https://www.weatherbit.io/static/img/icons/${respF.data[2].weather.icon}.png")
                    Picasso.get().load(ic2).into(i2)
                    val ic3 = ("https://www.weatherbit.io/static/img/icons/${respF.data[3].weather.icon}.png")
                    Picasso.get().load(ic3).into(i3)
                    val ic4 = ("https://www.weatherbit.io/static/img/icons/${respF.data[4].weather.icon}.png")
                    Picasso.get().load(ic4).into(i4)
                    fecha.setText("El tiempo para hoy: ${respF.data[0].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                }
                if (resp != null) {
                    ciudad.setText("${resp.data[0].city_name} - ${spinner.selectedItem}")
                    city = resp.data[0].city_name
                    country = spinner.selectedItem.toString()
                    texto.setText(resp.data[0].weather.description)
                    temp.setText("${resp.data[0].temp}º")
                    visibilidad.setText("Visibilidad: ${resp.data[0].vis} kilometros")
                    amanecerH = resp.data[0].sunrise.substring(0,2).toInt()+2
                    atardecerH = resp.data[0].sunset.substring(0,2).toInt()+2
                    amanecerM = resp.data[0].sunrise.substring(3,5)
                    atardecerM = resp.data[0].sunset.substring(3,5)
                    sol.setText("Amanecer: $amanecerH:$amanecerM | Atardecer: $atardecerH:$atardecerM")
                    if(resp.data[0].precip.toString().length<4){
                        precipitaciones.setText("Probabilidad precipitaciones: ${(resp.data[0].precip.toDouble()*100).toString()}%")
                    } else {
                        precipitaciones.setText("Probabilidad precipitaciones: ${(resp.data[0].precip.toDouble()*100).toString().substring(0,4)}%")
                    }
                    if(resp.data[0].wind_spd.toString().length<4){
                        viento.setText("Viento: ${resp.data[0].wind_cdir_full} (${resp.data[0].wind_spd} m/s)")
                    } else {
                        viento.setText("Viento: ${resp.data[0].wind_cdir_full} (${resp.data[0].wind_spd.toString().substring(0,4)} m/s)")
                    }
                    if(resp.data[0].rh.toString().length<4){
                        humedad.setText("Humedad relativa: ${resp.data[0].rh}%")
                    } else {
                        humedad.setText("Humedad relativa: ${resp.data[0].rh.toString().substring(0,4)}%")
                    }
                    val icono = ("https://www.weatherbit.io/static/img/icons/${resp.data[0].weather.icon}.png")
                    Picasso.get().load(icono).into(image)
                }
            }
        }
    }

    private fun getRetrofit(): Retrofit {
        return Retrofit.Builder()
            .baseUrl("https://api.weatherbit.io/v2.0/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    override fun onCreateOptionsMenu(menu: Menu?): Boolean {
        menuInflater.inflate(R.menu.main_menu, menu)
        return true
    }

    override fun onOptionsItemSelected(item: MenuItem): Boolean {
        val room: favDB = Room
            .databaseBuilder(this, favDB::class.java, "fav")
            .build()

        val favorite = fav(0, city, country)
        val favoriteD = fav(0, fav.city, fav.country)

        CoroutineScope(Dispatchers.IO).launch {
            room.favDAO().delFav(favoriteD)
            room.favDAO().setFav(favorite)
        }

        item.setTitle("❤")

        cityF = favorite.city.toString()
        countryF = favorite.country.toString().substring(fav.country!!.length-3, fav.country!!.length-1)

        Toast.makeText(this, "Ciudad favorita fijada correctamente", Toast.LENGTH_SHORT).show()
        return true
    }

    override fun onPrepareOptionsMenu(menu: Menu): Boolean {
        if(seek == "1"){
            menu.findItem(R.id.addfav).setTitle("\uD83E\uDD0D")
        } else {
            menu.findItem(R.id.addfav).setTitle("❤")
        }

        return super.onPrepareOptionsMenu(menu)
    }

    private fun buscar(query:String){

        searchbar.setQuery("",true)
        searchbar.clearFocus()
        spinner.clearFocus()


        val paiscode = spinner.selectedItem.toString().substring(spinner.selectedItem.toString().length-3,spinner.selectedItem.toString().length-1)
        CoroutineScope(Dispatchers.IO).launch {
            val call = getRetrofit().create(ApiService::class.java).getBy("current?key=02fb56a5630245268115bacef6e717db&&city=$query&country=$paiscode&lang=es")
            val resp = call.body()
            val callF = getRetrofit().create(ApiService::class.java).getByF("forecast/daily?city=$query&country=$paiscode&lang=es&key=02fb56a5630245268115bacef6e717db")
            val respF = callF.body()
            var amanecerH: Int
            var atardecerH: Int
            var amanecerM: String
            var atardecerM: String

            runOnUiThread {
                if (respF != null) {
                    maxmin.setText("Max: ${respF.data[0].max_temp}º | Min: ${respF.data[0].min_temp}º")
                    f1.setText("${respF.data[1].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                    f2.setText("${respF.data[2].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                    f3.setText("${respF.data[3].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                    f4.setText("${respF.data[4].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                    val ic1 = ("https://www.weatherbit.io/static/img/icons/${respF.data[1].weather.icon}.png")
                    Picasso.get().load(ic1).into(i1)
                    val ic2 = ("https://www.weatherbit.io/static/img/icons/${respF.data[2].weather.icon}.png")
                    Picasso.get().load(ic2).into(i2)
                    val ic3 = ("https://www.weatherbit.io/static/img/icons/${respF.data[3].weather.icon}.png")
                    Picasso.get().load(ic3).into(i3)
                    val ic4 = ("https://www.weatherbit.io/static/img/icons/${respF.data[4].weather.icon}.png")
                    Picasso.get().load(ic4).into(i4)
                    fecha.setText("El tiempo para hoy: ${respF.data[0].valid_date.substring(8,10)}/${respF.data[1].valid_date.substring(5,7)}/${respF.data[1].valid_date.substring(0,4)}")
                }
                if (resp != null) {
                    ciudad.setText("${resp.data[0].city_name} - ${spinner.selectedItem}")
                    city = resp.data[0].city_name
                    country = spinner.selectedItem.toString()
                    if(city == cityF && country.substring(country.length-3, country.length-1)
                        == countryF){
                        seek = "0"
                    }else{
                        seek = "1"
                    }
                    invalidateOptionsMenu()
                    texto.setText(resp.data[0].weather.description)
                    temp.setText("${resp.data[0].temp}º")
                    visibilidad.setText("Visibilidad: ${resp.data[0].vis} kilometros")
                    amanecerH = resp.data[0].sunrise.substring(0,2).toInt()+2
                    atardecerH = resp.data[0].sunset.substring(0,2).toInt()+2
                    amanecerM = resp.data[0].sunrise.substring(3,5)
                    atardecerM = resp.data[0].sunset.substring(3,5)
                    sol.setText("Amanecer: $amanecerH:$amanecerM | Atardecer: $atardecerH:$atardecerM")
                    if(resp.data[0].precip.toString().length<4){
                        precipitaciones.setText("Probabilidad precipitaciones: ${(resp.data[0].precip.toDouble()*100).toString()}%")
                    } else {
                        precipitaciones.setText("Probabilidad precipitaciones: ${(resp.data[0].precip.toDouble()*100).toString().substring(0,4)}%")
                    }
                    if(resp.data[0].wind_spd.toString().length<4){
                        viento.setText("Viento: ${resp.data[0].wind_cdir_full} (${resp.data[0].wind_spd} m/s)")
                    } else {
                        viento.setText("Viento: ${resp.data[0].wind_cdir_full} (${resp.data[0].wind_spd.toString().substring(0,4)} m/s)")
                    }
                    if(resp.data[0].rh.toString().length<4){
                        humedad.setText("Humedad relativa: ${resp.data[0].rh}%")
                    } else {
                        humedad.setText("Humedad relativa: ${resp.data[0].rh.toString().substring(0,4)}%")
                    }
                    val icono = ("https://www.weatherbit.io/static/img/icons/${resp.data[0].weather.icon}.png")
                    Picasso.get().load(icono).into(image)
                } else {
                    showErrorDialog()
                }
                hideKeyboard()
            }
        }
    }

    private fun showErrorDialog() {
        Toast.makeText(this, "No hay resultados en la consulta", Toast.LENGTH_SHORT).show()
    }

    private fun hideKeyboard() {
        val imm = getSystemService(INPUT_METHOD_SERVICE) as InputMethodManager
        val view = this.currentFocus
        if (view != null) {
            imm.hideSoftInputFromWindow(view.windowToken, 0)
        }
    }

    override fun onQueryTextSubmit(query: String?): Boolean {
        if(!query.isNullOrEmpty()){
            buscar(query)
        }
        return true
    }

    override fun onQueryTextChange(query: String?): Boolean {
        return true
    }


}