import { Box, Spinner } from "@chakra-ui/react";

const LoadingWheel = () => {
  return (
    <Box position="absolute" top={["50%"]}>
      <Spinner
        thickness="8px"
        speed='0.55s'
        emptyColor='white'
        color='blue.500'
        size='xl'
      />
    </Box>
  )
}

export default LoadingWheel;