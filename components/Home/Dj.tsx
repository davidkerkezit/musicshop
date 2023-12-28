import CUSTOMER from "../../assets/davidguetta.png";
import AboutCategory from "./UI/AboutCategory";
import ArtistRecommendation from "./UI/ArtistRecommendation";
const aboutCategory = {
  background: "bg-dj",
  quote:
    "Mixers and decks, the tools of a DJ's trade, turning beats into a  symphony of the night.",
  label: "DJ equipment",
  description: `Welcome to Music Shop, where the heartbeat of your music journey
  begins with top-tier DJ equipment. Elevate your sets and bring your
  beats to life with our cutting-edge gear. From industry-standard
  mixers to high-performance controllers, we have everything you need to
  command the dancefloor. Immerse yourself in the possibilities of
  seamless mixing, precise beatmatching, and dynamic sound manipulation.
  Our collection includes the latest models from renowned brands,
  ensuring that whether you're a seasoned pro or just starting, your
  creativity knows no bounds. Unleash the power of innovation with our
  range of state-of-the-art turntables, controllers, and headphones.
  Craft your sonic signature, explore new dimensions, and let the music
  flow through equipment that resonates with your passion. At Music
  Shop, we don't just sell DJ equipment; we empower your musical
  journey. Step into the rhythm, and let your creativity soar with gear
  that's as dynamic as your beats. Visit us today and redefine your DJ
  experience.`,
};
const artistRecommendation = {
  artist: "David Guetta",
  profession: "A famous producer and DJ from the France.",
  statement: `"Navigating the decks is like painting with sound. The mixer, my
  brush; the beats, my palette. With each fader and knob, I sculpt
  sonic landscapes that transport the crowd to a different dimension.
  DJ equipment isn't just gear; it's the conduit for translating
  imagination into an audible masterpiece. So, let the beats guide,
  the bass thump, and the crowd groove — because in the realm of DJ
  equipment, every set is a canvas, and every track is a stroke of
  musical artistry."`,
  width: 400,
  height: 400,
  imageSrc: CUSTOMER,
  imageAlt: "artist",
  imageStyle:
    "object-contain absolute mx-auto my-auto top-0 bottom-0 left-0 right-0 w-[100%] lg:w-[90%]",
};
const Dj = () => {
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

export default Dj;
