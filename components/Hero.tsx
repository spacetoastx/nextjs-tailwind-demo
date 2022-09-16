import Image from "next/image";

export const Hero = () => {
  return (
    <div className="relative mb-10 flex h-[30rem] flex-col justify-center overflow-hidden rounded-xl bg-white px-10 ring-2 ring-black">
      <div className="absolute inset-0 h-full">
        <Image
          className="h-full w-full object-cover"
          layout="fill"
          src="https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1488&q=80"
        />
        <div className="absolute inset-0 bg-white/20 backdrop-blur" />
      </div>
      <div className="z-10 flex flex-col items-center space-y-4 text-center">
        <p className="text-5xl font-semibold text-orange-300">
          Take control of your <br />{" "}
          <span className="text-white">GitHub issues</span>
        </p>
        <p className="max-w-4xl text-xl text-gray-100">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  );
};
