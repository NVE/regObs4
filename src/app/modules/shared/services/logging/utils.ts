function serializeError(err: unknown): Record<string, unknown> {
  if (!(err instanceof Error)) {
    return { value: err };
  }

  const base: Record<string, unknown> = {
    name: err.name,
    message: err.message,
    stack: err.stack,
  };

  for (const key of Object.getOwnPropertyNames(err)) {
    // unngå å overskrive standardfeltene
    if (!(key in base)) {
      // Enhetstest dekker dette
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      base[key] = (err as any)[key];
    }
  }

  return base;
}

export function toSafeString(value: unknown): string {
  // egen håndtering av Error for å bevare mest mulig info
  const target = value instanceof Error ? serializeError(value) : value;

  const seen = new WeakSet<object>();

  const replacer = (_key: string, val: unknown): unknown => {
    if (typeof val === 'bigint') {
      return `BigInt(${val.toString()})`;
    }

    if (typeof val === 'object' && val !== null) {
      if (seen.has(val as object)) {
        return '[Circular]';
      }
      seen.add(val as object);
    }

    if (val instanceof Error) {
      return serializeError(val);
    }

    return val;
  };

  try {
    if (typeof target === 'string') {
      return target;
    }

    return JSON.stringify(target, replacer, 2);
  } catch {
    try {
      return String(target);
    } catch {
      return Object.prototype.toString.call(target);
    }
  }
}
