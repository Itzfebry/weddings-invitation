import febryImage from "./images/Febry.png";
import maldivesImage from "./images/Maldives.jpg";
import lilyImage from "./images/lili-pink.png";
import sashaImage from "./images/Sasha.jpeg";
import textureImage from "./images/bg.jpg";

export const FloatingBackground = () => (
  <div className="background-art" aria-hidden="true">
    <img className="background-texture" src={textureImage} alt="" />
    <img className="background-photo background-photo--groom" src={febryImage} alt="" />
    <img className="background-photo background-photo--venue" src={maldivesImage} alt="" />
    <img className="background-photo background-photo--bride" src={sashaImage} alt="" />
    <img className="background-lily background-lily--left" src={lilyImage} alt="" />
    <img className="background-lily background-lily--right" src={lilyImage} alt="" />
  </div>
);
