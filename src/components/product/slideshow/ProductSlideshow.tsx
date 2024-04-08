"use client";

import Image from "next/image";
import { useState, Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperObject } from "swiper";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductSlideShow = ({ images, title, className }: Props) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();
  return (
    <div className={className}>
      <Swiper
        style={
          {
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          } as React.CSSProperties
        }
        spaceBetween={50}
        slidesPerView={1}
        navigation={true}
        autoplay={{ delay: 2500 }}
        // onSlideChange={() => console.log("slide change")}
        // onSwiper={(swiper) => console.log(swiper)}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs, Autoplay]}
        className="mySwiper2"
      >
        {Children.toArray(
          images.map((image) => {
            return (
              <>
                <SwiperSlide>
                  <Image
                    src={`/products/${image}`}
                    alt={`${title}`}
                    width={1024}
                    height={800}
                    className="rounded-lg object-contain"
                  />
                </SwiperSlide>
              </>
            );
          })
        )}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {Children.toArray(
          images.map((image) => {
            return (
              <>
                <SwiperSlide>
                  <Image
                    src={`/products/${image}`}
                    alt={`${title}`}
                    width={300}
                    height={300}
                    className="rounded-lg object-contain"
                  />
                </SwiperSlide>
              </>
            );
          })
        )}
      </Swiper>
    </div>
  );
};
