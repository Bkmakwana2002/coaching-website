import React from 'react'
import { useEffect } from 'react'
import ReactPlayer from 'react-player'
import ReactDRMPlayer from '@gumlet/react-drm-player'
import { useLocation, useParams } from 'react-router-dom'

const Player = () => {
    const params = useParams();
    const location = useLocation();
    useEffect(()=>{
      console.log("Link is ", location?.state);
      console.log("params == ", params);
    }, [])

  return (
    <div className='pt-32 flex justify-center items-center px-2'>
      {/* <ReactDRMPlayer 
        src={location?.state} 
        // fairplayCertificateURI={`<YOUR FAIRPLAY CERTIFICATE URI>`}
        // fairplayLicenseURI={`<YOUR PAIRPLAY LICENSE URI>`}

        // widevineLicenseURI={`<YOUR WIDEVINE LICENSE URI>`}
        width="640" 
        height="264" 
        controls = {true}
        muted
        preload="none"
        autoPlay={true}
      /> */}
      <ReactPlayer url={location?.state} controls={true} 
      // Disable download button
      config={{ file: { attributes: { controlsList: 'nodownload' } } }}

      // Disable right click
      onContextMenu={e => e.preventDefault()}

      />
    </div>
  )
}

export default Player