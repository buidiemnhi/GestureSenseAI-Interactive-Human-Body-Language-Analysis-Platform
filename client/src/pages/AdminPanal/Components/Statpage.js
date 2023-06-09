import React, { useEffect } from 'react';

import ReactApexChart from 'react-apexcharts';

function Statpage() {

  const chartOptions = {
    series: [
      {
        name: 'Series 1',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
    ],
    options: {
      chart: {
        id: 'basic-line',
      },
      xaxis: {
        categories: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    },
  };
   
  const chartOption = {
    series: [44, 55, 13, 33],
    labels: ['Apple', 'Mango', 'Banana', 'Orange'],
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
    fetch('http://127.0.0.1:5000/admin-statistics')
    .then(res=>res.json())
    .then(res=>console.log(res))
  }, [])
  

  return (
    <>
        <h3 className='my-4'>System statistics</h3>
        <div className='statsContainer d-flex w-100'>
            <div className='w-40 mx-auto card p-2 shadow round25 grow'>
                <h3 className='my-4 mx-3'>System statistics</h3>         
                <ReactApexChart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="line"
                    height={350}
                    className=""
                />
            </div>
            <div className='w-40 mx-auto card p-2 shadow round25 grow'>
                <h3 className='my-4 m-3'>System statistics</h3>
                <div className='d-flex w-100 my-2'>

                    <div className='text-center shadow p-2 smallstatcolorcard round25 text-white grow mx-auto'>
                        <h5>
                            Total users count 
                        </h5>
                        <h6 className='grow'>
                            6
                        </h6>
                    </div>
                    <div className='text-center shadow p-2 smallstatcolorcard round25 text-white grow mx-auto'>
                        <h5>
                            Total videos count 
                        </h5>
                        <h6>
                            6
                        </h6>
                    </div>

                </div>

                <div className=' w-75 text-center grow shadow smallstatcolorcard text-white round25 p-2 my-2 mx-auto'>
                    <h5>
                        Total videos uploaded today 
                    </h5>
                    <h6>
                        6
                    </h6>
                </div>

            </div>
        </div>
        <div className='statsContainer d-flex w-100 mt-5 '>
            <div className='w-40 mx-auto card p-2 shadow round25 grow'>
                <h3 className='my-4 m-3'>System statistics</h3>         
                <ReactApexChart
                    options={chartOptions.options}
                    series={chartOptions.series}
                    type="line"
                    height={350}
                    className=""
                />
            </div>
            <div className='w-40 mx-auto card p-2 shadow round25 grow'>
                <h3 className='my-4 m-3'>System statistics</h3>
                <ReactApexChart
                    options={chartOption.options}
                    series={chartOption.series}
                    type="donut"
                    height={350}
                    className="my-auto"
                />
            </div>
        </div>
    </>
  )
}

export default Statpage