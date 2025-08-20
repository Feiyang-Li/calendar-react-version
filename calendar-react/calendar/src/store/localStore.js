
export class LocalStorage {
  /**
   *
   * @param {Object} schema
   * @param {number} cuvId
   * @param {string} storeKey
   */
  constructor(schema, cuvId = 0, storeKey = "LocalStorageStore") {
    // schema is a dictonary with {storeName: storeType}
    this.schema = schema || {};
    this.storeKey = storeKey;
    this.recordsKey = `${storeKey}:records`;
    this.nextIdKey = `${storeKey}:nextId`;
    this.schemaKey = `${storeKey}:schema`;
    // initialization
    if (!localStorage.getItem(this.recordsKey)) {
      localStorage.setItem(this.recordsKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.nextIdKey)) {
      localStorage.setItem(this.nextIdKey, String(cuvId));
    }
    // Persist schema for reference (optional)
    if (!localStorage.getItem(this.schemaKey)) {
      localStorage.setItem(
        this.schemaKey,
        JSON.stringify(this._schemaToNames())
      );
    }
  }
  savingItems(items) {
    // items would be a dictionary
    this._assertIsPlainObject(items, "items");
    this._validateAgainstSchema(items);

    const records = this._loadRecords();
    const id = this._allocId();
    const record = { id, ...this._normalizeBeforeSave(items) };
    records.push(record);
    this._saveRecords(records);
    return record;
  }
  extractItems(id) {
    const records = this._loadRecords();
    return records.find(r => r.id === Number(id)) || null;
  }
  extractAll() {
    return [...this._loadRecords()];
  }
  extractOnParameters(dict) {
    // dict exact matching
    this._assertIsPlainObject(dict, "dict");
    const validKeys = Object.keys(this.schema)
    const entries = Object.entries(dict).filter(([k]) => validKeys.includes(k));
    const records = this._loadRecords();
    return records.filter(rec =>
      entries.every(([k, v]) => rec[k] === v)
    );
  }
  _saveRecords(records) {
    localStorage.setItem(this.recordsKey, JSON.stringify(records));
  }
  _assertIsPlainObject(val, label) {
    if (typeof val !== "object" || val === null || Array.isArray(val)) {
      throw new Error(`${label} must be a plain object`);
    }
  }

  _validateAgainstSchema(items) {
    // Ensure no unknown keys
    for (const key of Object.keys(items)) {
      if (!(key in this.schema)) {
        throw new Error(`Unknown field "${key}" not in schema`);
      }
    }
    // Ensure all schema keys exist & types match
    for (const [key, typeCtor] of Object.entries(this.schema)) {
      if (!(key in items)) {
        throw new Error(`Missing required field "${key}"`);
      }
      const val = items[key];
      if (!this._isType(val, typeCtor)) {
        const expect = this._ctorName(typeCtor);
        const got = val === null ? "null" : typeof val;
        throw new Error(
          `Type mismatch for "${key}": expected ${expect}, got ${got}`
        );
      }
    }
  }

  _isType(value, typeCtor) {
    // Support common JS constructors and a simple predicate function case
    if (typeCtor === Number)
      return typeof value === "number" && !Number.isNaN(value);
    if (typeCtor === String) return typeof value === "string";
    if (typeCtor === Boolean) return typeof value === "boolean";
    if (typeCtor === Array) return Array.isArray(value);
    if (typeCtor === Object)
      return (
        typeof value === "object" && value !== null && !Array.isArray(value)
      );
    if (typeCtor === Date)
      return value instanceof Date || this._isISODateString(value);
    if (typeof typeCtor === "function") {
      // Allow predicate validators: (v) => boolean
      // If it's a constructor (with name), you might still want predicate support:
      try {
        return !!typeCtor(value);
      } catch {
        return false;
      }
    }
    // Fallback: accept anything (or return false to be strict)
    return false;
  }
  _loadRecords() {
    const raw = localStorage.getItem(this.recordsKey);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
  _allocId() {
    const current = Number(localStorage.getItem(this.nextIdKey) || "0");
    const next = current + 1;
    localStorage.setItem(this.nextIdKey, String(next));
    return next; // allocate current+1 as ID
  }
  _normalizeBeforeSave(items) {
    // Convert Dates to ISO strings so JSON persists nicely
    const out = {};
    for (const [k, v] of Object.entries(items)) {
      if (v instanceof Date) out[k] = v.toISOString();
      // additional here is other Data format present here.
      else out[k] = v;
    }
    return out;
  }
  _schemaToNames() {
    // Store just the constructor names for reference (optional)
    const out = {};
    for (const [k, ctor] of Object.entries(this.schema)) {
      out[k] = this._ctorName(ctor);
    }
    return out;
  }
  _ctorName(ctor) {
    return ctor && ctor.name ? ctor.name : String(ctor);
  }
  _isISODateString(v) {
    return typeof v === "string" && !Number.isNaN(Date.parse(v));
  }
}

export function clearRecords(storeKey = "LocalStorageStore") {
    localStorage.removeItem(`${storeKey}:records`);
}
export function clearIds(storeKey = "LocalStorageStore") {
    localStorage.removeItem(`${storeKey}:nextId`);
}
export function clearSchema(storeKey = "LocalStorageStore") {
    localStorage.removeItem(`${storeKey}:schema`);
}
export function clearAll(storeKey = "LocalStorageStore") {
    clearRecords(storeKey);
    clearIds(storeKey);
    clearSchema(storeKey);
}