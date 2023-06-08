import React, { useEffect } from 'react';
import BingMapsReact from "bingmaps-react";

const BingMap = () => {


  return (
    <>
     <BingMapsReact
      bingMapsKey="At7iOBhe6_JXsV5GohqJEiuZsmYxNLfDU2ZB03w2bPPXsYBXsrb-vkAZyW-39I2H"
      height="500px"
      mapOptions={{
        navigationBarMode: "square",
      }}
      width="500px"
      viewOptions={{
        center: { latitude: 42.360081, longitude: -71.058884 },
        mapTypeId: "grayscale",
      }}
    />
    </>
  );
};

export default BingMap;
