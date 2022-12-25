import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Resumes from "../../../../public/Home.png";

export const Template = () => {
  const sliderStyle: any = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Slider {...sliderStyle}>
      <div>
        <Image
          src={Resumes}
          alt="HomeImage"
          width={320}
          height={100}
          className="shadow-lg my-3"
        />
      </div>

      <div>
        <Image
          src={Resumes}
          alt="HomeImage"
          width={320}
          height={100}
          className="shadow-lg my-3"
        />
      </div>

      <div>
        <Image
          src={Resumes}
          alt="HomeImage"
          width={320}
          height={100}
          className="shadow-lg my-3"
        />
      </div>
      <div>
        <Image
          src={Resumes}
          alt="HomeImage"
          width={320}
          height={100}
          className="shadow-lg my-3"
        />
      </div>
      <div>
        <Image
          src={Resumes}
          alt="HomeImage"
          width={320}
          height={100}
          className="shadow-lg my-3"
        />
      </div>
    </Slider>
  );
};
