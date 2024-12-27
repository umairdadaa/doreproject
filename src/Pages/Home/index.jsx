import React, { Suspense, useRef } from 'react'
import styled, { ThemeProvider } from 'styled-components';
import { AnimatePresence } from "framer-motion";
import { LocomotiveScrollProvider } from 'react-locomotive-scroll';
import Shop from '@/components/Shop';
import GlobalStyles from '@/styles/GlobalStyles';
import { dark } from "@/styles/Themes";

const Home = () => {
    const containerRef = useRef(null);
    const CoverVideo = React.lazy(() => import('../../components/CoverVideo'));
    const Logo = React.lazy(() => import('../../components/Logo'));

    const Section = styled.section`
    position: relative;
    min-height: 100vh;
    overflow: hidden; 
  `;
    return (<>
      <GlobalStyles />
      <ThemeProvider theme={dark}>
        <LocomotiveScrollProvider
            options={{
                smooth: true,
                // ... all available Locomotive Scroll instance options
                smartphone: {
                    smooth: true,
                },
                tablet: {
                    smooth: true,
                },
            }}
            watch={
                [
                    //..all the dependencies you want to watch to update the scroll.
                    //  Basicaly, you would want to watch page/location changes
                    //  For exemple, on Next.js you would want to watch properties like `router.asPath` (you may want to add more criterias if the instance should be update on locations with query parameters)
                ]
            }
            containerRef={containerRef}
        >
            <main className="App" data-scroll-container ref={containerRef}>
                <AnimatePresence>
                    <Section id="home">
                        <Suspense fallback={<></>}>
                            <Logo />
                            <CoverVideo />
                        </Suspense>
                    </Section>
                    <Shop key="Shop" />
                </AnimatePresence>
            </main>
        </LocomotiveScrollProvider>
        </ThemeProvider>
    </>
    )
}

export default Home
