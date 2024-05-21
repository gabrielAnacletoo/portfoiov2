import CardWorks from "@components/cardWorks"
import WorksDesktop from "@components/worksDesktop"


const Homepage = () => {

  return (
    <>
    <div className="w-full h-screen">
   
    <div className="flex flex-row items-baseline">
      <div className="text-xs">...</div>&nbsp;
      <h1 className="font-bold text-6xl 
      mt-10 md:m-0 fontFamily-bebas-1 
      ">Trabalhos</h1>
    </div>

    <div className="flex md:hidden">
    <CardWorks/>
    </div>


    <div className="hidden md:flex">
    <WorksDesktop />
    </div>

    </div>
    </>
  )
}

export default Homepage