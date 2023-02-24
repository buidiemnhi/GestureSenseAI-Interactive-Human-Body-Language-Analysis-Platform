import React from 'react';

import sampleVTT from '../Dashboard/components/VideoStatistics/Sample.vtt';

//import sampleVTT from '../../../Sample.vtt'

export default function VideoGallery() {
  const videos = [
    { src: 'https://snapxcdn.com/v2/?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJodHRwczovL3Njb250ZW50LmNkbmluc3RhZ3JhbS5jb20vdi90NTAuMjg4Ni0xNi8zMTAwNjA4NjVfMTk3ODEwMDk1OTM3NjU5XzMyODI1MzU5ODU2NTY1MjgwODFfbi5tcDQ_ZWZnPWV5SjJaVzVqYjJSbFgzUmhaeUk2SW5aMGMxOTJiMlJmZFhKc1oyVnVMakV3T0RBdVkyeHBjSE11YUdsbmFDSXNJbkZsWDJkeWIzVndjeUk2SWx0Y0ltbG5YM2RsWWw5a1pXeHBkbVZ5ZVY5MmRITmZiM1JtWENKZEluMCZfbmNfaHQ9c2NvbnRlbnQuY2RuaW5zdGFncmFtLmNvbSZfbmNfY2F0PTEwNyZfbmNfb2hjPXVYYjVtclNucHVrQVgtVnpnbDEmZWRtPUFQczE3Q1VCQUFBQSZ2cz00ODgwNDI5NTY2NzE3MThfMTg3MTAyMzI2MCZfbmNfdnM9SEJrc0ZRQVlKRWRGUlc1bGVFbzNWMGxDUVRaTVRVRkJUa1k0Wm14elZ6WlpNSFJpY1Y5RlFVRkJSaFVBQXNnQkFCVUFHQ1JIVUdWZlpGSkpMV3N3VWtrNFoyTkVRVWN3TVRWaVYzTnFla0p0WW5GZlJVRkJRVVlWQWdMSUFRQW9BQmdBR3dBVkFBQW1pTGZmb3N2ZXVUOFZBaWdDUXpNc0YwQTRDSEt3SU1TY0dCSmtZWE5vWDJocFoyaGZNVEE0TUhCZmRqRVJBSFglMkJCd0ElM0QmY2NiPTctNSZvaD0wMF9BZkREdFpiaDBWUXJXSnZYSW5NV0thSXg4dUNDMGo4Ri1vVjRFWTVqZzVOWXV3Jm9lPTYzRjE5NzU1Jl9uY19zaWQ9OTc4Y2I5JmRsPTEiLCJmaWxlbmFtZSI6IlNuYXBpbnN0YS5hcHBfMzEwMDYwODY1XzE5NzgxMDA5NTkzNzY1OV8zMjgyNTM1OTg1NjU2NTI4MDgxX24ubXA0In0.HA1qZz69txYFLjrS1apuKH7MDb8Adblb2dx1zoAIfYQ&dl=1', title: 'Video 1', dec: 'Video Description about somthing' },
    { src: 'https://dd75.uytrartzcr.xyz/dl/-_AICUh-5Ks/1676584965/deecd5480ff1e60d187f016c4cddef46bd09dd1abc89992d2be7b7117af2f89b?file=aHR0cHM6Ly9ycjItLS1zbi01aG5lNm42bC5nb29nbGV2aWRlby5jb20vdmlkZW9wbGF5YmFjaz9leHBpcmU9MTY3NjYwMjc4MyZlaT1QNW51WTVESUo2M0V4X0FQd0oyTDhBbyZpcD0xMzkuNTkuMTI4LjIxJmlkPW8tQUt6S3JiaVQyRkw3T2x5WWF0MTJfelJtNnllMUJoQ0lwZzlLbkV4U3hPbWomaXRhZz0xOCZzb3VyY2U9eW91dHViZSZyZXF1aXJlc3NsPXllcyZtaD1HZiZtbT0zMSUyQzI5Jm1uPXNuLTVobmU2bjZsJTJDc24tNWhuZWtuZXMmbXM9YXUlMkNyZHUmbXY9bSZtdmk9MiZwbD0xOSZpbml0Y3duZGJwcz0xNTUwMDAmdnBydj0xJm1pbWU9dmlkZW8lMkZtcDQmbnM9LW5ZeEdwQWctN210X1BJSzRuWC1MRzBMJmdpcj15ZXMmY2xlbj0xNDA4MzIxMSZyYXRlYnlwYXNzPXllcyZkdXI9MzI1LjU5MCZsbXQ9MTY3NjEyODg2NzI2MDUzNSZtdD0xNjc2NTgwODA3JmZ2aXA9MiZmZXhwPTI0MDA3MjQ2JmM9VFZIVE1MNV9TSU1QTFlfRU1CRURERURfUExBWUVSJnR4cD02MzE5MjI0Jm49Z09tcU1vRHRzcDNlc2JJJnNwYXJhbXM9ZXhwaXJlJTJDZWklMkNpcCUyQ2lkJTJDaXRhZyUyQ3NvdXJjZSUyQ3JlcXVpcmVzc2wlMkN2cHJ2JTJDbWltZSUyQ25zJTJDZ2lyJTJDY2xlbiUyQ3JhdGVieXBhc3MlMkNkdXIlMkNsbXQmc2lnPUFPcTBRSjh3UkFJZ0tsZTZ5UDNmSlg3NFRmby0zcjFYdFV0MkQxWUNSLWlTQTg3LXU0cndyb1FDSUZ4Y0FLMnRXX0NkcW1jZ0FWM3pPanJtaF8wdUhhT1E1cVJ2NHJGZDJZOXEmbHNwYXJhbXM9bWglMkNtbSUyQ21uJTJDbXMlMkNtdiUyQ212aSUyQ3BsJTJDaW5pdGN3bmRicHMmbHNpZz1BRzNDX3hBd1JBSWdaY0diV0hwT3FmT0N1T2ZmOTMyRl9MWmZEWkVGajhTQW94ZGoxUUJ2blhRQ0lGTmRWeUZPXy10ZVVnUTRnX2Q3TWNlZVZXbmh2M0NOUng0M0FBLUJsUGZMJmhvc3Q9cnIyLS0tc24tNWhuZTZuNmwuZ29vZ2xldmlkZW8uY29tJm5hbWU9eXQ1cy5pby0lZDglYjQlZDglYWElZDglYTclZDklOGElZDklODUrJWQ4JWE4JWQ5JTg3JWQ4JWFjJWQ4JWFhKyVkOCViNSVkOCVhNyVkOCVhOCVkOCViMSslZDglYTglZDklODUlZDklODYlZDglYTclZDglYjMlZDglYTglZDklODcrJWQ4JWI5JWQ5JTg4JWQ4JWFmJWQ5JTg3KyVkOCVhNyVkOSU4NCVkOSU4NSVkOCVhZiVkOCVhNyVkOCViMSVkOCViMyslZDklODgrJWQ4JWE3JWQ5JTg0JWQ4JWFjJWQ4JWE3JWQ5JTg1JWQ4JWI5JWQ4JWE3JWQ4JWFhKy0rJWQ4JWE4JWQ5JTg3JWQ4JWFjJWQ4JWFhKyVkOCViNSVkOCVhNyVkOCVhOCVkOCViMSgzNjBwKS5tcDQ', title: 'Video 2', dec: 'Video Description about somthing' },
    { src: 'https://dd75.uytrartzcr.xyz/dl/-_AICUh-5Ks/1676584965/deecd5480ff1e60d187f016c4cddef46bd09dd1abc89992d2be7b7117af2f89b?file=aHR0cHM6Ly9ycjItLS1zbi01aG5lNm42bC5nb29nbGV2aWRlby5jb20vdmlkZW9wbGF5YmFjaz9leHBpcmU9MTY3NjYwMjc4MyZlaT1QNW51WTVESUo2M0V4X0FQd0oyTDhBbyZpcD0xMzkuNTkuMTI4LjIxJmlkPW8tQUt6S3JiaVQyRkw3T2x5WWF0MTJfelJtNnllMUJoQ0lwZzlLbkV4U3hPbWomaXRhZz0xOCZzb3VyY2U9eW91dHViZSZyZXF1aXJlc3NsPXllcyZtaD1HZiZtbT0zMSUyQzI5Jm1uPXNuLTVobmU2bjZsJTJDc24tNWhuZWtuZXMmbXM9YXUlMkNyZHUmbXY9bSZtdmk9MiZwbD0xOSZpbml0Y3duZGJwcz0xNTUwMDAmdnBydj0xJm1pbWU9dmlkZW8lMkZtcDQmbnM9LW5ZeEdwQWctN210X1BJSzRuWC1MRzBMJmdpcj15ZXMmY2xlbj0xNDA4MzIxMSZyYXRlYnlwYXNzPXllcyZkdXI9MzI1LjU5MCZsbXQ9MTY3NjEyODg2NzI2MDUzNSZtdD0xNjc2NTgwODA3JmZ2aXA9MiZmZXhwPTI0MDA3MjQ2JmM9VFZIVE1MNV9TSU1QTFlfRU1CRURERURfUExBWUVSJnR4cD02MzE5MjI0Jm49Z09tcU1vRHRzcDNlc2JJJnNwYXJhbXM9ZXhwaXJlJTJDZWklMkNpcCUyQ2lkJTJDaXRhZyUyQ3NvdXJjZSUyQ3JlcXVpcmVzc2wlMkN2cHJ2JTJDbWltZSUyQ25zJTJDZ2lyJTJDY2xlbiUyQ3JhdGVieXBhc3MlMkNkdXIlMkNsbXQmc2lnPUFPcTBRSjh3UkFJZ0tsZTZ5UDNmSlg3NFRmby0zcjFYdFV0MkQxWUNSLWlTQTg3LXU0cndyb1FDSUZ4Y0FLMnRXX0NkcW1jZ0FWM3pPanJtaF8wdUhhT1E1cVJ2NHJGZDJZOXEmbHNwYXJhbXM9bWglMkNtbSUyQ21uJTJDbXMlMkNtdiUyQ212aSUyQ3BsJTJDaW5pdGN3bmRicHMmbHNpZz1BRzNDX3hBd1JBSWdaY0diV0hwT3FmT0N1T2ZmOTMyRl9MWmZEWkVGajhTQW94ZGoxUUJ2blhRQ0lGTmRWeUZPXy10ZVVnUTRnX2Q3TWNlZVZXbmh2M0NOUng0M0FBLUJsUGZMJmhvc3Q9cnIyLS0tc24tNWhuZTZuNmwuZ29vZ2xldmlkZW8uY29tJm5hbWU9eXQ1cy5pby0lZDglYjQlZDglYWElZDglYTclZDklOGElZDklODUrJWQ4JWE4JWQ5JTg3JWQ4JWFjJWQ4JWFhKyVkOCViNSVkOCVhNyVkOCVhOCVkOCViMSslZDglYTglZDklODUlZDklODYlZDglYTclZDglYjMlZDglYTglZDklODcrJWQ4JWI5JWQ5JTg4JWQ4JWFmJWQ5JTg3KyVkOCVhNyVkOSU4NCVkOSU4NSVkOCVhZiVkOCVhNyVkOCViMSVkOCViMyslZDklODgrJWQ4JWE3JWQ5JTg0JWQ4JWFjJWQ4JWE3JWQ5JTg1JWQ4JWI5JWQ4JWE3JWQ4JWFhKy0rJWQ4JWE4JWQ5JTg3JWQ4JWFjJWQ4JWFhKyVkOCViNSVkOCVhNyVkOCVhOCVkOCViMSgzNjBwKS5tcDQ', title: 'Video 3', dec: 'Video Description about somthing' },
    { src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', title: 'Video 4', dec: 'Video Description about somthing' },
    { src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', title: 'Video 5', dec: 'Video Description about somthing' },
    { src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', title: 'Video 6', dec: 'Video Description about somthing' },
    { src: 'https://media.w3.org/2010/05/sintel/trailer_hd.mp4', title: 'Video 7', dec: 'Video Description about somthing' },
  ];

  return (
    <div className='m-5 videoGallery'>
      <div className='mt-3 d-flex justify-content-center'>
        <h1 className='display-4'>
          Video Gallery
        </h1>
      </div>
      <hr />

      <div className=" row">
        {videos.map((video, index) => (

          <div key={index} className="col-4">
            <video width="350" height="270" controls >
                  <source src={video.src} type="video/mp4"/>
                  <track src={sampleVTT} label="Body language" kind="captions" srclang="en-us" default />
                  <track src={sampleVTT} label="Body 2" kind="captions" srclang="en-us" default />
            </video>

            <h2 className="video-title">{video.title}</h2>
            <p className=''>
              {video.dec}
            </p>

          </div>
        ))}
      </div>

    </div>
  )
}
