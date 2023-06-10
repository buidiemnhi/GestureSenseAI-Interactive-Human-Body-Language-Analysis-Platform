import React, {
  useEffect,
  useState,
} from 'react';

import ReactApexChart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

function Statpage(props) {
  const naviagte = useNavigate()
  const [chartsData,setChartsData] = useState({
    total_users:"",
    total_videos:"",
    total_videos_uploaded_this_month:[],
    username_over_total_duration:[],
    username_over_total_videos:[],
  })

  const [barChartData,setBarChartData] = useState([])
  const [barChartCount,setBarChartCount] = useState([])
  const [barChartData2,setBarChartData2] = useState([])
  const [barChartCount2,setBarChartCount2] = useState([])
  const [onlineUsers,setOnlineUsers] = useState(0)
  const [offlineUsers,setOfflineUsers] = useState(0)


  console.log(chartsData)

  const chartOptions1 = {
    series: [
      {
        name: 'user name',
        data: barChartCount,
      },
    ],
    options: {
      chart: {
        id: 'basic-line',
      },
      xaxis: {
        categories: barChartData,
      },
    },
  };

    const chartOptions2 = {
    series: [
      {
        name: 'user name',
        data: barChartCount2,
      },
    ],
    options: {
      chart: {
        id: 'basic-line',
      },
      xaxis: {
        categories: barChartData2,
      },
    },
  };
   
  const chartOptions = {
    series: [onlineUsers,offlineUsers],
    labels: ['online', 'offline'],
    options: {
      chart: {
        type: 'donut',
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      }],
    },
  };

  useEffect(() => {
    let jwtToken = localStorage.getItem('jwt_token');
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${jwtToken}`);
    myHeaders.append("Cookie", `session=.${jwtToken}`);
    myHeaders.append("Content-Type", "application/json");
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };
    fetch('http://127.0.0.1:5000/admin-statistics',requestOptions)
    .then(res=>res.json())
    .then(res=>{
      setChartsData(res)
      const username_over_total_videos = res.username_over_total_videos
      const username_over_total_duration = res.username_over_total_duration

      // handle user and uploaded video data
      const dataArr = []
      const countArr = []
      username_over_total_videos.forEach(element => {
        dataArr.push(element.name)
        countArr.push(element.video_count)
      });
      setBarChartCount(countArr)
      setBarChartData(dataArr)
      //

      //handle user and uploaded videos duration
      const dataArr2 = []
      const countArr2 = []
      username_over_total_duration.forEach(element => {
        dataArr2.push(element.username)
        countArr2.push(element.video_duration)
      });
      setBarChartCount2(countArr2)
      setBarChartData2(dataArr2)
      //

      //handle online and offline
      setOnlineUsers(res.total_user_online)
      setOfflineUsers(res.total_user_offline)
      //
    })
  }, [])
  

  return (
    <div className='container pb-5'>
        <h3 className='my-4'>System statistics</h3>
        <div className='statsContainer d-flex w-100'>

            <div className='w-40 mx-auto card p-2 shadow round25 grow'>
                <h3 className='my-4 mx-3'>Total durations of the video uploaded by each user</h3>         
                <ReactApexChart
                    options={chartOptions2.options}
                    series={chartOptions2.series}
                    type="bar"
                    height={350}
                    className=""
                />
            </div>

            <div className='w-40 mx-auto card p-2 shadow round25 grow hight-fit'>
                <h3 className='my-4 m-3'>System statistics</h3>
                <div className='d-flex w-100 my-2 hight-fit'>

                    <div className='text-center shadow p-2 smallstatcolorcard round25 text-white grow mx-auto' onClick={() => props.changeViewFuntion(1)}>
                        <h5>
                            Total users
                        </h5>
                        <h6 className='grow'>
                            {chartsData.total_users}
                        </h6>
                    </div>
                    <div className='text-center shadow p-2 smallstatcolorcard round25 text-white grow mx-auto'>
                        <h5 className=''>
                            Total videos 
                        </h5>
                        <h6>
                            {chartsData.total_videos}
                        </h6>
                    </div>

                </div>

                <div className=' w-75 text-center grow shadow smallstatcolorcard text-white round25 p-2 my-2 mx-auto'>
                    <h5>
                        Total videos uploaded today 
                    </h5>
                    <h6>
                        {chartsData.total_videos_uploaded_this_month}
                    </h6>
                </div>
                <div className='d-flex w-100 my-2 hight-fit'>
                    <div className='text-center shadow p-2 smallstatcolorcard round25 text-white grow mx-auto' onClick={() => props.changeViewFuntion(1)}>
                        <h5>
                            Online users
                        </h5>
                        <h6 className='grow'>
                            {onlineUsers}
                        </h6>
                    </div>
                    <div className='text-center shadow p-2 smallstatcolorcard round25 text-white grow mx-auto'>
                        <h5 className=''>
                            Offline users 
                        </h5>
                        <h6>
                            {offlineUsers}
                        </h6>
                    </div>
                </div>
            </div>
        </div>
        <div className='statsContainer d-flex w-100 mt-5 '>

            <div className='w-40 mx-auto card p-2 shadow round25 grow'>

              <h3 className='my-4 m-3'>Total uploaded videos by each user</h3>         
              <ReactApexChart
              options={chartOptions1.options}
              series={chartOptions1.series}
              type="bar"
              height={350}
              className=""
              />

            </div>

            <div className='w-40 mx-auto card p-2 shadow round25 grow'>
                <h3 className='my-4 m-3'>Total online and offline users</h3>
                <ReactApexChart
                  options={chartOptions.options}
                  series={chartOptions.series}
                  type="donut"
                  height={350}
                  className="my-auto"
                />
            </div>

        </div>
    </div>
  )
}

export default Statpage