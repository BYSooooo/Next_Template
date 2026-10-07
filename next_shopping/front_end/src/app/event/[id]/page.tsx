
import { Button, Spinner } from '@heroui/react';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';


interface Product {
    id : string;
    name : string;
    subtitle? : string;
    price : number;
    discount_rate : number;
    discounted_price : number;
    status : 'ON_SALE' | 'SOLD_OUT' | 'HIDDEN';
    images : { image_url : string }[];
}

interface EventDetail {
    id : string;
    title : string;
    description : string;
    banner_url : string;
    start_date : string;
    end_date : string;
    is_active : boolean;
    products : Product[]
}

export default function Page(){

    const params = useParams();
    const router = useRouter();
    const eventId = params?.id as string;

    const [event, setEvent] = React.useState<EventDetail | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number>(1);
    const rowsPerPage = 8;

    React.useEffect(()=> {
        if (!eventId) return;

        const fetchEventDetail = async() => {
            try {
                setLoading(true);
                // NestJS API Call
                const response = await fetch(`/api/event/${eventId}`)
                if (!response.ok) throw new Error('Error : Cannot find event information');

                const data = await response.json();
                setEvent(data)
            } catch(error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        fetchEventDetail();
    },[eventId])

    if(loading) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[60vh] gap-4'>
                <Spinner size="lg" color='warning' />
                <p className='text-gray-500 font-medium'>
                    Loading...
                </p>
            </div>
        )
    }

    if(!event) {
        return (
            <div className='flex flex-col items-center justify-center min-h-[50vh] gap-4'>
                <p className='text-xl font-bold text-gray-700'>
                    These are events that no longer exist or have ended.
                </p>
                <Button 
                    variant='ghost'
                    onClick={()=>router.back()}>
                    back to previous page
                </Button>
            </div>
        );
    }

    const totalPages = Math.ceil((event.products?.length || 0) / rowsPerPage);
    const paginatedProducts = event.products?.slice (
        (page - 1) * rowsPerPage,
        page * rowsPerPage
    ) || []

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <Button
          isIconOnly
          variant="light"
          onClick={() => router.back()}
          aria-label="Back"
        >
          <FiArrowLeft className="w-6 h-6" />
        </Button>
        <Button
          isIconOnly
          variant="light"
          onClick={() => {
            navigator.clipboard.writeText(window.location.href);
            alert('페이지 링크가 복사되었습니다.');
          }}
          aria-label="Share"
        >
          <FiShare2 className="w-5 h-5 text-gray-600" />
        </Button>
      </div>

      {/* Banner & Event Header */}
      <div className="space-y-4">
        <div className="relative w-full h-[280px] md:h-[400px] rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
          {event.banner_url ? (
            <Image
              src={event.banner_url}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full bg-yellow-400 flex items-center justify-center font-bold text-2xl text-black">
              {event.title}
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Chip color="warning" variant="solid" className="font-bold text-black bg-yellow-400">
                SPECIAL EVENT
              </Chip>
              <div className="flex items-center gap-1 text-sm text-gray-500 font-medium">
                <FiClock className="w-4 h-4" />
                <span>
                  {event.start_date.slice(0, 10)} ~ {event.end_date.slice(0, 10)}
                </span>
              </div>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">
              {event.title}
            </h1>
            <p className="text-gray-600 whitespace-pre-line text-sm md:text-base">
              {event.description}
            </p>
          </div>
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Event Products Grid */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">
            Event Discount<span className="text-yellow-500">{event.products?.length || 0}</span>
          </h2>
        </div>

        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {paginatedProducts.map((product) => {
              const thumbnailUrl =
                product.images?.[0]?.image_url || '/placeholder-product.png';

              return (
                <Card
                  key={product.id}
                  isPressable
                  onClick={() => router.push(`/product/${product.id}`)}
                  className="hover:scale-[1.02] transition-transform duration-200 border border-gray-100 shadow-sm"
                >
                  <CardBody className="p-0 overflow-hidden">
                    {/* Thumbnail Image */}
                    <div className="relative aspect-square w-full bg-gray-50">
                      <Image
                        src={thumbnailUrl}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      {product.discount_rate > 0 && (
                        <div className="absolute top-2 left-2 bg-red-500 text-white font-extrabold text-xs px-2 py-1 rounded">
                          {product.discount_rate}% OFF
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4 space-y-1">
                      <p className="text-xs text-gray-400 line-clamp-1">
                        {product.subtitle || ''}
                      </p>
                      <h3 className="font-bold text-sm md:text-base text-gray-800 line-clamp-1">
                        {product.name}
                      </h3>

                      <div className="pt-2 flex items-baseline gap-2">
                        <span className="text-base md:text-lg font-black text-gray-900">
                          {product.discounted_price.toLocaleString()}원
                        </span>
                        {product.discount_rate > 0 && (
                          <span className="text-xs text-gray-400 line-through">
                            {product.price.toLocaleString()}원
                          </span>
                        )}
                      </div>
                    </div>
                  </CardBody>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <p className="text-gray-500">현재 이벤트에 등록된 상품이 없습니다.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center pt-6">
            <Pagination
              total={totalPages}
              page={page}
              onChange={(newPage) => setPage(newPage)}
              color="warning"
              variant="light"
            />
          </div>
        )}
      </div>
    </div>
    )
}