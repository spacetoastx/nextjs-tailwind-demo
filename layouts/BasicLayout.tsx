import { NavBar } from "../components/NavBar";

interface Props {
  children: React.ReactNode;
}

export const BasicLayout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <NavBar />
      <div className="container mx-auto px-8 pt-8 pb-16">{children}</div>
    </div>
  );
};
