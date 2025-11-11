"use client"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination, Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./carousel.css"
import { useEffect, useState } from "react"
import axios from "axios"

const TopBannersCarousel = () => {
    const [banners, setBanners] = useState([
        "/images/banners/banner1.avif",
        "/images/banners/banner2.avif",
        "/images/banners/banner3.avif",
    ]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get("");
                if (response?.data?.data) {
                    setBanners(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);
    return (
        <div className="w-full max-h-96 aspect-9/2 banner-carousel">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                }}
                loop={true}
                className="h-full"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full h-full">
                            <Image
                                fill
                                src={banner}
                                alt={`banner ${index + 1}`}
                                className="object-cover"
                                priority={index === 0}
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default TopBannersCarousel