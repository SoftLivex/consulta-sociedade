'use client';

import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import {
    Autoplay,
    EffectCube,
    EffectFade,
    Navigation,
    Pagination,
} from 'swiper/modules';
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
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            }}
            // effect="cube"
            loop={true}
            modules={[Autoplay, Pagination, Navigation, EffectFade, EffectCube]}
            className="relative rounded-4xl [&_div.swiper-button-next]:text-background [&_div.swiper-button-prev]:text-background max-h-[80dvh] h-fit"
        >
            {[
                require('./banner/banner-1.png'),
                require('./banner/banner-2.png'),
            ].map((img, index) => (
                <SwiperSlide key={index} className="select-none relative">
                    <Image
                        src={img}
                        alt={`banner-${index}`}
                        className="h-full w-full object-cover"
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}
