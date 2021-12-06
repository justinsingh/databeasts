import React from 'react';
import { Image, VStack, Text, Box } from '@chakra-ui/react'

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
      <Box width={[75, 100, 125]} bgColor="rgba(255, 255, 255, 0.85)" borderRadius={10} boxShadow={'md'}>
        <VStack as="a" href={href} target="_blank">
          <Image src={imageSrc} alt={imageAlt} />
          <Text fontSize={[10, 14, 16]} fontWeight="bold">{caption}</Text>
        </VStack>
      </Box>
    );
  }

  // If there is a ref being passed down to this component (Such as from a Link component with passHref enabled)
  return (
    <Box width={[75, 100, 125]} bgColor="rgba(255, 255, 255, 0.85)" borderRadius={10} boxShadow={'md'}>
      <VStack as="a" href={href} ref={ref}>
        <Image src={imageSrc} alt={imageAlt} />
        <Text fontSize={[10, 14, 16]} fontWeight="bold">{caption}</Text>
      </VStack>
    </Box>
  );
});

export default ImageCard;