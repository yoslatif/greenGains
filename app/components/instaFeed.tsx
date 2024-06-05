import { EmblaOptionsType } from "embla-carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import InstaFeedFetch from "../instagramFeed";
import { NextButton, PrevButton, usePrevNextButtons } from "./emblaButtons";

type InstagramPost = {
  id: string;
  caption: string;
  media_url: string;
  media_type: string;
  timestamp: string;
  permalink: string;
};

type InstagramPaging = {
  cursors: {
    before: string;
    after: string;
  };
};

type InstagramFeed = {
  data: InstagramPost[];
  paging?: InstagramPaging;
};

type PropType = {
  options?: EmblaOptionsType;
  slides?: InstagramFeed;
};

export default function InstaFeed(props: PropType) {
  const { options, slides } = { ...props };
  const IFF = InstaFeedFetch();

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    AutoScroll({ playOnInit: true }),
  ]);
  const [isPlaying, setIsPlaying] = useState(false);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const onButtonAutoplayClick = useCallback(
    (callback: () => void) => {
      const autoScroll: any = emblaApi?.plugins()?.autoScroll;
      if (!autoScroll) return;

      const resetOrStop =
        autoScroll.options.stopOnInteraction === false
          ? autoScroll.reset
          : autoScroll.stop;

      resetOrStop();
      callback();
    },
    [emblaApi]
  );

  const toggleAutoplay = useCallback(() => {
    const autoScroll: any = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
  }, [emblaApi]);

  useEffect(() => {
    const autoScroll: any = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    setIsPlaying(autoScroll.isPlaying());
    if (emblaApi) {
      emblaApi
        .on(autoScroll.play, () => setIsPlaying(true))
        .on(autoScroll.stop, () => setIsPlaying(false))
        .on("reInit", () => setIsPlaying(autoScroll.isPlaying()));
    }
  }, [emblaApi]);

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {IFF &&
            IFF.data.map((post: InstagramPost, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__number">
                  <span>
                    <Link
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative w-full h-full group hover:scale-105"
                      onMouseEnter={() => {
                        const autoScroll: any = emblaApi?.plugins()?.autoScroll;
                        if (!autoScroll) return;
                        autoScroll.stop();
                      }}
                      onMouseLeave={() => {
                        const autoScroll: any = emblaApi?.plugins()?.autoScroll;
                        if (!autoScroll) return;
                        autoScroll.play();
                      }}
                    >
                      {post.media_type === "VIDEO" ? (
                        <video
                          src={post.media_url}
                          controls={true}
                          className="w-full h-full object-cover rounded-3xl shadow-2xl"
                        />
                      ) : (
                        <Image
                          src={post.media_url}
                          alt={post.caption ?? ""}
                          className="w-full h-full object-cover rounded-3xl shadow-2xl"
                          width={300}
                          height={300}
                        />
                      )}
                    </Link>
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton
            onClick={() => onButtonAutoplayClick(onPrevButtonClick)}
            disabled={prevBtnDisabled}
          />
          <NextButton
            onClick={() => onButtonAutoplayClick(onNextButtonClick)}
            disabled={nextBtnDisabled}
          />
        </div>

        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? "Stop" : "Start"}
        </button>
      </div>
    </div>
  );
}