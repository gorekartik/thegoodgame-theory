import React, { useState, useEffect } from 'react';
import { Input, Box, Grid, Image, Text, Skeleton, Flex,} from '@chakra-ui/react';

const BeerList = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.punkapi.com/v2/beers');
        const data = await response.json();
        setBeers(data);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box 
      py="10"  
      maxWidth={{sm:"60%", md: "80%", lg:"90%", "2xl": "80%" }}
      ml={'auto'}
      mr={'auto'}
    >
        <Text 
            textAlign={'center'} 
            fontSize={"3.2rem"} 
            fontWeight={"bold"} 
            textColor={"gray.600"} 
        >See the Wonders in Taste
        </Text>

        <Input
            borderRadius={".7rem"}
            placeholder="Search beers"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            mt={10}
        />

        <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={10} mt={10}>
            {loading ? (
            Array.from({ length: 25 }).map((_, index) => (
                <Skeleton key={index} height="200px" borderRadius="md" />
            ))
            ) : (
            filteredBeers.map((beer) => (

                <Box 
                    key={beer.id} 
                    position="relative" 
                    overflow="hidden" 
                    boxShadow='xl' 
                    rounded='md' 
                    bg='white'
                    borderRadius=".7rem" 
                    height={'100%'}
                >
                <Image
                    src={beer.image_url}
                    alt={beer.name}
                    fallbackSrc={beer.image_url} 
                    width="100%"
                    height="200px"
                    filter="blur(20px)" 
                    objectFit="cover"
                    ml={'10'}
                />
                <Flex 
                    position="absolute" 
                    top="0" 
                    left="0"   
                    width={"90%"}> 
                    
                    <Box maxWidth={"40%"} >
                        <Image
                            src={beer.image_url}
                            alt={beer.name}
                            width="100%"
                            height="200px"
                        />
                    </Box>

                    <Box maxWidth={"60%"} mt={'auto'} mb={"auto"}  ml={'5'}>
                        <Text color="white" fontSize="xl" fontWeight="bold">
                            {beer.name}
                        </Text>
                        <Text color="gray.200" fontSize="sm">
                            {beer.tagline}
                        </Text>
                    </Box>
                </Flex>
                </Box>
            ))
            )}
        </Grid>
    </Box>
  );
};

export default BeerList;
