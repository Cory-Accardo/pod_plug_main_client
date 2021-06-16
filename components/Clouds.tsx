import styles from "../styles/Clouds.module.css";

interface CloudsProps {
  id: number;
}

export default function Clouds(props: CloudsProps) {
  return (
    <div
      className={`relative ${props.id === 1 ? styles.cloud0 : styles.cloud0}`}
    >
      <img
        src="/clouds_blue.png"
        alt="Clouds"
        className="absolute opacity-60 z-clouds"
        style={{top: "2rem", left: "50vw"}}
      />
      <img
        src="/clouds_blue.png"
        alt="Clouds"
        className="absolute opacity-80 z-clouds"
        style={{top: "25rem"}}
      />
      <img
        src="/clouds_blue.png"
        alt="Clouds"
        className="absolute hidden opacity-80 md:block z-clouds"
        style={{top: "22rem", left: "65vw"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute opacity-30 md:hidden transform scale-50 z-clouds"
        style={{top: "0rem", left: "35vw"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-40 lg:block z-clouds"
        style={{top: "48rem"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute opacity-50 md:hidden transform scale-75 z-clouds"
        style={{top: "50rem", left: "-15vw"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{top: "62rem", left: "65vw"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{top: "73rem", left: "25vw"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute opacity-30 md:hidden transform scale-75 z-clouds"
        style={{top: "80rem", left: "25vw"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-30 transform scale-75 md:block z-clouds"
        style={{top: "90rem", left: "-10vw"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-80 lg:block z-clouds"
        style={{top: "100rem", left: "25vw"}}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-80 md:block z-clouds"
        style={{top: "116rem", left: "65vw"}}
      />
      {/*
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-80 transform scale-75 md:block z-clouds"
        style={{ top: "16rem", left: "-20vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{ top: "10rem", left: "50vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-60 transform scale-75 md:block z-clouds"
        style={{ top: "10rem", left: "10vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-80 md:block z-clouds"
        style={{ top: "14rem", left: "70vw" }}
      />
      <img
        src="/clouds.png"
        alt="Clouds"
        className="absolute hidden opacity-80 transform scale-75 md:block z-clouds"
        style={{ top: "10rem", left: "15vw" }}
      />
      */}
    </div>
  );
}
