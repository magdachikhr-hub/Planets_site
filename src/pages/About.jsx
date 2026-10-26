import { useEffect } from "react";
import useCanonical from "../hooks/useCanonical";

function About() {
  useCanonical("https://planets-site-five.vercel.app/about");
  useEffect(() => {
    document.title = "ჩვენ შესახებ | My Website";
  }, []);
  return <h1>ჩვენ შესახებ</h1>;
}

export default About;
