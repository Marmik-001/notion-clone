import { Liveblocks } from '@liveblocks/node'
import { log } from 'console';

const key = process.env.LIVEBLOCKS_PRIVATE_KEY;
log('huh')
if(!key){
    throw new Error('LIVEBLOCKS_PRIVATE_KEY is not set');
}

const liveblocks = new Liveblocks({
    secret:key,
});
export default liveblocks