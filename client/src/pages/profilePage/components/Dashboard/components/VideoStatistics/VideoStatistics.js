import '../../../../../../../node_modules/video-react/dist/video-react.css';
import './ThirdSection.css';

import {
  React,
  useEffect,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import Chart from 'react-apexcharts';
import {
  BigPlayButton,
  ClosedCaptionButton,
  ControlBar,
  Player,
} from 'video-react';

export default function VideoStatistics() {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [videoChartMotionConuter, setVideoChartMotionConuter] = useState([]);

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
        setSelectedOption(data.Data.videos[0].URL);
        let MotionConuterData = await GetVideoStat(data.Data.videos[0].video_id)
        setVideoChartMotionConuter(MotionConuterData)
      } catch (error) {
        console.error("Error:", error);
      }
    };

    GetAllTheVideosForStat();
  }, []);







  async function GetVideoStat(video_id) {
    try {
      const cookieValue = Cookies.get("_auth");
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${cookieValue}`);
      myHeaders.append("Cookie", `session=.${cookieValue}`);
      myHeaders.append("Content-Type", "application/json"); // Added this line
  
      var requestOptions = {
        method: "POST", // Changed to POST
        headers: myHeaders,
        body: JSON.stringify({
          "video_id": video_id  // Added body
        })
      };
  
      const response = await fetch(
        `http://127.0.0.1:5000/video-statistics`, // removed video_id from url
        requestOptions
      );
  
      const data = await response.json();

      return data;
  
    } catch (error) {
      console.error("Error:", error);
      return {
        "Counts": [],
        "Words": []
      };
    }
  }




    async function handleSelect(event) {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    const selectedOption = options.find(
      (option) => option.URL === selectedValue
    );
    
    let MotionConuterData = await GetVideoStat(selectedOption.video_id)
    setVideoChartMotionConuter(MotionConuterData)


    if (selectedOption) {
      console.log(selectedOption.video_id);
    }
  }
  let MotionConuter = {
    series: [
      {
        name: "# of Detection/Video",
        data: videoChartMotionConuter.Counts ? videoChartMotionConuter.Counts.slice() : [],
        color: "#181818",
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
        stroke: {
          width: 2,
          colors: ["#181818", "#A27B5C"],
        },
        fill: {
          opacity: 0.1,
          colors: ["#181818", "#A27B5C"],
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        categories: videoChartMotionConuter.Words ? videoChartMotionConuter.Words.slice() : [],
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
              <select
                className="dropdown"
                select={selectedOption}
                onChange={handleSelect}
              >
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
        <div className="col-11">
          <Chart
            options={MotionConuter.options}
            series={MotionConuter.series}
            type="bar"
            height={250}
            width={"100%"}
          />
        </div>
      </div>
    </div>
  );
}
