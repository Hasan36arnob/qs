'use client';

import { useEffect, useState } from 'react';
import type { UTMParams } from '@/types';

export function useUtmCapture(): UTMParams {
  const [utm, setUtm] = useState<UTMParams>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams(window.location.search);
    const captured: UTMParams = {};

    const source = params.get('utm_source');
    const medium = params.get('utm_medium');
    const campaign = params.get('utm_campaign');
    const content = params.get('utm_content');

    if (source) captured.source = source;
    if (medium) captured.medium = medium;
    if (campaign) captured.campaign = campaign;
    if (content) captured.content = content;

    if (Object.keys(captured).length > 0) {
      sessionStorage.setItem('qasvani-utm', JSON.stringify(captured));
      setUtm(captured);
    } else {
      const stored = sessionStorage.getItem('qasvani-utm');
      if (stored) {
        try {
          setUtm(JSON.parse(stored));
        } catch {
          // ignore parse errors
        }
      }
    }
  }, []);

  return utm;
}
