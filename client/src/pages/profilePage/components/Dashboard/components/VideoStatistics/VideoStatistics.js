import '../../../../../../../node_modules/video-react/dist/video-react.css';
import './ThirdSection.css';

import {
    React,
    useState
} from 'react';

import Chart from 'react-apexcharts';
import {
    BigPlayButton,
    ClosedCaptionButton,
    ControlBar,
    Player
} from 'video-react';

import sampleVTT from './Sample.vtt';

export default function VideoStatistics() {
    const [selectedOption, setSelectedOption] = useState('https://media.w3.org/2010/05/sintel/trailer_hd.mp4');
    const options = [
        { label: 'Game', value: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4' },
        { label: 'Bahgat Saber', value: 'https://dd75.uytrartzcr.xyz/dl/-_AICUh-5Ks/1676584965/deecd5480ff1e60d187f016c4cddef46bd09dd1abc89992d2be7b7117af2f89b?file=aHR0cHM6Ly9ycjItLS1zbi01aG5lNm42bC5nb29nbGV2aWRlby5jb20vdmlkZW9wbGF5YmFjaz9leHBpcmU9MTY3NjYwMjc4MyZlaT1QNW51WTVESUo2M0V4X0FQd0oyTDhBbyZpcD0xMzkuNTkuMTI4LjIxJmlkPW8tQUt6S3JiaVQyRkw3T2x5WWF0MTJfelJtNnllMUJoQ0lwZzlLbkV4U3hPbWomaXRhZz0xOCZzb3VyY2U9eW91dHViZSZyZXF1aXJlc3NsPXllcyZtaD1HZiZtbT0zMSUyQzI5Jm1uPXNuLTVobmU2bjZsJTJDc24tNWhuZWtuZXMmbXM9YXUlMkNyZHUmbXY9bSZtdmk9MiZwbD0xOSZpbml0Y3duZGJwcz0xNTUwMDAmdnBydj0xJm1pbWU9dmlkZW8lMkZtcDQmbnM9LW5ZeEdwQWctN210X1BJSzRuWC1MRzBMJmdpcj15ZXMmY2xlbj0xNDA4MzIxMSZyYXRlYnlwYXNzPXllcyZkdXI9MzI1LjU5MCZsbXQ9MTY3NjEyODg2NzI2MDUzNSZtdD0xNjc2NTgwODA3JmZ2aXA9MiZmZXhwPTI0MDA3MjQ2JmM9VFZIVE1MNV9TSU1QTFlfRU1CRURERURfUExBWUVSJnR4cD02MzE5MjI0Jm49Z09tcU1vRHRzcDNlc2JJJnNwYXJhbXM9ZXhwaXJlJTJDZWklMkNpcCUyQ2lkJTJDaXRhZyUyQ3NvdXJjZSUyQ3JlcXVpcmVzc2wlMkN2cHJ2JTJDbWltZSUyQ25zJTJDZ2lyJTJDY2xlbiUyQ3JhdGVieXBhc3MlMkNkdXIlMkNsbXQmc2lnPUFPcTBRSjh3UkFJZ0tsZTZ5UDNmSlg3NFRmby0zcjFYdFV0MkQxWUNSLWlTQTg3LXU0cndyb1FDSUZ4Y0FLMnRXX0NkcW1jZ0FWM3pPanJtaF8wdUhhT1E1cVJ2NHJGZDJZOXEmbHNwYXJhbXM9bWglMkNtbSUyQ21uJTJDbXMlMkNtdiUyQ212aSUyQ3BsJTJDaW5pdGN3bmRicHMmbHNpZz1BRzNDX3hBd1JBSWdaY0diV0hwT3FmT0N1T2ZmOTMyRl9MWmZEWkVGajhTQW94ZGoxUUJ2blhRQ0lGTmRWeUZPXy10ZVVnUTRnX2Q3TWNlZVZXbmh2M0NOUng0M0FBLUJsUGZMJmhvc3Q9cnIyLS0tc24tNWhuZTZuNmwuZ29vZ2xldmlkZW8uY29tJm5hbWU9eXQ1cy5pby0lZDglYjQlZDglYWElZDglYTclZDklOGElZDklODUrJWQ4JWE4JWQ5JTg3JWQ4JWFjJWQ4JWFhKyVkOCViNSVkOCVhNyVkOCVhOCVkOCViMSslZDglYTglZDklODUlZDklODYlZDglYTclZDglYjMlZDglYTglZDklODcrJWQ4JWI5JWQ5JTg4JWQ4JWFmJWQ5JTg3KyVkOCVhNyVkOSU4NCVkOSU4NSVkOCVhZiVkOCVhNyVkOCViMSVkOCViMyslZDklODgrJWQ4JWE3JWQ5JTg0JWQ4JWFjJWQ4JWE3JWQ5JTg1JWQ4JWI5JWQ4JWE3JWQ4JWFhKy0rJWQ4JWE4JWQ5JTg3JWQ4JWFjJWQ4JWFhKyVkOCViNSVkOCVhNyVkOCVhOCVkOCViMSgzNjBwKS5tcDQ' },
        { label: 'PSG Video B', value: 'https://snapxcdn.com/v2/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NjYuMzAxMDAtMTYvMTAwMDAwMDBfNTU3MjI2MjYzMDE5NjA2XzY3MjY0ODc2MzcxMTIwMzYyNzlfbi5tcDQ_X25jX2h0PXNjb250ZW50LmNkbmluc3RhZ3JhbS5jb20mX25jX2NhdD0xMDYmX25jX29oYz0zdDA2Y3B4LVgwc0FYOENZWDhJJmVkbT1BUHMxN0NVQkFBQUEmY2NiPTctNSZvaD0wMF9BZkRvRDlNbjhoeHRLM1c0YU1LbWdCb1lFV2FvZzFvWVUtNWpHSHpsTEZSSUxnJm9lPTYzRUY4Q0FCJl9uY19zaWQ9OTc4Y2I5JmRsPTEiLCJmaWxlbmFtZSI6IlNuYXBpbnN0YS5hcHBfMTAwMDAwMDBfNTU3MjI2MjYzMDE5NjA2XzY3MjY0ODc2MzcxMTIwMzYyNzlfbi5tcDQifQ._sm46WZZhJi9yKnVdmKSpuKBSA2ic4aKkd8pOmDqxwY&dl=1' }
    ];
    
    function handleSelect(event) {
        setSelectedOption(event.target.value);
    }

    let tempData = {
        series: [{
            name: 'Series 1',
            data: [80, 50, 30, 40, 100, 20],
            color: '#3F4E4F',

        }, {
            name: 'Series 2',
            data: [10, 30, 40, 80, 40, 80],
            color: '#A27B5C',
        },],
        options: {
            chart: {
                height: 350,
                type: 'radar',
                dropShadow: {
                    enabled: true,
                    blur: 1,
                    left: 1,
                    top: 1
                }
            },
            title: {
                text: ''
            },
            stroke: {
                width: 2,
                colors: ['#3F4E4F', '#A27B5C']

            },
            fill: {
                opacity: 0.1,
                colors: ['#3F4E4F', '#A27B5C']


            },
            markers: {
                size: 0
            },
            xaxis: {
                categories: ['2011', '2012', '2013', '2014', '2015', '2016']
            }
        },



    };

    let tempData2 = {

        series: [{
            name: '# of Detection/Video',
            data: [400, 430, 448, 470, 540, 580, 690],
            color: "#3F4E4F"
        }],
        options: {
            chart: {
                type: 'bar',
                height: 350
            },
            plotOptions: {
                bar: {
                    borderRadius: 4,
                    horizontal: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            xaxis: {
                categories: ['Hand gestures', 'Posture', 'Eye contact', 'Microexpressions', 'Body language in context', 'Emotional state', 'Intentions'
                ],
            }
        },


    };
    return (
        <div className='m-3 mt-5 ThirdSection'>
            <h3 className="display-5">Video Statistics</h3>
            <div className='m-auto row'  >
                <Player
                    autoPlay
                    fluid={false}
                    width={440}
                    height={280}
                    playsInline
                    poster="/assets/poster.png"
                    src={selectedOption}
                >
                    <track
                        kind="captions"
                        src={sampleVTT}
                        srcLang="en"
                        label="English"
                    />
                    <ControlBar autoHide={false}>
                        <ClosedCaptionButton order={7} />
                    </ControlBar>
                    <BigPlayButton position="center" />
                </Player>
                <div className='mx-auto col-4 '>
                    <h4>Choose the video</h4>
                    <p>from the list</p>
                    <div className="dropdown-container">
                        <select className="dropdown" value={selectedOption} onChange={handleSelect}>
                            {options.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
            <hr className='my-4' />
            <div className='mx-auto row justify-content-between'>
                <div className='col-5'>
                    <Chart options={tempData.options} series={tempData.series} type="radar" height={250} width={270} />
                </div>
                <div className='col-7'>
                    <Chart options={tempData2.options} series={tempData2.series} type="bar" height={250} width={400} />
                </div>
            </div>
        </div>
    )
}
