import React from 'react';
//import Image from 'next/image'
import { Image, VStack, Text } from '@chakra-ui/react'

interface ImageCardProps {
  imageSrc: string
  imageAlt: string
  caption: string
  href?: string   // href is optional in the case of ImageCard being a child of a Link component with passHref enabled
                  // In the above case, href would not be an explicit prop passed down to ImageCard
}

const ImageCard = React.forwardRef(({ imageSrc, imageAlt, caption, href }: ImageCardProps, ref: any) => {
  // If there is no ref being passed down to this component
  if (!ref) {
    return (
      <VStack as="a" href={href} ref={ref} target="_blank" bgColor="rgba(255, 255, 255, 0.85)" borderRadius={10} boxShadow={'md'}>
        <Image src={imageSrc} alt={imageAlt} />
        <Text fontWeight="bold">{caption}</Text>
      </VStack>
    );
  }

  // If there is a ref being passed down to this component (Such as from a Link component with passHref enabled)
  return (
      <VStack as="a" href={href} ref={ref} bgColor="rgba(255, 255, 255, 0.85)" borderRadius={10} boxShadow={'md'}>
        <Image src={imageSrc} alt={imageAlt} />
        <Text fontWeight="bold">{caption}</Text>
      </VStack>
  );
});

export default ImageCard;