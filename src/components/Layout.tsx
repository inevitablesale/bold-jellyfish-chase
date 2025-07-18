import { Header } from "./Header";
import { MadeWithDyad } from "./made-with-dyad";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1">{children}</main>
      <MadeWithDyad />
    </div>
  );
};