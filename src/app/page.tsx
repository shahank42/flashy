import MaxWidthWrapper from "~/components/MaxWidthWrapper";
import FlashCardViewer from "./FlashCardViewer";

export default function HomePage() {
  return (
    <main className="">
      <MaxWidthWrapper>
        <div className="h-[100dvh]">
          {/* <div className="w-full bg-red-200">
            <span className="">Flashy</span>
          </div> */}
          <div className="h-full w-full flex items-center justify-center">
            <FlashCardViewer />
          </div >
        </div>
      </MaxWidthWrapper>
    </main>
  );
}
