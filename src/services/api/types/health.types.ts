// src/services/api/types/health.types.ts

// Health check básico
export interface HealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy' | 'warning';
  service: string;
  version: string;
  timestamp: string;
  uptime: number;
  uptimeFormatted: string;
  environment: string;
  memory: {
    used: string;
    total: string;
    usagePercentage: string;
  };
  system: {
    platform: string;
    arch: string;
    cpus: number;
    loadavg: number[];
    freemem: string;
    totalmem: string;
  };
  dependencies: {
    node: string;
    express: string;
  };
  message?: string;
}

// Health check simple
export interface SimpleHealthStatus {
  status: 'ok' | 'degraded' | 'error';
  timestamp: string;
  uptime: string;
  memory?: string;
}

// Health check detallado
export interface DetailedHealthStatus {
  status: 'healthy' | 'degraded' | 'unhealthy';
  service: string;
  timestamp: string;
  checks: {
    api: {
      status: string;
      timestamp: string;
      uptime: string;
    };
    memory: {
      status: string;
      usage: string;
      percentage: string;
    };
    system: {
      status: string;
      load: number;
      loadPerCore: number;
    };
    database: {
      status: string;
      message: string;
    };
    email: {
      status: string;
      message: string;
      configured: boolean;
    };
    environment: {
      status: string;
      node: string;
      env: string;
    };
  };
  summary: {
    total: number;
    healthy: number;
    warning: number;
    error: number;
  };
}

// Información del servidor
export interface ServerInfo {
  server: {
    name: string;
    version: string;
    environment: string;
    uptime: string;
    uptimeSeconds: number;
    started: string;
    pid: number;
    platform: string;
    nodeVersion: string;
  };
  system: {
    hostname: string;
    platform: string;
    arch: string;
    cpus: number;
    cpuModel: string;
    cpuSpeed: number;
    memory: {
      total: string;
      free: string;
      used: string;
      freePercentage: string;
    };
    load: {
      '1min': number;
      '5min': number;
      '15min': number;
      perCore: number;
    };
  };
  process: {
    pid: number;
    memory: {
      rss: string;
      heapTotal: string;
      heapUsed: string;
      external: string;
      arrayBuffers: string;
      usagePercentage: string;
    };
    uptime: number;
    uptimeFormatted: string;
  };
  network: {
    interfaces: number;
    hostname: string;
  };
  time: {
    server: string;
    timezone: string;
    offset: string;
  };
}