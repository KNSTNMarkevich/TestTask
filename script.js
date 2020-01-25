function CityMap(str) {

    function CityMapRecording(str) {
        [this.city, this.latitude, this.longitude] = str.split(" ,");
    }
    this.list = [];
    str.split(";").forEach(row => {
        this.list.push(new CityMapRecording(row));
    });
}
CityMap.prototype.getEasternMostCity = function () {
    return this.list.reduce(
        (eastern, current) => {
            if (!eastern || +eastern.longitude < +current.longitude)
                return current;
            else
                return eastern;
        }
    );
}
CityMap.prototype.getWeseternMostCity = function () {
    return this.list.reduce(
        (western, current) => {
            if (!western || -western.longitude < -current.longitude)
                return current;
            else
                return western;
        }
    );
}
CityMap.prototype.getSouthernMostCity = function () {
    return this.list.reduce(
        (southern, current) => {
            if (!southern || -southern.latitude < -current.latitude)
                return current;
            else
                return southern;
        }
    );
}
CityMap.prototype.getNorthenMostCity = function () {
    return this.list.reduce(
        (northern, current) => {
            if (!northern || +northern.latitude < +current.latitude)
                return current;
            else
                return northern;
        }
    );
}
function distance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") {
            dist = dist * 1.609344
        }
        if (unit == "N") {
            dist = dist * 0.8684
        }
        return dist;
    }
}
CityMap.prototype.findNearestCity = function (lat, lan) {
    return this.list.map(function (k) {
        k.distance = distance(k.latitude, k.longitude, lat, lan);
        return k;
    }).sort(function (k, l) {
        return k.distance < l.distance ? -1 : 1;
    })[0];
}
var objCityMap = new CityMap("Nashville, TN ,36.17 ,-86.78;New York, NY ,40.71 ,-74.00;Atlanta, GA ,33.75 ,-84.39;Denver, CO ,39.74 ,-104.98;Seattle, WA ,47.61 ,-122.33;Los Angeles, CA ,34.05 ,-118.24;Memphis, TN , 35.15 ,-90.05");
console.log(objCityMap.list);
console.log("Easternmost:", objCityMap.getEasternMostCity().city);
console.log("Weseternmost:", objCityMap.getWeseternMostCity().city);
console.log("Southernmost:", objCityMap.getSouthernMostCity().city);
console.log("Northenmost:", objCityMap.getNorthenMostCity().city);
console.log(objCityMap.findNearestCity(12, -100).city);