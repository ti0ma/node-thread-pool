import * as path from 'path';

require('app-module-path').addPath(__dirname);

import { ThreadPool } from 'lib/threadPool';
import { Thread } from 'lib/thread';

// TypeScript doesn't know how to export the default =(
ThreadPool['ThreadPool'] = ThreadPool;
ThreadPool['Thread'] = Thread;
export = ThreadPool;
