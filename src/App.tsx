
import { ThemeProvider } from "@components/theme-provider";
import Navbar from "./components/navbar";
import AppRouter from "./router";
import MobileNav from "@components/mabileNav";

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-full h-screen overflow-hidden">
     
        <div className="hidden sm:block">
          <Navbar />
        </div>
      
        <div className="flex sm:hidden w-full">
          <MobileNav />
        </div>
      
        <div className="flex min-h-screen flex-1 flex-col px-2 pb-6 max-md:pb-14 sm:px-14">
          <AppRouter />
        </div> 
       
       </div> 
    </ThemeProvider>
    </>

  );
}

export default App;
