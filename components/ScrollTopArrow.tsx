import React, {useState, useEffect} from 'react';
import {IoMdArrowRoundUp} from 'react-icons/io';
import { Box, Circle, Fade } from '@chakra-ui/react'
import { useMediaQuery } from "@chakra-ui/react"

const ScrollTopArrow = () =>{
  const [isMobile] = useMediaQuery("(max-width: 30em)")
  const [showScroll, setShowScroll] = useState(false)
  const targetOffset = isMobile ? 200 : 400;

  useEffect(()=>{
    window.addEventListener('scroll', checkScrollTop)
    return function cleanup() {
      window.removeEventListener('scroll', checkScrollTop)
    }
  })

  const checkScrollTop = () => {
    if (!showScroll && window.pageYOffset > targetOffset){
      setShowScroll(true)
    } else if (showScroll && window.pageYOffset <= targetOffset){
      setShowScroll(false)
    }
  };

  const scrollTop = () =>{
    window.scrollTo({top: 0, behavior: 'smooth'});
  };

  return (
    <Fade in={showScroll}>
    <Circle
      size={[45, 55]}
      //display={showScroll ? "flex" : "none"}
      opacity={0.9}
      bgColor="rgba(255, 255, 255)"
      position="fixed"
      bottom={["3%", "5%"]}
      right={["3.35%"]}
      cursor="pointer"
      animation="fadeIn 0.3s"
      transition="opacity 0.4s"
      onClick={scrollTop}
      zIndex={10}
      _hover={{opacity: 1}}
    >
      <IoMdArrowRoundUp size={isMobile ? 20 : 25} />
    </Circle>
</Fade>
  )
  /*
  return (
    <HiOutlineArrowCircleUp className="scrollTop" onClick={scrollTop} style={{ display: showScroll ? 'flex' : 'none' }} />
  );
  */
}

export default ScrollTopArrow;