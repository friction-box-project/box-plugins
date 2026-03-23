var vr = Array.isArray, hr = Array.prototype.indexOf, Se = Array.prototype.includes, pr = Array.from, _r = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, br = Object.prototype, gr = Array.prototype, wr = Object.getPrototypeOf, zt = Object.isExtensible;
const mr = () => {
};
function xr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function en() {
  var e, t, n = new Promise((r, i) => {
    e = r, t = i;
  });
  return { promise: n, resolve: e, reject: t };
}
const A = 2, Te = 4, et = 8, tn = 1 << 24, ce = 16, W = 32, be = 64, dt = 128, I = 512, k = 1024, N = 2048, K = 4096, H = 8192, J = 16384, me = 32768, vt = 1 << 25, Ae = 65536, Lt = 1 << 17, yr = 1 << 18, Re = 1 << 19, Er = 1 << 20, ge = 65536, ht = 1 << 21, wt = 1 << 22, oe = 1 << 23, Je = /* @__PURE__ */ Symbol("$state"), re = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function kr(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Sr() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Tr(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Ar() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Cr(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Mr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Rr() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Nr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Pr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Dr() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Fr = 1, Or = 2, M = /* @__PURE__ */ Symbol(), jr = "http://www.w3.org/1999/xhtml";
function Ir() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function nn(e) {
  return e === this.v;
}
let D = null;
function Ce(e) {
  D = e;
}
function rn(e, t = !1, n) {
  D = {
    p: D,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      b
    ),
    l: null
  };
}
function sn(e) {
  var t = (
    /** @type {ComponentContext} */
    D
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      Sn(r);
  }
  return t.i = !0, D = t.p, /** @type {T} */
  {};
}
function ln() {
  return !0;
}
let he = [];
function an() {
  var e = he;
  he = [], xr(e);
}
function ke(e) {
  if (he.length === 0 && !ze) {
    var t = he;
    queueMicrotask(() => {
      t === he && an();
    });
  }
  he.push(e);
}
function zr() {
  for (; he.length > 0; )
    an();
}
function on(e) {
  var t = b;
  if (t === null)
    return _.f |= oe, e;
  if ((t.f & me) === 0 && (t.f & Te) === 0)
    throw e;
  ae(e, t);
}
function ae(e, t) {
  for (; t !== null; ) {
    if ((t.f & dt) !== 0) {
      if ((t.f & me) === 0)
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
const Lr = -7169;
function E(e, t) {
  e.f = e.f & Lr | t;
}
function mt(e) {
  (e.f & I) !== 0 || e.deps === null ? E(e, k) : E(e, K);
}
function fn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & A) === 0 || (t.f & ge) === 0 || (t.f ^= ge, fn(
        /** @type {Derived} */
        t.deps
      ));
}
function un(e, t, n) {
  (e.f & N) !== 0 ? t.add(e) : (e.f & K) !== 0 && n.add(e), fn(e.deps), E(e, k);
}
const le = /* @__PURE__ */ new Set();
let g = null, V = null, pt = null, ze = !1, ot = !1, ye = null, We = null;
var Bt = 0;
let Br = 1;
class ue {
  id = Br++;
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
        E(r, N), this.schedule(r);
      for (r of n.m)
        E(r, K), this.schedule(r);
    }
  }
  #v() {
    if (Bt++ > 1e3 && (le.delete(this), qr()), !this.#d()) {
      for (const l of this.#s)
        this.#l.delete(l), E(l, N), this.schedule(l);
      for (const l of this.#l)
        E(l, K), this.schedule(l);
    }
    const t = this.#n;
    this.#n = [], this.apply();
    var n = ye = [], r = [], i = We = [];
    for (const l of t)
      try {
        this.#u(l, n, r);
      } catch (a) {
        throw hn(l), a;
      }
    if (g = null, i.length > 0) {
      var s = ue.ensure();
      for (const l of i)
        s.schedule(l);
    }
    if (ye = null, We = null, this.#d() || this.#h()) {
      this.#p(r), this.#p(n);
      for (const [l, a] of this.#a)
        vn(l, a);
    } else {
      this.#e.size === 0 && le.delete(this), this.#s.clear(), this.#l.clear();
      for (const l of this.#t) l(this);
      this.#t.clear(), Yt(r), Yt(n), this.#i?.resolve();
    }
    var f = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      g
    );
    if (this.#n.length > 0) {
      const l = f ??= this;
      l.#n.push(...this.#n.filter((a) => !l.#n.includes(a)));
    }
    f !== null && (le.add(f), f.#v()), le.has(this) || this.#g();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #u(t, n, r) {
    t.f ^= k;
    for (var i = t.first; i !== null; ) {
      var s = i.f, f = (s & (W | be)) !== 0, l = f && (s & k) !== 0, a = l || (s & H) !== 0 || this.#a.has(i);
      if (!a && i.fn !== null) {
        f ? i.f ^= k : (s & Te) !== 0 ? n.push(i) : qe(i) && ((s & ce) !== 0 && this.#l.add(i), Me(i));
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
      un(t[n], this.#s, this.#l);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} old_value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    n !== M && !this.previous.has(t) && this.previous.set(t, n), (t.f & oe) === 0 && (this.current.set(t, [t.v, r]), V?.set(t, t.v));
  }
  activate() {
    g = this;
  }
  deactivate() {
    g = null, V = null;
  }
  flush() {
    try {
      ot = !0, g = this, this.#v();
    } finally {
      Bt = 0, pt = null, ye = null, We = null, ot = !1, g = null, V = null, fe.clear();
    }
  }
  discard() {
    for (const t of this.#o) t(this);
    this.#o.clear(), le.delete(this);
  }
  #g() {
    for (const o of le) {
      var t = o.id < this.id, n = [];
      for (const [u, [v, d]] of this.current) {
        if (o.current.has(u)) {
          var r = (
            /** @type {[any, boolean]} */
            o.current.get(u)[0]
          );
          if (t && v !== r)
            o.current.set(u, [v, d]);
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
        var s = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
        for (var l of n)
          cn(l, i, s, f);
        if (o.#n.length > 0) {
          o.apply();
          for (var a of o.#n)
            o.#u(a, [], []);
          o.#n = [];
        }
        o.deactivate();
      }
    }
    for (const o of le)
      o.#f.has(this) && (o.#f.delete(this), o.#f.size === 0 && !o.#d() && (o.activate(), o.#v()));
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
    return (this.#i ??= en()).promise;
  }
  static ensure() {
    if (g === null) {
      const t = g = new ue();
      ot || (le.add(g), ze || ke(() => {
        g === t && t.flush();
      }));
    }
    return g;
  }
  apply() {
    {
      V = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    if (pt = t, t.b?.is_pending && (t.f & (Te | et | tn)) !== 0 && (t.f & me) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (ye !== null && n === b && (_ === null || (_.f & A) === 0))
        return;
      if ((r & (be | W)) !== 0) {
        if ((r & k) === 0)
          return;
        n.f ^= k;
      }
    }
    this.#n.push(n);
  }
}
function Yr(e) {
  var t = ze;
  ze = !0;
  try {
    for (var n; ; ) {
      if (zr(), g === null)
        return (
          /** @type {T} */
          n
        );
      g.flush();
    }
  } finally {
    ze = t;
  }
}
function qr() {
  try {
    Mr();
  } catch (e) {
    ae(e, pt);
  }
}
let te = null;
function Yt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (J | H)) === 0 && qe(r) && (te = /* @__PURE__ */ new Set(), Me(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Mn(r), te?.size > 0)) {
        fe.clear();
        for (const i of te) {
          if ((i.f & (J | H)) !== 0) continue;
          const s = [i];
          let f = i.parent;
          for (; f !== null; )
            te.has(f) && (te.delete(f), s.push(f)), f = f.parent;
          for (let l = s.length - 1; l >= 0; l--) {
            const a = s[l];
            (a.f & (J | H)) === 0 && Me(a);
          }
        }
        te.clear();
      }
    }
    te = null;
  }
}
function cn(e, t, n, r) {
  if (!n.has(e) && (n.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & A) !== 0 ? cn(
        /** @type {Derived} */
        i,
        t,
        n,
        r
      ) : (s & (wt | ce)) !== 0 && (s & N) === 0 && dn(i, t, r) && (E(i, N), xt(
        /** @type {Effect} */
        i
      ));
    }
}
function dn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (Se.call(t, i))
        return !0;
      if ((i.f & A) !== 0 && dn(
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
function xt(e) {
  g.schedule(e);
}
function vn(e, t) {
  if (!((e.f & W) !== 0 && (e.f & k) !== 0)) {
    (e.f & N) !== 0 ? t.d.push(e) : (e.f & K) !== 0 && t.m.push(e), E(e, k);
    for (var n = e.first; n !== null; )
      vn(n, t), n = n.next;
  }
}
function hn(e) {
  E(e, k);
  for (var t = e.first; t !== null; )
    hn(t), t = t.next;
}
function Vr(e) {
  let t = 0, n = tt(0), r;
  return () => {
    kt() && (c(n), St(() => (t === 0 && (r = rt(() => e(() => Le(n)))), t += 1, () => {
      ke(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, Le(n));
      });
    })));
  };
}
var Ur = Ae | Re;
function Gr(e, t, n, r) {
  new Hr(e, t, n, r);
}
class Hr {
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
  #p = Vr(() => (this.#u = tt(this.#c), () => {
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
        b
      );
      f.b = this, f.f |= dt, r(s);
    }, this.parent = /** @type {Effect} */
    b.b, this.transform_error = i ?? this.parent?.transform_error ?? ((s) => s), this.#i = An(() => {
      this.#w();
    }, Ur);
  }
  #g() {
    try {
      this.#n = ne(() => this.#r(this.#t));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #x(t) {
    const n = this.#e.failed;
    n && (this.#l = ne(() => {
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
    t && (this.is_pending = !0, this.#s = ne(() => t(this.#t)), ke(() => {
      var n = this.#a = document.createDocumentFragment(), r = Xe();
      n.append(r), this.#n = this.#b(() => ne(() => this.#r(r))), this.#f === 0 && (this.#t.before(n), this.#a = null, Be(
        /** @type {Effect} */
        this.#s,
        () => {
          this.#s = null;
        }
      ), this.#_(
        /** @type {Batch} */
        g
      ));
    }));
  }
  #w() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#f = 0, this.#c = 0, this.#n = ne(() => {
        this.#r(this.#t);
      }), this.#f > 0) {
        var t = this.#a = document.createDocumentFragment();
        Pn(this.#n, t);
        const n = (
          /** @type {(anchor: Node) => void} */
          this.#e.pending
        );
        this.#s = ne(() => n(this.#t));
      } else
        this.#_(
          /** @type {Batch} */
          g
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
    un(t, this.#h, this.#v);
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
  #b(t) {
    var n = b, r = _, i = D;
    Z(this.#i), L(this.#i), Ce(this.#i.ctx);
    try {
      return ue.ensure(), t();
    } catch (s) {
      return on(s), null;
    } finally {
      Z(n), L(r), Ce(i);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #m(t, n) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#m(t, n);
      return;
    }
    this.#f += t, this.#f === 0 && (this.#_(n), this.#s && Be(this.#s, () => {
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
    this.#m(t, n), this.#c += t, !(!this.#u || this.#d) && (this.#d = !0, ke(() => {
      this.#d = !1, this.#u && Qe(this.#u, this.#c);
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
    this.#n && (O(this.#n), this.#n = null), this.#s && (O(this.#s), this.#s = null), this.#l && (O(this.#l), this.#l = null);
    var i = !1, s = !1;
    const f = () => {
      if (i) {
        Ir();
        return;
      }
      i = !0, s && Dr(), this.#l !== null && Be(this.#l, () => {
        this.#l = null;
      }), this.#b(() => {
        this.#w();
      });
    }, l = (a) => {
      try {
        s = !0, n?.(a, f), s = !1;
      } catch (o) {
        ae(o, this.#i && this.#i.parent);
      }
      r && (this.#l = this.#b(() => {
        try {
          return ne(() => {
            var o = (
              /** @type {Effect} */
              b
            );
            o.b = this, o.f |= dt, r(
              this.#t,
              () => a,
              () => f
            );
          });
        } catch (o) {
          return ae(
            o,
            /** @type {Effect} */
            this.#i.parent
          ), null;
        }
      }));
    };
    ke(() => {
      var a;
      try {
        a = this.transform_error(t);
      } catch (o) {
        ae(o, this.#i && this.#i.parent);
        return;
      }
      a !== null && typeof a == "object" && typeof /** @type {any} */
      a.then == "function" ? a.then(
        l,
        /** @param {unknown} e */
        (o) => ae(o, this.#i && this.#i.parent)
      ) : l(a);
    });
  }
}
function Jr(e, t, n, r) {
  const i = _n;
  var s = e.filter((d) => !d.settled);
  if (n.length === 0 && s.length === 0) {
    r(t.map(i));
    return;
  }
  var f = (
    /** @type {Effect} */
    b
  ), l = Wr(), a = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((d) => d.promise)) : null;
  function o(d) {
    l();
    try {
      r(d);
    } catch (p) {
      (f.f & J) === 0 && ae(p, f);
    }
    Ze();
  }
  if (n.length === 0) {
    a.then(() => o(t.map(i)));
    return;
  }
  var u = pn();
  function v() {
    Promise.all(n.map((d) => /* @__PURE__ */ Kr(d))).then((d) => o([...t.map(i), ...d])).catch((d) => ae(d, f)).finally(() => u());
  }
  a ? a.then(() => {
    l(), v(), Ze();
  }) : v();
}
function Wr() {
  var e = (
    /** @type {Effect} */
    b
  ), t = _, n = D, r = (
    /** @type {Batch} */
    g
  );
  return function(s = !0) {
    Z(e), L(t), Ce(n), s && (e.f & J) === 0 && (r?.activate(), r?.apply());
  };
}
function Ze(e = !0) {
  Z(null), L(null), Ce(null), e && g?.deactivate();
}
function pn() {
  var e = (
    /** @type {Effect} */
    b
  ), t = (
    /** @type {Boundary} */
    e.b
  ), n = (
    /** @type {Batch} */
    g
  ), r = t.is_rendered();
  return t.update_pending_count(1, n), n.increment(r, e), (i = !1) => {
    t.update_pending_count(-1, n), n.decrement(r, e, i);
  };
}
// @__NO_SIDE_EFFECTS__
function _n(e) {
  var t = A | N, n = _ !== null && (_.f & A) !== 0 ? (
    /** @type {Derived} */
    _
  ) : null;
  return b !== null && (b.f |= Re), {
    ctx: D,
    deps: null,
    effects: null,
    equals: nn,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      M
    ),
    wv: 0,
    parent: n ?? b,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Kr(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    b
  );
  r === null && Sr();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = tt(
    /** @type {V} */
    M
  ), f = !_, l = /* @__PURE__ */ new Map();
  return fi(() => {
    var a = (
      /** @type {Effect} */
      b
    ), o = en();
    i = o.promise;
    try {
      Promise.resolve(e()).then(o.resolve, o.reject).finally(Ze);
    } catch (p) {
      o.reject(p), Ze();
    }
    var u = (
      /** @type {Batch} */
      g
    );
    if (f) {
      if ((a.f & me) !== 0)
        var v = pn();
      if (
        /** @type {Boundary} */
        r.b.is_rendered()
      )
        l.get(u)?.reject(re), l.delete(u);
      else {
        for (const p of l.values())
          p.reject(re);
        l.clear();
      }
      l.set(u, o);
    }
    const d = (p, h = void 0) => {
      if (v) {
        var w = h === re;
        v(w);
      }
      if (!(h === re || (a.f & J) !== 0)) {
        if (u.activate(), h)
          s.f |= oe, Qe(s, h);
        else {
          (s.f & oe) !== 0 && (s.f ^= oe), Qe(s, p);
          for (const [S, C] of l) {
            if (l.delete(S), S === u) break;
            C.reject(re);
          }
        }
        u.deactivate();
      }
    };
    o.promise.then(d, (p) => d(null, p || "unknown"));
  }), li(() => {
    for (const a of l.values())
      a.reject(re);
  }), new Promise((a) => {
    function o(u) {
      function v() {
        u === i ? a(s) : o(i);
      }
      u.then(v, v);
    }
    o(i);
  });
}
// @__NO_SIDE_EFFECTS__
function De(e) {
  const t = /* @__PURE__ */ _n(e);
  return Dn(t), t;
}
function Zr(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var n = 0; n < t.length; n += 1)
      O(
        /** @type {Effect} */
        t[n]
      );
  }
}
function Qr(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & A) === 0)
      return (t.f & J) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function yt(e) {
  var t, n = b;
  Z(Qr(e));
  try {
    e.f &= ~ge, Zr(e), t = In(e);
  } finally {
    Z(n);
  }
  return t;
}
function bn(e) {
  var t = e.v, n = yt(e);
  if (!e.equals(n) && (e.wv = On(), (!g?.is_fork || e.deps === null) && (e.v = n, g?.capture(e, t, !0), e.deps === null))) {
    E(e, k);
    return;
  }
  we || (V !== null ? (kt() || g?.is_fork) && V.set(e, n) : mt(e));
}
function Xr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(re), t.teardown = mr, t.ac = null, Ye(t, 0), Tt(t));
}
function gn(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && Me(t);
}
let _t = /* @__PURE__ */ new Set();
const fe = /* @__PURE__ */ new Map();
let wn = !1;
function tt(e, t) {
  var n = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: nn,
    rv: 0,
    wv: 0
  };
  return n;
}
// @__NO_SIDE_EFFECTS__
function R(e, t) {
  const n = tt(e);
  return Dn(n), n;
}
function y(e, t, n = !1) {
  _ !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!U || (_.f & Lt) !== 0) && ln() && (_.f & (A | ce | wt | Lt)) !== 0 && (z === null || !Se.call(z, e)) && Pr();
  let r = n ? Ee(t) : t;
  return Qe(e, r, We);
}
function Qe(e, t, n = null) {
  if (!e.equals(t)) {
    var r = e.v;
    we ? fe.set(e, t) : fe.set(e, r), e.v = t;
    var i = ue.ensure();
    if (i.capture(e, r), (e.f & A) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & N) !== 0 && yt(s), V === null && mt(s);
    }
    e.wv = On(), mn(e, N, n), b !== null && (b.f & k) !== 0 && (b.f & (W | be)) === 0 && (j === null ? vi([e]) : j.push(e)), !i.is_fork && _t.size > 0 && !wn && $r();
  }
  return t;
}
function $r() {
  wn = !1;
  for (const e of _t)
    (e.f & k) !== 0 && E(e, K), qe(e) && Me(e);
  _t.clear();
}
function Le(e) {
  y(e, e.v + 1);
}
function mn(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var i = r.length, s = 0; s < i; s++) {
      var f = r[s], l = f.f, a = (l & N) === 0;
      if (a && E(f, t), (l & A) !== 0) {
        var o = (
          /** @type {Derived} */
          f
        );
        V?.delete(o), (l & ge) === 0 && (l & I && (f.f |= ge), mn(o, K, n));
      } else if (a) {
        var u = (
          /** @type {Effect} */
          f
        );
        (l & ce) !== 0 && te !== null && te.add(u), n !== null ? n.push(u) : xt(u);
      }
    }
}
function Ee(e) {
  if (typeof e != "object" || e === null || Je in e)
    return e;
  const t = wr(e);
  if (t !== br && t !== gr)
    return e;
  var n = /* @__PURE__ */ new Map(), r = vr(e), i = /* @__PURE__ */ R(0), s = _e, f = (l) => {
    if (_e === s)
      return l();
    var a = _, o = _e;
    L(null), Ht(s);
    var u = l();
    return L(a), Ht(o), u;
  };
  return r && n.set("length", /* @__PURE__ */ R(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, a, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && Rr();
        var u = n.get(a);
        return u === void 0 ? f(() => {
          var v = /* @__PURE__ */ R(o.value);
          return n.set(a, v), v;
        }) : y(u, o.value, !0), !0;
      },
      deleteProperty(l, a) {
        var o = n.get(a);
        if (o === void 0) {
          if (a in l) {
            const u = f(() => /* @__PURE__ */ R(M));
            n.set(a, u), Le(i);
          }
        } else
          y(o, M), Le(i);
        return !0;
      },
      get(l, a, o) {
        if (a === Je)
          return e;
        var u = n.get(a), v = a in l;
        if (u === void 0 && (!v || Ie(l, a)?.writable) && (u = f(() => {
          var p = Ee(v ? l[a] : M), h = /* @__PURE__ */ R(p);
          return h;
        }), n.set(a, u)), u !== void 0) {
          var d = c(u);
          return d === M ? void 0 : d;
        }
        return Reflect.get(l, a, o);
      },
      getOwnPropertyDescriptor(l, a) {
        var o = Reflect.getOwnPropertyDescriptor(l, a);
        if (o && "value" in o) {
          var u = n.get(a);
          u && (o.value = c(u));
        } else if (o === void 0) {
          var v = n.get(a), d = v?.v;
          if (v !== void 0 && d !== M)
            return {
              enumerable: !0,
              configurable: !0,
              value: d,
              writable: !0
            };
        }
        return o;
      },
      has(l, a) {
        if (a === Je)
          return !0;
        var o = n.get(a), u = o !== void 0 && o.v !== M || Reflect.has(l, a);
        if (o !== void 0 || b !== null && (!u || Ie(l, a)?.writable)) {
          o === void 0 && (o = f(() => {
            var d = u ? Ee(l[a]) : M, p = /* @__PURE__ */ R(d);
            return p;
          }), n.set(a, o));
          var v = c(o);
          if (v === M)
            return !1;
        }
        return u;
      },
      set(l, a, o, u) {
        var v = n.get(a), d = a in l;
        if (r && a === "length")
          for (var p = o; p < /** @type {Source<number>} */
          v.v; p += 1) {
            var h = n.get(p + "");
            h !== void 0 ? y(h, M) : p in l && (h = f(() => /* @__PURE__ */ R(M)), n.set(p + "", h));
          }
        if (v === void 0)
          (!d || Ie(l, a)?.writable) && (v = f(() => /* @__PURE__ */ R(void 0)), y(v, Ee(o)), n.set(a, v));
        else {
          d = v.v !== M;
          var w = f(() => Ee(o));
          y(v, w);
        }
        var S = Reflect.getOwnPropertyDescriptor(l, a);
        if (S?.set && S.set.call(u, o), !d) {
          if (r && typeof a == "string") {
            var C = (
              /** @type {Source<number>} */
              n.get("length")
            ), B = Number(a);
            Number.isInteger(B) && B >= C.v && y(C, B + 1);
          }
          Le(i);
        }
        return !0;
      },
      ownKeys(l) {
        c(i);
        var a = Reflect.ownKeys(l).filter((v) => {
          var d = n.get(v);
          return d === void 0 || d.v !== M;
        });
        for (var [o, u] of n)
          u.v !== M && !(o in l) && a.push(o);
        return a;
      },
      setPrototypeOf() {
        Nr();
      }
    }
  );
}
var qt, xn, yn, En;
function ei() {
  if (qt === void 0) {
    qt = window, xn = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    yn = Ie(t, "firstChild").get, En = Ie(t, "nextSibling").get, zt(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), zt(n) && (n.__t = void 0);
  }
}
function Xe(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return (
    /** @type {TemplateNode | null} */
    yn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function nt(e) {
  return (
    /** @type {TemplateNode | null} */
    En.call(e)
  );
}
function x(e, t) {
  return /* @__PURE__ */ $e(e);
}
function Vt(e, t = !1) {
  {
    var n = /* @__PURE__ */ $e(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ nt(n) : n;
  }
}
function T(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ nt(r);
  return r;
}
function ti() {
  return !1;
}
function kn(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(jr, e, void 0)
  );
}
let Ut = !1;
function ni() {
  Ut || (Ut = !0, document.addEventListener(
    "reset",
    (e) => {
      Promise.resolve().then(() => {
        if (!e.defaultPrevented)
          for (
            const t of
            /**@type {HTMLFormElement} */
            e.target.elements
          )
            t.__on_r?.();
      });
    },
    // In the capture phase to guarantee we get noticed of it (no possibility of stopPropagation)
    { capture: !0 }
  ));
}
function Et(e) {
  var t = _, n = b;
  L(null), Z(null);
  try {
    return e();
  } finally {
    L(t), Z(n);
  }
}
function ri(e, t, n, r = n) {
  e.addEventListener(t, () => Et(n));
  const i = e.__on_r;
  i ? e.__on_r = () => {
    i(), r(!0);
  } : e.__on_r = () => r(!0), ni();
}
function ii(e) {
  b === null && (_ === null && Cr(), Ar()), we && Tr();
}
function si(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function ie(e, t) {
  var n = b;
  n !== null && (n.f & H) !== 0 && (e |= H);
  var r = {
    ctx: D,
    deps: null,
    nodes: null,
    f: e | N | I,
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
  if ((e & Te) !== 0)
    ye !== null ? ye.push(r) : ue.ensure().schedule(r);
  else if (t !== null) {
    try {
      Me(r);
    } catch (f) {
      throw O(r), f;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & Re) === 0 && (i = i.first, (e & ce) !== 0 && (e & Ae) !== 0 && i !== null && (i.f |= Ae));
  }
  if (i !== null && (i.parent = n, n !== null && si(i, n), _ !== null && (_.f & A) !== 0 && (e & be) === 0)) {
    var s = (
      /** @type {Derived} */
      _
    );
    (s.effects ??= []).push(i);
  }
  return r;
}
function kt() {
  return _ !== null && !U;
}
function li(e) {
  const t = ie(et, null);
  return E(t, k), t.teardown = e, t;
}
function ai(e) {
  ii();
  var t = (
    /** @type {Effect} */
    b.f
  ), n = !_ && (t & W) !== 0 && (t & me) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      D
    );
    (r.e ??= []).push(e);
  } else
    return Sn(e);
}
function Sn(e) {
  return ie(Te | Er, e);
}
function oi(e) {
  ue.ensure();
  const t = ie(be | Re, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Be(t, () => {
      O(t), r(void 0);
    }) : (O(t), r(void 0));
  });
}
function Tn(e) {
  return ie(Te, e);
}
function fi(e) {
  return ie(wt | Re, e);
}
function St(e, t = 0) {
  return ie(et | t, e);
}
function Fe(e, t = [], n = [], r = []) {
  Jr(r, t, n, (i) => {
    ie(et, () => e(...i.map(c)));
  });
}
function An(e, t = 0) {
  var n = ie(ce | t, e);
  return n;
}
function ne(e) {
  return ie(W | Re, e);
}
function Cn(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = we, r = _;
    Gt(!0), L(null);
    try {
      t.call(null);
    } finally {
      Gt(n), L(r);
    }
  }
}
function Tt(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const i = n.ac;
    i !== null && Et(() => {
      i.abort(re);
    });
    var r = n.next;
    (n.f & be) !== 0 ? n.parent = null : O(n, t), n = r;
  }
}
function ui(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & W) === 0 && O(t), t = n;
  }
}
function O(e, t = !0) {
  var n = !1;
  (t || (e.f & yr) !== 0) && e.nodes !== null && e.nodes.end !== null && (ci(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), E(e, vt), Tt(e, t && !n), Ye(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const s of r)
      s.stop();
  Cn(e), e.f ^= vt, e.f |= J;
  var i = e.parent;
  i !== null && i.first !== null && Mn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function ci(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ nt(e);
    e.remove(), e = n;
  }
}
function Mn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Be(e, t, n = !0) {
  var r = [];
  Rn(e, r, !0);
  var i = () => {
    n && O(e), t && t();
  }, s = r.length;
  if (s > 0) {
    var f = () => --s || i();
    for (var l of r)
      l.out(f);
  } else
    i();
}
function Rn(e, t, n) {
  if ((e.f & H) === 0) {
    e.f ^= H;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var i = e.first; i !== null; ) {
      var s = i.next, f = (i.f & Ae) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & W) !== 0 && (e.f & ce) !== 0;
      Rn(i, t, f ? n : !1), i = s;
    }
  }
}
function di(e) {
  Nn(e, !0);
}
function Nn(e, t) {
  if ((e.f & H) !== 0) {
    e.f ^= H, (e.f & k) === 0 && (E(e, N), ue.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, i = (n.f & Ae) !== 0 || (n.f & W) !== 0;
      Nn(n, i ? t : !1), n = r;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const f of s)
        (f.is_global || t) && f.in();
  }
}
function Pn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var i = n === r ? null : /* @__PURE__ */ nt(n);
      t.append(n), n = i;
    }
}
let Ke = !1, we = !1;
function Gt(e) {
  we = e;
}
let _ = null, U = !1;
function L(e) {
  _ = e;
}
let b = null;
function Z(e) {
  b = e;
}
let z = null;
function Dn(e) {
  _ !== null && (z === null ? z = [e] : z.push(e));
}
let P = null, F = 0, j = null;
function vi(e) {
  j = e;
}
let Fn = 1, pe = 0, _e = pe;
function Ht(e) {
  _e = e;
}
function On() {
  return ++Fn;
}
function qe(e) {
  var t = e.f;
  if ((t & N) !== 0)
    return !0;
  if (t & A && (e.f &= ~ge), (t & K) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, i = 0; i < r; i++) {
      var s = n[i];
      if (qe(
        /** @type {Derived} */
        s
      ) && bn(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & I) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    V === null && E(e, k);
  }
  return !1;
}
function jn(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(z !== null && Se.call(z, e)))
    for (var i = 0; i < r.length; i++) {
      var s = r[i];
      (s.f & A) !== 0 ? jn(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (n ? E(s, N) : (s.f & k) !== 0 && E(s, K), xt(
        /** @type {Effect} */
        s
      ));
    }
}
function In(e) {
  var t = P, n = F, r = j, i = _, s = z, f = D, l = U, a = _e, o = e.f;
  P = /** @type {null | Value[]} */
  null, F = 0, j = null, _ = (o & (W | be)) === 0 ? e : null, z = null, Ce(e.ctx), U = !1, _e = ++pe, e.ac !== null && (Et(() => {
    e.ac.abort(re);
  }), e.ac = null);
  try {
    e.f |= ht;
    var u = (
      /** @type {Function} */
      e.fn
    ), v = u();
    e.f |= me;
    var d = e.deps, p = g?.is_fork;
    if (P !== null) {
      var h;
      if (p || Ye(e, F), d !== null && F > 0)
        for (d.length = F + P.length, h = 0; h < P.length; h++)
          d[F + h] = P[h];
      else
        e.deps = d = P;
      if (kt() && (e.f & I) !== 0)
        for (h = F; h < d.length; h++)
          (d[h].reactions ??= []).push(e);
    } else !p && d !== null && F < d.length && (Ye(e, F), d.length = F);
    if (ln() && j !== null && !U && d !== null && (e.f & (A | K | N)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      j.length; h++)
        jn(
          j[h],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (pe++, i.deps !== null)
        for (let w = 0; w < n; w += 1)
          i.deps[w].rv = pe;
      if (t !== null)
        for (const w of t)
          w.rv = pe;
      j !== null && (r === null ? r = j : r.push(.../** @type {Source[]} */
      j));
    }
    return (e.f & oe) !== 0 && (e.f ^= oe), v;
  } catch (w) {
    return on(w);
  } finally {
    e.f ^= ht, P = t, F = n, j = r, _ = i, z = s, Ce(f), U = l, _e = a;
  }
}
function hi(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = hr.call(n, e);
    if (r !== -1) {
      var i = n.length - 1;
      i === 0 ? n = t.reactions = null : (n[r] = n[i], n.pop());
    }
  }
  if (n === null && (t.f & A) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (P === null || !Se.call(P, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & I) !== 0 && (s.f ^= I, s.f &= ~ge), mt(s), Xr(s), Ye(s, 0);
  }
}
function Ye(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      hi(e, n[r]);
}
function Me(e) {
  var t = e.f;
  if ((t & J) === 0) {
    E(e, k);
    var n = b, r = Ke;
    b = e, Ke = !0;
    try {
      (t & (ce | tn)) !== 0 ? ui(e) : Tt(e), Cn(e);
      var i = In(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = Fn;
      var s;
    } finally {
      Ke = r, b = n;
    }
  }
}
async function pi() {
  await Promise.resolve(), Yr();
}
function c(e) {
  var t = e.f, n = (t & A) !== 0;
  if (_ !== null && !U) {
    var r = b !== null && (b.f & J) !== 0;
    if (!r && (z === null || !Se.call(z, e))) {
      var i = _.deps;
      if ((_.f & ht) !== 0)
        e.rv < pe && (e.rv = pe, P === null && i !== null && i[F] === e ? F++ : P === null ? P = [e] : P.push(e));
      else {
        (_.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [_] : Se.call(s, _) || s.push(_);
      }
    }
  }
  if (we && fe.has(e))
    return fe.get(e);
  if (n) {
    var f = (
      /** @type {Derived} */
      e
    );
    if (we) {
      var l = f.v;
      return ((f.f & k) === 0 && f.reactions !== null || Ln(f)) && (l = yt(f)), fe.set(f, l), l;
    }
    var a = (f.f & I) === 0 && !U && _ !== null && (Ke || (_.f & I) !== 0), o = (f.f & me) === 0;
    qe(f) && (a && (f.f |= I), bn(f)), a && !o && (gn(f), zn(f));
  }
  if (V?.has(e))
    return V.get(e);
  if ((e.f & oe) !== 0)
    throw e.v;
  return e.v;
}
function zn(e) {
  if (e.f |= I, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & A) !== 0 && (t.f & I) === 0 && (gn(
        /** @type {Derived} */
        t
      ), zn(
        /** @type {Derived} */
        t
      ));
}
function Ln(e) {
  if (e.v === M) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (fe.has(t) || (t.f & A) !== 0 && Ln(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function rt(e) {
  var t = U;
  try {
    return U = !0, e();
  } finally {
    U = t;
  }
}
const _i = ["touchstart", "touchmove"];
function bi(e) {
  return _i.includes(e);
}
const je = /* @__PURE__ */ Symbol("events"), Bn = /* @__PURE__ */ new Set(), bt = /* @__PURE__ */ new Set();
function Oe(e, t, n) {
  (t[je] ??= {})[e] = n;
}
function gi(e) {
  for (var t = 0; t < e.length; t++)
    Bn.add(e[t]);
  for (var n of bt)
    n(e);
}
let Jt = null;
function Wt(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, i = e.composedPath?.() || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  Jt = e;
  var f = 0, l = Jt === e && e[je];
  if (l) {
    var a = i.indexOf(l);
    if (a !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[je] = t;
      return;
    }
    var o = i.indexOf(t);
    if (o === -1)
      return;
    a <= o && (f = a);
  }
  if (s = /** @type {Element} */
  i[f] || e.target, s !== t) {
    _r(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || n;
      }
    });
    var u = _, v = b;
    L(null), Z(null);
    try {
      for (var d, p = []; s !== null; ) {
        var h = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var w = s[je]?.[r];
          w != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && w.call(s, e);
        } catch (S) {
          d ? p.push(S) : d = S;
        }
        if (e.cancelBubble || h === t || h === null)
          break;
        s = h;
      }
      if (d) {
        for (let S of p)
          queueMicrotask(() => {
            throw S;
          });
        throw d;
      }
    } finally {
      e[je] = t, delete e.currentTarget, L(u), Z(v);
    }
  }
}
const wi = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function mi(e) {
  return (
    /** @type {string} */
    wi?.createHTML(e) ?? e
  );
}
function xi(e) {
  var t = kn("template");
  return t.innerHTML = mi(e.replaceAll("<!>", "<!---->")), t.content;
}
function Kt(e, t) {
  var n = (
    /** @type {Effect} */
    b
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function xe(e, t) {
  var n = (t & Fr) !== 0, r = (t & Or) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = xi(s ? e : "<!>" + e), n || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ $e(i)));
    var f = (
      /** @type {TemplateNode} */
      r || xn ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (n) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ $e(f)
      ), a = (
        /** @type {TemplateNode} */
        f.lastChild
      );
      Kt(l, a);
    } else
      Kt(f, f);
    return f;
  };
}
function ve(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function q(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = `${n}`);
}
function yi(e, t) {
  return Ei(e, t);
}
const Ge = /* @__PURE__ */ new Map();
function Ei(e, { target: t, anchor: n, props: r = {}, events: i, context: s, intro: f = !0, transformError: l }) {
  ei();
  var a = void 0, o = oi(() => {
    var u = n ?? t.appendChild(Xe());
    Gr(
      /** @type {TemplateNode} */
      u,
      {
        pending: () => {
        }
      },
      (p) => {
        rn({});
        var h = (
          /** @type {ComponentContext} */
          D
        );
        s && (h.c = s), i && (r.$$events = i), a = e(p, r) || {}, sn();
      },
      l
    );
    var v = /* @__PURE__ */ new Set(), d = (p) => {
      for (var h = 0; h < p.length; h++) {
        var w = p[h];
        if (!v.has(w)) {
          v.add(w);
          var S = bi(w);
          for (const Ne of [t, document]) {
            var C = Ge.get(Ne);
            C === void 0 && (C = /* @__PURE__ */ new Map(), Ge.set(Ne, C));
            var B = C.get(w);
            B === void 0 ? (Ne.addEventListener(w, Wt, { passive: S }), C.set(w, 1)) : C.set(w, B + 1);
          }
        }
      }
    };
    return d(pr(Bn)), bt.add(d), () => {
      for (var p of v)
        for (const S of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            Ge.get(S)
          ), w = (
            /** @type {number} */
            h.get(p)
          );
          --w == 0 ? (S.removeEventListener(p, Wt), h.delete(p), h.size === 0 && Ge.delete(S)) : h.set(p, w);
        }
      bt.delete(d), u !== n && u.parentNode?.removeChild(u);
    };
  });
  return gt.set(a, o), a;
}
let gt = /* @__PURE__ */ new WeakMap();
function ki(e, t) {
  const n = gt.get(e);
  return n ? (gt.delete(e), n(t)) : Promise.resolve();
}
class Si {
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
        di(r), this.#r.delete(n);
      else {
        var i = this.#e.get(n);
        i && (this.#o.set(n, i.effect), this.#e.delete(n), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), r = i.effect);
      }
      for (const [s, f] of this.#t) {
        if (this.#t.delete(s), s === t)
          break;
        const l = this.#e.get(f);
        l && (O(l.effect), this.#e.delete(f));
      }
      for (const [s, f] of this.#o) {
        if (s === n || this.#r.has(s)) continue;
        const l = () => {
          if (Array.from(this.#t.values()).includes(s)) {
            var o = document.createDocumentFragment();
            Pn(f, o), o.append(Xe()), this.#e.set(s, { effect: f, fragment: o });
          } else
            O(f);
          this.#r.delete(s), this.#o.delete(s);
        };
        this.#i || !r ? (this.#r.add(s), Be(f, l, !1)) : l();
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
      n.includes(r) || (O(i.effect), this.#e.delete(r));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      g
    ), i = ti();
    if (n && !this.#o.has(t) && !this.#e.has(t))
      if (i) {
        var s = document.createDocumentFragment(), f = Xe();
        s.append(f), this.#e.set(t, {
          effect: ne(() => n(f)),
          fragment: s
        });
      } else
        this.#o.set(
          t,
          ne(() => n(this.anchor))
        );
    if (this.#t.set(r, t), i) {
      for (const [l, a] of this.#o)
        l === t ? r.unskip_effect(a) : r.skip_effect(a);
      for (const [l, a] of this.#e)
        l === t ? r.unskip_effect(a.effect) : r.skip_effect(a.effect);
      r.oncommit(this.#n), r.ondiscard(this.#s);
    } else
      this.#n(r);
  }
}
function He(e, t, n = !1) {
  var r = new Si(e), i = n ? Ae : 0;
  function s(f, l) {
    r.ensure(f, l);
  }
  An(() => {
    var f = !1;
    t((l, a = 0) => {
      f = !0, s(a, l);
    }), f || s(-1, null);
  }, i);
}
function Ti(e, t) {
  Tn(() => {
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
      const i = kn("style");
      i.id = t.hash, i.textContent = t.code, r.appendChild(i);
    }
  });
}
const Zt = [...` 	
\r\f \v\uFEFF`];
function Ai(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (n) {
    for (var i of Object.keys(n))
      if (n[i])
        r = r ? r + " " + i : i;
      else if (r.length)
        for (var s = i.length, f = 0; (f = r.indexOf(i, f)) >= 0; ) {
          var l = f + s;
          (f === 0 || Zt.includes(r[f - 1])) && (l === r.length || Zt.includes(r[l])) ? r = (f === 0 ? "" : r.substring(0, f)) + r.substring(l + 1) : f = l;
        }
  }
  return r === "" ? null : r;
}
function Qt(e, t = !1) {
  var n = t ? " !important;" : ";", r = "";
  for (var i of Object.keys(e)) {
    var s = e[i];
    s != null && s !== "" && (r += " " + i + ": " + s + n);
  }
  return r;
}
function Ci(e, t) {
  if (t) {
    var n = "", r, i;
    return Array.isArray(t) ? (r = t[0], i = t[1]) : r = t, r && (n += Qt(r)), i && (n += Qt(i, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(e);
}
function Xt(e, t, n, r, i, s) {
  var f = e.__className;
  if (f !== n || f === void 0) {
    var l = Ai(n, r, s);
    l == null ? e.removeAttribute("class") : e.className = l, e.__className = n;
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
function Mi(e, t, n, r) {
  var i = e.__style;
  if (i !== t) {
    var s = Ci(t, r);
    s == null ? e.removeAttribute("style") : e.style.cssText = s, e.__style = t;
  } else r && (Array.isArray(r) ? (ft(e, n?.[0], r[0]), ft(e, n?.[1], r[1], "important")) : ft(e, n, r));
  return r;
}
function Ri(e, t, n = t) {
  var r = /* @__PURE__ */ new WeakSet();
  ri(e, "input", async (i) => {
    var s = i ? e.defaultValue : e.value;
    if (s = ut(e) ? ct(s) : s, n(s), g !== null && r.add(g), await pi(), s !== (s = t())) {
      var f = e.selectionStart, l = e.selectionEnd, a = e.value.length;
      if (e.value = s ?? "", l !== null) {
        var o = e.value.length;
        f === l && l === a && o > a ? (e.selectionStart = o, e.selectionEnd = o) : (e.selectionStart = f, e.selectionEnd = Math.min(l, o));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  rt(t) == null && e.value && (n(ut(e) ? ct(e.value) : e.value), g !== null && r.add(g)), St(() => {
    var i = t();
    if (e === document.activeElement) {
      var s = (
        /** @type {Batch} */
        g
      );
      if (r.has(s))
        return;
    }
    ut(e) && i === ct(e.value) || e.type === "date" && !i && !e.value || i !== e.value && (e.value = i ?? "");
  });
}
function ut(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function ct(e) {
  return e === "" ? null : +e;
}
function $t(e, t) {
  return e === t || e?.[Je] === t;
}
function Ni(e = {}, t, n, r) {
  var i = (
    /** @type {ComponentContext} */
    D.r
  ), s = (
    /** @type {Effect} */
    b
  );
  return Tn(() => {
    var f, l;
    return St(() => {
      f = l, l = [], rt(() => {
        e !== n(...l) && (t(e, ...l), f && $t(n(...f), e) && t(null, ...f));
      });
    }), () => {
      let a = s;
      for (; a !== i && a.parent !== null && a.parent.f & vt; )
        a = a.parent;
      const o = () => {
        l && $t(n(...l), e) && t(null, ...l);
      }, u = a.teardown;
      a.teardown = () => {
        o(), u?.();
      };
    };
  }), e;
}
function Pi(e) {
  D === null && kr(), ai(() => {
    const t = rt(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
const Di = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Di);
var Fi = /* @__PURE__ */ xe('<div class="center-state svelte-wbdf2i"><div class="spinner svelte-wbdf2i"></div> <p class="loading-text svelte-wbdf2i">Generating problem…</p></div>'), Oi = /* @__PURE__ */ xe("<span> </span>"), ji = /* @__PURE__ */ xe('<p class="prompt-text svelte-wbdf2i">What does this print?</p> <div class="answer-row svelte-wbdf2i"><input type="text" class="answer-input svelte-wbdf2i" placeholder="…" autocomplete="off" spellcheck="false"/> <button class="btn-run svelte-wbdf2i">Submit</button></div> <button class="btn-skip svelte-wbdf2i">Skip</button>', 1), Ii = /* @__PURE__ */ xe('<div class="diff svelte-wbdf2i"><div class="diff-row svelte-wbdf2i"><span class="diff-label svelte-wbdf2i">Expected</span> <code class="diff-val svelte-wbdf2i"> </code></div> <div class="diff-row svelte-wbdf2i"><span class="diff-label svelte-wbdf2i">Yours</span> <code class="diff-val yours svelte-wbdf2i"> </code></div></div>'), zi = /* @__PURE__ */ xe('<div><span class="result-icon svelte-wbdf2i"> </span> <span class="result-word svelte-wbdf2i"> </span></div> <!> <div class="explanation svelte-wbdf2i"><span class="concept svelte-wbdf2i"> </span> <p class="svelte-wbdf2i"> </p></div> <div class="actions svelte-wbdf2i"><button class="btn-ghost svelte-wbdf2i">Next problem</button> <button class="btn-run svelte-wbdf2i">Continue</button></div>', 1), Li = /* @__PURE__ */ xe('<div class="content svelte-wbdf2i"><div class="header svelte-wbdf2i"><div class="lang-badge svelte-wbdf2i"><span class="lang-dot svelte-wbdf2i"></span> <span class="lang-name svelte-wbdf2i"> </span> <span class="tier-pill svelte-wbdf2i"> </span></div> <!></div> <div class="code-block svelte-wbdf2i"><pre class="svelte-wbdf2i"><code class="svelte-wbdf2i"> </code></pre></div> <!> <p class="footer-stats svelte-wbdf2i"> </p></div>'), Bi = /* @__PURE__ */ xe('<div class="polyglot svelte-wbdf2i"><!></div>');
const Yi = {
  hash: "svelte-wbdf2i",
  code: `.polyglot.svelte-wbdf2i {position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#080808;color:#c8c0b8;font-family:'DM Sans', 'IBM Plex Sans', system-ui, sans-serif;overflow-y:auto;}.center-state.svelte-wbdf2i {display:flex;flex-direction:column;align-items:center;gap:14px;}.spinner.svelte-wbdf2i {width:22px;height:22px;border:2px solid rgba(255, 255, 255, 0.08);border-top-color:var(--lang, #666);border-radius:50%;
		animation: svelte-wbdf2i-spin 0.6s linear infinite;}

	@keyframes svelte-wbdf2i-spin { to { transform: rotate(360deg); } }.loading-text.svelte-wbdf2i {font-size:13px;color:#444;margin:0;}.content.svelte-wbdf2i {width:100%;max-width:540px;padding:40px 28px;display:flex;flex-direction:column;gap:14px;}.header.svelte-wbdf2i {display:flex;align-items:center;justify-content:space-between;}.lang-badge.svelte-wbdf2i {display:flex;align-items:center;gap:8px;}.lang-dot.svelte-wbdf2i {width:8px;height:8px;border-radius:50%;background:var(--lang);box-shadow:0 0 6px color-mix(in srgb, var(--lang) 40%, transparent);}.lang-name.svelte-wbdf2i {font-size:14px;font-weight:600;color:var(--lang);}.tier-pill.svelte-wbdf2i {font-family:'JetBrains Mono', 'Fira Code', monospace;font-size:10px;color:#555;background:rgba(255, 255, 255, 0.03);border:1px solid rgba(255, 255, 255, 0.06);padding:2px 8px;border-radius:4px;}.tier-delta.svelte-wbdf2i {font-family:'JetBrains Mono', monospace;font-size:11px;font-weight:500;}.tier-delta.up.svelte-wbdf2i {color:#4caf50;}.tier-delta.down.svelte-wbdf2i {color:#ce422b;}

	/* ── code block ── */.code-block.svelte-wbdf2i {background:#0c0c0c;border:1px solid rgba(255, 255, 255, 0.05);border-left:3px solid var(--lang);border-radius:8px;overflow:hidden;}.code-block.svelte-wbdf2i pre:where(.svelte-wbdf2i) {margin:0;padding:18px 20px;overflow-x:auto;}.code-block.svelte-wbdf2i code:where(.svelte-wbdf2i) {font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;font-size:13px;line-height:1.7;color:#bbb5ad;}

	/* ── answering ── */.prompt-text.svelte-wbdf2i {font-size:13px;color:#555;margin:4px 0 0;}.answer-row.svelte-wbdf2i {display:flex;gap:8px;}.answer-input.svelte-wbdf2i {flex:1;background:#0c0c0c;border:1px solid rgba(255, 255, 255, 0.07);border-radius:6px;color:#e0e0e0;font-family:'JetBrains Mono', monospace;font-size:14px;padding:10px 14px;outline:none;transition:border-color 150ms ease;}.answer-input.svelte-wbdf2i:focus {border-color:var(--lang);}.answer-input.svelte-wbdf2i::placeholder {color:#333;}.btn-run.svelte-wbdf2i {padding:10px 20px;background:var(--lang);color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;transition:opacity 150ms ease;flex-shrink:0;}.btn-run.svelte-wbdf2i:hover {opacity:0.85;}.btn-skip.svelte-wbdf2i {align-self:flex-start;background:none;border:none;color:#444;font-size:11px;cursor:pointer;padding:0;transition:color 150ms ease;}.btn-skip.svelte-wbdf2i:hover {color:#888;}

	/* ── result ── */.result.svelte-wbdf2i {display:flex;align-items:center;gap:8px;padding:12px 16px;border-radius:8px;}.result.ok.svelte-wbdf2i {background:rgba(76, 175, 80, 0.06);border:1px solid rgba(76, 175, 80, 0.12);}.result.fail.svelte-wbdf2i {background:rgba(206, 66, 43, 0.06);border:1px solid rgba(206, 66, 43, 0.12);}.result-icon.svelte-wbdf2i {font-size:16px;}.result.ok.svelte-wbdf2i .result-icon:where(.svelte-wbdf2i) {color:#4caf50;}.result.fail.svelte-wbdf2i .result-icon:where(.svelte-wbdf2i) {color:#ce422b;}.result-word.svelte-wbdf2i {font-weight:600;font-size:14px;}.result.ok.svelte-wbdf2i .result-word:where(.svelte-wbdf2i) {color:#4caf50;}.result.fail.svelte-wbdf2i .result-word:where(.svelte-wbdf2i) {color:#ce422b;}.diff.svelte-wbdf2i {display:flex;flex-direction:column;gap:6px;padding:10px 14px;background:rgba(255, 255, 255, 0.015);border-radius:6px;}.diff-row.svelte-wbdf2i {display:flex;align-items:baseline;gap:10px;}.diff-label.svelte-wbdf2i {font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#444;width:56px;flex-shrink:0;}.diff-val.svelte-wbdf2i {font-family:'JetBrains Mono', monospace;font-size:13px;color:#aaa;}.diff-val.yours.svelte-wbdf2i {color:#666;text-decoration:line-through;text-decoration-color:rgba(206, 66, 43, 0.3);}.explanation.svelte-wbdf2i {padding:12px 16px;background:rgba(255, 255, 255, 0.02);border:1px solid rgba(255, 255, 255, 0.04);border-radius:8px;}.concept.svelte-wbdf2i {font-size:11px;font-weight:600;color:var(--lang);text-transform:uppercase;letter-spacing:0.05em;}.explanation.svelte-wbdf2i p:where(.svelte-wbdf2i) {margin:6px 0 0;font-size:13px;color:#777;line-height:1.6;}.actions.svelte-wbdf2i {display:flex;justify-content:space-between;gap:8px;}.btn-ghost.svelte-wbdf2i {padding:10px 16px;background:transparent;border:1px solid rgba(255, 255, 255, 0.06);border-radius:6px;color:#666;font-size:12px;cursor:pointer;transition:color 150ms ease, border-color 150ms ease;}.btn-ghost.svelte-wbdf2i:hover {color:#aaa;border-color:rgba(255, 255, 255, 0.12);}.footer-stats.svelte-wbdf2i {font-size:10px;color:#2a2a2a;text-align:center;margin:8px 0 0;font-variant-numeric:tabular-nums;}

	@media (max-width: 480px) {.content.svelte-wbdf2i {padding:24px 16px;}
	}`
};
function qi(e, t) {
  rn(t, !0), Ti(e, Yi);
  const n = {
    python: { display: "Python", color: "#3572A5" },
    javascript: { display: "JavaScript", color: "#F0DB4F" },
    typescript: { display: "TypeScript", color: "#3178C6" },
    rust: { display: "Rust", color: "#CE422B" },
    go: { display: "Go", color: "#00ADD8" },
    java: { display: "Java", color: "#B07219" },
    c: { display: "C", color: "#A8B9CC" },
    ruby: { display: "Ruby", color: "#CC342D" }
  }, r = { tiers: {}, totalCorrect: 0, totalIncorrect: 0 }, i = {
    name: "coding_problem",
    schema: {
      type: "object",
      properties: {
        concept: { type: "string" },
        code: { type: "string" },
        answer: { type: "string" },
        explanation: { type: "string" }
      },
      required: ["concept", "code", "answer", "explanation"],
      additionalProperties: !1
    }
  };
  let s = /* @__PURE__ */ De(() => Object.keys(n).filter((m) => t.ctx.settings[m] !== !1)), f = /* @__PURE__ */ De(() => typeof t.ctx.settings.focus == "string" ? t.ctx.settings.focus : "mixed"), l = /* @__PURE__ */ R(Ee({ ...r })), a = /* @__PURE__ */ R(null), o = /* @__PURE__ */ R("loading"), u = /* @__PURE__ */ R(""), v = /* @__PURE__ */ R(null), d = /* @__PURE__ */ R(0), p = /* @__PURE__ */ R(0), h = /* @__PURE__ */ R(void 0), w = /* @__PURE__ */ De(() => c(a) ? n[c(a).language] : null), S = /* @__PURE__ */ De(() => c(w)?.color ?? "#666"), C = /* @__PURE__ */ De(() => c(a) ? B(c(a).language) : 0);
  function B(m) {
    return c(l).tiers[m] ?? 3;
  }
  function Ne(m, Y, de) {
    let Q = B(m);
    Y ? Q += de ? 2 : 1 : Q -= 1, c(l).tiers = { ...c(l).tiers, [m]: Math.max(1, Math.min(10, Q)) }, Y ? c(l).totalCorrect++ : c(l).totalIncorrect++, y(l, { ...c(l) }, !0), t.ctx.state.set("polyglot-stats", c(l));
  }
  async function At() {
    y(o, "loading"), y(a, null), y(u, ""), y(v, null);
    const m = c(s).length > 0 ? c(s) : ["python"], Y = m[Math.floor(Math.random() * m.length)], de = B(Y), Q = n[Y], Ve = `You generate "What does this print?" programming challenges.

TIER ${de}/10:
1-3: Basic syntax — variables, arithmetic, string ops, simple loops
4-6: Language features — closures, iterators, type system, standard library
7-8: Edge cases — coercion, scoping gotchas, subtle behaviors
9-10: Expert — obscure spec behavior, complex feature interactions

RULES:
- Self-contained ${Q.display} code, 3-12 lines, no comments
- Exactly one print/output statement producing the answer
- Output must be a single line
- Answer: exactly what gets printed (visible text only)
- Concept: 2-5 word name for the feature tested
- Explanation: 2-3 sentences teaching WHY
- VERIFY your answer by tracing execution step by step`, st = `Generate a ${c(f)} problem for ${Q.display} at tier ${de}.`, se = await t.ctx.ai.generateJson(Ve, st, i, { maxTokens: 400, timeoutMs: 1e4 });
    !se?.code || !se?.answer || (y(
      a,
      {
        kind: "output",
        language: Y,
        concept: se.concept,
        code: se.code,
        answer: se.answer,
        explanation: se.explanation
      },
      !0
    ), y(o, "answering"), y(d, Date.now(), !0), setTimeout(() => c(h)?.focus(), 50));
  }
  function Ct() {
    if (!c(a) || c(o) !== "answering") return;
    y(p, B(c(a).language), !0);
    const m = c(u).trim() === c(a).answer.trim();
    y(v, m), Ne(c(a).language, m, Date.now() - c(d) < 3e4), y(o, "result");
  }
  function Yn(m) {
    m.key === "Enter" && Ct();
  }
  Pi(async () => {
    const m = await t.ctx.state.get("polyglot-stats");
    m && y(l, { ...r, ...m }, !0), At();
  });
  var it = Bi();
  let Mt;
  var qn = x(it);
  {
    var Vn = (m) => {
      var Y = Fi();
      ve(m, Y);
    }, Un = (m) => {
      var Y = Li(), de = x(Y), Q = x(de), Ve = T(x(Q), 2), st = x(Ve), se = T(Ve, 2), Gn = x(se), Hn = T(Q, 2);
      {
        var Jn = (G) => {
          var X = Oi();
          let $;
          var ee = x(X);
          Fe(() => {
            $ = Xt(X, 1, "tier-delta svelte-wbdf2i", null, $, {
              up: c(C) > c(p),
              down: c(C) < c(p)
            }), q(ee, `${c(p) ?? ""} → ${c(C) ?? ""}`);
          }), ve(G, X);
        };
        He(Hn, (G) => {
          c(o) === "result" && c(p) !== c(C) && G(Jn);
        });
      }
      var Rt = T(de, 2), Wn = x(Rt), Kn = x(Wn), Zn = x(Kn), Nt = T(Rt, 2);
      {
        var Qn = (G) => {
          var X = ji(), $ = T(Vt(X), 2), ee = x($);
          Ni(ee, (Pe) => y(h, Pe), () => c(h));
          var Ue = T(ee, 2), lt = T($, 2);
          Oe("keydown", ee, Yn), Ri(ee, () => c(u), (Pe) => y(u, Pe)), Oe("click", Ue, Ct), Oe("click", lt, () => t.ctx.complete()), ve(G, X);
        }, Xn = (G) => {
          var X = zi(), $ = Vt(X);
          let ee;
          var Ue = x($), lt = x(Ue), Pe = T(Ue, 2), tr = x(Pe), Pt = T($, 2);
          {
            var nr = (at) => {
              var jt = Ii(), It = x(jt), or = T(x(It), 2), fr = x(or), ur = T(It, 2), cr = T(x(ur), 2), dr = x(cr);
              Fe(() => {
                q(fr, c(a).answer), q(dr, c(u) || "(empty)");
              }), ve(at, jt);
            };
            He(Pt, (at) => {
              c(v) || at(nr);
            });
          }
          var Dt = T(Pt, 2), Ft = x(Dt), rr = x(Ft), ir = T(Ft, 2), sr = x(ir), lr = T(Dt, 2), Ot = x(lr), ar = T(Ot, 2);
          Fe(() => {
            ee = Xt($, 1, "result svelte-wbdf2i", null, ee, { ok: c(v), fail: !c(v) }), q(lt, c(v) ? "✓" : "✗"), q(tr, c(v) ? "Correct" : "Not quite"), q(rr, c(a).concept), q(sr, c(a).explanation);
          }), Oe("click", Ot, At), Oe("click", ar, () => t.ctx.complete()), ve(G, X);
        };
        He(Nt, (G) => {
          c(o) === "answering" ? G(Qn) : G(Xn, -1);
        });
      }
      var $n = T(Nt, 2), er = x($n);
      Fe(() => {
        q(st, c(w)?.display), q(Gn, `Lv. ${c(C) ?? ""}`), q(Zn, c(a).code), q(er, `${c(l).totalCorrect ?? ""} correct · ${c(l).totalIncorrect ?? ""} incorrect`);
      }), ve(m, Y);
    };
    He(qn, (m) => {
      c(o) === "loading" ? m(Vn) : c(a) && m(Un, 1);
    });
  }
  Fe(() => Mt = Mi(it, "", Mt, { "--lang": c(S) })), ve(e, it), sn();
}
gi(["keydown", "click"]);
function Ui(e, t) {
  return yi(qi, { target: e, props: t });
}
function Gi(e) {
  ki(e);
}
export {
  Ui as mountPlugin,
  Gi as unmountPlugin
};
