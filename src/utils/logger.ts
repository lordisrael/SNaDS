type LogLevel = 'info' | 'warn' | 'error' | 'debug';



function log(level: LogLevel, message: string, meta?: any) {
  const timestamp = new Date().toISOString();
  if (meta) {
    console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`, meta);
  } else {
    console[level](`[${timestamp}] [${level.toUpperCase()}] ${message}`);
  }
}




export const logger = {
  info: (msg: string, meta?: any) => log('info', msg, meta),
  warn: (msg: string, meta?: any) => log('warn', msg, meta),
  error: (msg: string, meta?: any) => log('error', msg, meta),
  debug: (msg: string, meta?: any) => log('debug', msg, meta),
};