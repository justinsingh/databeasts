import React from 'react';
import { Image, VStack, Text, Box } from '@chakra-ui/react'



interface ImageCardProps {
  imageSrc: string
  imageAlt: string
  caption: string
  href?: string   // href is optional in the case of ImageCard being a child of a Link component with passHref enabled
                  // In the above case, href would not be an explicit prop passed down to ImageCard
  isSyncAlert?: boolean
}

type OuterBoxProps = {
  children: React.ReactNode
  isSyncAlert?: boolean
}

const ImageCard = React.forwardRef(({ imageSrc, imageAlt, caption, href, isSyncAlert=false }: ImageCardProps, ref: any) => {
  const OuterBox = ({ children, isSyncAlert=false }: OuterBoxProps) => {
    return (
      <Box 
        onClick={isSyncAlert ? () => alert("Please sync your Tezos wallet") : undefined} 
        cursor="pointer"
        _hover={{ transform: 'scale(1.07)' }} 
        transition="all ease-in 75ms"
        width={[75, 100, 125]} 
        bgColor="rgba(255, 255, 255)" 
        borderRadius={10} 
        boxShadow={'md'}
      >
        {children}
      </Box>
    )
  }

  // If meant to alert user that they need to sync their wallet on click
  if (isSyncAlert) {
    return (
      <OuterBox isSyncAlert={isSyncAlert}>
        <VStack>
          <Image src={imageSrc} alt={imageAlt} />
          <Text fontSize={[10, 14, 16]} fontWeight="bold">{caption}</Text>
        </VStack>
      </OuterBox>
    )
  }

  // If there is no ref being passed down to this component
  if (!ref) {
    return (
      <OuterBox>        
        <VStack as="a" href={href} target="_blank">
          <Image src={imageSrc} alt={imageAlt} />
          <Text fontSize={[10, 14, 16]} fontWeight="bold">{caption}</Text>
        </VStack>
      </OuterBox>
    );
  }

  // If there is a ref being passed down to this component (Such as from a Link component with passHref enabled)
  return (
    <OuterBox>
      <VStack as="a" href={href} ref={ref}>
        <Image src={imageSrc} alt={imageAlt} />
        <Text fontSize={[10, 14, 16]} fontWeight="bold">{caption}</Text>
      </VStack>
    </OuterBox>
  );
});

ImageCard.displayName = 'ImageCard';
export default ImageCard;