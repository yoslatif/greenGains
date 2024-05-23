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

{
  /* <div
  key={post.id}
  className="relative group w-full h-full transition-all duration-300 ease-in hover:scale-105"
>
  <Link
    href={post.permalink}
    target="_blank"
    rel="noopener noreferrer"
    className="relative"
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

    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center p-4 w-full h-1/2">
      <p className="text-white text-center text-3xl truncate">{post.caption}</p>
    </div>
  </Link>
</div>; */
}
{
  /* <div className="w-full h-full border-2 border-orange-600">
  {error && <p className="text-red-500">{error}</p>}
  {instagramFeed && (
    <div className="w-full flex overflow-visible h-full flex-col">
      <ul className="flex flex-row items-center justify-center md:justify-start animate-infinite-scroll h-full absolute border-2 border-white hover:[animation-play-state:paused] [&_img]:max-w-full">
        {instagramFeed.data.map((post: InstagramPost, index) => (
          <li
            key={index}
            className="w-full h-full m-2 flex flex-col min-w-screen"
          >
            <Link
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full h-full"
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
          </li>
        ))}
      </ul>
      {/* <ul
            className="flex flex-row items-center justify-center md:justify-start animate-infinite-scroll h-full absolute border-2 border-white hover:[animation-play-state:paused] [&_img]:max-w-full"
            aria-hidden="true"
          >
            {instagramFeed.data.map((post: InstagramPost) => (
              <li key={post.id}>
                <Link
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative"
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
              </li>
            ))}
          </ul> */
}
//     </div>
//   )}
// </div>; */}
