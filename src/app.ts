// Code goes here!
import axios from "axios";

declare var process: any;
declare var google: any;

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
type GoogleGeocodingResponse = {
  results: { geometry: { location: { lat: number; long: number } } }[];
  status: "OK" | "ZERO_RESULTS";
};

const form = document.querySelector("form");
const addressInput = document.getElementById("address")! as HTMLInputElement;
const searchAddressHandler = async (event: Event) => {
  try {
    event.preventDefault();
    const enteredAddress = addressInput.value;
    // convert string to a URL compatible string by using encodeURI() function

    let response = await axios.get<GoogleGeocodingResponse>(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(
        enteredAddress
      )},+CA&key=${GOOGLE_API_KEY}`
    );
    if (response.data.status !== "OK") {
      throw new Error("could not find location");
    }
    let coordinates = response.data.results[0].geometry.location;
    const map = new google.maps.Map(document.getElementById("map"), {
      center: coordinates,
      zoom: 18,
    });
    new google.maps.Marker({
      position: coordinates,
      map: map,
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
};
form?.addEventListener("submit", searchAddressHandler);
