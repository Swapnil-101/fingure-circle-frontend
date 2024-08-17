import React, { useEffect, useRef } from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';

const JitsiMeetComponent = () => {
    const roomName="swapnil"
    const domain ="meet.jit.si"
  
  return (
    <div style={{height:"100vh",display:"grid",flexDirection:"column"}}>
        <JitsiMeeting
        roomName={roomName}
        //@ts-ignore
        displayName={"swapnil"}
        domain={domain}
        containerStyles={{display:"flex",flex:1}}
        />
    </div>
  )
};

export default JitsiMeetComponent;
