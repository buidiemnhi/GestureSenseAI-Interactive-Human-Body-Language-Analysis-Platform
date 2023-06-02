import {
  React,
  useEffect,
  useState,
} from 'react';

import sampleVTT from '../Dashboard/components/VideoStatistics/Sample.vtt';
import {
  BigPlayButton,
  ClosedCaptionButton,
  ControlBar,
  Player,
} from 'video-react';

//import sampleVTT from '../../../Sample.vtt'

export default function VideoGallery() {
  const [videos, setvideos] = useState([]);
  console.log(videos)
  useEffect(() => {
    async function fetchData() {
      try {
        let jwtToken = localStorage.getItem('jwt_token');
        const response = await fetch('http://127.0.0.1:5000//display-videos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Cookie': `session=.${jwtToken}`,
            'Authorization': `Bearer ${jwtToken}`
          }
        });
        let data = await response.json();
        setvideos(data.videos)

      } catch (error) {
        console.error(error);
      }
    }
    fetchData()
  }, []);



  const vids = videos.map((video, index) => (
    <div key={index} className="col-4">
      <Player
        autoPlay
        muted
        fluid={false}
        width={440}
        height={280}
        playsInline
        src={video.URL}
      >
        {video.subtitles.map((subtitle, subtitleIndex) =>
          Object.values(subtitle).map((subtitleUrl, urlIndex) => (
            <track
              key={`subtitle${subtitleIndex}-${urlIndex}`}
              src={subtitleUrl}
              kind="captions"
              srcLang='en'
              label={`Subtitle ${subtitleIndex + 1}`}
            />
          ))
        )}
        <ControlBar autoHide={false}>
          <ClosedCaptionButton order={7} />
        </ControlBar>
        <BigPlayButton position="center" />
      </Player>


      <h2 className="video-title">{video.video_title}</h2>
      <p className=''>
        Description:{video.video_description}
      </p>

    </div>
  ))



  return (
    <div className='m-5 videoGallery'>
      <div className='mt-3 d-flex justify-content-center'>
        <h1 className='display-4'>
          Video Gallery
        </h1>
      </div>
      <hr />

      <div className="row">
        {videos.length === 0 ?
          <div className='w-100 margin-top d-flex align-items-center justify-content-center font-weight-bold'>No videos to show</div> : vids


        }
      </div>
    </div>
  )
}
