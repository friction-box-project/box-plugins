var _n = Array.isArray, gr = Array.prototype.indexOf, Fe = Array.prototype.includes, ht = Array.from, br = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, mr = Object.getOwnPropertyDescriptors, wr = Object.prototype, xr = Array.prototype, gn = Object.getPrototypeOf, en = Object.isExtensible;
const yr = () => {
};
function Er(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function bn() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const N = 2, qe = 4, pt = 8, mn = 1 << 24, xe = 16, Z = 32, Ae = 64, Mt = 128, B = 512, M = 1024, P = 2048, se = 4096, j = 8192, X = 16384, Re = 32768, tn = 1 << 25, Ce = 65536, nn = 1 << 17, kr = 1 << 18, He = 1 << 19, Sr = 1 << 20, ie = 1 << 25, Me = 65536, Nt = 1 << 21, Yt = 1 << 22, ge = 1 << 23, kt = /* @__PURE__ */ Symbol("$state"), oe = new class extends Error {
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
function Ir() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Pr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Dr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function zr() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Fr = 1, qr = 2, wn = 4, Lr = 8, jr = 16, Yr = 1, Hr = 2, R = /* @__PURE__ */ Symbol(), xn = "http://www.w3.org/1999/xhtml";
function Ur() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function yn(e) {
  return e === this.v;
}
function Vr(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function En(e) {
  return !Vr(e, this.v);
}
let Y = null;
function Le(e) {
  Y = e;
}
function kn(e, t = !1, n) {
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
function Sn(e) {
  var t = (
    /** @type {ComponentContext} */
    Y
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Gn(r);
  }
  return t.i = !0, Y = t.p, /** @type {T} */
  {};
}
function Tn() {
  return !0;
}
let De = [];
function Br() {
  var e = De;
  De = [], Er(e);
}
function ke(e) {
  if (De.length === 0) {
    var t = De;
    queueMicrotask(() => {
      t === De && Br();
    });
  }
  De.push(e);
}
function An(e) {
  var t = w;
  if (t === null)
    return m.f |= ge, e;
  if ((t.f & Re) === 0 && (t.f & qe) === 0)
    throw e;
  _e(e, t);
}
function _e(e, t) {
  for (; t !== null; ) {
    if ((t.f & Mt) !== 0) {
      if ((t.f & Re) === 0)
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
const Gr = -7169;
function C(e, t) {
  e.f = e.f & Gr | t;
}
function Ht(e) {
  (e.f & B) !== 0 || e.deps === null ? C(e, M) : C(e, se);
}
function Cn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & N) === 0 || (t.f & Me) === 0 || (t.f ^= Me, Cn(
        /** @type {Derived} */
        t.deps
      ));
}
function Mn(e, t, n) {
  (e.f & P) !== 0 ? t.add(e) : (e.f & se) !== 0 && n.add(e), Cn(e.deps), C(e, M);
}
const ve = /* @__PURE__ */ new Set();
let k = null, W = null, Ot = null, St = !1, ze = null, ot = null;
var rn = 0;
let Kr = 1;
class we {
  id = Kr++;
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
  #o = /* @__PURE__ */ new Set();
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
  #f = /* @__PURE__ */ new Set();
  #d() {
    return this.is_fork || this.#r.size > 0;
  }
  #h() {
    for (const r of this.#f)
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
        C(r, P), this.schedule(r);
      for (r of n.m)
        C(r, se), this.schedule(r);
    }
  }
  #v() {
    if (rn++ > 1e3 && (ve.delete(this), Wr()), !this.#d()) {
      for (const a of this.#s)
        this.#l.delete(a), C(a, P), this.schedule(a);
      for (const a of this.#l)
        C(a, se), this.schedule(a);
    }
    const t = this.#n;
    this.#n = [], this.apply();
    var n = ze = [], r = [], i = ot = [];
    for (const a of t)
      try {
        this.#u(a, n, r);
      } catch (l) {
        throw In(a), l;
      }
    if (k = null, i.length > 0) {
      var s = we.ensure();
      for (const a of i)
        s.schedule(a);
    }
    if (ze = null, ot = null, this.#d() || this.#h()) {
      this.#p(r), this.#p(n);
      for (const [a, l] of this.#a)
        Rn(a, l);
    } else {
      this.#e.size === 0 && ve.delete(this), this.#s.clear(), this.#l.clear();
      for (const a of this.#t) a(this);
      this.#t.clear(), sn(r), sn(n), this.#i?.resolve();
    }
    var o = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      k
    );
    if (this.#n.length > 0) {
      const a = o ??= this;
      a.#n.push(...this.#n.filter((l) => !a.#n.includes(l)));
    }
    o !== null && (ve.add(o), o.#v()), ve.has(this) || this.#b();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #u(t, n, r) {
    t.f ^= M;
    for (var i = t.first; i !== null; ) {
      var s = i.f, o = (s & (Z | Ae)) !== 0, a = o && (s & M) !== 0, l = a || (s & j) !== 0 || this.#a.has(i);
      if (!l && i.fn !== null) {
        o ? i.f ^= M : (s & qe) !== 0 ? n.push(i) : it(i) && ((s & xe) !== 0 && this.#l.add(i), Ye(i));
        var f = i.first;
        if (f !== null) {
          i = f;
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
      Mn(t[n], this.#s, this.#l);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} old_value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    n !== R && !this.previous.has(t) && this.previous.set(t, n), (t.f & ge) === 0 && (this.current.set(t, [t.v, r]), W?.set(t, t.v));
  }
  activate() {
    k = this;
  }
  deactivate() {
    k = null, W = null;
  }
  flush() {
    try {
      St = !0, k = this, this.#v();
    } finally {
      rn = 0, Ot = null, ze = null, ot = null, St = !1, k = null, W = null, be.clear();
    }
  }
  discard() {
    for (const t of this.#o) t(this);
    this.#o.clear(), ve.delete(this);
  }
  #b() {
    for (const f of ve) {
      var t = f.id < this.id, n = [];
      for (const [u, [p, v]] of this.current) {
        if (f.current.has(u)) {
          var r = (
            /** @type {[any, boolean]} */
            f.current.get(u)[0]
          );
          if (t && p !== r)
            f.current.set(u, [p, v]);
          else
            continue;
        }
        n.push(u);
      }
      var i = [...f.current.keys()].filter((u) => !this.current.has(u));
      if (i.length === 0)
        t && f.discard();
      else if (n.length > 0) {
        f.activate();
        var s = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var a of n)
          Nn(a, i, s, o);
        if (f.#n.length > 0) {
          f.apply();
          for (var l of f.#n)
            f.#u(l, [], []);
          f.#n = [];
        }
        f.deactivate();
      }
    }
    for (const f of ve)
      f.#f.has(this) && (f.#f.delete(this), f.#f.size === 0 && !f.#d() && (f.activate(), f.#v()));
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
    this.#c || r || (this.#c = !0, ke(() => {
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
    this.#o.add(t);
  }
  settled() {
    return (this.#i ??= bn()).promise;
  }
  static ensure() {
    if (k === null) {
      const t = k = new we();
      St || (ve.add(k), ke(() => {
        k === t && t.flush();
      }));
    }
    return k;
  }
  apply() {
    {
      W = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    if (Ot = t, t.b?.is_pending && (t.f & (qe | pt | mn)) !== 0 && (t.f & Re) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ze !== null && n === w && (m === null || (m.f & N) === 0))
        return;
      if ((r & (Ae | Z)) !== 0) {
        if ((r & M) === 0)
          return;
        n.f ^= M;
      }
    }
    this.#n.push(n);
  }
}
function Wr() {
  try {
    Rr();
  } catch (e) {
    _e(e, Ot);
  }
}
let ae = null;
function sn(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (X | j)) === 0 && it(r) && (ae = /* @__PURE__ */ new Set(), Ye(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Wn(r), ae?.size > 0)) {
        be.clear();
        for (const i of ae) {
          if ((i.f & (X | j)) !== 0) continue;
          const s = [i];
          let o = i.parent;
          for (; o !== null; )
            ae.has(o) && (ae.delete(o), s.push(o)), o = o.parent;
          for (let a = s.length - 1; a >= 0; a--) {
            const l = s[a];
            (l.f & (X | j)) === 0 && Ye(l);
          }
        }
        ae.clear();
      }
    }
    ae = null;
  }
}
function Nn(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & N) !== 0 ? Nn(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (Yt | xe)) !== 0 && (s & P) === 0 && On(i, t, r) && (C(i, P), Ut(
        /** @type {Effect} */
        i
      ));
    }
}
function On(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (Fe.call(t, i))
        return !0;
      if ((i.f & N) !== 0 && On(
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
  k.schedule(e);
}
function Rn(e, t) {
  if (!((e.f & Z) !== 0 && (e.f & M) !== 0)) {
    (e.f & P) !== 0 ? t.d.push(e) : (e.f & se) !== 0 && t.m.push(e), C(e, M);
    for (var n = e.first; n !== null; )
      Rn(n, t), n = n.next;
  }
}
function In(e) {
  C(e, M);
  for (var t = e.first; t !== null; )
    In(t), t = t.next;
}
function Jr(e) {
  let t = 0, n = Ne(0), r;
  return () => {
    Gt() && (c(n), _i(() => (t === 0 && (r = ir(() => e(() => et(n)))), t += 1, () => {
      ke(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, et(n));
      });
    })));
  };
}
var Xr = Ce | He;
function Zr(e, t, n, r) {
  new Qr(e, t, n, r);
}
class Qr {
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
  #o = null;
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
  #f = 0;
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
  #p = Jr(() => (this.#u = Ne(this.#c), () => {
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
      var o = (
        /** @type {Effect} */
        w
      );
      o.b = this, o.f |= Mt, r(s);
    }, this.parent = /** @type {Effect} */
    w.b, this.transform_error = i ?? this.parent?.transform_error ?? ((s) => s), this.#i = _t(() => {
      this.#m();
    }, Xr);
  }
  #b() {
    try {
      this.#n = U(() => this.#r(this.#t));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #x(t) {
    const n = this.#e.failed;
    n && (this.#l = U(() => {
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
    t && (this.is_pending = !0, this.#s = U(() => t(this.#t)), ke(() => {
      var n = this.#a = document.createDocumentFragment(), r = me();
      n.append(r), this.#n = this.#g(() => U(() => this.#r(r))), this.#f === 0 && (this.#t.before(n), this.#a = null, Se(
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
  #m() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#f = 0, this.#c = 0, this.#n = U(() => {
        this.#r(this.#t);
      }), this.#f > 0) {
        var t = this.#a = document.createDocumentFragment();
        Jt(this.#n, t);
        const n = (
          /** @type {(anchor: Node) => void} */
          this.#e.pending
        );
        this.#s = U(() => n(this.#t));
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
    Mn(t, this.#h, this.#v);
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
    var n = w, r = m, i = Y;
    le(this.#i), K(this.#i), Le(this.#i.ctx);
    try {
      return we.ensure(), t();
    } catch (s) {
      return An(s), null;
    } finally {
      le(n), K(r), Le(i);
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
    this.#f += t, this.#f === 0 && (this.#_(n), this.#s && Se(this.#s, () => {
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
    this.#w(t, n), this.#c += t, !(!this.#u || this.#d) && (this.#d = !0, ke(() => {
      this.#d = !1, this.#u && je(this.#u, this.#c);
    }));
  }
  get_effect_pending() {
    return this.#p(), c(
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
    this.#n && (F(this.#n), this.#n = null), this.#s && (F(this.#s), this.#s = null), this.#l && (F(this.#l), this.#l = null);
    var i = !1, s = !1;
    const o = () => {
      if (i) {
        Ur();
        return;
      }
      i = !0, s && zr(), this.#l !== null && Se(this.#l, () => {
        this.#l = null;
      }), this.#g(() => {
        this.#m();
      });
    }, a = (l) => {
      try {
        s = !0, n?.(l, o), s = !1;
      } catch (f) {
        _e(f, this.#i && this.#i.parent);
      }
      r && (this.#l = this.#g(() => {
        try {
          return U(() => {
            var f = (
              /** @type {Effect} */
              w
            );
            f.b = this, f.f |= Mt, r(
              this.#t,
              () => l,
              () => o
            );
          });
        } catch (f) {
          return _e(
            f,
            /** @type {Effect} */
            this.#i.parent
          ), null;
        }
      }));
    };
    ke(() => {
      var l;
      try {
        l = this.transform_error(t);
      } catch (f) {
        _e(f, this.#i && this.#i.parent);
        return;
      }
      l !== null && typeof l == "object" && typeof /** @type {any} */
      l.then == "function" ? l.then(
        a,
        /** @param {unknown} e */
        (f) => _e(f, this.#i && this.#i.parent)
      ) : a(l);
    });
  }
}
function $r(e, t, n, r) {
  const i = Vt;
  var s = e.filter((v) => !v.settled);
  if (n.length === 0 && s.length === 0) {
    r(t.map(i));
    return;
  }
  var o = (
    /** @type {Effect} */
    w
  ), a = ei(), l = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((v) => v.promise)) : null;
  function f(v) {
    a();
    try {
      r(v);
    } catch (_) {
      (o.f & X) === 0 && _e(_, o);
    }
    ut();
  }
  if (n.length === 0) {
    l.then(() => f(t.map(i)));
    return;
  }
  var u = Pn();
  function p() {
    Promise.all(n.map((v) => /* @__PURE__ */ ti(v))).then((v) => f([...t.map(i), ...v])).catch((v) => _e(v, o)).finally(() => u());
  }
  l ? l.then(() => {
    a(), p(), ut();
  }) : p();
}
function ei() {
  var e = (
    /** @type {Effect} */
    w
  ), t = m, n = Y, r = (
    /** @type {Batch} */
    k
  );
  return function(s = !0) {
    le(e), K(t), Le(n), s && (e.f & X) === 0 && (r?.activate(), r?.apply());
  };
}
function ut(e = !0) {
  le(null), K(null), Le(null), e && k?.deactivate();
}
function Pn() {
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
function Vt(e) {
  var t = N | P, n = m !== null && (m.f & N) !== 0 ? (
    /** @type {Derived} */
    m
  ) : null;
  return w !== null && (w.f |= He), {
    ctx: Y,
    deps: null,
    effects: null,
    equals: yn,
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
function ti(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    w
  );
  r === null && Ar();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Ne(
    /** @type {V} */
    R
  ), o = !m, a = /* @__PURE__ */ new Map();
  return pi(() => {
    var l = (
      /** @type {Effect} */
      w
    ), f = bn();
    i = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, f.reject).finally(ut);
    } catch (_) {
      f.reject(_), ut();
    }
    var u = (
      /** @type {Batch} */
      k
    );
    if (o) {
      if ((l.f & Re) !== 0)
        var p = Pn();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        a.get(u)?.reject(oe), a.delete(u);
      else {
        for (const _ of a.values())
          _.reject(oe);
        a.clear();
      }
      a.set(u, f);
    }
    const v = (_, h = void 0) => {
      if (p) {
        var g = h === oe;
        p(g);
      }
      if (!(h === oe || (l.f & X) !== 0)) {
        if (u.activate(), h)
          s.f |= ge, je(s, h);
        else {
          (s.f & ge) !== 0 && (s.f ^= ge), je(s, _);
          for (const [d, b] of a) {
            if (a.delete(d), d === u) break;
            b.reject(oe);
          }
        }
        u.deactivate();
      }
    };
    f.promise.then(v, (_) => v(null, _ || "unknown"));
  }), di(() => {
    for (const l of a.values())
      l.reject(oe);
  }), new Promise((l) => {
    function f(u) {
      function p() {
        u === i ? l(s) : f(i);
      }
      u.then(p, p);
    }
    f(i);
  });
}
// @__NO_SIDE_EFFECTS__
function te(e) {
  const t = /* @__PURE__ */ Vt(e);
  return Zn(t), t;
}
// @__NO_SIDE_EFFECTS__
function ni(e) {
  const t = /* @__PURE__ */ Vt(e);
  return t.equals = En, t;
}
function ri(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      F(
        /** @type {Effect} */
        t[n]
      );
  }
}
function ii(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & N) === 0)
      return (t.f & X) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function Bt(e) {
  var t, n = w;
  le(ii(e));
  try {
    e.f &= ~Me, ri(e), t = tr(e);
  } finally {
    le(n);
  }
  return t;
}
function Dn(e) {
  var t = e.v, n = Bt(e);
  if (!e.equals(n) && (e.wv = $n(), (!k?.is_fork || e.deps === null) && (e.v = n, k?.capture(e, t, !0), e.deps === null))) {
    C(e, M);
    return;
  }
  Oe || (W !== null ? (Gt() || k?.is_fork) && W.set(e, n) : Ht(e));
}
function si(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(oe), t.teardown = yr, t.ac = null, nt(t, 0), Kt(t));
}
function zn(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && Ye(t);
}
let Rt = /* @__PURE__ */ new Set();
const be = /* @__PURE__ */ new Map();
let Fn = !1;
function Ne(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: yn,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function T(e, t) {
  const n = Ne(e);
  return Zn(n), n;
}
// @__NO_SIDE_EFFECTS__
function li(e, t = !1, n = !0) {
  const r = Ne(e);
  return t || (r.equals = En), r;
}
function x(e, t, n = !1) {
  m !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!J || (m.f & nn) !== 0) && Tn() && (m.f & (N | xe | Yt | nn)) !== 0 && (G === null || !Fe.call(G, e)) && Dr();
  let r = n ? re(t) : t;
  return je(e, r, ot);
}
function je(e, t, n = null) {
  if (!e.equals(t)) {
    var r = e.v;
    Oe ? be.set(e, t) : be.set(e, r), e.v = t;
    var i = we.ensure();
    if (i.capture(e, r), (e.f & N) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & P) !== 0 && Bt(s), W === null && Ht(s);
    }
    e.wv = $n(), qn(e, P, n), w !== null && (w.f & M) !== 0 && (w.f & (Z | Ae)) === 0 && (H === null ? mi([e]) : H.push(e)), !i.is_fork && Rt.size > 0 && !Fn && ai();
  }
  return t;
}
function ai() {
  Fn = !1;
  for (const e of Rt)
    (e.f & M) !== 0 && C(e, se), it(e) && Ye(e);
  Rt.clear();
}
function Tt(e, t = 1) {
  var n = c(e), r = t === 1 ? n++ : n--;
  return x(e, n), r;
}
function et(e) {
  x(e, e.v + 1);
}
function qn(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var o = r[s], a = o.f, l = (a & P) === 0;
      if (l && C(o, t), (a & N) !== 0) {
        var f = (
          /** @type {Derived} */
          o
        );
        W?.delete(f), (a & Me) === 0 && (a & B && (o.f |= Me), qn(f, se, n));
      } else if (l) {
        var u = (
          /** @type {Effect} */
          o
        );
        (a & xe) !== 0 && ae !== null && ae.add(u), n !== null ? n.push(u) : Ut(u);
      }
    }
}
function re(e) {
  if (typeof e != "object" || e === null || kt in e)
    return e;
  const t = gn(e);
  if (t !== wr && t !== xr)
    return e;
  var n = /* @__PURE__ */ new Map(), r = _n(e), i = /* @__PURE__ */ T(0), s = Te, o = (a) => {
    if (Te === s)
      return a();
    var l = m, f = Te;
    K(null), on(s);
    var u = a();
    return K(l), on(f), u;
  };
  return r && n.set("length", /* @__PURE__ */ T(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(a, l, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && Ir();
        var u = n.get(l);
        return u === void 0 ? o(() => {
          var p = /* @__PURE__ */ T(f.value);
          return n.set(l, p), p;
        }) : x(u, f.value, !0), !0;
      },
      deleteProperty(a, l) {
        var f = n.get(l);
        if (f === void 0) {
          if (l in a) {
            const u = o(() => /* @__PURE__ */ T(R));
            n.set(l, u), et(i);
          }
        } else
          x(f, R), et(i);
        return !0;
      },
      get(a, l, f) {
        if (l === kt)
          return e;
        var u = n.get(l), p = l in a;
        if (u === void 0 && (!p || $e(a, l)?.writable) && (u = o(() => {
          var _ = re(p ? a[l] : R), h = /* @__PURE__ */ T(_);
          return h;
        }), n.set(l, u)), u !== void 0) {
          var v = c(u);
          return v === R ? void 0 : v;
        }
        return Reflect.get(a, l, f);
      },
      getOwnPropertyDescriptor(a, l) {
        var f = Reflect.getOwnPropertyDescriptor(a, l);
        if (f && "value" in f) {
          var u = n.get(l);
          u && (f.value = c(u));
        } else if (f === void 0) {
          var p = n.get(l), v = p?.v;
          if (p !== void 0 && v !== R)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return f;
      },
      has(a, l) {
        if (l === kt)
          return !0;
        var f = n.get(l), u = f !== void 0 && f.v !== R || Reflect.has(a, l);
        if (f !== void 0 || w !== null && (!u || $e(a, l)?.writable)) {
          f === void 0 && (f = o(() => {
            var v = u ? re(a[l]) : R, _ = /* @__PURE__ */ T(v);
            return _;
          }), n.set(l, f));
          var p = c(f);
          if (p === R)
            return !1;
        }
        return u;
      },
      set(a, l, f, u) {
        var p = n.get(l), v = l in a;
        if (r && l === "length")
          for (var _ = f; _ < /** @type {Source<number>} */
          p.v; _ += 1) {
            var h = n.get(_ + "");
            h !== void 0 ? x(h, R) : _ in a && (h = o(() => /* @__PURE__ */ T(R)), n.set(_ + "", h));
          }
        if (p === void 0)
          (!v || $e(a, l)?.writable) && (p = o(() => /* @__PURE__ */ T(void 0)), x(p, re(f)), n.set(l, p));
        else {
          v = p.v !== R;
          var g = o(() => re(f));
          x(p, g);
        }
        var d = Reflect.getOwnPropertyDescriptor(a, l);
        if (d?.set && d.set.call(u, f), !v) {
          if (r && typeof l == "string") {
            var b = (
              /** @type {Source<number>} */
              n.get("length")
            ), S = Number(l);
            Number.isInteger(S) && S >= b.v && x(b, S + 1);
          }
          et(i);
        }
        return !0;
      },
      ownKeys(a) {
        c(i);
        var l = Reflect.ownKeys(a).filter((p) => {
          var v = n.get(p);
          return v === void 0 || v.v !== R;
        });
        for (var [f, u] of n)
          u.v !== R && !(f in a) && l.push(f);
        return l;
      },
      setPrototypeOf() {
        Pr();
      }
    }
  );
}
var ln, Ln, jn, Yn;
function oi() {
  if (ln === void 0) {
    ln = window, Ln = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    jn = $e(t, "firstChild").get, Yn = $e(t, "nextSibling").get, en(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), en(n) && (n.__t = void 0);
  }
}
function me(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function ct(e) {
  return (
    /** @type {TemplateNode | null} */
    jn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function rt(e) {
  return (
    /** @type {TemplateNode | null} */
    Yn.call(e)
  );
}
function A(e, t) {
  return /* @__PURE__ */ ct(e);
}
function tt(e, t = !1) {
  {
    var n = /* @__PURE__ */ ct(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ rt(n) : n;
  }
}
function V(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ rt(r);
  return r;
}
function fi(e) {
  e.textContent = "";
}
function Hn() {
  return !1;
}
function Un(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(xn, e, void 0)
  );
}
function Vn(e) {
  var t = m, n = w;
  K(null), le(null);
  try {
    return e();
  } finally {
    K(t), le(n);
  }
}
function ui(e) {
  w === null && (m === null && Or(), Nr()), Oe && Mr();
}
function ci(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function fe(e, t) {
  var n = w;
  n !== null && (n.f & j) !== 0 && (e |= j);
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
  if ((e & qe) !== 0)
    ze !== null ? ze.push(r) : we.ensure().schedule(r);
  else if (t !== null) {
    try {
      Ye(r);
    } catch (o) {
      throw F(r), o;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & He) === 0 && (i = i.first, (e & xe) !== 0 && (e & Ce) !== 0 && i !== null && (i.f |= Ce));
  }
  if (i !== null && (i.parent = n, n !== null && ci(i, n), m !== null && (m.f & N) !== 0 && (e & Ae) === 0)) {
    var s = (
      /** @type {Derived} */
      m
    );
    (s.effects ??= []).push(i);
  }
  return r;
}
function Gt() {
  return m !== null && !J;
}
function di(e) {
  const t = fe(pt, null);
  return C(t, M), t.teardown = e, t;
}
function Bn(e) {
  ui();
  var t = (
    /** @type {Effect} */
    w.f
  ), n = !m && (t & Z) !== 0 && (t & Re) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      Y
    );
    (r.e ??= []).push(e);
  } else
    return Gn(e);
}
function Gn(e) {
  return fe(qe | Sr, e);
}
function vi(e) {
  we.ensure();
  const t = fe(Ae | He, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Se(t, () => {
      F(t), r(void 0);
    }) : (F(t), r(void 0));
  });
}
function hi(e) {
  return fe(qe, e);
}
function pi(e) {
  return fe(Yt | He, e);
}
function _i(e, t = 0) {
  return fe(pt | t, e);
}
function pe(e, t = [], n = [], r = []) {
  $r(r, t, n, (i) => {
    fe(pt, () => e(...i.map(c)));
  });
}
function _t(e, t = 0) {
  var n = fe(xe | t, e);
  return n;
}
function U(e) {
  return fe(Z | He, e);
}
function Kn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = Oe, r = m;
    an(!0), K(null);
    try {
      t.call(null);
    } finally {
      an(n), K(r);
    }
  }
}
function Kt(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Vn(() => {
      i.abort(oe);
    });
    var r = n.next;
    (n.f & Ae) !== 0 ? n.parent = null : F(n, t), n = r;
  }
}
function gi(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & Z) === 0 && F(t), t = n;
  }
}
function F(e, t = !0) {
  var n = !1;
  (t || (e.f & kr) !== 0) && e.nodes !== null && e.nodes.end !== null && (bi(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), C(e, tn), Kt(e, t && !n), nt(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Kn(e), e.f ^= tn, e.f |= X;
  var i = e.parent;
  i !== null && i.first !== null && Wn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function bi(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ rt(e);
    e.remove(), e = n;
  }
}
function Wn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Se(e, t, n = !0) {
  var r = [];
  Jn(e, r, !0);
  var i = () => {
    n && F(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var o = () => --s || i();
    for (var a of r)
      a.out(o);
  } else
    i();
}
function Jn(e, t, n) {
  if ((e.f & j) === 0) {
    e.f ^= j;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const a of r)
        (a.is_global || n) && t.push(a);
    for (var i = e.first; i !== null; ) {
      var s = i.next, o = (i.f & Ce) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & Z) !== 0 && (e.f & xe) !== 0;
      Jn(i, t, o ? n : !1), i = s;
    }
  }
}
function Wt(e) {
  Xn(e, !0);
}
function Xn(e, t) {
  if ((e.f & j) !== 0) {
    e.f ^= j, (e.f & M) === 0 && (C(e, P), we.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Ce) !== 0 || (n.f & Z) !== 0;
      Xn(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const o of s)
        (o.is_global || t) && o.in();
  }
}
function Jt(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ rt(n);
      t.append(n), n = i;
    }
}
let ft = !1, Oe = !1;
function an(e) {
  Oe = e;
}
let m = null, J = !1;
function K(e) {
  m = e;
}
let w = null;
function le(e) {
  w = e;
}
let G = null;
function Zn(e) {
  m !== null && (G === null ? G = [e] : G.push(e));
}
let D = null, L = 0, H = null;
function mi(e) {
  H = e;
}
let Qn = 1, Ee = 0, Te = Ee;
function on(e) {
  Te = e;
}
function $n() {
  return ++Qn;
}
function it(e) {
  var t = e.f;
  if ((t & P) !== 0)
    return !0;
  if (t & N && (e.f &= ~Me), (t & se) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (it(
        /** @type {Derived} */
        s
      ) && Dn(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & B) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    W === null && C(e, M);
  }
  return !1;
}
function er(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(G !== null && Fe.call(G, e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & N) !== 0 ? er(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? C(s, P) : (s.f & M) !== 0 && C(s, se), Ut(
        /** @type {Effect} */
        s
      ));
    }
}
function tr(e) {
  var t = D, n = L, r = H, i = m, s = G, o = Y, a = J, l = Te, f = e.f;
  D = /** @type {null | Value[]} */
  null, L = 0, H = null, m = (f & (Z | Ae)) === 0 ? e : null, G = null, Le(e.ctx), J = !1, Te = ++Ee, e.ac !== null && (Vn(() => {
    e.ac.abort(oe);
  }), e.ac = null);
  try {
    e.f |= Nt;
    var u = (
      /** @type {Function} */
      e.fn
    ), p = u();
    e.f |= Re;
    var v = e.deps, _ = k?.is_fork;
    if (D !== null) {
      var h;
      if (_ || nt(e, L), v !== null && L > 0)
        for (v.length = L + D.length, h = 0; h < D.length; h++)
          v[L + h] = D[h];
      else
        e.deps = v = D;
      if (Gt() && (e.f & B) !== 0)
        for (h = L; h < v.length; h++)
          (v[h].reactions ??= []).push(e);
    } else !_ && v !== null && L < v.length && (nt(e, L), v.length = L);
    if (Tn() && H !== null && !J && v !== null && (e.f & (N | se | P)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      H.length; h++)
        er(
          H[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Ee++, i.deps !== null)
        for (let g = 0; g < n; g += 1)
          i.deps[g].rv = Ee;
      if (t !== null)
        for (const g of t)
          g.rv = Ee;
      H !== null && (r === null ? r = H : r.push(.../** @type {Source[]} */
      H));
    }
    return (e.f & ge) !== 0 && (e.f ^= ge), p;
  } catch (g) {
    return An(g);
  } finally {
    e.f ^= Nt, D = t, L = n, H = r, m = i, G = s, Le(o), J = a, Te = l;
  }
}
function wi(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = gr.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & N) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (D === null || !Fe.call(D, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & B) !== 0 && (s.f ^= B, s.f &= ~Me), Ht(s), si(s), nt(s, 0);
  }
}
function nt(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      wi(e, n[r]);
}
function Ye(e) {
  var t = e.f;
  if ((t & X) === 0) {
    C(e, M);
    var n = w, r = ft;
    w = e, ft = !0;
    try {
      (t & (xe | mn)) !== 0 ? gi(e) : Kt(e), Kn(e);
      var i = tr(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Qn;
      var s;
    } finally {
      ft = r, w = n;
    }
  }
}
function c(e) {
  var t = e.f, n = (t & N) !== 0;
  if (m !== null && !J) {
    var r = w !== null && (w.f & X) !== 0;
    if (!r && (G === null || !Fe.call(G, e))) {
      var i = m.deps;
      if ((m.f & Nt) !== 0)
        e.rv < Ee && (e.rv = Ee, D === null && i !== null && i[L] === e ? L++ : D === null ? D = [e] : D.push(e));
      else {
        (m.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [m] : Fe.call(s, m) || s.push(m);
      }
    }
  }
  if (Oe && be.has(e))
    return be.get(e);
  if (n) {
    var o = (
      /** @type {Derived} */
      e
    );
    if (Oe) {
      var a = o.v;
      return ((o.f & M) === 0 && o.reactions !== null || rr(o)) && (a = Bt(o)), be.set(o, a), a;
    }
    var l = (o.f & B) === 0 && !J && m !== null && (ft || (m.f & B) !== 0), f = (o.f & Re) === 0;
    it(o) && (l && (o.f |= B), Dn(o)), l && !f && (zn(o), nr(o));
  }
  if (W?.has(e))
    return W.get(e);
  if ((e.f & ge) !== 0)
    throw e.v;
  return e.v;
}
function nr(e) {
  if (e.f |= B, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & N) !== 0 && (t.f & B) === 0 && (zn(
        /** @type {Derived} */
        t
      ), nr(
        /** @type {Derived} */
        t
      ));
}
function rr(e) {
  if (e.v === R) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (be.has(t) || (t.f & N) !== 0 && rr(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function ir(e) {
  var t = J;
  try {
    return J = !0, e();
  } finally {
    J = t;
  }
}
const xi = ["touchstart", "touchmove"];
function yi(e) {
  return xi.includes(e);
}
const Ze = /* @__PURE__ */ Symbol("events"), sr = /* @__PURE__ */ new Set(), It = /* @__PURE__ */ new Set();
function dt(e, t, n) {
  (t[Ze] ??= {})[e] = n;
}
function Xt(e) {
  for (var t = 0; t < e.length; t++)
    sr.add(e[t]);
  for (var n of It)
    n(e);
}
let fn = null;
function un(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = e.composedPath?.() || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  fn = e;
  var o = 0, a = fn === e && e[Ze];
  if (a) {
    var l = i.indexOf(a);
    if (l !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Ze] = t;
      return;
    }
    var f = i.indexOf(t);
    if (f === -1)
      return;
    l <= f && (o = l);
  }
  if (s = /** @type {Element} */
  i[o] || e.target, s !== t) {
    br(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var u = m, p = w;
    K(null), le(null);
    try {
      for (var v, _ = []; s !== null; ) {
        var h = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var g = s[Ze]?.[r];
          g != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && g.call(s, e);
        } catch (d) {
          v ? _.push(d) : v = d;
        }
        if (e.cancelBubble || h === t || h === null)
          break;
        s = h;
      }
      if (v) {
        for (let d of _)
          queueMicrotask(() => {
            throw d;
          });
        throw v;
      }
    } finally {
      e[Ze] = t, delete e.currentTarget, K(u), le(p);
    }
  }
}
const Ei = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function ki(e) {
  return (
    /** @type {string} */
    Ei?.createHTML(e) ?? e
  );
}
function Si(e) {
  var t = Un("template");
  return t.innerHTML = ki(e.replaceAll("<!>", "<!---->")), t.content;
}
function Pt(e, t) {
  var n = (
    /** @type {Effect} */
    w
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Q(e, t) {
  var n = (t & Yr) !== 0, r = (t & Hr) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = Si(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ ct(i)));
    var o = (
      /** @type {TemplateNode} */
      r || Ln ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var a = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ ct(o)
      ), l = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      Pt(a, l);
    } else
      Pt(o, o);
    return o;
  };
}
function Dt() {
  var e = document.createDocumentFragment(), t = document.createComment(""), n = me();
  return e.append(t, n), Pt(t, n), e;
}
function z(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function ne(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = `${n}`);
}
function Ti(e, t) {
  return Ai(e, t);
}
const at = /* @__PURE__ */ new Map();
function Ai(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: o = !0, transformError: a }) {
  oi();
  var l = void 0, f = vi(() => {
    var u = n ?? t.appendChild(me());
    Zr(
      /** @type {TemplateNode} */
      u,
      {
        pending: () => {
        }
      },
      (_) => {
        kn({});
        var h = (
          /** @type {ComponentContext} */
          Y
        );
        s && (h.c = s), i && (r.$$events = i), l = e(_, r) || {}, Sn();
      },
      a
    );
    var p = /* @__PURE__ */ new Set(), v = (_) => {
      for (var h = 0; h < _.length; h++) {
        var g = _[h];
        if (!p.has(g)) {
          p.add(g);
          var d = yi(g);
          for (const E of [t, document]) {
            var b = at.get(E);
            b === void 0 && (b = /* @__PURE__ */ new Map(), at.set(E, b));
            var S = b.get(g);
            S === void 0 ? (E.addEventListener(g, un, { passive: d }), b.set(g, 1)) : b.set(g, S + 1);
          }
        }
      }
    };
    return v(ht(sr)), It.add(v), () => {
      for (var _ of p)
        for (const d of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            at.get(d)
          ), g = (
            /** @type {number} */
            h.get(_)
          );
          --g == 0 ? (d.removeEventListener(_, un), h.delete(_), h.size === 0 && at.delete(d)) : h.set(_, g);
        }
      It.delete(v), u !== n && u.parentNode?.removeChild(u);
    };
  });
  return zt.set(l, f), l;
}
let zt = /* @__PURE__ */ new WeakMap();
function Ci(e, t) {
  const n = zt.get(e);
  return n ? (zt.delete(e), n(t)) : Promise.resolve();
}
class lr {
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
  #o = /* @__PURE__ */ new Map();
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
      ), r = this.#o.get(n);
      if (r)
        Wt(r), this.#r.delete(n);
      else {
        var i = this.#e.get(n);
        i && (this.#o.set(n, i.effect), this.#e.delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
      }
      for (const [s, o] of this.#t) {
        if (this.#t.delete(s), s === t)
          break;
        const a = this.#e.get(o);
        a && (F(a.effect), this.#e.delete(o));
      }
      for (const [s, o] of this.#o) {
        if (s === n || this.#r.has(s)) continue;
        const a = () => {
          if (Array.from(this.#t.values()).includes(s)) {
            var f = document.createDocumentFragment();
            Jt(o, f), f.append(me()), this.#e.set(s, { effect: o, fragment: f });
          } else
            F(o);
          this.#r.delete(s), this.#o.delete(s);
        };
        this.#i || !r ? (this.#r.add(s), Se(o, a, !1)) : a();
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
      n.includes(r) || (F(i.effect), this.#e.delete(r));
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
    ), i = Hn();
    if (n && !this.#o.has(t) && !this.#e.has(t))
      if (i) {
        var s = document.createDocumentFragment(), o = me();
        s.append(o), this.#e.set(t, {
          effect: U(() => n(o)),
          fragment: s
        });
      } else
        this.#o.set(
          t,
          U(() => n(this.anchor))
        );
    if (this.#t.set(r, t), i) {
      for (const [a, l] of this.#o)
        a === t ? r.unskip_effect(l) : r.skip_effect(l);
      for (const [a, l] of this.#e)
        a === t ? r.unskip_effect(l.effect) : r.skip_effect(l.effect);
      r.oncommit(this.#n), r.ondiscard(this.#s);
    } else
      this.#n(r);
  }
}
function vt(e, t, n = !1) {
  var r = new lr(e), i = n ? Ce : 0;
  function s(o, a) {
    r.ensure(o, a);
  }
  _t(() => {
    var o = !1;
    t((a, l = 0) => {
      o = !0, s(l, a);
    }), o || s(-1, null);
  }, i);
}
function ar(e, t) {
  return t;
}
function Mi(e, t, n) {
  for (var r = [], i = t.length, s, o = t.length, a = 0; a < i; a++) {
    let p = t[a];
    Se(
      p,
      () => {
        if (s) {
          if (s.pending.delete(p), s.done.add(p), s.pending.size === 0) {
            var v = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Ft(e, ht(s.done)), v.delete(s), v.size === 0 && (e.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var l = r.length === 0 && n !== null;
    if (l) {
      var f = (
        /** @type {Element} */
        n
      ), u = (
        /** @type {Element} */
        f.parentNode
      );
      fi(u), u.append(f), e.items.clear();
    }
    Ft(e, t, !l);
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
    for (const o of e.pending.values())
      for (const a of o)
        r.add(
          /** @type {EachItem} */
          e.items.get(a).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (r?.has(s)) {
      s.f |= ie;
      const o = document.createDocumentFragment();
      Jt(s, o);
    } else
      F(t[i], n);
  }
}
var cn;
function qt(e, t, n, r, i, s = null) {
  var o = e, a = /* @__PURE__ */ new Map(), l = (t & wn) !== 0;
  if (l) {
    var f = (
      /** @type {Element} */
      e
    );
    o = f.appendChild(me());
  }
  var u = null, p = /* @__PURE__ */ ni(() => {
    var E = n();
    return _n(E) ? E : E == null ? [] : ht(E);
  }), v, _ = /* @__PURE__ */ new Map(), h = !0;
  function g(E) {
    (S.effect.f & X) === 0 && (S.pending.delete(E), S.fallback = u, Ni(S, v, o, t, r), u !== null && (v.length === 0 ? (u.f & ie) === 0 ? Wt(u) : (u.f ^= ie, Qe(u, null, o)) : Se(u, () => {
      u = null;
    })));
  }
  function d(E) {
    S.pending.delete(E);
  }
  var b = _t(() => {
    v = /** @type {V[]} */
    c(p);
    for (var E = v.length, O = /* @__PURE__ */ new Set(), q = (
      /** @type {Batch} */
      k
    ), ue = Hn(), I = 0; I < E; I += 1) {
      var $ = v[I], ce = r($, I), y = h ? null : a.get(ce);
      y ? (y.v && je(y.v, $), y.i && je(y.i, I), ue && q.unskip_effect(y.e)) : (y = Oi(
        a,
        h ? o : cn ??= me(),
        $,
        ce,
        I,
        i,
        t,
        n
      ), h || (y.e.f |= ie), a.set(ce, y)), O.add(ce);
    }
    if (E === 0 && s && !u && (h ? u = U(() => s(o)) : (u = U(() => s(cn ??= me())), u.f |= ie)), E > O.size && Cr(), !h)
      if (_.set(q, O), ue) {
        for (const [ee, Ie] of a)
          O.has(ee) || q.skip_effect(Ie.e);
        q.oncommit(g), q.ondiscard(d);
      } else
        g(q);
    c(p);
  }), S = { effect: b, items: a, pending: _, outrogroups: null, fallback: u };
  h = !1;
}
function Xe(e) {
  for (; e !== null && (e.f & Z) === 0; )
    e = e.next;
  return e;
}
function Ni(e, t, n, r, i) {
  var s = (r & Lr) !== 0, o = t.length, a = e.items, l = Xe(e.effect.first), f, u = null, p, v = [], _ = [], h, g, d, b;
  if (s)
    for (b = 0; b < o; b += 1)
      h = t[b], g = i(h, b), d = /** @type {EachItem} */
      a.get(g).e, (d.f & ie) === 0 && (d.nodes?.a?.measure(), (p ??= /* @__PURE__ */ new Set()).add(d));
  for (b = 0; b < o; b += 1) {
    if (h = t[b], g = i(h, b), d = /** @type {EachItem} */
    a.get(g).e, e.outrogroups !== null)
      for (const y of e.outrogroups)
        y.pending.delete(d), y.done.delete(d);
    if ((d.f & j) !== 0 && (Wt(d), s && (d.nodes?.a?.unfix(), (p ??= /* @__PURE__ */ new Set()).delete(d))), (d.f & ie) !== 0)
      if (d.f ^= ie, d === l)
        Qe(d, null, n);
      else {
        var S = u ? u.next : l;
        d === e.effect.last && (e.effect.last = d.prev), d.prev && (d.prev.next = d.next), d.next && (d.next.prev = d.prev), he(e, u, d), he(e, d, S), Qe(d, S, n), u = d, v = [], _ = [], l = Xe(u.next);
        continue;
      }
    if (d !== l) {
      if (f !== void 0 && f.has(d)) {
        if (v.length < _.length) {
          var E = _[0], O;
          u = E.prev;
          var q = v[0], ue = v[v.length - 1];
          for (O = 0; O < v.length; O += 1)
            Qe(v[O], E, n);
          for (O = 0; O < _.length; O += 1)
            f.delete(_[O]);
          he(e, q.prev, ue.next), he(e, u, q), he(e, ue, E), l = E, u = ue, b -= 1, v = [], _ = [];
        } else
          f.delete(d), Qe(d, l, n), he(e, d.prev, d.next), he(e, d, u === null ? e.effect.first : u.next), he(e, u, d), u = d;
        continue;
      }
      for (v = [], _ = []; l !== null && l !== d; )
        (f ??= /* @__PURE__ */ new Set()).add(l), _.push(l), l = Xe(l.next);
      if (l === null)
        continue;
    }
    (d.f & ie) === 0 && v.push(d), u = d, l = Xe(d.next);
  }
  if (e.outrogroups !== null) {
    for (const y of e.outrogroups)
      y.pending.size === 0 && (Ft(e, ht(y.done)), e.outrogroups?.delete(y));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (l !== null || f !== void 0) {
    var I = [];
    if (f !== void 0)
      for (d of f)
        (d.f & j) === 0 && I.push(d);
    for (; l !== null; )
      (l.f & j) === 0 && l !== e.fallback && I.push(l), l = Xe(l.next);
    var $ = I.length;
    if ($ > 0) {
      var ce = (r & wn) !== 0 && o === 0 ? n : null;
      if (s) {
        for (b = 0; b < $; b += 1)
          I[b].nodes?.a?.measure();
        for (b = 0; b < $; b += 1)
          I[b].nodes?.a?.fix();
      }
      Mi(e, I, ce);
    }
  }
  s && ke(() => {
    if (p !== void 0)
      for (d of p)
        d.nodes?.a?.apply();
  });
}
function Oi(e, t, n, r, i, s, o, a) {
  var l = (o & Fr) !== 0 ? (o & jr) === 0 ? /* @__PURE__ */ li(n, !1, !1) : Ne(n) : null, f = (o & qr) !== 0 ? Ne(i) : null;
  return {
    v: l,
    i: f,
    e: U(() => (s(t, l ?? n, f ?? i, a), () => {
      e.delete(r);
    }))
  };
}
function Qe(e, t, n) {
  if (e.nodes)
    for (var r = e.nodes.start, i = e.nodes.end, s = t && (t.f & ie) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : n; r !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ rt(r)
      );
      if (s.before(r), r === i)
        return;
      r = o;
    }
}
function he(e, t, n) {
  t === null ? e.effect.first = n : t.next = n, n === null ? e.effect.last = t : n.prev = t;
}
function Lt(e, t, ...n) {
  var r = new lr(e);
  _t(() => {
    const i = t() ?? null;
    r.ensure(i, i && ((s) => i(s, ...n)));
  }, Ce);
}
function or(e, t) {
  hi(() => {
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
      const i = Un("style");
      i.id = t.hash, i.textContent = t.code, r.appendChild(i);
    }
  });
}
const dn = [...` 	
\r\f \v\uFEFF`];
function Ri(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, o = 0; (o = r.indexOf(i, o)) >= 0; ) {
          var a = o + s;
          (o === 0 || dn.includes(r[o - 1])) && (a === r.length || dn.includes(r[a])) ? r = (o === 0 ? "" : r.substring(0, o)) + r.substring(a + 1) : o = a;
        }
  }
  return r === "" ? null : r;
}
function vn(e, t = !1) {
  var n = t ? " !important;" : ";", r = "";
  for (var i of Object.keys(e)) {
    var s = e[i];
    s != null && s !== "" && (r += " " + i + ": " + s + n);
  }
  return r;
}
function Ii(e, t) {
  if (t) {
    var n = "", r, i;
    return Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, r && (n += vn(r)), i && (n += vn(i, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(e);
}
function jt(e, t, n, r, i, s) {
  var o = e.__className;
  if (o !== n || o === void 0) {
    var a = Ri(n, r, s);
    a == null ? e.removeAttribute("class") : e.className = a, e.__className = n;
  } else if (s && i !== s)
    for (var l in s) {
      var f = !!s[l];
      (i == null || f !== !!i[l]) && e.classList.toggle(l, f);
    }
  return s;
}
function At(e, t = {}, n, r) {
  for (var i in n) {
    var s = n[i];
    t[i] !== s && (n[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, s, r));
  }
}
function Pi(e, t, n, r) {
  var i = e.__style;
  if (i !== t) {
    var s = Ii(t, r);
    s == null ? e.removeAttribute("style") : e.style.cssText = s, e.__style = t;
  } else r && (Array.isArray(r) ? (At(e, n?.[0], r[0]), At(e, n?.[1], r[1], "important")) : At(e, n, r));
  return r;
}
const Di = /* @__PURE__ */ Symbol("is custom element"), zi = /* @__PURE__ */ Symbol("is html");
function Fi(e, t, n, r) {
  var i = qi(e);
  i[t] !== (i[t] = n) && (n == null ? e.removeAttribute(t) : typeof n != "string" && Li(e).includes(t) ? e[t] = n : e.setAttribute(t, n));
}
function qi(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [Di]: e.nodeName.includes("-"),
      [zi]: e.namespaceURI === xn
    }
  );
}
var hn = /* @__PURE__ */ new Map();
function Li(e) {
  var t = e.getAttribute("is") || e.nodeName, n = hn.get(t);
  if (n) return n;
  hn.set(t, n = []);
  for (var r, i = e, s = Element.prototype; s !== i; ) {
    r = mr(i);
    for (var o in r)
      r[o].set && n.push(o);
    i = gn(i);
  }
  return n;
}
function Ct(e, t, n, r) {
  var i = (
    /** @type {V} */
    r
  ), s = !0, o = () => (s && (s = !1, i = /** @type {V} */
  r), i), a;
  a = /** @type {V} */
  e[t], a === void 0 && r !== void 0 && (a = o());
  var l;
  return l = () => {
    var f = (
      /** @type {V} */
      e[t]
    );
    return f === void 0 ? o() : (s = !0, f);
  }, l;
}
function ji(e) {
  Y === null && Tr(), Bn(() => {
    const t = ir(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
const Yi = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Yi);
async function Hi(e, t, n) {
  const r = await e.state.get(t);
  return r ? { ...n, ...r } : { ...n };
}
function fr(e) {
  const t = [...e];
  for (let n = t.length - 1; n > 0; n--) {
    const r = Math.floor(Math.random() * (n + 1));
    [t[n], t[r]] = [t[r], t[n]];
  }
  return t;
}
var Ui = /* @__PURE__ */ Q('<button><div class="flip-card-inner svelte-9334zb"><div class="flip-card-front analog-card svelte-9334zb"><!></div> <div class="flip-card-back analog-card analog-card-back svelte-9334zb"><!></div></div></button>');
const Vi = {
  hash: "svelte-9334zb",
  code: `.flip-card.svelte-9334zb {perspective:600px;background:transparent;border:none;padding:0;cursor:pointer;outline:none;will-change:transform;-webkit-tap-highlight-color:transparent;}.flip-card.svelte-9334zb:disabled {cursor:default;}.flip-card-inner.svelte-9334zb {position:relative;width:100%;height:100%;transform-style:preserve-3d;transition:transform 400ms cubic-bezier(0.4, 0, 0.2, 1);}.flip-card.flipped.svelte-9334zb .flip-card-inner:where(.svelte-9334zb) {transform:rotateY(180deg);}.flip-card.matched.svelte-9334zb .flip-card-inner:where(.svelte-9334zb) {
		animation: analog-match-pulse 350ms ease;}.flip-card.svelte-9334zb:not(:disabled):hover .flip-card-inner:where(.svelte-9334zb) {box-shadow:var(--card-shadow-lifted);transform:translateY(-2px);}.flip-card:not(:disabled).flipped.svelte-9334zb:hover .flip-card-inner:where(.svelte-9334zb) {transform:rotateY(180deg) translateY(-2px);}.flip-card-front.svelte-9334zb,
	.flip-card-back.svelte-9334zb {position:absolute;inset:0;backface-visibility:hidden;display:flex;align-items:center;justify-content:center;border-radius:8px;overflow:hidden;}.flip-card-front.svelte-9334zb {transform:rotateY(180deg);}.flip-card.matched.svelte-9334zb .flip-card-front:where(.svelte-9334zb) {box-shadow:0 0 12px color-mix(in srgb, var(--box-correct, #5cb878) 30%, transparent),
			var(--card-shadow);}`
};
function Bi(e, t) {
  or(e, Vi);
  let n = Ct(t, "flipped", 3, !1), r = Ct(t, "matched", 3, !1), i = Ct(t, "disabled", 3, !1);
  var s = Ui();
  let o;
  var a = A(s), l = A(a), f = A(l);
  Lt(f, () => t.front);
  var u = V(l, 2), p = A(u);
  Lt(p, () => t.back), pe(() => {
    o = jt(s, 1, "flip-card svelte-9334zb", null, o, { flipped: n(), matched: r() }), s.disabled = i(), Fi(s, "aria-label", n() ? "Card face up" : "Card face down");
  }), dt("click", s, function(...v) {
    t.onclick?.apply(this, v);
  }), z(e, s);
}
Xt(["click"]);
var Gi = /* @__PURE__ */ Q('<div class="box-stat-cell"><span class="box-stat-num"> </span> <span class="box-stat-tag"> </span></div>'), Ki = /* @__PURE__ */ Q('<p class="box-lifetime"> </p>'), Wi = /* @__PURE__ */ Q('<div class="box-summary"><p class="box-summary-heading">Done</p> <div class="box-stat-grid"></div> <!> <div class="box-results-actions"><button class="box-results-btn">Again</button> <button class="box-results-btn primary">Continue</button></div></div>');
function Ji(e, t) {
  var n = Dt(), r = tt(n);
  {
    var i = (o) => {
      var a = Dt(), l = tt(a);
      Lt(l, () => t.children), z(o, a);
    }, s = (o) => {
      var a = Wi(), l = V(A(a), 2);
      qt(l, 21, () => t.stats, ar, (h, g, d) => {
        var b = Gi();
        Pi(b, "", {}, { "animation-delay": `${d * 80}ms` });
        var S = A(b), E = A(S), O = V(S, 2), q = A(O);
        pe(() => {
          ne(E, c(g).value), ne(q, c(g).label);
        }), z(h, b);
      });
      var f = V(l, 2);
      {
        var u = (h) => {
          var g = Ki(), d = A(g);
          pe(() => ne(d, t.lifetime)), z(h, g);
        };
        vt(f, (h) => {
          t.lifetime && h(u);
        });
      }
      var p = V(f, 2), v = A(p), _ = V(v, 2);
      dt("click", v, function(...h) {
        t.onAgain?.apply(this, h);
      }), dt("click", _, function(...h) {
        t.onContinue?.apply(this, h);
      }), z(o, a);
    };
    vt(r, (o) => {
      t.phase === "playing" ? o(i) : o(s, -1);
    });
  }
  z(e, n);
}
Xt(["click"]);
function pn(e, t = "seconds") {
  if (t === "clock") {
    const n = Math.floor(e / 1e3), r = Math.floor(n / 60), i = n % 60;
    return `${r}:${i.toString().padStart(2, "0")}`;
  }
  return (e / 1e3).toFixed(1) + "s";
}
function Xi(e, t, n = "—") {
  return e == null ? n : t ? `${e}${t}` : String(e);
}
const Zi = [
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
], Qi = Array.from({ length: 20 }, (e, t) => String(t + 1)), $i = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
function es(e, t) {
  return fr([...e === "numbers" ? Qi : e === "letters" ? $i : Zi]).slice(0, t);
}
var ts = /* @__PURE__ */ Q('<span class="card-symbol svelte-89x1i6"> </span>'), ns = /* @__PURE__ */ Q('<span class="card-index svelte-89x1i6"></span>'), rs = /* @__PURE__ */ Q('<p class="box-label stage-label svelte-89x1i6">Watch the sequence</p> <div class="card-row svelte-89x1i6"></div> <p class="box-meta"> </p>', 1), is = /* @__PURE__ */ Q("<span> </span>"), ss = /* @__PURE__ */ Q('<button><span class="card-symbol svelte-89x1i6"> </span> <!></button>'), ls = /* @__PURE__ */ Q('<div class="recall-header svelte-89x1i6"><span class="box-label"> </span> <span class="box-label"> </span></div> <div class="card-row svelte-89x1i6"></div> <p class="box-meta"> </p>', 1), as = /* @__PURE__ */ Q('<div class="box-container analog-paper"><!></div>');
const os = {
  hash: "svelte-89x1i6",
  code: `.stage-label.svelte-89x1i6 {text-align:center;
		animation: svelte-89x1i6-fade-in 300ms ease;}.recall-header.svelte-89x1i6 {display:flex;justify-content:space-between;width:100%;max-width:520px;}.card-row.svelte-89x1i6 {display:flex;gap:8px;justify-content:center;flex-wrap:wrap;max-width:520px;width:100%;}.card-row.svelte-89x1i6 .flip-card {width:64px;height:88px;flex-shrink:0;}.card-row.svelte-89x1i6 .flip-card-front,
	.card-row.svelte-89x1i6 .flip-card-back {width:100%;height:100%;}.card-symbol.svelte-89x1i6 {font-size:clamp(1.4rem, 4vw, 2rem);line-height:1;user-select:none;transition:color 200ms;}.card-index.svelte-89x1i6 {font-size:0.75rem;font-weight:600;color:var(--text-muted, #808080);user-select:none;}.recall-card.svelte-89x1i6 {width:64px;height:88px;flex-shrink:0;display:flex;align-items:center;justify-content:center;position:relative;cursor:pointer;transition:opacity 200ms, transform 200ms;-webkit-tap-highlight-color:transparent;}.recall-card.svelte-89x1i6:not(:disabled):hover {transform:translateY(-2px);box-shadow:var(--card-shadow-lifted);}.recall-card.picked.svelte-89x1i6 {opacity:0.5;cursor:default;}.recall-card.correct.svelte-89x1i6 {box-shadow:0 0 12px color-mix(in srgb, var(--box-correct, #5cb878) 30%, transparent), var(--card-shadow);}.recall-card.wrong.svelte-89x1i6 {box-shadow:0 0 12px color-mix(in srgb, var(--box-wrong, #bf4f4f) 30%, transparent), var(--card-shadow);}.recall-card.wrong.svelte-89x1i6 .card-symbol:where(.svelte-89x1i6) {color:var(--box-wrong, #bf4f4f);}.pick-order.svelte-89x1i6 {position:absolute;bottom:4px;right:6px;font-size:0.65rem;font-weight:700;color:var(--text-secondary, #a0a0a0);opacity:0.7;}.pick-order.wrong.svelte-89x1i6 {color:var(--box-wrong, #bf4f4f);}

	@keyframes svelte-89x1i6-fade-in {
		from { opacity: 0; transform: translateY(4px); }
		to { opacity: 1; transform: translateY(0); }
	}`
};
function fs(e, t) {
  kn(t, !0), or(e, os);
  let n = /* @__PURE__ */ te(() => parseInt(t.ctx.settings.length, 10) || 4), r = /* @__PURE__ */ te(() => parseInt(t.ctx.settings.showTimeMs, 10) || 1e3), i = /* @__PURE__ */ te(() => t.ctx.settings.deck || "emoji"), s = /* @__PURE__ */ T(re([])), o = /* @__PURE__ */ T(re([])), a = /* @__PURE__ */ T(-1), l = /* @__PURE__ */ T("watch"), f = /* @__PURE__ */ T("playing"), u = /* @__PURE__ */ T(re([])), p = /* @__PURE__ */ T(re([])), v = /* @__PURE__ */ T(0), _ = /* @__PURE__ */ T(0), h = /* @__PURE__ */ T(0), g = /* @__PURE__ */ T(0), d = /* @__PURE__ */ T(re({
    totalCompletions: 0,
    totalPerfect: 0,
    bestStreak: 0,
    longestSequence: 0
  }));
  function b() {
    x(s, es(c(i), c(n)), !0), x(o, fr(c(s).map((y, ee) => ({ symbol: y, seqIndex: ee }))), !0), x(a, -1), x(l, "watch"), x(f, "playing"), x(u, [], !0), x(p, [], !0), x(v, 0), x(g, 0), S();
  }
  function S() {
    x(a, 0);
    const y = setInterval(
      () => {
        Tt(a), c(a) >= c(s).length && (clearInterval(y), setTimeout(
          () => {
            x(a, -1), x(l, "recall"), x(_, Date.now(), !0);
          },
          c(r)
        ));
      },
      c(r)
    );
  }
  Bn(() => {
    if (c(l) !== "recall") return;
    const y = setInterval(
      () => {
        x(h, Date.now() - c(_));
      },
      100
    );
    return () => clearInterval(y);
  });
  function E(y) {
    if (c(l) !== "recall" || c(u).includes(y)) return;
    const ee = c(o)[y];
    x(u, [...c(u), y], !0), ee.seqIndex === c(v) ? (x(p, [...c(p), "correct"], !0), Tt(g), Tt(v)) : (x(p, [...c(p), "wrong"], !0), x(g, 0)), c(u).length >= c(s).length && O();
  }
  function O() {
    x(h, Date.now() - c(_)), x(l, "result");
    const ee = c(p).filter((Ie) => Ie === "correct").length === c(s).length;
    c(d).totalCompletions++, ee && c(d).totalPerfect++, c(g) > c(d).bestStreak && (c(d).bestStreak = c(g)), ee && c(s).length > c(d).longestSequence && (c(d).longestSequence = c(s).length), x(d, { ...c(d) }, !0), t.ctx.state.set("speed-cards-stats", c(d)), setTimeout(
      () => {
        x(f, "done");
      },
      1200
    );
  }
  let q = /* @__PURE__ */ te(() => c(p).filter((y) => y === "correct").length), ue = /* @__PURE__ */ te(() => [
    {
      label: "correct",
      value: `${c(q)}/${c(s).length}`
    },
    { label: "time", value: pn(c(h)) },
    {
      label: "best streak",
      value: Xi(c(d).bestStreak)
    },
    {
      label: "longest perfect",
      value: c(d).longestSequence > 0 ? `${c(d).longestSequence} cards` : "—"
    }
  ]), I = /* @__PURE__ */ te(() => `${c(d).totalCompletions} round${c(d).totalCompletions === 1 ? "" : "s"} · ${c(d).totalPerfect} perfect`);
  ji(async () => {
    x(
      d,
      await Hi(t.ctx, "speed-cards-stats", {
        totalCompletions: 0,
        totalPerfect: 0,
        bestStreak: 0,
        longestSequence: 0
      }),
      !0
    ), b();
  });
  var $ = as(), ce = A($);
  Ji(ce, {
    get phase() {
      return c(f);
    },
    get stats() {
      return c(ue);
    },
    get lifetime() {
      return c(I);
    },
    onAgain: b,
    onContinue: () => t.ctx.complete({ outcome: "completed" }),
    children: (ee) => {
      var Ie = Dt(), ur = tt(Ie);
      {
        var cr = (Pe) => {
          var Ue = rs(), Ve = V(tt(Ue), 2);
          qt(Ve, 21, () => c(s), ar, (Be, bt, Ge) => {
            {
              const mt = (Ke) => {
                var de = ts(), We = A(de);
                pe(() => ne(We, c(bt))), z(Ke, de);
              }, wt = (Ke) => {
                var de = ns();
                de.textContent = Ge + 1, z(Ke, de);
              };
              let ye = /* @__PURE__ */ te(() => Ge === c(a));
              Bi(Be, {
                get flipped() {
                  return c(ye);
                },
                disabled: !0,
                front: mt,
                back: wt,
                $$slots: { front: !0, back: !0 }
              });
            }
          });
          var st = V(Ve, 2), gt = A(st);
          pe((Be) => ne(gt, `${Be ?? ""} / ${c(s).length ?? ""}`), [() => Math.max(0, c(a) + 1)]), z(Pe, Ue);
        }, dr = (Pe) => {
          var Ue = ls(), Ve = tt(Ue), st = A(Ve), gt = A(st), Be = V(st, 2), bt = A(Be), Ge = V(Ve, 2);
          qt(Ge, 23, () => c(o), (ye) => ye.seqIndex, (ye, Ke, de) => {
            const We = /* @__PURE__ */ te(() => c(u).indexOf(c(de))), lt = /* @__PURE__ */ te(() => c(We) >= 0), xt = /* @__PURE__ */ te(() => c(lt) ? c(p)[c(We)] : null);
            var Je = ss();
            let Zt;
            var Qt = A(Je), vr = A(Qt), hr = V(Qt, 2);
            {
              var pr = (yt) => {
                var Et = is();
                let $t;
                var _r = A(Et);
                pe(() => {
                  $t = jt(Et, 1, "pick-order svelte-89x1i6", null, $t, { wrong: c(xt) === "wrong" }), ne(_r, c(We) + 1);
                }), z(yt, Et);
              };
              vt(hr, (yt) => {
                c(lt) && yt(pr);
              });
            }
            pe(() => {
              Zt = jt(Je, 1, "recall-card analog-card svelte-89x1i6", null, Zt, {
                picked: c(lt),
                correct: c(xt) === "correct",
                wrong: c(xt) === "wrong"
              }), Je.disabled = c(l) === "result" || c(lt), ne(vr, c(Ke).symbol);
            }), dt("click", Je, () => E(c(de))), z(ye, Je);
          });
          var mt = V(Ge, 2), wt = A(mt);
          pe(
            (ye) => {
              ne(gt, `Tap in order: ${c(v) + 1} of ${c(s).length ?? ""}`), ne(bt, ye), ne(wt, `${c(u).length ?? ""} / ${c(s).length ?? ""} picked`);
            },
            [() => pn(c(h), "clock")]
          ), z(Pe, Ue);
        };
        vt(ur, (Pe) => {
          c(l) === "watch" ? Pe(cr) : Pe(dr, -1);
        });
      }
      z(ee, Ie);
    }
  }), z(e, $), Sn();
}
Xt(["click"]);
function cs(e, t) {
  return Ti(fs, { target: e, props: t });
}
function ds(e) {
  Ci(e);
}
export {
  cs as mountPlugin,
  ds as unmountPlugin
};
