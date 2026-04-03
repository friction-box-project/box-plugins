var pn = Array.isArray, gr = Array.prototype.indexOf, Ie = Array.prototype.includes, ut = Array.from, br = Object.defineProperty, Xe = Object.getOwnPropertyDescriptor, mr = Object.getOwnPropertyDescriptors, wr = Object.prototype, xr = Array.prototype, _n = Object.getPrototypeOf, Zt = Object.isExtensible;
const yr = () => {
};
function Er(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function gn() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const M = 2, qe = 4, ct = 8, bn = 1 << 24, be = 16, ee = 32, ke = 64, Tt = 128, H = 512, T = 1024, z = 2048, ne = 4096, L = 8192, $ = 16384, Me = 32768, Qt = 1 << 25, Se = 65536, $t = 1 << 17, kr = 1 << 18, Ue = 1 << 19, Sr = 1 << 20, ae = 1 << 25, Te = 65536, At = 1 << 21, jt = 1 << 22, he = 1 << 23, yt = /* @__PURE__ */ Symbol("$state"), se = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Tr(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Ar() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Cr(e, t, n) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Mr(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Nr() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Or(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Rr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Pr() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function zr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Dr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Fr() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Ir = 1, qr = 2, Lr = 16, jr = 1, Yr = 2, N = /* @__PURE__ */ Symbol(), mn = "http://www.w3.org/1999/xhtml";
function Ur() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function wn(e) {
  return e === this.v;
}
function Vr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function xn(e) {
  return !Vr(e, this.v);
}
let j = null;
function Le(e) {
  j = e;
}
function yn(e, t = !1, n) {
  j = {
    p: j,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      m
    ),
    l: null
  };
}
function En(e) {
  var t = (
    /** @type {ComponentContext} */
    j
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Bn(r);
  }
  return t.i = !0, j = t.p, /** @type {T} */
  {};
}
function kn() {
  return !0;
}
let Pe = [];
function Br() {
  var e = Pe;
  Pe = [], Er(e);
}
function Fe(e) {
  if (Pe.length === 0) {
    var t = Pe;
    queueMicrotask(() => {
      t === Pe && Br();
    });
  }
  Pe.push(e);
}
function Sn(e) {
  var t = m;
  if (t === null)
    return g.f |= he, e;
  if ((t.f & Me) === 0 && (t.f & qe) === 0)
    throw e;
  ve(e, t);
}
function ve(e, t) {
  for (; t !== null; ) {
    if ((t.f & Tt) !== 0) {
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
const Hr = -7169;
function S(e, t) {
  e.f = e.f & Hr | t;
}
function Yt(e) {
  (e.f & H) !== 0 || e.deps === null ? S(e, T) : S(e, ne);
}
function Tn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & M) === 0 || (t.f & Te) === 0 || (t.f ^= Te, Tn(
        /** @type {Derived} */
        t.deps
      ));
}
function An(e, t, n) {
  (e.f & z) !== 0 ? t.add(e) : (e.f & ne) !== 0 && n.add(e), Tn(e.deps), S(e, T);
}
const ue = /* @__PURE__ */ new Set();
let E = null, Z = null, Ct = null, Et = !1, ze = null, st = null;
var en = 0;
let Gr = 1;
class ge {
  id = Gr++;
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
        S(r, z), this.schedule(r);
      for (r of n.m)
        S(r, ne), this.schedule(r);
    }
  }
  #v() {
    if (en++ > 1e3 && (ue.delete(this), Kr()), !this.#d()) {
      for (const l of this.#s)
        this.#l.delete(l), S(l, z), this.schedule(l);
      for (const l of this.#l)
        S(l, ne), this.schedule(l);
    }
    const t = this.#n;
    this.#n = [], this.apply();
    var n = ze = [], r = [], i = st = [];
    for (const l of t)
      try {
        this.#u(l, n, r);
      } catch (o) {
        throw On(l), o;
      }
    if (E = null, i.length > 0) {
      var s = ge.ensure();
      for (const l of i)
        s.schedule(l);
    }
    if (ze = null, st = null, this.#d() || this.#h()) {
      this.#p(r), this.#p(n);
      for (const [l, o] of this.#a)
        Nn(l, o);
    } else {
      this.#e.size === 0 && ue.delete(this), this.#s.clear(), this.#l.clear();
      for (const l of this.#t) l(this);
      this.#t.clear(), tn(r), tn(n), this.#i?.resolve();
    }
    var f = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      E
    );
    if (this.#n.length > 0) {
      const l = f ??= this;
      l.#n.push(...this.#n.filter((o) => !l.#n.includes(o)));
    }
    f !== null && (ue.add(f), f.#v()), ue.has(this) || this.#b();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #u(t, n, r) {
    t.f ^= T;
    for (var i = t.first; i !== null; ) {
      var s = i.f, f = (s & (ee | ke)) !== 0, l = f && (s & T) !== 0, o = l || (s & L) !== 0 || this.#a.has(i);
      if (!o && i.fn !== null) {
        f ? i.f ^= T : (s & qe) !== 0 ? n.push(i) : et(i) && ((s & be) !== 0 && this.#l.add(i), Ye(i));
        var a = i.first;
        if (a !== null) {
          i = a;
          continue;
        }
      }
      for (; i !== null; ) {
        var c = i.next;
        if (c !== null) {
          i = c;
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
      An(t[n], this.#s, this.#l);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} old_value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    n !== N && !this.previous.has(t) && this.previous.set(t, n), (t.f & he) === 0 && (this.current.set(t, [t.v, r]), Z?.set(t, t.v));
  }
  activate() {
    E = this;
  }
  deactivate() {
    E = null, Z = null;
  }
  flush() {
    try {
      Et = !0, E = this, this.#v();
    } finally {
      en = 0, Ct = null, ze = null, st = null, Et = !1, E = null, Z = null, pe.clear();
    }
  }
  discard() {
    for (const t of this.#f) t(this);
    this.#f.clear(), ue.delete(this);
  }
  #b() {
    for (const a of ue) {
      var t = a.id < this.id, n = [];
      for (const [c, [h, v]] of this.current) {
        if (a.current.has(c)) {
          var r = (
            /** @type {[any, boolean]} */
            a.current.get(c)[0]
          );
          if (t && h !== r)
            a.current.set(c, [h, v]);
          else
            continue;
        }
        n.push(c);
      }
      var i = [...a.current.keys()].filter((c) => !this.current.has(c));
      if (i.length === 0)
        t && a.discard();
      else if (n.length > 0) {
        a.activate();
        var s = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
        for (var l of n)
          Cn(l, i, s, f);
        if (a.#n.length > 0) {
          a.apply();
          for (var o of a.#n)
            a.#u(o, [], []);
          a.#n = [];
        }
        a.deactivate();
      }
    }
    for (const a of ue)
      a.#o.has(this) && (a.#o.delete(this), a.#o.size === 0 && !a.#d() && (a.activate(), a.#v()));
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
    this.#c || r || (this.#c = !0, Fe(() => {
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
    return (this.#i ??= gn()).promise;
  }
  static ensure() {
    if (E === null) {
      const t = E = new ge();
      Et || (ue.add(E), Fe(() => {
        E === t && t.flush();
      }));
    }
    return E;
  }
  apply() {
    {
      Z = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    if (Ct = t, t.b?.is_pending && (t.f & (qe | ct | bn)) !== 0 && (t.f & Me) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ze !== null && n === m && (g === null || (g.f & M) === 0))
        return;
      if ((r & (ke | ee)) !== 0) {
        if ((r & T) === 0)
          return;
        n.f ^= T;
      }
    }
    this.#n.push(n);
  }
}
function Kr() {
  try {
    Rr();
  } catch (e) {
    ve(e, Ct);
  }
}
let ie = null;
function tn(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & ($ | L)) === 0 && et(r) && (ie = /* @__PURE__ */ new Set(), Ye(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Gn(r), ie?.size > 0)) {
        pe.clear();
        for (const i of ie) {
          if ((i.f & ($ | L)) !== 0) continue;
          const s = [i];
          let f = i.parent;
          for (; f !== null; )
            ie.has(f) && (ie.delete(f), s.push(f)), f = f.parent;
          for (let l = s.length - 1; l >= 0; l--) {
            const o = s[l];
            (o.f & ($ | L)) === 0 && Ye(o);
          }
        }
        ie.clear();
      }
    }
    ie = null;
  }
}
function Cn(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & M) !== 0 ? Cn(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (jt | be)) !== 0 && (s & z) === 0 && Mn(i, t, r) && (S(i, z), Ut(
        /** @type {Effect} */
        i
      ));
    }
}
function Mn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (Ie.call(t, i))
        return !0;
      if ((i.f & M) !== 0 && Mn(
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
function Ut(e) {
  E.schedule(e);
}
function Nn(e, t) {
  if (!((e.f & ee) !== 0 && (e.f & T) !== 0)) {
    (e.f & z) !== 0 ? t.d.push(e) : (e.f & ne) !== 0 && t.m.push(e), S(e, T);
    for (var n = e.first; n !== null; )
      Nn(n, t), n = n.next;
  }
}
function On(e) {
  S(e, T);
  for (var t = e.first; t !== null; )
    On(t), t = t.next;
}
function Wr(e) {
  let t = 0, n = Ae(0), r;
  return () => {
    Ht() && (d(n), pi(() => (t === 0 && (r = nr(() => e(() => Ze(n)))), t += 1, () => {
      Fe(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, Ze(n));
      });
    })));
  };
}
var Jr = Se | Ue;
function Xr(e, t, n, r) {
  new Zr(e, t, n, r);
}
class Zr {
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
  #p = Wr(() => (this.#u = Ae(this.#c), () => {
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
      var f = (
        /** @type {Effect} */
        m
      );
      f.b = this, f.f |= Tt, r(s);
    }, this.parent = /** @type {Effect} */
    m.b, this.transform_error = i ?? this.parent?.transform_error ?? ((s) => s), this.#i = dt(() => {
      this.#m();
    }, Jr);
  }
  #b() {
    try {
      this.#n = V(() => this.#r(this.#t));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #x(t) {
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
  #y() {
    const t = this.#e.pending;
    t && (this.is_pending = !0, this.#s = V(() => t(this.#t)), Fe(() => {
      var n = this.#a = document.createDocumentFragment(), r = _e();
      n.append(r), this.#n = this.#g(() => V(() => this.#r(r))), this.#o === 0 && (this.#t.before(n), this.#a = null, ye(
        /** @type {Effect} */
        this.#s,
        () => {
          this.#s = null;
        }
      ), this.#_(
        /** @type {Batch} */
        E
      ));
    }));
  }
  #m() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#o = 0, this.#c = 0, this.#n = V(() => {
        this.#r(this.#t);
      }), this.#o > 0) {
        var t = this.#a = document.createDocumentFragment();
        Wt(this.#n, t);
        const n = (
          /** @type {(anchor: Node) => void} */
          this.#e.pending
        );
        this.#s = V(() => n(this.#t));
      } else
        this.#_(
          /** @type {Batch} */
          E
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
    An(t, this.#h, this.#v);
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
    var n = m, r = g, i = j;
    re(this.#i), K(this.#i), Le(this.#i.ctx);
    try {
      return ge.ensure(), t();
    } catch (s) {
      return Sn(s), null;
    } finally {
      re(n), K(r), Le(i);
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
    this.#o += t, this.#o === 0 && (this.#_(n), this.#s && ye(this.#s, () => {
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
    this.#w(t, n), this.#c += t, !(!this.#u || this.#d) && (this.#d = !0, Fe(() => {
      this.#d = !1, this.#u && je(this.#u, this.#c);
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
    this.#n && (I(this.#n), this.#n = null), this.#s && (I(this.#s), this.#s = null), this.#l && (I(this.#l), this.#l = null);
    var i = !1, s = !1;
    const f = () => {
      if (i) {
        Ur();
        return;
      }
      i = !0, s && Fr(), this.#l !== null && ye(this.#l, () => {
        this.#l = null;
      }), this.#g(() => {
        this.#m();
      });
    }, l = (o) => {
      try {
        s = !0, n?.(o, f), s = !1;
      } catch (a) {
        ve(a, this.#i && this.#i.parent);
      }
      r && (this.#l = this.#g(() => {
        try {
          return V(() => {
            var a = (
              /** @type {Effect} */
              m
            );
            a.b = this, a.f |= Tt, r(
              this.#t,
              () => o,
              () => f
            );
          });
        } catch (a) {
          return ve(
            a,
            /** @type {Effect} */
            this.#i.parent
          ), null;
        }
      }));
    };
    Fe(() => {
      var o;
      try {
        o = this.transform_error(t);
      } catch (a) {
        ve(a, this.#i && this.#i.parent);
        return;
      }
      o !== null && typeof o == "object" && typeof /** @type {any} */
      o.then == "function" ? o.then(
        l,
        /** @param {unknown} e */
        (a) => ve(a, this.#i && this.#i.parent)
      ) : l(o);
    });
  }
}
function Qr(e, t, n, r) {
  const i = Vt;
  var s = e.filter((v) => !v.settled);
  if (n.length === 0 && s.length === 0) {
    r(t.map(i));
    return;
  }
  var f = (
    /** @type {Effect} */
    m
  ), l = $r(), o = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((v) => v.promise)) : null;
  function a(v) {
    l();
    try {
      r(v);
    } catch (p) {
      (f.f & $) === 0 && ve(p, f);
    }
    at();
  }
  if (n.length === 0) {
    o.then(() => a(t.map(i)));
    return;
  }
  var c = Rn();
  function h() {
    Promise.all(n.map((v) => /* @__PURE__ */ ei(v))).then((v) => a([...t.map(i), ...v])).catch((v) => ve(v, f)).finally(() => c());
  }
  o ? o.then(() => {
    l(), h(), at();
  }) : h();
}
function $r() {
  var e = (
    /** @type {Effect} */
    m
  ), t = g, n = j, r = (
    /** @type {Batch} */
    E
  );
  return function(s = !0) {
    re(e), K(t), Le(n), s && (e.f & $) === 0 && (r?.activate(), r?.apply());
  };
}
function at(e = !0) {
  re(null), K(null), Le(null), e && E?.deactivate();
}
function Rn() {
  var e = (
    /** @type {Effect} */
    m
  ), t = (
    /** @type {Boundary} */
    e.b
  ), n = (
    /** @type {Batch} */
    E
  ), r = t.is_rendered();
  return t.update_pending_count(1, n), n.increment(r, e), (i = !1) => {
    t.update_pending_count(-1, n), n.decrement(r, e, i);
  };
}
// @__NO_SIDE_EFFECTS__
function Vt(e) {
  var t = M | z, n = g !== null && (g.f & M) !== 0 ? (
    /** @type {Derived} */
    g
  ) : null;
  return m !== null && (m.f |= Ue), {
    ctx: j,
    deps: null,
    effects: null,
    equals: wn,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      N
    ),
    wv: 0,
    parent: n ?? m,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function ei(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    m
  );
  r === null && Ar();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Ae(
    /** @type {V} */
    N
  ), f = !g, l = /* @__PURE__ */ new Map();
  return hi(() => {
    var o = (
      /** @type {Effect} */
      m
    ), a = gn();
    i = a.promise;
    try {
      Promise.resolve(e()).then(a.resolve, a.reject).finally(at);
    } catch (p) {
      a.reject(p), at();
    }
    var c = (
      /** @type {Batch} */
      E
    );
    if (f) {
      if ((o.f & Me) !== 0)
        var h = Rn();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        l.get(c)?.reject(se), l.delete(c);
      else {
        for (const p of l.values())
          p.reject(se);
        l.clear();
      }
      l.set(c, a);
    }
    const v = (p, u = void 0) => {
      if (h) {
        var _ = u === se;
        h(_);
      }
      if (!(u === se || (o.f & $) !== 0)) {
        if (c.activate(), u)
          s.f |= he, je(s, u);
        else {
          (s.f & he) !== 0 && (s.f ^= he), je(s, p);
          for (const [y, x] of l) {
            if (l.delete(y), y === c) break;
            x.reject(se);
          }
        }
        c.deactivate();
      }
    };
    a.promise.then(v, (p) => v(null, p || "unknown"));
  }), ci(() => {
    for (const o of l.values())
      o.reject(se);
  }), new Promise((o) => {
    function a(c) {
      function h() {
        c === i ? o(s) : a(i);
      }
      c.then(h, h);
    }
    a(i);
  });
}
// @__NO_SIDE_EFFECTS__
function Y(e) {
  const t = /* @__PURE__ */ Vt(e);
  return Jn(t), t;
}
// @__NO_SIDE_EFFECTS__
function ti(e) {
  const t = /* @__PURE__ */ Vt(e);
  return t.equals = xn, t;
}
function ni(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      I(
        /** @type {Effect} */
        t[n]
      );
  }
}
function ri(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & M) === 0)
      return (t.f & $) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function Bt(e) {
  var t, n = m;
  re(ri(e));
  try {
    e.f &= ~Te, ni(e), t = $n(e);
  } finally {
    re(n);
  }
  return t;
}
function Pn(e) {
  var t = e.v, n = Bt(e);
  if (!e.equals(n) && (e.wv = Zn(), (!E?.is_fork || e.deps === null) && (e.v = n, E?.capture(e, t, !0), e.deps === null))) {
    S(e, T);
    return;
  }
  Ce || (Z !== null ? (Ht() || E?.is_fork) && Z.set(e, n) : Yt(e));
}
function ii(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(se), t.teardown = yr, t.ac = null, Qe(t, 0), Gt(t));
}
function zn(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && Ye(t);
}
let Mt = /* @__PURE__ */ new Set();
const pe = /* @__PURE__ */ new Map();
let Dn = !1;
function Ae(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: wn,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function A(e, t) {
  const n = Ae(e);
  return Jn(n), n;
}
// @__NO_SIDE_EFFECTS__
function si(e, t = !1, n = !0) {
  const r = Ae(e);
  return t || (r.equals = xn), r;
}
function w(e, t, n = !1) {
  g !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!Q || (g.f & $t) !== 0) && kn() && (g.f & (M | be | jt | $t)) !== 0 && (G === null || !Ie.call(G, e)) && Dr();
  let r = n ? fe(t) : t;
  return je(e, r, st);
}
function je(e, t, n = null) {
  if (!e.equals(t)) {
    var r = e.v;
    Ce ? pe.set(e, t) : pe.set(e, r), e.v = t;
    var i = ge.ensure();
    if (i.capture(e, r), (e.f & M) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & z) !== 0 && Bt(s), Z === null && Yt(s);
    }
    e.wv = Zn(), Fn(e, z, n), m !== null && (m.f & T) !== 0 && (m.f & (ee | ke)) === 0 && (U === null ? bi([e]) : U.push(e)), !i.is_fork && Mt.size > 0 && !Dn && li();
  }
  return t;
}
function li() {
  Dn = !1;
  for (const e of Mt)
    (e.f & T) !== 0 && S(e, ne), et(e) && Ye(e);
  Mt.clear();
}
function nn(e, t = 1) {
  var n = d(e), r = t === 1 ? n++ : n--;
  return w(e, n), r;
}
function Ze(e) {
  w(e, e.v + 1);
}
function Fn(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var f = r[s], l = f.f, o = (l & z) === 0;
      if (o && S(f, t), (l & M) !== 0) {
        var a = (
          /** @type {Derived} */
          f
        );
        Z?.delete(a), (l & Te) === 0 && (l & H && (f.f |= Te), Fn(a, ne, n));
      } else if (o) {
        var c = (
          /** @type {Effect} */
          f
        );
        (l & be) !== 0 && ie !== null && ie.add(c), n !== null ? n.push(c) : Ut(c);
      }
    }
}
function fe(e) {
  if (typeof e != "object" || e === null || yt in e)
    return e;
  const t = _n(e);
  if (t !== wr && t !== xr)
    return e;
  var n = /* @__PURE__ */ new Map(), r = pn(e), i = /* @__PURE__ */ A(0), s = Ee, f = (l) => {
    if (Ee === s)
      return l();
    var o = g, a = Ee;
    K(null), ln(s);
    var c = l();
    return K(o), ln(a), c;
  };
  return r && n.set("length", /* @__PURE__ */ A(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, o, a) {
        (!("value" in a) || a.configurable === !1 || a.enumerable === !1 || a.writable === !1) && Pr();
        var c = n.get(o);
        return c === void 0 ? f(() => {
          var h = /* @__PURE__ */ A(a.value);
          return n.set(o, h), h;
        }) : w(c, a.value, !0), !0;
      },
      deleteProperty(l, o) {
        var a = n.get(o);
        if (a === void 0) {
          if (o in l) {
            const c = f(() => /* @__PURE__ */ A(N));
            n.set(o, c), Ze(i);
          }
        } else
          w(a, N), Ze(i);
        return !0;
      },
      get(l, o, a) {
        if (o === yt)
          return e;
        var c = n.get(o), h = o in l;
        if (c === void 0 && (!h || Xe(l, o)?.writable) && (c = f(() => {
          var p = fe(h ? l[o] : N), u = /* @__PURE__ */ A(p);
          return u;
        }), n.set(o, c)), c !== void 0) {
          var v = d(c);
          return v === N ? void 0 : v;
        }
        return Reflect.get(l, o, a);
      },
      getOwnPropertyDescriptor(l, o) {
        var a = Reflect.getOwnPropertyDescriptor(l, o);
        if (a && "value" in a) {
          var c = n.get(o);
          c && (a.value = d(c));
        } else if (a === void 0) {
          var h = n.get(o), v = h?.v;
          if (h !== void 0 && v !== N)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return a;
      },
      has(l, o) {
        if (o === yt)
          return !0;
        var a = n.get(o), c = a !== void 0 && a.v !== N || Reflect.has(l, o);
        if (a !== void 0 || m !== null && (!c || Xe(l, o)?.writable)) {
          a === void 0 && (a = f(() => {
            var v = c ? fe(l[o]) : N, p = /* @__PURE__ */ A(v);
            return p;
          }), n.set(o, a));
          var h = d(a);
          if (h === N)
            return !1;
        }
        return c;
      },
      set(l, o, a, c) {
        var h = n.get(o), v = o in l;
        if (r && o === "length")
          for (var p = a; p < /** @type {Source<number>} */
          h.v; p += 1) {
            var u = n.get(p + "");
            u !== void 0 ? w(u, N) : p in l && (u = f(() => /* @__PURE__ */ A(N)), n.set(p + "", u));
          }
        if (h === void 0)
          (!v || Xe(l, o)?.writable) && (h = f(() => /* @__PURE__ */ A(void 0)), w(h, fe(a)), n.set(o, h));
        else {
          v = h.v !== N;
          var _ = f(() => fe(a));
          w(h, _);
        }
        var y = Reflect.getOwnPropertyDescriptor(l, o);
        if (y?.set && y.set.call(c, a), !v) {
          if (r && typeof o == "string") {
            var x = (
              /** @type {Source<number>} */
              n.get("length")
            ), b = Number(o);
            Number.isInteger(b) && b >= x.v && w(x, b + 1);
          }
          Ze(i);
        }
        return !0;
      },
      ownKeys(l) {
        d(i);
        var o = Reflect.ownKeys(l).filter((h) => {
          var v = n.get(h);
          return v === void 0 || v.v !== N;
        });
        for (var [a, c] of n)
          c.v !== N && !(a in l) && o.push(a);
        return o;
      },
      setPrototypeOf() {
        zr();
      }
    }
  );
}
var rn, In, qn, Ln;
function ai() {
  if (rn === void 0) {
    rn = window, In = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    qn = Xe(t, "firstChild").get, Ln = Xe(t, "nextSibling").get, Zt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), Zt(n) && (n.__t = void 0);
  }
}
function _e(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function ft(e) {
  return (
    /** @type {TemplateNode | null} */
    qn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return (
    /** @type {TemplateNode | null} */
    Ln.call(e)
  );
}
function C(e, t) {
  return /* @__PURE__ */ ft(e);
}
function De(e, t = !1) {
  {
    var n = /* @__PURE__ */ ft(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ $e(n) : n;
  }
}
function B(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ $e(r);
  return r;
}
function fi(e) {
  e.textContent = "";
}
function jn() {
  return !1;
}
function Yn(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(mn, e, void 0)
  );
}
function Un(e) {
  var t = g, n = m;
  K(null), re(null);
  try {
    return e();
  } finally {
    K(t), re(n);
  }
}
function oi(e) {
  m === null && (g === null && Or(), Nr()), Ce && Mr();
}
function ui(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function oe(e, t) {
  var n = m;
  n !== null && (n.f & L) !== 0 && (e |= L);
  var r = {
    ctx: j,
    deps: null,
    nodes: null,
    f: e | z | H,
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
  if ((e & qe) !== 0)
    ze !== null ? ze.push(r) : ge.ensure().schedule(r);
  else if (t !== null) {
    try {
      Ye(r);
    } catch (f) {
      throw I(r), f;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Ue) === 0 && (i = i.first, (e & be) !== 0 && (e & Se) !== 0 && i !== null && (i.f |= Se));
  }
  if (i !== null && (i.parent = n, n !== null && ui(i, n), g !== null && (g.f & M) !== 0 && (e & ke) === 0)) {
    var s = (
      /** @type {Derived} */
      g
    );
    (s.effects ??= []).push(i);
  }
  return r;
}
function Ht() {
  return g !== null && !Q;
}
function ci(e) {
  const t = oe(ct, null);
  return S(t, T), t.teardown = e, t;
}
function Vn(e) {
  oi();
  var t = (
    /** @type {Effect} */
    m.f
  ), n = !g && (t & ee) !== 0 && (t & Me) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      j
    );
    (r.e ??= []).push(e);
  } else
    return Bn(e);
}
function Bn(e) {
  return oe(qe | Sr, e);
}
function di(e) {
  ge.ensure();
  const t = oe(ke | Ue, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? ye(t, () => {
      I(t), r(void 0);
    }) : (I(t), r(void 0));
  });
}
function vi(e) {
  return oe(qe, e);
}
function hi(e) {
  return oe(jt | Ue, e);
}
function pi(e, t = 0) {
  return oe(ct | t, e);
}
function de(e, t = [], n = [], r = []) {
  Qr(r, t, n, (i) => {
    oe(ct, () => e(...i.map(d)));
  });
}
function dt(e, t = 0) {
  var n = oe(be | t, e);
  return n;
}
function V(e) {
  return oe(ee | Ue, e);
}
function Hn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Ce, r = g;
    sn(!0), K(null);
    try {
      t.call(null);
    } finally {
      sn(n), K(r);
    }
  }
}
function Gt(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Un(() => {
      i.abort(se);
    });
    var r = n.next;
    (n.f & ke) !== 0 ? n.parent = null : I(n, t), n = r;
  }
}
function _i(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & ee) === 0 && I(t), t = n;
  }
}
function I(e, t = !0) {
  var n = !1;
  (t || (e.f & kr) !== 0) && e.nodes !== null && e.nodes.end !== null && (gi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), S(e, Qt), Gt(e, t && !n), Qe(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Hn(e), e.f ^= Qt, e.f |= $;
  var i = e.parent;
  i !== null && i.first !== null && Gn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function gi(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ $e(e);
    e.remove(), e = n;
  }
}
function Gn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function ye(e, t, n = !0) {
  var r = [];
  Kn(e, r, !0);
  var i = () => {
    n && I(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var f = () => --s || i();
    for (var l of r)
      l.out(f);
  } else
    i();
}
function Kn(e, t, n) {
  if ((e.f & L) === 0) {
    e.f ^= L;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var i = e.first; i !== null; ) {
      var s = i.next, f = (i.f & Se) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & ee) !== 0 && (e.f & be) !== 0;
      Kn(i, t, f ? n : !1), i = s;
    }
  }
}
function Kt(e) {
  Wn(e, !0);
}
function Wn(e, t) {
  if ((e.f & L) !== 0) {
    e.f ^= L, (e.f & T) === 0 && (S(e, z), ge.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Se) !== 0 || (n.f & ee) !== 0;
      Wn(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const f of s)
        (f.is_global || t) && f.in();
  }
}
function Wt(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ $e(n);
      t.append(n), n = i;
    }
}
let lt = !1, Ce = !1;
function sn(e) {
  Ce = e;
}
let g = null, Q = !1;
function K(e) {
  g = e;
}
let m = null;
function re(e) {
  m = e;
}
let G = null;
function Jn(e) {
  g !== null && (G === null ? G = [e] : G.push(e));
}
let F = null, q = 0, U = null;
function bi(e) {
  U = e;
}
let Xn = 1, xe = 0, Ee = xe;
function ln(e) {
  Ee = e;
}
function Zn() {
  return ++Xn;
}
function et(e) {
  var t = e.f;
  if ((t & z) !== 0)
    return !0;
  if (t & M && (e.f &= ~Te), (t & ne) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (et(
        /** @type {Derived} */
        s
      ) && Pn(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & H) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    Z === null && S(e, T);
  }
  return !1;
}
function Qn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(G !== null && Ie.call(G, e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & M) !== 0 ? Qn(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? S(s, z) : (s.f & T) !== 0 && S(s, ne), Ut(
        /** @type {Effect} */
        s
      ));
    }
}
function $n(e) {
  var t = F, n = q, r = U, i = g, s = G, f = j, l = Q, o = Ee, a = e.f;
  F = /** @type {null | Value[]} */
  null, q = 0, U = null, g = (a & (ee | ke)) === 0 ? e : null, G = null, Le(e.ctx), Q = !1, Ee = ++xe, e.ac !== null && (Un(() => {
    e.ac.abort(se);
  }), e.ac = null);
  try {
    e.f |= At;
    var c = (
      /** @type {Function} */
      e.fn
    ), h = c();
    e.f |= Me;
    var v = e.deps, p = E?.is_fork;
    if (F !== null) {
      var u;
      if (p || Qe(e, q), v !== null && q > 0)
        for (v.length = q + F.length, u = 0; u < F.length; u++)
          v[q + u] = F[u];
      else
        e.deps = v = F;
      if (Ht() && (e.f & H) !== 0)
        for (u = q; u < v.length; u++)
          (v[u].reactions ??= []).push(e);
    } else !p && v !== null && q < v.length && (Qe(e, q), v.length = q);
    if (kn() && U !== null && !Q && v !== null && (e.f & (M | ne | z)) === 0)
      for (u = 0; u < /** @type {Source[]} */
      U.length; u++)
        Qn(
          U[u],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (xe++, i.deps !== null)
        for (let _ = 0; _ < n; _ += 1)
          i.deps[_].rv = xe;
      if (t !== null)
        for (const _ of t)
          _.rv = xe;
      U !== null && (r === null ? r = U : r.push(.../** @type {Source[]} */
      U));
    }
    return (e.f & he) !== 0 && (e.f ^= he), h;
  } catch (_) {
    return Sn(_);
  } finally {
    e.f ^= At, F = t, q = n, U = r, g = i, G = s, Le(f), Q = l, Ee = o;
  }
}
function mi(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = gr.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & M) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (F === null || !Ie.call(F, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & H) !== 0 && (s.f ^= H, s.f &= ~Te), Yt(s), ii(s), Qe(s, 0);
  }
}
function Qe(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      mi(e, n[r]);
}
function Ye(e) {
  var t = e.f;
  if ((t & $) === 0) {
    S(e, T);
    var n = m, r = lt;
    m = e, lt = !0;
    try {
      (t & (be | bn)) !== 0 ? _i(e) : Gt(e), Hn(e);
      var i = $n(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Xn;
      var s;
    } finally {
      lt = r, m = n;
    }
  }
}
function d(e) {
  var t = e.f, n = (t & M) !== 0;
  if (g !== null && !Q) {
    var r = m !== null && (m.f & $) !== 0;
    if (!r && (G === null || !Ie.call(G, e))) {
      var i = g.deps;
      if ((g.f & At) !== 0)
        e.rv < xe && (e.rv = xe, F === null && i !== null && i[q] === e ? q++ : F === null ? F = [e] : F.push(e));
      else {
        (g.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [g] : Ie.call(s, g) || s.push(g);
      }
    }
  }
  if (Ce && pe.has(e))
    return pe.get(e);
  if (n) {
    var f = (
      /** @type {Derived} */
      e
    );
    if (Ce) {
      var l = f.v;
      return ((f.f & T) === 0 && f.reactions !== null || tr(f)) && (l = Bt(f)), pe.set(f, l), l;
    }
    var o = (f.f & H) === 0 && !Q && g !== null && (lt || (g.f & H) !== 0), a = (f.f & Me) === 0;
    et(f) && (o && (f.f |= H), Pn(f)), o && !a && (zn(f), er(f));
  }
  if (Z?.has(e))
    return Z.get(e);
  if ((e.f & he) !== 0)
    throw e.v;
  return e.v;
}
function er(e) {
  if (e.f |= H, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & M) !== 0 && (t.f & H) === 0 && (zn(
        /** @type {Derived} */
        t
      ), er(
        /** @type {Derived} */
        t
      ));
}
function tr(e) {
  if (e.v === N) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (pe.has(t) || (t.f & M) !== 0 && tr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function nr(e) {
  var t = Q;
  try {
    return Q = !0, e();
  } finally {
    Q = t;
  }
}
const wi = ["touchstart", "touchmove"];
function xi(e) {
  return wi.includes(e);
}
const We = /* @__PURE__ */ Symbol("events"), rr = /* @__PURE__ */ new Set(), Nt = /* @__PURE__ */ new Set();
function Ot(e, t, n) {
  (t[We] ??= {})[e] = n;
}
function ir(e) {
  for (var t = 0; t < e.length; t++)
    rr.add(e[t]);
  for (var n of Nt)
    n(e);
}
let an = null;
function fn(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = e.composedPath?.() || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  an = e;
  var f = 0, l = an === e && e[We];
  if (l) {
    var o = i.indexOf(l);
    if (o !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[We] = t;
      return;
    }
    var a = i.indexOf(t);
    if (a === -1)
      return;
    o <= a && (f = o);
  }
  if (s = /** @type {Element} */
  i[f] || e.target, s !== t) {
    br(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var c = g, h = m;
    K(null), re(null);
    try {
      for (var v, p = []; s !== null; ) {
        var u = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var _ = s[We]?.[r];
          _ != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && _.call(s, e);
        } catch (y) {
          v ? p.push(y) : v = y;
        }
        if (e.cancelBubble || u === t || u === null)
          break;
        s = u;
      }
      if (v) {
        for (let y of p)
          queueMicrotask(() => {
            throw y;
          });
        throw v;
      }
    } finally {
      e[We] = t, delete e.currentTarget, K(c), re(h);
    }
  }
}
const yi = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function Ei(e) {
  return (
    /** @type {string} */
    yi?.createHTML(e) ?? e
  );
}
function ki(e) {
  var t = Yn("template");
  return t.innerHTML = Ei(e.replaceAll("<!>", "<!---->")), t.content;
}
function Rt(e, t) {
  var n = (
    /** @type {Effect} */
    m
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function W(e, t) {
  var n = (t & jr) !== 0, r = (t & Yr) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = ki(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ ft(i)));
    var f = (
      /** @type {TemplateNode} */
      r || In ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ft(f)
      ), o = (
        /** @type {TemplateNode} */
        f.lastChild
      );
      Rt(l, o);
    } else
      Rt(f, f);
    return f;
  };
}
function Pt() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = _e();
  return e.append(t, n), Rt(t, n), e;
}
function P(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function le(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = `${n}`);
}
function Si(e, t) {
  return Ti(e, t);
}
const it = /* @__PURE__ */ new Map();
function Ti(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: f = !0, transformError: l }) {
  ai();
  var o = void 0, a = di(() => {
    var c = n ?? t.appendChild(_e());
    Xr(
      /** @type {TemplateNode} */
      c,
      {
        pending: () => {
        }
      },
      (p) => {
        yn({});
        var u = (
          /** @type {ComponentContext} */
          j
        );
        s && (u.c = s), i && (r.$$events = i), o = e(p, r) || {}, En();
      },
      l
    );
    var h = /* @__PURE__ */ new Set(), v = (p) => {
      for (var u = 0; u < p.length; u++) {
        var _ = p[u];
        if (!h.has(_)) {
          h.add(_);
          var y = xi(_);
          for (const R of [t, document]) {
            var x = it.get(R);
            x === void 0 && (x = /* @__PURE__ */ new Map(), it.set(R, x));
            var b = x.get(_);
            b === void 0 ? (R.addEventListener(_, fn, { passive: y }), x.set(_, 1)) : x.set(_, b + 1);
          }
        }
      }
    };
    return v(ut(rr)), Nt.add(v), () => {
      for (var p of h)
        for (const y of [t, document]) {
          var u = (
            /** @type {Map<string, number>} */
            it.get(y)
          ), _ = (
            /** @type {number} */
            u.get(p)
          );
          --_ == 0 ? (y.removeEventListener(p, fn), u.delete(p), u.size === 0 && it.delete(y)) : u.set(p, _);
        }
      Nt.delete(v), c !== n && c.parentNode?.removeChild(c);
    };
  });
  return zt.set(o, a), o;
}
let zt = /* @__PURE__ */ new WeakMap();
function Ai(e, t) {
  const n = zt.get(e);
  return n ? (zt.delete(e), n(t)) : Promise.resolve();
}
class sr {
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
        Kt(r), this.#r.delete(n);
      else {
        var i = this.#e.get(n);
        i && (this.#f.set(n, i.effect), this.#e.delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
      }
      for (const [s, f] of this.#t) {
        if (this.#t.delete(s), s === t)
          break;
        const l = this.#e.get(f);
        l && (I(l.effect), this.#e.delete(f));
      }
      for (const [s, f] of this.#f) {
        if (s === n || this.#r.has(s)) continue;
        const l = () => {
          if (Array.from(this.#t.values()).includes(s)) {
            var a = document.createDocumentFragment();
            Wt(f, a), a.append(_e()), this.#e.set(s, { effect: f, fragment: a });
          } else
            I(f);
          this.#r.delete(s), this.#f.delete(s);
        };
        this.#i || !r ? (this.#r.add(s), ye(f, l, !1)) : l();
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
      n.includes(r) || (I(i.effect), this.#e.delete(r));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      E
    ), i = jn();
    if (n && !this.#f.has(t) && !this.#e.has(t))
      if (i) {
        var s = document.createDocumentFragment(), f = _e();
        s.append(f), this.#e.set(t, {
          effect: V(() => n(f)),
          fragment: s
        });
      } else
        this.#f.set(
          t,
          V(() => n(this.anchor))
        );
    if (this.#t.set(r, t), i) {
      for (const [l, o] of this.#f)
        l === t ? r.unskip_effect(o) : r.skip_effect(o);
      for (const [l, o] of this.#e)
        l === t ? r.unskip_effect(o.effect) : r.skip_effect(o.effect);
      r.oncommit(this.#n), r.ondiscard(this.#s);
    } else
      this.#n(r);
  }
}
function ot(e, t, n = !1) {
  var r = new sr(e), i = n ? Se : 0;
  function s(f, l) {
    r.ensure(f, l);
  }
  dt(() => {
    var f = !1;
    t((l, o = 0) => {
      f = !0, s(o, l);
    }), f || s(-1, null);
  }, i);
}
function Dt(e, t) {
  return t;
}
function Ci(e, t, n) {
  for (var r = [], i = t.length, s, f = t.length, l = 0; l < i; l++) {
    let h = t[l];
    ye(
      h,
      () => {
        if (s) {
          if (s.pending.delete(h), s.done.add(h), s.pending.size === 0) {
            var v = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Ft(e, ut(s.done)), v.delete(s), v.size === 0 && (e.outrogroups = null);
          }
        } else
          f -= 1;
      },
      !1
    );
  }
  if (f === 0) {
    var o = r.length === 0 && n !== null;
    if (o) {
      var a = (
        /** @type {Element} */
        n
      ), c = (
        /** @type {Element} */
        a.parentNode
      );
      fi(c), c.append(a), e.items.clear();
    }
    Ft(e, t, !o);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(s);
}
function Ft(e, t, n = !0) {
  var r;
  if (e.pending.size > 0) {
    r = /* @__PURE__ */ new Set();
    for (const f of e.pending.values())
      for (const l of f)
        r.add(
          /** @type {EachItem} */
          e.items.get(l).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r?.has(s)) {
      s.f |= ae;
      const f = document.createDocumentFragment();
      Wt(s, f);
    } else
      I(t[i], n);
  }
}
var on;
function It(e, t, n, r, i, s = null) {
  var f = e, l = /* @__PURE__ */ new Map();
  {
    var o = (
      /** @type {Element} */
      e
    );
    f = o.appendChild(_e());
  }
  var a = null, c = /* @__PURE__ */ ti(() => {
    var b = n();
    return pn(b) ? b : b == null ? [] : ut(b);
  }), h, v = /* @__PURE__ */ new Map(), p = !0;
  function u(b) {
    (x.effect.f & $) === 0 && (x.pending.delete(b), x.fallback = a, Mi(x, h, f, t, r), a !== null && (h.length === 0 ? (a.f & ae) === 0 ? Kt(a) : (a.f ^= ae, Je(a, null, f)) : ye(a, () => {
      a = null;
    })));
  }
  function _(b) {
    x.pending.delete(b);
  }
  var y = dt(() => {
    h = /** @type {V[]} */
    d(c);
    for (var b = h.length, R = /* @__PURE__ */ new Set(), D = (
      /** @type {Batch} */
      E
    ), J = jn(), X = 0; X < b; X += 1) {
      var me = h[X], k = r(me, X), O = p ? null : l.get(k);
      O ? (O.v && je(O.v, me), O.i && je(O.i, X), J && D.unskip_effect(O.e)) : (O = Ni(
        l,
        p ? f : on ??= _e(),
        me,
        k,
        X,
        i,
        t,
        n
      ), p || (O.e.f |= ae), l.set(k, O)), R.add(k);
    }
    if (b === 0 && s && !a && (p ? a = V(() => s(f)) : (a = V(() => s(on ??= _e())), a.f |= ae)), b > R.size && Cr(), !p)
      if (v.set(D, R), J) {
        for (const [Ne, vt] of l)
          R.has(Ne) || D.skip_effect(vt.e);
        D.oncommit(u), D.ondiscard(_);
      } else
        u(D);
    d(c);
  }), x = { effect: y, items: l, pending: v, outrogroups: null, fallback: a };
  p = !1;
}
function Ke(e) {
  for (; e !== null && (e.f & ee) === 0; )
    e = e.next;
  return e;
}
function Mi(e, t, n, r, i) {
  var s = t.length, f = e.items, l = Ke(e.effect.first), o, a = null, c = [], h = [], v, p, u, _;
  for (_ = 0; _ < s; _ += 1) {
    if (v = t[_], p = i(v, _), u = /** @type {EachItem} */
    f.get(p).e, e.outrogroups !== null)
      for (const k of e.outrogroups)
        k.pending.delete(u), k.done.delete(u);
    if ((u.f & L) !== 0 && Kt(u), (u.f & ae) !== 0)
      if (u.f ^= ae, u === l)
        Je(u, null, n);
      else {
        var y = a ? a.next : l;
        u === e.effect.last && (e.effect.last = u.prev), u.prev && (u.prev.next = u.next), u.next && (u.next.prev = u.prev), ce(e, a, u), ce(e, u, y), Je(u, y, n), a = u, c = [], h = [], l = Ke(a.next);
        continue;
      }
    if (u !== l) {
      if (o !== void 0 && o.has(u)) {
        if (c.length < h.length) {
          var x = h[0], b;
          a = x.prev;
          var R = c[0], D = c[c.length - 1];
          for (b = 0; b < c.length; b += 1)
            Je(c[b], x, n);
          for (b = 0; b < h.length; b += 1)
            o.delete(h[b]);
          ce(e, R.prev, D.next), ce(e, a, R), ce(e, D, x), l = x, a = D, _ -= 1, c = [], h = [];
        } else
          o.delete(u), Je(u, l, n), ce(e, u.prev, u.next), ce(e, u, a === null ? e.effect.first : a.next), ce(e, a, u), a = u;
        continue;
      }
      for (c = [], h = []; l !== null && l !== u; )
        (o ??= /* @__PURE__ */ new Set()).add(l), h.push(l), l = Ke(l.next);
      if (l === null)
        continue;
    }
    (u.f & ae) === 0 && c.push(u), a = u, l = Ke(u.next);
  }
  if (e.outrogroups !== null) {
    for (const k of e.outrogroups)
      k.pending.size === 0 && (Ft(e, ut(k.done)), e.outrogroups?.delete(k));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (l !== null || o !== void 0) {
    var J = [];
    if (o !== void 0)
      for (u of o)
        (u.f & L) === 0 && J.push(u);
    for (; l !== null; )
      (l.f & L) === 0 && l !== e.fallback && J.push(l), l = Ke(l.next);
    var X = J.length;
    if (X > 0) {
      var me = s === 0 ? n : null;
      Ci(e, J, me);
    }
  }
}
function Ni(e, t, n, r, i, s, f, l) {
  var o = (f & Ir) !== 0 ? (f & Lr) === 0 ? /* @__PURE__ */ si(n, !1, !1) : Ae(n) : null, a = (f & qr) !== 0 ? Ae(i) : null;
  return {
    v: o,
    i: a,
    e: V(() => (s(t, o ?? n, a ?? i, l), () => {
      e.delete(r);
    }))
  };
}
function Je(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & ae) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var f = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ $e(r)
      );
      if (s.before(r), r === i)
        return;
      r = f;
    }
}
function ce(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function qt(e, t, ...n) {
  var r = new sr(e);
  dt(() => {
    const i = t() ?? null;
    r.ensure(i, i && ((s) => i(s, ...n)));
  }, Se);
}
function lr(e, t) {
  vi(() => {
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
      const i = Yn("style");
      i.id = t.hash, i.textContent = t.code, r.appendChild(i);
    }
  });
}
const un = [...` 	
\r\f \v\uFEFF`];
function Oi(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, f = 0; (f = r.indexOf(i, f)) >= 0; ) {
          var l = f + s;
          (f === 0 || un.includes(r[f - 1])) && (l === r.length || un.includes(r[l])) ? r = (f === 0 ? "" : r.substring(0, f)) + r.substring(l + 1) : f = l;
        }
  }
  return r === "" ? null : r;
}
function cn(e, t = !1) {
  var n = t ? " !important;" : ";", r = "";
  for (var i of Object.keys(e)) {
    var s = e[i];
    s != null && s !== "" && (r += " " + i + ": " + s + n);
  }
  return r;
}
function Ri(e, t) {
  if (t) {
    var n = "", r, i;
    return Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, r && (n += cn(r)), i && (n += cn(i, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(e);
}
function Lt(e, t, n, r, i, s) {
  var f = e.__className;
  if (f !== n || f === void 0) {
    var l = Oi(n, r, s);
    l == null ? e.removeAttribute("class") : e.className = l, e.__className = n;
  } else if (s && i !== s)
    for (var o in s) {
      var a = !!s[o];
      (i == null || a !== !!i[o]) && e.classList.toggle(o, a);
    }
  return s;
}
function kt(e, t = {}, n, r) {
  for (var i in n) {
    var s = n[i];
    t[i] !== s && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, s, r));
  }
}
function Pi(e, t, n, r) {
  var i = e.__style;
  if (i !== t) {
    var s = Ri(t, r);
    s == null ? e.removeAttribute("style") : e.style.cssText = s, e.__style = t;
  } else r && (Array.isArray(r) ? (kt(e, n?.[0], r[0]), kt(e, n?.[1], r[1], "important")) : kt(e, n, r));
  return r;
}
const zi = /* @__PURE__ */ Symbol("is custom element"), Di = /* @__PURE__ */ Symbol("is html");
function Fi(e, t, n, r) {
  var i = Ii(e);
  i[t] !== (i[t] = n) && (n == null ? e.removeAttribute(t) : typeof n != "string" && qi(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function Ii(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [zi]: e.nodeName.includes("-"),
      [Di]: e.namespaceURI === mn
    }
  );
}
var dn = /* @__PURE__ */ new Map();
function qi(e) {
  var t = e.getAttribute("is") || e.nodeName, n = dn.get(t);
  if (n) return n;
  dn.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = mr(i);
    for (var f in r)
      r[f].set && n.push(f);
    i = _n(i);
  }
  return n;
}
function St(e, t, n, r) {
  var i = (
    /** @type {V} */
    r
  ), s = !0, f = () => (s && (s = !1, i = /** @type {V} */
  r), i), l;
  l = /** @type {V} */
  e[t], l === void 0 && r !== void 0 && (l = f());
  var o;
  return o = () => {
    var a = (
      /** @type {V} */
      e[t]
    );
    return a === void 0 ? f() : (s = !0, a);
  }, o;
}
function Li(e) {
  j === null && Tr(), Vn(() => {
    const t = nr(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
const ji = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(ji);
async function Yi(e, t, n) {
  const r = await e.state.get(t);
  return r ? { ...n, ...r } : { ...n };
}
function Ui(e) {
  const t = [...e];
  for (let n = t.length - 1; n > 0; n--) {
    const r = Math.floor(Math.random() * (n + 1));
    [t[n], t[r]] = [t[r], t[n]];
  }
  return t;
}
var Vi = /* @__PURE__ */ W('<button><div class="flip-card-inner svelte-9334zb"><div class="flip-card-front analog-card svelte-9334zb"><!></div> <div class="flip-card-back analog-card analog-card-back svelte-9334zb"><!></div></div></button>');
const Bi = {
  hash: "svelte-9334zb",
  code: `.flip-card.svelte-9334zb {perspective:600px;background:transparent;border:none;padding:0;cursor:pointer;outline:none;will-change:transform;-webkit-tap-highlight-color:transparent;}.flip-card.svelte-9334zb:disabled {cursor:default;}.flip-card-inner.svelte-9334zb {position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 400ms cubic-bezier(0.4, 0, 0.2, 1);}.flip-card.flipped.svelte-9334zb .flip-card-inner:where(.svelte-9334zb) {transform:rotateY(180deg);}.flip-card.matched.svelte-9334zb .flip-card-inner:where(.svelte-9334zb) {
		animation: analog-match-pulse 350ms ease;}.flip-card.svelte-9334zb:not(:disabled):hover .flip-card-inner:where(.svelte-9334zb) {box-shadow:var(--card-shadow-lifted);transform:translateY(-2px);}.flip-card:not(:disabled).flipped.svelte-9334zb:hover .flip-card-inner:where(.svelte-9334zb) {transform:rotateY(180deg) translateY(-2px);}.flip-card-front.svelte-9334zb,
	.flip-card-back.svelte-9334zb {position:absolute;inset:0;backface-visibility:hidden;display:flex;align-items:center;justify-content:center;border-radius:8px;overflow:hidden;}.flip-card-front.svelte-9334zb {transform:rotateY(180deg);}.flip-card.matched.svelte-9334zb .flip-card-front:where(.svelte-9334zb) {box-shadow:0 0 12px color-mix(in srgb, var(--box-correct, #5cb878) 30%, transparent),
			var(--card-shadow);}`
};
function vn(e, t) {
  lr(e, Bi);
  let n = St(t, "flipped", 3, !1), r = St(t, "matched", 3, !1), i = St(t, "disabled", 3, !1);
  var s = Vi();
  let f;
  var l = C(s), o = C(l), a = C(o);
  qt(a, () => t.front);
  var c = B(o, 2), h = C(c);
  qt(h, () => t.back), de(() => {
    f = Lt(s, 1, "flip-card svelte-9334zb", null, f, { flipped: n(), matched: r() }), s.disabled = i(), Fi(s, "aria-label", n() ? "Card face up" : "Card face down");
  }), Ot("click", s, function(...v) {
    t.onclick?.apply(this, v);
  }), P(e, s);
}
ir(["click"]);
var Hi = /* @__PURE__ */ W('<div class="box-stat-cell"><span class="box-stat-num"> </span> <span class="box-stat-tag"> </span></div>'), Gi = /* @__PURE__ */ W('<p class="box-lifetime"> </p>'), Ki = /* @__PURE__ */ W('<div class="box-summary"><p class="box-summary-heading">Done</p> <div class="box-stat-grid"></div> <!> <div class="box-results-actions"><button class="box-results-btn">Again</button> <button class="box-results-btn primary">Continue</button></div></div>');
function Wi(e, t) {
  var n = Pt(), r = De(n);
  {
    var i = (f) => {
      var l = Pt(), o = De(l);
      qt(o, () => t.children), P(f, l);
    }, s = (f) => {
      var l = Ki(), o = B(C(l), 2);
      It(o, 21, () => t.stats, Dt, (u, _, y) => {
        var x = Hi();
        Pi(x, "", {}, { "animation-delay": `${y * 80}ms` });
        var b = C(x), R = C(b), D = B(b, 2), J = C(D);
        de(() => {
          le(R, d(_).value), le(J, d(_).label);
        }), P(u, x);
      });
      var a = B(o, 2);
      {
        var c = (u) => {
          var _ = Gi(), y = C(_);
          de(() => le(y, t.lifetime)), P(u, _);
        };
        ot(a, (u) => {
          t.lifetime && u(c);
        });
      }
      var h = B(a, 2), v = C(h), p = B(v, 2);
      Ot("click", v, function(...u) {
        t.onAgain?.apply(this, u);
      }), Ot("click", p, function(...u) {
        t.onContinue?.apply(this, u);
      }), P(f, l);
    };
    ot(r, (f) => {
      t.phase === "playing" ? f(i) : f(s, -1);
    });
  }
  P(e, n);
}
ir(["click"]);
function hn(e, t = "seconds") {
  if (t === "clock") {
    const n = Math.floor(e / 1e3), r = Math.floor(n / 60), i = n % 60;
    return `${r}:${i.toString().padStart(2, "0")}`;
  }
  return (e / 1e3).toFixed(1) + "s";
}
function Ji(e, t, n = "—") {
  return e == null ? n : t ? `${e}${t}` : String(e);
}
const Xi = [
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
], Zi = Array.from({ length: 20 }, (e, t) => String(t + 1)), Qi = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function $i(e, t) {
  return Ui([...e === "numbers" ? Zi : e === "letters" ? Qi : Xi]).slice(0, t);
}
var es = /* @__PURE__ */ W('<span class="card-symbol svelte-89x1i6"> </span>'), ts = /* @__PURE__ */ W('<span class="card-index svelte-89x1i6"></span>'), ns = /* @__PURE__ */ W('<p class="box-label stage-label svelte-89x1i6">Watch the sequence</p> <div class="card-row svelte-89x1i6"></div> <p class="box-meta"> </p>', 1), rs = /* @__PURE__ */ W("<span> </span>"), is = /* @__PURE__ */ W("<span> </span> <!>", 1), ss = /* @__PURE__ */ W('<span class="card-back-mark svelte-89x1i6">?</span>'), ls = /* @__PURE__ */ W('<div class="recall-header svelte-89x1i6"><span class="box-label">Recall in order</span> <span class="box-label"> </span></div> <div class="card-row svelte-89x1i6"></div> <p class="box-meta"> </p>', 1), as = /* @__PURE__ */ W('<div class="box-container analog-paper"><!></div>');
const fs = {
  hash: "svelte-89x1i6",
  code: `.stage-label.svelte-89x1i6 {text-align:center;
		animation: svelte-89x1i6-fade-in 300ms ease;}.recall-header.svelte-89x1i6 {display:flex;justify-content:space-between;width:100%;max-width:520px;}.card-row.svelte-89x1i6 {display:flex;gap:8px;justify-content:center;flex-wrap:wrap;max-width:520px;width:100%;}.card-row.svelte-89x1i6 .flip-card {width:64px;height:88px;flex-shrink:0;}.card-row.svelte-89x1i6 .flip-card-front,
	.card-row.svelte-89x1i6 .flip-card-back {width:100%;height:100%;}.card-symbol.svelte-89x1i6 {font-size:clamp(1.4rem, 4vw, 2rem);line-height:1;user-select:none;transition:color 200ms;}.card-symbol.wrong.svelte-89x1i6 {color:var(--box-wrong, #bf4f4f);}.card-back-mark.svelte-89x1i6 {font-size:1.4rem;font-weight:300;color:color-mix(in srgb, var(--accent, #8a9bb8) 50%, transparent);user-select:none;}.card-index.svelte-89x1i6 {font-size:0.75rem;font-weight:600;color:var(--text-muted, #808080);user-select:none;}.pick-order.svelte-89x1i6 {position:absolute;bottom:4px;right:6px;font-size:0.65rem;font-weight:700;color:var(--text-secondary, #a0a0a0);opacity:0.7;}.pick-order.wrong.svelte-89x1i6 {color:var(--box-wrong, #bf4f4f);}

	@keyframes svelte-89x1i6-fade-in {
		from { opacity: 0; transform: translateY(4px); }
		to { opacity: 1; transform: translateY(0); }
	}`
};
function os(e, t) {
  yn(t, !0), lr(e, fs);
  let n = /* @__PURE__ */ Y(() => parseInt(t.ctx.settings.length, 10) || 4), r = /* @__PURE__ */ Y(() => parseInt(t.ctx.settings.showTimeMs, 10) || 1e3), i = /* @__PURE__ */ Y(() => t.ctx.settings.deck || "emoji"), s = /* @__PURE__ */ A(fe([])), f = /* @__PURE__ */ A(-1), l = /* @__PURE__ */ A("watch"), o = /* @__PURE__ */ A("playing"), a = /* @__PURE__ */ A(fe([])), c = /* @__PURE__ */ A(fe([])), h = /* @__PURE__ */ A(0), v = /* @__PURE__ */ A(0), p = /* @__PURE__ */ A(0), u = /* @__PURE__ */ A(fe({
    totalCompletions: 0,
    totalPerfect: 0,
    bestStreak: 0,
    longestSequence: 0
  }));
  function _() {
    w(s, $i(d(i), d(n)), !0), w(f, -1), w(l, "watch"), w(o, "playing"), w(a, [], !0), w(c, [], !0), w(p, 0), y();
  }
  function y() {
    w(f, 0);
    const k = setInterval(
      () => {
        nn(f), d(f) >= d(s).length && (clearInterval(k), setTimeout(
          () => {
            w(f, -1), w(l, "recall"), w(h, Date.now(), !0);
          },
          d(r)
        ));
      },
      d(r)
    );
  }
  Vn(() => {
    if (d(l) !== "recall") return;
    const k = setInterval(
      () => {
        w(v, Date.now() - d(h));
      },
      100
    );
    return () => clearInterval(k);
  });
  function x(k) {
    if (d(l) !== "recall" || d(a).includes(k)) return;
    const O = d(a).length;
    w(a, [...d(a), k], !0), k === O ? (w(c, [...d(c), "correct"], !0), nn(p)) : (w(c, [...d(c), "wrong"], !0), w(p, 0)), d(a).length >= d(s).length && b();
  }
  function b() {
    w(v, Date.now() - d(h)), w(l, "result");
    const O = d(c).filter((Ne) => Ne === "correct").length === d(s).length;
    d(u).totalCompletions++, O && d(u).totalPerfect++, d(p) > d(u).bestStreak && (d(u).bestStreak = d(p)), O && d(s).length > d(u).longestSequence && (d(u).longestSequence = d(s).length), w(u, { ...d(u) }, !0), t.ctx.state.set("speed-cards-stats", d(u)), setTimeout(
      () => {
        w(o, "done");
      },
      1200
    );
  }
  let R = /* @__PURE__ */ Y(() => d(c).filter((k) => k === "correct").length), D = /* @__PURE__ */ Y(() => [
    {
      label: "correct",
      value: `${d(R)}/${d(s).length}`
    },
    { label: "time", value: hn(d(v)) },
    {
      label: "best streak",
      value: Ji(d(u).bestStreak)
    },
    {
      label: "longest perfect",
      value: d(u).longestSequence > 0 ? `${d(u).longestSequence} cards` : "—"
    }
  ]), J = /* @__PURE__ */ Y(() => `${d(u).totalCompletions} round${d(u).totalCompletions === 1 ? "" : "s"} · ${d(u).totalPerfect} perfect`);
  Li(async () => {
    w(
      u,
      await Yi(t.ctx, "speed-cards-stats", {
        totalCompletions: 0,
        totalPerfect: 0,
        bestStreak: 0,
        longestSequence: 0
      }),
      !0
    ), _();
  });
  var X = as(), me = C(X);
  Wi(me, {
    get phase() {
      return d(o);
    },
    get stats() {
      return d(D);
    },
    get lifetime() {
      return d(J);
    },
    onAgain: _,
    onContinue: () => t.ctx.complete({ outcome: "completed" }),
    children: (O) => {
      var Ne = Pt(), vt = De(Ne);
      {
        var ar = (Oe) => {
          var Ve = ns(), Be = B(De(Ve), 2);
          It(Be, 21, () => d(s), Dt, (Re, _t, tt) => {
            {
              const He = (we) => {
                var te = es(), Ge = C(te);
                de(() => le(Ge, d(_t))), P(we, te);
              }, gt = (we) => {
                var te = ts();
                te.textContent = tt + 1, P(we, te);
              };
              let nt = /* @__PURE__ */ Y(() => tt === d(f));
              vn(Re, {
                get flipped() {
                  return d(nt);
                },
                disabled: !0,
                front: He,
                back: gt,
                $$slots: { front: !0, back: !0 }
              });
            }
          });
          var ht = B(Be, 2), pt = C(ht);
          de((Re) => le(pt, `${Re ?? ""} / ${d(s).length ?? ""}`), [() => Math.max(0, d(f) + 1)]), P(Oe, Ve);
        }, fr = (Oe) => {
          var Ve = ls(), Be = De(Ve), ht = B(C(Be), 2), pt = C(ht), Re = B(Be, 2);
          It(Re, 21, () => d(s), Dt, (He, gt, nt) => {
            const we = /* @__PURE__ */ Y(() => d(a).indexOf(nt)), te = /* @__PURE__ */ Y(() => d(we) >= 0), Ge = /* @__PURE__ */ Y(() => d(te) ? d(c)[d(we)] : null);
            {
              const or = (bt) => {
                var rt = is(), mt = De(rt);
                let Jt;
                var vr = C(mt), hr = B(mt, 2);
                {
                  var pr = (wt) => {
                    var xt = rs();
                    let Xt;
                    var _r = C(xt);
                    de(() => {
                      Xt = Lt(xt, 1, "pick-order svelte-89x1i6", null, Xt, { wrong: d(Ge) === "wrong" }), le(_r, d(we) + 1);
                    }), P(wt, xt);
                  };
                  ot(hr, (wt) => {
                    d(te) && wt(pr);
                  });
                }
                de(() => {
                  Jt = Lt(mt, 1, "card-symbol svelte-89x1i6", null, Jt, { wrong: d(Ge) === "wrong" }), le(vr, d(gt));
                }), P(bt, rt);
              }, ur = (bt) => {
                var rt = ss();
                P(bt, rt);
              };
              let cr = /* @__PURE__ */ Y(() => d(Ge) === "correct"), dr = /* @__PURE__ */ Y(() => d(l) === "result" || d(te));
              vn(He, {
                get flipped() {
                  return d(te);
                },
                get matched() {
                  return d(cr);
                },
                get disabled() {
                  return d(dr);
                },
                onclick: () => x(nt),
                front: or,
                back: ur,
                $$slots: { front: !0, back: !0 }
              });
            }
          });
          var _t = B(Re, 2), tt = C(_t);
          de(
            (He) => {
              le(pt, He), le(tt, `${d(a).length ?? ""} / ${d(s).length ?? ""} picked`);
            },
            [() => hn(d(v), "clock")]
          ), P(Oe, Ve);
        };
        ot(vt, (Oe) => {
          d(l) === "watch" ? Oe(ar) : Oe(fr, -1);
        });
      }
      P(O, Ne);
    }
  }), P(e, X), En();
}
function cs(e, t) {
  return Si(os, { target: e, props: t });
}
function ds(e) {
  Ai(e);
}
export {
  cs as mountPlugin,
  ds as unmountPlugin
};
