import { globalFont, titleFont } from '@/app/layout'
import { CardBody, CardContainer, CardItem } from '@/components/ui/3d-card'
import { Cover } from '@/components/ui/cover'
import React from 'react'

const HeroMainContent = () => {
  return (
    <section className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-screen w-screen items-center justify-center">
            <CardContainer className="h-full w-full">
              <CardBody
    
                className={`${titleFont.className} flex h-full w-full flex-col items-center justify-center select-none p-2`}
              >
                <CardItem  translateZ={20} className="text-sm text-gray-500 md:text-xl">
                  Math & Applied Science Club
                </CardItem>
    
                <div className="mt-5 flex flex-col items-center justify-center gap-2">
                  <span className={`${globalFont.className} flex flex-nowrap justify-center items-center text-center text-xl capitalize md:text-5xl`}>
                    <CardItem translateX={-40} translateZ={70}>one idea</CardItem>
                    <Cover>
                      <span className="uppercase underline underline-offset-4 decoration-red-400">leads</span>
                    </Cover>
                    <CardItem translateX={40} translateZ={70}>to another,</CardItem>
                  </span>
    
                  <span
                    className={`${globalFont.className} flex flex-col md:flex-row flex-nowrap justify-center items-center text-center text-[0.9rem] capitalize md:text-5xl`}
                  >
                    <CardItem translateX={-50} translateZ={50}>one person pushes another</CardItem>
                    <Cover>
                      <span className="uppercase underline underline-offset-8 decoration-red-400">
                        forward
                      </span>
                    </Cover>
                    <CardItem translateX={50} translateZ={50}>.</CardItem>
                  </span>
                </div>
    
                <CardItem translateY={-30} translateZ={20} className="mt-10 max-w-[80vw] md:max-w-xl text-center text-xs text-gray-500 md:text-xl">
                  At MASC, we believe growth happens when curious people come together. We learn. We build. We share. And
                  somewhere along the way, we inspire someone else to start.
                </CardItem>
              </CardBody>
            </CardContainer>
          </section>
  )
}

export default HeroMainContent