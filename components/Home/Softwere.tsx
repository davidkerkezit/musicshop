"use client";

import CUSTOMER from "../../assets/brunomars.png";
import AboutCategory from "./UI/AboutCategory";
import ArtistRecommendation from "./UI/ArtistRecommendation";
const aboutCategory = {
  background: "bg-softwere",
  quote: "Melody is a universal language.",
  label: "Softwere",
  description: `   Dive into the world of music production with our exceptional
  collection of cutting-edge music software. Whether you're a seasoned
  producer or just starting your musical journey, our curated selection
  caters to all levels of expertise. Explore the boundless possibilities
  of creativity with our range of professional-grade software. From
  industry-standard digital audio workstations (DAWs) to innovative
  virtual instruments and plugins, our collection is designed to inspire
  and empower. Craft your sonic signature with intuitive interfaces,
  powerful editing tools, and a palette of virtual sounds that span
  genres. Our music software opens the door to endless production
  potential, allowing you to compose, arrange, and mix your tracks with
  unparalleled precision. At Music Shop, we understand that the right
  software is the heartbeat of your musical expression. Step into the
  realm of limitless creativity, explore the latest innovations, and let
  your compositions come to life. Visit us today and embark on a journey
  where every click, drag, and tweak transforms your musical vision into
  reality.`,
};
const artistRecommendation = {
  artist: "Bruno Mars",
  profession: "A famous American singer.",
  statement: ` "Empower your sonic journey with our cutting-edge audio software at
  Music Shop. From immersive soundscapes to precision editing, our
  software transforms your creative vision into auditory masterpieces.
  Explore a world where innovation meets expression, and let the
  digital waves of possibility unfold. Elevate your audio experience
  today!"`,
  width: 400,
  height: 400,
  imageSrc: CUSTOMER,
  imageAlt: "artist",
  imageStyle:
    "object-contain absolute mx-auto my-auto top-14 bottom-0 left-0 right-0 w-[100%] lg:w-[80%]",
};
const Softwere = () => {
  return (
    <div>
      <AboutCategory
        background={aboutCategory.background}
        quote={aboutCategory.quote}
        label={aboutCategory.label}
        description={aboutCategory.description}
      />
      <ArtistRecommendation
        artist={artistRecommendation.artist}
        profession={artistRecommendation.profession}
        statement={artistRecommendation.statement}
        width={artistRecommendation.width}
        height={artistRecommendation.height}
        imageSrc={artistRecommendation.imageSrc}
        imageAlt={artistRecommendation.imageAlt}
        imageStyle={artistRecommendation.imageStyle}
      />
    </div>
  );
};

export default Softwere;
