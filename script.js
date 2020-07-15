/*Url api bankomats*/
let url = 'http://courses.dp.ua/api/pb_atm.php';

(async function(){

  /*get massive*/
  let result = await fetch(url);
  result     = await result.json();

  /*get massive with in devices*/
  result     = result.devices;

  /*new mass */
  let arr_bankomats;
  (function(){
      arr_bankomats = result.map(item=>({
      city:item.cityRU,
      addres:item.fullAddressRu,
      latitude_bank : item.latitude,
      longitude_bank : item.longitude
    }));
    return arr_bankomats;
  }());

  /*Geolocation ME*/
var lat_user,lng_user,lat_bank,lng_bank;
var arr_d=[];

/*Body script U*/
   for(let i=0; i <=8;i++){
   navigator.geolocation.getCurrentPosition((pos)=>{
    console.log("OK",pos);
      lat_user=pos.coords.latitude;
      lng_user=pos.coords.longitude;
     /*Formula Goversina*/
     /*Cicle */

       /*BANK lat lng*/
       lng_bank=arr_bankomats[i].latitude_bank;
       lat_bank =arr_bankomats[i].longitude_bank;
       /*end bank*/

       function _getDistanceFromLatLonInKm(lat_user, lng_user, lat_bank, lng_bank) {
            var R = 6371; // Radius of the earth in kilometers
            var dLat = deg2rad(lat_bank - lat_user); // deg2rad below
            var dLon = deg2rad(lng_bank - lng_user);
            var a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(deg2rad(lat_user)) * Math.cos(deg2rad(lat_bank)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            var d = R * c; // Distance in KM
            return d;
       }

       function deg2rad(deg) {
            return deg * (Math.PI / 180)
       }

       // Point 1: 15.008809, 78.659096
       // Point 2: 13.90457539, 78.5855514
       //
       var _lat1 = lat_user;
       var _lon1 = lng_user;

       var _lat2 = lat_bank;
       var _lon2 = lng_bank;

       // precise value
       var _d = "Precise value: " + _getDistanceFromLatLonInKm(_lat1,_lon1 ,_lat2 ,_lon2 );
       console.log(_d); // alert(_d);
       // round value
       _d = "Round value: " +
            Math.round(_getDistanceFromLatLonInKm(_lat1,_lon1 ,_lat2 ,_lon2 ) * 100) / 100 +
            " km";
       console.log(i,arr_bankomats[i].addres,_d); // alert(_d);
        arr_d.push(_d);
      /*End cicle*/
    });
};
console.log(arr_d);

})();
