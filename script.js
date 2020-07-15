/*Url api bankomats*/
let url = 'http://courses.dp.ua/api/pb_atm.php';


// console.log(lat_user);
(async function(){

  /*get massive*/
  let result = await fetch(url);
  result     = await result.json();

  /*get massive with in devices*/
  result     = result.devices;

  /*new mass */
      let arr_bankomats = result.map(item=>({
      city:item.cityRU,
      addres:item.fullAddressRu,
      latitude_bank : item.latitude,
      longitude_bank : item.longitude
    }));

    
 
       /*Formula Goversina*/
let Dist = () =>{
  let arr_d=[];
  for(let i=0;i<arr_bankomats.length;i++){
    let lng_bank=arr_bankomats[i].latitude_bank;
    let lat_bank =arr_bankomats[i].longitude_bank;
    var _lat1 = window.lat;
    var _lon1 =  window.lng;
    function _getDistanceFromLatLonInKm(_lat1, _lon1, lat_bank, lng_bank) {
              var R = 6371; // Radius of the earth in kilometers
              var dLat = deg2rad(lat_bank - window.lat); // deg2rad below
              var dLon = deg2rad(lng_bank - window.lng);
              var a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(deg2rad(window.lat)) * Math.cos(deg2rad(lat_bank)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
              var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
              var d = R * c; // Distance in KM
              return d;
        };

    function deg2rad(deg) {
              return deg * (Math.PI / 180)
        }

        // Point 1: 15.008809, 78.659096
        // Point 2: 13.90457539, 78.5855514


    var _lat2 = lat_bank;
    var _lon2 = lng_bank;

        // precise value
    var _d = _getDistanceFromLatLonInKm(_lat1,_lon1 ,_lat2 ,_lon2 );
    // alert(_d);
        // round value
  _d =  Math.round(_getDistanceFromLatLonInKm(_lat1,_lon1 ,_lat2 ,_lon2 ) * 100) / 100 ;
  // alert(_d);
    arr_d.push({distance:_d,addres:arr_bankomats[i].addres}); 
    
  };
  let min_dis_to_bank = arr_d.reduce((acc, curr) => acc.distance < curr.distance ? acc : curr);
  console.log(min_dis_to_bank);
  console.log("Самый близкий банкомат по адрессу: ",min_dis_to_bank.addres);
  console.log("До него km: ",min_dis_to_bank.distance);
      } 

/*Geolation Me 2.0*/ 

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
      document.body.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
    document.body.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude;
    window.lat = position.coords.latitude;
    window.lng = position.coords.longitude;
    Dist();
  }

  getLocation();
 
})();
