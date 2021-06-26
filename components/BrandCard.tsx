interface BrandCardProps {
  url: string;
}

export default function BrandCard(props: BrandCardProps) {
  return (
    <div>
      <div
        className="flex items-center justify-center w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-white shadow-md"
        style={{ borderRadius: "1.5rem" }}
      >
        <div
          className="m-4 sm:m-10 lg:m-16 w-full h-full"
          style={{
            backgroundImage: `url("${props.url}")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain",
            backgroundPosition: "center center",
          }}
        />
      </div>
    </div>
  );
}
