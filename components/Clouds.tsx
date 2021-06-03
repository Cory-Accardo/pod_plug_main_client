import styles from "../styles/Clouds.module.css";

interface CloudsProps {
  id: number;
}

export default function Clouds(props: CloudsProps) {
  return (
    <div
      className={`absolute ${props.id === 1 ? styles.cloud1 : styles.cloud2}`}
    >
      <img
        src="/clouds_blue.png"
        alt="Clouds"
        className="relative opacity-80 z-clouds"
        style={{ top: "20rem" }}
      />
      <img
        src="/clouds_blue.png"
        alt="Clouds"
        className="relative hidden opacity-80 md:block z-clouds"
        style={{ top: "6rem", left: "65vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-50 md:hidden transform scale-75 z-clouds"
        style={{ top: "20rem", left: "-15vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-30 md:hidden transform scale-50 z-clouds"
        style={{ top: "0rem", left: "35vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-50 lg:block z-clouds"
        style={{ top: "28rem" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{ top: "22rem", left: "65vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{ top: "20rem", left: "25vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{ top: "20rem", left: "-10vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-80 lg:block z-clouds"
        style={{ top: "16rem", left: "25vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-80 md:block z-clouds"
        style={{ top: "16rem", left: "65vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-80 transform scale-75 md:block z-clouds"
        style={{ top: "16rem", left: "-20vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{ top: "10rem", left: "50vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{ top: "10rem", left: "10vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-80 md:block z-clouds"
        style={{ top: "14rem", left: "70vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative hidden opacity-80 transform scale-75 md:block z-clouds"
        style={{ top: "10rem", left: "15vw" }}
      />
    </div>
  );
}
