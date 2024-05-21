
import { Link, useLocation } from 'react-router-dom';
import { SideBarLinks } from '@constants/sidebarLinks';
import cn from 'classnames';
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@components/ui/sheet";
import { ModeToggle } from '@components/mode-toggle';
import { ThemeProvider } from '@components/theme-provider';
import { Menu } from 'lucide-react';

interface SideBarTypes {
  name: string;
  path: string;
  imgURL: string;
}

const MobileNav = () => {
  const location = useLocation();

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <section className="w-full py-1 mx-1 flex md:justify-end justify-between">
      <div className='md:hidden'>
      <ModeToggle/>

      </div>

        <Sheet>
          <SheetTrigger asChild>
          <Menu size={30}/>
          </SheetTrigger>
          <SheetContent side="left" className={`border`}>
            <Link to="/" className="flex items-center gap-1">
              <p className="text-[26px] font-extrabold ml-2">Menu</p>
            </Link>
            <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
              <section className="flex h-full flex-col gap-6 pt-16 ">
                {SideBarLinks.map((item: SideBarTypes) => {
                  const isActive = item.path === location.pathname;
                  return (
                    <SheetClose asChild key={item.path}>
                      <Link
                        to={item.path}
                        key={item.name}
                        className={cn(
                          'flex gap-4 items-center p-4 rounded-lg w-full max-w-60',
                          { 'bg-blue-1': isActive }
                        )}>
                        <img
                          src={item.imgURL}
                          alt={item.name}
                          className="w-6 h-6"
                        />
                        <p className="font-semibold">{item.name}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </section>
            </div>
          </SheetContent>
        </Sheet>
      </section>
      </ThemeProvider>
    </>
  );
};

export default MobileNav;
