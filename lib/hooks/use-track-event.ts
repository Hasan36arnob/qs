'use client';

import { useRef, useCallback } from 'react';
import type { EventType, Event } from '@/types';

const eventsRef: Event[] = [];

function getSessionId(): string {
  if (typeof window === 'undefined') return 'ssr';
  let id = sessionStorage.getItem('qasvani-session');
  if (!id) {
    id = 'sess-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
    sessionStorage.setItem('qasvani-session', id);
  }
  return id;
}

export function useTrackEvent() {
  const events = useRef(eventsRef);

  const trackEvent = useCallback(
    (eventType: EventType, productId?: string, metadata?: Record<string, unknown>) => {
      const event: Event = {
        id: 'evt-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8),
        eventType,
        sessionId: getSessionId(),
        productId,
        metadata,
        timestamp: new Date().toISOString(),
      };

      events.current.push(event);
      console.log('[Track Event]', event);
    },
    [],
  );

  return { trackEvent };
}
