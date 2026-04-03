var Xt = Array.isArray, er = Array.prototype.indexOf, Fe = Array.prototype.includes, tt = Array.from, tr = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, nr = Object.getOwnPropertyDescriptors, rr = Object.prototype, ir = Array.prototype, Zt = Object.getPrototypeOf, Rt = Object.isExtensible;
const sr = () => {
};
function lr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Jt() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const F = 2, Re = 4, nt = 8, Qt = 1 << 24, pe = 16, Z = 32, Ee = 64, ct = 128, B = 512, C = 1024, P = 2048, ee = 4096, L = 8192, X = 16384, Me = 32768, Dt = 1 << 25, xe = 65536, Ot = 1 << 17, ar = 1 << 18, Pe = 1 << 19, fr = 1 << 20, $ = 1 << 25, ke = 65536, dt = 1 << 21, Et = 1 << 22, ce = 1 << 23, lt = /* @__PURE__ */ Symbol("$state"), re = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function or(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function ur() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function cr(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function dr(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function vr() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function hr(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function pr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function _r() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function gr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function mr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function br() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const wr = 1, yr = 2, $t = 4, Er = 8, xr = 16, kr = 1, Tr = 2, R = /* @__PURE__ */ Symbol(), en = "http://www.w3.org/1999/xhtml";
function Sr() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function tn(e) {
  return e === this.v;
}
function Mr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function nn(e) {
  return !Mr(e, this.v);
}
let Y = null;
function De(e) {
  Y = e;
}
function rn(e, t = !1, n) {
  Y = {
    p: Y,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      w
    ),
    l: null
  };
}
function sn(e) {
  var t = (
    /** @type {ComponentContext} */
    Y
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Sn(r);
  }
  return t.i = !0, Y = t.p, /** @type {T} */
  {};
}
function ln() {
  return !0;
}
let Ce = [];
function Ar() {
  var e = Ce;
  Ce = [], lr(e);
}
function be(e) {
  if (Ce.length === 0) {
    var t = Ce;
    queueMicrotask(() => {
      t === Ce && Ar();
    });
  }
  Ce.push(e);
}
function an(e) {
  var t = w;
  if (t === null)
    return b.f |= ce, e;
  if ((t.f & Me) === 0 && (t.f & Re) === 0)
    throw e;
  oe(e, t);
}
function oe(e, t) {
  for (; t !== null; ) {
    if ((t.f & ct) !== 0) {
      if ((t.f & Me) === 0)
        throw e;
      try {
        t.b.error(e);
        return;
      } catch (n) {
        e = n;
      }
    }
    t = t.parent;
  }
  throw e;
}
const Cr = -7169;
function M(e, t) {
  e.f = e.f & Cr | t;
}
function xt(e) {
  (e.f & B) !== 0 || e.deps === null ? M(e, C) : M(e, ee);
}
function fn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & F) === 0 || (t.f & ke) === 0 || (t.f ^= ke, fn(
        /** @type {Derived} */
        t.deps
      ));
}
function on(e, t, n) {
  (e.f & P) !== 0 ? t.add(e) : (e.f & ee) !== 0 && n.add(e), fn(e.deps), M(e, C);
}
const ae = /* @__PURE__ */ new Set();
let k = null, K = null, vt = null, at = !1, Ne = null, Je = null;
var zt = 0;
let Nr = 1;
class he {
  id = Nr++;
  /**
   * The current values of any signals that are updated in this batch.
   * Tuple format: [value, is_derived] (note: is_derived is false for deriveds, too, if they were overridden via assignment)
   * They keys of this map are identical to `this.#previous`
   * @type {Map<Value, [any, boolean]>}
   */
  current = /* @__PURE__ */ new Map();
  /**
   * The values of any signals (sources and deriveds) that are updated in this batch _before_ those updates took place.
   * They keys of this map are identical to `this.#current`
   * @type {Map<Value, any>}
   */
  previous = /* @__PURE__ */ new Map();
  /**
   * When the batch is committed (and the DOM is updated), we need to remove old branches
   * and append new ones by calling the functions added inside (if/each/key/etc) blocks
   * @type {Set<(batch: Batch) => void>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #f = /* @__PURE__ */ new Set();
  /**
   * Async effects that are currently in flight
   * @type {Map<Effect, number>}
   */
  #e = /* @__PURE__ */ new Map();
  /**
   * Async effects that are currently in flight, _not_ inside a pending boundary
   * @type {Map<Effect, number>}
   */
  #r = /* @__PURE__ */ new Map();
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #i = null;
  /**
   * The root effects that need to be flushed
   * @type {Effect[]}
   */
  #n = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #s = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #l = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #a = /* @__PURE__ */ new Map();
  is_fork = !1;
  #c = !1;
  /** @type {Set<Batch>} */
  #o = /* @__PURE__ */ new Set();
  #d() {
    return this.is_fork || this.#r.size > 0;
  }
  #h() {
    for (const r of this.#o)
      for (const i of r.#r.keys()) {
        for (var t = !1, n = i; n.parent !== null; ) {
          if (this.#a.has(n)) {
            t = !0;
            break;
          }
          n = n.parent;
        }
        if (!t)
          return !0;
      }
    return !1;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(t) {
    this.#a.has(t) || this.#a.set(t, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(t) {
    var n = this.#a.get(t);
    if (n) {
      this.#a.delete(t);
      for (var r of n.d)
        M(r, P), this.schedule(r);
      for (r of n.m)
        M(r, ee), this.schedule(r);
    }
  }
  #v() {
    if (zt++ > 1e3 && (ae.delete(this), Fr()), !this.#d()) {
      for (const f of this.#s)
        this.#l.delete(f), M(f, P), this.schedule(f);
      for (const f of this.#l)
        M(f, ee), this.schedule(f);
    }
    const t = this.#n;
    this.#n = [], this.apply();
    var n = Ne = [], r = [], i = Je = [];
    for (const f of t)
      try {
        this.#u(f, n, r);
      } catch (a) {
        throw vn(f), a;
      }
    if (k = null, i.length > 0) {
      var s = he.ensure();
      for (const f of i)
        s.schedule(f);
    }
    if (Ne = null, Je = null, this.#d() || this.#h()) {
      this.#p(r), this.#p(n);
      for (const [f, a] of this.#a)
        dn(f, a);
    } else {
      this.#e.size === 0 && ae.delete(this), this.#s.clear(), this.#l.clear();
      for (const f of this.#t) f(this);
      this.#t.clear(), Pt(r), Pt(n), this.#i?.resolve();
    }
    var l = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      k
    );
    if (this.#n.length > 0) {
      const f = l ??= this;
      f.#n.push(...this.#n.filter((a) => !f.#n.includes(a)));
    }
    l !== null && (ae.add(l), l.#v()), ae.has(this) || this.#m();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #u(t, n, r) {
    t.f ^= C;
    for (var i = t.first; i !== null; ) {
      var s = i.f, l = (s & (Z | Ee)) !== 0, f = l && (s & C) !== 0, a = f || (s & L) !== 0 || this.#a.has(i);
      if (!a && i.fn !== null) {
        l ? i.f ^= C : (s & Re) !== 0 ? n.push(i) : We(i) && ((s & pe) !== 0 && this.#l.add(i), ze(i));
        var o = i.first;
        if (o !== null) {
          i = o;
          continue;
        }
      }
      for (; i !== null; ) {
        var u = i.next;
        if (u !== null) {
          i = u;
          break;
        }
        i = i.parent;
      }
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #p(t) {
    for (var n = 0; n < t.length; n += 1)
      on(t[n], this.#s, this.#l);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} old_value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    n !== R && !this.previous.has(t) && this.previous.set(t, n), (t.f & ce) === 0 && (this.current.set(t, [t.v, r]), K?.set(t, t.v));
  }
  activate() {
    k = this;
  }
  deactivate() {
    k = null, K = null;
  }
  flush() {
    try {
      at = !0, k = this, this.#v();
    } finally {
      zt = 0, vt = null, Ne = null, Je = null, at = !1, k = null, K = null, de.clear();
    }
  }
  discard() {
    for (const t of this.#f) t(this);
    this.#f.clear(), ae.delete(this);
  }
  #m() {
    for (const o of ae) {
      var t = o.id < this.id, n = [];
      for (const [u, [p, c]] of this.current) {
        if (o.current.has(u)) {
          var r = (
            /** @type {[any, boolean]} */
            o.current.get(u)[0]
          );
          if (t && p !== r)
            o.current.set(u, [p, c]);
          else
            continue;
        }
        n.push(u);
      }
      var i = [...o.current.keys()].filter((u) => !this.current.has(u));
      if (i.length === 0)
        t && o.discard();
      else if (n.length > 0) {
        o.activate();
        var s = /* @__PURE__ */ new Set(), l = /* @__PURE__ */ new Map();
        for (var f of n)
          un(f, i, s, l);
        if (o.#n.length > 0) {
          o.apply();
          for (var a of o.#n)
            o.#u(a, [], []);
          o.#n = [];
        }
        o.deactivate();
      }
    }
    for (const o of ae)
      o.#o.has(this) && (o.#o.delete(this), o.#o.size === 0 && !o.#d() && (o.activate(), o.#v()));
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, n) {
    let r = this.#e.get(n) ?? 0;
    if (this.#e.set(n, r + 1), t) {
      let i = this.#r.get(n) ?? 0;
      this.#r.set(n, i + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(t, n, r) {
    let i = this.#e.get(n) ?? 0;
    if (i === 1 ? this.#e.delete(n) : this.#e.set(n, i - 1), t) {
      let s = this.#r.get(n) ?? 0;
      s === 1 ? this.#r.delete(n) : this.#r.set(n, s - 1);
    }
    this.#c || r || (this.#c = !0, be(() => {
      this.#c = !1, this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      this.#s.add(r);
    for (const r of n)
      this.#l.add(r);
    t.clear(), n.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(t) {
    this.#t.add(t);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(t) {
    this.#f.add(t);
  }
  settled() {
    return (this.#i ??= Jt()).promise;
  }
  static ensure() {
    if (k === null) {
      const t = k = new he();
      at || (ae.add(k), be(() => {
        k === t && t.flush();
      }));
    }
    return k;
  }
  apply() {
    {
      K = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    if (vt = t, t.b?.is_pending && (t.f & (Re | nt | Qt)) !== 0 && (t.f & Me) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (Ne !== null && n === w && (b === null || (b.f & F) === 0))
        return;
      if ((r & (Ee | Z)) !== 0) {
        if ((r & C) === 0)
          return;
        n.f ^= C;
      }
    }
    this.#n.push(n);
  }
}
function Fr() {
  try {
    pr();
  } catch (e) {
    oe(e, vt);
  }
}
let ne = null;
function Pt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (X | L)) === 0 && We(r) && (ne = /* @__PURE__ */ new Set(), ze(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && An(r), ne?.size > 0)) {
        de.clear();
        for (const i of ne) {
          if ((i.f & (X | L)) !== 0) continue;
          const s = [i];
          let l = i.parent;
          for (; l !== null; )
            ne.has(l) && (ne.delete(l), s.push(l)), l = l.parent;
          for (let f = s.length - 1; f >= 0; f--) {
            const a = s[f];
            (a.f & (X | L)) === 0 && ze(a);
          }
        }
        ne.clear();
      }
    }
    ne = null;
  }
}
function un(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & F) !== 0 ? un(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (Et | pe)) !== 0 && (s & P) === 0 && cn(i, t, r) && (M(i, P), kt(
        /** @type {Effect} */
        i
      ));
    }
}
function cn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (Fe.call(t, i))
        return !0;
      if ((i.f & F) !== 0 && cn(
        /** @type {Derived} */
        i,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function kt(e) {
  k.schedule(e);
}
function dn(e, t) {
  if (!((e.f & Z) !== 0 && (e.f & C) !== 0)) {
    (e.f & P) !== 0 ? t.d.push(e) : (e.f & ee) !== 0 && t.m.push(e), M(e, C);
    for (var n = e.first; n !== null; )
      dn(n, t), n = n.next;
  }
}
function vn(e) {
  M(e, C);
  for (var t = e.first; t !== null; )
    vn(t), t = t.next;
}
function Rr(e) {
  let t = 0, n = Te(0), r;
  return () => {
    Mt() && (d(n), $r(() => (t === 0 && (r = jn(() => e(() => Be(n)))), t += 1, () => {
      be(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, Be(n));
      });
    })));
  };
}
var Dr = xe | Pe;
function Or(e, t, n, r) {
  new zr(e, t, n, r);
}
class zr {
  /** @type {Boundary | null} */
  parent;
  is_pending = !1;
  /**
   * API-level transformError transform function. Transforms errors before they reach the `failed` snippet.
   * Inherited from parent boundary, or defaults to identity.
   * @type {(error: unknown) => unknown}
   */
  transform_error;
  /** @type {TemplateNode} */
  #t;
  /** @type {TemplateNode | null} */
  #f = null;
  /** @type {BoundaryProps} */
  #e;
  /** @type {((anchor: Node) => void)} */
  #r;
  /** @type {Effect} */
  #i;
  /** @type {Effect | null} */
  #n = null;
  /** @type {Effect | null} */
  #s = null;
  /** @type {Effect | null} */
  #l = null;
  /** @type {DocumentFragment | null} */
  #a = null;
  #c = 0;
  #o = 0;
  #d = !1;
  /** @type {Set<Effect>} */
  #h = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #v = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #u = null;
  #p = Rr(() => (this.#u = Te(this.#c), () => {
    this.#u = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, n, r, i) {
    this.#t = t, this.#e = n, this.#r = (s) => {
      var l = (
        /** @type {Effect} */
        w
      );
      l.b = this, l.f |= ct, r(s);
    }, this.parent = /** @type {Effect} */
    w.b, this.transform_error = i ?? this.parent?.transform_error ?? ((s) => s), this.#i = rt(() => {
      this.#b();
    }, Dr);
  }
  #m() {
    try {
      this.#n = V(() => this.#r(this.#t));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #y(t) {
    const n = this.#e.failed;
    n && (this.#l = V(() => {
      n(
        this.#t,
        () => t,
        () => () => {
        }
      );
    }));
  }
  #E() {
    const t = this.#e.pending;
    t && (this.is_pending = !0, this.#s = V(() => t(this.#t)), be(() => {
      var n = this.#a = document.createDocumentFragment(), r = ve();
      n.append(r), this.#n = this.#g(() => V(() => this.#r(r))), this.#o === 0 && (this.#t.before(n), this.#a = null, we(
        /** @type {Effect} */
        this.#s,
        () => {
          this.#s = null;
        }
      ), this.#_(
        /** @type {Batch} */
        k
      ));
    }));
  }
  #b() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#o = 0, this.#c = 0, this.#n = V(() => {
        this.#r(this.#t);
      }), this.#o > 0) {
        var t = this.#a = document.createDocumentFragment();
        Nt(this.#n, t);
        const n = (
          /** @type {(anchor: Node) => void} */
          this.#e.pending
        );
        this.#s = V(() => n(this.#t));
      } else
        this.#_(
          /** @type {Batch} */
          k
        );
    } catch (n) {
      this.error(n);
    }
  }
  /**
   * @param {Batch} batch
   */
  #_(t) {
    this.is_pending = !1, t.transfer_effects(this.#h, this.#v);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(t) {
    on(t, this.#h, this.#v);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#e.pending;
  }
  /**
   * @template T
   * @param {() => T} fn
   */
  #g(t) {
    var n = w, r = b, i = Y;
    te(this.#i), G(this.#i), De(this.#i.ctx);
    try {
      return he.ensure(), t();
    } catch (s) {
      return an(s), null;
    } finally {
      te(n), G(r), De(i);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #w(t, n) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#w(t, n);
      return;
    }
    this.#o += t, this.#o === 0 && (this.#_(n), this.#s && we(this.#s, () => {
      this.#s = null;
    }), this.#a && (this.#t.before(this.#a), this.#a = null));
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(t, n) {
    this.#w(t, n), this.#c += t, !(!this.#u || this.#d) && (this.#d = !0, be(() => {
      this.#d = !1, this.#u && Oe(this.#u, this.#c);
    }));
  }
  get_effect_pending() {
    return this.#p(), d(
      /** @type {Source<number>} */
      this.#u
    );
  }
  /** @param {unknown} error */
  error(t) {
    var n = this.#e.onerror;
    let r = this.#e.failed;
    if (!n && !r)
      throw t;
    this.#n && (j(this.#n), this.#n = null), this.#s && (j(this.#s), this.#s = null), this.#l && (j(this.#l), this.#l = null);
    var i = !1, s = !1;
    const l = () => {
      if (i) {
        Sr();
        return;
      }
      i = !0, s && br(), this.#l !== null && we(this.#l, () => {
        this.#l = null;
      }), this.#g(() => {
        this.#b();
      });
    }, f = (a) => {
      try {
        s = !0, n?.(a, l), s = !1;
      } catch (o) {
        oe(o, this.#i && this.#i.parent);
      }
      r && (this.#l = this.#g(() => {
        try {
          return V(() => {
            var o = (
              /** @type {Effect} */
              w
            );
            o.b = this, o.f |= ct, r(
              this.#t,
              () => a,
              () => l
            );
          });
        } catch (o) {
          return oe(
            o,
            /** @type {Effect} */
            this.#i.parent
          ), null;
        }
      }));
    };
    be(() => {
      var a;
      try {
        a = this.transform_error(t);
      } catch (o) {
        oe(o, this.#i && this.#i.parent);
        return;
      }
      a !== null && typeof a == "object" && typeof /** @type {any} */
      a.then == "function" ? a.then(
        f,
        /** @param {unknown} e */
        (o) => oe(o, this.#i && this.#i.parent)
      ) : f(a);
    });
  }
}
function Pr(e, t, n, r) {
  const i = Tt;
  var s = e.filter((c) => !c.settled);
  if (n.length === 0 && s.length === 0) {
    r(t.map(i));
    return;
  }
  var l = (
    /** @type {Effect} */
    w
  ), f = Ir(), a = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((c) => c.promise)) : null;
  function o(c) {
    f();
    try {
      r(c);
    } catch (_) {
      (l.f & X) === 0 && oe(_, l);
    }
    $e();
  }
  if (n.length === 0) {
    a.then(() => o(t.map(i)));
    return;
  }
  var u = hn();
  function p() {
    Promise.all(n.map((c) => /* @__PURE__ */ jr(c))).then((c) => o([...t.map(i), ...c])).catch((c) => oe(c, l)).finally(() => u());
  }
  a ? a.then(() => {
    f(), p(), $e();
  }) : p();
}
function Ir() {
  var e = (
    /** @type {Effect} */
    w
  ), t = b, n = Y, r = (
    /** @type {Batch} */
    k
  );
  return function(s = !0) {
    te(e), G(t), De(n), s && (e.f & X) === 0 && (r?.activate(), r?.apply());
  };
}
function $e(e = !0) {
  te(null), G(null), De(null), e && k?.deactivate();
}
function hn() {
  var e = (
    /** @type {Effect} */
    w
  ), t = (
    /** @type {Boundary} */
    e.b
  ), n = (
    /** @type {Batch} */
    k
  ), r = t.is_rendered();
  return t.update_pending_count(1, n), n.increment(r, e), (i = !1) => {
    t.update_pending_count(-1, n), n.decrement(r, e, i);
  };
}
// @__NO_SIDE_EFFECTS__
function Tt(e) {
  var t = F | P, n = b !== null && (b.f & F) !== 0 ? (
    /** @type {Derived} */
    b
  ) : null;
  return w !== null && (w.f |= Pe), {
    ctx: Y,
    deps: null,
    effects: null,
    equals: tn,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      R
    ),
    wv: 0,
    parent: n ?? w,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function jr(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    w
  );
  r === null && ur();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Te(
    /** @type {V} */
    R
  ), l = !b, f = /* @__PURE__ */ new Map();
  return Qr(() => {
    var a = (
      /** @type {Effect} */
      w
    ), o = Jt();
    i = o.promise;
    try {
      Promise.resolve(e()).then(o.resolve, o.reject).finally($e);
    } catch (_) {
      o.reject(_), $e();
    }
    var u = (
      /** @type {Batch} */
      k
    );
    if (l) {
      if ((a.f & Me) !== 0)
        var p = hn();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        f.get(u)?.reject(re), f.delete(u);
      else {
        for (const _ of f.values())
          _.reject(re);
        f.clear();
      }
      f.set(u, o);
    }
    const c = (_, h = void 0) => {
      if (p) {
        var g = h === re;
        p(g);
      }
      if (!(h === re || (a.f & X) !== 0)) {
        if (u.activate(), h)
          s.f |= ce, Oe(s, h);
        else {
          (s.f & ce) !== 0 && (s.f ^= ce), Oe(s, _);
          for (const [v, m] of f) {
            if (f.delete(v), v === u) break;
            m.reject(re);
          }
        }
        u.deactivate();
      }
    };
    o.promise.then(c, (_) => c(null, _ || "unknown"));
  }), Xr(() => {
    for (const a of f.values())
      a.reject(re);
  }), new Promise((a) => {
    function o(u) {
      function p() {
        u === i ? a(s) : o(i);
      }
      u.then(p, p);
    }
    o(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Ae(e) {
  const t = /* @__PURE__ */ Tt(e);
  return Fn(t), t;
}
// @__NO_SIDE_EFFECTS__
function qr(e) {
  const t = /* @__PURE__ */ Tt(e);
  return t.equals = nn, t;
}
function Lr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      j(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Yr(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & F) === 0)
      return (t.f & X) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function St(e) {
  var t, n = w;
  te(Yr(e));
  try {
    e.f &= ~ke, Lr(e), t = zn(e);
  } finally {
    te(n);
  }
  return t;
}
function pn(e) {
  var t = e.v, n = St(e);
  if (!e.equals(n) && (e.wv = Dn(), (!k?.is_fork || e.deps === null) && (e.v = n, k?.capture(e, t, !0), e.deps === null))) {
    M(e, C);
    return;
  }
  Se || (K !== null ? (Mt() || k?.is_fork) && K.set(e, n) : xt(e));
}
function Hr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(re), t.teardown = sr, t.ac = null, Ge(t, 0), At(t));
}
function _n(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && ze(t);
}
let ht = /* @__PURE__ */ new Set();
const de = /* @__PURE__ */ new Map();
let gn = !1;
function Te(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: tn,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function D(e, t) {
  const n = Te(e);
  return Fn(n), n;
}
// @__NO_SIDE_EFFECTS__
function Vr(e, t = !1, n = !0) {
  const r = Te(e);
  return t || (r.equals = nn), r;
}
function E(e, t, n = !1) {
  b !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!W || (b.f & Ot) !== 0) && ln() && (b.f & (F | pe | Et | Ot)) !== 0 && (U === null || !Fe.call(U, e)) && mr();
  let r = n ? ue(t) : t;
  return Oe(e, r, Je);
}
function Oe(e, t, n = null) {
  if (!e.equals(t)) {
    var r = e.v;
    Se ? de.set(e, t) : de.set(e, r), e.v = t;
    var i = he.ensure();
    if (i.capture(e, r), (e.f & F) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & P) !== 0 && St(s), K === null && xt(s);
    }
    e.wv = Dn(), mn(e, P, n), w !== null && (w.f & C) !== 0 && (w.f & (Z | Ee)) === 0 && (H === null ? ni([e]) : H.push(e)), !i.is_fork && ht.size > 0 && !gn && Br();
  }
  return t;
}
function Br() {
  gn = !1;
  for (const e of ht)
    (e.f & C) !== 0 && M(e, ee), We(e) && ze(e);
  ht.clear();
}
function It(e, t = 1) {
  var n = d(e), r = t === 1 ? n++ : n--;
  return E(e, n), r;
}
function Be(e) {
  E(e, e.v + 1);
}
function mn(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var l = r[s], f = l.f, a = (f & P) === 0;
      if (a && M(l, t), (f & F) !== 0) {
        var o = (
          /** @type {Derived} */
          l
        );
        K?.delete(o), (f & ke) === 0 && (f & B && (l.f |= ke), mn(o, ee, n));
      } else if (a) {
        var u = (
          /** @type {Effect} */
          l
        );
        (f & pe) !== 0 && ne !== null && ne.add(u), n !== null ? n.push(u) : kt(u);
      }
    }
}
function ue(e) {
  if (typeof e != "object" || e === null || lt in e)
    return e;
  const t = Zt(e);
  if (t !== rr && t !== ir)
    return e;
  var n = /* @__PURE__ */ new Map(), r = Xt(e), i = /* @__PURE__ */ D(0), s = ye, l = (f) => {
    if (ye === s)
      return f();
    var a = b, o = ye;
    G(null), Lt(s);
    var u = f();
    return G(a), Lt(o), u;
  };
  return r && n.set("length", /* @__PURE__ */ D(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(f, a, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && _r();
        var u = n.get(a);
        return u === void 0 ? l(() => {
          var p = /* @__PURE__ */ D(o.value);
          return n.set(a, p), p;
        }) : E(u, o.value, !0), !0;
      },
      deleteProperty(f, a) {
        var o = n.get(a);
        if (o === void 0) {
          if (a in f) {
            const u = l(() => /* @__PURE__ */ D(R));
            n.set(a, u), Be(i);
          }
        } else
          E(o, R), Be(i);
        return !0;
      },
      get(f, a, o) {
        if (a === lt)
          return e;
        var u = n.get(a), p = a in f;
        if (u === void 0 && (!p || Ve(f, a)?.writable) && (u = l(() => {
          var _ = ue(p ? f[a] : R), h = /* @__PURE__ */ D(_);
          return h;
        }), n.set(a, u)), u !== void 0) {
          var c = d(u);
          return c === R ? void 0 : c;
        }
        return Reflect.get(f, a, o);
      },
      getOwnPropertyDescriptor(f, a) {
        var o = Reflect.getOwnPropertyDescriptor(f, a);
        if (o && "value" in o) {
          var u = n.get(a);
          u && (o.value = d(u));
        } else if (o === void 0) {
          var p = n.get(a), c = p?.v;
          if (p !== void 0 && c !== R)
            return {
              enumerable: !0,
              configurable: !0,
              value: c,
              writable: !0
            };
        }
        return o;
      },
      has(f, a) {
        if (a === lt)
          return !0;
        var o = n.get(a), u = o !== void 0 && o.v !== R || Reflect.has(f, a);
        if (o !== void 0 || w !== null && (!u || Ve(f, a)?.writable)) {
          o === void 0 && (o = l(() => {
            var c = u ? ue(f[a]) : R, _ = /* @__PURE__ */ D(c);
            return _;
          }), n.set(a, o));
          var p = d(o);
          if (p === R)
            return !1;
        }
        return u;
      },
      set(f, a, o, u) {
        var p = n.get(a), c = a in f;
        if (r && a === "length")
          for (var _ = o; _ < /** @type {Source<number>} */
          p.v; _ += 1) {
            var h = n.get(_ + "");
            h !== void 0 ? E(h, R) : _ in f && (h = l(() => /* @__PURE__ */ D(R)), n.set(_ + "", h));
          }
        if (p === void 0)
          (!c || Ve(f, a)?.writable) && (p = l(() => /* @__PURE__ */ D(void 0)), E(p, ue(o)), n.set(a, p));
        else {
          c = p.v !== R;
          var g = l(() => ue(o));
          E(p, g);
        }
        var v = Reflect.getOwnPropertyDescriptor(f, a);
        if (v?.set && v.set.call(u, o), !c) {
          if (r && typeof a == "string") {
            var m = (
              /** @type {Source<number>} */
              n.get("length")
            ), S = Number(a);
            Number.isInteger(S) && S >= m.v && E(m, S + 1);
          }
          Be(i);
        }
        return !0;
      },
      ownKeys(f) {
        d(i);
        var a = Reflect.ownKeys(f).filter((p) => {
          var c = n.get(p);
          return c === void 0 || c.v !== R;
        });
        for (var [o, u] of n)
          u.v !== R && !(o in f) && a.push(o);
        return a;
      },
      setPrototypeOf() {
        gr();
      }
    }
  );
}
var jt, bn, wn, yn;
function Ur() {
  if (jt === void 0) {
    jt = window, bn = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    wn = Ve(t, "firstChild").get, yn = Ve(t, "nextSibling").get, Rt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Rt(n) && (n.__t = void 0);
  }
}
function ve(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function et(e) {
  return (
    /** @type {TemplateNode | null} */
    wn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function Ke(e) {
  return (
    /** @type {TemplateNode | null} */
    yn.call(e)
  );
}
function O(e, t) {
  return /* @__PURE__ */ et(e);
}
function pt(e, t = !1) {
  {
    var n = /* @__PURE__ */ et(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ Ke(n) : n;
  }
}
function ie(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ Ke(r);
  return r;
}
function Gr(e) {
  e.textContent = "";
}
function En() {
  return !1;
}
function xn(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(en, e, void 0)
  );
}
function kn(e) {
  var t = b, n = w;
  G(null), te(null);
  try {
    return e();
  } finally {
    G(t), te(n);
  }
}
function Kr(e) {
  w === null && (b === null && hr(), vr()), Se && dr();
}
function Wr(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function se(e, t) {
  var n = w;
  n !== null && (n.f & L) !== 0 && (e |= L);
  var r = {
    ctx: Y,
    deps: null,
    nodes: null,
    f: e | P | B,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: n,
    b: n && n.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  }, i = r;
  if ((e & Re) !== 0)
    Ne !== null ? Ne.push(r) : he.ensure().schedule(r);
  else if (t !== null) {
    try {
      ze(r);
    } catch (l) {
      throw j(r), l;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Pe) === 0 && (i = i.first, (e & pe) !== 0 && (e & xe) !== 0 && i !== null && (i.f |= xe));
  }
  if (i !== null && (i.parent = n, n !== null && Wr(i, n), b !== null && (b.f & F) !== 0 && (e & Ee) === 0)) {
    var s = (
      /** @type {Derived} */
      b
    );
    (s.effects ??= []).push(i);
  }
  return r;
}
function Mt() {
  return b !== null && !W;
}
function Xr(e) {
  const t = se(nt, null);
  return M(t, C), t.teardown = e, t;
}
function Tn(e) {
  Kr();
  var t = (
    /** @type {Effect} */
    w.f
  ), n = !b && (t & Z) !== 0 && (t & Me) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      Y
    );
    (r.e ??= []).push(e);
  } else
    return Sn(e);
}
function Sn(e) {
  return se(Re | fr, e);
}
function Zr(e) {
  he.ensure();
  const t = se(Ee | Pe, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? we(t, () => {
      j(t), r(void 0);
    }) : (j(t), r(void 0));
  });
}
function Jr(e) {
  return se(Re, e);
}
function Qr(e) {
  return se(Et | Pe, e);
}
function $r(e, t = 0) {
  return se(nt | t, e);
}
function Ue(e, t = [], n = [], r = []) {
  Pr(r, t, n, (i) => {
    se(nt, () => e(...i.map(d)));
  });
}
function rt(e, t = 0) {
  var n = se(pe | t, e);
  return n;
}
function V(e) {
  return se(Z | Pe, e);
}
function Mn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Se, r = b;
    qt(!0), G(null);
    try {
      t.call(null);
    } finally {
      qt(n), G(r);
    }
  }
}
function At(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && kn(() => {
      i.abort(re);
    });
    var r = n.next;
    (n.f & Ee) !== 0 ? n.parent = null : j(n, t), n = r;
  }
}
function ei(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Z) === 0 && j(t), t = n;
  }
}
function j(e, t = !0) {
  var n = !1;
  (t || (e.f & ar) !== 0) && e.nodes !== null && e.nodes.end !== null && (ti(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), M(e, Dt), At(e, t && !n), Ge(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Mn(e), e.f ^= Dt, e.f |= X;
  var i = e.parent;
  i !== null && i.first !== null && An(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function ti(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ Ke(e);
    e.remove(), e = n;
  }
}
function An(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function we(e, t, n = !0) {
  var r = [];
  Cn(e, r, !0);
  var i = () => {
    n && j(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var l = () => --s || i();
    for (var f of r)
      f.out(l);
  } else
    i();
}
function Cn(e, t, n) {
  if ((e.f & L) === 0) {
    e.f ^= L;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const f of r)
        (f.is_global || n) && t.push(f);
    for (var i = e.first; i !== null; ) {
      var s = i.next, l = (i.f & xe) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & Z) !== 0 && (e.f & pe) !== 0;
      Cn(i, t, l ? n : !1), i = s;
    }
  }
}
function Ct(e) {
  Nn(e, !0);
}
function Nn(e, t) {
  if ((e.f & L) !== 0) {
    e.f ^= L, (e.f & C) === 0 && (M(e, P), he.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & xe) !== 0 || (n.f & Z) !== 0;
      Nn(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const l of s)
        (l.is_global || t) && l.in();
  }
}
function Nt(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ Ke(n);
      t.append(n), n = i;
    }
}
let Qe = !1, Se = !1;
function qt(e) {
  Se = e;
}
let b = null, W = !1;
function G(e) {
  b = e;
}
let w = null;
function te(e) {
  w = e;
}
let U = null;
function Fn(e) {
  b !== null && (U === null ? U = [e] : U.push(e));
}
let I = null, q = 0, H = null;
function ni(e) {
  H = e;
}
let Rn = 1, ge = 0, ye = ge;
function Lt(e) {
  ye = e;
}
function Dn() {
  return ++Rn;
}
function We(e) {
  var t = e.f;
  if ((t & P) !== 0)
    return !0;
  if (t & F && (e.f &= ~ke), (t & ee) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (We(
        /** @type {Derived} */
        s
      ) && pn(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & B) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    K === null && M(e, C);
  }
  return !1;
}
function On(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(U !== null && Fe.call(U, e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & F) !== 0 ? On(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? M(s, P) : (s.f & C) !== 0 && M(s, ee), kt(
        /** @type {Effect} */
        s
      ));
    }
}
function zn(e) {
  var t = I, n = q, r = H, i = b, s = U, l = Y, f = W, a = ye, o = e.f;
  I = /** @type {null | Value[]} */
  null, q = 0, H = null, b = (o & (Z | Ee)) === 0 ? e : null, U = null, De(e.ctx), W = !1, ye = ++ge, e.ac !== null && (kn(() => {
    e.ac.abort(re);
  }), e.ac = null);
  try {
    e.f |= dt;
    var u = (
      /** @type {Function} */
      e.fn
    ), p = u();
    e.f |= Me;
    var c = e.deps, _ = k?.is_fork;
    if (I !== null) {
      var h;
      if (_ || Ge(e, q), c !== null && q > 0)
        for (c.length = q + I.length, h = 0; h < I.length; h++)
          c[q + h] = I[h];
      else
        e.deps = c = I;
      if (Mt() && (e.f & B) !== 0)
        for (h = q; h < c.length; h++)
          (c[h].reactions ??= []).push(e);
    } else !_ && c !== null && q < c.length && (Ge(e, q), c.length = q);
    if (ln() && H !== null && !W && c !== null && (e.f & (F | ee | P)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      H.length; h++)
        On(
          H[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (ge++, i.deps !== null)
        for (let g = 0; g < n; g += 1)
          i.deps[g].rv = ge;
      if (t !== null)
        for (const g of t)
          g.rv = ge;
      H !== null && (r === null ? r = H : r.push(.../** @type {Source[]} */
      H));
    }
    return (e.f & ce) !== 0 && (e.f ^= ce), p;
  } catch (g) {
    return an(g);
  } finally {
    e.f ^= dt, I = t, q = n, H = r, b = i, U = s, De(l), W = f, ye = a;
  }
}
function ri(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = er.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & F) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (I === null || !Fe.call(I, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & B) !== 0 && (s.f ^= B, s.f &= ~ke), xt(s), Hr(s), Ge(s, 0);
  }
}
function Ge(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      ri(e, n[r]);
}
function ze(e) {
  var t = e.f;
  if ((t & X) === 0) {
    M(e, C);
    var n = w, r = Qe;
    w = e, Qe = !0;
    try {
      (t & (pe | Qt)) !== 0 ? ei(e) : At(e), Mn(e);
      var i = zn(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Rn;
      var s;
    } finally {
      Qe = r, w = n;
    }
  }
}
function d(e) {
  var t = e.f, n = (t & F) !== 0;
  if (b !== null && !W) {
    var r = w !== null && (w.f & X) !== 0;
    if (!r && (U === null || !Fe.call(U, e))) {
      var i = b.deps;
      if ((b.f & dt) !== 0)
        e.rv < ge && (e.rv = ge, I === null && i !== null && i[q] === e ? q++ : I === null ? I = [e] : I.push(e));
      else {
        (b.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [b] : Fe.call(s, b) || s.push(b);
      }
    }
  }
  if (Se && de.has(e))
    return de.get(e);
  if (n) {
    var l = (
      /** @type {Derived} */
      e
    );
    if (Se) {
      var f = l.v;
      return ((l.f & C) === 0 && l.reactions !== null || In(l)) && (f = St(l)), de.set(l, f), f;
    }
    var a = (l.f & B) === 0 && !W && b !== null && (Qe || (b.f & B) !== 0), o = (l.f & Me) === 0;
    We(l) && (a && (l.f |= B), pn(l)), a && !o && (_n(l), Pn(l));
  }
  if (K?.has(e))
    return K.get(e);
  if ((e.f & ce) !== 0)
    throw e.v;
  return e.v;
}
function Pn(e) {
  if (e.f |= B, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & F) !== 0 && (t.f & B) === 0 && (_n(
        /** @type {Derived} */
        t
      ), Pn(
        /** @type {Derived} */
        t
      ));
}
function In(e) {
  if (e.v === R) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (de.has(t) || (t.f & F) !== 0 && In(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function jn(e) {
  var t = W;
  try {
    return W = !0, e();
  } finally {
    W = t;
  }
}
const ii = ["touchstart", "touchmove"];
function si(e) {
  return ii.includes(e);
}
const Ye = /* @__PURE__ */ Symbol("events"), qn = /* @__PURE__ */ new Set(), _t = /* @__PURE__ */ new Set();
function gt(e, t, n) {
  (t[Ye] ??= {})[e] = n;
}
function Ln(e) {
  for (var t = 0; t < e.length; t++)
    qn.add(e[t]);
  for (var n of _t)
    n(e);
}
let Yt = null;
function Ht(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = e.composedPath?.() || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Yt = e;
  var l = 0, f = Yt === e && e[Ye];
  if (f) {
    var a = i.indexOf(f);
    if (a !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Ye] = t;
      return;
    }
    var o = i.indexOf(t);
    if (o === -1)
      return;
    a <= o && (l = a);
  }
  if (s = /** @type {Element} */
  i[l] || e.target, s !== t) {
    tr(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var u = b, p = w;
    G(null), te(null);
    try {
      for (var c, _ = []; s !== null; ) {
        var h = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var g = s[Ye]?.[r];
          g != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && g.call(s, e);
        } catch (v) {
          c ? _.push(v) : c = v;
        }
        if (e.cancelBubble || h === t || h === null)
          break;
        s = h;
      }
      if (c) {
        for (let v of _)
          queueMicrotask(() => {
            throw v;
          });
        throw c;
      }
    } finally {
      e[Ye] = t, delete e.currentTarget, G(u), te(p);
    }
  }
}
const li = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function ai(e) {
  return (
    /** @type {string} */
    li?.createHTML(e) ?? e
  );
}
function fi(e) {
  var t = xn("template");
  return t.innerHTML = ai(e.replaceAll("<!>", "<!---->")), t.content;
}
function mt(e, t) {
  var n = (
    /** @type {Effect} */
    w
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function _e(e, t) {
  var n = (t & kr) !== 0, r = (t & Tr) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = fi(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ et(i)));
    var l = (
      /** @type {TemplateNode} */
      r || bn ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ et(l)
      ), a = (
        /** @type {TemplateNode} */
        l.lastChild
      );
      mt(f, a);
    } else
      mt(l, l);
    return l;
  };
}
function Vt() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = ve();
  return e.append(t, n), mt(t, n), e;
}
function Q(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function me(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = `${n}`);
}
function oi(e, t) {
  return ui(e, t);
}
const Ze = /* @__PURE__ */ new Map();
function ui(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: l = !0, transformError: f }) {
  Ur();
  var a = void 0, o = Zr(() => {
    var u = n ?? t.appendChild(ve());
    Or(
      /** @type {TemplateNode} */
      u,
      {
        pending: () => {
        }
      },
      (_) => {
        rn({});
        var h = (
          /** @type {ComponentContext} */
          Y
        );
        s && (h.c = s), i && (r.$$events = i), a = e(_, r) || {}, sn();
      },
      f
    );
    var p = /* @__PURE__ */ new Set(), c = (_) => {
      for (var h = 0; h < _.length; h++) {
        var g = _[h];
        if (!p.has(g)) {
          p.add(g);
          var v = si(g);
          for (const x of [t, document]) {
            var m = Ze.get(x);
            m === void 0 && (m = /* @__PURE__ */ new Map(), Ze.set(x, m));
            var S = m.get(g);
            S === void 0 ? (x.addEventListener(g, Ht, { passive: v }), m.set(g, 1)) : m.set(g, S + 1);
          }
        }
      }
    };
    return c(tt(qn)), _t.add(c), () => {
      for (var _ of p)
        for (const v of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            Ze.get(v)
          ), g = (
            /** @type {number} */
            h.get(_)
          );
          --g == 0 ? (v.removeEventListener(_, Ht), h.delete(_), h.size === 0 && Ze.delete(v)) : h.set(_, g);
        }
      _t.delete(c), u !== n && u.parentNode?.removeChild(u);
    };
  });
  return bt.set(a, o), a;
}
let bt = /* @__PURE__ */ new WeakMap();
function ci(e, t) {
  const n = bt.get(e);
  return n ? (bt.delete(e), n(t)) : Promise.resolve();
}
class Yn {
  /** @type {TemplateNode} */
  anchor;
  /** @type {Map<Batch, Key>} */
  #t = /* @__PURE__ */ new Map();
  /**
   * Map of keys to effects that are currently rendered in the DOM.
   * These effects are visible and actively part of the document tree.
   * Example:
   * ```
   * {#if condition}
   * 	foo
   * {:else}
   * 	bar
   * {/if}
   * ```
   * Can result in the entries `true->Effect` and `false->Effect`
   * @type {Map<Key, Effect>}
   */
  #f = /* @__PURE__ */ new Map();
  /**
   * Similar to #onscreen with respect to the keys, but contains branches that are not yet
   * in the DOM, because their insertion is deferred.
   * @type {Map<Key, Branch>}
   */
  #e = /* @__PURE__ */ new Map();
  /**
   * Keys of effects that are currently outroing
   * @type {Set<Key>}
   */
  #r = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #i = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    this.anchor = t, this.#i = n;
  }
  /**
   * @param {Batch} batch
   */
  #n = (t) => {
    if (this.#t.has(t)) {
      var n = (
        /** @type {Key} */
        this.#t.get(t)
      ), r = this.#f.get(n);
      if (r)
        Ct(r), this.#r.delete(n);
      else {
        var i = this.#e.get(n);
        i && (this.#f.set(n, i.effect), this.#e.delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
      }
      for (const [s, l] of this.#t) {
        if (this.#t.delete(s), s === t)
          break;
        const f = this.#e.get(l);
        f && (j(f.effect), this.#e.delete(l));
      }
      for (const [s, l] of this.#f) {
        if (s === n || this.#r.has(s)) continue;
        const f = () => {
          if (Array.from(this.#t.values()).includes(s)) {
            var o = document.createDocumentFragment();
            Nt(l, o), o.append(ve()), this.#e.set(s, { effect: l, fragment: o });
          } else
            j(l);
          this.#r.delete(s), this.#f.delete(s);
        };
        this.#i || !r ? (this.#r.add(s), we(l, f, !1)) : f();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #s = (t) => {
    this.#t.delete(t);
    const n = Array.from(this.#t.values());
    for (const [r, i] of this.#e)
      n.includes(r) || (j(i.effect), this.#e.delete(r));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      k
    ), i = En();
    if (n && !this.#f.has(t) && !this.#e.has(t))
      if (i) {
        var s = document.createDocumentFragment(), l = ve();
        s.append(l), this.#e.set(t, {
          effect: V(() => n(l)),
          fragment: s
        });
      } else
        this.#f.set(
          t,
          V(() => n(this.anchor))
        );
    if (this.#t.set(r, t), i) {
      for (const [f, a] of this.#f)
        f === t ? r.unskip_effect(a) : r.skip_effect(a);
      for (const [f, a] of this.#e)
        f === t ? r.unskip_effect(a.effect) : r.skip_effect(a.effect);
      r.oncommit(this.#n), r.ondiscard(this.#s);
    } else
      this.#n(r);
  }
}
function Bt(e, t, n = !1) {
  var r = new Yn(e), i = n ? xe : 0;
  function s(l, f) {
    r.ensure(l, f);
  }
  rt(() => {
    var l = !1;
    t((f, a = 0) => {
      l = !0, s(a, f);
    }), l || s(-1, null);
  }, i);
}
function di(e, t) {
  return t;
}
function vi(e, t, n) {
  for (var r = [], i = t.length, s, l = t.length, f = 0; f < i; f++) {
    let p = t[f];
    we(
      p,
      () => {
        if (s) {
          if (s.pending.delete(p), s.done.add(p), s.pending.size === 0) {
            var c = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            wt(e, tt(s.done)), c.delete(s), c.size === 0 && (e.outrogroups = null);
          }
        } else
          l -= 1;
      },
      !1
    );
  }
  if (l === 0) {
    var a = r.length === 0 && n !== null;
    if (a) {
      var o = (
        /** @type {Element} */
        n
      ), u = (
        /** @type {Element} */
        o.parentNode
      );
      Gr(u), u.append(o), e.items.clear();
    }
    wt(e, t, !a);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(s);
}
function wt(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const l of e.pending.values())
      for (const f of l)
        r.add(
          /** @type {EachItem} */
          e.items.get(f).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r?.has(s)) {
      s.f |= $;
      const l = document.createDocumentFragment();
      Nt(s, l);
    } else
      j(t[i], n);
  }
}
var Ut;
function Hn(e, t, n, r, i, s = null) {
  var l = e, f = /* @__PURE__ */ new Map(), a = (t & $t) !== 0;
  if (a) {
    var o = (
      /** @type {Element} */
      e
    );
    l = o.appendChild(ve());
  }
  var u = null, p = /* @__PURE__ */ qr(() => {
    var x = n();
    return Xt(x) ? x : x == null ? [] : tt(x);
  }), c, _ = /* @__PURE__ */ new Map(), h = !0;
  function g(x) {
    (S.effect.f & X) === 0 && (S.pending.delete(x), S.fallback = u, hi(S, c, l, t, r), u !== null && (c.length === 0 ? (u.f & $) === 0 ? Ct(u) : (u.f ^= $, He(u, null, l)) : we(u, () => {
      u = null;
    })));
  }
  function v(x) {
    S.pending.delete(x);
  }
  var m = rt(() => {
    c = /** @type {V[]} */
    d(p);
    for (var x = c.length, y = /* @__PURE__ */ new Set(), A = (
      /** @type {Batch} */
      k
    ), z = En(), T = 0; T < x; T += 1) {
      var J = c[T], le = r(J, T), N = h ? null : f.get(le);
      N ? (N.v && Oe(N.v, J), N.i && Oe(N.i, T), z && A.unskip_effect(N.e)) : (N = pi(
        f,
        h ? l : Ut ??= ve(),
        J,
        le,
        T,
        i,
        t,
        n
      ), h || (N.e.f |= $), f.set(le, N)), y.add(le);
    }
    if (x === 0 && s && !u && (h ? u = V(() => s(l)) : (u = V(() => s(Ut ??= ve())), u.f |= $)), x > y.size && cr(), !h)
      if (_.set(A, y), z) {
        for (const [it, Ie] of f)
          y.has(it) || A.skip_effect(Ie.e);
        A.oncommit(g), A.ondiscard(v);
      } else
        g(A);
    d(p);
  }), S = { effect: m, items: f, pending: _, outrogroups: null, fallback: u };
  h = !1;
}
function Le(e) {
  for (; e !== null && (e.f & Z) === 0; )
    e = e.next;
  return e;
}
function hi(e, t, n, r, i) {
  var s = (r & Er) !== 0, l = t.length, f = e.items, a = Le(e.effect.first), o, u = null, p, c = [], _ = [], h, g, v, m;
  if (s)
    for (m = 0; m < l; m += 1)
      h = t[m], g = i(h, m), v = /** @type {EachItem} */
      f.get(g).e, (v.f & $) === 0 && (v.nodes?.a?.measure(), (p ??= /* @__PURE__ */ new Set()).add(v));
  for (m = 0; m < l; m += 1) {
    if (h = t[m], g = i(h, m), v = /** @type {EachItem} */
    f.get(g).e, e.outrogroups !== null)
      for (const N of e.outrogroups)
        N.pending.delete(v), N.done.delete(v);
    if ((v.f & L) !== 0 && (Ct(v), s && (v.nodes?.a?.unfix(), (p ??= /* @__PURE__ */ new Set()).delete(v))), (v.f & $) !== 0)
      if (v.f ^= $, v === a)
        He(v, null, n);
      else {
        var S = u ? u.next : a;
        v === e.effect.last && (e.effect.last = v.prev), v.prev && (v.prev.next = v.next), v.next && (v.next.prev = v.prev), fe(e, u, v), fe(e, v, S), He(v, S, n), u = v, c = [], _ = [], a = Le(u.next);
        continue;
      }
    if (v !== a) {
      if (o !== void 0 && o.has(v)) {
        if (c.length < _.length) {
          var x = _[0], y;
          u = x.prev;
          var A = c[0], z = c[c.length - 1];
          for (y = 0; y < c.length; y += 1)
            He(c[y], x, n);
          for (y = 0; y < _.length; y += 1)
            o.delete(_[y]);
          fe(e, A.prev, z.next), fe(e, u, A), fe(e, z, x), a = x, u = z, m -= 1, c = [], _ = [];
        } else
          o.delete(v), He(v, a, n), fe(e, v.prev, v.next), fe(e, v, u === null ? e.effect.first : u.next), fe(e, u, v), u = v;
        continue;
      }
      for (c = [], _ = []; a !== null && a !== v; )
        (o ??= /* @__PURE__ */ new Set()).add(a), _.push(a), a = Le(a.next);
      if (a === null)
        continue;
    }
    (v.f & $) === 0 && c.push(v), u = v, a = Le(v.next);
  }
  if (e.outrogroups !== null) {
    for (const N of e.outrogroups)
      N.pending.size === 0 && (wt(e, tt(N.done)), e.outrogroups?.delete(N));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (a !== null || o !== void 0) {
    var T = [];
    if (o !== void 0)
      for (v of o)
        (v.f & L) === 0 && T.push(v);
    for (; a !== null; )
      (a.f & L) === 0 && a !== e.fallback && T.push(a), a = Le(a.next);
    var J = T.length;
    if (J > 0) {
      var le = (r & $t) !== 0 && l === 0 ? n : null;
      if (s) {
        for (m = 0; m < J; m += 1)
          T[m].nodes?.a?.measure();
        for (m = 0; m < J; m += 1)
          T[m].nodes?.a?.fix();
      }
      vi(e, T, le);
    }
  }
  s && be(() => {
    if (p !== void 0)
      for (v of p)
        v.nodes?.a?.apply();
  });
}
function pi(e, t, n, r, i, s, l, f) {
  var a = (l & wr) !== 0 ? (l & xr) === 0 ? /* @__PURE__ */ Vr(n, !1, !1) : Te(n) : null, o = (l & yr) !== 0 ? Te(i) : null;
  return {
    v: a,
    i: o,
    e: V(() => (s(t, a ?? n, o ?? i, f), () => {
      e.delete(r);
    }))
  };
}
function He(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & $) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ Ke(r)
      );
      if (s.before(r), r === i)
        return;
      r = l;
    }
}
function fe(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function yt(e, t, ...n) {
  var r = new Yn(e);
  rt(() => {
    const i = t() ?? null;
    r.ensure(i, i && ((s) => i(s, ...n)));
  }, xe);
}
function Vn(e, t) {
  Jr(() => {
    var n = e.getRootNode(), r = (
      /** @type {ShadowRoot} */
      n.host ? (
        /** @type {ShadowRoot} */
        n
      ) : (
        /** @type {Document} */
        n.head ?? /** @type {Document} */
        n.ownerDocument.head
      )
    );
    if (!r.querySelector("#" + t.hash)) {
      const i = xn("style");
      i.id = t.hash, i.textContent = t.code, r.appendChild(i);
    }
  });
}
const Gt = [...` 	
\r\f \v\uFEFF`];
function _i(e, t, n) {
  var r = "" + e;
  if (n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, l = 0; (l = r.indexOf(i, l)) >= 0; ) {
          var f = l + s;
          (l === 0 || Gt.includes(r[l - 1])) && (f === r.length || Gt.includes(r[f])) ? r = (l === 0 ? "" : r.substring(0, l)) + r.substring(f + 1) : l = f;
        }
  }
  return r === "" ? null : r;
}
function Kt(e, t = !1) {
  var n = t ? " !important;" : ";", r = "";
  for (var i of Object.keys(e)) {
    var s = e[i];
    s != null && s !== "" && (r += " " + i + ": " + s + n);
  }
  return r;
}
function gi(e, t) {
  if (t) {
    var n = "", r, i;
    return Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, r && (n += Kt(r)), i && (n += Kt(i, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(e);
}
function mi(e, t, n, r, i, s) {
  var l = e.__className;
  if (l !== n || l === void 0) {
    var f = _i(n, r, s);
    f == null ? e.removeAttribute("class") : e.className = f, e.__className = n;
  } else if (s && i !== s)
    for (var a in s) {
      var o = !!s[a];
      (i == null || o !== !!i[a]) && e.classList.toggle(a, o);
    }
  return s;
}
function ft(e, t = {}, n, r) {
  for (var i in n) {
    var s = n[i];
    t[i] !== s && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, s, r));
  }
}
function Bn(e, t, n, r) {
  var i = e.__style;
  if (i !== t) {
    var s = gi(t, r);
    s == null ? e.removeAttribute("style") : e.style.cssText = s, e.__style = t;
  } else r && (Array.isArray(r) ? (ft(e, n?.[0], r[0]), ft(e, n?.[1], r[1], "important")) : ft(e, n, r));
  return r;
}
const bi = /* @__PURE__ */ Symbol("is custom element"), wi = /* @__PURE__ */ Symbol("is html");
function yi(e, t, n, r) {
  var i = Ei(e);
  i[t] !== (i[t] = n) && (n == null ? e.removeAttribute(t) : typeof n != "string" && xi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ei(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [bi]: e.nodeName.includes("-"),
      [wi]: e.namespaceURI === en
    }
  );
}
var Wt = /* @__PURE__ */ new Map();
function xi(e) {
  var t = e.getAttribute("is") || e.nodeName, n = Wt.get(t);
  if (n) return n;
  Wt.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = nr(i);
    for (var l in r)
      r[l].set && n.push(l);
    i = Zt(i);
  }
  return n;
}
function ot(e, t, n, r) {
  var i = (
    /** @type {V} */
    r
  ), s = !0, l = () => (s && (s = !1, i = /** @type {V} */
  r), i), f;
  f = /** @type {V} */
  e[t], f === void 0 && r !== void 0 && (f = l());
  var a;
  return a = () => {
    var o = (
      /** @type {V} */
      e[t]
    );
    return o === void 0 ? l() : (s = !0, o);
  }, a;
}
function ki(e) {
  Y === null && or(), Tn(() => {
    const t = jn(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
const Ti = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Ti);
async function Si(e, t, n) {
  const r = await e.state.get(t);
  return r ? { ...n, ...r } : { ...n };
}
function Un(e) {
  const t = [...e];
  for (let n = t.length - 1; n > 0; n--) {
    const r = Math.floor(Math.random() * (n + 1));
    [t[n], t[r]] = [t[r], t[n]];
  }
  return t;
}
var Mi = /* @__PURE__ */ _e('<button><div class="flip-card-inner svelte-9334zb"><div class="flip-card-front analog-card svelte-9334zb"><!></div> <div class="flip-card-back analog-card analog-card-back svelte-9334zb"><!></div></div></button>');
const Ai = {
  hash: "svelte-9334zb",
  code: `.flip-card.svelte-9334zb {perspective:600px;background:transparent;border:none;padding:0;cursor:pointer;outline:none;will-change:transform;-webkit-tap-highlight-color:transparent;}.flip-card.svelte-9334zb:disabled {cursor:default;}.flip-card-inner.svelte-9334zb {position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 400ms cubic-bezier(0.4, 0, 0.2, 1);}.flip-card.flipped.svelte-9334zb .flip-card-inner:where(.svelte-9334zb) {transform:rotateY(180deg);}.flip-card.matched.svelte-9334zb .flip-card-inner:where(.svelte-9334zb) {
		animation: analog-match-pulse 350ms ease;}.flip-card.svelte-9334zb:not(:disabled):hover .flip-card-inner:where(.svelte-9334zb) {box-shadow:var(--card-shadow-lifted);transform:translateY(-2px);}.flip-card:not(:disabled).flipped.svelte-9334zb:hover .flip-card-inner:where(.svelte-9334zb) {transform:rotateY(180deg) translateY(-2px);}.flip-card-front.svelte-9334zb,
	.flip-card-back.svelte-9334zb {position:absolute;inset:0;backface-visibility:hidden;display:flex;align-items:center;justify-content:center;border-radius:8px;overflow:hidden;}.flip-card-front.svelte-9334zb {transform:rotateY(180deg);}.flip-card.matched.svelte-9334zb .flip-card-front:where(.svelte-9334zb) {box-shadow:0 0 12px color-mix(in srgb, var(--box-correct, #5cb878) 30%, transparent),
			var(--card-shadow);}`
};
function Ci(e, t) {
  Vn(e, Ai);
  let n = ot(t, "flipped", 3, !1), r = ot(t, "matched", 3, !1), i = ot(t, "disabled", 3, !1);
  var s = Mi();
  let l;
  var f = O(s), a = O(f), o = O(a);
  yt(o, () => t.front);
  var u = ie(a, 2), p = O(u);
  yt(p, () => t.back), Ue(() => {
    l = mi(s, 1, "flip-card svelte-9334zb", null, l, { flipped: n(), matched: r() }), s.disabled = i(), yi(s, "aria-label", n() ? "Card face up" : "Card face down");
  }), gt("click", s, function(...c) {
    t.onclick?.apply(this, c);
  }), Q(e, s);
}
Ln(["click"]);
var Ni = /* @__PURE__ */ _e('<div class="box-stat-cell"><span class="box-stat-num"> </span> <span class="box-stat-tag"> </span></div>'), Fi = /* @__PURE__ */ _e('<p class="box-lifetime"> </p>'), Ri = /* @__PURE__ */ _e('<div class="box-summary"><p class="box-summary-heading">Done</p> <div class="box-stat-grid"></div> <!> <div class="box-results-actions"><button class="box-results-btn">Again</button> <button class="box-results-btn primary">Continue</button></div></div>');
function Di(e, t) {
  var n = Vt(), r = pt(n);
  {
    var i = (l) => {
      var f = Vt(), a = pt(f);
      yt(a, () => t.children), Q(l, f);
    }, s = (l) => {
      var f = Ri(), a = ie(O(f), 2);
      Hn(a, 21, () => t.stats, di, (h, g, v) => {
        var m = Ni();
        Bn(m, "", {}, { "animation-delay": `${v * 80}ms` });
        var S = O(m), x = O(S), y = ie(S, 2), A = O(y);
        Ue(() => {
          me(x, d(g).value), me(A, d(g).label);
        }), Q(h, m);
      });
      var o = ie(a, 2);
      {
        var u = (h) => {
          var g = Fi(), v = O(g);
          Ue(() => me(v, t.lifetime)), Q(h, g);
        };
        Bt(o, (h) => {
          t.lifetime && h(u);
        });
      }
      var p = ie(o, 2), c = O(p), _ = ie(c, 2);
      gt("click", c, function(...h) {
        t.onAgain?.apply(this, h);
      }), gt("click", _, function(...h) {
        t.onContinue?.apply(this, h);
      }), Q(l, f);
    };
    Bt(r, (l) => {
      t.phase === "playing" ? l(i) : l(s, -1);
    });
  }
  Q(e, n);
}
Ln(["click"]);
function ut(e, t = "seconds") {
  if (t === "clock") {
    const n = Math.floor(e / 1e3), r = Math.floor(n / 60), i = n % 60;
    return `${r}:${i.toString().padStart(2, "0")}`;
  }
  return (e / 1e3).toFixed(1) + "s";
}
function Oi(e, t, n = "—") {
  return e == null ? n : t ? `${e}${t}` : String(e);
}
const zi = [
  "🐶",
  "🐱",
  "🐭",
  "🐰",
  "🦊",
  "🐻",
  "🐧",
  "🦉",
  "🦋",
  "🐢",
  "🐙",
  "🦀",
  "🌻",
  "🌵",
  "🌟",
  "🌈",
  "🔥",
  "🌊",
  "🎲",
  "📚",
  "🔑",
  "💎",
  "🎯",
  "🧩"
];
function Pi(e) {
  return Un([...zi]).slice(0, e);
}
function Ii(e) {
  switch (e) {
    case 4:
      return { cols: 4, rows: 2 };
    case 6:
      return { cols: 4, rows: 3 };
    case 8:
      return { cols: 4, rows: 4 };
    case 10:
      return { cols: 5, rows: 4 };
    case 12:
      return { cols: 6, rows: 4 };
    default:
      return { cols: 4, rows: 3 };
  }
}
var ji = /* @__PURE__ */ _e('<span class="card-symbol svelte-nqj6rm"> </span>'), qi = /* @__PURE__ */ _e('<span class="card-back-mark svelte-nqj6rm">?</span>'), Li = /* @__PURE__ */ _e('<div class="game-header svelte-nqj6rm"><span class="box-label"> </span> <span class="box-label"> </span></div> <div class="game-grid svelte-nqj6rm"></div> <p class="box-meta"> </p>', 1), Yi = /* @__PURE__ */ _e('<div class="box-container analog-paper"><!></div>');
const Hi = {
  hash: "svelte-nqj6rm",
  code: `.game-header.svelte-nqj6rm {display:flex;justify-content:space-between;width:100%;max-width:520px;}.game-grid.svelte-nqj6rm {display:grid;gap:8px;width:100%;justify-content:center;}.game-grid.svelte-nqj6rm .flip-card {aspect-ratio:3 / 4;width:100%;min-width:0;}.game-grid.svelte-nqj6rm .flip-card-front,
	.game-grid.svelte-nqj6rm .flip-card-back {width:100%;height:100%;}.card-symbol.svelte-nqj6rm {font-size:clamp(1.4rem, 4vw, 2.2rem);line-height:1;user-select:none;}.card-back-mark.svelte-nqj6rm {font-size:1.4rem;font-weight:300;color:color-mix(in srgb, var(--accent, #8a9bb8) 50%, transparent);user-select:none;}`
};
function Vi(e, t) {
  rn(t, !0), Vn(e, Hi);
  let n = /* @__PURE__ */ Ae(() => parseInt(t.ctx.settings.pairs, 10) || 6), r = /* @__PURE__ */ Ae(() => Ii(d(n))), i = /* @__PURE__ */ D(ue([])), s = /* @__PURE__ */ D(ue([])), l = /* @__PURE__ */ D(0), f = /* @__PURE__ */ D(0), a = /* @__PURE__ */ D(0), o = /* @__PURE__ */ D(0), u = /* @__PURE__ */ D("playing"), p = /* @__PURE__ */ D(!1), c = /* @__PURE__ */ D(ue({
    totalCompletions: 0,
    bestTimeMs: null,
    bestMoves: null,
    totalPairsFound: 0
  }));
  Tn(() => {
    if (d(u) !== "playing") return;
    const y = setInterval(
      () => {
        E(o, Date.now() - d(a));
      },
      100
    );
    return () => clearInterval(y);
  });
  function _() {
    const y = Pi(d(n)), A = Un([...y, ...y]).map((z, T) => ({ id: T, symbol: z, flipped: !1, matched: !1 }));
    E(i, A, !0), E(s, [], !0), E(l, 0), E(f, 0), E(a, Date.now(), !0), E(o, 0), E(u, "playing"), E(p, !1);
  }
  function h(y) {
    if (d(p) || d(i)[y].flipped || d(i)[y].matched || d(s).length >= 2) return;
    d(i)[y].flipped = !0;
    const A = [...d(s), y];
    if (E(s, A, !0), A.length === 2) {
      It(l);
      const [z, T] = A;
      d(i)[z].symbol === d(i)[T].symbol ? (d(i)[z].matched = !0, d(i)[T].matched = !0, It(f), E(s, [], !0), d(f) >= d(n) && g()) : (E(p, !0), setTimeout(
        () => {
          d(i)[z].flipped = !1, d(i)[T].flipped = !1, E(s, [], !0), E(p, !1);
        },
        800
      ));
    }
  }
  function g() {
    E(o, Date.now() - d(a)), d(c).totalCompletions++, d(c).totalPairsFound += d(n), (d(c).bestTimeMs == null || d(o) < d(c).bestTimeMs) && (d(c).bestTimeMs = d(o)), (d(c).bestMoves == null || d(l) < d(c).bestMoves) && (d(c).bestMoves = d(l)), E(c, { ...d(c) }, !0), t.ctx.state.set("memory-stats", d(c)), E(u, "done");
  }
  let v = /* @__PURE__ */ Ae(() => [
    { label: "time", value: ut(d(o)) },
    { label: "moves", value: String(d(l)) },
    {
      label: "best time",
      value: d(c).bestTimeMs != null ? ut(d(c).bestTimeMs) : "—"
    },
    {
      label: "best moves",
      value: Oi(d(c).bestMoves)
    }
  ]), m = /* @__PURE__ */ Ae(() => `${d(c).totalCompletions} game${d(c).totalCompletions === 1 ? "" : "s"} · ${d(c).totalPairsFound} pairs found`);
  ki(async () => {
    E(
      c,
      await Si(t.ctx, "memory-stats", {
        totalCompletions: 0,
        bestTimeMs: null,
        bestMoves: null,
        totalPairsFound: 0
      }),
      !0
    ), _();
  });
  var S = Yi(), x = O(S);
  Di(x, {
    get phase() {
      return d(u);
    },
    get stats() {
      return d(v);
    },
    get lifetime() {
      return d(m);
    },
    onAgain: _,
    onContinue: () => t.ctx.complete({ outcome: "completed" }),
    children: (A) => {
      var z = Li(), T = pt(z), J = O(T), le = O(J), N = ie(J, 2), it = O(N), Ie = ie(T, 2);
      let Ft;
      Hn(Ie, 23, () => d(i), (je) => je.id, (je, qe, Wn) => {
        {
          const Xn = (st) => {
            var Xe = ji(), $n = O(Xe);
            Ue(() => me($n, d(qe).symbol)), Q(st, Xe);
          }, Zn = (st) => {
            var Xe = qi();
            Q(st, Xe);
          };
          let Jn = /* @__PURE__ */ Ae(() => d(qe).flipped || d(qe).matched), Qn = /* @__PURE__ */ Ae(() => d(p) || d(qe).matched);
          Ci(je, {
            get flipped() {
              return d(Jn);
            },
            get matched() {
              return d(qe).matched;
            },
            get disabled() {
              return d(Qn);
            },
            onclick: () => h(d(Wn)),
            front: Xn,
            back: Zn,
            $$slots: { front: !0, back: !0 }
          });
        }
      });
      var Gn = ie(Ie, 2), Kn = O(Gn);
      Ue(
        (je) => {
          me(le, je), me(it, `${d(f) ?? ""}/${d(n) ?? ""} pairs`), Ft = Bn(Ie, "", Ft, {
            "grid-template-columns": `repeat(${d(r).cols ?? ""}, 1fr)`,
            "max-width": `${d(r).cols * 80 + (d(r).cols - 1) * 8}px`
          }), me(Kn, `${d(l) ?? ""} move${d(l) === 1 ? "" : "s"}`);
        },
        [() => ut(d(o), "clock")]
      ), Q(A, z);
    }
  }), Q(e, S), sn();
}
function Ui(e, t) {
  return oi(Vi, { target: e, props: t });
}
function Gi(e) {
  ci(e);
}
export {
  Ui as mountPlugin,
  Gi as unmountPlugin
};
