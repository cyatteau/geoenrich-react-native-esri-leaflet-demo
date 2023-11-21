import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Keyboard,
  TextInput,
  StatusBar,
} from "react-native";
import { React, useState, useEffect } from "react";
import { WebView } from "react-native-webview";

const App = () => {
  const [location, setLocation] = useState(`[38.80135, -95.068122968]`);
  const [pinLoc, setPinLocation] = useState(`[0, 0]`);
  const apiKey =
    "YOUR_API_KEY";
  const [totalPop, setTotalPop] = useState("");
  const [totalHH, setTotalHH] = useState("");
  const [avgHHSZ, setAvgHHSZ] = useState("");
  const [malePop, setMalePop] = useState("");
  const [femalePop, setFemalePop] = useState("");
  const [theAddress, setTheAddress] = useState("");
  const [address, setAddress] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [customHTML, setCustomHTML] = useState(``);
  const [medianIncome, setMedianIncome] = useState("");
  const [medianAge, setMedianAge] = useState("");
  const [newMedianAge, setNewMedianAge] = useState("");
  const [newMedianIncome, setNewMedianIncome] = useState("");
  let ringSize = 3;
  let unit = "Kilometers";
  const [part15, setPart15] = useState(`</div>")
  </script>
</body>`);
  const [zoomLevel, setZoomLevel] = useState(2);
  const [circleX, setCircleX] = useState("0");
  const [circleY, setCircleY] = useState("0");
  let enrichAnalysisParams, enrichUrl, enrichGlobalParams, additionalParams;

  const geocodeUrl =
    "https://geocode-api.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates";

  const geocodeParams = `${geocodeUrl}?f=pjson&singleLine=${theAddress}&outFields=*&token=${apiKey}`;

  const geoCode = async () => {
    let res = await fetch(geocodeParams);
    let result = await res.json();
    setGeoRes(result.candidates[0]);
  };

  const setGeoRes = (res) => {
    let x = res.location.x.toString();
    let y = res.location.y.toString();
    let coords = "[" + y + "," + x + "]";
    geoEnrich();
    setMapValues(coords, x, y);
  };



  enrichUrl =
    "https://geoenrich.arcgis.com/arcgis/rest/services/World/geoenrichmentserver/GeoEnrichment/enrich";

  enrichGlobalParams = 
     `${enrichUrl}?studyAreas=[{address:{text:"${theAddress}"}}]&f=json&token=${apiKey}`;

  const geoEnrich = async () => {
    let res = await fetch(enrichGlobalParams);
    let result = await res.json();
    setRes(result.results[0].value.FeatureSet[0].features[0].attributes);
  };

  enrichAnalysisParams = `${enrichGlobalParams}&analysisVariables=["5yearincrements.MEDAGE_CY,Health.MEDHINC_CY"]`;

  additionalParams = `${enrichAnalysisParams}&studyAreasOptions=
  {"areaType":"RingBuffer","bufferUnits":"kilometers","bufferRadii":[3]}`;


  const setMapValues = async (coords, x, y) => {
    let otherAnalysisParams = `${enrichGlobalParams}&analysisVariables=["5yearincrements.MEDAGE_CY,Health.MEDHINC_CY"]`;
    let resA = await fetch(otherAnalysisParams);
    let resultA = await resA.json();
    setAnalysisRes(
      resultA.results[0].value.FeatureSet[0].features[0].attributes,
      x,
      y
    );
    let additionalAnalysisParams = `${otherAnalysisParams}&studyAreasOptions={"areaType":"RingBuffer","bufferUnits":${unit},"bufferRadii":${ringSize}}`;
    let resAdd = await fetch(additionalAnalysisParams);
    let resultAdd = await resAdd.json();
    setAdditionalRes(
      resultAdd.results[0].value.FeatureSet[0].features[0].attributes,
      x,
      y
    );
    setLocation(coords);
    setPinLocation(coords);
    setCircleX(x);
    setCircleY(y);
    setZoomLevel(13);
    showMap();
  };
  
  const setAnalysisRes = (attributes) => {
    Keyboard.dismiss();
    setPart15(`</div>").openPopup();
    </script>
  </body>`);
    setAddress(theAddress);
    setMedianAge(attributes.MEDAGE_CY);
    setMedianIncome(attributes.MEDHINC_CY.toLocaleString("en-US"));
  };

  const setAdditionalRes = (attributes) => {
    Keyboard.dismiss();
    setPart15(`</div>").openPopup();
    </script>
  </body>`);
    setAddress(theAddress);
    setNewMedianAge(attributes.MEDAGE_CY);
    setNewMedianIncome(attributes.MEDHINC_CY.toLocaleString("en-US"));
  };

  const setRes = (attributes) => {
    Keyboard.dismiss();
    setPart15(`</div>").openPopup();
    </script>
  </body>`);
    setAddress(theAddress);
    setTotalPop(attributes.TOTPOP.toLocaleString("en-US"));
    setTotalHH(attributes.TOTHH.toLocaleString("en-US"));
    setAvgHHSZ(attributes.AVGHHSZ);
    setMalePop(attributes.TOTMALES.toLocaleString("en-US"));
    setFemalePop(attributes.TOTFEMALES.toLocaleString("en-US"));
  };

  let part1 = `<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no" />
  <title>Esri Leaflet Tutorials: Display a map</title>
  <!-- Load Leaflet from CDN -->
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" crossorigin="" />
  <script src="https://unpkg.com/leaflet@1.8.0/dist/leaflet.js" crossorigin=""></script>
  <!-- Load Esri Leaflet from CDN -->
  <script src="https://unpkg.com/esri-leaflet@^3.0.8/dist/esri-leaflet.js"></script>
  <script src="https://unpkg.com/esri-leaflet-vector@4.0.0/dist/esri-leaflet-vector.js"></script>
  <script type="module" src="https://js.arcgis.com/calcite-components/1.4.3/calcite.esm.js"></script>
<link rel="stylesheet" type="text/css" href="https://js.arcgis.com/calcite-components/1.4.3/calcite.css" />
  <style>
    #map {
      position: absolute;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const map = L.map("map", {
      minZoom: 2
    })
    map.setView(`;
  let part2 = location;
  let part3 = `, `;
  let part3_2 = zoomLevel;
  let part3_3 = `);
    const apiKey =   "YOUR_API_KEY";      
    const basemapEnum = "ArcGIS:Community";
    L.esri.Vector.vectorBasemapLayer(basemapEnum, {
      apiKey: apiKey
    }).addTo(map);
    const marker = L.marker(`;
  let part4 = pinLoc;
  let part5 = `)
    marker.addTo(map); var circle = L.circle([`;

  let part5_1 = `, `;
  let part5_2 = `], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.2,
          radius: 804.672,
          stroke: false
      }).addTo(map);
      marker.bindPopup("<div style='font-size: 16px;'><span style='font-size: 19px; font-weight: 800;'>Key Global Facts (1 mile search)</span><br/><div style='margin-top:8px;'><b>Total Population 👥: </b>`;
  let part6 = totalPop;
  let part7 = `</div><b>Total Households 🏠: </b>`;
  let part8 = totalHH;
  let part9 = `<br/><b>Avg Household Size 👨‍👩‍👧: </b>`;
  let part10 = avgHHSZ;
  let part11 = `<br/><b>Total Males <span style='font-size: 14px;'>👨</span>: </b>`;
  let part12 = malePop;
  let part13 = `<br/><b>Total Females 👧: </b>`;
  let part14 = femalePop;

  const showMap = () => {
    if (additionalParams) {
      part5_2 = `], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: 3000,
        stroke: false
    }).addTo(map);
    marker.bindPopup("<div style='font-size: 16px;'><span style='font-size: 19px; font-weight: 800;'>Analysis Facts (`;
      let part5_3 = ringSize + " " + "km";
      let part5_4 = ` search)</span><br/><div style='margin-top:8px;'><b>Median Age: </b>`;
      part6 = newMedianAge;
      part7 = ` years</div><b>Median Household Income: </b>`;
      part8 = "$" + newMedianIncome;
      setCustomHTML(
        part1 +
          part2 +
          part3 +
          part3_2 +
          part3_3 +
          part4 +
          part5 +
          circleY +
          part5_1 +
          circleX +
          part5_2 +
          part5_3 +
          part5_4 +
          part6 +
          part7 +
          part8 +
          part15
      );
    } else if (enrichAnalysisParams) {
      part5_2 = `], {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.2,
        radius: 804.672,
        stroke: false
    }).addTo(map);
    marker.bindPopup("<div style='font-size: 16px;'><span style='font-size: 19px; font-weight: 800;'>Analysis Facts (1 mile search)</span><br/><div style='margin-top:8px;'><b>Median Age: </b>`;
      part6 = medianAge;
      part7 = ` years</div><b>Median Household Income: </b>`;
      part8 = "$" + medianIncome;
      setCustomHTML(
        part1 +
          part2 +
          part3 +
          part3_2 +
          part3_3 +
          part4 +
          part5 +
          circleY +
          part5_1 +
          circleX +
          part5_2 +
          part6 +
          part7 +
          part8 +
          part15
      );
    } else {
      setCustomHTML(
        part1 +
          part2 +
          part3 +
          part3_2 +
          part3_3 +
          part4 +
          part5 +
          circleY +
          part5_1 +
          circleX +
          part5_2 +
          part6 +
          part7 +
          part8 +
          part9 +
          part10 +
          part11 +
          part12 +
          part13 +
          part14 +
          part15
      );
    }
  };

  useEffect(() => {
    showMap();
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6d29cc" />
      <View style={styles.map}>
        <WebView originWhitelist={["*"]} source={{ html: customHTML }} />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>ArcGIS GeoEnrichment Service</Text>
      </View>
      <View style={styles.inputSection}>
        <TextInput
          onChangeText={(value) => setTheAddress(value)}
          placeholder="Enter Address"
          style={styles.textInput}
        />
        <Pressable onPress={geoCode} style={styles.press}>
          <Text style={styles.text}>🔍</Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  titleContainer: {
    backgroundColor: "#974dff",
    color: "white",
    position: "absolute",
    top: 0,
    paddingHorizontal: 28,
    paddingTop: 6,
  },
  container: {
    paddingTop: 41,
    alignItems: "center",
    backgroundColor: "#6d29cc",
    text: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
    textAlign: "center",
    marginBottom: 10,
    zIndex: 99,
    fontFamily: "monospace",
    color: "white",
  },
  addressTitle: {
    fontSize: 21,
    fontWeight: 800,
    marginBottom: 10,
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
  },
  subTitle: {
    fontSize: 20,
  },
  inputSection: {
    position: "absolute",
    flexDirection: "row",
    top: 48,
    right: 6,
    display: "flex",
  },
  textInput: {
    backgroundColor: "white",
    fontSize: 14,
    padding: 9,
    margin: 5,
    maxWidth: 245,
    maxHeight: 40,
    borderColor: "#000000",
    borderWidth: 1,
    width: 250,
    zIndex: 99,
    fontFamily: "monospace",
    borderColor: "#B3B3B4",
    borderRadius: 5,
  },
  press: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "#007AC2",
    marginTop: 6,
    marginBottom: 6,
    zIndex: 99,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  resultsText: {
    fontSize: 17,
  },
});

export default App;
