import { WorksLinks } from "@constants/worksLinks";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@components/ui/carousel";

const CardWorks = () => {
  return (
    <>
      <Carousel className="md:flex-col mt-8 md:w-full w-64 mx-auto p-1 h-96">
        <CarouselContent>
          {WorksLinks.map((work, index) => (
            <CarouselItem key={index} className="flex flex-col items-center">
              <p className="text-2xl fontFamily-bebas-1">{work.name}</p>
              <div className="w-full flex flex-col md:mt-2 md:flex-row justify-center mt-10">
                <a href={work.url} target="_blank" rel="noreferrer">
                  <img src={work.imgURL} alt={work.name} className="objet-cover w-96" />
                </a>
                <div className="text-xs mt-10 fontFamily-popins overflow-auto h-60">{work.descricao}</div>
                <span className="text-xs mt-2 fontFamily-popins">
                  <b>Cargo:</b> {work.cargo}
                </span>
                <div className="text-xs mt-2 fontFamily-popins">
                  <div className="flex flex-row items-center w-full">
                    Tecnologias:
                    {work.tech.map((tech, techIndex) => (
                      <div key={techIndex} className="mx-1">
                        <img src={tech} className="w-5" alt={`tech-${techIndex}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </>
  );
};

export default CardWorks;
