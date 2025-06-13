"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import * as React from "react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function CarouselDemo() {
  return (
    <Swiper
      pagination={{
        enabled: true,
        clickable: true,
        dynamicBullets: true,
      }}
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay, Pagination]}
      className="relative rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background max-h-[80dvh]"
    >
      {[
        "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",
        "https://plus.unsplash.com/premium_photo-1673603988651-99f79e4ae7d3?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1465189684280-6a8fa9b19a7a?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG5hdHVyZXxlbnwwfDB8MHx8fDA%3D",
        "https://images.unsplash.com/photo-1458668383970-8ddd3927deed?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8bmF0dXJlfGVufDB8MHwwfHx8MA%3D%3D",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fG5hdHVyZXxlbnwwfDB8MHx8fDA%3D",
      ].map((img, index) => (
        <SwiperSlide key={index} className="select-none">
          <img
            src={img}
            alt={`image-${index}`}
            className="h-full w-full object-cover aspect-video"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
