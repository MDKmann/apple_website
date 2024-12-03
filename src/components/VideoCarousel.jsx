import { useEffect, useRef, useState } from "react";
import { hightlightsSlides } from "../constants";
import { gsap }  from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pauseImg, playImg, replayImg } from "../utils";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(ScrollTrigger);

const VideoCarousel = () => {
  const videoRef = useRef([]);
  const videoSpanRef = useRef([]);
  const videoDivRef = useRef([]);

  const [video, setVideo] = useState({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState([]);

  const { isEnd, startPlay, videoId, isLastVideo, isPlaying } = video;

  useGSAP(() => {
    gsap.to('#video', {
      scrollTrigger: {
        trigger: '#video',
        toggleActions: 'restart none none none',
      },
      onComplete: () => {
        setVideo((pre) => ({
          ...pre,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId].pause();
      }
    } else {
      startPlay && videoRef.current[videoId].play();
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  // accepts the index and the event we pass into it
  const handleLoadedMetadata = (i, e) =>
    setLoadedData((prevVideo) => [...prevVideo, e]);

  useEffect(() => {
    const currentProgress = 0;
    let span = videoSpanRef.current;

    if (span[videoId]) {
      // animate the progress of the video
      let anim = gsap.to(span[videoId], {
        onUpdate: () => {},

        onComplete: () => {},
      });
    }
  }, [videoId, startPlay]);

  const handleProcess = (type, i) => {
    switch (type) {
      case "video-end":
        //pre = prevVideo
        setVideo((pre) => ({
          ...pre,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((pre) => ({ ...pre, isLastVideo: true }));
        break;
      case "video-reset":
        setVideo((pre) => ({
          ...pre,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
        setVideo((pre) => ({
          ...pre,
          isPlaying: !pre.isPlaying,
        }));
        break;
      default:
        return video;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list, i) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="w-full h-full overflow-hidden bg-black flex-center rounded-3xl">
                <video
                  id="video"
                  playsInline={true}
                  preload="auto"
                  muted
                  ref={(el) => (videoRef.current[i] = el)}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedData={(e) => handleLoadedMetadata(i, e)}
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>

              <div className="absolute top-12 left-[5%] z-10">
                {list.textLists.map((text) => (
                  <p key={text} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative mt-10 flex-center">
        <div className="py-5 bg-gray-300 rounded-full flex-center px-7 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              key={i}
              ref={(el) => (videoDivRef.current[i] = el)}
              className="relative w-3 h-3 mx-2 bg-gray-200 rounded-full cursor-pointer"
            >
              <span
                ref={(el) => (videoSpanRef.current[i] = el)}
                className="absolute w-full h-full rounded-full"
              />
            </span>
          ))}
        </div>

        <button className="control-btn">
          <img
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "replay" : !isPlaying ? "play" : "pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
