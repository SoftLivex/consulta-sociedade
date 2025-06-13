'use client';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function CarouselDemo() {
    return (
        <Swiper
            pagination={{
                enabled: true,
                clickable: true,
                dynamicBullets: true,
                renderBullet: function (index, className) {
                    console.log(className);
                    return (
                        '<span class="' +
                        className +
                        '">' +
                        (index + 1) +
                        '</span>'
                    );
                },
            }}
            autoplay={{
                delay: 3500,
                disableOnInteraction: false,
            }}
            loop={true}
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            className="relative rounded-lg [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background max-h-[80dvh]"
        >
            {[
                '/banner/banner-1.png',
                '/banner/banner-1.png',
                '/banner/banner-1.png',
                '/banner/banner-1.png',
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
