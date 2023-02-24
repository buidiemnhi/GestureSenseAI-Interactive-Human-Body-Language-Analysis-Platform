import './PersonalStatistics.css';

import React from 'react';

import Chart from 'react-apexcharts';
import { VscGraphLine } from 'react-icons/vsc';

import DataInsightBox from '../DataInsight/DataInsightBox';

export default function PersonalStatistics() {
    let CurrentTime = new Date()
    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    let Percentage = 225
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
        <div className='m-5 SecondSection'>
            <div>
                <div className='d-flex Container-fluid'>
                    <h2 className="display-5">Personal statistics</h2>
                    {/*<p className='ml-auto d-flex align-items-center'>icon</p>*/}
                </div>
                <p className="text-muted">{CurrentTime.toLocaleDateString("en-US", options)}</p>
            </div>
            <div className='mb-5'></div>
            <div className='preformanceInsight shadow-sm p-1 d-flex justify-content-center align-items-center '>
                <VscGraphLine className='mr-2' />
                {Percentage + '%' + " Prefomance increase"}
            </div>
            <div className='mb-5'></div>
            <div className='col'>
                <div className='row'>
                    <div className='col-6 mb-4 '>
                        <DataInsightBox MainText={"Videos Info"} SecondaryText={"Top Action"} InfoText={TopAction} />
                    </div>
                    <div className='col-6'>
                    <DataInsightBox MainText={"User Actions"} SecondaryText={"Top Action"} InfoText={TopAction} />
                    </div>
                </div>
            </div>
            <Chart options={tempData.options} series={tempData.series} type="line" height={280} />
        </div>
    )
}
