import Marquee from "./Components/TextMarquee";
import About from "./Pages/About";
import Articles from "./Pages/Articles";
import Contact from "./Pages/Contact";
import Home from "./Pages/Home";

export default function App() {
  return (
    <div className="">
      <Home />
      <Marquee />
      <Articles />
    </div>
  );
}
