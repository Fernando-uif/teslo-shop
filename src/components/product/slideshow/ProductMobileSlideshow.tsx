"use client";

import Image from "next/image";
import { Children } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  FreeMode,
  Navigation,
  Pagination,
  Thumbs,
} from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./slideshow.css";

interface Props {
  images: string[];
  title: string;
  className?: string;
}

export const ProductMobileSlideshow = ({ images, title, className }: Props) => {
  return (
    <div className={className}>
      <Swiper
        style={{
          width: "100vw",
          height: "500px",
        }}
        pagination
        autoplay={{ delay: 2500 }}
        modules={[FreeMode, Thumbs, Autoplay, Pagination]}
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
                    width={600}
                    height={500}
                    className="object-contain"
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
