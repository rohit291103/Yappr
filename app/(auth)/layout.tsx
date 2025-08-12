import { Header } from "@/components/Header";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full flex flex-col">
      <Header />
      <div className="flex-1 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
