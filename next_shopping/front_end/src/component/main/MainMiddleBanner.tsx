import Link from "next/link";
import Image from "next/image";
import { MainBannerItem } from "@/lib/api/main/banner";

interface MainMiddleBannerProps {
    banner? : MainBannerItem
}

export default function MainMiddleBanner({banner} : MainMiddleBannerProps) {
    if(!banner) return null

    const bannerContent = (
        <div className="relative w-full h-32 md:h-36 rounded-xl overflow-hidden bg-gray-100 group transition-all duration-300 hover:shadow-md">
            { banner.image_url ? (
                <Image
                    src={banner.image_url}
                    alt={banner.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                />
            ) : (
                <div className="w-full h-full flex flex-col justify-center px-8 bg-linear-to-r from-blue-600 to-indigo-600 text-white">
                    <h3 className="text-xl font-bold">{banner.title}</h3>
                    {banner.description && <p className="text-sm opacity-90 mt-1">{banner.description}</p>}
                </div>
            )}
        </div>
    );
    return (
        <div className="w-full">
            <div className="flex mx-auto max-w-7xl px-6 py-4 justify-center">
                {banner.link_url ? (
                    <Link href={banner.link_url} className="w-full">
                        {bannerContent}
                    </Link>
                ) : (
                    bannerContent
                )}
            </div>
        </div>
    )
}