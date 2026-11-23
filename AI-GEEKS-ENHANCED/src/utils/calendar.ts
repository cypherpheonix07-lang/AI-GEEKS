import { Session } from '../types';

export function buildGoogleCalendarUrl(session: Session, eventDateStr: string = '20261120'): string {
  const [startH, startM] = session.startTime.split(':');
  const [endH, endM] = session.endTime.split(':');

  const startIso = `${eventDateStr}T${startH || '09'}${startM || '00'}00Z`;
  const endIso = `${eventDateStr}T${endH || '10'}${endM || '00'}00Z`;

  const title = encodeURIComponent(`[DevFest '26] ${session.title}`);
  const details = encodeURIComponent(`${session.abstract}\n\nRoom: ${session.room}\nFormat: ${session.format}`);
  const location = encodeURIComponent(`${session.room}, Taj Coromandel, Chennai`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startIso}/${endIso}&details=${details}&location=${location}`;
}

export function generateICS(sessions: Session[]): string {
  const now = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  let icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//AI GEEKS//GDG DevFest 2026//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:AI GEEKS DevFest 2026 Schedule',
    'X-WR-TIMEZONE:Asia/Kolkata'
  ];

  sessions.forEach(s => {
    const dayDate = s.day === 1 ? '20261120' : '20261121';
    const [sH, sM] = s.startTime.split(':');
    const [eH, eM] = s.endTime.split(':');
    const dtStart = `${dayDate}T${sH}${sM}00`;
    const dtEnd = `${dayDate}T${eH}${eM}00`;

    icsContent.push(
      'BEGIN:VEVENT',
      `UID:devfest26-${s.id}@aigeeks.community`,
      `DTSTAMP:${now}`,
      `DTSTART:${dtStart}`,
      `DTEND:${dtEnd}`,
      `SUMMARY:[DevFest '26] ${s.title.replace(/,/g, '\\,')}`,
      `DESCRIPTION:${s.abstract.replace(/\n/g, '\\n').replace(/,/g, '\\,')}`,
      `LOCATION:${s.room.replace(/,/g, '\\,')}\\, Taj Coromandel\\, Chennai`,
      'STATUS:CONFIRMED',
      'END:VEVENT'
    );
  });

  icsContent.push('END:VCALENDAR');
  return icsContent.join('\r\n');
}

export function downloadICSFile(sessions: Session[]) {
  const content = generateICS(sessions);
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'devfest-2026-my-schedule.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
      return true;
    }
  } catch (err) {
    console.error('Failed to copy: ', err);
    return false;
  }
}

export function playAudioFeedback(type: 'beep' | 'success' | 'click' = 'click') {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'beep') {
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
      osc.start();
      osc.stop(ctx.currentTime + 0.12);
    } else if (type === 'success') {
      osc.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, ctx.currentTime + 0.18); // G5
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } else {
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    }
  } catch {
    // Ignore audio context errors if browser blocks autoplay
  }
}
