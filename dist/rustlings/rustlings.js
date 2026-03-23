var Nr = Array.isArray, In = Array.prototype.indexOf, Ke = Array.prototype.includes, Rt = Array.from, zn = Object.defineProperty, vt = Object.getOwnPropertyDescriptor, Bn = Object.getOwnPropertyDescriptors, qn = Object.prototype, Ln = Array.prototype, Dr = Object.getPrototypeOf, hr = Object.isExtensible;
const Hn = () => {
};
function Vn(e) {
  for (var t = 0; t < e.length; t++)
    e[t]();
}
function Fr() {
  var e, t, r = new Promise((n, i) => {
    e = n, t = i;
  });
  return { promise: r, resolve: e, reject: t };
}
function jn(e, t) {
  if (Array.isArray(e))
    return e;
  if (!(Symbol.iterator in e))
    return Array.from(e);
  const r = [];
  for (const n of e)
    if (r.push(n), r.length === t) break;
  return r;
}
const O = 2, Qe = 4, Nt = 8, Pr = 1 << 24, Re = 16, se = 32, ze = 64, jt = 128, Z = 512, N = 1024, L = 2048, ce = 4096, J = 8192, ie = 16384, He = 32768, Ut = 1 << 25, Xe = 65536, pr = 1 << 17, Un = 1 << 18, nt = 1 << 19, Gn = 1 << 20, _e = 1 << 25, Be = 65536, Gt = 1 << 21, Xt = 1 << 22, Te = 1 << 23, St = /* @__PURE__ */ Symbol("$state"), Yn = /* @__PURE__ */ Symbol(""), pe = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function $n(e) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Jn() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Wn(e, t, r) {
  throw new Error("https://svelte.dev/e/each_key_duplicate");
}
function Kn(e) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Qn() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Xn(e) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Zn() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function ei() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function ti() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function ri() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function ni() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const ii = 1, si = 2, li = 16, ai = 1, oi = 2, I = /* @__PURE__ */ Symbol(), Or = "http://www.w3.org/1999/xhtml";
function fi() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function Ir(e) {
  return e === this.v;
}
function ui(e, t) {
  return e != e ? t == t : e !== t || e !== null && typeof e == "object" || typeof e == "function";
}
function zr(e) {
  return !ui(e, this.v);
}
let U = null;
function Ze(e) {
  U = e;
}
function Br(e, t = !1, r) {
  U = {
    p: U,
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
function qr(e) {
  var t = (
    /** @type {ComponentContext} */
    U
  ), r = t.e;
  if (r !== null) {
    t.e = null;
    for (var n of r)
      ln(n);
  }
  return t.i = !0, U = t.p, /** @type {T} */
  {};
}
function Lr() {
  return !0;
}
let Fe = [];
function Hr() {
  var e = Fe;
  Fe = [], Vn(e);
}
function We(e) {
  if (Fe.length === 0 && !ht) {
    var t = Fe;
    queueMicrotask(() => {
      t === Fe && Hr();
    });
  }
  Fe.push(e);
}
function ci() {
  for (; Fe.length > 0; )
    Hr();
}
function Vr(e) {
  var t = m;
  if (t === null)
    return g.f |= Te, e;
  if ((t.f & He) === 0 && (t.f & Qe) === 0)
    throw e;
  Se(e, t);
}
function Se(e, t) {
  for (; t !== null; ) {
    if ((t.f & jt) !== 0) {
      if ((t.f & He) === 0)
        throw e;
      try {
        t.b.error(e);
        return;
      } catch (r) {
        e = r;
      }
    }
    t = t.parent;
  }
  throw e;
}
const di = -7169;
function R(e, t) {
  e.f = e.f & di | t;
}
function Zt(e) {
  (e.f & Z) !== 0 || e.deps === null ? R(e, N) : R(e, ce);
}
function jr(e) {
  if (e !== null)
    for (const t of e)
      (t.f & O) === 0 || (t.f & Be) === 0 || (t.f ^= Be, jr(
        /** @type {Derived} */
        t.deps
      ));
}
function Ur(e, t, r) {
  (e.f & L) !== 0 ? t.add(e) : (e.f & ce) !== 0 && r.add(e), jr(e.deps), R(e, N);
}
const ye = /* @__PURE__ */ new Set();
let x = null, re = null, Yt = null, ht = !1, zt = !1, Ye = null, Tt = null;
var _r = 0;
let vi = 1;
class Ce {
  id = vi++;
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
  #n = /* @__PURE__ */ new Map();
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
  #r = [];
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
    return this.is_fork || this.#n.size > 0;
  }
  #h() {
    for (const n of this.#f)
      for (const i of n.#n.keys()) {
        for (var t = !1, r = i; r.parent !== null; ) {
          if (this.#a.has(r)) {
            t = !0;
            break;
          }
          r = r.parent;
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
    var r = this.#a.get(t);
    if (r) {
      this.#a.delete(t);
      for (var n of r.d)
        R(n, L), this.schedule(n);
      for (n of r.m)
        R(n, ce), this.schedule(n);
    }
  }
  #v() {
    if (_r++ > 1e3 && (ye.delete(this), pi()), !this.#d()) {
      for (const l of this.#s)
        this.#l.delete(l), R(l, L), this.schedule(l);
      for (const l of this.#l)
        R(l, ce), this.schedule(l);
    }
    const t = this.#r;
    this.#r = [], this.apply();
    var r = Ye = [], n = [], i = Tt = [];
    for (const l of t)
      try {
        this.#u(l, r, n);
      } catch (a) {
        throw Jr(l), a;
      }
    if (x = null, i.length > 0) {
      var s = Ce.ensure();
      for (const l of i)
        s.schedule(l);
    }
    if (Ye = null, Tt = null, this.#d() || this.#h()) {
      this.#p(n), this.#p(r);
      for (const [l, a] of this.#a)
        $r(l, a);
    } else {
      this.#e.size === 0 && ye.delete(this), this.#s.clear(), this.#l.clear();
      for (const l of this.#t) l(this);
      this.#t.clear(), gr(n), gr(r), this.#i?.resolve();
    }
    var o = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      x
    );
    if (this.#r.length > 0) {
      const l = o ??= this;
      l.#r.push(...this.#r.filter((a) => !l.#r.includes(a)));
    }
    o !== null && (ye.add(o), o.#v()), ye.has(this) || this.#w();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #u(t, r, n) {
    t.f ^= N;
    for (var i = t.first; i !== null; ) {
      var s = i.f, o = (s & (se | ze)) !== 0, l = o && (s & N) !== 0, a = l || (s & J) !== 0 || this.#a.has(i);
      if (!a && i.fn !== null) {
        o ? i.f ^= N : (s & Qe) !== 0 ? r.push(i) : mt(i) && ((s & Re) !== 0 && this.#l.add(i), rt(i));
        var f = i.first;
        if (f !== null) {
          i = f;
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
    for (var r = 0; r < t.length; r += 1)
      Ur(t[r], this.#s, this.#l);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} old_value
   * @param {boolean} [is_derived]
   */
  capture(t, r, n = !1) {
    r !== I && !this.previous.has(t) && this.previous.set(t, r), (t.f & Te) === 0 && (this.current.set(t, [t.v, n]), re?.set(t, t.v));
  }
  activate() {
    x = this;
  }
  deactivate() {
    x = null, re = null;
  }
  flush() {
    try {
      zt = !0, x = this, this.#v();
    } finally {
      _r = 0, Yt = null, Ye = null, Tt = null, zt = !1, x = null, re = null, Ae.clear();
    }
  }
  discard() {
    for (const t of this.#o) t(this);
    this.#o.clear(), ye.delete(this);
  }
  #w() {
    for (const f of ye) {
      var t = f.id < this.id, r = [];
      for (const [c, [h, v]] of this.current) {
        if (f.current.has(c)) {
          var n = (
            /** @type {[any, boolean]} */
            f.current.get(c)[0]
          );
          if (t && h !== n)
            f.current.set(c, [h, v]);
          else
            continue;
        }
        r.push(c);
      }
      var i = [...f.current.keys()].filter((c) => !this.current.has(c));
      if (i.length === 0)
        t && f.discard();
      else if (r.length > 0) {
        f.activate();
        var s = /* @__PURE__ */ new Set(), o = /* @__PURE__ */ new Map();
        for (var l of r)
          Gr(l, i, s, o);
        if (f.#r.length > 0) {
          f.apply();
          for (var a of f.#r)
            f.#u(a, [], []);
          f.#r = [];
        }
        f.deactivate();
      }
    }
    for (const f of ye)
      f.#f.has(this) && (f.#f.delete(this), f.#f.size === 0 && !f.#d() && (f.activate(), f.#v()));
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(t, r) {
    let n = this.#e.get(r) ?? 0;
    if (this.#e.set(r, n + 1), t) {
      let i = this.#n.get(r) ?? 0;
      this.#n.set(r, i + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(t, r, n) {
    let i = this.#e.get(r) ?? 0;
    if (i === 1 ? this.#e.delete(r) : this.#e.set(r, i - 1), t) {
      let s = this.#n.get(r) ?? 0;
      s === 1 ? this.#n.delete(r) : this.#n.set(r, s - 1);
    }
    this.#c || n || (this.#c = !0, We(() => {
      this.#c = !1, this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(t, r) {
    for (const n of t)
      this.#s.add(n);
    for (const n of r)
      this.#l.add(n);
    t.clear(), r.clear();
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
    return (this.#i ??= Fr()).promise;
  }
  static ensure() {
    if (x === null) {
      const t = x = new Ce();
      zt || (ye.add(x), ht || We(() => {
        x === t && t.flush();
      }));
    }
    return x;
  }
  apply() {
    {
      re = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(t) {
    if (Yt = t, t.b?.is_pending && (t.f & (Qe | Nt | Pr)) !== 0 && (t.f & He) === 0) {
      t.b.defer_effect(t);
      return;
    }
    for (var r = t; r.parent !== null; ) {
      r = r.parent;
      var n = r.f;
      if (Ye !== null && r === m && (g === null || (g.f & O) === 0))
        return;
      if ((n & (ze | se)) !== 0) {
        if ((n & N) === 0)
          return;
        r.f ^= N;
      }
    }
    this.#r.push(r);
  }
}
function hi(e) {
  var t = ht;
  ht = !0;
  try {
    for (var r; ; ) {
      if (ci(), x === null)
        return (
          /** @type {T} */
          r
        );
      x.flush();
    }
  } finally {
    ht = t;
  }
}
function pi() {
  try {
    Zn();
  } catch (e) {
    Se(e, Yt);
  }
}
let he = null;
function gr(e) {
  var t = e.length;
  if (t !== 0) {
    for (var r = 0; r < t; ) {
      var n = e[r++];
      if ((n.f & (ie | J)) === 0 && mt(n) && (he = /* @__PURE__ */ new Set(), rt(n), n.deps === null && n.first === null && n.nodes === null && n.teardown === null && n.ac === null && fn(n), he?.size > 0)) {
        Ae.clear();
        for (const i of he) {
          if ((i.f & (ie | J)) !== 0) continue;
          const s = [i];
          let o = i.parent;
          for (; o !== null; )
            he.has(o) && (he.delete(o), s.push(o)), o = o.parent;
          for (let l = s.length - 1; l >= 0; l--) {
            const a = s[l];
            (a.f & (ie | J)) === 0 && rt(a);
          }
        }
        he.clear();
      }
    }
    he = null;
  }
}
function Gr(e, t, r, n) {
  if (!r.has(e) && (r.add(e), e.reactions !== null))
    for (const i of e.reactions) {
      const s = i.f;
      (s & O) !== 0 ? Gr(
        /** @type {Derived} */
        i,
        t,
        r,
        n
      ) : (s & (Xt | Re)) !== 0 && (s & L) === 0 && Yr(i, t, n) && (R(i, L), er(
        /** @type {Effect} */
        i
      ));
    }
}
function Yr(e, t, r) {
  const n = r.get(e);
  if (n !== void 0) return n;
  if (e.deps !== null)
    for (const i of e.deps) {
      if (Ke.call(t, i))
        return !0;
      if ((i.f & O) !== 0 && Yr(
        /** @type {Derived} */
        i,
        t,
        r
      ))
        return r.set(
          /** @type {Derived} */
          i,
          !0
        ), !0;
    }
  return r.set(e, !1), !1;
}
function er(e) {
  x.schedule(e);
}
function $r(e, t) {
  if (!((e.f & se) !== 0 && (e.f & N) !== 0)) {
    (e.f & L) !== 0 ? t.d.push(e) : (e.f & ce) !== 0 && t.m.push(e), R(e, N);
    for (var r = e.first; r !== null; )
      $r(r, t), r = r.next;
  }
}
function Jr(e) {
  R(e, N);
  for (var t = e.first; t !== null; )
    Jr(t), t = t.next;
}
function _i(e) {
  let t = 0, r = qe(0), n;
  return () => {
    ir() && (u(r), sr(() => (t === 0 && (n = Dt(() => e(() => pt(r)))), t += 1, () => {
      We(() => {
        t -= 1, t === 0 && (n?.(), n = void 0, pt(r));
      });
    })));
  };
}
var gi = Xe | nt;
function wi(e, t, r, n) {
  new mi(e, t, r, n);
}
class mi {
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
  #n;
  /** @type {Effect} */
  #i;
  /** @type {Effect | null} */
  #r = null;
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
  #p = _i(() => (this.#u = qe(this.#c), () => {
    this.#u = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(t, r, n, i) {
    this.#t = t, this.#e = r, this.#n = (s) => {
      var o = (
        /** @type {Effect} */
        m
      );
      o.b = this, o.f |= jt, n(s);
    }, this.parent = /** @type {Effect} */
    m.b, this.transform_error = i ?? this.parent?.transform_error ?? ((s) => s), this.#i = lr(() => {
      this.#m();
    }, gi);
  }
  #w() {
    try {
      this.#r = X(() => this.#n(this.#t));
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #x(t) {
    const r = this.#e.failed;
    r && (this.#l = X(() => {
      r(
        this.#t,
        () => t,
        () => () => {
        }
      );
    }));
  }
  #y() {
    const t = this.#e.pending;
    t && (this.is_pending = !0, this.#s = X(() => t(this.#t)), We(() => {
      var r = this.#a = document.createDocumentFragment(), n = Me();
      r.append(n), this.#r = this.#g(() => X(() => this.#n(n))), this.#f === 0 && (this.#t.before(r), this.#a = null, Oe(
        /** @type {Effect} */
        this.#s,
        () => {
          this.#s = null;
        }
      ), this.#_(
        /** @type {Batch} */
        x
      ));
    }));
  }
  #m() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#f = 0, this.#c = 0, this.#r = X(() => {
        this.#n(this.#t);
      }), this.#f > 0) {
        var t = this.#a = document.createDocumentFragment();
        fr(this.#r, t);
        const r = (
          /** @type {(anchor: Node) => void} */
          this.#e.pending
        );
        this.#s = X(() => r(this.#t));
      } else
        this.#_(
          /** @type {Batch} */
          x
        );
    } catch (r) {
      this.error(r);
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
    Ur(t, this.#h, this.#v);
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
    var r = m, n = g, i = U;
    de(this.#i), te(this.#i), Ze(this.#i.ctx);
    try {
      return Ce.ensure(), t();
    } catch (s) {
      return Vr(s), null;
    } finally {
      de(r), te(n), Ze(i);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #b(t, r) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#b(t, r);
      return;
    }
    this.#f += t, this.#f === 0 && (this.#_(r), this.#s && Oe(this.#s, () => {
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
  update_pending_count(t, r) {
    this.#b(t, r), this.#c += t, !(!this.#u || this.#d) && (this.#d = !0, We(() => {
      this.#d = !1, this.#u && et(this.#u, this.#c);
    }));
  }
  get_effect_pending() {
    return this.#p(), u(
      /** @type {Source<number>} */
      this.#u
    );
  }
  /** @param {unknown} error */
  error(t) {
    var r = this.#e.onerror;
    let n = this.#e.failed;
    if (!r && !n)
      throw t;
    this.#r && (j(this.#r), this.#r = null), this.#s && (j(this.#s), this.#s = null), this.#l && (j(this.#l), this.#l = null);
    var i = !1, s = !1;
    const o = () => {
      if (i) {
        fi();
        return;
      }
      i = !0, s && ni(), this.#l !== null && Oe(this.#l, () => {
        this.#l = null;
      }), this.#g(() => {
        this.#m();
      });
    }, l = (a) => {
      try {
        s = !0, r?.(a, o), s = !1;
      } catch (f) {
        Se(f, this.#i && this.#i.parent);
      }
      n && (this.#l = this.#g(() => {
        try {
          return X(() => {
            var f = (
              /** @type {Effect} */
              m
            );
            f.b = this, f.f |= jt, n(
              this.#t,
              () => a,
              () => o
            );
          });
        } catch (f) {
          return Se(
            f,
            /** @type {Effect} */
            this.#i.parent
          ), null;
        }
      }));
    };
    We(() => {
      var a;
      try {
        a = this.transform_error(t);
      } catch (f) {
        Se(f, this.#i && this.#i.parent);
        return;
      }
      a !== null && typeof a == "object" && typeof /** @type {any} */
      a.then == "function" ? a.then(
        l,
        /** @param {unknown} e */
        (f) => Se(f, this.#i && this.#i.parent)
      ) : l(a);
    });
  }
}
function bi(e, t, r, n) {
  const i = tr;
  var s = e.filter((v) => !v.settled);
  if (r.length === 0 && s.length === 0) {
    n(t.map(i));
    return;
  }
  var o = (
    /** @type {Effect} */
    m
  ), l = xi(), a = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((v) => v.promise)) : null;
  function f(v) {
    l();
    try {
      n(v);
    } catch (p) {
      (o.f & ie) === 0 && Se(p, o);
    }
    Ct();
  }
  if (r.length === 0) {
    a.then(() => f(t.map(i)));
    return;
  }
  var c = Wr();
  function h() {
    Promise.all(r.map((v) => /* @__PURE__ */ yi(v))).then((v) => f([...t.map(i), ...v])).catch((v) => Se(v, o)).finally(() => c());
  }
  a ? a.then(() => {
    l(), h(), Ct();
  }) : h();
}
function xi() {
  var e = (
    /** @type {Effect} */
    m
  ), t = g, r = U, n = (
    /** @type {Batch} */
    x
  );
  return function(s = !0) {
    de(e), te(t), Ze(r), s && (e.f & ie) === 0 && (n?.activate(), n?.apply());
  };
}
function Ct(e = !0) {
  de(null), te(null), Ze(null), e && x?.deactivate();
}
function Wr() {
  var e = (
    /** @type {Effect} */
    m
  ), t = (
    /** @type {Boundary} */
    e.b
  ), r = (
    /** @type {Batch} */
    x
  ), n = t.is_rendered();
  return t.update_pending_count(1, r), r.increment(n, e), (i = !1) => {
    t.update_pending_count(-1, r), r.decrement(n, e, i);
  };
}
// @__NO_SIDE_EFFECTS__
function tr(e) {
  var t = O | L, r = g !== null && (g.f & O) !== 0 ? (
    /** @type {Derived} */
    g
  ) : null;
  return m !== null && (m.f |= nt), {
    ctx: U,
    deps: null,
    effects: null,
    equals: Ir,
    f: t,
    fn: e,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      I
    ),
    wv: 0,
    parent: r ?? m,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function yi(e, t, r) {
  let n = (
    /** @type {Effect | null} */
    m
  );
  n === null && Jn();
  var i = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = qe(
    /** @type {V} */
    I
  ), o = !g, l = /* @__PURE__ */ new Map();
  return Bi(() => {
    var a = (
      /** @type {Effect} */
      m
    ), f = Fr();
    i = f.promise;
    try {
      Promise.resolve(e()).then(f.resolve, f.reject).finally(Ct);
    } catch (p) {
      f.reject(p), Ct();
    }
    var c = (
      /** @type {Batch} */
      x
    );
    if (o) {
      if ((a.f & He) !== 0)
        var h = Wr();
      if (
        /** @type {Boundary} */
        n.b.is_rendered()
      )
        l.get(c)?.reject(pe), l.delete(c);
      else {
        for (const p of l.values())
          p.reject(pe);
        l.clear();
      }
      l.set(c, f);
    }
    const v = (p, d = void 0) => {
      if (h) {
        var _ = d === pe;
        h(_);
      }
      if (!(d === pe || (a.f & ie) !== 0)) {
        if (c.activate(), d)
          s.f |= Te, et(s, d);
        else {
          (s.f & Te) !== 0 && (s.f ^= Te), et(s, p);
          for (const [k, b] of l) {
            if (l.delete(k), k === c) break;
            b.reject(pe);
          }
        }
        c.deactivate();
      }
    };
    f.promise.then(v, (p) => v(null, p || "unknown"));
  }), Oi(() => {
    for (const a of l.values())
      a.reject(pe);
  }), new Promise((a) => {
    function f(c) {
      function h() {
        c === i ? a(s) : f(i);
      }
      c.then(h, h);
    }
    f(i);
  });
}
// @__NO_SIDE_EFFECTS__
function De(e) {
  const t = /* @__PURE__ */ tr(e);
  return dn(t), t;
}
// @__NO_SIDE_EFFECTS__
function ki(e) {
  const t = /* @__PURE__ */ tr(e);
  return t.equals = zr, t;
}
function Ei(e) {
  var t = e.effects;
  if (t !== null) {
    e.effects = null;
    for (var r = 0; r < t.length; r += 1)
      j(
        /** @type {Effect} */
        t[r]
      );
  }
}
function Si(e) {
  for (var t = e.parent; t !== null; ) {
    if ((t.f & O) === 0)
      return (t.f & ie) === 0 ? (
        /** @type {Effect} */
        t
      ) : null;
    t = t.parent;
  }
  return null;
}
function rr(e) {
  var t, r = m;
  de(Si(e));
  try {
    e.f &= ~Be, Ei(e), t = _n(e);
  } finally {
    de(r);
  }
  return t;
}
function Kr(e) {
  var t = e.v, r = rr(e);
  if (!e.equals(r) && (e.wv = hn(), (!x?.is_fork || e.deps === null) && (e.v = r, x?.capture(e, t, !0), e.deps === null))) {
    R(e, N);
    return;
  }
  Le || (re !== null ? (ir() || x?.is_fork) && re.set(e, r) : Zt(e));
}
function Ti(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      (t.teardown || t.ac) && (t.teardown?.(), t.ac?.abort(pe), t.teardown = Hn, t.ac = null, _t(t, 0), ar(t));
}
function Qr(e) {
  if (e.effects !== null)
    for (const t of e.effects)
      t.teardown && rt(t);
}
let $t = /* @__PURE__ */ new Set();
const Ae = /* @__PURE__ */ new Map();
let Xr = !1;
function qe(e, t) {
  var r = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: e,
    reactions: null,
    equals: Ir,
    rv: 0,
    wv: 0
  };
  return r;
}
// @__NO_SIDE_EFFECTS__
function B(e, t) {
  const r = qe(e);
  return dn(r), r;
}
// @__NO_SIDE_EFFECTS__
function Ai(e, t = !1, r = !0) {
  const n = qe(e);
  return t || (n.equals = zr), n;
}
function T(e, t, r = !1) {
  g !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!ne || (g.f & pr) !== 0) && Lr() && (g.f & (O | Re | Xt | pr)) !== 0 && (ee === null || !Ke.call(ee, e)) && ri();
  let n = r ? $e(t) : t;
  return et(e, n, Tt);
}
function et(e, t, r = null) {
  if (!e.equals(t)) {
    var n = e.v;
    Le ? Ae.set(e, t) : Ae.set(e, n), e.v = t;
    var i = Ce.ensure();
    if (i.capture(e, n), (e.f & O) !== 0) {
      const s = (
        /** @type {Derived} */
        e
      );
      (e.f & L) !== 0 && rr(s), re === null && Zt(s);
    }
    e.wv = hn(), Zr(e, L, r), m !== null && (m.f & N) !== 0 && (m.f & (se | ze)) === 0 && (Q === null ? Hi([e]) : Q.push(e)), !i.is_fork && $t.size > 0 && !Xr && Ci();
  }
  return t;
}
function Ci() {
  Xr = !1;
  for (const e of $t)
    (e.f & N) !== 0 && R(e, ce), mt(e) && rt(e);
  $t.clear();
}
function pt(e) {
  T(e, e.v + 1);
}
function Zr(e, t, r) {
  var n = e.reactions;
  if (n !== null)
    for (var i = n.length, s = 0; s < i; s++) {
      var o = n[s], l = o.f, a = (l & L) === 0;
      if (a && R(o, t), (l & O) !== 0) {
        var f = (
          /** @type {Derived} */
          o
        );
        re?.delete(f), (l & Be) === 0 && (l & Z && (o.f |= Be), Zr(f, ce, r));
      } else if (a) {
        var c = (
          /** @type {Effect} */
          o
        );
        (l & Re) !== 0 && he !== null && he.add(c), r !== null ? r.push(c) : er(c);
      }
    }
}
function $e(e) {
  if (typeof e != "object" || e === null || St in e)
    return e;
  const t = Dr(e);
  if (t !== qn && t !== Ln)
    return e;
  var r = /* @__PURE__ */ new Map(), n = Nr(e), i = /* @__PURE__ */ B(0), s = Ie, o = (l) => {
    if (Ie === s)
      return l();
    var a = g, f = Ie;
    te(null), yr(s);
    var c = l();
    return te(a), yr(f), c;
  };
  return n && r.set("length", /* @__PURE__ */ B(
    /** @type {any[]} */
    e.length
  )), new Proxy(
    /** @type {any} */
    e,
    {
      defineProperty(l, a, f) {
        (!("value" in f) || f.configurable === !1 || f.enumerable === !1 || f.writable === !1) && ei();
        var c = r.get(a);
        return c === void 0 ? o(() => {
          var h = /* @__PURE__ */ B(f.value);
          return r.set(a, h), h;
        }) : T(c, f.value, !0), !0;
      },
      deleteProperty(l, a) {
        var f = r.get(a);
        if (f === void 0) {
          if (a in l) {
            const c = o(() => /* @__PURE__ */ B(I));
            r.set(a, c), pt(i);
          }
        } else
          T(f, I), pt(i);
        return !0;
      },
      get(l, a, f) {
        if (a === St)
          return e;
        var c = r.get(a), h = a in l;
        if (c === void 0 && (!h || vt(l, a)?.writable) && (c = o(() => {
          var p = $e(h ? l[a] : I), d = /* @__PURE__ */ B(p);
          return d;
        }), r.set(a, c)), c !== void 0) {
          var v = u(c);
          return v === I ? void 0 : v;
        }
        return Reflect.get(l, a, f);
      },
      getOwnPropertyDescriptor(l, a) {
        var f = Reflect.getOwnPropertyDescriptor(l, a);
        if (f && "value" in f) {
          var c = r.get(a);
          c && (f.value = u(c));
        } else if (f === void 0) {
          var h = r.get(a), v = h?.v;
          if (h !== void 0 && v !== I)
            return {
              enumerable: !0,
              configurable: !0,
              value: v,
              writable: !0
            };
        }
        return f;
      },
      has(l, a) {
        if (a === St)
          return !0;
        var f = r.get(a), c = f !== void 0 && f.v !== I || Reflect.has(l, a);
        if (f !== void 0 || m !== null && (!c || vt(l, a)?.writable)) {
          f === void 0 && (f = o(() => {
            var v = c ? $e(l[a]) : I, p = /* @__PURE__ */ B(v);
            return p;
          }), r.set(a, f));
          var h = u(f);
          if (h === I)
            return !1;
        }
        return c;
      },
      set(l, a, f, c) {
        var h = r.get(a), v = a in l;
        if (n && a === "length")
          for (var p = f; p < /** @type {Source<number>} */
          h.v; p += 1) {
            var d = r.get(p + "");
            d !== void 0 ? T(d, I) : p in l && (d = o(() => /* @__PURE__ */ B(I)), r.set(p + "", d));
          }
        if (h === void 0)
          (!v || vt(l, a)?.writable) && (h = o(() => /* @__PURE__ */ B(void 0)), T(h, $e(f)), r.set(a, h));
        else {
          v = h.v !== I;
          var _ = o(() => $e(f));
          T(h, _);
        }
        var k = Reflect.getOwnPropertyDescriptor(l, a);
        if (k?.set && k.set.call(c, f), !v) {
          if (n && typeof a == "string") {
            var b = (
              /** @type {Source<number>} */
              r.get("length")
            ), C = Number(a);
            Number.isInteger(C) && C >= b.v && T(b, C + 1);
          }
          pt(i);
        }
        return !0;
      },
      ownKeys(l) {
        u(i);
        var a = Reflect.ownKeys(l).filter((h) => {
          var v = r.get(h);
          return v === void 0 || v.v !== I;
        });
        for (var [f, c] of r)
          c.v !== I && !(f in l) && a.push(f);
        return a;
      },
      setPrototypeOf() {
        ti();
      }
    }
  );
}
var wr, en, tn, rn;
function Mi() {
  if (wr === void 0) {
    wr = window, en = /Firefox/.test(navigator.userAgent);
    var e = Element.prototype, t = Node.prototype, r = Text.prototype;
    tn = vt(t, "firstChild").get, rn = vt(t, "nextSibling").get, hr(e) && (e.__click = void 0, e.__className = void 0, e.__attributes = null, e.__style = void 0, e.__e = void 0), hr(r) && (r.__t = void 0);
  }
}
function Me(e = "") {
  return document.createTextNode(e);
}
// @__NO_SIDE_EFFECTS__
function tt(e) {
  return (
    /** @type {TemplateNode | null} */
    tn.call(e)
  );
}
// @__NO_SIDE_EFFECTS__
function wt(e) {
  return (
    /** @type {TemplateNode | null} */
    rn.call(e)
  );
}
function S(e, t) {
  return /* @__PURE__ */ tt(e);
}
function mr(e, t = !1) {
  {
    var r = /* @__PURE__ */ tt(e);
    return r instanceof Comment && r.data === "" ? /* @__PURE__ */ wt(r) : r;
  }
}
function A(e, t = 1, r = !1) {
  let n = e;
  for (; t--; )
    n = /** @type {TemplateNode} */
    /* @__PURE__ */ wt(n);
  return n;
}
function Ri(e) {
  e.textContent = "";
}
function nn() {
  return !1;
}
function sn(e, t, r) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(Or, e, void 0)
  );
}
let br = !1;
function Ni() {
  br || (br = !0, document.addEventListener(
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
function nr(e) {
  var t = g, r = m;
  te(null), de(null);
  try {
    return e();
  } finally {
    te(t), de(r);
  }
}
function Di(e, t, r, n = r) {
  e.addEventListener(t, () => nr(r));
  const i = e.__on_r;
  i ? e.__on_r = () => {
    i(), n(!0);
  } : e.__on_r = () => n(!0), Ni();
}
function Fi(e) {
  m === null && (g === null && Xn(), Qn()), Le && Kn();
}
function Pi(e, t) {
  var r = t.last;
  r === null ? t.last = t.first = e : (r.next = e, e.prev = r, t.last = e);
}
function ge(e, t) {
  var r = m;
  r !== null && (r.f & J) !== 0 && (e |= J);
  var n = {
    ctx: U,
    deps: null,
    nodes: null,
    f: e | L | Z,
    first: null,
    fn: t,
    last: null,
    next: null,
    parent: r,
    b: r && r.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  }, i = n;
  if ((e & Qe) !== 0)
    Ye !== null ? Ye.push(n) : Ce.ensure().schedule(n);
  else if (t !== null) {
    try {
      rt(n);
    } catch (o) {
      throw j(n), o;
    }
    i.deps === null && i.teardown === null && i.nodes === null && i.first === i.last && // either `null`, or a singular child
    (i.f & nt) === 0 && (i = i.first, (e & Re) !== 0 && (e & Xe) !== 0 && i !== null && (i.f |= Xe));
  }
  if (i !== null && (i.parent = r, r !== null && Pi(i, r), g !== null && (g.f & O) !== 0 && (e & ze) === 0)) {
    var s = (
      /** @type {Derived} */
      g
    );
    (s.effects ??= []).push(i);
  }
  return n;
}
function ir() {
  return g !== null && !ne;
}
function Oi(e) {
  const t = ge(Nt, null);
  return R(t, N), t.teardown = e, t;
}
function Ii(e) {
  Fi();
  var t = (
    /** @type {Effect} */
    m.f
  ), r = !g && (t & se) !== 0 && (t & He) === 0;
  if (r) {
    var n = (
      /** @type {ComponentContext} */
      U
    );
    (n.e ??= []).push(e);
  } else
    return ln(e);
}
function ln(e) {
  return ge(Qe | Gn, e);
}
function zi(e) {
  Ce.ensure();
  const t = ge(ze | nt, e);
  return (r = {}) => new Promise((n) => {
    r.outro ? Oe(t, () => {
      j(t), n(void 0);
    }) : (j(t), n(void 0));
  });
}
function an(e) {
  return ge(Qe, e);
}
function Bi(e) {
  return ge(Xt | nt, e);
}
function sr(e, t = 0) {
  return ge(Nt | t, e);
}
function fe(e, t = [], r = [], n = []) {
  bi(n, t, r, (i) => {
    ge(Nt, () => e(...i.map(u)));
  });
}
function lr(e, t = 0) {
  var r = ge(Re | t, e);
  return r;
}
function X(e) {
  return ge(se | nt, e);
}
function on(e) {
  var t = e.teardown;
  if (t !== null) {
    const r = Le, n = g;
    xr(!0), te(null);
    try {
      t.call(null);
    } finally {
      xr(r), te(n);
    }
  }
}
function ar(e, t = !1) {
  var r = e.first;
  for (e.first = e.last = null; r !== null; ) {
    const i = r.ac;
    i !== null && nr(() => {
      i.abort(pe);
    });
    var n = r.next;
    (r.f & ze) !== 0 ? r.parent = null : j(r, t), r = n;
  }
}
function qi(e) {
  for (var t = e.first; t !== null; ) {
    var r = t.next;
    (t.f & se) === 0 && j(t), t = r;
  }
}
function j(e, t = !0) {
  var r = !1;
  (t || (e.f & Un) !== 0) && e.nodes !== null && e.nodes.end !== null && (Li(
    e.nodes.start,
    /** @type {TemplateNode} */
    e.nodes.end
  ), r = !0), R(e, Ut), ar(e, t && !r), _t(e, 0);
  var n = e.nodes && e.nodes.t;
  if (n !== null)
    for (const s of n)
      s.stop();
  on(e), e.f ^= Ut, e.f |= ie;
  var i = e.parent;
  i !== null && i.first !== null && fn(e), e.next = e.prev = e.teardown = e.ctx = e.deps = e.fn = e.nodes = e.ac = e.b = null;
}
function Li(e, t) {
  for (; e !== null; ) {
    var r = e === t ? null : /* @__PURE__ */ wt(e);
    e.remove(), e = r;
  }
}
function fn(e) {
  var t = e.parent, r = e.prev, n = e.next;
  r !== null && (r.next = n), n !== null && (n.prev = r), t !== null && (t.first === e && (t.first = n), t.last === e && (t.last = r));
}
function Oe(e, t, r = !0) {
  var n = [];
  un(e, n, !0);
  var i = () => {
    r && j(e), t && t();
  }, s = n.length;
  if (s > 0) {
    var o = () => --s || i();
    for (var l of n)
      l.out(o);
  } else
    i();
}
function un(e, t, r) {
  if ((e.f & J) === 0) {
    e.f ^= J;
    var n = e.nodes && e.nodes.t;
    if (n !== null)
      for (const l of n)
        (l.is_global || r) && t.push(l);
    for (var i = e.first; i !== null; ) {
      var s = i.next, o = (i.f & Xe) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (i.f & se) !== 0 && (e.f & Re) !== 0;
      un(i, t, o ? r : !1), i = s;
    }
  }
}
function or(e) {
  cn(e, !0);
}
function cn(e, t) {
  if ((e.f & J) !== 0) {
    e.f ^= J, (e.f & N) === 0 && (R(e, L), Ce.ensure().schedule(e));
    for (var r = e.first; r !== null; ) {
      var n = r.next, i = (r.f & Xe) !== 0 || (r.f & se) !== 0;
      cn(r, i ? t : !1), r = n;
    }
    var s = e.nodes && e.nodes.t;
    if (s !== null)
      for (const o of s)
        (o.is_global || t) && o.in();
  }
}
function fr(e, t) {
  if (e.nodes)
    for (var r = e.nodes.start, n = e.nodes.end; r !== null; ) {
      var i = r === n ? null : /* @__PURE__ */ wt(r);
      t.append(r), r = i;
    }
}
let At = !1, Le = !1;
function xr(e) {
  Le = e;
}
let g = null, ne = !1;
function te(e) {
  g = e;
}
let m = null;
function de(e) {
  m = e;
}
let ee = null;
function dn(e) {
  g !== null && (ee === null ? ee = [e] : ee.push(e));
}
let V = null, $ = 0, Q = null;
function Hi(e) {
  Q = e;
}
let vn = 1, Pe = 0, Ie = Pe;
function yr(e) {
  Ie = e;
}
function hn() {
  return ++vn;
}
function mt(e) {
  var t = e.f;
  if ((t & L) !== 0)
    return !0;
  if (t & O && (e.f &= ~Be), (t & ce) !== 0) {
    for (var r = (
      /** @type {Value[]} */
      e.deps
    ), n = r.length, i = 0; i < n; i++) {
      var s = r[i];
      if (mt(
        /** @type {Derived} */
        s
      ) && Kr(
        /** @type {Derived} */
        s
      ), s.wv > e.wv)
        return !0;
    }
    (t & Z) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    re === null && R(e, N);
  }
  return !1;
}
function pn(e, t, r = !0) {
  var n = e.reactions;
  if (n !== null && !(ee !== null && Ke.call(ee, e)))
    for (var i = 0; i < n.length; i++) {
      var s = n[i];
      (s.f & O) !== 0 ? pn(
        /** @type {Derived} */
        s,
        t,
        !1
      ) : t === s && (r ? R(s, L) : (s.f & N) !== 0 && R(s, ce), er(
        /** @type {Effect} */
        s
      ));
    }
}
function _n(e) {
  var t = V, r = $, n = Q, i = g, s = ee, o = U, l = ne, a = Ie, f = e.f;
  V = /** @type {null | Value[]} */
  null, $ = 0, Q = null, g = (f & (se | ze)) === 0 ? e : null, ee = null, Ze(e.ctx), ne = !1, Ie = ++Pe, e.ac !== null && (nr(() => {
    e.ac.abort(pe);
  }), e.ac = null);
  try {
    e.f |= Gt;
    var c = (
      /** @type {Function} */
      e.fn
    ), h = c();
    e.f |= He;
    var v = e.deps, p = x?.is_fork;
    if (V !== null) {
      var d;
      if (p || _t(e, $), v !== null && $ > 0)
        for (v.length = $ + V.length, d = 0; d < V.length; d++)
          v[$ + d] = V[d];
      else
        e.deps = v = V;
      if (ir() && (e.f & Z) !== 0)
        for (d = $; d < v.length; d++)
          (v[d].reactions ??= []).push(e);
    } else !p && v !== null && $ < v.length && (_t(e, $), v.length = $);
    if (Lr() && Q !== null && !ne && v !== null && (e.f & (O | ce | L)) === 0)
      for (d = 0; d < /** @type {Source[]} */
      Q.length; d++)
        pn(
          Q[d],
          /** @type {Effect} */
          e
        );
    if (i !== null && i !== e) {
      if (Pe++, i.deps !== null)
        for (let _ = 0; _ < r; _ += 1)
          i.deps[_].rv = Pe;
      if (t !== null)
        for (const _ of t)
          _.rv = Pe;
      Q !== null && (n === null ? n = Q : n.push(.../** @type {Source[]} */
      Q));
    }
    return (e.f & Te) !== 0 && (e.f ^= Te), h;
  } catch (_) {
    return Vr(_);
  } finally {
    e.f ^= Gt, V = t, $ = r, Q = n, g = i, ee = s, Ze(o), ne = l, Ie = a;
  }
}
function Vi(e, t) {
  let r = t.reactions;
  if (r !== null) {
    var n = In.call(r, e);
    if (n !== -1) {
      var i = r.length - 1;
      i === 0 ? r = t.reactions = null : (r[n] = r[i], r.pop());
    }
  }
  if (r === null && (t.f & O) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (V === null || !Ke.call(V, t))) {
    var s = (
      /** @type {Derived} */
      t
    );
    (s.f & Z) !== 0 && (s.f ^= Z, s.f &= ~Be), Zt(s), Ti(s), _t(s, 0);
  }
}
function _t(e, t) {
  var r = e.deps;
  if (r !== null)
    for (var n = t; n < r.length; n++)
      Vi(e, r[n]);
}
function rt(e) {
  var t = e.f;
  if ((t & ie) === 0) {
    R(e, N);
    var r = m, n = At;
    m = e, At = !0;
    try {
      (t & (Re | Pr)) !== 0 ? qi(e) : ar(e), on(e);
      var i = _n(e);
      e.teardown = typeof i == "function" ? i : null, e.wv = vn;
      var s;
    } finally {
      At = n, m = r;
    }
  }
}
async function Jt() {
  await Promise.resolve(), hi();
}
function u(e) {
  var t = e.f, r = (t & O) !== 0;
  if (g !== null && !ne) {
    var n = m !== null && (m.f & ie) !== 0;
    if (!n && (ee === null || !Ke.call(ee, e))) {
      var i = g.deps;
      if ((g.f & Gt) !== 0)
        e.rv < Pe && (e.rv = Pe, V === null && i !== null && i[$] === e ? $++ : V === null ? V = [e] : V.push(e));
      else {
        (g.deps ??= []).push(e);
        var s = e.reactions;
        s === null ? e.reactions = [g] : Ke.call(s, g) || s.push(g);
      }
    }
  }
  if (Le && Ae.has(e))
    return Ae.get(e);
  if (r) {
    var o = (
      /** @type {Derived} */
      e
    );
    if (Le) {
      var l = o.v;
      return ((o.f & N) === 0 && o.reactions !== null || wn(o)) && (l = rr(o)), Ae.set(o, l), l;
    }
    var a = (o.f & Z) === 0 && !ne && g !== null && (At || (g.f & Z) !== 0), f = (o.f & He) === 0;
    mt(o) && (a && (o.f |= Z), Kr(o)), a && !f && (Qr(o), gn(o));
  }
  if (re?.has(e))
    return re.get(e);
  if ((e.f & Te) !== 0)
    throw e.v;
  return e.v;
}
function gn(e) {
  if (e.f |= Z, e.deps !== null)
    for (const t of e.deps)
      (t.reactions ??= []).push(e), (t.f & O) !== 0 && (t.f & Z) === 0 && (Qr(
        /** @type {Derived} */
        t
      ), gn(
        /** @type {Derived} */
        t
      ));
}
function wn(e) {
  if (e.v === I) return !0;
  if (e.deps === null) return !1;
  for (const t of e.deps)
    if (Ae.has(t) || (t.f & O) !== 0 && wn(
      /** @type {Derived} */
      t
    ))
      return !0;
  return !1;
}
function Dt(e) {
  var t = ne;
  try {
    return ne = !0, e();
  } finally {
    ne = t;
  }
}
const ji = ["touchstart", "touchmove"];
function Ui(e) {
  return ji.includes(e);
}
const ct = /* @__PURE__ */ Symbol("events"), mn = /* @__PURE__ */ new Set(), Wt = /* @__PURE__ */ new Set();
function Ge(e, t, r) {
  (t[ct] ??= {})[e] = r;
}
function Gi(e) {
  for (var t = 0; t < e.length; t++)
    mn.add(e[t]);
  for (var r of Wt)
    r(e);
}
let kr = null;
function Er(e) {
  var t = this, r = (
    /** @type {Node} */
    t.ownerDocument
  ), n = e.type, i = e.composedPath?.() || [], s = (
    /** @type {null | Element} */
    i[0] || e.target
  );
  kr = e;
  var o = 0, l = kr === e && e[ct];
  if (l) {
    var a = i.indexOf(l);
    if (a !== -1 && (t === document || t === /** @type {any} */
    window)) {
      e[ct] = t;
      return;
    }
    var f = i.indexOf(t);
    if (f === -1)
      return;
    a <= f && (o = a);
  }
  if (s = /** @type {Element} */
  i[o] || e.target, s !== t) {
    zn(e, "currentTarget", {
      configurable: !0,
      get() {
        return s || r;
      }
    });
    var c = g, h = m;
    te(null), de(null);
    try {
      for (var v, p = []; s !== null; ) {
        var d = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var _ = s[ct]?.[n];
          _ != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          e.target === s) && _.call(s, e);
        } catch (k) {
          v ? p.push(k) : v = k;
        }
        if (e.cancelBubble || d === t || d === null)
          break;
        s = d;
      }
      if (v) {
        for (let k of p)
          queueMicrotask(() => {
            throw k;
          });
        throw v;
      }
    } finally {
      e[ct] = t, delete e.currentTarget, te(c), de(h);
    }
  }
}
const Yi = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (e) => e
  })
);
function $i(e) {
  return (
    /** @type {string} */
    Yi?.createHTML(e) ?? e
  );
}
function bn(e) {
  var t = sn("template");
  return t.innerHTML = $i(e.replaceAll("<!>", "<!---->")), t.content;
}
function gt(e, t) {
  var r = (
    /** @type {Effect} */
    m
  );
  r.nodes === null && (r.nodes = { start: e, end: t, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function it(e, t) {
  var r = (t & ai) !== 0, n = (t & oi) !== 0, i, s = !e.startsWith("<!>");
  return () => {
    i === void 0 && (i = bn(s ? e : "<!>" + e), r || (i = /** @type {TemplateNode} */
    /* @__PURE__ */ tt(i)));
    var o = (
      /** @type {TemplateNode} */
      n || en ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    if (r) {
      var l = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ tt(o)
      ), a = (
        /** @type {TemplateNode} */
        o.lastChild
      );
      gt(l, a);
    } else
      gt(o, o);
    return o;
  };
}
// @__NO_SIDE_EFFECTS__
function Ji(e, t, r = "svg") {
  var n = !e.startsWith("<!>"), i = `<${r}>${n ? e : "<!>" + e}</${r}>`, s;
  return () => {
    if (!s) {
      var o = (
        /** @type {DocumentFragment} */
        bn(i)
      ), l = (
        /** @type {Element} */
        /* @__PURE__ */ tt(o)
      );
      s = /** @type {Element} */
      /* @__PURE__ */ tt(l);
    }
    var a = (
      /** @type {TemplateNode} */
      s.cloneNode(!0)
    );
    return gt(a, a), a;
  };
}
// @__NO_SIDE_EFFECTS__
function st(e, t) {
  return /* @__PURE__ */ Ji(e, t, "svg");
}
function Wi(e = "") {
  {
    var t = Me(e + "");
    return gt(t, t), t;
  }
}
function Ki() {
  var e = document.createDocumentFragment(), t = document.createComment(""), r = Me();
  return e.append(t, r), gt(t, r), e;
}
function H(e, t) {
  e !== null && e.before(
    /** @type {Node} */
    t
  );
}
function ue(e, t) {
  var r = t == null ? "" : typeof t == "object" ? `${t}` : t;
  r !== (e.__t ??= e.nodeValue) && (e.__t = r, e.nodeValue = `${r}`);
}
function Qi(e, t) {
  return Xi(e, t);
}
const kt = /* @__PURE__ */ new Map();
function Xi(e, { target: t, anchor: r, props: n = {}, events: i, context: s, intro: o = !0, transformError: l }) {
  Mi();
  var a = void 0, f = zi(() => {
    var c = r ?? t.appendChild(Me());
    wi(
      /** @type {TemplateNode} */
      c,
      {
        pending: () => {
        }
      },
      (p) => {
        Br({});
        var d = (
          /** @type {ComponentContext} */
          U
        );
        s && (d.c = s), i && (n.$$events = i), a = e(p, n) || {}, qr();
      },
      l
    );
    var h = /* @__PURE__ */ new Set(), v = (p) => {
      for (var d = 0; d < p.length; d++) {
        var _ = p[d];
        if (!h.has(_)) {
          h.add(_);
          var k = Ui(_);
          for (const q of [t, document]) {
            var b = kt.get(q);
            b === void 0 && (b = /* @__PURE__ */ new Map(), kt.set(q, b));
            var C = b.get(_);
            C === void 0 ? (q.addEventListener(_, Er, { passive: k }), b.set(_, 1)) : b.set(_, C + 1);
          }
        }
      }
    };
    return v(Rt(mn)), Wt.add(v), () => {
      for (var p of h)
        for (const k of [t, document]) {
          var d = (
            /** @type {Map<string, number>} */
            kt.get(k)
          ), _ = (
            /** @type {number} */
            d.get(p)
          );
          --_ == 0 ? (k.removeEventListener(p, Er), d.delete(p), d.size === 0 && kt.delete(k)) : d.set(p, _);
        }
      Wt.delete(v), c !== r && c.parentNode?.removeChild(c);
    };
  });
  return Kt.set(a, f), a;
}
let Kt = /* @__PURE__ */ new WeakMap();
function Zi(e, t) {
  const r = Kt.get(e);
  return r ? (Kt.delete(e), r(t)) : Promise.resolve();
}
class es {
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
  #n = /* @__PURE__ */ new Set();
  /**
   * Whether to pause (i.e. outro) on change, or destroy immediately.
   * This is necessary for `<svelte:element>`
   */
  #i = !0;
  /**
   * @param {TemplateNode} anchor
   * @param {boolean} transition
   */
  constructor(t, r = !0) {
    this.anchor = t, this.#i = r;
  }
  /**
   * @param {Batch} batch
   */
  #r = (t) => {
    if (this.#t.has(t)) {
      var r = (
        /** @type {Key} */
        this.#t.get(t)
      ), n = this.#o.get(r);
      if (n)
        or(n), this.#n.delete(r);
      else {
        var i = this.#e.get(r);
        i && (this.#o.set(r, i.effect), this.#e.delete(r), i.fragment.lastChild.remove(), this.anchor.before(i.fragment), n = i.effect);
      }
      for (const [s, o] of this.#t) {
        if (this.#t.delete(s), s === t)
          break;
        const l = this.#e.get(o);
        l && (j(l.effect), this.#e.delete(o));
      }
      for (const [s, o] of this.#o) {
        if (s === r || this.#n.has(s)) continue;
        const l = () => {
          if (Array.from(this.#t.values()).includes(s)) {
            var f = document.createDocumentFragment();
            fr(o, f), f.append(Me()), this.#e.set(s, { effect: o, fragment: f });
          } else
            j(o);
          this.#n.delete(s), this.#o.delete(s);
        };
        this.#i || !n ? (this.#n.add(s), Oe(o, l, !1)) : l();
      }
    }
  };
  /**
   * @param {Batch} batch
   */
  #s = (t) => {
    this.#t.delete(t);
    const r = Array.from(this.#t.values());
    for (const [n, i] of this.#e)
      r.includes(n) || (j(i.effect), this.#e.delete(n));
  };
  /**
   *
   * @param {any} key
   * @param {null | ((target: TemplateNode) => void)} fn
   */
  ensure(t, r) {
    var n = (
      /** @type {Batch} */
      x
    ), i = nn();
    if (r && !this.#o.has(t) && !this.#e.has(t))
      if (i) {
        var s = document.createDocumentFragment(), o = Me();
        s.append(o), this.#e.set(t, {
          effect: X(() => r(o)),
          fragment: s
        });
      } else
        this.#o.set(
          t,
          X(() => r(this.anchor))
        );
    if (this.#t.set(n, t), i) {
      for (const [l, a] of this.#o)
        l === t ? n.unskip_effect(a) : n.skip_effect(a);
      for (const [l, a] of this.#e)
        l === t ? n.unskip_effect(a.effect) : n.skip_effect(a.effect);
      n.oncommit(this.#r), n.ondiscard(this.#s);
    } else
      this.#r(n);
  }
}
function ke(e, t, r = !1) {
  var n = new es(e), i = r ? Xe : 0;
  function s(o, l) {
    n.ensure(o, l);
  }
  lr(() => {
    var o = !1;
    t((l, a = 0) => {
      o = !0, s(a, l);
    }), o || s(-1, null);
  }, i);
}
function Bt(e, t) {
  return t;
}
function ts(e, t, r) {
  for (var n = [], i = t.length, s, o = t.length, l = 0; l < i; l++) {
    let h = t[l];
    Oe(
      h,
      () => {
        if (s) {
          if (s.pending.delete(h), s.done.add(h), s.pending.size === 0) {
            var v = (
              /** @type {Set<EachOutroGroup>} */
              e.outrogroups
            );
            Qt(e, Rt(s.done)), v.delete(s), v.size === 0 && (e.outrogroups = null);
          }
        } else
          o -= 1;
      },
      !1
    );
  }
  if (o === 0) {
    var a = n.length === 0 && r !== null;
    if (a) {
      var f = (
        /** @type {Element} */
        r
      ), c = (
        /** @type {Element} */
        f.parentNode
      );
      Ri(c), c.append(f), e.items.clear();
    }
    Qt(e, t, !a);
  } else
    s = {
      pending: new Set(t),
      done: /* @__PURE__ */ new Set()
    }, (e.outrogroups ??= /* @__PURE__ */ new Set()).add(s);
}
function Qt(e, t, r = !0) {
  var n;
  if (e.pending.size > 0) {
    n = /* @__PURE__ */ new Set();
    for (const o of e.pending.values())
      for (const l of o)
        n.add(
          /** @type {EachItem} */
          e.items.get(l).e
        );
  }
  for (var i = 0; i < t.length; i++) {
    var s = t[i];
    if (n?.has(s)) {
      s.f |= _e;
      const o = document.createDocumentFragment();
      fr(s, o);
    } else
      j(t[i], r);
  }
}
var Sr;
function qt(e, t, r, n, i, s = null) {
  var o = e, l = /* @__PURE__ */ new Map(), a = null, f = /* @__PURE__ */ ki(() => {
    var b = r();
    return Nr(b) ? b : b == null ? [] : Rt(b);
  }), c, h = /* @__PURE__ */ new Map(), v = !0;
  function p(b) {
    (k.effect.f & ie) === 0 && (k.pending.delete(b), k.fallback = a, rs(k, c, o, t, n), a !== null && (c.length === 0 ? (a.f & _e) === 0 ? or(a) : (a.f ^= _e, dt(a, null, o)) : Oe(a, () => {
      a = null;
    })));
  }
  function d(b) {
    k.pending.delete(b);
  }
  var _ = lr(() => {
    c = /** @type {V[]} */
    u(f);
    for (var b = c.length, C = /* @__PURE__ */ new Set(), q = (
      /** @type {Batch} */
      x
    ), we = nn(), G = 0; G < b; G += 1) {
      var me = c[G], be = n(me, G), D = v ? null : l.get(be);
      D ? (D.v && et(D.v, me), D.i && et(D.i, G), we && q.unskip_effect(D.e)) : (D = ns(
        l,
        v ? o : Sr ??= Me(),
        me,
        be,
        G,
        i,
        t,
        r
      ), v || (D.e.f |= _e), l.set(be, D)), C.add(be);
    }
    if (b === 0 && s && !a && (v ? a = X(() => s(o)) : (a = X(() => s(Sr ??= Me())), a.f |= _e)), b > C.size && Wn(), !v)
      if (h.set(q, C), we) {
        for (const [w, F] of l)
          C.has(w) || q.skip_effect(F.e);
        q.oncommit(p), q.ondiscard(d);
      } else
        p(q);
    u(f);
  }), k = { effect: _, items: l, pending: h, outrogroups: null, fallback: a };
  v = !1;
}
function ut(e) {
  for (; e !== null && (e.f & se) === 0; )
    e = e.next;
  return e;
}
function rs(e, t, r, n, i) {
  var s = t.length, o = e.items, l = ut(e.effect.first), a, f = null, c = [], h = [], v, p, d, _;
  for (_ = 0; _ < s; _ += 1) {
    if (v = t[_], p = i(v, _), d = /** @type {EachItem} */
    o.get(p).e, e.outrogroups !== null)
      for (const D of e.outrogroups)
        D.pending.delete(d), D.done.delete(d);
    if ((d.f & J) !== 0 && or(d), (d.f & _e) !== 0)
      if (d.f ^= _e, d === l)
        dt(d, null, r);
      else {
        var k = f ? f.next : l;
        d === e.effect.last && (e.effect.last = d.prev), d.prev && (d.prev.next = d.next), d.next && (d.next.prev = d.prev), Ee(e, f, d), Ee(e, d, k), dt(d, k, r), f = d, c = [], h = [], l = ut(f.next);
        continue;
      }
    if (d !== l) {
      if (a !== void 0 && a.has(d)) {
        if (c.length < h.length) {
          var b = h[0], C;
          f = b.prev;
          var q = c[0], we = c[c.length - 1];
          for (C = 0; C < c.length; C += 1)
            dt(c[C], b, r);
          for (C = 0; C < h.length; C += 1)
            a.delete(h[C]);
          Ee(e, q.prev, we.next), Ee(e, f, q), Ee(e, we, b), l = b, f = we, _ -= 1, c = [], h = [];
        } else
          a.delete(d), dt(d, l, r), Ee(e, d.prev, d.next), Ee(e, d, f === null ? e.effect.first : f.next), Ee(e, f, d), f = d;
        continue;
      }
      for (c = [], h = []; l !== null && l !== d; )
        (a ??= /* @__PURE__ */ new Set()).add(l), h.push(l), l = ut(l.next);
      if (l === null)
        continue;
    }
    (d.f & _e) === 0 && c.push(d), f = d, l = ut(d.next);
  }
  if (e.outrogroups !== null) {
    for (const D of e.outrogroups)
      D.pending.size === 0 && (Qt(e, Rt(D.done)), e.outrogroups?.delete(D));
    e.outrogroups.size === 0 && (e.outrogroups = null);
  }
  if (l !== null || a !== void 0) {
    var G = [];
    if (a !== void 0)
      for (d of a)
        (d.f & J) === 0 && G.push(d);
    for (; l !== null; )
      (l.f & J) === 0 && l !== e.fallback && G.push(l), l = ut(l.next);
    var me = G.length;
    if (me > 0) {
      var be = null;
      ts(e, G, be);
    }
  }
}
function ns(e, t, r, n, i, s, o, l) {
  var a = (o & ii) !== 0 ? (o & li) === 0 ? /* @__PURE__ */ Ai(r, !1, !1) : qe(r) : null, f = (o & si) !== 0 ? qe(i) : null;
  return {
    v: a,
    i: f,
    e: X(() => (s(t, a ?? r, f ?? i, l), () => {
      e.delete(n);
    }))
  };
}
function dt(e, t, r) {
  if (e.nodes)
    for (var n = e.nodes.start, i = e.nodes.end, s = t && (t.f & _e) === 0 ? (
      /** @type {EffectNodes} */
      t.nodes.start
    ) : r; n !== null; ) {
      var o = (
        /** @type {TemplateNode} */
        /* @__PURE__ */ wt(n)
      );
      if (s.before(n), n === i)
        return;
      n = o;
    }
}
function Ee(e, t, r) {
  t === null ? e.effect.first = r : t.next = r, r === null ? e.effect.last = t : r.prev = t;
}
function is(e, t) {
  an(() => {
    var r = e.getRootNode(), n = (
      /** @type {ShadowRoot} */
      r.host ? (
        /** @type {ShadowRoot} */
        r
      ) : (
        /** @type {Document} */
        r.head ?? /** @type {Document} */
        r.ownerDocument.head
      )
    );
    if (!n.querySelector("#" + t.hash)) {
      const i = sn("style");
      i.id = t.hash, i.textContent = t.code, n.appendChild(i);
    }
  });
}
const Tr = [...` 	
\r\f \v\uFEFF`];
function ss(e, t, r) {
  var n = e == null ? "" : "" + e;
  if (r) {
    for (var i of Object.keys(r))
      if (r[i])
        n = n ? n + " " + i : i;
      else if (n.length)
        for (var s = i.length, o = 0; (o = n.indexOf(i, o)) >= 0; ) {
          var l = o + s;
          (o === 0 || Tr.includes(n[o - 1])) && (l === n.length || Tr.includes(n[l])) ? n = (o === 0 ? "" : n.substring(0, o)) + n.substring(l + 1) : o = l;
        }
  }
  return n === "" ? null : n;
}
function Ar(e, t = !1) {
  var r = t ? " !important;" : ";", n = "";
  for (var i of Object.keys(e)) {
    var s = e[i];
    s != null && s !== "" && (n += " " + i + ": " + s + r);
  }
  return n;
}
function ls(e, t) {
  if (t) {
    var r = "", n, i;
    return Array.isArray(t) ? (n = t[0], i = t[1]) : n = t, n && (r += Ar(n)), i && (r += Ar(i, !0)), r = r.trim(), r === "" ? null : r;
  }
  return String(e);
}
function Et(e, t, r, n, i, s) {
  var o = e.__className;
  if (o !== r || o === void 0) {
    var l = ss(r, n, s);
    l == null ? e.removeAttribute("class") : t ? e.className = l : e.setAttribute("class", l), e.__className = r;
  } else if (s && i !== s)
    for (var a in s) {
      var f = !!s[a];
      (i == null || f !== !!i[a]) && e.classList.toggle(a, f);
    }
  return s;
}
function Lt(e, t = {}, r, n) {
  for (var i in r) {
    var s = r[i];
    t[i] !== s && (r[i] == null ? e.style.removeProperty(i) : e.style.setProperty(i, s, n));
  }
}
function as(e, t, r, n) {
  var i = e.__style;
  if (i !== t) {
    var s = ls(t, n);
    s == null ? e.removeAttribute("style") : e.style.cssText = s, e.__style = t;
  } else n && (Array.isArray(n) ? (Lt(e, r?.[0], n[0]), Lt(e, r?.[1], n[1], "important")) : Lt(e, r, n));
  return n;
}
const os = /* @__PURE__ */ Symbol("is custom element"), fs = /* @__PURE__ */ Symbol("is html");
function M(e, t, r, n) {
  var i = us(e);
  i[t] !== (i[t] = r) && (t === "loading" && (e[Yn] = r), r == null ? e.removeAttribute(t) : typeof r != "string" && cs(e).includes(t) ? e[t] = r : e.setAttribute(t, r));
}
function us(e) {
  return (
    /** @type {Record<string | symbol, unknown>} **/
    // @ts-expect-error
    e.__attributes ??= {
      [os]: e.nodeName.includes("-"),
      [fs]: e.namespaceURI === Or
    }
  );
}
var Cr = /* @__PURE__ */ new Map();
function cs(e) {
  var t = e.getAttribute("is") || e.nodeName, r = Cr.get(t);
  if (r) return r;
  Cr.set(t, r = []);
  for (var n, i = e, s = Element.prototype; s !== i; ) {
    n = Bn(i);
    for (var o in n)
      n[o].set && r.push(o);
    i = Dr(i);
  }
  return r;
}
function ds(e, t, r = t) {
  var n = /* @__PURE__ */ new WeakSet();
  Di(e, "input", async (i) => {
    var s = i ? e.defaultValue : e.value;
    if (s = Ht(e) ? Vt(s) : s, r(s), x !== null && n.add(x), await Jt(), s !== (s = t())) {
      var o = e.selectionStart, l = e.selectionEnd, a = e.value.length;
      if (e.value = s ?? "", l !== null) {
        var f = e.value.length;
        o === l && l === a && f > a ? (e.selectionStart = f, e.selectionEnd = f) : (e.selectionStart = o, e.selectionEnd = Math.min(l, f));
      }
    }
  }), // If we are hydrating and the value has since changed,
  // then use the updated value from the input instead.
  // If defaultValue is set, then value == defaultValue
  // TODO Svelte 6: remove input.value check and set to empty string?
  Dt(t) == null && e.value && (r(Ht(e) ? Vt(e.value) : e.value), x !== null && n.add(x)), sr(() => {
    var i = t();
    if (e === document.activeElement) {
      var s = (
        /** @type {Batch} */
        x
      );
      if (n.has(s))
        return;
    }
    Ht(e) && i === Vt(e.value) || e.type === "date" && !i && !e.value || i !== e.value && (e.value = i ?? "");
  });
}
function Ht(e) {
  var t = e.type;
  return t === "number" || t === "range";
}
function Vt(e) {
  return e === "" ? null : +e;
}
function Mr(e, t) {
  return e === t || e?.[St] === t;
}
function vs(e = {}, t, r, n) {
  var i = (
    /** @type {ComponentContext} */
    U.r
  ), s = (
    /** @type {Effect} */
    m
  );
  return an(() => {
    var o, l;
    return sr(() => {
      o = l, l = [], Dt(() => {
        e !== r(...l) && (t(e, ...l), o && Mr(r(...o), e) && t(null, ...o));
      });
    }), () => {
      let a = s;
      for (; a !== i && a.parent !== null && a.parent.f & Ut; )
        a = a.parent;
      const f = () => {
        l && Mr(r(...l), e) && t(null, ...l);
      }, c = a.teardown;
      a.teardown = () => {
        f(), c?.();
      };
    };
  }), e;
}
function hs(e) {
  U === null && $n(), Ii(() => {
    const t = Dt(e);
    if (typeof t == "function") return (
      /** @type {() => void} */
      t
    );
  });
}
const ps = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(ps);
const _s = "0 0 200 520", Je = [
  { id: "hello", label: "Hello World", chapter: "1", x: 100, y: 30, prereqs: [] },
  { id: "variables", label: "Variables", chapter: "3.1", x: 55, y: 100, prereqs: ["hello"] },
  { id: "types", label: "Data Types", chapter: "3.2", x: 145, y: 100, prereqs: ["hello"] },
  { id: "functions", label: "Functions", chapter: "3.3", x: 55, y: 170, prereqs: ["variables"] },
  { id: "control_flow", label: "Control Flow", chapter: "3.5", x: 145, y: 170, prereqs: ["types"] },
  { id: "ownership", label: "Ownership", chapter: "4.1", x: 100, y: 245, prereqs: ["functions", "control_flow"], milestone: !0 },
  { id: "references", label: "References", chapter: "4.2", x: 55, y: 315, prereqs: ["ownership"] },
  { id: "slices", label: "Slices", chapter: "4.3", x: 145, y: 315, prereqs: ["ownership"] },
  { id: "structs", label: "Structs", chapter: "5", x: 55, y: 385, prereqs: ["references"] },
  { id: "enums", label: "Enums & Match", chapter: "6", x: 145, y: 385, prereqs: ["slices"] },
  { id: "error_handling", label: "Error Handling", chapter: "9", x: 55, y: 455, prereqs: ["structs"] },
  { id: "collections", label: "Collections", chapter: "8", x: 145, y: 455, prereqs: ["enums"] }
], gs = [
  ["hello", "variables"],
  ["hello", "types"],
  ["variables", "functions"],
  ["types", "control_flow"],
  ["functions", "ownership"],
  ["control_flow", "ownership"],
  ["ownership", "references"],
  ["ownership", "slices"],
  ["references", "structs"],
  ["slices", "enums"],
  ["structs", "error_handling"],
  ["enums", "collections"]
], ws = new Map(Je.map((e) => [e.id, e])), Mt = (e) => ws.get(e);
function ms(e, t, r) {
  return t.has(e) ? "completed" : e === r ? "active" : Mt(e).prereqs.every((i) => t.has(i)) ? "available" : "locked";
}
function bs(e) {
  for (const t of Je)
    if (!e.has(t.id) && t.prereqs.every((r) => e.has(r)))
      return t.id;
  return null;
}
function xs(e, t) {
  const r = Mt(e), n = Mt(t), i = (r.y + n.y) / 2;
  return `M ${r.x} ${r.y} C ${r.x} ${i}, ${n.x} ${i}, ${n.x} ${n.y}`;
}
const ys = Array.from({ length: 60 }, (e, t) => ({
  x: (t * 137.5 + 17) % 196 + 2,
  y: (t * 97.3 + 9) % 510 + 5,
  r: 0.3 + t * 7 % 5 * 0.12,
  o: 0.05 + t * 13 % 7 * 0.025
})), Rr = {
  hello: {
    title: "Your First Program",
    concept: "In Rust, println is a macro — macros use ! after the name.",
    hint: "Change println(...) to println!(...)",
    starter: `fn main() {
    println("Hello, Rust!");
}`,
    checks: ["println!"]
  },
  variables: {
    title: "Mutability",
    concept: "Variables are immutable by default. Use mut to allow reassignment.",
    hint: "Declare with: let mut x = 5;",
    starter: `fn main() {
    let x = 5;
    x = 10;
    println!("x = {}", x);
}`,
    checks: ["let mut"]
  },
  types: {
    title: "Type Annotations",
    concept: "Rust needs a type annotation when it cannot infer from context.",
    hint: "Add a type: let x: i32 = ...",
    starter: `fn main() {
    let x = "42".parse().expect("NaN");
    println!("x + 1 = {}", x + 1);
}`,
    checks: ["i32"]
  },
  functions: {
    title: "Function Signatures",
    concept: "Every parameter must have a type annotation, and return types use ->.",
    hint: "fn add(a: i32, b: i32) -> i32",
    starter: `fn add(a, b) {
    a + b
}

fn main() {
    println!("3 + 5 = {}", add(3, 5));
}`,
    checks: ["i32", "->"]
  },
  control_flow: {
    title: "If Expressions",
    concept: "if blocks are expressions. All branches must be covered when returning a value.",
    hint: 'Add an else branch returning "zero"',
    starter: `fn describe(n: i32) -> &'static str {
    if n > 0 {
        "positive"
    } else if n < 0 {
        "negative"
    }
}

fn main() {
    println!("{}", describe(0));
}`,
    checks: ['"zero"']
  },
  ownership: {
    title: "Move Semantics",
    concept: "Assigning a String to another variable moves ownership. The original becomes invalid.",
    hint: "Clone the value: let s2 = s1.clone();",
    starter: `fn main() {
    let s1 = String::from("hello");
    let s2 = s1;
    println!("{} {}", s1, s2);
}`,
    checks: [".clone()"]
  },
  references: {
    title: "Borrowing",
    concept: "Functions can borrow values with & instead of taking ownership.",
    hint: "Change parameter to &String and pass &s",
    starter: `fn calculate_length(s: String) -> usize {
    s.len()
}

fn main() {
    let s = String::from("hello");
    let len = calculate_length(s);
    println!("'{}' is {} bytes", s, len);
}`,
    checks: ["&"]
  },
  slices: {
    title: "String Slices",
    concept: "Prefer &str over &String in parameters — it accepts both String refs and literals.",
    hint: "Change &String to &str",
    starter: `fn greet(name: &String) {
    println!("Hello, {}!", name);
}

fn main() {
    let name = String::from("Rustacean");
    greet(&name);
    greet("world"); // Won't work with &String!
}`,
    checks: ["&str"]
  },
  structs: {
    title: "Defining Structs",
    concept: "Structs group related data. Methods live in impl blocks.",
    hint: "struct Rectangle { width: f64, height: f64 } and impl with fn area(&self)",
    starter: `// Define a Rectangle struct with width and height (f64)
// Add a method area() that returns width * height

fn main() {
    let rect = Rectangle { width: 30.0, height: 50.0 };
    println!("Area: {}", rect.area());
}`,
    checks: ["struct Rectangle", "fn area"]
  },
  enums: {
    title: "Pattern Matching",
    concept: "match must handle every enum variant. Each arm uses => to map to a value.",
    hint: "match coin { Coin::Penny => 1, Coin::Nickel => 5, ... }",
    starter: `enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
}

fn value(coin: Coin) -> u32 {
    // Use match to return the cent value
    0
}

fn main() {
    println!("Quarter = {} cents", value(Coin::Quarter));
}`,
    checks: ["match", "=>"]
  },
  error_handling: {
    title: "The Result Type",
    concept: "Fallible operations return Result<T, E>. Handle both Ok and Err.",
    hint: "match input.parse::<i32>() { Ok(n) => ..., Err(e) => ... }",
    starter: `fn main() {
    let input = "42";
    // parse() returns Result, not i32 directly.
    // Use match to handle Ok and Err.
    let n: i32 = input.parse();
    println!("parsed: {}", n);
}`,
    checks: ["match", "Ok"]
  },
  collections: {
    title: "Vectors",
    concept: "Vec<T> is a growable array. Create with vec![], grow with push(), iterate with for.",
    hint: "let mut v = vec![1, 2, 3]; v.push(4); for x in &v { ... }",
    starter: `fn main() {
    // Create a mutable vector with 1, 2, 3
    // Push 4 and 5
    // Print each value with a for loop
}`,
    checks: ["vec!", ".push(", "for"]
  }
};
var ks = /* @__PURE__ */ st('<circle fill="#c8beb0" class="svelte-swvdfi"></circle>'), Es = /* @__PURE__ */ st('<path fill="none" class="svelte-swvdfi"></path>'), Ss = /* @__PURE__ */ st('<circle fill="var(--r-rust)" filter="url(#gl)" opacity="0.35" class="svelte-swvdfi"></circle>'), Ts = /* @__PURE__ */ st('<circle fill="var(--r-rust)" filter="url(#gl-active)" class="halo svelte-swvdfi"></circle>'), As = /* @__PURE__ */ st('<text class="node-chapter svelte-swvdfi"> </text>'), Cs = /* @__PURE__ */ st("<g><!><!><circle></circle><text> </text><!></g>"), Ms = /* @__PURE__ */ it(`<div class="done-state svelte-swvdfi"><span class="done-crab svelte-swvdfi">🦀</span> <h2 class="done-title svelte-swvdfi">All exercises complete</h2> <p class="done-sub svelte-swvdfi">You've covered the Rust fundamentals.</p> <button class="btn-primary svelte-swvdfi">Continue</button></div>`), Rs = /* @__PURE__ */ it('<div><pre class="svelte-swvdfi"> </pre></div>'), Ns = /* @__PURE__ */ it('<div class="hint-box svelte-swvdfi"><span class="hint-label svelte-swvdfi">hint</span> </div>'), Ds = /* @__PURE__ */ it('<span class="compile-spinner svelte-swvdfi"></span> Compiling…', 1), Fs = /* @__PURE__ */ it('<div class="ex-header svelte-swvdfi"><span class="ch-badge svelte-swvdfi"> </span> <h2 class="ex-title svelte-swvdfi"> </h2> <p class="ex-concept svelte-swvdfi"> </p></div> <div class="editor-wrap svelte-swvdfi"><div class="editor-chrome svelte-swvdfi"><span class="dot red svelte-swvdfi"></span> <span class="dot yellow svelte-swvdfi"></span> <span class="dot green svelte-swvdfi"></span> <span class="editor-filename svelte-swvdfi">main.rs</span></div> <textarea class="editor svelte-swvdfi" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off"></textarea></div> <!> <!> <div class="action-bar svelte-swvdfi"><button class="btn-ghost svelte-swvdfi"> </button> <div class="action-right svelte-swvdfi"><button class="btn-ghost svelte-swvdfi">Skip</button> <button class="btn-primary svelte-swvdfi"><!></button></div></div> <div class="shortcut-hint svelte-swvdfi">Ctrl+Enter to run</div>', 1), Ps = /* @__PURE__ */ it('<div class="rustlings svelte-swvdfi"><div class="tree-panel svelte-swvdfi"><div class="tree-head svelte-swvdfi"><span class="tree-title svelte-swvdfi">rustlings</span> <span class="tree-count svelte-swvdfi"> <span class="tree-count-sep svelte-swvdfi">/</span> </span></div> <svg class="tree-svg svelte-swvdfi" xmlns="http://www.w3.org/2000/svg"><defs class="svelte-swvdfi"><filter id="gl" x="-80%" y="-80%" width="260%" height="260%" class="svelte-swvdfi"><feGaussianBlur in="SourceGraphic" stdDeviation="3" class="svelte-swvdfi"></feGaussianBlur></filter><filter id="gl-active" x="-100%" y="-100%" width="300%" height="300%" class="svelte-swvdfi"><feGaussianBlur in="SourceGraphic" stdDeviation="5" class="svelte-swvdfi"></feGaussianBlur></filter></defs><!><!><!></svg> <div class="tree-foot svelte-swvdfi"><div class="progress-track svelte-swvdfi"><div class="progress-fill svelte-swvdfi"></div></div></div></div> <div class="exercise-panel svelte-swvdfi"><!></div></div>');
const Os = {
  hash: "svelte-swvdfi",
  code: `.rustlings.svelte-swvdfi {--r-rust: #CE422B;--r-rust-dim: #8a4030;--r-warm: #D4956A;--r-bg: #060606;--r-panel: #0b0b0b;--r-surface: #111;--r-border: rgba(255, 255, 255, 0.06);--r-text: #d0c8c0;--r-text-dim: #555;--r-edge-lit: rgba(206, 66, 43, 0.4);--r-edge-warm: rgba(206, 66, 43, 0.12);--r-edge-dim: rgba(255, 255, 255, 0.03);position:fixed;inset:0;display:flex;background:var(--r-bg);color:var(--r-text);font-family:'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;font-weight:400;overflow:hidden;}

	/* ── tree panel ── */.tree-panel.svelte-swvdfi {width:240px;flex-shrink:0;display:flex;flex-direction:column;background:linear-gradient(180deg, #080808 0%, #050505 100%);border-right:1px solid var(--r-border);}.tree-head.svelte-swvdfi {display:flex;align-items:center;justify-content:space-between;padding:16px 18px 8px;}.tree-title.svelte-swvdfi {font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;font-size:13px;font-weight:600;color:var(--r-rust);letter-spacing:0.04em;}.tree-count.svelte-swvdfi {font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;font-size:11px;color:var(--r-text-dim);font-variant-numeric:tabular-nums;}.tree-count-sep.svelte-swvdfi {opacity:0.4;margin:0 1px;}.tree-svg.svelte-swvdfi {flex:1;width:100%;padding:0 8px;}.tree-foot.svelte-swvdfi {padding:12px 18px 16px;}.progress-track.svelte-swvdfi {height:2px;background:rgba(255, 255, 255, 0.04);border-radius:1px;overflow:hidden;}.progress-fill.svelte-swvdfi {height:100%;background:var(--r-rust);border-radius:1px;transition:width 600ms ease;}

	/* ── svg nodes ── */.node-g.svelte-swvdfi {cursor:default;}.node-clickable.svelte-swvdfi {cursor:pointer;}.node-dot.svelte-swvdfi {transition:fill 400ms ease, stroke 400ms ease;}.node-completed.svelte-swvdfi {fill:var(--r-rust);stroke:var(--r-rust);stroke-width:1;}.node-active.svelte-swvdfi {fill:var(--r-rust);stroke:var(--r-warm);stroke-width:1.5;}.node-available.svelte-swvdfi {fill:none;stroke:var(--r-rust-dim);stroke-width:1;}.node-locked.svelte-swvdfi {fill:rgba(255, 255, 255, 0.03);stroke:rgba(255, 255, 255, 0.05);stroke-width:0.5;}.halo.svelte-swvdfi {
		animation: svelte-swvdfi-pulse 2.4s ease-in-out infinite;}

	@keyframes svelte-swvdfi-pulse {
		0%, 100% { opacity: 0.15; }
		50% { opacity: 0.45; }
	}.node-label.svelte-swvdfi {font-family:'IBM Plex Sans', system-ui, sans-serif;font-size:6.5px;text-anchor:middle;fill:var(--r-text-dim);transition:fill 400ms ease;}.label-lit.svelte-swvdfi {fill:var(--r-text);}.label-avail.svelte-swvdfi {fill:var(--r-rust-dim);}.label-dim.svelte-swvdfi {fill:rgba(255, 255, 255, 0.08);}.node-chapter.svelte-swvdfi {font-family:'JetBrains Mono', monospace;font-size:4.5px;text-anchor:middle;fill:var(--r-text-dim);opacity:0.5;}

	/* ── exercise panel ── */.exercise-panel.svelte-swvdfi {flex:1;display:flex;flex-direction:column;padding:32px 40px;overflow-y:auto;min-width:0;}.ex-header.svelte-swvdfi {margin-bottom:20px;}.ch-badge.svelte-swvdfi {display:inline-block;font-family:'JetBrains Mono', monospace;font-size:10px;font-weight:500;color:var(--r-rust);background:rgba(206, 66, 43, 0.08);border:1px solid rgba(206, 66, 43, 0.15);border-radius:4px;padding:2px 8px;margin-bottom:10px;letter-spacing:0.03em;}.ex-title.svelte-swvdfi {font-size:22px;font-weight:600;color:#eee;margin:0 0 8px;letter-spacing:-0.01em;}.ex-concept.svelte-swvdfi {font-size:13px;color:var(--r-text-dim);margin:0;line-height:1.6;max-width:520px;}

	/* ── code editor ── */.editor-wrap.svelte-swvdfi {flex:1;min-height:180px;max-height:360px;display:flex;flex-direction:column;border:1px solid var(--r-border);border-radius:8px;overflow:hidden;background:var(--r-surface);}.editor-chrome.svelte-swvdfi {display:flex;align-items:center;gap:6px;padding:8px 12px;background:rgba(255, 255, 255, 0.02);border-bottom:1px solid var(--r-border);}.dot.svelte-swvdfi {width:8px;height:8px;border-radius:50%;}.dot.red.svelte-swvdfi {background:#ff5f57;opacity:0.6;}.dot.yellow.svelte-swvdfi {background:#febc2e;opacity:0.6;}.dot.green.svelte-swvdfi {background:#28c840;opacity:0.6;}.editor-filename.svelte-swvdfi {font-family:'JetBrains Mono', monospace;font-size:10px;color:var(--r-text-dim);margin-left:8px;}.editor.svelte-swvdfi {flex:1;width:100%;padding:14px 16px;background:transparent;color:#c8c0b8;font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;font-size:13px;line-height:1.65;border:none;outline:none;resize:none;tab-size:4;}.editor.svelte-swvdfi::selection {background:rgba(206, 66, 43, 0.25);}

	/* ── output ── */.output.svelte-swvdfi {margin-top:10px;padding:10px 14px;border-radius:6px;font-family:'JetBrains Mono', monospace;font-size:12px;line-height:1.5;}.output.svelte-swvdfi pre:where(.svelte-swvdfi) {margin:0;white-space:pre-wrap;}.out-ok.svelte-swvdfi {background:rgba(40, 200, 64, 0.06);border:1px solid rgba(40, 200, 64, 0.15);color:#5cdb6a;}.out-err.svelte-swvdfi {background:rgba(206, 66, 43, 0.06);border:1px solid rgba(206, 66, 43, 0.15);color:var(--r-rust);}.hint-box.svelte-swvdfi {margin-top:8px;padding:10px 14px;border-radius:6px;background:rgba(212, 149, 106, 0.05);border:1px solid rgba(212, 149, 106, 0.12);font-size:12px;color:var(--r-warm);line-height:1.5;}.hint-label.svelte-swvdfi {font-family:'JetBrains Mono', monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-right:8px;opacity:0.6;}

	/* ── action bar ── */.action-bar.svelte-swvdfi {display:flex;align-items:center;justify-content:space-between;margin-top:16px;gap:8px;}.action-right.svelte-swvdfi {display:flex;gap:8px;}.btn-primary.svelte-swvdfi {display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:var(--r-rust);color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;transition:background 150ms ease, opacity 150ms ease;}.btn-primary.svelte-swvdfi:hover {background:#b8371f;}.btn-primary.svelte-swvdfi:disabled {opacity:0.6;cursor:not-allowed;}.btn-ghost.svelte-swvdfi {padding:8px 14px;background:transparent;color:var(--r-text-dim);border:1px solid var(--r-border);border-radius:6px;font-size:12px;cursor:pointer;transition:color 150ms ease, border-color 150ms ease;}.btn-ghost.svelte-swvdfi:hover {color:var(--r-text);border-color:rgba(255, 255, 255, 0.12);}.compile-spinner.svelte-swvdfi {display:inline-block;width:12px;height:12px;border:1.5px solid rgba(255, 255, 255, 0.3);border-top-color:#fff;border-radius:50%;
		animation: svelte-swvdfi-spin 0.6s linear infinite;}

	@keyframes svelte-swvdfi-spin {
		to { transform: rotate(360deg); }
	}.shortcut-hint.svelte-swvdfi {margin-top:10px;font-size:10px;color:var(--r-text-dim);opacity:0.4;font-family:'JetBrains Mono', monospace;}

	/* ── done state ── */.done-state.svelte-swvdfi {flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;}.done-crab.svelte-swvdfi {font-size:48px;margin-bottom:8px;}.done-title.svelte-swvdfi {font-size:24px;font-weight:600;color:#eee;margin:0;}.done-sub.svelte-swvdfi {font-size:14px;color:var(--r-text-dim);margin:0;}

	/* ── mobile ── */

	@media (max-width: 640px) {.tree-panel.svelte-swvdfi {display:none;}.exercise-panel.svelte-swvdfi {padding:24px 20px;}.editor-wrap.svelte-swvdfi {max-height:280px;}
	}`
};
function Is(e, t) {
  Br(t, !0), is(e, Os);
  let r = /* @__PURE__ */ B($e([])), n = /* @__PURE__ */ B(null), i = /* @__PURE__ */ B(""), s = /* @__PURE__ */ B(null), o = /* @__PURE__ */ B(!1), l = /* @__PURE__ */ B(!1), a = /* @__PURE__ */ B(!1), f = /* @__PURE__ */ B(void 0), c = /* @__PURE__ */ De(() => new Set(u(r))), h = /* @__PURE__ */ De(() => u(n) ? Mt(u(n)) : null), v = /* @__PURE__ */ De(() => u(n) ? Rr[u(n)] : null), p = /* @__PURE__ */ De(() => u(r).length === Je.length);
  function d(w) {
    T(n, w, !0), T(i, Rr[w].starter, !0), T(s, null), T(l, !1), Jt().then(() => u(f)?.focus());
  }
  function _() {
    const w = bs(u(c));
    w ? d(w) : T(n, null);
  }
  function k(w) {
    return ms(w, u(c), u(n));
  }
  async function b() {
    if (!u(v) || u(o)) return;
    T(o, !0), T(s, null), await new Promise((F) => setTimeout(F, 500));
    const w = u(v).checks.every((F) => u(i).includes(F));
    T(o, !1), w ? (T(s, { kind: "success", text: "✓ Compiles and runs successfully!" }, !0), T(r, [...u(r), u(n)], !0), await t.ctx.state.set("completed", u(r)), setTimeout(() => t.ctx.complete(), 1600)) : T(
      s,
      {
        kind: "error",
        text: "✗ Compilation failed. Check your code."
      },
      !0
    );
  }
  function C(w) {
    if (w.key === "Tab") {
      w.preventDefault();
      const F = w.currentTarget, xe = F.selectionStart, Ve = F.selectionEnd;
      T(i, u(i).substring(0, xe) + "    " + u(i).substring(Ve)), Jt().then(() => {
        F.selectionStart = F.selectionEnd = xe + 4;
      });
    }
    w.key === "Enter" && (w.ctrlKey || w.metaKey) && (w.preventDefault(), b());
  }
  function q(w) {
    k(w) === "available" && d(w);
  }
  function we(w, F) {
    const xe = u(c).has(w), Ve = u(c).has(F);
    return xe && Ve ? "var(--r-edge-lit)" : xe ? "var(--r-edge-warm)" : "var(--r-edge-dim)";
  }
  function G(w, F) {
    return u(c).has(w) && u(c).has(F) ? 1.5 : 0.6;
  }
  hs(async () => {
    const w = await t.ctx.state.get("completed");
    w && T(r, w, !0), _(), T(a, !0);
  });
  var me = Ki(), be = mr(me);
  {
    var D = (w) => {
      var F = Ps(), xe = S(F), Ve = S(xe), xn = A(S(Ve), 2), ur = S(xn), yn = A(ur, 2, !0), Ft = A(Ve, 2), cr = A(S(Ft));
      qt(cr, 17, () => ys, Bt, (W, y) => {
        var E = ks();
        fe(() => {
          M(E, "cx", u(y).x), M(E, "cy", u(y).y), M(E, "r", u(y).r), M(E, "opacity", u(y).o);
        }), H(W, E);
      });
      var dr = A(cr);
      qt(dr, 17, () => gs, Bt, (W, y) => {
        var E = /* @__PURE__ */ De(() => jn(u(y), 2));
        let K = () => u(E)[0], le = () => u(E)[1];
        var ae = Es();
        fe(
          (je, lt, Ue) => {
            M(ae, "d", je), M(ae, "stroke", lt), M(ae, "stroke-width", Ue);
          },
          [
            () => xs(K(), le()),
            () => we(K(), le()),
            () => G(K(), le())
          ]
        ), H(W, ae);
      });
      var kn = A(dr);
      qt(kn, 17, () => Je, Bt, (W, y) => {
        const E = /* @__PURE__ */ De(() => k(u(y).id)), K = /* @__PURE__ */ De(() => u(y).milestone ? 7 : 4.5);
        var le = Cs();
        let ae;
        var je = S(le);
        {
          var lt = (Y) => {
            var z = Ss();
            fe(() => {
              M(z, "cx", u(y).x), M(z, "cy", u(y).y), M(z, "r", u(K) * 2.5);
            }), H(Y, z);
          };
          ke(je, (Y) => {
            u(E) === "completed" && Y(lt);
          });
        }
        var Ue = A(je);
        {
          var bt = (Y) => {
            var z = Ts();
            fe(() => {
              M(z, "cx", u(y).x), M(z, "cy", u(y).y), M(z, "r", u(K) * 3);
            }), H(Y, z);
          };
          ke(Ue, (Y) => {
            u(E) === "active" && Y(bt);
          });
        }
        var ve = A(Ue);
        let at;
        var Ne = A(ve);
        let ot;
        var Pt = S(Ne), Ot = A(Ne);
        {
          var ft = (Y) => {
            var z = As(), xt = S(z);
            fe(() => {
              M(z, "x", u(y).x), M(z, "y", u(y).y + u(K) + 20), ue(xt, `Ch. ${u(y).chapter ?? ""}`);
            }), H(Y, z);
          };
          ke(Ot, (Y) => {
            u(y).milestone && u(E) !== "locked" && Y(ft);
          });
        }
        fe(() => {
          ae = Et(le, 0, "node-g svelte-swvdfi", null, ae, { "node-clickable": u(E) === "available" }), M(ve, "cx", u(y).x), M(ve, "cy", u(y).y), M(ve, "r", u(K)), at = Et(ve, 0, "node-dot svelte-swvdfi", null, at, {
            "node-completed": u(E) === "completed",
            "node-active": u(E) === "active",
            "node-available": u(E) === "available",
            "node-locked": u(E) === "locked"
          }), M(Ne, "x", u(y).x), M(Ne, "y", u(y).y + u(K) + 10), ot = Et(Ne, 0, "node-label svelte-swvdfi", null, ot, {
            "label-lit": u(E) === "completed" || u(E) === "active",
            "label-avail": u(E) === "available",
            "label-dim": u(E) === "locked"
          }), ue(Pt, u(y).label);
        }), Ge("click", le, () => q(u(y).id)), H(W, le);
      });
      var En = A(Ft, 2), Sn = S(En), Tn = S(Sn);
      let vr;
      var An = A(xe, 2), Cn = S(An);
      {
        var Mn = (W) => {
          var y = Ms(), E = A(S(y), 6);
          Ge("click", E, () => t.ctx.complete()), H(W, y);
        }, Rn = (W) => {
          var y = Fs(), E = mr(y), K = S(E), le = S(K), ae = A(K, 2), je = S(ae), lt = A(ae, 2), Ue = S(lt), bt = A(E, 2), ve = A(S(bt), 2);
          vs(ve, (P) => T(f, P), () => u(f));
          var at = A(bt, 2);
          {
            var Ne = (P) => {
              var oe = Rs();
              let yt;
              var Pn = S(oe), On = S(Pn);
              fe(() => {
                yt = Et(oe, 1, "output svelte-swvdfi", null, yt, {
                  "out-ok": u(s).kind === "success",
                  "out-err": u(s).kind === "error"
                }), ue(On, u(s).text);
              }), H(P, oe);
            };
            ke(at, (P) => {
              u(s) && P(Ne);
            });
          }
          var ot = A(at, 2);
          {
            var Pt = (P) => {
              var oe = Ns(), yt = A(S(oe));
              fe(() => ue(yt, ` ${u(v).hint ?? ""}`)), H(P, oe);
            };
            ke(ot, (P) => {
              u(l) && P(Pt);
            });
          }
          var Ot = A(ot, 2), ft = S(Ot), Y = S(ft), z = A(ft, 2), xt = S(z), It = A(xt, 2), Nn = S(It);
          {
            var Dn = (P) => {
              var oe = Ds();
              H(P, oe);
            }, Fn = (P) => {
              var oe = Wi("▶ Run");
              H(P, oe);
            };
            ke(Nn, (P) => {
              u(o) ? P(Dn) : P(Fn, -1);
            });
          }
          fe(() => {
            ue(le, `Ch. ${u(h).chapter ?? ""}`), ue(je, u(v).title), ue(Ue, u(v).concept), ue(Y, u(l) ? "Hide hint" : "Hint"), It.disabled = u(o);
          }), Ge("keydown", ve, C), ds(ve, () => u(i), (P) => T(i, P)), Ge("click", ft, () => T(l, !u(l))), Ge("click", xt, () => t.ctx.complete()), Ge("click", It, b), H(W, y);
        };
        ke(Cn, (W) => {
          u(p) ? W(Mn) : u(h) && u(v) && W(Rn, 1);
        });
      }
      fe(() => {
        ue(ur, u(r).length), ue(yn, Je.length), M(Ft, "viewBox", _s), vr = as(Tn, "", vr, { width: `${u(r).length / Je.length * 100}%` });
      }), H(w, F);
    };
    ke(be, (w) => {
      u(a) && w(D);
    });
  }
  H(e, me), qr();
}
Gi(["click", "keydown"]);
function Bs(e, t) {
  return Qi(Is, { target: e, props: t });
}
function qs(e) {
  Zi(e);
}
export {
  Bs as mountPlugin,
  qs as unmountPlugin
};
