
        function CityMaps(str) {
            [this.city, this.abbreviation, this.latitude, this.longitude] = str.split(",")
            
          }
    
        function CityMap(str) {
        this.list = []; 
        str.split(";").forEach(row => {
          this.list.push(new CityMaps(row));
        });
        this.NESWester = function(str){
            switch (str) {
                case "North":
                    return this.list.reduce((northMostMap, currentMap) => 
                            ({'latitude': Math.max(northMostMap.latitude, currentMap.latitude)}));           
                case "South":
                    return this.list.reduce(
                        (northMostMap, currentMap) => 
                            ({'latitude': Math.min(northMostMap.latitude, currentMap.latitude)}));
                case "East":
                    return this.list.reduce(
                        (northMostMap, currentMap) => 
                            ({'longitude': Math.max(northMostMap.longitude, currentMap.longitude)}));
                case "West":
                    return this.list.reduce(
                        (northMostMap, currentMap) => 
                            ({'longitude': Math.min(northMostMap.longitude, currentMap.longitude)}));
                default:
                   return alert("Enter North/West/South/West")
            }       
          }
        
          this.NewFunction = function (str){
              return str;
          }
      }
     
    
      var cityMap = new CityMap("Nashville, TN, 36.17, -86.78; New York, NY, 40.71, -74.00; Atlanta, GA, 33.75, -84.39; Denver, CO, 39.74, -104.98; Seattle, WA, 47.61, -122.33; Los Angeles, CA, 34.05, -118.24; Memphis, TN, 35.15, -90.05")
      console.log(cityMap.list)
      console.log(cityMap.NESWester("North"))
      console.log(cityMap.NESWester("South"))
      console.log(cityMap.NESWester("East"))
      console.log(cityMap.NESWester("West"))
    