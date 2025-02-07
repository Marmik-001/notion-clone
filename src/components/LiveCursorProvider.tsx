'use client';

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import FollowPointer from "./FollowPointer";

function LiveCursorProvider({children}: {children: React.ReactNode}) {
    
    const [myPresence , updateMyPresence] = useMyPresence();
    const others = useOthers();

    const handlePointerMove=  (e: React.PointerEvent<HTMLDivElement>) => {
        updateMyPresence({
            cursor: {
                x: Math.floor(e.pageX),
                y: Math.floor(e.pageY)
            }
        })
    }
    const handlePointerLeave = () => {
        updateMyPresence({
            cursor: null
        })
    }

  return (
    <div onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave}>
        {/* render cursors */}
        {
            others.filter((other) => other.presence.cursor !== null).map(({connectionId  , info , presence}) => (
                <FollowPointer key={connectionId}
                info={info}
                x = {presence.cursor!.x}
                y = {presence.cursor!.y}
                />
            ))
        }
        {children}
    </div>
  )
}
export default LiveCursorProvider