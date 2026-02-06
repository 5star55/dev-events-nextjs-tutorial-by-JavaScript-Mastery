import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   typescript:{
      ignoreBuildErrors:true
   },
   images:{
      remotePatterns:[
         {
            protocol:'https',
            hostname:'res.cloudinary.com'
         }
      ]

   },
   cacheComponents:true,
   reactCompiler:true,
   experimental:{
    turbopackFileSystemCacheForDev:true
   }
};

export default nextConfig;
