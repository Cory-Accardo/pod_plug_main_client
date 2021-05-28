import styles from "../styles/Clouds.module.css";

interface CloudsProps {
  id: number;
}

export default function Clouds(props: CloudsProps) {
  return (
    <div
      className={`absolute z-clouds ${props.id === 1 ? styles.cloud1 : styles.cloud2}`}
    >
      <img
        src="/clouds_blue.png"
        alt="Clouds"
        className="relative opacity-80"
        style={{ top: "20rem" }}
      />
      <img
        src="/clouds_blue.png"
        alt="Clouds"
        className="relative opacity-80"
        style={{ top: "6rem", left: "65vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-60"
        style={{ top: "28rem" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-60 transform scale-75"
        style={{ top: "22rem", left: "65vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-60 transform scale-75"
        style={{ top: "20rem", left: "25vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-60 transform scale-75"
        style={{ top: "20rem", left: "-10vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-80"
        style={{ top: "16rem", left: "25vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-80"
        style={{ top: "16rem", left: "65vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-80 transform scale-75"
        style={{ top: "16rem", left: "-20vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-60 transform scale-75"
        style={{ top: "10rem", left: "50vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-60 transform scale-75"
        style={{ top: "10rem", left: "10vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-80"
        style={{ top: "14rem", left: "70vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="relative opacity-80 transform scale-75"
        style={{ top: "10rem", left: "15vw" }}
      />
    </div>
  );
}
