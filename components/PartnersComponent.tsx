import BrandCard from "./BrandCard";

export default function PartnersComponent() {
  return (
    <div className="flex flex-col items-center mt-24">
      <div className="w-auto pr-2 overflow-x-hidden md:overflow-y-scroll md:h-140 z-content py-2">
        <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 gap-3 md:gap-8 pb-4">
          <BrandCard url="/airbar.png" />
          <BrandCard url="/fume.png" />
          <BrandCard url="/fume.png" />
          <BrandCard url="/juul.png" />
          <BrandCard url="/juul.png" />
          <BrandCard url="/hqd.png" />
          <BrandCard url="/hqd.png" />
          <BrandCard url="/hqd.png" />
        </div>
      </div>
    </div>
  );
}
