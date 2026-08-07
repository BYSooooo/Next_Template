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
            //...
        </div>
    );
    return (
        <div className="w-full">
            <div className="flex mx-auto max-w-7xl px-6 py-4 justify-center">
                <div className="bg-gray-100 rounded-xl w-full h-32">
                    This is Banner Position
                </div>
            </div>
        </div>
    )
}