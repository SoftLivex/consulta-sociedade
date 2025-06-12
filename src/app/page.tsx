import CarouselDemo from "./components/carrosel";
import Header from "./components/header";

export default function ButtonDemo() {
  return (
    <div className="flex flex-col bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <CarouselDemo />
      </div>
    </div>
  );
}
