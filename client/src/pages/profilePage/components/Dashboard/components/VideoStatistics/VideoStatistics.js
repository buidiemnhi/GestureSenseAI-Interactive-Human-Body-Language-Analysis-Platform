import "../../../../../../../node_modules/video-react/dist/video-react.css";
import "./ThirdSection.css";
import Cookies from "js-cookie";

import { React, useState, useEffect } from "react";

import Chart from "react-apexcharts";
import {
  BigPlayButton,
  ClosedCaptionButton,
  ControlBar,
  Player,
} from "video-react";


export default function VideoStatistics() {

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  function handleSelect(event) {
    setSelectedOption(event.target.value);
  }

  useEffect(() => {
    const GetAllTheVideosForStat = async () => {
      try {
        const cookieValue = Cookies.get("_auth");
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${cookieValue}`);
        myHeaders.append("Cookie", `session=.${cookieValue}`);
        var requestOptions = {
          method: "GET",
          headers: myHeaders,
        };
        const response = await fetch(
          "http://127.0.0.1:5000//statistics-two",
          requestOptions
        );
        const data = await response.json();
        setOptions(data.Data.videos);        
        setSelectedOption(data.Data.videos[0].URL)
  
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    GetAllTheVideosForStat();
  }, []);
  

  let tempData = {
    series: [
      {
        name: "Series 1",
        data: [80, 50, 30, 40, 100, 20],
        color: "#3F4E4F",
      },
      {
        name: "Series 2",
        data: [10, 30, 40, 80, 40, 80],
        color: "#A27B5C",
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "radar",
        dropShadow: {
          enabled: true,
          blur: 1,
          left: 1,
          top: 1,
        },
      },
      title: {
        text: "",
      },
      stroke: {
        width: 2,
        colors: ["#3F4E4F", "#A27B5C"],
      },
      fill: {
        opacity: 0.1,
        colors: ["#3F4E4F", "#A27B5C"],
      },
      markers: {
        size: 0,
      },
      xaxis: {
        categories: ["2011", "2012", "2013", "2014", "2015", "2016"],
      },
    },
  };

  let tempData2 = {
    series: [
      {
        name: "# of Detection/Video",
        data: [400, 430, 448, 470, 540, 580, 690],
        color: "#3F4E4F",
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: [
          "Hand gestures",
          "Posture",
          "Eye contact",
          "Microexpressions",
          "Body language in context",
          "Emotional state",
          "Intentions",
        ],
      },
    },
  };
  return (
    <div className="m-3 mt-5 ThirdSection">
      <h3 className="display-5">Video Statistics</h3>
      <div className="m-auto d-flex flew-row">
        <Player
          className=""
          autoPlay
          muted
          fluid={false}
          width={440}
          height={280}
          playsInline
          poster="/assets/poster.png"
          src={selectedOption}
        >
          <ControlBar autoHide={false}>
            <ClosedCaptionButton order={7} />
          </ControlBar>
          <BigPlayButton position="center" />
        </Player>
        <div className="mx-auto col-4  d-flex flex-column">
          <div className="my-auto">
            <h4>Choose the video</h4>
            <p>from the list</p>
            <div className="dropdown-container">
              <select className="dropdown" select={selectedOption} onChange={handleSelect}>
                {options.map((option, index) => (
                  <option key={option.video_id} value={option.URL}>
                    {option.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div className="mx-auto row justify-content-between">
        <div className="col-5">
          <Chart
            options={tempData.options}
            series={tempData.series}
            type="radar"
            height={250}
            width={270}
          />
        </div>
        <div className="col-7">
          <Chart
            options={tempData2.options}
            series={tempData2.series}
            type="bar"
            height={250}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}
