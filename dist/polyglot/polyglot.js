var vr = Array.isArray, hr = Array.prototype.indexOf, ke = Array.prototype.includes, pr = Array.from, _r = Object.defineProperty, je = Object.getOwnPropertyDescriptor, gr = Object.prototype, br = Array.prototype, wr = Object.getPrototypeOf, It = Object.isExtensible;
const mr = () => {
};
function qr(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function en() {
  var e, t, n = new Promise((r, s) => {
    e = r, t = s;
  });
  return { promise: n, resolve: e, reject: t };
}
const T = 2, Se = 4, et = 8, tn = 1 << 24, ce = 16, W = 32, ge = 64, dt = 128, j = 512, E = 1024, R = 2048, K = 4096, H = 8192, J = 16384, me = 32768, vt = 1 << 25, Te = 65536, zt = 1 << 17, xr = 1 << 18, Me = 1 << 19, yr = 1 << 20, be = 65536, ht = 1 << 21, wt = 1 << 22, oe = 1 << 23, Je = /* @__PURE__ */ Symbol("$state"), re = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Er(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function kr() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Sr(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Tr() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Ar(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Cr() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Mr() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Rr() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Nr() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Pr() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Dr = 1, Fr = 2, C = /* @__PURE__ */ Symbol(), Or = "http://www.w3.org/1999/xhtml";
function jr() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function nn(e) {
  return e === this.v;
}
let P = null;
function Ae(e) {
  P = e;
}
function rn(e, t = !1, n) {
  P = {
    p: P,
    i: !1,
    c: null,
    e: null,
    s: e,
    x: null,
    r: (
      /** @type {Effect} */
      g
    ),
    l: null
  };
}
function sn(e) {
  var t = (
    /** @type {ComponentContext} */
    P
  ), n = t.e;
  if (n !== null) {
    t.e = null;
    for (var r of n)
      kn(r);
  }
  return t.i = !0, P = t.p, /** @type {T} */
  {};
}
function ln() {
  return !0;
}
let he = [];
function an() {
  var e = he;
  he = [], qr(e);
}
function Ee(e) {
  if (he.length === 0 && !Ie) {
    var t = he;
    queueMicrotask(() => {
      t === he && an();
    });
  }
  he.push(e);
}
function Ir() {
  for (; he.length > 0; )
    an();
}
function on(e) {
  var t = g;
  if (t === null)
    return _.f |= oe, e;
  if ((t.f & me) === 0 && (t.f & Se) === 0)
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
const zr = -7169;
function y(e, t) {
  e.f = e.f & zr | t;
}
function mt(e) {
  (e.f & j) !== 0 || e.deps === null ? y(e, E) : y(e, K);
}
function fn(e) {
  if (e !== null)
    for (const t of e)
      (t.f & T) === 0 || (t.f & be) === 0 || (t.f ^= be, fn(
        /** @type {Derived} */
        t.deps
      ));
}
function un(e, t, n) {
  (e.f & R) !== 0 ? t.add(e) : (e.f & K) !== 0 && n.add(e), fn(e.deps), y(e, E);
}
const le = /* @__PURE__ */ new Set();
let b = null, V = null, pt = null, Ie = !1, ot = !1, xe = null, We = null;
var Lt = 0;
let Lr = 1;
class ue {
  id = Lr++;
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
  #s = null;
  /**
   * The root effects that need to be flushed
   * @type {Effect[]}
   */
  #n = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #i = /* @__PURE__ */ new Set();
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
      for (const s of r.#r.keys()) {
        for (var t = !1, n = s; n.parent !== null; ) {
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
        y(r, R), this.schedule(r);
      for (r of n.m)
        y(r, K), this.schedule(r);
    }
  }
  #v() {
    if (Lt++ > 1e3 && (le.delete(this), Yr()), !this.#d()) {
      for (const l of this.#i)
        this.#l.delete(l), y(l, R), this.schedule(l);
      for (const l of this.#l)
        y(l, K), this.schedule(l);
    }
    const t = this.#n;
    this.#n = [], this.apply();
    var n = xe = [], r = [], s = We = [];
    for (const l of t)
      try {
        this.#u(l, n, r);
      } catch (a) {
        throw hn(l), a;
      }
    if (b = null, s.length > 0) {
      var i = ue.ensure();
      for (const l of s)
        i.schedule(l);
    }
    if (xe = null, We = null, this.#d() || this.#h()) {
      this.#p(r), this.#p(n);
      for (const [l, a] of this.#a)
        vn(l, a);
    } else {
      this.#e.size === 0 && le.delete(this), this.#i.clear(), this.#l.clear();
      for (const l of this.#t) l(this);
      this.#t.clear(), Bt(r), Bt(n), this.#s?.resolve();
    }
    var f = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      b
    );
    if (this.#n.length > 0) {
      const l = f ??= this;
      l.#n.push(...this.#n.filter((a) => !l.#n.includes(a)));
    }
    f !== null && (le.add(f), f.#v()), le.has(this) || this.#b();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #u(t, n, r) {
    t.f ^= E;
    for (var s = t.first; s !== null; ) {
      var i = s.f, f = (i & (W | ge)) !== 0, l = f && (i & E) !== 0, a = l || (i & H) !== 0 || this.#a.has(s);
      if (!a && s.fn !== null) {
        f ? s.f ^= E : (i & Se) !== 0 ? n.push(s) : Ye(s) && ((i & ce) !== 0 && this.#l.add(s), Ce(s));
        var o = s.first;
        if (o !== null) {
          s = o;
          continue;
        }
      }
      for (; s !== null; ) {
        var u = s.next;
        if (u !== null) {
          s = u;
          break;
        }
        s = s.parent;
      }
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #p(t) {
    for (var n = 0; n < t.length; n += 1)
      un(t[n], this.#i, this.#l);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} old_value
   * @param {boolean} [is_derived]
   */
  capture(t, n, r = !1) {
    n !== C && !this.previous.has(t) && this.previous.set(t, n), (t.f & oe) === 0 && (this.current.set(t, [t.v, r]), V?.set(t, t.v));
  }
  activate() {
    b = this;
  }
  deactivate() {
    b = null, V = null;
  }
  flush() {
    try {
      ot = !0, b = this, this.#v();
    } finally {
      Lt = 0, pt = null, xe = null, We = null, ot = !1, b = null, V = null, fe.clear();
    }
  }
  discard() {
    for (const t of this.#o) t(this);
    this.#o.clear(), le.delete(this);
  }
  #b() {
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
      var s = [...o.current.keys()].filter((u) => !this.current.has(u));
      if (s.length === 0)
        t && o.discard();
      else if (n.length > 0) {
        o.activate();
        var i = /* @__PURE__ */ new Set(), f = /* @__PURE__ */ new Map();
        for (var l of n)
          cn(l, s, i, f);
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
      let s = this.#r.get(n) ?? 0;
      this.#r.set(n, s + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(t, n, r) {
    let s = this.#e.get(n) ?? 0;
    if (s === 1 ? this.#e.delete(n) : this.#e.set(n, s - 1), t) {
      let i = this.#r.get(n) ?? 0;
      i === 1 ? this.#r.delete(n) : this.#r.set(n, i - 1);
    }
    this.#c || r || (this.#c = !0, Ee(() => {
      this.#c = !1, this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, n) {
    for (const r of t)
      this.#i.add(r);
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
    return (this.#s ??= en()).promise;
  }
  static ensure() {
    if (b === null) {
      const t = b = new ue();
      ot || (le.add(b), Ie || Ee(() => {
        b === t && t.flush();
      }));
    }
    return b;
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
    if (pt = t, t.b?.is_pending && (t.f & (Se | et | tn)) !== 0 && (t.f & me) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var n = t; n.parent !== null; ) {
      n = n.parent;
      var r = n.f;
      if (xe !== null && n === g && (_ === null || (_.f & T) === 0))
        return;
      if ((r & (ge | W)) !== 0) {
        if ((r & E) === 0)
          return;
        n.f ^= E;
      }
    }
    this.#n.push(n);
  }
}
function Br(e) {
  var t = Ie;
  Ie = !0;
  try {
    for (var n; ; ) {
      if (Ir(), b === null)
        return (
          /** @type {T} */
          n
        );
      b.flush();
    }
  } finally {
    Ie = t;
  }
}
function Yr() {
  try {
    Cr();
  } catch (e) {
    ae(e, pt);
  }
}
let te = null;
function Bt(e) {
  var t = e.length;
  if (t !== 0) {
    for (var n = 0; n < t; ) {
      var r = e[n++];
      if ((r.f & (J | H)) === 0 && Ye(r) && (te = /* @__PURE__ */ new Set(), Ce(r), r.deps === null && r.first === null && r.nodes === null && r.teardown === null && r.ac === null && Cn(r), te?.size > 0)) {
        fe.clear();
        for (const s of te) {
          if ((s.f & (J | H)) !== 0) continue;
          const i = [s];
          let f = s.parent;
          for (; f !== null; )
            te.has(f) && (te.delete(f), i.push(f)), f = f.parent;
          for (let l = i.length - 1; l >= 0; l--) {
            const a = i[l];
            (a.f & (J | H)) === 0 && Ce(a);
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
    for (const s of e.reactions) {
      const i = s.f;
      (i & T) !== 0 ? cn(
        /** @type {Derived} */
        s,
        t,
        n,
        r
      ) : (i & (wt | ce)) !== 0 && (i & R) === 0 && dn(s, t, r) && (y(s, R), qt(
        /** @type {Effect} */
        s
      ));
    }
}
function dn(e, t, n) {
  const r = n.get(e);
  if (r !== void 0) return r;
  if (e.deps !== null)
    for (const s of e.deps) {
      if (ke.call(t, s))
        return !0;
      if ((s.f & T) !== 0 && dn(
        /** @type {Derived} */
        s,
        t,
        n
      ))
        return n.set(
          /** @type {Derived} */
          s,
          !0
        ), !0;
    }
  return n.set(e, !1), !1;
}
function qt(e) {
  b.schedule(e);
}
function vn(e, t) {
  if (!((e.f & W) !== 0 && (e.f & E) !== 0)) {
    (e.f & R) !== 0 ? t.d.push(e) : (e.f & K) !== 0 && t.m.push(e), y(e, E);
    for (var n = e.first; n !== null; )
      vn(n, t), n = n.next;
  }
}
function hn(e) {
  y(e, E);
  for (var t = e.first; t !== null; )
    hn(t), t = t.next;
}
function Vr(e) {
  let t = 0, n = tt(0), r;
  return () => {
    Et() && (c(n), kt(() => (t === 0 && (r = rt(() => e(() => ze(n)))), t += 1, () => {
      Ee(() => {
        t -= 1, t === 0 && (r?.(), r = void 0, ze(n));
      });
    })));
  };
}
var Ur = Te | Me;
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
  #s;
  /** @type {Effect | null} */
  #n = null;
  /** @type {Effect | null} */
  #i = null;
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
  constructor(t, n, r, s) {
    this.#t = t, this.#e = n, this.#r = (i) => {
      var f = (
        /** @type {Effect} */
        g
      );
      f.b = this, f.f |= dt, r(i);
    }, this.parent = /** @type {Effect} */
    g.b, this.transform_error = s ?? this.parent?.transform_error ?? ((i) => i), this.#s = Tn(() => {
      this.#w();
    }, Ur);
  }
  #b() {
    try {
      this.#n = ne(() => this.#r(this.#t));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #q(t) {
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
  #x() {
    const t = this.#e.pending;
    t && (this.is_pending = !0, this.#i = ne(() => t(this.#t)), Ee(() => {
      var n = this.#a = document.createDocumentFragment(), r = Xe();
      n.append(r), this.#n = this.#g(() => ne(() => this.#r(r))), this.#f === 0 && (this.#t.before(n), this.#a = null, Le(
        /** @type {Effect} */
        this.#i,
        () => {
          this.#i = null;
        }
      ), this.#_(
        /** @type {Batch} */
        b
      ));
    }));
  }
  #w() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#f = 0, this.#c = 0, this.#n = ne(() => {
        this.#r(this.#t);
      }), this.#f > 0) {
        var t = this.#a = document.createDocumentFragment();
        Nn(this.#n, t);
        const n = (
          /** @type {(anchor: Node) => void} */
          this.#e.pending
        );
        this.#i = ne(() => n(this.#t));
      } else
        this.#_(
          /** @type {Batch} */
          b
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
  #g(t) {
    var n = g, r = _, s = P;
    Z(this.#s), z(this.#s), Ae(this.#s.ctx);
    try {
      return ue.ensure(), t();
    } catch (i) {
      return on(i), null;
    } finally {
      Z(n), z(r), Ae(s);
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
    this.#f += t, this.#f === 0 && (this.#_(n), this.#i && Le(this.#i, () => {
      this.#i = null;
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
    this.#m(t, n), this.#c += t, !(!this.#u || this.#d) && (this.#d = !0, Ee(() => {
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
    this.#n && (F(this.#n), this.#n = null), this.#i && (F(this.#i), this.#i = null), this.#l && (F(this.#l), this.#l = null);
    var s = !1, i = !1;
    const f = () => {
      if (s) {
        jr();
        return;
      }
      s = !0, i && Pr(), this.#l !== null && Le(this.#l, () => {
        this.#l = null;
      }), this.#g(() => {
        this.#w();
      });
    }, l = (a) => {
      try {
        i = !0, n?.(a, f), i = !1;
      } catch (o) {
        ae(o, this.#s && this.#s.parent);
      }
      r && (this.#l = this.#g(() => {
        try {
          return ne(() => {
            var o = (
              /** @type {Effect} */
              g
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
            this.#s.parent
          ), null;
        }
      }));
    };
    Ee(() => {
      var a;
      try {
        a = this.transform_error(t);
      } catch (o) {
        ae(o, this.#s && this.#s.parent);
        return;
      }
      a !== null && typeof a == "object" && typeof /** @type {any} */
      a.then == "function" ? a.then(
        l,
        /** @param {unknown} e */
        (o) => ae(o, this.#s && this.#s.parent)
      ) : l(a);
    });
  }
}
function Jr(e, t, n, r) {
  const s = _n;
  var i = e.filter((d) => !d.settled);
  if (n.length === 0 && i.length === 0) {
    r(t.map(s));
    return;
  }
  var f = (
    /** @type {Effect} */
    g
  ), l = Wr(), a = i.length === 1 ? i[0].promise : i.length > 1 ? Promise.all(i.map((d) => d.promise)) : null;
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
    a.then(() => o(t.map(s)));
    return;
  }
  var u = pn();
  function v() {
    Promise.all(n.map((d) => /* @__PURE__ */ Kr(d))).then((d) => o([...t.map(s), ...d])).catch((d) => ae(d, f)).finally(() => u());
  }
  a ? a.then(() => {
    l(), v(), Ze();
  }) : v();
}
function Wr() {
  var e = (
    /** @type {Effect} */
    g
  ), t = _, n = P, r = (
    /** @type {Batch} */
    b
  );
  return function(i = !0) {
    Z(e), z(t), Ae(n), i && (e.f & J) === 0 && (r?.activate(), r?.apply());
  };
}
function Ze(e = !0) {
  Z(null), z(null), Ae(null), e && b?.deactivate();
}
function pn() {
  var e = (
    /** @type {Effect} */
    g
  ), t = (
    /** @type {Boundary} */
    e.b
  ), n = (
    /** @type {Batch} */
    b
  ), r = t.is_rendered();
  return t.update_pending_count(1, n), n.increment(r, e), (s = !1) => {
    t.update_pending_count(-1, n), n.decrement(r, e, s);
  };
}
// @__NO_SIDE_EFFECTS__
function _n(e) {
  var t = T | R, n = _ !== null && (_.f & T) !== 0 ? (
    /** @type {Derived} */
    _
  ) : null;
  return g !== null && (g.f |= Me), {
    ctx: P,
    deps: null,
    effects: null,
    equals: nn,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      C
    ),
    wv: 0,
    parent: n ?? g,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function Kr(e, t, n) {
  let r = (
    /** @type {Effect | null} */
    g
  );
  r === null && kr();
  var s = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), i = tt(
    /** @type {V} */
    C
  ), f = !_, l = /* @__PURE__ */ new Map();
  return fs(() => {
    var a = (
      /** @type {Effect} */
      g
    ), o = en();
    s = o.promise;
    try {
      Promise.resolve(e()).then(o.resolve, o.reject).finally(Ze);
    } catch (p) {
      o.reject(p), Ze();
    }
    var u = (
      /** @type {Batch} */
      b
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
          i.f |= oe, Qe(i, h);
        else {
          (i.f & oe) !== 0 && (i.f ^= oe), Qe(i, p);
          for (const [k, A] of l) {
            if (l.delete(k), k === u) break;
            A.reject(re);
          }
        }
        u.deactivate();
      }
    };
    o.promise.then(d, (p) => d(null, p || "unknown"));
  }), ls(() => {
    for (const a of l.values())
      a.reject(re);
  }), new Promise((a) => {
    function o(u) {
      function v() {
        u === s ? a(i) : o(s);
      }
      u.then(v, v);
    }
    o(s);
  });
}
// @__NO_SIDE_EFFECTS__
function Pe(e) {
  const t = /* @__PURE__ */ _n(e);
  return Pn(t), t;
}
function Zr(e) {
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
function Qr(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & T) === 0)
      return (t.f & J) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function xt(e) {
  var t, n = g;
  Z(Qr(e));
  try {
    e.f &= ~be, Zr(e), t = jn(e);
  } finally {
    Z(n);
  }
  return t;
}
function gn(e) {
  var t = e.v, n = xt(e);
  if (!e.equals(n) && (e.wv = Fn(), (!b?.is_fork || e.deps === null) && (e.v = n, b?.capture(e, t, !0), e.deps === null))) {
    y(e, E);
    return;
  }
  we || (V !== null ? (Et() || b?.is_fork) && V.set(e, n) : mt(e));
}
function Xr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(re), t.teardown = mr, t.ac = null, Be(t, 0), St(t));
}
function bn(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && Ce(t);
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
function M(e, t) {
  const n = tt(e);
  return Pn(n), n;
}
function x(e, t, n = !1) {
  _ !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!U || (_.f & zt) !== 0) && ln() && (_.f & (T | ce | wt | zt)) !== 0 && (I === null || !ke.call(I, e)) && Nr();
  let r = n ? ye(t) : t;
  return Qe(e, r, We);
}
function Qe(e, t, n = null) {
  if (!e.equals(t)) {
    var r = e.v;
    we ? fe.set(e, t) : fe.set(e, r), e.v = t;
    var s = ue.ensure();
    if (s.capture(e, r), (e.f & T) !== 0) {
      const i = (
        /** @type {Derived} */
        e
      );
      (e.f & R) !== 0 && xt(i), V === null && mt(i);
    }
    e.wv = Fn(), mn(e, R, n), g !== null && (g.f & E) !== 0 && (g.f & (W | ge)) === 0 && (O === null ? vs([e]) : O.push(e)), !s.is_fork && _t.size > 0 && !wn && $r();
  }
  return t;
}
function $r() {
  wn = !1;
  for (const e of _t)
    (e.f & E) !== 0 && y(e, K), Ye(e) && Ce(e);
  _t.clear();
}
function ze(e) {
  x(e, e.v + 1);
}
function mn(e, t, n) {
  var r = e.reactions;
  if (r !== null)
    for (var s = r.length, i = 0; i < s; i++) {
      var f = r[i], l = f.f, a = (l & R) === 0;
      if (a && y(f, t), (l & T) !== 0) {
        var o = (
          /** @type {Derived} */
          f
        );
        V?.delete(o), (l & be) === 0 && (l & j && (f.f |= be), mn(o, K, n));
      } else if (a) {
        var u = (
          /** @type {Effect} */
          f
        );
        (l & ce) !== 0 && te !== null && te.add(u), n !== null ? n.push(u) : qt(u);
      }
    }
}
function ye(e) {
  if (typeof e != "object" || e === null || Je in e)
    return e;
  const t = wr(e);
  if (t !== gr && t !== br)
    return e;
  var n = /* @__PURE__ */ new Map(), r = vr(e), s = /* @__PURE__ */ M(0), i = _e, f = (l) => {
    if (_e === i)
      return l();
    var a = _, o = _e;
    z(null), Ht(i);
    var u = l();
    return z(a), Ht(o), u;
  };
  return r && n.set("length", /* @__PURE__ */ M(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, a, o) {
        (!("value" in o) || o.configurable === !1 || o.enumerable === !1 || o.writable === !1) && Mr();
        var u = n.get(a);
        return u === void 0 ? f(() => {
          var v = /* @__PURE__ */ M(o.value);
          return n.set(a, v), v;
        }) : x(u, o.value, !0), !0;
      },
      deleteProperty(l, a) {
        var o = n.get(a);
        if (o === void 0) {
          if (a in l) {
            const u = f(() => /* @__PURE__ */ M(C));
            n.set(a, u), ze(s);
          }
        } else
          x(o, C), ze(s);
        return !0;
      },
      get(l, a, o) {
        if (a === Je)
          return e;
        var u = n.get(a), v = a in l;
        if (u === void 0 && (!v || je(l, a)?.writable) && (u = f(() => {
          var p = ye(v ? l[a] : C), h = /* @__PURE__ */ M(p);
          return h;
        }), n.set(a, u)), u !== void 0) {
          var d = c(u);
          return d === C ? void 0 : d;
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
          if (v !== void 0 && d !== C)
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
        var o = n.get(a), u = o !== void 0 && o.v !== C || Reflect.has(l, a);
        if (o !== void 0 || g !== null && (!u || je(l, a)?.writable)) {
          o === void 0 && (o = f(() => {
            var d = u ? ye(l[a]) : C, p = /* @__PURE__ */ M(d);
            return p;
          }), n.set(a, o));
          var v = c(o);
          if (v === C)
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
            h !== void 0 ? x(h, C) : p in l && (h = f(() => /* @__PURE__ */ M(C)), n.set(p + "", h));
          }
        if (v === void 0)
          (!d || je(l, a)?.writable) && (v = f(() => /* @__PURE__ */ M(void 0)), x(v, ye(o)), n.set(a, v));
        else {
          d = v.v !== C;
          var w = f(() => ye(o));
          x(v, w);
        }
        var k = Reflect.getOwnPropertyDescriptor(l, a);
        if (k?.set && k.set.call(u, o), !d) {
          if (r && typeof a == "string") {
            var A = (
              /** @type {Source<number>} */
              n.get("length")
            ), L = Number(a);
            Number.isInteger(L) && L >= A.v && x(A, L + 1);
          }
          ze(s);
        }
        return !0;
      },
      ownKeys(l) {
        c(s);
        var a = Reflect.ownKeys(l).filter((v) => {
          var d = n.get(v);
          return d === void 0 || d.v !== C;
        });
        for (var [o, u] of n)
          u.v !== C && !(o in l) && a.push(o);
        return a;
      },
      setPrototypeOf() {
        Rr();
      }
    }
  );
}
var Yt, qn, xn, yn;
function es() {
  if (Yt === void 0) {
    Yt = window, qn = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, n = Text.prototype;
    xn = je(t, "firstChild").get, yn = je(t, "nextSibling").get, It(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), It(n) && (n.__t = void 0);
  }
}
function Xe(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function $e(e) {
  return (
    /** @type {TemplateNode | null} */
    xn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function nt(e) {
  return (
    /** @type {TemplateNode | null} */
    yn.call(e)
  );
}
function q(e, t) {
  return /* @__PURE__ */ $e(e);
}
function Vt(e, t = !1) {
  {
    var n = /* @__PURE__ */ $e(e);
    return n instanceof Comment && n.data === "" ? /* @__PURE__ */ nt(n) : n;
  }
}
function S(e, t = 1, n = !1) {
  let r = e;
  for (; t--; )
    r = /** @type {TemplateNode} */
    /* @__PURE__ */ nt(r);
  return r;
}
function ts() {
  return !1;
}
function En(e, t, n) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(Or, e, void 0)
  );
}
let Ut = !1;
function ns() {
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
function yt(e) {
  var t = _, n = g;
  z(null), Z(null);
  try {
    return e();
  } finally {
    z(t), Z(n);
  }
}
function rs(e, t, n, r = n) {
  e.addEventListener(t, () => yt(n));
  const s = e.__on_r;
  s ? e.__on_r = () => {
    s(), r(!0);
  } : e.__on_r = () => r(!0), ns();
}
function ss(e) {
  g === null && (_ === null && Ar(), Tr()), we && Sr();
}
function is(e, t) {
  var n = t.last;
  n === null ? t.last = t.first = e : (n.next = e, e.prev = n, t.last = e);
}
function se(e, t) {
  var n = g;
  n !== null && (n.f & H) !== 0 && (e |= H);
  var r = {
    ctx: P,
    deps: null,
    nodes: null,
    f: e | R | j,
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
  }, s = r;
  if ((e & Se) !== 0)
    xe !== null ? xe.push(r) : ue.ensure().schedule(r);
  else if (t !== null) {
    try {
      Ce(r);
    } catch (f) {
      throw F(r), f;
    }
    s.deps === null && s.teardown === null && s.nodes === null && s.first === s.last && // either `null`, or a singular child
    (s.f & Me) === 0 && (s = s.first, (e & ce) !== 0 && (e & Te) !== 0 && s !== null && (s.f |= Te));
  }
  if (s !== null && (s.parent = n, n !== null && is(s, n), _ !== null && (_.f & T) !== 0 && (e & ge) === 0)) {
    var i = (
      /** @type {Derived} */
      _
    );
    (i.effects ??= []).push(s);
  }
  return r;
}
function Et() {
  return _ !== null && !U;
}
function ls(e) {
  const t = se(et, null);
  return y(t, E), t.teardown = e, t;
}
function as(e) {
  ss();
  var t = (
    /** @type {Effect} */
    g.f
  ), n = !_ && (t & W) !== 0 && (t & me) === 0;
  if (n) {
    var r = (
      /** @type {ComponentContext} */
      P
    );
    (r.e ??= []).push(e);
  } else
    return kn(e);
}
function kn(e) {
  return se(Se | yr, e);
}
function os(e) {
  ue.ensure();
  const t = se(ge | Me, e);
  return (n = {}) => new Promise((r) => {
    n.outro ? Le(t, () => {
      F(t), r(void 0);
    }) : (F(t), r(void 0));
  });
}
function Sn(e) {
  return se(Se, e);
}
function fs(e) {
  return se(wt | Me, e);
}
function kt(e, t = 0) {
  return se(et | t, e);
}
function De(e, t = [], n = [], r = []) {
  Jr(r, t, n, (s) => {
    se(et, () => e(...s.map(c)));
  });
}
function Tn(e, t = 0) {
  var n = se(ce | t, e);
  return n;
}
function ne(e) {
  return se(W | Me, e);
}
function An(e) {
  var t = e.teardown;
  if (t !== null) {
    const n = we, r = _;
    Gt(!0), z(null);
    try {
      t.call(null);
    } finally {
      Gt(n), z(r);
    }
  }
}
function St(e, t = !1) {
  var n = e.first;
  for (e.first = e.last = null; n !== null; ) {
    const s = n.ac;
    s !== null && yt(() => {
      s.abort(re);
    });
    var r = n.next;
    (n.f & ge) !== 0 ? n.parent = null : F(n, t), n = r;
  }
}
function us(e) {
  for (var t = e.first; t !== null; ) {
    var n = t.next;
    (t.f & W) === 0 && F(t), t = n;
  }
}
function F(e, t = !0) {
  var n = !1;
  (t || (e.f & xr) !== 0) && e.nodes !== null && e.nodes.end !== null && (cs(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), n = !0), y(e, vt), St(e, t && !n), Be(e, 0);
  var r = e.nodes && e.nodes.t;
  if (r !== null)
    for (const i of r)
      i.stop();
  An(e), e.f ^= vt, e.f |= J;
  var s = e.parent;
  s !== null && s.first !== null && Cn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function cs(e, t) {
  for (; e !== null; ) {
    var n = e === t ? null : /* @__PURE__ */ nt(e);
    e.remove(), e = n;
  }
}
function Cn(e) {
  var t = e.parent, n = e.prev, r = e.next;
  n !== null && (n.next = r), r !== null && (r.prev = n), t !== null && (t.first === e && (t.first = r), t.last === e && (t.last = n));
}
function Le(e, t, n = !0) {
  var r = [];
  Mn(e, r, !0);
  var s = () => {
    n && F(e), t && t();
  }, i = r.length;
  if (i > 0) {
    var f = () => --i || s();
    for (var l of r)
      l.out(f);
  } else
    s();
}
function Mn(e, t, n) {
  if ((e.f & H) === 0) {
    e.f ^= H;
    var r = e.nodes && e.nodes.t;
    if (r !== null)
      for (const l of r)
        (l.is_global || n) && t.push(l);
    for (var s = e.first; s !== null; ) {
      var i = s.next, f = (s.f & Te) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (s.f & W) !== 0 && (e.f & ce) !== 0;
      Mn(s, t, f ? n : !1), s = i;
    }
  }
}
function ds(e) {
  Rn(e, !0);
}
function Rn(e, t) {
  if ((e.f & H) !== 0) {
    e.f ^= H, (e.f & E) === 0 && (y(e, R), ue.ensure().schedule(e));
    for (var n = e.first; n !== null; ) {
      var r = n.next, s = (n.f & Te) !== 0 || (n.f & W) !== 0;
      Rn(n, s ? t : !1), n = r;
    }
    var i = e.nodes && e.nodes.t;
    if (i !== null)
      for (const f of i)
        (f.is_global || t) && f.in();
  }
}
function Nn(e, t) {
  if (e.nodes)
    for (var n = e.nodes.start, r = e.nodes.end; n !== null; ) {
      var s = n === r ? null : /* @__PURE__ */ nt(n);
      t.append(n), n = s;
    }
}
let Ke = !1, we = !1;
function Gt(e) {
  we = e;
}
let _ = null, U = !1;
function z(e) {
  _ = e;
}
let g = null;
function Z(e) {
  g = e;
}
let I = null;
function Pn(e) {
  _ !== null && (I === null ? I = [e] : I.push(e));
}
let N = null, D = 0, O = null;
function vs(e) {
  O = e;
}
let Dn = 1, pe = 0, _e = pe;
function Ht(e) {
  _e = e;
}
function Fn() {
  return ++Dn;
}
function Ye(e) {
  var t = e.f;
  if ((t & R) !== 0)
    return !0;
  if (t & T && (e.f &= ~be), (t & K) !== 0) {
    for (var n = (
      /** @type {Value[]} */
      e.deps
    ), r = n.length, s = 0; s < r; s++) {
      var i = n[s];
      if (Ye(
        /** @type {Derived} */
        i
      ) && gn(
        /** @type {Derived} */
        i
      ), i.wv > e.wv)
        return !0;
    }
    (t & j) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    V === null && y(e, E);
  }
  return !1;
}
function On(e, t, n = !0) {
  var r = e.reactions;
  if (r !== null && !(I !== null && ke.call(I, e)))
    for (var s = 0; s < r.length; s++) {
      var i = r[s];
      (i.f & T) !== 0 ? On(
        /** @type {Derived} */
        i,
        t,
        !1
      ) : t === i && (n ? y(i, R) : (i.f & E) !== 0 && y(i, K), qt(
        /** @type {Effect} */
        i
      ));
    }
}
function jn(e) {
  var t = N, n = D, r = O, s = _, i = I, f = P, l = U, a = _e, o = e.f;
  N = /** @type {null | Value[]} */
  null, D = 0, O = null, _ = (o & (W | ge)) === 0 ? e : null, I = null, Ae(e.ctx), U = !1, _e = ++pe, e.ac !== null && (yt(() => {
    e.ac.abort(re);
  }), e.ac = null);
  try {
    e.f |= ht;
    var u = (
      /** @type {Function} */
      e.fn
    ), v = u();
    e.f |= me;
    var d = e.deps, p = b?.is_fork;
    if (N !== null) {
      var h;
      if (p || Be(e, D), d !== null && D > 0)
        for (d.length = D + N.length, h = 0; h < N.length; h++)
          d[D + h] = N[h];
      else
        e.deps = d = N;
      if (Et() && (e.f & j) !== 0)
        for (h = D; h < d.length; h++)
          (d[h].reactions ??= []).push(e);
    } else !p && d !== null && D < d.length && (Be(e, D), d.length = D);
    if (ln() && O !== null && !U && d !== null && (e.f & (T | K | R)) === 0)
      for (h = 0; h < /** @type {Source[]} */
      O.length; h++)
        On(
          O[h],
          /** @type {Effect} */
          e
        );
    if (s !== null && s !== e) {
      if (pe++, s.deps !== null)
        for (let w = 0; w < n; w += 1)
          s.deps[w].rv = pe;
      if (t !== null)
        for (const w of t)
          w.rv = pe;
      O !== null && (r === null ? r = O : r.push(.../** @type {Source[]} */
      O));
    }
    return (e.f & oe) !== 0 && (e.f ^= oe), v;
  } catch (w) {
    return on(w);
  } finally {
    e.f ^= ht, N = t, D = n, O = r, _ = s, I = i, Ae(f), U = l, _e = a;
  }
}
function hs(e, t) {
  let n = t.reactions;
  if (n !== null) {
    var r = hr.call(n, e);
    if (r !== -1) {
      var s = n.length - 1;
      s === 0 ? n = t.reactions = null : (n[r] = n[s], n.pop());
    }
  }
  if (n === null && (t.f & T) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (N === null || !ke.call(N, t))) {
    var i = (
      /** @type {Derived} */
      t
    );
    (i.f & j) !== 0 && (i.f ^= j, i.f &= ~be), mt(i), Xr(i), Be(i, 0);
  }
}
function Be(e, t) {
  var n = e.deps;
  if (n !== null)
    for (var r = t; r < n.length; r++)
      hs(e, n[r]);
}
function Ce(e) {
  var t = e.f;
  if ((t & J) === 0) {
    y(e, E);
    var n = g, r = Ke;
    g = e, Ke = !0;
    try {
      (t & (ce | tn)) !== 0 ? us(e) : St(e), An(e);
      var s = jn(e);
      e.teardown = typeof s == "function" ? s : null, e.wv = Dn;
      var i;
    } finally {
      Ke = r, g = n;
    }
  }
}
async function ps() {
  await Promise.resolve(), Br();
}
function c(e) {
  var t = e.f, n = (t & T) !== 0;
  if (_ !== null && !U) {
    var r = g !== null && (g.f & J) !== 0;
    if (!r && (I === null || !ke.call(I, e))) {
      var s = _.deps;
      if ((_.f & ht) !== 0)
        e.rv < pe && (e.rv = pe, N === null && s !== null && s[D] === e ? D++ : N === null ? N = [e] : N.push(e));
      else {
        (_.deps ??= []).push(e);
        var i = e.reactions;
        i === null ? e.reactions = [_] : ke.call(i, _) || i.push(_);
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
      return ((f.f & E) === 0 && f.reactions !== null || zn(f)) && (l = xt(f)), fe.set(f, l), l;
    }
    var a = (f.f & j) === 0 && !U && _ !== null && (Ke || (_.f & j) !== 0), o = (f.f & me) === 0;
    Ye(f) && (a && (f.f |= j), gn(f)), a && !o && (bn(f), In(f));
  }
  if (V?.has(e))
    return V.get(e);
  if ((e.f & oe) !== 0)
    throw e.v;
  return e.v;
}
function In(e) {
  if (e.f |= j, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & T) !== 0 && (t.f & j) === 0 && (bn(
        /** @type {Derived} */
        t
      ), In(
        /** @type {Derived} */
        t
      ));
}
function zn(e) {
  if (e.v === C) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (fe.has(t) || (t.f & T) !== 0 && zn(
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
const _s = ["touchstart", "touchmove"];
function gs(e) {
  return _s.includes(e);
}
const Oe = /* @__PURE__ */ Symbol("events"), Ln = /* @__PURE__ */ new Set(), gt = /* @__PURE__ */ new Set();
function Fe(e, t, n) {
  (t[Oe] ??= {})[e] = n;
}
function bs(e) {
  for (var t = 0; t < e.length; t++)
    Ln.add(e[t]);
  for (var n of gt)
    n(e);
}
let Jt = null;
function Wt(e) {
  var t = this, n = (
    /** @type {Node} */
    t.ownerDocument
  ), r = e.type, s = e.composedPath?.() || [], i = (
    /** @type {null | Element} */
    s[0] || e.target
  );
  Jt = e;
  var f = 0, l = Jt === e && e[Oe];
  if (l) {
    var a = s.indexOf(l);
    if (a !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[Oe] = t;
      return;
    }
    var o = s.indexOf(t);
    if (o === -1)
      return;
    a <= o && (f = a);
  }
  if (i = /** @type {Element} */
  s[f] || e.target, i !== t) {
    _r(e, "currentTarget", {
      configurable: !0,
      get() {
        return i || n;
      }
    });
    var u = _, v = g;
    z(null), Z(null);
    try {
      for (var d, p = []; i !== null; ) {
        var h = i.assignedSlot || i.parentNode || /** @type {any} */
        i.host || null;
        try {
          var w = i[Oe]?.[r];
          w != null && (!/** @type {any} */
          i.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === i) && w.call(i, e);
        } catch (k) {
          d ? p.push(k) : d = k;
        }
        if (e.cancelBubble || h === t || h === null)
          break;
        i = h;
      }
      if (d) {
        for (let k of p)
          queueMicrotask(() => {
            throw k;
          });
        throw d;
      }
    } finally {
      e[Oe] = t, delete e.currentTarget, z(u), Z(v);
    }
  }
}
const ws = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function ms(e) {
  return (
    /** @type {string} */
    ws?.createHTML(e) ?? e
  );
}
function qs(e) {
  var t = En("template");
  return t.innerHTML = ms(e.replaceAll("<!>", "<!---->")), t.content;
}
function Kt(e, t) {
  var n = (
    /** @type {Effect} */
    g
  );
  n.nodes === null && (n.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function qe(e, t) {
  var n = (t & Dr) !== 0, r = (t & Fr) !== 0, s, i = !e.startsWith("<!>");
  return () => {
    s === void 0 && (s = qs(i ? e : "<!>" + e), n || (s = /** @type {TemplateNode} */
    /* @__PURE__ */ $e(s)));
    var f = (
      /** @type {TemplateNode} */
      r || qn ? document.importNode(s, !0) : s.cloneNode(!0)
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
function Y(e, t) {
  var n = t == null ? "" : typeof t == "object" ? `${t}` : t;
  n !== (e.__t ??= e.nodeValue) && (e.__t = n, e.nodeValue = `${n}`);
}
function xs(e, t) {
  return ys(e, t);
}
const Ge = /* @__PURE__ */ new Map();
function ys(e, { target: t, anchor: n, props: r = {}, events: s, context: i, intro: f = !0, transformError: l }) {
  es();
  var a = void 0, o = os(() => {
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
          P
        );
        i && (h.c = i), s && (r.$$events = s), a = e(p, r) || {}, sn();
      },
      l
    );
    var v = /* @__PURE__ */ new Set(), d = (p) => {
      for (var h = 0; h < p.length; h++) {
        var w = p[h];
        if (!v.has(w)) {
          v.add(w);
          var k = gs(w);
          for (const Re of [t, document]) {
            var A = Ge.get(Re);
            A === void 0 && (A = /* @__PURE__ */ new Map(), Ge.set(Re, A));
            var L = A.get(w);
            L === void 0 ? (Re.addEventListener(w, Wt, { passive: k }), A.set(w, 1)) : A.set(w, L + 1);
          }
        }
      }
    };
    return d(pr(Ln)), gt.add(d), () => {
      for (var p of v)
        for (const k of [t, document]) {
          var h = (
            /** @type {Map<string, number>} */
            Ge.get(k)
          ), w = (
            /** @type {number} */
            h.get(p)
          );
          --w == 0 ? (k.removeEventListener(p, Wt), h.delete(p), h.size === 0 && Ge.delete(k)) : h.set(p, w);
        }
      gt.delete(d), u !== n && u.parentNode?.removeChild(u);
    };
  });
  return bt.set(a, o), a;
}
let bt = /* @__PURE__ */ new WeakMap();
function Es(e, t) {
  const n = bt.get(e);
  return n ? (bt.delete(e), n(t)) : Promise.resolve();
}
class ks {
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
  #s = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, n = !0) {
    this.anchor = t, this.#s = n;
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
        ds(r), this.#r.delete(n);
      else {
        var s = this.#e.get(n);
        s && (this.#o.set(n, s.effect), this.#e.delete(n), s.fragment.lastChild.remove(), this.anchor.before(s.fragment), r = s.effect);
      }
      for (const [i, f] of this.#t) {
        if (this.#t.delete(i), i === t)
          break;
        const l = this.#e.get(f);
        l && (F(l.effect), this.#e.delete(f));
      }
      for (const [i, f] of this.#o) {
        if (i === n || this.#r.has(i)) continue;
        const l = () => {
          if (Array.from(this.#t.values()).includes(i)) {
            var o = document.createDocumentFragment();
            Nn(f, o), o.append(Xe()), this.#e.set(i, { effect: f, fragment: o });
          } else
            F(f);
          this.#r.delete(i), this.#o.delete(i);
        };
        this.#s || !r ? (this.#r.add(i), Le(f, l, !1)) : l();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #i = (t) => {
    this.#t.delete(t);
    const n = Array.from(this.#t.values());
    for (const [r, s] of this.#e)
      n.includes(r) || (F(s.effect), this.#e.delete(r));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, n) {
    var r = (
      /** @type {Batch} */
      b
    ), s = ts();
    if (n && !this.#o.has(t) && !this.#e.has(t))
      if (s) {
        var i = document.createDocumentFragment(), f = Xe();
        i.append(f), this.#e.set(t, {
          effect: ne(() => n(f)),
          fragment: i
        });
      } else
        this.#o.set(
          t,
          ne(() => n(this.anchor))
        );
    if (this.#t.set(r, t), s) {
      for (const [l, a] of this.#o)
        l === t ? r.unskip_effect(a) : r.skip_effect(a);
      for (const [l, a] of this.#e)
        l === t ? r.unskip_effect(a.effect) : r.skip_effect(a.effect);
      r.oncommit(this.#n), r.ondiscard(this.#i);
    } else
      this.#n(r);
  }
}
function He(e, t, n = !1) {
  var r = new ks(e), s = n ? Te : 0;
  function i(f, l) {
    r.ensure(f, l);
  }
  Tn(() => {
    var f = !1;
    t((l, a = 0) => {
      f = !0, i(a, l);
    }), f || i(-1, null);
  }, s);
}
function Ss(e, t) {
  Sn(() => {
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
      const s = En("style");
      s.id = t.hash, s.textContent = t.code, r.appendChild(s);
    }
  });
}
const Zt = [...` 	
\r\f \v\uFEFF`];
function Ts(e, t, n) {
  var r = e == null ? "" : "" + e;
  if (n) {
    for (var s of Object.keys(n))
      if (n[s])
        r = r ? r + " " + s : s;
      else if (r.length)
        for (var i = s.length, f = 0; (f = r.indexOf(s, f)) >= 0; ) {
          var l = f + i;
          (f === 0 || Zt.includes(r[f - 1])) && (l === r.length || Zt.includes(r[l])) ? r = (f === 0 ? "" : r.substring(0, f)) + r.substring(l + 1) : f = l;
        }
  }
  return r === "" ? null : r;
}
function Qt(e, t = !1) {
  var n = t ? " !important;" : ";", r = "";
  for (var s of Object.keys(e)) {
    var i = e[s];
    i != null && i !== "" && (r += " " + s + ": " + i + n);
  }
  return r;
}
function As(e, t) {
  if (t) {
    var n = "", r, s;
    return Array.isArray(t) ? (r = t[0], s = t[1]) : r = t, r && (n += Qt(r)), s && (n += Qt(s, !0)), n = n.trim(), n === "" ? null : n;
  }
  return String(e);
}
function Xt(e, t, n, r, s, i) {
  var f = e.__className;
  if (f !== n || f === void 0) {
    var l = Ts(n, r, i);
    l == null ? e.removeAttribute("class") : e.className = l, e.__className = n;
  } else if (i && s !== i)
    for (var a in i) {
      var o = !!i[a];
      (s == null || o !== !!s[a]) && e.classList.toggle(a, o);
    }
  return i;
}
function ft(e, t = {}, n, r) {
  for (var s in n) {
    var i = n[s];
    t[s] !== i && (n[s] == null ? e.style.removeProperty(s) : e.style.setProperty(s, i, r));
  }
}
function Cs(e, t, n, r) {
  var s = e.__style;
  if (s !== t) {
    var i = As(t, r);
    i == null ? e.removeAttribute("style") : e.style.cssText = i, e.__style = t;
  } else r && (Array.isArray(r) ? (ft(e, n?.[0], r[0]), ft(e, n?.[1], r[1], "important")) : ft(e, n, r));
  return r;
}
function Ms(e, t, n = t) {
  var r = /* @__PURE__ */ new WeakSet();
  rs(e, "input", async (s) => {
    var i = s ? e.defaultValue : e.value;
    if (i = ut(e) ? ct(i) : i, n(i), b !== null && r.add(b), await ps(), i !== (i = t())) {
      var f = e.selectionStart, l = e.selectionEnd, a = e.value.length;
      if (e.value = i ?? "", l !== null) {
        var o = e.value.length;
        f === l && l === a && o > a ? (e.selectionStart = o, e.selectionEnd = o) : (e.selectionStart = f, e.selectionEnd = Math.min(l, o));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  rt(t) == null && e.value && (n(ut(e) ? ct(e.value) : e.value), b !== null && r.add(b)), kt(() => {
    var s = t();
    if (e === document.activeElement) {
      var i = (
        /** @type {Batch} */
        b
      );
      if (r.has(i))
        return;
    }
    ut(e) && s === ct(e.value) || e.type === "date" && !s && !e.value || s !== e.value && (e.value = s ?? "");
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
function Rs(e = {}, t, n, r) {
  var s = (
    /** @type {ComponentContext} */
    P.r
  ), i = (
    /** @type {Effect} */
    g
  );
  return Sn(() => {
    var f, l;
    return kt(() => {
      f = l, l = [], rt(() => {
        e !== n(...l) && (t(e, ...l), f && $t(n(...f), e) && t(null, ...f));
      });
    }), () => {
      let a = i;
      for (; a !== s && a.parent !== null && a.parent.f & vt; )
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
function Ns(e) {
  P === null && Er(), as(() => {
    const t = rt(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
const Ps = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Ps);
var Ds = /* @__PURE__ */ qe('<div class="center-state svelte-12q00nq"><div class="spinner svelte-12q00nq"></div> <p class="loading-text svelte-12q00nq">Generating problem…</p></div>'), Fs = /* @__PURE__ */ qe("<span> </span>"), Os = /* @__PURE__ */ qe('<p class="prompt-text svelte-12q00nq">What does this print?</p> <div class="answer-row svelte-12q00nq"><input type="text" class="answer-input svelte-12q00nq" placeholder="…" autocomplete="off" spellcheck="false"/> <button class="btn-run svelte-12q00nq">Submit</button></div> <button class="btn-skip svelte-12q00nq">Skip</button>', 1), js = /* @__PURE__ */ qe('<div class="diff svelte-12q00nq"><div class="diff-row svelte-12q00nq"><span class="diff-label svelte-12q00nq">Expected</span> <code class="diff-val svelte-12q00nq"> </code></div> <div class="diff-row svelte-12q00nq"><span class="diff-label svelte-12q00nq">Yours</span> <code class="diff-val yours svelte-12q00nq"> </code></div></div>'), Is = /* @__PURE__ */ qe('<div><span class="result-icon svelte-12q00nq"> </span> <span class="result-word svelte-12q00nq"> </span></div> <!> <div class="explanation svelte-12q00nq"><span class="concept svelte-12q00nq"> </span> <p class="svelte-12q00nq"> </p></div> <div class="actions svelte-12q00nq"><button class="btn-ghost svelte-12q00nq">Next problem</button> <button class="btn-run svelte-12q00nq">Continue</button></div>', 1), zs = /* @__PURE__ */ qe('<div class="content svelte-12q00nq"><div class="header svelte-12q00nq"><div class="lang-badge svelte-12q00nq"><span class="lang-dot svelte-12q00nq"></span> <span class="lang-name svelte-12q00nq"> </span> <span class="tier-pill svelte-12q00nq"> </span></div> <!></div> <div class="code-block svelte-12q00nq"><pre class="svelte-12q00nq"><code class="svelte-12q00nq"> </code></pre></div> <!> <p class="footer-stats svelte-12q00nq"> </p></div>'), Ls = /* @__PURE__ */ qe('<div class="polyglot svelte-12q00nq"><!></div>');
const Bs = {
  hash: "svelte-12q00nq",
  code: `.polyglot.svelte-12q00nq {position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#080808;color:#c8c0b8;font-family:'DM Sans', 'IBM Plex Sans', system-ui, sans-serif;overflow-y:auto;}.center-state.svelte-12q00nq {display:flex;flex-direction:column;align-items:center;gap:14px;}.spinner.svelte-12q00nq {width:22px;height:22px;border:2px solid rgba(255, 255, 255, 0.08);border-top-color:var(--lang, #666);border-radius:50%;
		animation: svelte-12q00nq-spin 0.6s linear infinite;}

	@keyframes svelte-12q00nq-spin { to { transform: rotate(360deg); } }.loading-text.svelte-12q00nq {font-size:13px;color:#444;margin:0;}.content.svelte-12q00nq {width:100%;max-width:540px;padding:40px 28px;display:flex;flex-direction:column;gap:14px;}.header.svelte-12q00nq {display:flex;align-items:center;justify-content:space-between;}.lang-badge.svelte-12q00nq {display:flex;align-items:center;gap:8px;}.lang-dot.svelte-12q00nq {width:8px;height:8px;border-radius:50%;background:var(--lang);box-shadow:0 0 6px color-mix(in srgb, var(--lang) 40%, transparent);}.lang-name.svelte-12q00nq {font-size:14px;font-weight:600;color:var(--lang);}.tier-pill.svelte-12q00nq {font-family:'JetBrains Mono', 'Fira Code', monospace;font-size:10px;color:#555;background:rgba(255, 255, 255, 0.03);border:1px solid rgba(255, 255, 255, 0.06);padding:2px 8px;border-radius:4px;}.tier-delta.svelte-12q00nq {font-family:'JetBrains Mono', monospace;font-size:11px;font-weight:500;}.tier-delta.up.svelte-12q00nq {color:#4caf50;}.tier-delta.down.svelte-12q00nq {color:#ce422b;}

	/* ── code block ── */.code-block.svelte-12q00nq {background:#0c0c0c;border:1px solid rgba(255, 255, 255, 0.05);border-left:3px solid var(--lang);border-radius:8px;overflow:hidden;}.code-block.svelte-12q00nq pre:where(.svelte-12q00nq) {margin:0;padding:18px 20px;overflow-x:auto;}.code-block.svelte-12q00nq code:where(.svelte-12q00nq) {font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;font-size:13px;line-height:1.7;color:#bbb5ad;}

	/* ── answering ── */.prompt-text.svelte-12q00nq {font-size:13px;color:#555;margin:4px 0 0;}.answer-row.svelte-12q00nq {display:flex;gap:8px;}.answer-input.svelte-12q00nq {flex:1;background:#0c0c0c;border:1px solid rgba(255, 255, 255, 0.07);border-radius:6px;color:#e0e0e0;font-family:'JetBrains Mono', monospace;font-size:14px;padding:10px 14px;outline:none;transition:border-color 150ms ease;}.answer-input.svelte-12q00nq:focus {border-color:var(--lang);}.answer-input.svelte-12q00nq::placeholder {color:#333;}.btn-run.svelte-12q00nq {padding:10px 20px;background:var(--lang);color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;transition:opacity 150ms ease;flex-shrink:0;}.btn-run.svelte-12q00nq:hover {opacity:0.85;}.btn-skip.svelte-12q00nq {align-self:flex-start;background:none;border:none;color:#444;font-size:11px;cursor:pointer;padding:0;transition:color 150ms ease;}.btn-skip.svelte-12q00nq:hover {color:#888;}

	/* ── result ── */.result.svelte-12q00nq {display:flex;align-items:center;gap:8px;padding:12px 16px;border-radius:8px;}.result.ok.svelte-12q00nq {background:rgba(76, 175, 80, 0.06);border:1px solid rgba(76, 175, 80, 0.12);}.result.fail.svelte-12q00nq {background:rgba(206, 66, 43, 0.06);border:1px solid rgba(206, 66, 43, 0.12);}.result-icon.svelte-12q00nq {font-size:16px;}.result.ok.svelte-12q00nq .result-icon:where(.svelte-12q00nq) {color:#4caf50;}.result.fail.svelte-12q00nq .result-icon:where(.svelte-12q00nq) {color:#ce422b;}.result-word.svelte-12q00nq {font-weight:600;font-size:14px;}.result.ok.svelte-12q00nq .result-word:where(.svelte-12q00nq) {color:#4caf50;}.result.fail.svelte-12q00nq .result-word:where(.svelte-12q00nq) {color:#ce422b;}.diff.svelte-12q00nq {display:flex;flex-direction:column;gap:6px;padding:10px 14px;background:rgba(255, 255, 255, 0.015);border-radius:6px;}.diff-row.svelte-12q00nq {display:flex;align-items:baseline;gap:10px;}.diff-label.svelte-12q00nq {font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#444;width:56px;flex-shrink:0;}.diff-val.svelte-12q00nq {font-family:'JetBrains Mono', monospace;font-size:13px;color:#aaa;}.diff-val.yours.svelte-12q00nq {color:#666;text-decoration:line-through;text-decoration-color:rgba(206, 66, 43, 0.3);}.explanation.svelte-12q00nq {padding:12px 16px;background:rgba(255, 255, 255, 0.02);border:1px solid rgba(255, 255, 255, 0.04);border-radius:8px;}.concept.svelte-12q00nq {font-size:11px;font-weight:600;color:var(--lang);text-transform:uppercase;letter-spacing:0.05em;}.explanation.svelte-12q00nq p:where(.svelte-12q00nq) {margin:6px 0 0;font-size:13px;color:#777;line-height:1.6;}.actions.svelte-12q00nq {display:flex;justify-content:space-between;gap:8px;}.btn-ghost.svelte-12q00nq {padding:10px 16px;background:transparent;border:1px solid rgba(255, 255, 255, 0.06);border-radius:6px;color:#666;font-size:12px;cursor:pointer;transition:color 150ms ease, border-color 150ms ease;}.btn-ghost.svelte-12q00nq:hover {color:#aaa;border-color:rgba(255, 255, 255, 0.12);}.footer-stats.svelte-12q00nq {font-size:10px;color:#2a2a2a;text-align:center;margin:8px 0 0;font-variant-numeric:tabular-nums;}

	@media (max-width: 480px) {.content.svelte-12q00nq {padding:24px 16px;}
	}`
};
function Ys(e, t) {
  rn(t, !0), Ss(e, Bs);
  const n = {
    python: { display: "Python", color: "#3572A5" },
    javascript: { display: "JavaScript", color: "#F0DB4F" },
    typescript: { display: "TypeScript", color: "#3178C6" },
    rust: { display: "Rust", color: "#CE422B" },
    go: { display: "Go", color: "#00ADD8" },
    java: { display: "Java", color: "#B07219" },
    c: { display: "C", color: "#A8B9CC" },
    ruby: { display: "Ruby", color: "#CC342D" }
  }, r = { tiers: {}, totalCorrect: 0, totalIncorrect: 0 }, s = {
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
  let i = /* @__PURE__ */ Pe(() => Object.keys(n).filter((m) => t.ctx.settings[m] !== !1)), f = /* @__PURE__ */ Pe(() => typeof t.ctx.settings.focus == "string" ? t.ctx.settings.focus : "mixed"), l = /* @__PURE__ */ M(ye({ ...r })), a = /* @__PURE__ */ M(null), o = /* @__PURE__ */ M("loading"), u = /* @__PURE__ */ M(""), v = /* @__PURE__ */ M(null), d = /* @__PURE__ */ M(0), p = /* @__PURE__ */ M(0), h = /* @__PURE__ */ M(void 0), w = /* @__PURE__ */ Pe(() => c(a) ? n[c(a).language] : null), k = /* @__PURE__ */ Pe(() => c(w)?.color ?? "#666"), A = /* @__PURE__ */ Pe(() => c(a) ? L(c(a).language) : 0);
  function L(m) {
    return c(l).tiers[m] ?? 3;
  }
  function Re(m, B, de) {
    let Q = L(m);
    B ? Q += de ? 2 : 1 : Q -= 1, c(l).tiers = { ...c(l).tiers, [m]: Math.max(1, Math.min(10, Q)) }, B ? c(l).totalCorrect++ : c(l).totalIncorrect++, x(l, { ...c(l) }, !0), t.ctx.state.set("polyglot-stats", c(l));
  }
  async function Tt() {
    x(o, "loading"), x(a, null), x(u, ""), x(v, null);
    const m = c(i).length > 0 ? c(i) : ["python"], B = m[Math.floor(Math.random() * m.length)], de = L(B), Q = n[B], Ve = `You generate "What does this print?" programming challenges.

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
- VERIFY your answer by tracing execution step by step`, it = `Generate a ${c(f)} problem for ${Q.display} at tier ${de}.`, ie = await t.ctx.ai.generateJson(Ve, it, s, { maxTokens: 400, timeoutMs: 1e4 });
    !ie?.code || !ie?.answer || (x(
      a,
      {
        kind: "output",
        language: B,
        concept: ie.concept,
        code: ie.code,
        answer: ie.answer,
        explanation: ie.explanation
      },
      !0
    ), x(o, "answering"), x(d, Date.now(), !0), setTimeout(() => c(h)?.focus(), 50));
  }
  function At() {
    if (!c(a) || c(o) !== "answering") return;
    x(p, L(c(a).language), !0);
    const m = c(u).trim() === c(a).answer.trim();
    x(v, m), Re(c(a).language, m, Date.now() - c(d) < 3e4), x(o, "result");
  }
  function Bn(m) {
    m.key === "Enter" && At();
  }
  Ns(async () => {
    const m = await t.ctx.state.get("polyglot-stats");
    m && x(l, { ...r, ...m }, !0), Tt();
  });
  var st = Ls();
  let Ct;
  var Yn = q(st);
  {
    var Vn = (m) => {
      var B = Ds();
      ve(m, B);
    }, Un = (m) => {
      var B = zs(), de = q(B), Q = q(de), Ve = S(q(Q), 2), it = q(Ve), ie = S(Ve, 2), Gn = q(ie), Hn = S(Q, 2);
      {
        var Jn = (G) => {
          var X = Fs();
          let $;
          var ee = q(X);
          De(() => {
            $ = Xt(X, 1, "tier-delta svelte-12q00nq", null, $, {
              up: c(A) > c(p),
              down: c(A) < c(p)
            }), Y(ee, `${c(p) ?? ""} → ${c(A) ?? ""}`);
          }), ve(G, X);
        };
        He(Hn, (G) => {
          c(o) === "result" && c(p) !== c(A) && G(Jn);
        });
      }
      var Mt = S(de, 2), Wn = q(Mt), Kn = q(Wn), Zn = q(Kn), Rt = S(Mt, 2);
      {
        var Qn = (G) => {
          var X = Os(), $ = S(Vt(X), 2), ee = q($);
          Rs(ee, (Ne) => x(h, Ne), () => c(h));
          var Ue = S(ee, 2), lt = S($, 2);
          Fe("keydown", ee, Bn), Ms(ee, () => c(u), (Ne) => x(u, Ne)), Fe("click", Ue, At), Fe("click", lt, () => t.ctx.complete()), ve(G, X);
        }, Xn = (G) => {
          var X = Is(), $ = Vt(X);
          let ee;
          var Ue = q($), lt = q(Ue), Ne = S(Ue, 2), tr = q(Ne), Nt = S($, 2);
          {
            var nr = (at) => {
              var Ot = js(), jt = q(Ot), or = S(q(jt), 2), fr = q(or), ur = S(jt, 2), cr = S(q(ur), 2), dr = q(cr);
              De(() => {
                Y(fr, c(a).answer), Y(dr, c(u) || "(empty)");
              }), ve(at, Ot);
            };
            He(Nt, (at) => {
              c(v) || at(nr);
            });
          }
          var Pt = S(Nt, 2), Dt = q(Pt), rr = q(Dt), sr = S(Dt, 2), ir = q(sr), lr = S(Pt, 2), Ft = q(lr), ar = S(Ft, 2);
          De(() => {
            ee = Xt($, 1, "result svelte-12q00nq", null, ee, { ok: c(v), fail: !c(v) }), Y(lt, c(v) ? "✓" : "✗"), Y(tr, c(v) ? "Correct" : "Not quite"), Y(rr, c(a).concept), Y(ir, c(a).explanation);
          }), Fe("click", Ft, Tt), Fe("click", ar, () => t.ctx.complete()), ve(G, X);
        };
        He(Rt, (G) => {
          c(o) === "answering" ? G(Qn) : G(Xn, -1);
        });
      }
      var $n = S(Rt, 2), er = q($n);
      De(() => {
        Y(it, c(w)?.display), Y(Gn, `Lv. ${c(A) ?? ""}`), Y(Zn, c(a).code), Y(er, `${c(l).totalCorrect ?? ""} correct · ${c(l).totalIncorrect ?? ""} incorrect`);
      }), ve(m, B);
    };
    He(Yn, (m) => {
      c(o) === "loading" ? m(Vn) : c(a) && m(Un, 1);
    });
  }
  De(() => Ct = Cs(st, "", Ct, { "--lang": c(k) })), ve(e, st), sn();
}
bs(["keydown", "click"]);
function Us(e, t) {
  return xs(Ys, { target: e, props: t });
}
function Gs(e) {
  Es(e);
}
export {
  Us as mountPlugin,
  Gs as unmountPlugin
};
