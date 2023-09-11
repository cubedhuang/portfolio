import type { RequestHandler } from '@sveltejs/kit';

// @ts-expect-error the correct type definition is in svelte-aio/dist/api
import { requestHandler } from 'svelte-aio/api';

export const GET: RequestHandler = requestHandler();
