import CarouselDemo from "./components/carrosel";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background items-center justify-center">
      <div className="container m-auto px-4 py-8">
        <CarouselDemo />
      </div>
    </div>
  );
}
