import React from 'react';
import ReactSearchBox from "react-search-box";
import Select from 'react-select'
import Slider from "react-slick";

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';

function Home() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    return(
        <div>
            <th>MyBooks</th>
            <ReactSearchBox
                placeholder="Placeholder"
                value="Doe"
                
                callback={(record) => console.log(record)}
            />
            <div>
                <th>Contrato</th>
                <Select/>
            </div>
            <div>
                <Swiper 
                    spaceBetween={50}
                    slidesPerView={1}
                    onSlideChange={() => console.log('slide change')}
                    onSwiper={(swiper) => console.log(swiper)}
                    style={{height:'400px',width:'100%'}}
                >
                    <div>
                        <SwiperSlide>
                            <img src='https://via.placeholder.com/150' alt='imagem' title='imagem'/>
                            <th></th>
                            <p></p>
                        </SwiperSlide>

                    </div>
                    
                    
                    
                    
                </Swiper>
                

            </div>


        </div>
    


    );
}

export default Home;