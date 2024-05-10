
import React, { useEffect, useState } from 'react';


export const StopScreenMessageContext = React.createContext();

export const StopScreenMessageProvider = ({ children }) => {

    
    const [isMobile, setIsMobile] = useState(window.innerWidth < 780);

   {/* Performs similarly to componentDidMount in classes */}
   useEffect(() => {
       window.addEventListener("resize", () => {
           const ismobile = window.innerWidth < 780;
           if (ismobile !== isMobile) setIsMobile(ismobile);
       }, false);
     }, [isMobile]);


    return (
        <StopScreenMessageContext.Provider
          value={{
            isMobile
          }}
        >
          {children}
        </StopScreenMessageContext.Provider>
      );
    };
    