import { CacheItem } from "./types";

export class InMemoryCache {
  private cache: Map<string, CacheItem>;

  constructor(private readonly ttl: number, private readonly maxSize: number) {
    this.cache = new Map<string, CacheItem>();
  }

  public has(key: string) {
    return this.cache.has(key);
  }

  public get(key: string) {
    return this.cache.get(key);
  }

  public set(key: string, value: any) {
    this.evict();
    this.cache.set(key, { value, expiresAt: Date.now() + this.ttl });
  }

  public evict() {
    // Evict until the cache is no longer full
    while (this.cache.size >= this.maxSize) {
      const key = this.cache.keys().next().value;
      this.cache.delete(key);
    }

    // Evict the expired items
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now >= item.expiresAt) {
        this.cache.delete(key);
      }
    }
  }
}
