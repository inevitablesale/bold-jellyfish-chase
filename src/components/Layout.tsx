import { Header } from "./Header";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
};