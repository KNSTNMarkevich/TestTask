function CityMap(str) {

    function CityMapRecording(str) {
        [this.city, this.latitude, this.longitude] = str.split(" ,");
    }
    this.list = [];
    str.split(";").forEach(row => {
        this.list.push(new CityMapRecording(row));
    });
}

/**
 *  Return the name of the easternmost city
 *  @param {*} arrayOfCities - cardinal array "this.list"
 *  @param {*} longitudeCoordinates - cardinal coordinates "longitude"
 */
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
/**
 *  Return the name of the westernmost city
 *  @param {*} arrayOfCities - cardinal array this.list
 *  @param {*} longitudeCoordinates - cardinal coordinates "longitude"
 */
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
/**
 *  Return the name of the southernmost city
 *  @param {*} arrayOfCities - cardinal array this.list
 *  @param {*} longitudeCoordinates - cardinal coordinates "latitude"
 */
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
/**
 *  Return the name of the northernmost city
 *  @param {*} arrayOfCities - cardinal array this.list
 *  @param {*} longitudeCoordinates - cardinal coordinates "latitude"
 */
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

/**
 * return distance between two points (given the latitude/longitude of those points). It is being used to calculate the distance between two locations
 * @param {*} lat1 Latitude of point 1 (in decimal degrees)
 * @param {*} lon1 Longitude of point 1 (in decimal degrees)
 * @param {*} lat2 Latitude of point 2 (in decimal degrees)
 * @param {*} lon2 Longitude of point 2 (in decimal degrees)
 * @param {*} unit the unit you desire for results where: 'M' is statute miles (default); 'K' is kilometers; 'N' is nautical miles 
                 
 */
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

/**
 * return name of Nearest city for 2 coordinates that latitude(lat) and lobgitude (lon)
 *  @param {*} lat latitude point 
 *  @param {*} lon longitude point
 */
CityMap.prototype.findNearestCity = function (lat, lan) {
    return this.list.map(function (k) {
        k.distance = distance(k.latitude, k.longitude, lat, lan);
        return k;
    }).sort(function (k, l) {
        return k.distance < l.distance ? -1 : 1;
    })[0];
}


/**
 * using the map function returns an array of cities from list
 * @param {*} k currentValue
 */
CityMap.prototype.citiesList = function () {
    return this.list.map(function (k) {
        return k.city;
    });
};
CityMap.prototype.latitudeList = function () {
    return this.list.map(function (k) {
        return k.latitude;
    });
};
CityMap.prototype.longitideList = function () {
    return this.list.map(function (k) {
        return k.longitude;
    });
};
/**
 * using the map and substr function returns an array of stateAbbreviations
 * @param {*} k currentValue
 */
CityMap.prototype.stateAbbreviations = function () {
    return this.list.map(function (k) {
        let arr = k.city.substr(-2)
        return arr;
    });
}

document.getElementById("EastButton").addEventListener("click", function (e) {
    document.getElementById("EastLabel").value = objCityMap.getEasternMostCity().city;
}, false)

document.getElementById("WestButton").addEventListener("click", function (e) {
    document.getElementById("WestLabel").value = objCityMap.getWeseternMostCity().city;
}, false)

document.getElementById("SouthButton").addEventListener("click", function (e) {
    document.getElementById("SouthLabel").value = objCityMap.getSouthernMostCity().city;
}, false)

document.getElementById("NorthButton").addEventListener("click", function (e) {
    document.getElementById("NorthLabel").value = objCityMap.getNorthenMostCity().city;
}, false)

document.getElementById("closestCityButton").addEventListener("click", function (e) {
    document.getElementById("closestCity").value = objCityMap.findNearestCity(document.getElementById("latitude").value, document.getElementById("longitude").value).city;
}, false)

let objCityMap = new CityMap("Nashville, TN ,36.17 ,-86.78;New York, NY ,40.71 ,-74.00;Atlanta, GA ,33.75 ,-84.39;Denver, CO ,39.74 ,-104.98;Seattle, WA ,47.61 ,-122.33;Los Angeles, CA ,34.05 ,-118.24;Memphis, TN , 35.15 ,-90.05");

objCityMap.citiesList().forEach(function (c) {
    let newDiv = document.createElement('tr');
    newDiv.innerText = c;
    document.getElementById('city').appendChild(newDiv);
});
window.addEventListener("load", function (e) {
    let str = document.getElementById('states');
    str.innerText = objCityMap.stateAbbreviations().filter(function (value, index, self) {
        return self.indexOf(value) === index;
    }).join(" ");

});
objCityMap.citiesList().forEach(function (c) {
    let newDiv = document.createElement('tr');
    newDiv.innerText = c;
    document.getElementById('listCity').appendChild(newDiv);
});
objCityMap.latitudeList().forEach(function (c) {
    let newDiv = document.createElement('tr');
    newDiv.innerText = c;
    document.getElementById('listLatitude').appendChild(newDiv);
});
objCityMap.longitideList().forEach(function (c) {
    let newDiv = document.createElement('tr');
    newDiv.innerText = c;
    document.getElementById('listlongitude').appendChild(newDiv);
});