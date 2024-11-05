import React, { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import MapComponent from "./Components/MapComponent";
import { HashLoader } from "react-spinners";
import arrowIcon from './assets/icon-arrow.svg';

const App = () => {

  const [width, setWidth] = useState(window.innerWidth);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(true);
  const [ip, setIP] = useState(null);

  const API_KEY = "at_Rr18gt5YiQvy6uACFjTBZ4ooTw2dc";

  const btnClicked = () => {
    setLoading(true);
    const request_url = ip
      ? `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}&ipAddress=${ip}`
      : `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;
    fetchData(request_url);
  };

  const ipChanged = () => {
    setIP(document.getElementById("ip").value);
  };

  // Define an async function to fetch data
  const fetchData = async (url) => {
    try {
      const response = await fetch(url); // Replace with your API URL
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const result = await response.json();
      setResult(result);
      setLoading(false);
      setIP(result.ip);
      console.log(result); // Update state with the fetched data
    } catch (error) {
      console.log(error.message); // Handle errors
    }
  };

  useEffect(() => {
    const request_url = `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}`;
    fetchData(request_url);
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="flex flex-col font-rubik h-screen">
      {/* background */}
      <div className="h-full">
      <img
          className="w-full object-cover hidden sm:block"
          src="images/pattern-bg-desktop.png"
          alt=""
          style={{ height: "250px" }}
        />
        <img
          className="w-full object-cover sm:hidden"
          src="images/pattern-bg-mobile.png"
          alt=""
          style={{ height: "250px" }}
        />
        {loading ? (
          <div className="flex" style={{ height: "calc(100vh - 250px)" }}>
            <HashLoader
              color="#0000ff"
              loading={loading}
              cssOverride={{
                display: "block",
                margin: "auto auto",
                borderColor: "red",
              }}
            />
          </div>
        ) : (
          <>
            <MapComponent location={result.location} />
          </>
        )}
      </div>

      {/* foreground */}
      <div className="absolute w-full">
        <h1 className="text-white text-3xl font-medium text-center my-6">
          IP Address Tracker
        </h1>
        {/* input for ip */}
        <div className="mb-6 flex justify-center">
          <input
            type="text"
            id="ip"
            className="text-xl rounded-l-2xl text-gray-800 py-4 w-48 pl-4 sm:w-[40vw]"
            defaultValue={ip && width < 886? ip : ""}
            placeholder={width>640? "Search for any IP address or domain" : ""}
            onChange={ipChanged}
          />
          <button className="bg-black p-6 rounded-r-2xl hover:bg-gray-700" onClick={btnClicked}>
            <img src={arrowIcon} alt="" />
          </button>
        </div>

        {/* results container */}
        <div className="bg-white mx-10 rounded-2xl sm:grid sm:grid-cols-4 lg:mx-20 sm:py-6">
          <div className="text-center p-6 sm:text-left">
            <p className="uppercase text-xs font-bold tracking-widest text-gray-400">
              ip address
            </p>
            <p className="text-xl font-medium overflow-hidden">{result.ip ? result.ip : ""}</p>
          </div>

          <div className="text-center p-6 sm:text-left sm:border-l-2 border-gray-300">
            <p className="uppercase text-xs font-bold tracking-widest text-gray-400">
              location
            </p>
            <p className="text-xl font-medium">
              {result.location
                ? `${result.location.region}, ${result.location.country} ${result.location.postalCode}`
                : ""}
            </p>
          </div>

          <div className="text-center p-6 sm:text-left sm:border-l-2 border-gray-300">
            <p className="uppercase text-xs font-bold tracking-widest text-gray-400">
              timezone
            </p>
            <p className="text-xl font-medium">
              {result.location ? `UTC ${result.location.timezone}` : ""}
            </p>
          </div>

          <div className="text-center p-6 sm:text-left sm:border-l-2 border-gray-300">
            <p className="uppercase text-xs font-bold tracking-widest text-gray-400">
              isp
            </p>
            <p className="text-xl font-medium">
              {result.isp ? result.isp.toUpperCase() : "Unknown"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
