import { useState } from "react";

const ImageZoomSlider = ({ images }) => {
  const [active, setActive] = useState(images[0]);
  const [zoomStyle, setZoomStyle] = useState({});

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();

    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      backgroundImage: `url(${active})`,
      backgroundPosition: `${x}% ${y}%`,
      backgroundSize: "200%",
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({});
  };

  return (
    <div className="flex gap-4 w-full">
      {/* LEFT THUMBNAILS */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-hidden">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            onClick={() => setActive(img)}
            className={`w-16 h-16 object-cover cursor-pointer border rounded ${
              active === img ? "border-black" : ""
            }`}
          />
        ))}
      </div>

      {/* MAIN IMAGE + ZOOM */}
      <div
        className="w-full h-[350px] md:h-[450px] bg-no-repeat bg-cover border rounded relative overflow-hidden"
        style={{
          backgroundImage: `url(${active})`,
          ...zoomStyle,
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}>
        <img src={active} className="w-full h-full object-cover opacity-0" />
      </div>
    </div>
  );
};

export default ImageZoomSlider;
