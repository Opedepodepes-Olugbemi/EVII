"use client";

import { useLayoutEffect, useState } from "react";
import { Button } from "./ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import Github from "./logos/GitHub";
import { ChatDrawer } from "./ChatDrawer";

interface NavProps {
  children?: React.ReactNode;
  accessToken?: string;
}

export const Nav = ({ children, accessToken }: NavProps) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const el = document.documentElement;
    if (el.classList.contains("dark")) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  const toggleDark = () => {
    const el = document.documentElement;
    el.classList.toggle("dark");
    setIsDarkMode((prev) => !prev);
  };

  return (
    <nav className="fixed top-0 w-full border-b border-mirage/10 bg-chalk/80 backdrop-blur-md dark:bg-mirage/80 dark:border-chalk/10 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center">
            <span className="text-sm font-medium text-mirage dark:text-chalk">
              kizuna
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {accessToken && <ChatDrawer accessToken={accessToken} />}
            <Button
              onClick={() => {
                window.open(
                  "https://github.com/Opedepodepes-Olugbemi/memetherapist",
                  "_blank",
                  "noopener noreferrer"
                );
              }}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <Github className="size-4" />
              <span className="hidden lg:inline">Star on GitHub</span>
            </Button>
            <Button
              onClick={toggleDark}
              variant="ghost"
              size="sm"
              className="flex items-center gap-1.5"
            >
              {isDarkMode ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
              <span className="hidden lg:inline">
                {isDarkMode ? "Light" : "Dark"} Mode
              </span>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="size-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-2 space-y-1">
            <div className="px-2">
              {accessToken && <ChatDrawer accessToken={accessToken} />}
            </div>
            <Button
              onClick={() => {
                window.open(
                  "https://github.com/Opedepodepes-Olugbemi/memetherapist",
                  "_blank",
                  "noopener noreferrer"
                );
                setIsMenuOpen(false);
              }}
              variant="ghost"
              className="w-full justify-start gap-1.5"
            >
              <Github className="size-4" />
              <span>Star on GitHub</span>
            </Button>
            <Button
              onClick={() => {
                toggleDark();
                setIsMenuOpen(false);
              }}
              variant="ghost"
              className="w-full justify-start gap-1.5"
            >
              {isDarkMode ? (
                <Sun className="size-4" />
              ) : (
                <Moon className="size-4" />
              )}
              <span>{isDarkMode ? "Light" : "Dark"} Mode</span>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};
