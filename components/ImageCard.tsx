import React from 'react';
//import Image from 'next/image'
import { Image, VStack, Text } from '@chakra-ui/react'

interface ImageCardProps {
  imageSrc: string
  imageAlt: string
  caption: string
  href?: string | undefined
  onClick?: any | undefined
  ref: any | undefined
}

const ImageCard = React.forwardRef(({ imageSrc, imageAlt, caption, href=undefined, onClick=undefined, ref=undefined }: ImageCardProps) => {
  if (!onClick) {
    return (
      <VStack as="a" href={href} target="_blank" bgColor="rgba(255, 255, 255, 0.85)" borderRadius={10} boxShadow={'md'}>
        <Image src={imageSrc} alt={imageAlt} />
        <Text fontWeight="bold">{caption}</Text>
      </VStack>
    );
  }

  return (
    <a href={href} onClick={onClick} ref={ref}>
      <VStack cursor="pointer" bgColor="rgba(255, 255, 255, 0.85)" borderRadius={10} boxShadow={'md'}>
        <Image src={imageSrc} alt={imageAlt} />
        <Text fontWeight="bold">{caption}</Text>
      </VStack>
    </a>
  );
});

export default ImageCard;