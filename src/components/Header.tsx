import { NavLink } from "react-router-dom";
import { PenSquare } from "lucide-react";
import { cn } from "@/lib/utils";

export const Header = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn(
      "text-sm font-medium transition-colors hover:text-primary",
      isActive ? "text-primary" : "text-muted-foreground"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container flex h-14 items-center">
        <NavLink to="/" className="mr-6 flex items-center space-x-2">
          <PenSquare className="h-6 w-6" />
          <span className="font-bold">AI Symphony</span>
        </NavLink>
        <nav className="flex flex-1 items-center space-x-4 lg:space-x-6">
          <NavLink to="/" className={navLinkClasses}>
            Home
          </NavLink>
          <NavLink to="/instruments" className={navLinkClasses}>
            Instruments
          </NavLink>
          <NavLink to="/symphonies" className={navLinkClasses}>
            Symphonies
          </NavLink>
          <NavLink to="/architecture" className={navLinkClasses}>
            Architecture
          </NavLink>
        </nav>
      </div>
    </header>
  );
};