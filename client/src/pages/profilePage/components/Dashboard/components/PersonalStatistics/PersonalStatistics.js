import './PersonalStatistics.css';
import React, {useState,useEffect} from 'react';
import Chart from 'react-apexcharts';
import DataInsightBox from '../DataInsight/DataInsightBox';
import Cookies from 'js-cookie';


export default function PersonalStatistics() {
    let CurrentTime = new Date()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [lastUploadedVideoDate, setLastUploadedVideoDate] = useState(null);
    const [totalDuration, setTotalDuration] = useState(0);
    const [totalVideosNumber, setTotalVideosNumber] = useState(0);
    const [videosUploadedArr, setvideosUploadedArr] = useState([]);

    useEffect(() => {
      const fetchPerformancePercentage = async () => {
          try {
            const cookieValue = Cookies.get('_auth');
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${cookieValue}`);
            myHeaders.append("Cookie", `session=.${cookieValue}`);
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
            };
              const response = await fetch('http://127.0.0.1:5000//statistics-one', requestOptions );
              const data = await response.json();
              setLastUploadedVideoDate(data.Data.last_uploaded_date);
              setTotalVideosNumber(data.Data.total_videos_number)
              setTotalDuration(data.Data.total_duration)
              setvideosUploadedArr(data.Data.total_videos_number_per_month)
          } catch (error) {
              console.error('Error:', error);
          }
      };

      fetchPerformancePercentage();
  }, []);

    let tempData = {
       
        series: [{
            name: "Videos uploaded Monthly",
            data: videosUploadedArr
        }],
        options: {
          chart: {
            height: 350,
            type: 'line',
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          colors: ['#191b1f'],
          stroke: {
            curve: 'straight'
          },
          title: {
            text: 'Product Trends by Month',
            align: 'left'
          },
          grid: {
            row: {
              colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
              opacity: 0.5
            },
          },
          xaxis: {
            categories: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
          }
        },
      
      
      };

    return (
        <div className='m-5'>
            <div>
                <div className='d-flex Container-fluid text-center'>
                    <h2 className="display-5 mx-auto">Personal statistics</h2>
                    {/*<p className='ml-auto d-flex align-items-center'>icon</p>*/}
                </div>
                <p className="text-muted text-center">{CurrentTime.toLocaleDateString("en-US", options)}</p>
            </div>
            <div className='mb-5'></div>
            <div className='preformanceInsight shadow-sm p-1 d-flex justify-content-center align-items-center '>
                <h5 className='fs-4'>{totalDuration + "  Time of videos"}</h5>
            </div>
            <div className='col'>
                <div className='row'>
                    <div className='col-6 mb-4 text-center'>
                        <DataInsightBox MainText={""} SecondaryText={"Number Of Videos"} InfoText={totalVideosNumber + " Videos"} />
                    </div>
                    <div className='col-6 text-center'>
                    <DataInsightBox MainText={""} SecondaryText={"Last Updated Video"} InfoText={lastUploadedVideoDate } />
                    </div>
                </div>
            </div>
            <Chart options={tempData.options} series={tempData.series} type="line" height={280} w={"50%"}/>
        </div>
    )
}
