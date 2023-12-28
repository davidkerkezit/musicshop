import CUSTOMER from "../../assets/tiesto.png";
import AboutCategory from "./UI/AboutCategory";
import ArtistRecommendation from "./UI/ArtistRecommendation";
const aboutCategory = {
  background: "bg-vinyl",
  quote:
    "Old school never sounded so good – spin that vinyl and feel the history.",
  header: "Vinyl",
  description: `Welcome to our Music Store, where the timeless allure of vinyl meets
  contemporary passion. Explore our curated collection of vinyl records,
  each one a sonic journey waiting to be unwrapped. From the nostalgic
  crackle to the warm embrace of analog, our vinyls capture the essence
  of music in its purest form. Indulge your senses in the richness of
  genres spanning from classic rock to modern beats. Whether you're a
  seasoned collector or a newcomer to the vinyl renaissance, our
  carefully selected records promise to elevate your music experience.
  Immerse yourself in the artistry of album covers, the delicate touch
  of the needle on the groove, and the authenticity that only vinyl can
  deliver. Our Music Store is a haven for audiophiles, a place where the
  magic of analog sound comes to life. Discover the joy of vinyl – a
  tangible, timeless connection to the heart and soul of music. Visit us
  at Music Shop and let the music play on.`,
};
const artistRecommendation = {
  artist: "Tiesto",
  profession: "A famous producer and DJ from the Netherlands.",
  statement: `  "I've traveled the globe, and one thing remains constant – the magic
  of vinyl. There's an undeniable authenticity in the crackle and
  warmth that only vinyl records provide. Each spin is like
  rediscovering the essence of music, a connection that transcends
  time and trends. Vinyl is not just a format; it's a journey, and
  every needle drop is a reminder of why I fell in love with music in
  the first place. Long live the vinyl revolution!"`,
  width: 300,
  height: 300,
  imageSrc: CUSTOMER,
  imageAlt: "artist",
  imageStyle:
    "object-contain absolute mx-auto my-auto top-16 bottom-0 left-4 right-0 w-[75%] lg:w-[64%] lg:top-20 ",
};
const Vinyl = () => {
  return (
    <div>
      <AboutCategory
        background={aboutCategory.background}
        quote={aboutCategory.quote}
        label={aboutCategory.header}
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

export default Vinyl;
