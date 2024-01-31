// ABOUT US
import STORY from "@/assets/story.jpg";
import TEAM from "@/assets/team.jpg";
import VISION from "@/assets/vision.jpg";
import COMUNITY from "@/assets/comunity.jpg";
import { AboutUsContentType } from "./types";
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
