import STORY from "@/assets/story.jpg";
import TEAM from "@/assets/team.jpg";
import VISION from "@/assets/vision.jpg";
import COMUNITY from "@/assets/comunity.jpg";
import USER1 from "@/assets/user1.jpg";
import USER2 from "@/assets/user2.jpg";
import USER3 from "@/assets/user3.jpg";
import USER4 from "@/assets/user4.jpg";
import USER5 from "@/assets/user5.jpg";
import USER6 from "@/assets/user6.jpg";
import USER7 from "@/assets/user7.jpg";
import USER8 from "@/assets/user8.jpg";
import DAVIDGUETTA from "@/assets/davidguetta.png";
import TIESTO from "@/assets/tiesto.png";
import BRUNOMARS from "@/assets/brunomars.png";
import VINYL from "@/assets/category-vinyl.png";
import DJ from "@/assets/category-dj.png";
import SOFTWERE from "@/assets/category-softwere.png";
import {
  AboutCategoryType,
  AboutUsContentType,
  CategoryType,
  TestimonialType,
  CollectionsType,
  SortType,
} from "./types";
import { twMerge } from "tailwind-merge";
import { ClassValue, clsx } from "clsx";
import { z } from "zod";
// MENU
const MENU = [
  { label: "Home", link: "/" },
  { label: "About Us", link: "/about" },
  { label: "Shop", link: "/shop" },
  { label: "Contact", link: "/contact" },
];
export default MENU;
// HOME PAGE
export const allCategories: CategoryType[] = [
  {
    name: "Vinyls",
    quote: "Spin it old school, feel the vinyl cool.",
    background: "bg-vinyl",
    imageSrc: VINYL,
    imageAlt: "vinyl-category",
    width: 230,
    height: 230,
    hover: "lg:group-hover:rotate-[360deg] duration-500 rotate-90",
    query: "vinyls",
  },
  {
    name: "DJ Equipments",
    quote: "Faders up, vibes high – where DJ magic comes to life.",
    background: "bg-dj",
    imageSrc: DJ,
    imageAlt: "dj-category",
    width: 150,
    height: 150,
    hover: "lg:group-hover:scale-110 duration-300",
    query: "djequipments",
  },
  {
    name: "Softwares",
    quote: "Where melodies meet algorithms, music software sparks creativity.",
    background: "bg-softwere",
    imageSrc: SOFTWERE,
    imageAlt: "softwere-category",
    width: 130,
    height: 130,
    hover: "lg:group-hover:scale-110 duration-300",
    query: "softweres",
  },
];
export const aboutCategories: AboutCategoryType[] = [
  {
    background: "bg-vinyl",
    quote:
      "Old school never sounded so good – spin that vinyl and feel the history.",
    label: "Vinyl",
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
    imageSrc: TIESTO,
    imageAlt: "artist",
    imageStyle:
      "object-contain absolute md:mx-auto md:my-auto -top-10 left-10   md:bottom-0 md:left-0 right-0  md:w-[64%] md:top-[10rem] ",
  },
  {
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
    imageSrc: DAVIDGUETTA,
    imageAlt: "artist",
    imageStyle:
      "object-contain absolute mx-auto my-auto top-0 bottom-0 left-0 right-0 w-[100%] lg:w-[90%]",
  },
  {
    background: "bg-softwere",
    quote: "Melody is a universal language.",
    label: "Software",
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
    imageSrc: BRUNOMARS,
    imageAlt: "artist",
    imageStyle:
      "object-contain absolute mx-auto my-auto top-0 md:top-[10rem] -bottom-4 md:bottom-0 left-0 right-0 w-[100%] lg:w-[80%]",
  },
];
export const testimonials: TestimonialType[] = [
  {
    name: "Erick Johnson",
    occupation: "Customer",
    text: "Discovering this vinyl store was a game-changer for me! The diverse collection and rare finds have elevated my music experience. The attention to detail in curating the selection is unmatched. Each record tells a story, and I love the personalized touch in every recommendation. The staff's passion for music shines through, making every visit an adventure. My vinyl collection has flourished, thanks to this gem of a store!",
    stars: 5,
    imageSrc: USER1,
  },

  {
    name: "Ethan Turner",
    occupation: "Customer",
    text: "From the moment I delved into this audio software store, my music production journey reached new heights. The vast selection of cutting-edge software blew me away, and the expert guidance from the team ensured I found the perfect tools for my craft. The seamless purchase process and regular updates have made this my go-to destination for all things audio. My compositions have evolved, and my creativity knows no bounds, all thanks to the incredible software I discovered here.",
    stars: 5,
    imageSrc: USER2,
  },
  {
    name: "Marcus Bennett",
    occupation: "DJ",
    text: "Stepping into this DJ equipment haven was a game-changer for my mixes. The store's array of cutting-edge gear is a DJ's dream come true. The staff's expertise and passion for music translate into invaluable advice, ensuring I make the right choices for my setup. Each piece of equipment I've invested in here has elevated my performances and studio sessions. It's more than a store; it's a hub for DJs, fostering a community where beats and innovation collide. My sound has evolved, and my sets have never been more electrifying, all thanks to this DJ paradise.",
    stars: 5,
    imageSrc: USER3,
  },
  {
    name: "Oliver Mitchell",
    occupation: "Customer",
    text: "Discovering this DJ equipment oasis has transformed my music journey. The store's comprehensive selection, coupled with the expert guidance of the staff, has made navigating the world of DJ gear a breeze. Every piece I've acquired here has been a game-changer for my performances. The commitment to quality and the latest technology is evident in every product. It's not just a store; it's a sanctuary for DJs, where the rhythm of beats meets the pulse of innovation. My mixes have soared to new heights, and I'm endlessly grateful for the treasure trove of gear I found here.",
    stars: 5,
    imageSrc: USER4,
  },
  {
    name: "Lucas Foster",
    occupation: "Music Producer",
    text: "The staff at this music haven isn't just knowledgeable; they're passionate curators of sonic experiences. Their genuine enthusiasm for music is contagious, turning every visit into a delightful exploration. Whether guiding me through vinyl gems or recommending the latest DJ gear, their expertise has been invaluable. It's not just a store; it's an ensemble of dedicated individuals whose love for music elevates the entire shopping experience. Their personalized recommendations and friendly demeanor create a sense of community, making each interaction a harmonious connection in the world of sound.",
    stars: 5,
    imageSrc: USER5,
  },
  {
    name: "Nathan Hayes",
    occupation: "Customer",
    text: "Finding this audio software paradise was a game-changer for my music projects. The store's curated collection of software has not only enhanced the quality of my productions but has also streamlined my creative process. The intuitive interface and powerful features of the software I purchased here have become indispensable in my studio. The customer support is top-notch, making every purchase a smooth and enjoyable experience. It's more than just a store; it's a key player in the symphony of my musical endeavors.",
    stars: 5,
    imageSrc: USER6,
  },
  {
    name: "Adrian Reynolds",
    occupation: "Partner",
    text: "Walking into this vinyl sanctuary was like entering a music lover's paradise. The curated selection of records, spanning genres and eras, captured my heart from the first note. The knowledgeable staff transformed my browsing into a personalized journey, recommending hidden gems that now hold a cherished place in my collection. It's not just a store; it's a haven where the crackle of vinyl and the warmth of analog sound create an immersive experience. Every visit feels like a musical adventure, and my love for vinyl has deepened thanks to this extraordinary haven.",
    stars: 5,
    imageSrc: USER7,
  },
  {
    name: "Mark Peterson",
    occupation: "Customer",
    text: "I stumbled upon this vinyl haven and instantly fell in love. The ambiance is cozy, and the staff's knowledge is impressive. Every vinyl I've purchased has exceeded my expectations. The store's commitment to quality and the joy of music is evident in every corner. It's more than a store; it's a haven for music enthusiasts. My vinyl journey wouldn't be the same without it!",
    stars: 5,
    imageSrc: USER8,
  },
];
// ABOUT PAGE
export const aboutUsContent: AboutUsContentType[] = [
  {
    header: "Our Story",
    text: "Embark on a captivating journey through the history of our music shop, tracing its humble beginnings to the vibrant tapestry it weaves today. From the initial chords that marked our inception to the harmonious notes that define our present, our story is a testament to the enduring passion and dedication that fuel our love for music. Explore the milestones that shape our identity and the unwavering commitment that has propelled us forward.",
    imgSrc: STORY,
  },
  {
    header: "Meet the Team",
    text: "Meet the faces behind the music – our talented and knowledgeable team members who breathe life into our musical haven. Each profile unveils a unique story, skill set, and passion for all things musical. From seasoned musicians to gear aficionados, our team shares a common love for the art form. Discover the individuals who make up our musical family, each contributing a distinct note to the harmonious ensemble that defines our vibrant community.",
    imgSrc: TEAM,
  },
  {
    header: "Our Mission and Values",
    text: "At the heart of our existence lies a vision that transcends the mere transaction of instruments. Uncover the core principles that guide us in serving you better – to inspire, educate, and elevate the musical journey for everyone who walks through our doors. Explore the values that form the foundation of our commitment to providing not just instruments, but expert advice and a welcoming atmosphere. Our mission goes beyond commerce; it's about fostering a community where the true spirit of music thrives.",
    imgSrc: VISION,
  },
  {
    header: "Community Engagement",
    text: "Music is a universal language that binds us together, and community engagement is a vital chord in our symphony. Discover how we actively connect with the local music community through events, workshops, and partnerships. Our efforts are aimed at creating a space where enthusiasts of all skill levels can not only find quality instruments but also connect, learn, and share their love for music. Join us in building a community where the language of music is spoken fluently, and the notes we play resonate with the shared heartbeat of our passion for the art form.",
    imgSrc: COMUNITY,
  },
];

// SHOP
export const sort: SortType[] = [
  {
    option: "Price (Low to High)",
    query: "lowprice",
  },
  {
    option: "Price (High to Low)",
    query: "highprice",
  },
  {
    option: "Newest",
    query: "newest",
  },
  {
    option: "Oldest",
    query: "oldest",
  },
];
export const collections: CollectionsType[] = [
  {
    title: "All Products",
    query: "allproducts",
  },
  {
    title: "Vinyls",
    query: "vinyls",
  },
  {
    title: "DJ Equipments",
    query: "djequipments",
  },
  {
    title: "Softwares",
    query: "softweres",
  },
];
export const categories = [
  { name: "DJ Equipment", path: "dj" },
  { name: "Vinyl", path: "vinyls" },
  { name: "Software", path: "softweres" },
];
export const djsSubCategories = [
  { name: "Pioneer", path: "pioneer" },
  { name: "Dennon", path: "denon" },
];
// DASHBOARD
export const dashboardInputs = [
  {
    label: "Name",
    placeholder: "Add product name",
    value: undefined,
    name: "name",
    registerValue: "name",
    type: "text",
  },
  {
    label: "Price",
    placeholder: "Add product price",
    value: undefined,
    name: "price",
    registerValue: "price",
    type: "number",
  },
  {
    label: "In Stock",
    placeholder: "Add product quantity in stock",
    value: undefined,
    name: "inStock",
    registerValue: "inStock",
    type: "number",
  },
];
export const dashboardTextAreas = [
  {
    label: "Short product description",
    placeholder: "One sentence about product",
    value: undefined,
    name: "about-product",
    registerValue: "aboutProduct",
    type: "text",
  },
  {
    label: "Longer product description",
    placeholder: "Longer description about product",
    value: undefined,
    name: "product-description",
    registerValue: "productDescription",
    type: "text",
  },
  {
    label: "About seller",
    placeholder: "Longer description about seller",
    value: undefined,
    name: "about-seller",
    registerValue: "aboutSeller",
    type: "text",
  },
];
// ZOD
export const productSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(1),
  inStock: z.coerce.number().min(1),
  aboutProduct: z.string().min(10),
  productDescription: z.string().min(60),
  aboutSeller: z.string().min(60),
});
export const editableProductSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  aboutProduct: z.string().min(10),
  productDescription: z.string().min(60),
  aboutSeller: z.string().min(60),
});
export const orderSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1),
  streetName: z.string().min(1),
  houseNumber: z.string().min(1),
  phoneNumber: z.string().min(1),
  moreInformation: z.string(),
});
export const contact = z.object({
  name: z.string().min(1),
  email: z.string().email(),

  message: z.string().min(20),
});
export const subscriptions = z.object({
  email: z.string().email(),
});
export const loginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const subscriptionSchema = z.object({
  subject: z.string().min(1),

  message: z.string().min(1),
});

let BASE_URL: string;

if (process.env.NODE_ENV === "production") {
  BASE_URL = "https://musicshop-two.vercel.app";
} else {
  BASE_URL = "http://localhost:3000";
}
export { BASE_URL };
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};
