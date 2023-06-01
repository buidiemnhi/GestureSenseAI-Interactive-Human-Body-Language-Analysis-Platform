import './PersonalStatistics.css';

import React, {useState,useEffect} from 'react';

import Chart from 'react-apexcharts';
import { VscGraphLine } from 'react-icons/vsc';

import DataInsightBox from '../DataInsight/DataInsightBox';

import Cookies from 'js-cookie';


export default function PersonalStatistics() {
    let CurrentTime = new Date()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    const [performancePercentage, setPerformancePercentage] = useState(null);

    useEffect(() => {
      const fetchPerformancePercentage = async () => {
          try {
            let jwtToken = localStorage.getItem('jwt_token');
            const cookieValue = Cookies.get('_auth');
            var myHeaders = new Headers();
            myHeaders.append("Authorization", `Bearer ${cookieValue}`);
            myHeaders.append("Cookie", `session=.${cookieValue}`);
            var requestOptions = {
              method: 'GET',
              headers: myHeaders,
            };
              const response = await fetch('http://127.0.0.1:5000//total-durations', requestOptions );
              const data = await response.json();
              console.log(data)
              setPerformancePercentage(data.Data.total_duration);
          } catch (error) {
              console.error('Error:', error);
          }
      };

      fetchPerformancePercentage();
  }, []);


    let TopAction = "Happy feet"

    let tempData = {
       
        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
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
                <h5 className='fs-4'>{performancePercentage + " Total seconds of videos"}</h5>
            </div>
            <div className='col'>
                <div className='row'>
                    <div className='col-6 mb-4 text-center'>
                        <DataInsightBox MainText={"Videos Info"} SecondaryText={"Top Action"} InfoText={TopAction} />
                    </div>
                    <div className='col-6 text-center'>
                    <DataInsightBox MainText={"User Actions"} SecondaryText={"Top Action"} InfoText={TopAction} />
                    </div>
                </div>
            </div>
            <Chart options={tempData.options} series={tempData.series} type="line" height={280} w={"50%"}/>
        </div>
    )
}
