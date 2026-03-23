var gu = Array.isArray, vu = Array.prototype.indexOf, Ki = Array.prototype.includes, xu = Array.from, Mu = Object.defineProperty, vr = Object.getOwnPropertyDescriptor, Su = Object.prototype, Eu = Array.prototype, Tu = Object.getPrototypeOf, Oo = Object.isExtensible;
const yu = () => {
};
function bu(n) {
  for (var e = 0; e < n.length; e++)
    n[e]();
}
function Wl() {
  var n, e, t = new Promise((i, r) => {
    n = i, e = r;
  });
  return { promise: t, resolve: n, reject: e };
}
const Mt = 2, Zi = 4, Ms = 8, Xl = 1 << 24, ri = 16, Fn = 32, Si = 64, la = 128, Xt = 512, xt = 1024, Ut = 2048, _n = 4096, ei = 8192, fn = 16384, Ai = 32768, ca = 1 << 25, ds = 65536, Bo = 1 << 17, Au = 1 << 18, ir = 1 << 19, wu = 1 << 20, Ei = 65536, ua = 1 << 21, oo = 1 << 22, ti = 1 << 23, is = /* @__PURE__ */ Symbol("$state"), Cn = new class extends Error {
  name = "StaleReactionError";
  message = "The reaction that called `getAbortSignal()` was re-run or destroyed";
}();
function Ru(n) {
  throw new Error("https://svelte.dev/e/lifecycle_outside_component");
}
function Cu() {
  throw new Error("https://svelte.dev/e/async_derived_orphan");
}
function Pu(n) {
  throw new Error("https://svelte.dev/e/effect_in_teardown");
}
function Du() {
  throw new Error("https://svelte.dev/e/effect_in_unowned_derived");
}
function Lu(n) {
  throw new Error("https://svelte.dev/e/effect_orphan");
}
function Iu() {
  throw new Error("https://svelte.dev/e/effect_update_depth_exceeded");
}
function Uu() {
  throw new Error("https://svelte.dev/e/state_descriptors_fixed");
}
function Nu() {
  throw new Error("https://svelte.dev/e/state_prototype_fixed");
}
function Fu() {
  throw new Error("https://svelte.dev/e/state_unsafe_mutation");
}
function Ou() {
  throw new Error("https://svelte.dev/e/svelte_boundary_reset_onerror");
}
const Bu = 2, Et = /* @__PURE__ */ Symbol(), zu = "http://www.w3.org/1999/xhtml";
function Vu() {
  console.warn("https://svelte.dev/e/svelte_boundary_reset_noop");
}
function ql(n) {
  return n === this.v;
}
let Nt = null;
function $i(n) {
  Nt = n;
}
function Yl(n, e = !1, t) {
  Nt = {
    p: Nt,
    i: !1,
    c: null,
    e: null,
    s: n,
    x: null,
    r: (
      /** @type {Effect} */
      He
    ),
    l: null
  };
}
function Kl(n) {
  var e = (
    /** @type {ComponentContext} */
    Nt
  ), t = e.e;
  if (t !== null) {
    e.e = null;
    for (var i of t)
      _c(i);
  }
  return e.i = !0, Nt = e.p, /** @type {T} */
  {};
}
function Zl() {
  return !0;
}
let ki = [];
function Gu() {
  var n = ki;
  ki = [], bu(n);
}
function Xi(n) {
  if (ki.length === 0) {
    var e = ki;
    queueMicrotask(() => {
      e === ki && Gu();
    });
  }
  ki.push(n);
}
function $l(n) {
  var e = He;
  if (e === null)
    return Be.f |= ti, n;
  if ((e.f & Ai) === 0 && (e.f & Zi) === 0)
    throw n;
  Jn(n, e);
}
function Jn(n, e) {
  for (; e !== null; ) {
    if ((e.f & la) !== 0) {
      if ((e.f & Ai) === 0)
        throw n;
      try {
        e.b.error(n);
        return;
      } catch (t) {
        n = t;
      }
    }
    e = e.parent;
  }
  throw n;
}
const Hu = -7169;
function dt(n, e) {
  n.f = n.f & Hu | e;
}
function lo(n) {
  (n.f & Xt) !== 0 || n.deps === null ? dt(n, xt) : dt(n, _n);
}
function jl(n) {
  if (n !== null)
    for (const e of n)
      (e.f & Mt) === 0 || (e.f & Ei) === 0 || (e.f ^= Ei, jl(
        /** @type {Derived} */
        e.deps
      ));
}
function Jl(n, e, t) {
  (n.f & Ut) !== 0 ? e.add(n) : (n.f & _n) !== 0 && t.add(n), jl(n.deps), dt(n, xt);
}
const Wn = /* @__PURE__ */ new Set();
let at = null, en = null, fa = null, Rs = !1, Wi = null, rs = null;
var zo = 0;
let ku = 1;
class Ti {
  id = ku++;
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
  #a = /* @__PURE__ */ new Set();
  /**
   * If a fork is discarded, we need to destroy any effects that are no longer needed
   * @type {Set<(batch: Batch) => void>}
   */
  #d = /* @__PURE__ */ new Set();
  /**
   * Async effects that are currently in flight
   * @type {Map<Effect, number>}
   */
  #i = /* @__PURE__ */ new Map();
  /**
   * Async effects that are currently in flight, _not_ inside a pending boundary
   * @type {Map<Effect, number>}
   */
  #o = /* @__PURE__ */ new Map();
  /**
   * A deferred that resolves when the batch is committed, used with `settled()`
   * TODO replace with Promise.withResolvers once supported widely enough
   * @type {{ promise: Promise<void>, resolve: (value?: any) => void, reject: (reason: unknown) => void } | null}
   */
  #r = null;
  /**
   * The root effects that need to be flushed
   * @type {Effect[]}
   */
  #e = [];
  /**
   * Deferred effects (which run after async work has completed) that are DIRTY
   * @type {Set<Effect>}
   */
  #t = /* @__PURE__ */ new Set();
  /**
   * Deferred effects that are MAYBE_DIRTY
   * @type {Set<Effect>}
   */
  #n = /* @__PURE__ */ new Set();
  /**
   * A map of branches that still exist, but will be destroyed when this batch
   * is committed — we skip over these during `process`.
   * The value contains child effects that were dirty/maybe_dirty before being reset,
   * so they can be rescheduled if the branch survives.
   * @type {Map<Effect, { d: Effect[], m: Effect[] }>}
   */
  #s = /* @__PURE__ */ new Map();
  is_fork = !1;
  #u = !1;
  /** @type {Set<Batch>} */
  #l = /* @__PURE__ */ new Set();
  #f() {
    return this.is_fork || this.#o.size > 0;
  }
  #p() {
    for (const i of this.#l)
      for (const r of i.#o.keys()) {
        for (var e = !1, t = r; t.parent !== null; ) {
          if (this.#s.has(t)) {
            e = !0;
            break;
          }
          t = t.parent;
        }
        if (!e)
          return !0;
      }
    return !1;
  }
  /**
   * Add an effect to the #skipped_branches map and reset its children
   * @param {Effect} effect
   */
  skip_effect(e) {
    this.#s.has(e) || this.#s.set(e, { d: [], m: [] });
  }
  /**
   * Remove an effect from the #skipped_branches map and reschedule
   * any tracked dirty/maybe_dirty child effects
   * @param {Effect} effect
   */
  unskip_effect(e) {
    var t = this.#s.get(e);
    if (t) {
      this.#s.delete(e);
      for (var i of t.d)
        dt(i, Ut), this.schedule(i);
      for (i of t.m)
        dt(i, _n), this.schedule(i);
    }
  }
  #h() {
    if (zo++ > 1e3 && (Wn.delete(this), Wu()), !this.#f()) {
      for (const o of this.#t)
        this.#n.delete(o), dt(o, Ut), this.schedule(o);
      for (const o of this.#n)
        dt(o, _n), this.schedule(o);
    }
    const e = this.#e;
    this.#e = [], this.apply();
    var t = Wi = [], i = [], r = rs = [];
    for (const o of e)
      try {
        this.#c(o, t, i);
      } catch (c) {
        throw nc(o), c;
      }
    if (at = null, r.length > 0) {
      var s = Ti.ensure();
      for (const o of r)
        s.schedule(o);
    }
    if (Wi = null, rs = null, this.#f() || this.#p()) {
      this.#m(i), this.#m(t);
      for (const [o, c] of this.#s)
        tc(o, c);
    } else {
      this.#i.size === 0 && Wn.delete(this), this.#t.clear(), this.#n.clear();
      for (const o of this.#a) o(this);
      this.#a.clear(), Vo(i), Vo(t), this.#r?.resolve();
    }
    var a = (
      /** @type {Batch | null} */
      /** @type {unknown} */
      at
    );
    if (this.#e.length > 0) {
      const o = a ??= this;
      o.#e.push(...this.#e.filter((c) => !o.#e.includes(c)));
    }
    a !== null && (Wn.add(a), a.#h()), Wn.has(this) || this.#v();
  }
  /**
   * Traverse the effect tree, executing effects or stashing
   * them for later execution as appropriate
   * @param {Effect} root
   * @param {Effect[]} effects
   * @param {Effect[]} render_effects
   */
  #c(e, t, i) {
    e.f ^= xt;
    for (var r = e.first; r !== null; ) {
      var s = r.f, a = (s & (Fn | Si)) !== 0, o = a && (s & xt) !== 0, c = o || (s & ei) !== 0 || this.#s.has(r);
      if (!c && r.fn !== null) {
        a ? r.f ^= xt : (s & Zi) !== 0 ? t.push(r) : yr(r) && ((s & ri) !== 0 && this.#n.add(r), ji(r));
        var l = r.first;
        if (l !== null) {
          r = l;
          continue;
        }
      }
      for (; r !== null; ) {
        var f = r.next;
        if (f !== null) {
          r = f;
          break;
        }
        r = r.parent;
      }
    }
  }
  /**
   * @param {Effect[]} effects
   */
  #m(e) {
    for (var t = 0; t < e.length; t += 1)
      Jl(e[t], this.#t, this.#n);
  }
  /**
   * Associate a change to a given source with the current
   * batch, noting its previous and current values
   * @param {Value} source
   * @param {any} old_value
   * @param {boolean} [is_derived]
   */
  capture(e, t, i = !1) {
    t !== Et && !this.previous.has(e) && this.previous.set(e, t), (e.f & ti) === 0 && (this.current.set(e, [e.v, i]), en?.set(e, e.v));
  }
  activate() {
    at = this;
  }
  deactivate() {
    at = null, en = null;
  }
  flush() {
    try {
      Rs = !0, at = this, this.#h();
    } finally {
      zo = 0, fa = null, Wi = null, rs = null, Rs = !1, at = null, en = null, ni.clear();
    }
  }
  discard() {
    for (const e of this.#d) e(this);
    this.#d.clear(), Wn.delete(this);
  }
  #v() {
    for (const l of Wn) {
      var e = l.id < this.id, t = [];
      for (const [f, [d, u]] of this.current) {
        if (l.current.has(f)) {
          var i = (
            /** @type {[any, boolean]} */
            l.current.get(f)[0]
          );
          if (e && d !== i)
            l.current.set(f, [d, u]);
          else
            continue;
        }
        t.push(f);
      }
      var r = [...l.current.keys()].filter((f) => !this.current.has(f));
      if (r.length === 0)
        e && l.discard();
      else if (t.length > 0) {
        l.activate();
        var s = /* @__PURE__ */ new Set(), a = /* @__PURE__ */ new Map();
        for (var o of t)
          Ql(o, r, s, a);
        if (l.#e.length > 0) {
          l.apply();
          for (var c of l.#e)
            l.#c(c, [], []);
          l.#e = [];
        }
        l.deactivate();
      }
    }
    for (const l of Wn)
      l.#l.has(this) && (l.#l.delete(this), l.#l.size === 0 && !l.#f() && (l.activate(), l.#h()));
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   */
  increment(e, t) {
    let i = this.#i.get(t) ?? 0;
    if (this.#i.set(t, i + 1), e) {
      let r = this.#o.get(t) ?? 0;
      this.#o.set(t, r + 1);
    }
  }
  /**
   * @param {boolean} blocking
   * @param {Effect} effect
   * @param {boolean} skip - whether to skip updates (because this is triggered by a stale reaction)
   */
  decrement(e, t, i) {
    let r = this.#i.get(t) ?? 0;
    if (r === 1 ? this.#i.delete(t) : this.#i.set(t, r - 1), e) {
      let s = this.#o.get(t) ?? 0;
      s === 1 ? this.#o.delete(t) : this.#o.set(t, s - 1);
    }
    this.#u || i || (this.#u = !0, Xi(() => {
      this.#u = !1, this.flush();
    }));
  }
  /**
   * @param {Set<Effect>} dirty_effects
   * @param {Set<Effect>} maybe_dirty_effects
   */
  transfer_effects(e, t) {
    for (const i of e)
      this.#t.add(i);
    for (const i of t)
      this.#n.add(i);
    e.clear(), t.clear();
  }
  /** @param {(batch: Batch) => void} fn */
  oncommit(e) {
    this.#a.add(e);
  }
  /** @param {(batch: Batch) => void} fn */
  ondiscard(e) {
    this.#d.add(e);
  }
  settled() {
    return (this.#r ??= Wl()).promise;
  }
  static ensure() {
    if (at === null) {
      const e = at = new Ti();
      Rs || (Wn.add(at), Xi(() => {
        at === e && e.flush();
      }));
    }
    return at;
  }
  apply() {
    {
      en = null;
      return;
    }
  }
  /**
   *
   * @param {Effect} effect
   */
  schedule(e) {
    if (fa = e, e.b?.is_pending && (e.f & (Zi | Ms | Xl)) !== 0 && (e.f & Ai) === 0) {
      e.b.defer_effect(e);
      return;
    }
    for (var t = e; t.parent !== null; ) {
      t = t.parent;
      var i = t.f;
      if (Wi !== null && t === He && (Be === null || (Be.f & Mt) === 0))
        return;
      if ((i & (Si | Fn)) !== 0) {
        if ((i & xt) === 0)
          return;
        t.f ^= xt;
      }
    }
    this.#e.push(t);
  }
}
function Wu() {
  try {
    Iu();
  } catch (n) {
    Jn(n, fa);
  }
}
let Rn = null;
function Vo(n) {
  var e = n.length;
  if (e !== 0) {
    for (var t = 0; t < e; ) {
      var i = n[t++];
      if ((i.f & (fn | ei)) === 0 && yr(i) && (Rn = /* @__PURE__ */ new Set(), ji(i), i.deps === null && i.first === null && i.nodes === null && i.teardown === null && i.ac === null && Mc(i), Rn?.size > 0)) {
        ni.clear();
        for (const r of Rn) {
          if ((r.f & (fn | ei)) !== 0) continue;
          const s = [r];
          let a = r.parent;
          for (; a !== null; )
            Rn.has(a) && (Rn.delete(a), s.push(a)), a = a.parent;
          for (let o = s.length - 1; o >= 0; o--) {
            const c = s[o];
            (c.f & (fn | ei)) === 0 && ji(c);
          }
        }
        Rn.clear();
      }
    }
    Rn = null;
  }
}
function Ql(n, e, t, i) {
  if (!t.has(n) && (t.add(n), n.reactions !== null))
    for (const r of n.reactions) {
      const s = r.f;
      (s & Mt) !== 0 ? Ql(
        /** @type {Derived} */
        r,
        e,
        t,
        i
      ) : (s & (oo | ri)) !== 0 && (s & Ut) === 0 && ec(r, e, i) && (dt(r, Ut), co(
        /** @type {Effect} */
        r
      ));
    }
}
function ec(n, e, t) {
  const i = t.get(n);
  if (i !== void 0) return i;
  if (n.deps !== null)
    for (const r of n.deps) {
      if (Ki.call(e, r))
        return !0;
      if ((r.f & Mt) !== 0 && ec(
        /** @type {Derived} */
        r,
        e,
        t
      ))
        return t.set(
          /** @type {Derived} */
          r,
          !0
        ), !0;
    }
  return t.set(n, !1), !1;
}
function co(n) {
  at.schedule(n);
}
function tc(n, e) {
  if (!((n.f & Fn) !== 0 && (n.f & xt) !== 0)) {
    (n.f & Ut) !== 0 ? e.d.push(n) : (n.f & _n) !== 0 && e.m.push(n), dt(n, xt);
    for (var t = n.first; t !== null; )
      tc(t, e), t = t.next;
  }
}
function nc(n) {
  dt(n, xt);
  for (var e = n.first; e !== null; )
    nc(e), e = e.next;
}
function Xu(n) {
  let e = 0, t = Ss(0), i;
  return () => {
    ho() && (Tt(t), vc(() => (e === 0 && (i = mo(() => n(() => xr(t)))), e += 1, () => {
      Xi(() => {
        e -= 1, e === 0 && (i?.(), i = void 0, xr(t));
      });
    })));
  };
}
var qu = ds | ir;
function Yu(n, e, t, i) {
  new Ku(n, e, t, i);
}
class Ku {
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
  #a;
  /** @type {TemplateNode | null} */
  #d = null;
  /** @type {BoundaryProps} */
  #i;
  /** @type {((anchor: Node) => void)} */
  #o;
  /** @type {Effect} */
  #r;
  /** @type {Effect | null} */
  #e = null;
  /** @type {Effect | null} */
  #t = null;
  /** @type {Effect | null} */
  #n = null;
  /** @type {DocumentFragment | null} */
  #s = null;
  #u = 0;
  #l = 0;
  #f = !1;
  /** @type {Set<Effect>} */
  #p = /* @__PURE__ */ new Set();
  /** @type {Set<Effect>} */
  #h = /* @__PURE__ */ new Set();
  /**
   * A source containing the number of pending async deriveds/expressions.
   * Only created if `$effect.pending()` is used inside the boundary,
   * otherwise updating the source results in needless `Batch.ensure()`
   * calls followed by no-op flushes
   * @type {Source<number> | null}
   */
  #c = null;
  #m = Xu(() => (this.#c = Ss(this.#u), () => {
    this.#c = null;
  }));
  /**
   * @param {TemplateNode} node
   * @param {BoundaryProps} props
   * @param {((anchor: Node) => void)} children
   * @param {((error: unknown) => unknown) | undefined} [transform_error]
   */
  constructor(e, t, i, r) {
    this.#a = e, this.#i = t, this.#o = (s) => {
      var a = (
        /** @type {Effect} */
        He
      );
      a.b = this, a.f |= la, i(s);
    }, this.parent = /** @type {Effect} */
    He.b, this.transform_error = r ?? this.parent?.transform_error ?? ((s) => s), this.#r = hf(() => {
      this.#x();
    }, qu);
  }
  #v() {
    try {
      this.#e = oi(() => this.#o(this.#a));
    } catch (e) {
      this.error(e);
    }
  }
  /**
   * @param {unknown} error The deserialized error from the server's hydration comment
   */
  #S(e) {
    const t = this.#i.failed;
    t && (this.#n = oi(() => {
      t(
        this.#a,
        () => e,
        () => () => {
        }
      );
    }));
  }
  #E() {
    const e = this.#i.pending;
    e && (this.is_pending = !0, this.#t = oi(() => e(this.#a)), Xi(() => {
      var t = this.#s = document.createDocumentFragment(), i = hc();
      t.append(i), this.#e = this.#g(() => oi(() => this.#o(i))), this.#l === 0 && (this.#a.before(t), this.#s = null, ss(
        /** @type {Effect} */
        this.#t,
        () => {
          this.#t = null;
        }
      ), this.#_(
        /** @type {Batch} */
        at
      ));
    }));
  }
  #x() {
    try {
      if (this.is_pending = this.has_pending_snippet(), this.#l = 0, this.#u = 0, this.#e = oi(() => {
        this.#o(this.#a);
      }), this.#l > 0) {
        var e = this.#s = document.createDocumentFragment();
        mf(this.#e, e);
        const t = (
          /** @type {(anchor: Node) => void} */
          this.#i.pending
        );
        this.#t = oi(() => t(this.#a));
      } else
        this.#_(
          /** @type {Batch} */
          at
        );
    } catch (t) {
      this.error(t);
    }
  }
  /**
   * @param {Batch} batch
   */
  #_(e) {
    this.is_pending = !1, e.transfer_effects(this.#p, this.#h);
  }
  /**
   * Defer an effect inside a pending boundary until the boundary resolves
   * @param {Effect} effect
   */
  defer_effect(e) {
    Jl(e, this.#p, this.#h);
  }
  /**
   * Returns `false` if the effect exists inside a boundary whose pending snippet is shown
   * @returns {boolean}
   */
  is_rendered() {
    return !this.is_pending && (!this.parent || this.parent.is_rendered());
  }
  has_pending_snippet() {
    return !!this.#i.pending;
  }
  /**
   * @template T
   * @param {() => T} fn
   */
  #g(e) {
    var t = He, i = Be, r = Nt;
    gn(this.#r), Yt(this.#r), $i(this.#r.ctx);
    try {
      return Ti.ensure(), e();
    } catch (s) {
      return $l(s), null;
    } finally {
      gn(t), Yt(i), $i(r);
    }
  }
  /**
   * Updates the pending count associated with the currently visible pending snippet,
   * if any, such that we can replace the snippet with content once work is done
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  #M(e, t) {
    if (!this.has_pending_snippet()) {
      this.parent && this.parent.#M(e, t);
      return;
    }
    this.#l += e, this.#l === 0 && (this.#_(t), this.#t && ss(this.#t, () => {
      this.#t = null;
    }), this.#s && (this.#a.before(this.#s), this.#s = null));
  }
  /**
   * Update the source that powers `$effect.pending()` inside this boundary,
   * and controls when the current `pending` snippet (if any) is removed.
   * Do not call from inside the class
   * @param {1 | -1} d
   * @param {Batch} batch
   */
  update_pending_count(e, t) {
    this.#M(e, t), this.#u += e, !(!this.#c || this.#f) && (this.#f = !0, Xi(() => {
      this.#f = !1, this.#c && ms(this.#c, this.#u);
    }));
  }
  get_effect_pending() {
    return this.#m(), Tt(
      /** @type {Source<number>} */
      this.#c
    );
  }
  /** @param {unknown} error */
  error(e) {
    var t = this.#i.onerror;
    let i = this.#i.failed;
    if (!t && !i)
      throw e;
    this.#e && (hn(this.#e), this.#e = null), this.#t && (hn(this.#t), this.#t = null), this.#n && (hn(this.#n), this.#n = null);
    var r = !1, s = !1;
    const a = () => {
      if (r) {
        Vu();
        return;
      }
      r = !0, s && Ou(), this.#n !== null && ss(this.#n, () => {
        this.#n = null;
      }), this.#g(() => {
        this.#x();
      });
    }, o = (c) => {
      try {
        s = !0, t?.(c, a), s = !1;
      } catch (l) {
        Jn(l, this.#r && this.#r.parent);
      }
      i && (this.#n = this.#g(() => {
        try {
          return oi(() => {
            var l = (
              /** @type {Effect} */
              He
            );
            l.b = this, l.f |= la, i(
              this.#a,
              () => c,
              () => a
            );
          });
        } catch (l) {
          return Jn(
            l,
            /** @type {Effect} */
            this.#r.parent
          ), null;
        }
      }));
    };
    Xi(() => {
      var c;
      try {
        c = this.transform_error(e);
      } catch (l) {
        Jn(l, this.#r && this.#r.parent);
        return;
      }
      c !== null && typeof c == "object" && typeof /** @type {any} */
      c.then == "function" ? c.then(
        o,
        /** @param {unknown} e */
        (l) => Jn(l, this.#r && this.#r.parent)
      ) : o(c);
    });
  }
}
function Zu(n, e, t, i) {
  const r = rc;
  var s = n.filter((u) => !u.settled);
  if (t.length === 0 && s.length === 0) {
    i(e.map(r));
    return;
  }
  var a = (
    /** @type {Effect} */
    He
  ), o = $u(), c = s.length === 1 ? s[0].promise : s.length > 1 ? Promise.all(s.map((u) => u.promise)) : null;
  function l(u) {
    o();
    try {
      i(u);
    } catch (m) {
      (a.f & fn) === 0 && Jn(m, a);
    }
    ps();
  }
  if (t.length === 0) {
    c.then(() => l(e.map(r)));
    return;
  }
  var f = ic();
  function d() {
    Promise.all(t.map((u) => /* @__PURE__ */ ju(u))).then((u) => l([...e.map(r), ...u])).catch((u) => Jn(u, a)).finally(() => f());
  }
  c ? c.then(() => {
    o(), d(), ps();
  }) : d();
}
function $u() {
  var n = (
    /** @type {Effect} */
    He
  ), e = Be, t = Nt, i = (
    /** @type {Batch} */
    at
  );
  return function(s = !0) {
    gn(n), Yt(e), $i(t), s && (n.f & fn) === 0 && (i?.activate(), i?.apply());
  };
}
function ps(n = !0) {
  gn(null), Yt(null), $i(null), n && at?.deactivate();
}
function ic() {
  var n = (
    /** @type {Effect} */
    He
  ), e = (
    /** @type {Boundary} */
    n.b
  ), t = (
    /** @type {Batch} */
    at
  ), i = e.is_rendered();
  return e.update_pending_count(1, t), t.increment(i, n), (r = !1) => {
    e.update_pending_count(-1, t), t.decrement(i, n, r);
  };
}
// @__NO_SIDE_EFFECTS__
function rc(n) {
  var e = Mt | Ut, t = Be !== null && (Be.f & Mt) !== 0 ? (
    /** @type {Derived} */
    Be
  ) : null;
  return He !== null && (He.f |= ir), {
    ctx: Nt,
    deps: null,
    effects: null,
    equals: ql,
    f: e,
    fn: n,
    reactions: null,
    rv: 0,
    v: (
      /** @type {V} */
      Et
    ),
    wv: 0,
    parent: t ?? He,
    ac: null
  };
}
// @__NO_SIDE_EFFECTS__
function ju(n, e, t) {
  let i = (
    /** @type {Effect | null} */
    He
  );
  i === null && Cu();
  var r = (
    /** @type {Promise<V>} */
    /** @type {unknown} */
    void 0
  ), s = Ss(
    /** @type {V} */
    Et
  ), a = !Be, o = /* @__PURE__ */ new Map();
  return uf(() => {
    var c = (
      /** @type {Effect} */
      He
    ), l = Wl();
    r = l.promise;
    try {
      Promise.resolve(n()).then(l.resolve, l.reject).finally(ps);
    } catch (m) {
      l.reject(m), ps();
    }
    var f = (
      /** @type {Batch} */
      at
    );
    if (a) {
      if ((c.f & Ai) !== 0)
        var d = ic();
      if (
        /** @type {Boundary} */
        i.b.is_rendered()
      )
        o.get(f)?.reject(Cn), o.delete(f);
      else {
        for (const m of o.values())
          m.reject(Cn);
        o.clear();
      }
      o.set(f, l);
    }
    const u = (m, g = void 0) => {
      if (d) {
        var M = g === Cn;
        d(M);
      }
      if (!(g === Cn || (c.f & fn) !== 0)) {
        if (f.activate(), g)
          s.f |= ti, ms(s, g);
        else {
          (s.f & ti) !== 0 && (s.f ^= ti), ms(s, m);
          for (const [p, h] of o) {
            if (o.delete(p), p === f) break;
            h.reject(Cn);
          }
        }
        f.deactivate();
      }
    };
    l.promise.then(u, (m) => u(null, m || "unknown"));
  }), of(() => {
    for (const c of o.values())
      c.reject(Cn);
  }), new Promise((c) => {
    function l(f) {
      function d() {
        f === r ? c(s) : l(r);
      }
      f.then(d, d);
    }
    l(r);
  });
}
// @__NO_SIDE_EFFECTS__
function Dr(n) {
  const e = /* @__PURE__ */ rc(n);
  return Ec(e), e;
}
function Ju(n) {
  var e = n.effects;
  if (e !== null) {
    n.effects = null;
    for (var t = 0; t < e.length; t += 1)
      hn(
        /** @type {Effect} */
        e[t]
      );
  }
}
function Qu(n) {
  for (var e = n.parent; e !== null; ) {
    if ((e.f & Mt) === 0)
      return (e.f & fn) === 0 ? (
        /** @type {Effect} */
        e
      ) : null;
    e = e.parent;
  }
  return null;
}
function uo(n) {
  var e, t = He;
  gn(Qu(n));
  try {
    n.f &= ~Ei, Ju(n), e = Ac(n);
  } finally {
    gn(t);
  }
  return e;
}
function sc(n) {
  var e = n.v, t = uo(n);
  if (!n.equals(t) && (n.wv = yc(), (!at?.is_fork || n.deps === null) && (n.v = t, at?.capture(n, e, !0), n.deps === null))) {
    dt(n, xt);
    return;
  }
  yi || (en !== null ? (ho() || at?.is_fork) && en.set(n, t) : lo(n));
}
function ef(n) {
  if (n.effects !== null)
    for (const e of n.effects)
      (e.teardown || e.ac) && (e.teardown?.(), e.ac?.abort(Cn), e.teardown = yu, e.ac = null, Mr(e, 0), po(e));
}
function ac(n) {
  if (n.effects !== null)
    for (const e of n.effects)
      e.teardown && ji(e);
}
let ha = /* @__PURE__ */ new Set();
const ni = /* @__PURE__ */ new Map();
let oc = !1;
function Ss(n, e) {
  var t = {
    f: 0,
    // TODO ideally we could skip this altogether, but it causes type errors
    v: n,
    reactions: null,
    equals: ql,
    rv: 0,
    wv: 0
  };
  return t;
}
// @__NO_SIDE_EFFECTS__
function wn(n, e) {
  const t = Ss(n);
  return Ec(t), t;
}
function Pn(n, e, t = !1) {
  Be !== null && // since we are untracking the function inside `$inspect.with` we need to add this check
  // to ensure we error if state is set inside an inspect effect
  (!tn || (Be.f & Bo) !== 0) && Zl() && (Be.f & (Mt | ri | oo | Bo)) !== 0 && (qt === null || !Ki.call(qt, n)) && Fu();
  let i = t ? pr(e) : e;
  return ms(n, i, rs);
}
function ms(n, e, t = null) {
  if (!n.equals(e)) {
    var i = n.v;
    yi ? ni.set(n, e) : ni.set(n, i), n.v = e;
    var r = Ti.ensure();
    if (r.capture(n, i), (n.f & Mt) !== 0) {
      const s = (
        /** @type {Derived} */
        n
      );
      (n.f & Ut) !== 0 && uo(s), en === null && lo(s);
    }
    n.wv = yc(), lc(n, Ut, t), He !== null && (He.f & xt) !== 0 && (He.f & (Fn | Si)) === 0 && (Ht === null ? _f([n]) : Ht.push(n)), !r.is_fork && ha.size > 0 && !oc && tf();
  }
  return e;
}
function tf() {
  oc = !1;
  for (const n of ha)
    (n.f & xt) !== 0 && dt(n, _n), yr(n) && ji(n);
  ha.clear();
}
function xr(n) {
  Pn(n, n.v + 1);
}
function lc(n, e, t) {
  var i = n.reactions;
  if (i !== null)
    for (var r = i.length, s = 0; s < r; s++) {
      var a = i[s], o = a.f, c = (o & Ut) === 0;
      if (c && dt(a, e), (o & Mt) !== 0) {
        var l = (
          /** @type {Derived} */
          a
        );
        en?.delete(l), (o & Ei) === 0 && (o & Xt && (a.f |= Ei), lc(l, _n, t));
      } else if (c) {
        var f = (
          /** @type {Effect} */
          a
        );
        (o & ri) !== 0 && Rn !== null && Rn.add(f), t !== null ? t.push(f) : co(f);
      }
    }
}
function pr(n) {
  if (typeof n != "object" || n === null || is in n)
    return n;
  const e = Tu(n);
  if (e !== Su && e !== Eu)
    return n;
  var t = /* @__PURE__ */ new Map(), i = gu(n), r = /* @__PURE__ */ wn(0), s = Mi, a = (o) => {
    if (Mi === s)
      return o();
    var c = Be, l = Mi;
    Yt(null), ko(s);
    var f = o();
    return Yt(c), ko(l), f;
  };
  return i && t.set("length", /* @__PURE__ */ wn(
    /** @type {any[]} */
    n.length
  )), new Proxy(
    /** @type {any} */
    n,
    {
      defineProperty(o, c, l) {
        (!("value" in l) || l.configurable === !1 || l.enumerable === !1 || l.writable === !1) && Uu();
        var f = t.get(c);
        return f === void 0 ? a(() => {
          var d = /* @__PURE__ */ wn(l.value);
          return t.set(c, d), d;
        }) : Pn(f, l.value, !0), !0;
      },
      deleteProperty(o, c) {
        var l = t.get(c);
        if (l === void 0) {
          if (c in o) {
            const f = a(() => /* @__PURE__ */ wn(Et));
            t.set(c, f), xr(r);
          }
        } else
          Pn(l, Et), xr(r);
        return !0;
      },
      get(o, c, l) {
        if (c === is)
          return n;
        var f = t.get(c), d = c in o;
        if (f === void 0 && (!d || vr(o, c)?.writable) && (f = a(() => {
          var m = pr(d ? o[c] : Et), g = /* @__PURE__ */ wn(m);
          return g;
        }), t.set(c, f)), f !== void 0) {
          var u = Tt(f);
          return u === Et ? void 0 : u;
        }
        return Reflect.get(o, c, l);
      },
      getOwnPropertyDescriptor(o, c) {
        var l = Reflect.getOwnPropertyDescriptor(o, c);
        if (l && "value" in l) {
          var f = t.get(c);
          f && (l.value = Tt(f));
        } else if (l === void 0) {
          var d = t.get(c), u = d?.v;
          if (d !== void 0 && u !== Et)
            return {
              enumerable: !0,
              configurable: !0,
              value: u,
              writable: !0
            };
        }
        return l;
      },
      has(o, c) {
        if (c === is)
          return !0;
        var l = t.get(c), f = l !== void 0 && l.v !== Et || Reflect.has(o, c);
        if (l !== void 0 || He !== null && (!f || vr(o, c)?.writable)) {
          l === void 0 && (l = a(() => {
            var u = f ? pr(o[c]) : Et, m = /* @__PURE__ */ wn(u);
            return m;
          }), t.set(c, l));
          var d = Tt(l);
          if (d === Et)
            return !1;
        }
        return f;
      },
      set(o, c, l, f) {
        var d = t.get(c), u = c in o;
        if (i && c === "length")
          for (var m = l; m < /** @type {Source<number>} */
          d.v; m += 1) {
            var g = t.get(m + "");
            g !== void 0 ? Pn(g, Et) : m in o && (g = a(() => /* @__PURE__ */ wn(Et)), t.set(m + "", g));
          }
        if (d === void 0)
          (!u || vr(o, c)?.writable) && (d = a(() => /* @__PURE__ */ wn(void 0)), Pn(d, pr(l)), t.set(c, d));
        else {
          u = d.v !== Et;
          var M = a(() => pr(l));
          Pn(d, M);
        }
        var p = Reflect.getOwnPropertyDescriptor(o, c);
        if (p?.set && p.set.call(f, l), !u) {
          if (i && typeof c == "string") {
            var h = (
              /** @type {Source<number>} */
              t.get("length")
            ), S = Number(c);
            Number.isInteger(S) && S >= h.v && Pn(h, S + 1);
          }
          xr(r);
        }
        return !0;
      },
      ownKeys(o) {
        Tt(r);
        var c = Reflect.ownKeys(o).filter((d) => {
          var u = t.get(d);
          return u === void 0 || u.v !== Et;
        });
        for (var [l, f] of t)
          f.v !== Et && !(l in o) && c.push(l);
        return c;
      },
      setPrototypeOf() {
        Nu();
      }
    }
  );
}
var Go, cc, uc, fc;
function nf() {
  if (Go === void 0) {
    Go = window, cc = /Firefox/.test(navigator.userAgent);
    var n = Element.prototype, e = Node.prototype, t = Text.prototype;
    uc = vr(e, "firstChild").get, fc = vr(e, "nextSibling").get, Oo(n) && (n.__click = void 0, n.__className = void 0, n.__attributes = null, n.__style = void 0, n.__e = void 0), Oo(t) && (t.__t = void 0);
  }
}
function hc(n = "") {
  return document.createTextNode(n);
}
// @__NO_SIDE_EFFECTS__
function dc(n) {
  return (
    /** @type {TemplateNode | null} */
    uc.call(n)
  );
}
// @__NO_SIDE_EFFECTS__
function fo(n) {
  return (
    /** @type {TemplateNode | null} */
    fc.call(n)
  );
}
function Lr(n, e) {
  return /* @__PURE__ */ dc(n);
}
function rf(n, e = 1, t = !1) {
  let i = n;
  for (; e--; )
    i = /** @type {TemplateNode} */
    /* @__PURE__ */ fo(i);
  return i;
}
function pc(n, e, t) {
  return (
    /** @type {T extends keyof HTMLElementTagNameMap ? HTMLElementTagNameMap[T] : Element} */
    document.createElementNS(zu, n, void 0)
  );
}
function mc(n) {
  var e = Be, t = He;
  Yt(null), gn(null);
  try {
    return n();
  } finally {
    Yt(e), gn(t);
  }
}
function sf(n) {
  He === null && (Be === null && Lu(), Du()), yi && Pu();
}
function af(n, e) {
  var t = e.last;
  t === null ? e.last = e.first = n : (t.next = n, n.prev = t, e.last = n);
}
function Vn(n, e) {
  var t = He;
  t !== null && (t.f & ei) !== 0 && (n |= ei);
  var i = {
    ctx: Nt,
    deps: null,
    nodes: null,
    f: n | Ut | Xt,
    first: null,
    fn: e,
    last: null,
    next: null,
    parent: t,
    b: t && t.b,
    prev: null,
    teardown: null,
    wv: 0,
    ac: null
  }, r = i;
  if ((n & Zi) !== 0)
    Wi !== null ? Wi.push(i) : Ti.ensure().schedule(i);
  else if (e !== null) {
    try {
      ji(i);
    } catch (a) {
      throw hn(i), a;
    }
    r.deps === null && r.teardown === null && r.nodes === null && r.first === r.last && // either `null`, or a singular child
    (r.f & ir) === 0 && (r = r.first, (n & ri) !== 0 && (n & ds) !== 0 && r !== null && (r.f |= ds));
  }
  if (r !== null && (r.parent = t, t !== null && af(r, t), Be !== null && (Be.f & Mt) !== 0 && (n & Si) === 0)) {
    var s = (
      /** @type {Derived} */
      Be
    );
    (s.effects ??= []).push(r);
  }
  return i;
}
function ho() {
  return Be !== null && !tn;
}
function of(n) {
  const e = Vn(Ms, null);
  return dt(e, xt), e.teardown = n, e;
}
function lf(n) {
  sf();
  var e = (
    /** @type {Effect} */
    He.f
  ), t = !Be && (e & Fn) !== 0 && (e & Ai) === 0;
  if (t) {
    var i = (
      /** @type {ComponentContext} */
      Nt
    );
    (i.e ??= []).push(n);
  } else
    return _c(n);
}
function _c(n) {
  return Vn(Zi | wu, n);
}
function cf(n) {
  Ti.ensure();
  const e = Vn(Si | ir, n);
  return (t = {}) => new Promise((i) => {
    t.outro ? ss(e, () => {
      hn(e), i(void 0);
    }) : (hn(e), i(void 0));
  });
}
function gc(n) {
  return Vn(Zi, n);
}
function uf(n) {
  return Vn(oo | ir, n);
}
function vc(n, e = 0) {
  return Vn(Ms | e, n);
}
function ff(n, e = [], t = [], i = []) {
  Zu(i, e, t, (r) => {
    Vn(Ms, () => n(...r.map(Tt)));
  });
}
function hf(n, e = 0) {
  var t = Vn(ri | e, n);
  return t;
}
function oi(n) {
  return Vn(Fn | ir, n);
}
function xc(n) {
  var e = n.teardown;
  if (e !== null) {
    const t = yi, i = Be;
    Ho(!0), Yt(null);
    try {
      e.call(null);
    } finally {
      Ho(t), Yt(i);
    }
  }
}
function po(n, e = !1) {
  var t = n.first;
  for (n.first = n.last = null; t !== null; ) {
    const r = t.ac;
    r !== null && mc(() => {
      r.abort(Cn);
    });
    var i = t.next;
    (t.f & Si) !== 0 ? t.parent = null : hn(t, e), t = i;
  }
}
function df(n) {
  for (var e = n.first; e !== null; ) {
    var t = e.next;
    (e.f & Fn) === 0 && hn(e), e = t;
  }
}
function hn(n, e = !0) {
  var t = !1;
  (e || (n.f & Au) !== 0) && n.nodes !== null && n.nodes.end !== null && (pf(
    n.nodes.start,
    /** @type {TemplateNode} */
    n.nodes.end
  ), t = !0), dt(n, ca), po(n, e && !t), Mr(n, 0);
  var i = n.nodes && n.nodes.t;
  if (i !== null)
    for (const s of i)
      s.stop();
  xc(n), n.f ^= ca, n.f |= fn;
  var r = n.parent;
  r !== null && r.first !== null && Mc(n), n.next = n.prev = n.teardown = n.ctx = n.deps = n.fn = n.nodes = n.ac = n.b = null;
}
function pf(n, e) {
  for (; n !== null; ) {
    var t = n === e ? null : /* @__PURE__ */ fo(n);
    n.remove(), n = t;
  }
}
function Mc(n) {
  var e = n.parent, t = n.prev, i = n.next;
  t !== null && (t.next = i), i !== null && (i.prev = t), e !== null && (e.first === n && (e.first = i), e.last === n && (e.last = t));
}
function ss(n, e, t = !0) {
  var i = [];
  Sc(n, i, !0);
  var r = () => {
    t && hn(n), e && e();
  }, s = i.length;
  if (s > 0) {
    var a = () => --s || r();
    for (var o of i)
      o.out(a);
  } else
    r();
}
function Sc(n, e, t) {
  if ((n.f & ei) === 0) {
    n.f ^= ei;
    var i = n.nodes && n.nodes.t;
    if (i !== null)
      for (const o of i)
        (o.is_global || t) && e.push(o);
    for (var r = n.first; r !== null; ) {
      var s = r.next, a = (r.f & ds) !== 0 || // If this is a branch effect without a block effect parent,
      // it means the parent block effect was pruned. In that case,
      // transparency information was transferred to the branch effect.
      (r.f & Fn) !== 0 && (n.f & ri) !== 0;
      Sc(r, e, a ? t : !1), r = s;
    }
  }
}
function mf(n, e) {
  if (n.nodes)
    for (var t = n.nodes.start, i = n.nodes.end; t !== null; ) {
      var r = t === i ? null : /* @__PURE__ */ fo(t);
      e.append(t), t = r;
    }
}
let as = !1, yi = !1;
function Ho(n) {
  yi = n;
}
let Be = null, tn = !1;
function Yt(n) {
  Be = n;
}
let He = null;
function gn(n) {
  He = n;
}
let qt = null;
function Ec(n) {
  Be !== null && (qt === null ? qt = [n] : qt.push(n));
}
let Lt = null, zt = 0, Ht = null;
function _f(n) {
  Ht = n;
}
let Tc = 1, gi = 0, Mi = gi;
function ko(n) {
  Mi = n;
}
function yc() {
  return ++Tc;
}
function yr(n) {
  var e = n.f;
  if ((e & Ut) !== 0)
    return !0;
  if (e & Mt && (n.f &= ~Ei), (e & _n) !== 0) {
    for (var t = (
      /** @type {Value[]} */
      n.deps
    ), i = t.length, r = 0; r < i; r++) {
      var s = t[r];
      if (yr(
        /** @type {Derived} */
        s
      ) && sc(
        /** @type {Derived} */
        s
      ), s.wv > n.wv)
        return !0;
    }
    (e & Xt) !== 0 && // During time traveling we don't want to reset the status so that
    // traversal of the graph in the other batches still happens
    en === null && dt(n, xt);
  }
  return !1;
}
function bc(n, e, t = !0) {
  var i = n.reactions;
  if (i !== null && !(qt !== null && Ki.call(qt, n)))
    for (var r = 0; r < i.length; r++) {
      var s = i[r];
      (s.f & Mt) !== 0 ? bc(
        /** @type {Derived} */
        s,
        e,
        !1
      ) : e === s && (t ? dt(s, Ut) : (s.f & xt) !== 0 && dt(s, _n), co(
        /** @type {Effect} */
        s
      ));
    }
}
function Ac(n) {
  var e = Lt, t = zt, i = Ht, r = Be, s = qt, a = Nt, o = tn, c = Mi, l = n.f;
  Lt = /** @type {null | Value[]} */
  null, zt = 0, Ht = null, Be = (l & (Fn | Si)) === 0 ? n : null, qt = null, $i(n.ctx), tn = !1, Mi = ++gi, n.ac !== null && (mc(() => {
    n.ac.abort(Cn);
  }), n.ac = null);
  try {
    n.f |= ua;
    var f = (
      /** @type {Function} */
      n.fn
    ), d = f();
    n.f |= Ai;
    var u = n.deps, m = at?.is_fork;
    if (Lt !== null) {
      var g;
      if (m || Mr(n, zt), u !== null && zt > 0)
        for (u.length = zt + Lt.length, g = 0; g < Lt.length; g++)
          u[zt + g] = Lt[g];
      else
        n.deps = u = Lt;
      if (ho() && (n.f & Xt) !== 0)
        for (g = zt; g < u.length; g++)
          (u[g].reactions ??= []).push(n);
    } else !m && u !== null && zt < u.length && (Mr(n, zt), u.length = zt);
    if (Zl() && Ht !== null && !tn && u !== null && (n.f & (Mt | _n | Ut)) === 0)
      for (g = 0; g < /** @type {Source[]} */
      Ht.length; g++)
        bc(
          Ht[g],
          /** @type {Effect} */
          n
        );
    if (r !== null && r !== n) {
      if (gi++, r.deps !== null)
        for (let M = 0; M < t; M += 1)
          r.deps[M].rv = gi;
      if (e !== null)
        for (const M of e)
          M.rv = gi;
      Ht !== null && (i === null ? i = Ht : i.push(.../** @type {Source[]} */
      Ht));
    }
    return (n.f & ti) !== 0 && (n.f ^= ti), d;
  } catch (M) {
    return $l(M);
  } finally {
    n.f ^= ua, Lt = e, zt = t, Ht = i, Be = r, qt = s, $i(a), tn = o, Mi = c;
  }
}
function gf(n, e) {
  let t = e.reactions;
  if (t !== null) {
    var i = vu.call(t, n);
    if (i !== -1) {
      var r = t.length - 1;
      r === 0 ? t = e.reactions = null : (t[i] = t[r], t.pop());
    }
  }
  if (t === null && (e.f & Mt) !== 0 && // Destroying a child effect while updating a parent effect can cause a dependency to appear
  // to be unused, when in fact it is used by the currently-updating parent. Checking `new_deps`
  // allows us to skip the expensive work of disconnecting and immediately reconnecting it
  (Lt === null || !Ki.call(Lt, e))) {
    var s = (
      /** @type {Derived} */
      e
    );
    (s.f & Xt) !== 0 && (s.f ^= Xt, s.f &= ~Ei), lo(s), ef(s), Mr(s, 0);
  }
}
function Mr(n, e) {
  var t = n.deps;
  if (t !== null)
    for (var i = e; i < t.length; i++)
      gf(n, t[i]);
}
function ji(n) {
  var e = n.f;
  if ((e & fn) === 0) {
    dt(n, xt);
    var t = He, i = as;
    He = n, as = !0;
    try {
      (e & (ri | Xl)) !== 0 ? df(n) : po(n), xc(n);
      var r = Ac(n);
      n.teardown = typeof r == "function" ? r : null, n.wv = Tc;
      var s;
    } finally {
      as = i, He = t;
    }
  }
}
function Tt(n) {
  var e = n.f, t = (e & Mt) !== 0;
  if (Be !== null && !tn) {
    var i = He !== null && (He.f & fn) !== 0;
    if (!i && (qt === null || !Ki.call(qt, n))) {
      var r = Be.deps;
      if ((Be.f & ua) !== 0)
        n.rv < gi && (n.rv = gi, Lt === null && r !== null && r[zt] === n ? zt++ : Lt === null ? Lt = [n] : Lt.push(n));
      else {
        (Be.deps ??= []).push(n);
        var s = n.reactions;
        s === null ? n.reactions = [Be] : Ki.call(s, Be) || s.push(Be);
      }
    }
  }
  if (yi && ni.has(n))
    return ni.get(n);
  if (t) {
    var a = (
      /** @type {Derived} */
      n
    );
    if (yi) {
      var o = a.v;
      return ((a.f & xt) === 0 && a.reactions !== null || Rc(a)) && (o = uo(a)), ni.set(a, o), o;
    }
    var c = (a.f & Xt) === 0 && !tn && Be !== null && (as || (Be.f & Xt) !== 0), l = (a.f & Ai) === 0;
    yr(a) && (c && (a.f |= Xt), sc(a)), c && !l && (ac(a), wc(a));
  }
  if (en?.has(n))
    return en.get(n);
  if ((n.f & ti) !== 0)
    throw n.v;
  return n.v;
}
function wc(n) {
  if (n.f |= Xt, n.deps !== null)
    for (const e of n.deps)
      (e.reactions ??= []).push(n), (e.f & Mt) !== 0 && (e.f & Xt) === 0 && (ac(
        /** @type {Derived} */
        e
      ), wc(
        /** @type {Derived} */
        e
      ));
}
function Rc(n) {
  if (n.v === Et) return !0;
  if (n.deps === null) return !1;
  for (const e of n.deps)
    if (ni.has(e) || (e.f & Mt) !== 0 && Rc(
      /** @type {Derived} */
      e
    ))
      return !0;
  return !1;
}
function mo(n) {
  var e = tn;
  try {
    return tn = !0, n();
  } finally {
    tn = e;
  }
}
const vf = ["touchstart", "touchmove"];
function xf(n) {
  return vf.includes(n);
}
const mr = /* @__PURE__ */ Symbol("events"), Cc = /* @__PURE__ */ new Set(), da = /* @__PURE__ */ new Set();
function Mf(n, e, t) {
  (e[mr] ??= {})[n] = t;
}
function Sf(n) {
  for (var e = 0; e < n.length; e++)
    Cc.add(n[e]);
  for (var t of da)
    t(n);
}
let Wo = null;
function Xo(n) {
  var e = this, t = (
    /** @type {Node} */
    e.ownerDocument
  ), i = n.type, r = n.composedPath?.() || [], s = (
    /** @type {null | Element} */
    r[0] || n.target
  );
  Wo = n;
  var a = 0, o = Wo === n && n[mr];
  if (o) {
    var c = r.indexOf(o);
    if (c !== -1 && (e === document || e === /** @type {any} */
    window)) {
      n[mr] = e;
      return;
    }
    var l = r.indexOf(e);
    if (l === -1)
      return;
    c <= l && (a = c);
  }
  if (s = /** @type {Element} */
  r[a] || n.target, s !== e) {
    Mu(n, "currentTarget", {
      configurable: !0,
      get() {
        return s || t;
      }
    });
    var f = Be, d = He;
    Yt(null), gn(null);
    try {
      for (var u, m = []; s !== null; ) {
        var g = s.assignedSlot || s.parentNode || /** @type {any} */
        s.host || null;
        try {
          var M = s[mr]?.[i];
          M != null && (!/** @type {any} */
          s.disabled || // DOM could've been updated already by the time this is reached, so we check this as well
          // -> the target could not have been disabled because it emits the event in the first place
          n.target === s) && M.call(s, n);
        } catch (p) {
          u ? m.push(p) : u = p;
        }
        if (n.cancelBubble || g === e || g === null)
          break;
        s = g;
      }
      if (u) {
        for (let p of m)
          queueMicrotask(() => {
            throw p;
          });
        throw u;
      }
    } finally {
      n[mr] = e, delete n.currentTarget, Yt(f), gn(d);
    }
  }
}
const Ef = (
  // We gotta write it like this because after downleveling the pure comment may end up in the wrong location
  globalThis?.window?.trustedTypes && /* @__PURE__ */ globalThis.window.trustedTypes.createPolicy("svelte-trusted-html", {
    /** @param {string} html */
    createHTML: (n) => n
  })
);
function Tf(n) {
  return (
    /** @type {string} */
    Ef?.createHTML(n) ?? n
  );
}
function yf(n) {
  var e = pc("template");
  return e.innerHTML = Tf(n.replaceAll("<!>", "<!---->")), e.content;
}
function bf(n, e) {
  var t = (
    /** @type {Effect} */
    He
  );
  t.nodes === null && (t.nodes = { start: n, end: e, a: null, t: null });
}
// @__NO_SIDE_EFFECTS__
function Af(n, e) {
  var t = (e & Bu) !== 0, i, r = !n.startsWith("<!>");
  return () => {
    i === void 0 && (i = yf(r ? n : "<!>" + n), i = /** @type {TemplateNode} */
    /* @__PURE__ */ dc(i));
    var s = (
      /** @type {TemplateNode} */
      t || cc ? document.importNode(i, !0) : i.cloneNode(!0)
    );
    return bf(s, s), s;
  };
}
function wf(n, e) {
  n !== null && n.before(
    /** @type {Node} */
    e
  );
}
function Rf(n, e) {
  var t = e == null ? "" : typeof e == "object" ? `${e}` : e;
  t !== (n.__t ??= n.nodeValue) && (n.__t = t, n.nodeValue = `${t}`);
}
function Cf(n, e) {
  return Pf(n, e);
}
const Ir = /* @__PURE__ */ new Map();
function Pf(n, { target: e, anchor: t, props: i = {}, events: r, context: s, intro: a = !0, transformError: o }) {
  nf();
  var c = void 0, l = cf(() => {
    var f = t ?? e.appendChild(hc());
    Yu(
      /** @type {TemplateNode} */
      f,
      {
        pending: () => {
        }
      },
      (m) => {
        Yl({});
        var g = (
          /** @type {ComponentContext} */
          Nt
        );
        s && (g.c = s), r && (i.$$events = r), c = n(m, i) || {}, Kl();
      },
      o
    );
    var d = /* @__PURE__ */ new Set(), u = (m) => {
      for (var g = 0; g < m.length; g++) {
        var M = m[g];
        if (!d.has(M)) {
          d.add(M);
          var p = xf(M);
          for (const b of [e, document]) {
            var h = Ir.get(b);
            h === void 0 && (h = /* @__PURE__ */ new Map(), Ir.set(b, h));
            var S = h.get(M);
            S === void 0 ? (b.addEventListener(M, Xo, { passive: p }), h.set(M, 1)) : h.set(M, S + 1);
          }
        }
      }
    };
    return u(xu(Cc)), da.add(u), () => {
      for (var m of d)
        for (const p of [e, document]) {
          var g = (
            /** @type {Map<string, number>} */
            Ir.get(p)
          ), M = (
            /** @type {number} */
            g.get(m)
          );
          --M == 0 ? (p.removeEventListener(m, Xo), g.delete(m), g.size === 0 && Ir.delete(p)) : g.set(m, M);
        }
      da.delete(u), f !== t && f.parentNode?.removeChild(f);
    };
  });
  return pa.set(c, l), c;
}
let pa = /* @__PURE__ */ new WeakMap();
function Df(n, e) {
  const t = pa.get(n);
  return t ? (pa.delete(n), t(e)) : Promise.resolve();
}
function Lf(n, e) {
  gc(() => {
    var t = n.getRootNode(), i = (
      /** @type {ShadowRoot} */
      t.host ? (
        /** @type {ShadowRoot} */
        t
      ) : (
        /** @type {Document} */
        t.head ?? /** @type {Document} */
        t.ownerDocument.head
      )
    );
    if (!i.querySelector("#" + e.hash)) {
      const r = pc("style");
      r.id = e.hash, r.textContent = e.code, i.appendChild(r);
    }
  });
}
const qo = [...` 	
\r\f \v\uFEFF`];
function If(n, e, t) {
  var i = n == null ? "" : "" + n;
  if (t) {
    for (var r of Object.keys(t))
      if (t[r])
        i = i ? i + " " + r : r;
      else if (i.length)
        for (var s = r.length, a = 0; (a = i.indexOf(r, a)) >= 0; ) {
          var o = a + s;
          (a === 0 || qo.includes(i[a - 1])) && (o === i.length || qo.includes(i[o])) ? i = (a === 0 ? "" : i.substring(0, a)) + i.substring(o + 1) : a = o;
        }
  }
  return i === "" ? null : i;
}
function Yo(n, e, t, i, r, s) {
  var a = n.__className;
  if (a !== t || a === void 0) {
    var o = If(t, i, s);
    o == null ? n.removeAttribute("class") : n.className = o, n.__className = t;
  } else if (s && r !== s)
    for (var c in s) {
      var l = !!s[c];
      (r == null || l !== !!r[c]) && n.classList.toggle(c, l);
    }
  return s;
}
function Ko(n, e) {
  return n === e || n?.[is] === e;
}
function Uf(n = {}, e, t, i) {
  var r = (
    /** @type {ComponentContext} */
    Nt.r
  ), s = (
    /** @type {Effect} */
    He
  );
  return gc(() => {
    var a, o;
    return vc(() => {
      a = o, o = [], mo(() => {
        n !== t(...o) && (e(n, ...o), a && Ko(t(...a), n) && e(null, ...a));
      });
    }), () => {
      let c = s;
      for (; c !== r && c.parent !== null && c.parent.f & ca; )
        c = c.parent;
      const l = () => {
        o && Ko(t(...o), n) && e(null, ...o);
      }, f = c.teardown;
      c.teardown = () => {
        l(), f?.();
      };
    };
  }), n;
}
function Nf(n) {
  Nt === null && Ru(), lf(() => {
    const e = mo(n);
    if (typeof e == "function") return (
      /** @type {() => void} */
      e
    );
  });
}
const Ff = "5";
typeof window < "u" && ((window.__svelte ??= {}).v ??= /* @__PURE__ */ new Set()).add(Ff);
const _o = "183", Of = 0, Zo = 1, Bf = 2, os = 1, zf = 2, _r = 3, ii = 0, It = 1, Dn = 2, In = 0, qi = 1, $o = 2, jo = 3, Jo = 4, Vf = 5, mi = 100, Gf = 101, Hf = 102, kf = 103, Wf = 104, Xf = 200, qf = 201, Yf = 202, Kf = 203, ma = 204, _a = 205, Zf = 206, $f = 207, jf = 208, Jf = 209, Qf = 210, eh = 211, th = 212, nh = 213, ih = 214, ga = 0, va = 1, xa = 2, Ji = 3, Ma = 4, Sa = 5, Ea = 6, Ta = 7, Pc = 0, rh = 1, sh = 2, dn = 0, Dc = 1, Lc = 2, Ic = 3, Uc = 4, Nc = 5, Fc = 6, Oc = 7, Bc = 300, bi = 301, Qi = 302, Cs = 303, Ps = 304, Es = 306, ya = 1e3, Ln = 1001, ba = 1002, yt = 1003, ah = 1004, Ur = 1005, Rt = 1006, Ds = 1007, vi = 1008, Wt = 1009, zc = 1010, Vc = 1011, Sr = 1012, go = 1013, vn = 1014, cn = 1015, On = 1016, vo = 1017, xo = 1018, Er = 1020, Gc = 35902, Hc = 35899, kc = 1021, Wc = 1022, nn = 1023, Bn = 1026, xi = 1027, Xc = 1028, Mo = 1029, er = 1030, So = 1031, Eo = 1033, ls = 33776, cs = 33777, us = 33778, fs = 33779, Aa = 35840, wa = 35841, Ra = 35842, Ca = 35843, Pa = 36196, Da = 37492, La = 37496, Ia = 37488, Ua = 37489, Na = 37490, Fa = 37491, Oa = 37808, Ba = 37809, za = 37810, Va = 37811, Ga = 37812, Ha = 37813, ka = 37814, Wa = 37815, Xa = 37816, qa = 37817, Ya = 37818, Ka = 37819, Za = 37820, $a = 37821, ja = 36492, Ja = 36494, Qa = 36495, eo = 36283, to = 36284, no = 36285, io = 36286, oh = 3200, lh = 0, ch = 1, jn = "", kt = "srgb", tr = "srgb-linear", _s = "linear", Ke = "srgb", Ci = 7680, Qo = 519, uh = 512, fh = 513, hh = 514, To = 515, dh = 516, ph = 517, yo = 518, mh = 519, el = 35044, tl = "300 es", un = 2e3, gs = 2001;
function _h(n) {
  for (let e = n.length - 1; e >= 0; --e)
    if (n[e] >= 65535) return !0;
  return !1;
}
function vs(n) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", n);
}
function gh() {
  const n = vs("canvas");
  return n.style.display = "block", n;
}
const nl = {};
function il(...n) {
  const e = "THREE." + n.shift();
  console.log(e, ...n);
}
function qc(n) {
  const e = n[0];
  if (typeof e == "string" && e.startsWith("TSL:")) {
    const t = n[1];
    t && t.isStackTrace ? n[0] += " " + t.getLocation() : n[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return n;
}
function Ce(...n) {
  n = qc(n);
  const e = "THREE." + n.shift();
  {
    const t = n[0];
    t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...n);
  }
}
function We(...n) {
  n = qc(n);
  const e = "THREE." + n.shift();
  {
    const t = n[0];
    t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...n);
  }
}
function xs(...n) {
  const e = n.join(" ");
  e in nl || (nl[e] = !0, Ce(...n));
}
function vh(n, e, t) {
  return new Promise(function(i, r) {
    function s() {
      switch (n.clientWaitSync(e, n.SYNC_FLUSH_COMMANDS_BIT, 0)) {
        case n.WAIT_FAILED:
          r();
          break;
        case n.TIMEOUT_EXPIRED:
          setTimeout(s, t);
          break;
        default:
          i();
      }
    }
    setTimeout(s, t);
  });
}
const xh = {
  [ga]: va,
  [xa]: Ea,
  [Ma]: Ta,
  [Ji]: Sa,
  [va]: ga,
  [Ea]: xa,
  [Ta]: Ma,
  [Sa]: Ji
};
class rr {
  /**
   * Adds the given event listener to the given event type.
   *
   * @param {string} type - The type of event to listen to.
   * @param {Function} listener - The function that gets called when the event is fired.
   */
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const i = this._listeners;
    i[e] === void 0 && (i[e] = []), i[e].indexOf(t) === -1 && i[e].push(t);
  }
  /**
   * Returns `true` if the given event listener has been added to the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to check.
   * @return {boolean} Whether the given event listener has been added to the given event type.
   */
  hasEventListener(e, t) {
    const i = this._listeners;
    return i === void 0 ? !1 : i[e] !== void 0 && i[e].indexOf(t) !== -1;
  }
  /**
   * Removes the given event listener from the given event type.
   *
   * @param {string} type - The type of event.
   * @param {Function} listener - The listener to remove.
   */
  removeEventListener(e, t) {
    const i = this._listeners;
    if (i === void 0) return;
    const r = i[e];
    if (r !== void 0) {
      const s = r.indexOf(t);
      s !== -1 && r.splice(s, 1);
    }
  }
  /**
   * Dispatches an event object.
   *
   * @param {Object} event - The event that gets fired.
   */
  dispatchEvent(e) {
    const t = this._listeners;
    if (t === void 0) return;
    const i = t[e.type];
    if (i !== void 0) {
      e.target = this;
      const r = i.slice(0);
      for (let s = 0, a = r.length; s < a; s++)
        r[s].call(this, e);
      e.target = null;
    }
  }
}
const At = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Ls = Math.PI / 180, ro = 180 / Math.PI;
function br() {
  const n = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, i = Math.random() * 4294967295 | 0;
  return (At[n & 255] + At[n >> 8 & 255] + At[n >> 16 & 255] + At[n >> 24 & 255] + "-" + At[e & 255] + At[e >> 8 & 255] + "-" + At[e >> 16 & 15 | 64] + At[e >> 24 & 255] + "-" + At[t & 63 | 128] + At[t >> 8 & 255] + "-" + At[t >> 16 & 255] + At[t >> 24 & 255] + At[i & 255] + At[i >> 8 & 255] + At[i >> 16 & 255] + At[i >> 24 & 255]).toLowerCase();
}
function ze(n, e, t) {
  return Math.max(e, Math.min(t, n));
}
function Mh(n, e) {
  return (n % e + e) % e;
}
function Is(n, e, t) {
  return (1 - t) * n + t * e;
}
function or(n, e) {
  switch (e.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return n / 4294967295;
    case Uint16Array:
      return n / 65535;
    case Uint8Array:
      return n / 255;
    case Int32Array:
      return Math.max(n / 2147483647, -1);
    case Int16Array:
      return Math.max(n / 32767, -1);
    case Int8Array:
      return Math.max(n / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function Dt(n, e) {
  switch (e.constructor) {
    case Float32Array:
      return n;
    case Uint32Array:
      return Math.round(n * 4294967295);
    case Uint16Array:
      return Math.round(n * 65535);
    case Uint8Array:
      return Math.round(n * 255);
    case Int32Array:
      return Math.round(n * 2147483647);
    case Int16Array:
      return Math.round(n * 32767);
    case Int8Array:
      return Math.round(n * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class Ze {
  /**
   * Constructs a new 2D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   */
  constructor(e = 0, t = 0) {
    Ze.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  /**
   * Alias for {@link Vector2#x}.
   *
   * @type {number}
   */
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  /**
   * Alias for {@link Vector2#y}.
   *
   * @type {number}
   */
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @return {Vector2} A reference to this vector.
   */
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector2} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @param {number} value - The value to set.
   * @return {Vector2} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector2} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector2} v - The vector to copy.
   * @return {Vector2} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector2} v - The vector to add.
   * @return {Vector2} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector2} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector2} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector2} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector2} v - The vector to subtract.
   * @return {Vector2} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector2} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector2} a - The first vector.
   * @param {Vector2} b - The second vector.
   * @return {Vector2} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector2} v - The vector to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector2} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector2} v - The vector to divide.
   * @return {Vector2} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector2} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Multiplies this vector (with an implicit 1 as the 3rd component) by
   * the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {Vector2} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, i = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * i + r[6], this.y = r[1] * t + r[4] * i + r[7], this;
  }
  /**
   * If this vector's x or y value is greater than the given vector's x or y
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is less than the given vector's x or y
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector2} v - The vector.
   * @return {Vector2} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  /**
   * If this vector's x or y value is greater than the max vector's x or y
   * value, it is replaced by the corresponding value.
   * If this vector's x or y value is less than the min vector's x or y value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector2} min - The minimum x and y values.
   * @param {Vector2} max - The maximum x and y values in the desired range.
   * @return {Vector2} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = ze(this.x, e.x, t.x), this.y = ze(this.y, e.y, t.y), this;
  }
  /**
   * If this vector's x or y values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x or y values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = ze(this.x, e, t), this.y = ze(this.y, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector2} A reference to this vector.
   */
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(ze(i, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector2} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector2} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x and y = -y.
   *
   * @return {Vector2} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector2} v - The vector to compute the cross product with.
   * @return {number} The result of the cross product.
   */
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0) to (x, y). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0) to (x, y).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Computes the angle in radians of this vector with respect to the positive x-axis.
   *
   * @return {number} The angle in radians.
   */
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector2} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const i = this.dot(e) / t;
    return Math.acos(ze(i, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector2} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, i = this.y - e.y;
    return t * t + i * i;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector2} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector2} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector2} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector2} v1 - The first vector.
   * @param {Vector2} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector2} A reference to this vector.
   */
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector2} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]` and y
   * value to be `array[ offset + 1 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector2} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector2} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  /**
   * Rotates this vector around the given center by the given angle.
   *
   * @param {Vector2} center - The point around which to rotate.
   * @param {number} angle - The angle to rotate, in radians.
   * @return {Vector2} A reference to this vector.
   */
  rotateAround(e, t) {
    const i = Math.cos(t), r = Math.sin(t), s = this.x - e.x, a = this.y - e.y;
    return this.x = s * i - a * r + e.x, this.y = s * r + a * i + e.y, this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector2} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class sr {
  /**
   * Constructs a new quaternion.
   *
   * @param {number} [x=0] - The x value of this quaternion.
   * @param {number} [y=0] - The y value of this quaternion.
   * @param {number} [z=0] - The z value of this quaternion.
   * @param {number} [w=1] - The w value of this quaternion.
   */
  constructor(e = 0, t = 0, i = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = i, this._w = r;
  }
  /**
   * Interpolates between two quaternions via SLERP. This implementation assumes the
   * quaternion data are managed in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @see {@link Quaternion#slerp}
   */
  static slerpFlat(e, t, i, r, s, a, o) {
    let c = i[r + 0], l = i[r + 1], f = i[r + 2], d = i[r + 3], u = s[a + 0], m = s[a + 1], g = s[a + 2], M = s[a + 3];
    if (d !== M || c !== u || l !== m || f !== g) {
      let p = c * u + l * m + f * g + d * M;
      p < 0 && (u = -u, m = -m, g = -g, M = -M, p = -p);
      let h = 1 - o;
      if (p < 0.9995) {
        const S = Math.acos(p), b = Math.sin(S);
        h = Math.sin(h * S) / b, o = Math.sin(o * S) / b, c = c * h + u * o, l = l * h + m * o, f = f * h + g * o, d = d * h + M * o;
      } else {
        c = c * h + u * o, l = l * h + m * o, f = f * h + g * o, d = d * h + M * o;
        const S = 1 / Math.sqrt(c * c + l * l + f * f + d * d);
        c *= S, l *= S, f *= S, d *= S;
      }
    }
    e[t] = c, e[t + 1] = l, e[t + 2] = f, e[t + 3] = d;
  }
  /**
   * Multiplies two quaternions. This implementation assumes the quaternion data are managed
   * in flat arrays.
   *
   * @param {Array<number>} dst - The destination array.
   * @param {number} dstOffset - An offset into the destination array.
   * @param {Array<number>} src0 - The source array of the first quaternion.
   * @param {number} srcOffset0 - An offset into the first source array.
   * @param {Array<number>} src1 -  The source array of the second quaternion.
   * @param {number} srcOffset1 - An offset into the second source array.
   * @return {Array<number>} The destination array.
   * @see {@link Quaternion#multiplyQuaternions}.
   */
  static multiplyQuaternionsFlat(e, t, i, r, s, a) {
    const o = i[r], c = i[r + 1], l = i[r + 2], f = i[r + 3], d = s[a], u = s[a + 1], m = s[a + 2], g = s[a + 3];
    return e[t] = o * g + f * d + c * m - l * u, e[t + 1] = c * g + f * u + l * d - o * m, e[t + 2] = l * g + f * m + o * u - c * d, e[t + 3] = f * g - o * d - c * u - l * m, e;
  }
  /**
   * The x value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The y value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The z value of this quaternion.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * The w value of this quaternion.
   *
   * @type {number}
   * @default 1
   */
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  /**
   * Sets the quaternion components.
   *
   * @param {number} x - The x value of this quaternion.
   * @param {number} y - The y value of this quaternion.
   * @param {number} z - The z value of this quaternion.
   * @param {number} w - The w value of this quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  set(e, t, i, r) {
    return this._x = e, this._y = t, this._z = i, this._w = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new quaternion with copied values from this instance.
   *
   * @return {Quaternion} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  /**
   * Copies the values of the given quaternion to this instance.
   *
   * @param {Quaternion} quaternion - The quaternion to copy.
   * @return {Quaternion} A reference to this quaternion.
   */
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the rotation specified by the given
   * Euler angles.
   *
   * @param {Euler} euler - The Euler angles.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromEuler(e, t = !0) {
    const i = e._x, r = e._y, s = e._z, a = e._order, o = Math.cos, c = Math.sin, l = o(i / 2), f = o(r / 2), d = o(s / 2), u = c(i / 2), m = c(r / 2), g = c(s / 2);
    switch (a) {
      case "XYZ":
        this._x = u * f * d + l * m * g, this._y = l * m * d - u * f * g, this._z = l * f * g + u * m * d, this._w = l * f * d - u * m * g;
        break;
      case "YXZ":
        this._x = u * f * d + l * m * g, this._y = l * m * d - u * f * g, this._z = l * f * g - u * m * d, this._w = l * f * d + u * m * g;
        break;
      case "ZXY":
        this._x = u * f * d - l * m * g, this._y = l * m * d + u * f * g, this._z = l * f * g + u * m * d, this._w = l * f * d - u * m * g;
        break;
      case "ZYX":
        this._x = u * f * d - l * m * g, this._y = l * m * d + u * f * g, this._z = l * f * g - u * m * d, this._w = l * f * d + u * m * g;
        break;
      case "YZX":
        this._x = u * f * d + l * m * g, this._y = l * m * d + u * f * g, this._z = l * f * g - u * m * d, this._w = l * f * d - u * m * g;
        break;
      case "XZY":
        this._x = u * f * d - l * m * g, this._y = l * m * d - u * f * g, this._z = l * f * g + u * m * d, this._w = l * f * d + u * m * g;
        break;
      default:
        Ce("Quaternion: .setFromEuler() encountered an unknown order: " + a);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given axis and angle.
   *
   * @param {Vector3} axis - The normalized axis.
   * @param {number} angle - The angle in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromAxisAngle(e, t) {
    const i = t / 2, r = Math.sin(i);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(i), this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion from the given rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromRotationMatrix(e) {
    const t = e.elements, i = t[0], r = t[4], s = t[8], a = t[1], o = t[5], c = t[9], l = t[2], f = t[6], d = t[10], u = i + o + d;
    if (u > 0) {
      const m = 0.5 / Math.sqrt(u + 1);
      this._w = 0.25 / m, this._x = (f - c) * m, this._y = (s - l) * m, this._z = (a - r) * m;
    } else if (i > o && i > d) {
      const m = 2 * Math.sqrt(1 + i - o - d);
      this._w = (f - c) / m, this._x = 0.25 * m, this._y = (r + a) / m, this._z = (s + l) / m;
    } else if (o > d) {
      const m = 2 * Math.sqrt(1 + o - i - d);
      this._w = (s - l) / m, this._x = (r + a) / m, this._y = 0.25 * m, this._z = (c + f) / m;
    } else {
      const m = 2 * Math.sqrt(1 + d - i - o);
      this._w = (a - r) / m, this._x = (s + l) / m, this._y = (c + f) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  /**
   * Sets this quaternion to the rotation required to rotate the direction vector
   * `vFrom` to the direction vector `vTo`.
   *
   * @param {Vector3} vFrom - The first (normalized) direction vector.
   * @param {Vector3} vTo - The second (normalized) direction vector.
   * @return {Quaternion} A reference to this quaternion.
   */
  setFromUnitVectors(e, t) {
    let i = e.dot(t) + 1;
    return i < 1e-8 ? (i = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = i) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = i)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = i), this.normalize();
  }
  /**
   * Returns the angle between this quaternion and the given one in radians.
   *
   * @param {Quaternion} q - The quaternion to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    return 2 * Math.acos(Math.abs(ze(this.dot(e), -1, 1)));
  }
  /**
   * Rotates this quaternion by a given angular step to the given quaternion.
   * The method ensures that the final quaternion will not overshoot `q`.
   *
   * @param {Quaternion} q - The target quaternion.
   * @param {number} step - The angular step in radians.
   * @return {Quaternion} A reference to this quaternion.
   */
  rotateTowards(e, t) {
    const i = this.angleTo(e);
    if (i === 0) return this;
    const r = Math.min(1, t / i);
    return this.slerp(e, r), this;
  }
  /**
   * Sets this quaternion to the identity quaternion; that is, to the
   * quaternion that represents "no rotation".
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  identity() {
    return this.set(0, 0, 0, 1);
  }
  /**
   * Inverts this quaternion via {@link Quaternion#conjugate}. The
   * quaternion is assumed to have unit length.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  invert() {
    return this.conjugate();
  }
  /**
   * Returns the rotational conjugate of this quaternion. The conjugate of a
   * quaternion represents the same rotation in the opposite direction about
   * the rotational axis.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  /**
   * Calculates the dot product of this quaternion and the given one.
   *
   * @param {Quaternion} v - The quaternion to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  /**
   * Computes the squared Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector. This can be useful if you are comparing the
   * lengths of two quaternions, as this is a slightly more efficient calculation than
   * {@link Quaternion#length}.
   *
   * @return {number} The squared Euclidean length.
   */
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  /**
   * Computes the Euclidean length (straight-line length) of this quaternion,
   * considered as a 4 dimensional vector.
   *
   * @return {number} The Euclidean length.
   */
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  /**
   * Normalizes this quaternion - that is, calculated the quaternion that performs
   * the same rotation as this one, but has a length equal to `1`.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  /**
   * Multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  /**
   * Pre-multiplies this quaternion by the given one.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  /**
   * Multiplies the given quaternions and stores the result in this instance.
   *
   * @param {Quaternion} a - The first quaternion.
   * @param {Quaternion} b - The second quaternion.
   * @return {Quaternion} A reference to this quaternion.
   */
  multiplyQuaternions(e, t) {
    const i = e._x, r = e._y, s = e._z, a = e._w, o = t._x, c = t._y, l = t._z, f = t._w;
    return this._x = i * f + a * o + r * l - s * c, this._y = r * f + a * c + s * o - i * l, this._z = s * f + a * l + i * c - r * o, this._w = a * f - i * o - r * c - s * l, this._onChangeCallback(), this;
  }
  /**
   * Performs a spherical linear interpolation between this quaternion and the target quaternion.
   *
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor. A value in the range `[0,1]` will interpolate. A value outside the range `[0,1]` will extrapolate.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerp(e, t) {
    let i = e._x, r = e._y, s = e._z, a = e._w, o = this.dot(e);
    o < 0 && (i = -i, r = -r, s = -s, a = -a, o = -o);
    let c = 1 - t;
    if (o < 0.9995) {
      const l = Math.acos(o), f = Math.sin(l);
      c = Math.sin(c * l) / f, t = Math.sin(t * l) / f, this._x = this._x * c + i * t, this._y = this._y * c + r * t, this._z = this._z * c + s * t, this._w = this._w * c + a * t, this._onChangeCallback();
    } else
      this._x = this._x * c + i * t, this._y = this._y * c + r * t, this._z = this._z * c + s * t, this._w = this._w * c + a * t, this.normalize();
    return this;
  }
  /**
   * Performs a spherical linear interpolation between the given quaternions
   * and stores the result in this quaternion.
   *
   * @param {Quaternion} qa - The source quaternion.
   * @param {Quaternion} qb - The target quaternion.
   * @param {number} t - The interpolation factor in the closed interval `[0, 1]`.
   * @return {Quaternion} A reference to this quaternion.
   */
  slerpQuaternions(e, t, i) {
    return this.copy(e).slerp(t, i);
  }
  /**
   * Sets this quaternion to a uniformly random, normalized quaternion.
   *
   * @return {Quaternion} A reference to this quaternion.
   */
  random() {
    const e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), i = Math.random(), r = Math.sqrt(1 - i), s = Math.sqrt(i);
    return this.set(
      r * Math.sin(e),
      r * Math.cos(e),
      s * Math.sin(t),
      s * Math.cos(t)
    );
  }
  /**
   * Returns `true` if this quaternion is equal with the given one.
   *
   * @param {Quaternion} quaternion - The quaternion to test for equality.
   * @return {boolean} Whether this quaternion is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  /**
   * Sets this quaternion's components from the given array.
   *
   * @param {Array<number>} array - An array holding the quaternion component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this quaternion to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the quaternion components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The quaternion components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  /**
   * Sets the components of this quaternion from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding quaternion data.
   * @param {number} index - The index into the attribute.
   * @return {Quaternion} A reference to this quaternion.
   */
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the
   * numerical elements of this quaternion in an array of format `[x, y, z, w]`.
   *
   * @return {Array<number>} The serialized quaternion.
   */
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class B {
  /**
   * Constructs a new 3D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   */
  constructor(e = 0, t = 0, i = 0) {
    B.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = i;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @return {Vector3} A reference to this vector.
   */
  set(e, t, i) {
    return i === void 0 && (i = this.z), this.x = e, this.y = t, this.z = i, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector3} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  /**
   * Sets the vector's x component to the given value.
   *
   * @param {number} x - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value.
   *
   * @param {number} y - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value.
   *
   * @param {number} z - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @param {number} value - The value to set.
   * @return {Vector3} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y, `2` equals to z.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector3} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3} v - The vector to copy.
   * @return {Vector3} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector3} v - The vector to add.
   * @return {Vector3} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector3} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector3|Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector3} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector3} v - The vector to subtract.
   * @return {Vector3} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector3} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector3} v - The vector to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector3} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  /**
   * Multiplies the given vectors and stores the result in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  /**
   * Applies the given Euler rotation to this vector.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Vector3} A reference to this vector.
   */
  applyEuler(e) {
    return this.applyQuaternion(rl.setFromEuler(e));
  }
  /**
   * Applies a rotation specified by an axis and an angle to this vector.
   *
   * @param {Vector3} axis - A normalized vector representing the rotation axis.
   * @param {number} angle - The angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  applyAxisAngle(e, t) {
    return this.applyQuaternion(rl.setFromAxisAngle(e, t));
  }
  /**
   * Multiplies this vector with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix3(e) {
    const t = this.x, i = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[3] * i + s[6] * r, this.y = s[1] * t + s[4] * i + s[7] * r, this.z = s[2] * t + s[5] * i + s[8] * r, this;
  }
  /**
   * Multiplies this vector by the given normal matrix and normalizes
   * the result.
   *
   * @param {Matrix3} m - The normal matrix.
   * @return {Vector3} A reference to this vector.
   */
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  /**
   * Multiplies this vector (with an implicit 1 in the 4th dimension) by m, and
   * divides by perspective.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {Vector3} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, i = this.y, r = this.z, s = e.elements, a = 1 / (s[3] * t + s[7] * i + s[11] * r + s[15]);
    return this.x = (s[0] * t + s[4] * i + s[8] * r + s[12]) * a, this.y = (s[1] * t + s[5] * i + s[9] * r + s[13]) * a, this.z = (s[2] * t + s[6] * i + s[10] * r + s[14]) * a, this;
  }
  /**
   * Applies the given Quaternion to this vector.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Vector3} A reference to this vector.
   */
  applyQuaternion(e) {
    const t = this.x, i = this.y, r = this.z, s = e.x, a = e.y, o = e.z, c = e.w, l = 2 * (a * r - o * i), f = 2 * (o * t - s * r), d = 2 * (s * i - a * t);
    return this.x = t + c * l + a * d - o * f, this.y = i + c * f + o * l - s * d, this.z = r + c * d + s * f - a * l, this;
  }
  /**
   * Projects this vector from world space into the camera's normalized
   * device coordinate (NDC) space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  /**
   * Unprojects this vector from the camera's normalized device coordinate (NDC)
   * space into world space.
   *
   * @param {Camera} camera - The camera.
   * @return {Vector3} A reference to this vector.
   */
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  /**
   * Transforms the direction of this vector by a matrix (the upper left 3 x 3
   * subset of the given 4x4 matrix and then normalizes the result.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Vector3} A reference to this vector.
   */
  transformDirection(e) {
    const t = this.x, i = this.y, r = this.z, s = e.elements;
    return this.x = s[0] * t + s[4] * i + s[8] * r, this.y = s[1] * t + s[5] * i + s[9] * r, this.z = s[2] * t + s[6] * i + s[10] * r, this.normalize();
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector3} v - The vector to divide.
   * @return {Vector3} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector3} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * If this vector's x, y or z value is greater than the given vector's x, y or z
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is less than the given vector's x, y or z
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector3} v - The vector.
   * @return {Vector3} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  /**
   * If this vector's x, y or z value is greater than the max vector's x, y or z
   * value, it is replaced by the corresponding value.
   * If this vector's x, y or z value is less than the min vector's x, y or z value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector3} min - The minimum x, y and z values.
   * @param {Vector3} max - The maximum x, y and z values in the desired range.
   * @return {Vector3} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = ze(this.x, e.x, t.x), this.y = ze(this.y, e.y, t.y), this.z = ze(this.z, e.z, t.z), this;
  }
  /**
   * If this vector's x, y or z values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y or z values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = ze(this.x, e, t), this.y = ze(this.y, e, t), this.z = ze(this.z, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector3} A reference to this vector.
   */
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(ze(i, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector3} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector3} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y and z = -z.
   *
   * @return {Vector3} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0) to (x, y, z). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0) to (x, y, z).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector3} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector3} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector3} v1 - The first vector.
   * @param {Vector3} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector3} A reference to this vector.
   */
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this;
  }
  /**
   * Calculates the cross product of the given vector with this instance.
   *
   * @param {Vector3} v - The vector to compute the cross product with.
   * @return {Vector3} The result of the cross product.
   */
  cross(e) {
    return this.crossVectors(this, e);
  }
  /**
   * Calculates the cross product of the given vectors and stores the result
   * in this instance.
   *
   * @param {Vector3} a - The first vector.
   * @param {Vector3} b - The second vector.
   * @return {Vector3} A reference to this vector.
   */
  crossVectors(e, t) {
    const i = e.x, r = e.y, s = e.z, a = t.x, o = t.y, c = t.z;
    return this.x = r * c - s * o, this.y = s * a - i * c, this.z = i * o - r * a, this;
  }
  /**
   * Projects this vector onto the given one.
   *
   * @param {Vector3} v - The vector to project to.
   * @return {Vector3} A reference to this vector.
   */
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const i = e.dot(this) / t;
    return this.copy(e).multiplyScalar(i);
  }
  /**
   * Projects this vector onto a plane by subtracting this
   * vector projected onto the plane's normal from this vector.
   *
   * @param {Vector3} planeNormal - The plane normal.
   * @return {Vector3} A reference to this vector.
   */
  projectOnPlane(e) {
    return Us.copy(this).projectOnVector(e), this.sub(Us);
  }
  /**
   * Reflects this vector off a plane orthogonal to the given normal vector.
   *
   * @param {Vector3} normal - The (normalized) normal vector.
   * @return {Vector3} A reference to this vector.
   */
  reflect(e) {
    return this.sub(Us.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  /**
   * Returns the angle between the given vector and this instance in radians.
   *
   * @param {Vector3} v - The vector to compute the angle with.
   * @return {number} The angle in radians.
   */
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const i = this.dot(e) / t;
    return Math.acos(ze(i, -1, 1));
  }
  /**
   * Computes the distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the distance to.
   * @return {number} The distance.
   */
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  /**
   * Computes the squared distance from the given vector to this instance.
   * If you are just comparing the distance with another distance, you should compare
   * the distance squared instead as it is slightly more efficient to calculate.
   *
   * @param {Vector3} v - The vector to compute the squared distance to.
   * @return {number} The squared distance.
   */
  distanceToSquared(e) {
    const t = this.x - e.x, i = this.y - e.y, r = this.z - e.z;
    return t * t + i * i + r * r;
  }
  /**
   * Computes the Manhattan distance from the given vector to this instance.
   *
   * @param {Vector3} v - The vector to compute the Manhattan distance to.
   * @return {number} The Manhattan distance.
   */
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {Spherical} s - The spherical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  /**
   * Sets the vector components from the given spherical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} phi - The phi angle in radians.
   * @param {number} theta - The theta angle in radians.
   * @return {Vector3} A reference to this vector.
   */
  setFromSphericalCoords(e, t, i) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(i), this.y = Math.cos(t) * e, this.z = r * Math.cos(i), this;
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {Cylindrical} c - The cylindrical coordinates.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  /**
   * Sets the vector components from the given cylindrical coordinates.
   *
   * @param {number} radius - The radius.
   * @param {number} theta - The theta angle in radians.
   * @param {number} y - The y value.
   * @return {Vector3} A reference to this vector.
   */
  setFromCylindricalCoords(e, t, i) {
    return this.x = e * Math.sin(t), this.y = i, this.z = e * Math.cos(t), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  /**
   * Sets the vector components to the scale elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), i = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = i, this.z = r, this;
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  /**
   * Sets the vector components from the specified matrix column.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @param {number} index - The column index.
   * @return {Vector3} A reference to this vector.
   */
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  /**
   * Sets the vector components from the given Euler angles.
   *
   * @param {Euler} e - The Euler angles to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  /**
   * Sets the vector components from the RGB components of the
   * given color.
   *
   * @param {Color} c - The color to set.
   * @return {Vector3} A reference to this vector.
   */
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector3} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`
   * and z value to be `array[ offset + 2 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector3} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector3} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector3} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  /**
   * Sets this vector to a uniformly random point on a unit sphere.
   *
   * @return {Vector3} A reference to this vector.
   */
  randomDirection() {
    const e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, i = Math.sqrt(1 - t * t);
    return this.x = i * Math.cos(e), this.y = t, this.z = i * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Us = /* @__PURE__ */ new B(), rl = /* @__PURE__ */ new sr();
class Le {
  /**
   * Constructs a new 3x3 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   */
  constructor(e, t, i, r, s, a, o, c, l) {
    Le.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, i, r, s, a, o, c, l);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @return {Matrix3} A reference to this matrix.
   */
  set(e, t, i, r, s, a, o, c, l) {
    const f = this.elements;
    return f[0] = e, f[1] = r, f[2] = o, f[3] = t, f[4] = s, f[5] = c, f[6] = i, f[7] = a, f[8] = l, this;
  }
  /**
   * Sets this matrix to the 3x3 identity matrix.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix3} m - The matrix to copy.
   * @return {Matrix3} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, i = e.elements;
    return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix3} A reference to this matrix.
   */
  extractBasis(e, t, i) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), i.setFromMatrix3Column(this, 2), this;
  }
  /**
   * Set this matrix to the upper 3x3 matrix of the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  /**
   * Post-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix to multiply with.
   * @return {Matrix3} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 3x3 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix3} a - The first matrix.
   * @param {Matrix3} b - The second matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const i = e.elements, r = t.elements, s = this.elements, a = i[0], o = i[3], c = i[6], l = i[1], f = i[4], d = i[7], u = i[2], m = i[5], g = i[8], M = r[0], p = r[3], h = r[6], S = r[1], b = r[4], y = r[7], C = r[2], A = r[5], D = r[8];
    return s[0] = a * M + o * S + c * C, s[3] = a * p + o * b + c * A, s[6] = a * h + o * y + c * D, s[1] = l * M + f * S + d * C, s[4] = l * p + f * b + d * A, s[7] = l * h + f * y + d * D, s[2] = u * M + m * S + g * C, s[5] = u * p + m * b + g * A, s[8] = u * h + m * y + g * D, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix3} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], i = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], f = e[8];
    return t * a * f - t * o * l - i * s * f + i * o * c + r * s * l - r * a * c;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], i = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], f = e[8], d = f * a - o * l, u = o * c - f * s, m = l * s - a * c, g = t * d + i * u + r * m;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const M = 1 / g;
    return e[0] = d * M, e[1] = (r * l - f * i) * M, e[2] = (o * i - r * a) * M, e[3] = u * M, e[4] = (f * t - r * c) * M, e[5] = (r * s - o * t) * M, e[6] = m * M, e[7] = (i * c - l * t) * M, e[8] = (a * t - i * s) * M, this;
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix3} A reference to this matrix.
   */
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  /**
   * Computes the normal matrix which is the inverse transpose of the upper
   * left 3x3 portion of the given 4x4 matrix.
   *
   * @param {Matrix4} matrix4 - The 4x4 matrix.
   * @return {Matrix3} A reference to this matrix.
   */
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  /**
   * Transposes this matrix into the supplied array, and returns itself unchanged.
   *
   * @param {Array<number>} r - An array to store the transposed matrix elements.
   * @return {Matrix3} A reference to this matrix.
   */
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  /**
   * Sets the UV transform matrix from offset, repeat, rotation, and center.
   *
   * @param {number} tx - Offset x.
   * @param {number} ty - Offset y.
   * @param {number} sx - Repeat x.
   * @param {number} sy - Repeat y.
   * @param {number} rotation - Rotation, in radians. Positive values rotate counterclockwise.
   * @param {number} cx - Center x of rotation.
   * @param {number} cy - Center y of rotation
   * @return {Matrix3} A reference to this matrix.
   */
  setUvTransform(e, t, i, r, s, a, o) {
    const c = Math.cos(s), l = Math.sin(s);
    return this.set(
      i * c,
      i * l,
      -i * (c * a + l * o) + a + e,
      -r * l,
      r * c,
      -r * (-l * a + c * o) + o + t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Scales this matrix with the given scalar values.
   *
   * @param {number} sx - The amount to scale in the X axis.
   * @param {number} sy - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  scale(e, t) {
    return this.premultiply(Ns.makeScale(e, t)), this;
  }
  /**
   * Rotates this matrix by the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  rotate(e) {
    return this.premultiply(Ns.makeRotation(-e)), this;
  }
  /**
   * Translates this matrix by the given scalar values.
   *
   * @param {number} tx - The amount to translate in the X axis.
   * @param {number} ty - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  translate(e, t) {
    return this.premultiply(Ns.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  /**
   * Sets this matrix as a 2D translation transform.
   *
   * @param {number|Vector2} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D rotational transformation.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix3} A reference to this matrix.
   */
  makeRotation(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(
      t,
      -i,
      0,
      i,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a 2D scale transform.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @return {Matrix3} A reference to this matrix.
   */
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix3} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, i = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== i[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix3} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let i = 0; i < 9; i++)
      this.elements[i] = e[i + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const i = this.elements;
    return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix3} A clone of this instance.
   */
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Ns = /* @__PURE__ */ new Le(), sl = /* @__PURE__ */ new Le().set(
  0.4123908,
  0.3575843,
  0.1804808,
  0.212639,
  0.7151687,
  0.0721923,
  0.0193308,
  0.1191948,
  0.9505322
), al = /* @__PURE__ */ new Le().set(
  3.2409699,
  -1.5373832,
  -0.4986108,
  -0.9692436,
  1.8759675,
  0.0415551,
  0.0556301,
  -0.203977,
  1.0569715
);
function Sh() {
  const n = {
    enabled: !0,
    workingColorSpace: tr,
    /**
     * Implementations of supported color spaces.
     *
     * Required:
     *	- primaries: chromaticity coordinates [ rx ry gx gy bx by ]
     *	- whitePoint: reference white [ x y ]
     *	- transfer: transfer function (pre-defined)
     *	- toXYZ: Matrix3 RGB to XYZ transform
     *	- fromXYZ: Matrix3 XYZ to RGB transform
     *	- luminanceCoefficients: RGB luminance coefficients
     *
     * Optional:
     *  - outputColorSpaceConfig: { drawingBufferColorSpace: ColorSpace, toneMappingMode: 'extended' | 'standard' }
     *  - workingColorSpaceConfig: { unpackColorSpace: ColorSpace }
     *
     * Reference:
     * - https://www.russellcottrell.com/photo/matrixCalculator.htm
     */
    spaces: {},
    convert: function(r, s, a) {
      return this.enabled === !1 || s === a || !s || !a || (this.spaces[s].transfer === Ke && (r.r = Un(r.r), r.g = Un(r.g), r.b = Un(r.b)), this.spaces[s].primaries !== this.spaces[a].primaries && (r.applyMatrix3(this.spaces[s].toXYZ), r.applyMatrix3(this.spaces[a].fromXYZ)), this.spaces[a].transfer === Ke && (r.r = Yi(r.r), r.g = Yi(r.g), r.b = Yi(r.b))), r;
    },
    workingToColorSpace: function(r, s) {
      return this.convert(r, this.workingColorSpace, s);
    },
    colorSpaceToWorking: function(r, s) {
      return this.convert(r, s, this.workingColorSpace);
    },
    getPrimaries: function(r) {
      return this.spaces[r].primaries;
    },
    getTransfer: function(r) {
      return r === jn ? _s : this.spaces[r].transfer;
    },
    getToneMappingMode: function(r) {
      return this.spaces[r].outputColorSpaceConfig.toneMappingMode || "standard";
    },
    getLuminanceCoefficients: function(r, s = this.workingColorSpace) {
      return r.fromArray(this.spaces[s].luminanceCoefficients);
    },
    define: function(r) {
      Object.assign(this.spaces, r);
    },
    // Internal APIs
    _getMatrix: function(r, s, a) {
      return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ);
    },
    _getDrawingBufferColorSpace: function(r) {
      return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace;
    },
    _getUnpackColorSpace: function(r = this.workingColorSpace) {
      return this.spaces[r].workingColorSpaceConfig.unpackColorSpace;
    },
    // Deprecated
    fromWorkingColorSpace: function(r, s) {
      return xs("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), n.workingToColorSpace(r, s);
    },
    toWorkingColorSpace: function(r, s) {
      return xs("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), n.colorSpaceToWorking(r, s);
    }
  }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], t = [0.2126, 0.7152, 0.0722], i = [0.3127, 0.329];
  return n.define({
    [tr]: {
      primaries: e,
      whitePoint: i,
      transfer: _s,
      toXYZ: sl,
      fromXYZ: al,
      luminanceCoefficients: t,
      workingColorSpaceConfig: { unpackColorSpace: kt },
      outputColorSpaceConfig: { drawingBufferColorSpace: kt }
    },
    [kt]: {
      primaries: e,
      whitePoint: i,
      transfer: Ke,
      toXYZ: sl,
      fromXYZ: al,
      luminanceCoefficients: t,
      outputColorSpaceConfig: { drawingBufferColorSpace: kt }
    }
  }), n;
}
const Ge = /* @__PURE__ */ Sh();
function Un(n) {
  return n < 0.04045 ? n * 0.0773993808 : Math.pow(n * 0.9478672986 + 0.0521327014, 2.4);
}
function Yi(n) {
  return n < 31308e-7 ? n * 12.92 : 1.055 * Math.pow(n, 0.41666) - 0.055;
}
let Pi;
class Eh {
  /**
   * Returns a data URI containing a representation of the given image.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement)} image - The image object.
   * @param {string} [type='image/png'] - Indicates the image format.
   * @return {string} The data URI.
   */
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let i;
    if (e instanceof HTMLCanvasElement)
      i = e;
    else {
      Pi === void 0 && (Pi = vs("canvas")), Pi.width = e.width, Pi.height = e.height;
      const r = Pi.getContext("2d");
      e instanceof ImageData ? r.putImageData(e, 0, 0) : r.drawImage(e, 0, 0, e.width, e.height), i = Pi;
    }
    return i.toDataURL(t);
  }
  /**
   * Converts the given sRGB image data to linear color space.
   *
   * @param {(HTMLImageElement|HTMLCanvasElement|ImageBitmap|Object)} image - The image object.
   * @return {HTMLCanvasElement|Object} The converted image.
   */
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = vs("canvas");
      t.width = e.width, t.height = e.height;
      const i = t.getContext("2d");
      i.drawImage(e, 0, 0, e.width, e.height);
      const r = i.getImageData(0, 0, e.width, e.height), s = r.data;
      for (let a = 0; a < s.length; a++)
        s[a] = Un(s[a] / 255) * 255;
      return i.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let i = 0; i < t.length; i++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[i] = Math.floor(Un(t[i] / 255) * 255) : t[i] = Un(t[i]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return Ce("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Th = 0;
class bo {
  /**
   * Constructs a new video texture.
   *
   * @param {any} [data=null] - The data definition of a texture.
   */
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Th++ }), this.uuid = br(), this.data = e, this.dataReady = !0, this.version = 0;
  }
  /**
   * Returns the dimensions of the source into the given target vector.
   *
   * @param {(Vector2|Vector3)} target - The target object the result is written into.
   * @return {(Vector2|Vector3)} The dimensions of the source.
   */
  getSize(e) {
    const t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayHeight, t.displayWidth, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  /**
   * When the property is set to `true`, the engine allocates the memory
   * for the texture (if necessary) and triggers the actual texture upload
   * to the GPU next time the source is used.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Serializes the source into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized source.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const i = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let s;
      if (Array.isArray(r)) {
        s = [];
        for (let a = 0, o = r.length; a < o; a++)
          r[a].isDataTexture ? s.push(Fs(r[a].image)) : s.push(Fs(r[a]));
      } else
        s = Fs(r);
      i.url = s;
    }
    return t || (e.images[this.uuid] = i), i;
  }
}
function Fs(n) {
  return typeof HTMLImageElement < "u" && n instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && n instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && n instanceof ImageBitmap ? Eh.getDataURL(n) : n.data ? {
    data: Array.from(n.data),
    width: n.width,
    height: n.height,
    type: n.data.constructor.name
  } : (Ce("Texture: Unable to serialize Texture."), {});
}
let yh = 0;
const Os = /* @__PURE__ */ new B();
class Pt extends rr {
  /**
   * Constructs a new texture.
   *
   * @param {?Object} [image=Texture.DEFAULT_IMAGE] - The image holding the texture data.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = Pt.DEFAULT_IMAGE, t = Pt.DEFAULT_MAPPING, i = Ln, r = Ln, s = Rt, a = vi, o = nn, c = Wt, l = Pt.DEFAULT_ANISOTROPY, f = jn) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: yh++ }), this.uuid = br(), this.name = "", this.source = new bo(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = i, this.wrapT = r, this.magFilter = s, this.minFilter = a, this.anisotropy = l, this.format = o, this.internalFormat = null, this.type = c, this.offset = new Ze(0, 0), this.repeat = new Ze(1, 1), this.center = new Ze(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Le(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, this.colorSpace = f, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = !1, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0;
  }
  /**
   * The width of the texture in pixels.
   */
  get width() {
    return this.source.getSize(Os).x;
  }
  /**
   * The height of the texture in pixels.
   */
  get height() {
    return this.source.getSize(Os).y;
  }
  /**
   * The depth of the texture in pixels.
   */
  get depth() {
    return this.source.getSize(Os).z;
  }
  /**
   * The image object holding the texture data.
   *
   * @type {?Object}
   */
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  /**
   * Updates the texture transformation matrix from the from the properties {@link Texture#offset},
   * {@link Texture#repeat}, {@link Texture#rotation}, and {@link Texture#center}.
   */
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  /**
   * Adds a range of data in the data texture to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Returns a new texture with copied values from this instance.
   *
   * @return {Texture} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given texture to this instance.
   *
   * @param {Texture} source - The texture to copy.
   * @return {Texture} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  /**
   * Sets this texture's properties based on `values`.
   * @param {Object} values - A container with texture parameters.
   */
  setValues(e) {
    for (const t in e) {
      const i = e[t];
      if (i === void 0) {
        Ce(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      const r = this[t];
      if (r === void 0) {
        Ce(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      r && i && r.isVector2 && i.isVector2 || r && i && r.isVector3 && i.isVector3 || r && i && r.isMatrix3 && i.isMatrix3 ? r.copy(i) : this[t] = i;
    }
  }
  /**
   * Serializes the texture into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized texture.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const i = {
      metadata: {
        version: 4.7,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (i.userData = this.userData), t || (e.textures[this.uuid] = i), i;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Texture#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Transforms the given uv vector with the textures uv transformation matrix.
   *
   * @param {Vector2} uv - The uv vector.
   * @return {Vector2} The transformed uv vector.
   */
  transformUv(e) {
    if (this.mapping !== Bc) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case ya:
          e.x = e.x - Math.floor(e.x);
          break;
        case Ln:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case ba:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case ya:
          e.y = e.y - Math.floor(e.y);
          break;
        case Ln:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case ba:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  /**
   * Setting this property to `true` indicates the engine the texture
   * must be updated in the next render. This triggers a texture upload
   * to the GPU and ensures correct texture parameter configuration.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  /**
   * Setting this property to `true` indicates the engine the PMREM
   * must be regenerated.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsPMREMUpdate(e) {
    e === !0 && this.pmremVersion++;
  }
}
Pt.DEFAULT_IMAGE = null;
Pt.DEFAULT_MAPPING = Bc;
Pt.DEFAULT_ANISOTROPY = 1;
class ct {
  /**
   * Constructs a new 4D vector.
   *
   * @param {number} [x=0] - The x value of this vector.
   * @param {number} [y=0] - The y value of this vector.
   * @param {number} [z=0] - The z value of this vector.
   * @param {number} [w=1] - The w value of this vector.
   */
  constructor(e = 0, t = 0, i = 0, r = 1) {
    ct.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = i, this.w = r;
  }
  /**
   * Alias for {@link Vector4#z}.
   *
   * @type {number}
   */
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  /**
   * Alias for {@link Vector4#w}.
   *
   * @type {number}
   */
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  /**
   * Sets the vector components.
   *
   * @param {number} x - The value of the x component.
   * @param {number} y - The value of the y component.
   * @param {number} z - The value of the z component.
   * @param {number} w - The value of the w component.
   * @return {Vector4} A reference to this vector.
   */
  set(e, t, i, r) {
    return this.x = e, this.y = t, this.z = i, this.w = r, this;
  }
  /**
   * Sets the vector components to the same value.
   *
   * @param {number} scalar - The value to set for all vector components.
   * @return {Vector4} A reference to this vector.
   */
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  /**
   * Sets the vector's x component to the given value
   *
   * @param {number} x - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setX(e) {
    return this.x = e, this;
  }
  /**
   * Sets the vector's y component to the given value
   *
   * @param {number} y - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setY(e) {
    return this.y = e, this;
  }
  /**
   * Sets the vector's z component to the given value
   *
   * @param {number} z - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setZ(e) {
    return this.z = e, this;
  }
  /**
   * Sets the vector's w component to the given value
   *
   * @param {number} w - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setW(e) {
    return this.w = e, this;
  }
  /**
   * Allows to set a vector component with an index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @param {number} value - The value to set.
   * @return {Vector4} A reference to this vector.
   */
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  /**
   * Returns the value of the vector component which matches the given index.
   *
   * @param {number} index - The component index. `0` equals to x, `1` equals to y,
   * `2` equals to z, `3` equals to w.
   * @return {number} A vector component value.
   */
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  /**
   * Returns a new vector with copied values from this instance.
   *
   * @return {Vector4} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  /**
   * Copies the values of the given vector to this instance.
   *
   * @param {Vector3|Vector4} v - The vector to copy.
   * @return {Vector4} A reference to this vector.
   */
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  /**
   * Adds the given vector to this instance.
   *
   * @param {Vector4} v - The vector to add.
   * @return {Vector4} A reference to this vector.
   */
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  /**
   * Adds the given scalar value to all components of this instance.
   *
   * @param {number} s - The scalar to add.
   * @return {Vector4} A reference to this vector.
   */
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  /**
   * Adds the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  /**
   * Adds the given vector scaled by the given factor to this instance.
   *
   * @param {Vector4} v - The vector.
   * @param {number} s - The factor that scales `v`.
   * @return {Vector4} A reference to this vector.
   */
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  /**
   * Subtracts the given vector from this instance.
   *
   * @param {Vector4} v - The vector to subtract.
   * @return {Vector4} A reference to this vector.
   */
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  /**
   * Subtracts the given scalar value from all components of this instance.
   *
   * @param {number} s - The scalar to subtract.
   * @return {Vector4} A reference to this vector.
   */
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  /**
   * Subtracts the given vectors and stores the result in this instance.
   *
   * @param {Vector4} a - The first vector.
   * @param {Vector4} b - The second vector.
   * @return {Vector4} A reference to this vector.
   */
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  /**
   * Multiplies the given vector with this instance.
   *
   * @param {Vector4} v - The vector to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  /**
   * Multiplies the given scalar value with all components of this instance.
   *
   * @param {number} scalar - The scalar to multiply.
   * @return {Vector4} A reference to this vector.
   */
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  /**
   * Multiplies this vector with the given 4x4 matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  applyMatrix4(e) {
    const t = this.x, i = this.y, r = this.z, s = this.w, a = e.elements;
    return this.x = a[0] * t + a[4] * i + a[8] * r + a[12] * s, this.y = a[1] * t + a[5] * i + a[9] * r + a[13] * s, this.z = a[2] * t + a[6] * i + a[10] * r + a[14] * s, this.w = a[3] * t + a[7] * i + a[11] * r + a[15] * s, this;
  }
  /**
   * Divides this instance by the given vector.
   *
   * @param {Vector4} v - The vector to divide.
   * @return {Vector4} A reference to this vector.
   */
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  /**
   * Divides this vector by the given scalar.
   *
   * @param {number} scalar - The scalar to divide.
   * @return {Vector4} A reference to this vector.
   */
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  /**
   * Sets the x, y and z components of this
   * vector to the quaternion's axis and w to the angle.
   *
   * @param {Quaternion} q - The Quaternion to set.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  /**
   * Sets the x, y and z components of this
   * vector to the axis of rotation and w to the angle.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper left 3x3 matrix is a pure rotation matrix.
   * @return {Vector4} A reference to this vector.
   */
  setAxisAngleFromRotationMatrix(e) {
    let t, i, r, s;
    const c = e.elements, l = c[0], f = c[4], d = c[8], u = c[1], m = c[5], g = c[9], M = c[2], p = c[6], h = c[10];
    if (Math.abs(f - u) < 0.01 && Math.abs(d - M) < 0.01 && Math.abs(g - p) < 0.01) {
      if (Math.abs(f + u) < 0.1 && Math.abs(d + M) < 0.1 && Math.abs(g + p) < 0.1 && Math.abs(l + m + h - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const b = (l + 1) / 2, y = (m + 1) / 2, C = (h + 1) / 2, A = (f + u) / 4, D = (d + M) / 4, v = (g + p) / 4;
      return b > y && b > C ? b < 0.01 ? (i = 0, r = 0.707106781, s = 0.707106781) : (i = Math.sqrt(b), r = A / i, s = D / i) : y > C ? y < 0.01 ? (i = 0.707106781, r = 0, s = 0.707106781) : (r = Math.sqrt(y), i = A / r, s = v / r) : C < 0.01 ? (i = 0.707106781, r = 0.707106781, s = 0) : (s = Math.sqrt(C), i = D / s, r = v / s), this.set(i, r, s, t), this;
    }
    let S = Math.sqrt((p - g) * (p - g) + (d - M) * (d - M) + (u - f) * (u - f));
    return Math.abs(S) < 1e-3 && (S = 1), this.x = (p - g) / S, this.y = (d - M) / S, this.z = (u - f) / S, this.w = Math.acos((l + m + h - 1) / 2), this;
  }
  /**
   * Sets the vector components to the position elements of the
   * given transformation matrix.
   *
   * @param {Matrix4} m - The 4x4 matrix.
   * @return {Vector4} A reference to this vector.
   */
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the given vector's x, y, z or w
   * value, replace that value with the corresponding min value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is less than the given vector's x, y, z or w
   * value, replace that value with the corresponding max value.
   *
   * @param {Vector4} v - The vector.
   * @return {Vector4} A reference to this vector.
   */
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  /**
   * If this vector's x, y, z or w value is greater than the max vector's x, y, z or w
   * value, it is replaced by the corresponding value.
   * If this vector's x, y, z or w value is less than the min vector's x, y, z or w value,
   * it is replaced by the corresponding value.
   *
   * @param {Vector4} min - The minimum x, y and z values.
   * @param {Vector4} max - The maximum x, y and z values in the desired range.
   * @return {Vector4} A reference to this vector.
   */
  clamp(e, t) {
    return this.x = ze(this.x, e.x, t.x), this.y = ze(this.y, e.y, t.y), this.z = ze(this.z, e.z, t.z), this.w = ze(this.w, e.w, t.w), this;
  }
  /**
   * If this vector's x, y, z or w values are greater than the max value, they are
   * replaced by the max value.
   * If this vector's x, y, z or w values are less than the min value, they are
   * replaced by the min value.
   *
   * @param {number} minVal - The minimum value the components will be clamped to.
   * @param {number} maxVal - The maximum value the components will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampScalar(e, t) {
    return this.x = ze(this.x, e, t), this.y = ze(this.y, e, t), this.z = ze(this.z, e, t), this.w = ze(this.w, e, t), this;
  }
  /**
   * If this vector's length is greater than the max value, it is replaced by
   * the max value.
   * If this vector's length is less than the min value, it is replaced by the
   * min value.
   *
   * @param {number} min - The minimum value the vector length will be clamped to.
   * @param {number} max - The maximum value the vector length will be clamped to.
   * @return {Vector4} A reference to this vector.
   */
  clampLength(e, t) {
    const i = this.length();
    return this.divideScalar(i || 1).multiplyScalar(ze(i, e, t));
  }
  /**
   * The components of this vector are rounded down to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  /**
   * The components of this vector are rounded up to the nearest integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  /**
   * The components of this vector are rounded to the nearest integer value
   *
   * @return {Vector4} A reference to this vector.
   */
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  /**
   * The components of this vector are rounded towards zero (up if negative,
   * down if positive) to an integer value.
   *
   * @return {Vector4} A reference to this vector.
   */
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  /**
   * Inverts this vector - i.e. sets x = -x, y = -y, z = -z, w = -w.
   *
   * @return {Vector4} A reference to this vector.
   */
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  /**
   * Calculates the dot product of the given vector with this instance.
   *
   * @param {Vector4} v - The vector to compute the dot product with.
   * @return {number} The result of the dot product.
   */
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  /**
   * Computes the square of the Euclidean length (straight-line length) from
   * (0, 0, 0, 0) to (x, y, z, w). If you are comparing the lengths of vectors, you should
   * compare the length squared instead as it is slightly more efficient to calculate.
   *
   * @return {number} The square length of this vector.
   */
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  /**
   * Computes the  Euclidean length (straight-line length) from (0, 0, 0, 0) to (x, y, z, w).
   *
   * @return {number} The length of this vector.
   */
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  /**
   * Computes the Manhattan length of this vector.
   *
   * @return {number} The length of this vector.
   */
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  /**
   * Converts this vector to a unit vector - that is, sets it equal to a vector
   * with the same direction as this one, but with a vector length of `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  /**
   * Sets this vector to a vector with the same direction as this one, but
   * with the specified length.
   *
   * @param {number} length - The new length of this vector.
   * @return {Vector4} A reference to this vector.
   */
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  /**
   * Linearly interpolates between the given vector and this instance, where
   * alpha is the percent distance along the line - alpha = 0 will be this
   * vector, and alpha = 1 will be the given one.
   *
   * @param {Vector4} v - The vector to interpolate towards.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  /**
   * Linearly interpolates between the given vectors, where alpha is the percent
   * distance along the line - alpha = 0 will be first vector, and alpha = 1 will
   * be the second one. The result is stored in this instance.
   *
   * @param {Vector4} v1 - The first vector.
   * @param {Vector4} v2 - The second vector.
   * @param {number} alpha - The interpolation factor, typically in the closed interval `[0, 1]`.
   * @return {Vector4} A reference to this vector.
   */
  lerpVectors(e, t, i) {
    return this.x = e.x + (t.x - e.x) * i, this.y = e.y + (t.y - e.y) * i, this.z = e.z + (t.z - e.z) * i, this.w = e.w + (t.w - e.w) * i, this;
  }
  /**
   * Returns `true` if this vector is equal with the given one.
   *
   * @param {Vector4} v - The vector to test for equality.
   * @return {boolean} Whether this vector is equal with the given one.
   */
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  /**
   * Sets this vector's x value to be `array[ offset ]`, y value to be `array[ offset + 1 ]`,
   * z value to be `array[ offset + 2 ]`, w value to be `array[ offset + 3 ]`.
   *
   * @param {Array<number>} array - An array holding the vector component values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Vector4} A reference to this vector.
   */
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  /**
   * Writes the components of this vector to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the vector components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The vector components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  /**
   * Sets the components of this vector from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding vector data.
   * @param {number} index - The index into the attribute.
   * @return {Vector4} A reference to this vector.
   */
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  /**
   * Sets each component of this vector to a pseudo-random value between `0` and
   * `1`, excluding `1`.
   *
   * @return {Vector4} A reference to this vector.
   */
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class bh extends rr {
  /**
   * Render target options.
   *
   * @typedef {Object} RenderTarget~Options
   * @property {boolean} [generateMipmaps=false] - Whether to generate mipmaps or not.
   * @property {number} [magFilter=LinearFilter] - The mag filter.
   * @property {number} [minFilter=LinearFilter] - The min filter.
   * @property {number} [format=RGBAFormat] - The texture format.
   * @property {number} [type=UnsignedByteType] - The texture type.
   * @property {?string} [internalFormat=null] - The texture's internal format.
   * @property {number} [wrapS=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [wrapT=ClampToEdgeWrapping] - The texture's uv wrapping mode.
   * @property {number} [anisotropy=1] - The texture's anisotropy value.
   * @property {string} [colorSpace=NoColorSpace] - The texture's color space.
   * @property {boolean} [depthBuffer=true] - Whether to allocate a depth buffer or not.
   * @property {boolean} [stencilBuffer=false] - Whether to allocate a stencil buffer or not.
   * @property {boolean} [resolveDepthBuffer=true] - Whether to resolve the depth buffer or not.
   * @property {boolean} [resolveStencilBuffer=true] - Whether  to resolve the stencil buffer or not.
   * @property {?Texture} [depthTexture=null] - Reference to a depth texture.
   * @property {number} [samples=0] - The MSAA samples count.
   * @property {number} [count=1] - Defines the number of color attachments . Must be at least `1`.
   * @property {number} [depth=1] - The texture depth.
   * @property {boolean} [multiview=false] - Whether this target is used for multiview rendering.
   */
  /**
   * Constructs a new render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, i = {}) {
    super(), i = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: Rt,
      depthBuffer: !0,
      stencilBuffer: !1,
      resolveDepthBuffer: !0,
      resolveStencilBuffer: !0,
      depthTexture: null,
      samples: 0,
      count: 1,
      depth: 1,
      multiview: !1
    }, i), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = i.depth, this.scissor = new ct(0, 0, e, t), this.scissorTest = !1, this.viewport = new ct(0, 0, e, t), this.textures = [];
    const r = { width: e, height: t, depth: i.depth }, s = new Pt(r), a = i.count;
    for (let o = 0; o < a; o++)
      this.textures[o] = s.clone(), this.textures[o].isRenderTargetTexture = !0, this.textures[o].renderTarget = this;
    this._setTextureOptions(i), this.depthBuffer = i.depthBuffer, this.stencilBuffer = i.stencilBuffer, this.resolveDepthBuffer = i.resolveDepthBuffer, this.resolveStencilBuffer = i.resolveStencilBuffer, this._depthTexture = null, this.depthTexture = i.depthTexture, this.samples = i.samples, this.multiview = i.multiview;
  }
  _setTextureOptions(e = {}) {
    const t = {
      minFilter: Rt,
      generateMipmaps: !1,
      flipY: !1,
      internalFormat: null
    };
    e.mapping !== void 0 && (t.mapping = e.mapping), e.wrapS !== void 0 && (t.wrapS = e.wrapS), e.wrapT !== void 0 && (t.wrapT = e.wrapT), e.wrapR !== void 0 && (t.wrapR = e.wrapR), e.magFilter !== void 0 && (t.magFilter = e.magFilter), e.minFilter !== void 0 && (t.minFilter = e.minFilter), e.format !== void 0 && (t.format = e.format), e.type !== void 0 && (t.type = e.type), e.anisotropy !== void 0 && (t.anisotropy = e.anisotropy), e.colorSpace !== void 0 && (t.colorSpace = e.colorSpace), e.flipY !== void 0 && (t.flipY = e.flipY), e.generateMipmaps !== void 0 && (t.generateMipmaps = e.generateMipmaps), e.internalFormat !== void 0 && (t.internalFormat = e.internalFormat);
    for (let i = 0; i < this.textures.length; i++)
      this.textures[i].setValues(t);
  }
  /**
   * The texture representing the default color attachment.
   *
   * @type {Texture}
   */
  get texture() {
    return this.textures[0];
  }
  set texture(e) {
    this.textures[0] = e;
  }
  set depthTexture(e) {
    this._depthTexture !== null && (this._depthTexture.renderTarget = null), e !== null && (e.renderTarget = this), this._depthTexture = e;
  }
  /**
   * Instead of saving the depth in a renderbuffer, a texture
   * can be used instead which is useful for further processing
   * e.g. in context of post-processing.
   *
   * @type {?DepthTexture}
   * @default null
   */
  get depthTexture() {
    return this._depthTexture;
  }
  /**
   * Sets the size of this render target.
   *
   * @param {number} width - The width.
   * @param {number} height - The height.
   * @param {number} [depth=1] - The depth.
   */
  setSize(e, t, i = 1) {
    if (this.width !== e || this.height !== t || this.depth !== i) {
      this.width = e, this.height = t, this.depth = i;
      for (let r = 0, s = this.textures.length; r < s; r++)
        this.textures[r].image.width = e, this.textures[r].image.height = t, this.textures[r].image.depth = i, this.textures[r].isData3DTexture !== !0 && (this.textures[r].isArrayTexture = this.textures[r].image.depth > 1);
      this.dispose();
    }
    this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  /**
   * Returns a new render target with copied values from this instance.
   *
   * @return {RenderTarget} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the settings of the given render target. This is a structural copy so
   * no resources are shared between render targets after the copy. That includes
   * all MRT textures and the depth texture.
   *
   * @param {RenderTarget} source - The render target to copy.
   * @return {RenderTarget} A reference to this instance.
   */
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.textures.length = 0;
    for (let t = 0, i = e.textures.length; t < i; t++) {
      this.textures[t] = e.textures[t].clone(), this.textures[t].isRenderTargetTexture = !0, this.textures[t].renderTarget = this;
      const r = Object.assign({}, e.textures[t].image);
      this.textures[t].source = new bo(r);
    }
    return this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, this.resolveDepthBuffer = e.resolveDepthBuffer, this.resolveStencilBuffer = e.resolveStencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires RenderTarget#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class pn extends bh {
  /**
   * Constructs a new 3D render target.
   *
   * @param {number} [width=1] - The width of the render target.
   * @param {number} [height=1] - The height of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = 1, i = {}) {
    super(e, t, i), this.isWebGLRenderTarget = !0;
  }
}
class Yc extends Pt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, i = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: i, depth: r }, this.magFilter = yt, this.minFilter = yt, this.wrapR = Ln, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1, this.layerUpdates = /* @__PURE__ */ new Set();
  }
  /**
   * Describes that a specific layer of the texture needs to be updated.
   * Normally when {@link Texture#needsUpdate} is set to `true`, the
   * entire data texture array is sent to the GPU. Marking specific
   * layers will only transmit subsets of all mipmaps associated with a
   * specific depth in the array which is often much more performant.
   *
   * @param {number} layerIndex - The layer index that should be updated.
   */
  addLayerUpdate(e) {
    this.layerUpdates.add(e);
  }
  /**
   * Resets the layer updates registry.
   */
  clearLayerUpdates() {
    this.layerUpdates.clear();
  }
}
class Ah extends Pt {
  /**
   * Constructs a new data array texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e = null, t = 1, i = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: i, depth: r }, this.magFilter = yt, this.minFilter = yt, this.wrapR = Ln, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class ht {
  /**
   * Constructs a new 4x4 matrix. The arguments are supposed to be
   * in row-major order. If no arguments are provided, the constructor
   * initializes the matrix as an identity matrix.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   */
  constructor(e, t, i, r, s, a, o, c, l, f, d, u, m, g, M, p) {
    ht.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, i, r, s, a, o, c, l, f, d, u, m, g, M, p);
  }
  /**
   * Sets the elements of the matrix.The arguments are supposed to be
   * in row-major order.
   *
   * @param {number} [n11] - 1-1 matrix element.
   * @param {number} [n12] - 1-2 matrix element.
   * @param {number} [n13] - 1-3 matrix element.
   * @param {number} [n14] - 1-4 matrix element.
   * @param {number} [n21] - 2-1 matrix element.
   * @param {number} [n22] - 2-2 matrix element.
   * @param {number} [n23] - 2-3 matrix element.
   * @param {number} [n24] - 2-4 matrix element.
   * @param {number} [n31] - 3-1 matrix element.
   * @param {number} [n32] - 3-2 matrix element.
   * @param {number} [n33] - 3-3 matrix element.
   * @param {number} [n34] - 3-4 matrix element.
   * @param {number} [n41] - 4-1 matrix element.
   * @param {number} [n42] - 4-2 matrix element.
   * @param {number} [n43] - 4-3 matrix element.
   * @param {number} [n44] - 4-4 matrix element.
   * @return {Matrix4} A reference to this matrix.
   */
  set(e, t, i, r, s, a, o, c, l, f, d, u, m, g, M, p) {
    const h = this.elements;
    return h[0] = e, h[4] = t, h[8] = i, h[12] = r, h[1] = s, h[5] = a, h[9] = o, h[13] = c, h[2] = l, h[6] = f, h[10] = d, h[14] = u, h[3] = m, h[7] = g, h[11] = M, h[15] = p, this;
  }
  /**
   * Sets this matrix to the 4x4 identity matrix.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Returns a matrix with copied values from this instance.
   *
   * @return {Matrix4} A clone of this instance.
   */
  clone() {
    return new ht().fromArray(this.elements);
  }
  /**
   * Copies the values of the given matrix to this instance.
   *
   * @param {Matrix4} m - The matrix to copy.
   * @return {Matrix4} A reference to this matrix.
   */
  copy(e) {
    const t = this.elements, i = e.elements;
    return t[0] = i[0], t[1] = i[1], t[2] = i[2], t[3] = i[3], t[4] = i[4], t[5] = i[5], t[6] = i[6], t[7] = i[7], t[8] = i[8], t[9] = i[9], t[10] = i[10], t[11] = i[11], t[12] = i[12], t[13] = i[13], t[14] = i[14], t[15] = i[15], this;
  }
  /**
   * Copies the translation component of the given matrix
   * into this matrix's translation component.
   *
   * @param {Matrix4} m - The matrix to copy the translation component.
   * @return {Matrix4} A reference to this matrix.
   */
  copyPosition(e) {
    const t = this.elements, i = e.elements;
    return t[12] = i[12], t[13] = i[13], t[14] = i[14], this;
  }
  /**
   * Set the upper 3x3 elements of this matrix to the values of given 3x3 matrix.
   *
   * @param {Matrix3} m - The 3x3 matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the basis of this matrix into the three axis vectors provided.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  extractBasis(e, t, i) {
    return this.determinant() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), i.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), i.setFromMatrixColumn(this, 2), this);
  }
  /**
   * Sets the given basis vectors to this matrix.
   *
   * @param {Vector3} xAxis - The basis's x axis.
   * @param {Vector3} yAxis - The basis's y axis.
   * @param {Vector3} zAxis - The basis's z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeBasis(e, t, i) {
    return this.set(
      e.x,
      t.x,
      i.x,
      0,
      e.y,
      t.y,
      i.y,
      0,
      e.z,
      t.z,
      i.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Extracts the rotation component of the given matrix
   * into this matrix's rotation component.
   *
   * Note: This method does not support reflection matrices.
   *
   * @param {Matrix4} m - The matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  extractRotation(e) {
    if (e.determinant() === 0)
      return this.identity();
    const t = this.elements, i = e.elements, r = 1 / Di.setFromMatrixColumn(e, 0).length(), s = 1 / Di.setFromMatrixColumn(e, 1).length(), a = 1 / Di.setFromMatrixColumn(e, 2).length();
    return t[0] = i[0] * r, t[1] = i[1] * r, t[2] = i[2] * r, t[3] = 0, t[4] = i[4] * s, t[5] = i[5] * s, t[6] = i[6] * s, t[7] = 0, t[8] = i[8] * a, t[9] = i[9] * a, t[10] = i[10] * a, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component (the upper left 3x3 matrix) of this matrix to
   * the rotation specified by the given Euler angles. The rest of
   * the matrix is set to the identity. Depending on the {@link Euler#order},
   * there are six possible outcomes. See [this page](https://en.wikipedia.org/wiki/Euler_angles#Rotation_matrix)
   * for a complete list.
   *
   * @param {Euler} euler - The Euler angles.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromEuler(e) {
    const t = this.elements, i = e.x, r = e.y, s = e.z, a = Math.cos(i), o = Math.sin(i), c = Math.cos(r), l = Math.sin(r), f = Math.cos(s), d = Math.sin(s);
    if (e.order === "XYZ") {
      const u = a * f, m = a * d, g = o * f, M = o * d;
      t[0] = c * f, t[4] = -c * d, t[8] = l, t[1] = m + g * l, t[5] = u - M * l, t[9] = -o * c, t[2] = M - u * l, t[6] = g + m * l, t[10] = a * c;
    } else if (e.order === "YXZ") {
      const u = c * f, m = c * d, g = l * f, M = l * d;
      t[0] = u + M * o, t[4] = g * o - m, t[8] = a * l, t[1] = a * d, t[5] = a * f, t[9] = -o, t[2] = m * o - g, t[6] = M + u * o, t[10] = a * c;
    } else if (e.order === "ZXY") {
      const u = c * f, m = c * d, g = l * f, M = l * d;
      t[0] = u - M * o, t[4] = -a * d, t[8] = g + m * o, t[1] = m + g * o, t[5] = a * f, t[9] = M - u * o, t[2] = -a * l, t[6] = o, t[10] = a * c;
    } else if (e.order === "ZYX") {
      const u = a * f, m = a * d, g = o * f, M = o * d;
      t[0] = c * f, t[4] = g * l - m, t[8] = u * l + M, t[1] = c * d, t[5] = M * l + u, t[9] = m * l - g, t[2] = -l, t[6] = o * c, t[10] = a * c;
    } else if (e.order === "YZX") {
      const u = a * c, m = a * l, g = o * c, M = o * l;
      t[0] = c * f, t[4] = M - u * d, t[8] = g * d + m, t[1] = d, t[5] = a * f, t[9] = -o * f, t[2] = -l * f, t[6] = m * d + g, t[10] = u - M * d;
    } else if (e.order === "XZY") {
      const u = a * c, m = a * l, g = o * c, M = o * l;
      t[0] = c * f, t[4] = -d, t[8] = l * f, t[1] = u * d + M, t[5] = a * f, t[9] = m * d - g, t[2] = g * d - m, t[6] = o * f, t[10] = M * d + u;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  /**
   * Sets the rotation component of this matrix to the rotation specified by
   * the given Quaternion as outlined [here](https://en.wikipedia.org/wiki/Rotation_matrix#Quaternion)
   * The rest of the matrix is set to the identity.
   *
   * @param {Quaternion} q - The Quaternion.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationFromQuaternion(e) {
    return this.compose(wh, e, Rh);
  }
  /**
   * Sets the rotation component of the transformation matrix, looking from `eye` towards
   * `target`, and oriented by the up-direction.
   *
   * @param {Vector3} eye - The eye vector.
   * @param {Vector3} target - The target vector.
   * @param {Vector3} up - The up vector.
   * @return {Matrix4} A reference to this matrix.
   */
  lookAt(e, t, i) {
    const r = this.elements;
    return Ot.subVectors(e, t), Ot.lengthSq() === 0 && (Ot.z = 1), Ot.normalize(), Xn.crossVectors(i, Ot), Xn.lengthSq() === 0 && (Math.abs(i.z) === 1 ? Ot.x += 1e-4 : Ot.z += 1e-4, Ot.normalize(), Xn.crossVectors(i, Ot)), Xn.normalize(), Nr.crossVectors(Ot, Xn), r[0] = Xn.x, r[4] = Nr.x, r[8] = Ot.x, r[1] = Xn.y, r[5] = Nr.y, r[9] = Ot.y, r[2] = Xn.z, r[6] = Nr.z, r[10] = Ot.z, this;
  }
  /**
   * Post-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  /**
   * Pre-multiplies this matrix by the given 4x4 matrix.
   *
   * @param {Matrix4} m - The matrix to multiply with.
   * @return {Matrix4} A reference to this matrix.
   */
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  /**
   * Multiples the given 4x4 matrices and stores the result
   * in this matrix.
   *
   * @param {Matrix4} a - The first matrix.
   * @param {Matrix4} b - The second matrix.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyMatrices(e, t) {
    const i = e.elements, r = t.elements, s = this.elements, a = i[0], o = i[4], c = i[8], l = i[12], f = i[1], d = i[5], u = i[9], m = i[13], g = i[2], M = i[6], p = i[10], h = i[14], S = i[3], b = i[7], y = i[11], C = i[15], A = r[0], D = r[4], v = r[8], T = r[12], Y = r[1], R = r[5], V = r[9], z = r[13], k = r[2], G = r[6], F = r[10], O = r[14], Q = r[3], $ = r[7], ce = r[11], pe = r[15];
    return s[0] = a * A + o * Y + c * k + l * Q, s[4] = a * D + o * R + c * G + l * $, s[8] = a * v + o * V + c * F + l * ce, s[12] = a * T + o * z + c * O + l * pe, s[1] = f * A + d * Y + u * k + m * Q, s[5] = f * D + d * R + u * G + m * $, s[9] = f * v + d * V + u * F + m * ce, s[13] = f * T + d * z + u * O + m * pe, s[2] = g * A + M * Y + p * k + h * Q, s[6] = g * D + M * R + p * G + h * $, s[10] = g * v + M * V + p * F + h * ce, s[14] = g * T + M * z + p * O + h * pe, s[3] = S * A + b * Y + y * k + C * Q, s[7] = S * D + b * R + y * G + C * $, s[11] = S * v + b * V + y * F + C * ce, s[15] = S * T + b * z + y * O + C * pe, this;
  }
  /**
   * Multiplies every component of the matrix by the given scalar.
   *
   * @param {number} s - The scalar.
   * @return {Matrix4} A reference to this matrix.
   */
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  /**
   * Computes and returns the determinant of this matrix.
   *
   * Based on the method outlined [here](http://www.euclideanspace.com/maths/algebra/matrix/functions/inverse/fourD/index.html).
   *
   * @return {number} The determinant.
   */
  determinant() {
    const e = this.elements, t = e[0], i = e[4], r = e[8], s = e[12], a = e[1], o = e[5], c = e[9], l = e[13], f = e[2], d = e[6], u = e[10], m = e[14], g = e[3], M = e[7], p = e[11], h = e[15], S = c * m - l * u, b = o * m - l * d, y = o * u - c * d, C = a * m - l * f, A = a * u - c * f, D = a * d - o * f;
    return t * (M * S - p * b + h * y) - i * (g * S - p * C + h * A) + r * (g * b - M * C + h * D) - s * (g * y - M * A + p * D);
  }
  /**
   * Transposes this matrix in place.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  /**
   * Sets the position component for this matrix from the given vector,
   * without affecting the rest of the matrix.
   *
   * @param {number|Vector3} x - The x component of the vector or alternatively the vector object.
   * @param {number} y - The y component of the vector.
   * @param {number} z - The z component of the vector.
   * @return {Matrix4} A reference to this matrix.
   */
  setPosition(e, t, i) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = i), this;
  }
  /**
   * Inverts this matrix, using the [analytic method](https://en.wikipedia.org/wiki/Invertible_matrix#Analytic_solution).
   * You can not invert with a determinant of zero. If you attempt this, the method produces
   * a zero matrix instead.
   *
   * @return {Matrix4} A reference to this matrix.
   */
  invert() {
    const e = this.elements, t = e[0], i = e[1], r = e[2], s = e[3], a = e[4], o = e[5], c = e[6], l = e[7], f = e[8], d = e[9], u = e[10], m = e[11], g = e[12], M = e[13], p = e[14], h = e[15], S = t * o - i * a, b = t * c - r * a, y = t * l - s * a, C = i * c - r * o, A = i * l - s * o, D = r * l - s * c, v = f * M - d * g, T = f * p - u * g, Y = f * h - m * g, R = d * p - u * M, V = d * h - m * M, z = u * h - m * p, k = S * z - b * V + y * R + C * Y - A * T + D * v;
    if (k === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const G = 1 / k;
    return e[0] = (o * z - c * V + l * R) * G, e[1] = (r * V - i * z - s * R) * G, e[2] = (M * D - p * A + h * C) * G, e[3] = (u * A - d * D - m * C) * G, e[4] = (c * Y - a * z - l * T) * G, e[5] = (t * z - r * Y + s * T) * G, e[6] = (p * y - g * D - h * b) * G, e[7] = (f * D - u * y + m * b) * G, e[8] = (a * V - o * Y + l * v) * G, e[9] = (i * Y - t * V - s * v) * G, e[10] = (g * A - M * y + h * S) * G, e[11] = (d * y - f * A - m * S) * G, e[12] = (o * T - a * R - c * v) * G, e[13] = (t * R - i * T + r * v) * G, e[14] = (M * b - g * C - p * S) * G, e[15] = (f * C - d * b + u * S) * G, this;
  }
  /**
   * Multiplies the columns of this matrix by the given vector.
   *
   * @param {Vector3} v - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  scale(e) {
    const t = this.elements, i = e.x, r = e.y, s = e.z;
    return t[0] *= i, t[4] *= r, t[8] *= s, t[1] *= i, t[5] *= r, t[9] *= s, t[2] *= i, t[6] *= r, t[10] *= s, t[3] *= i, t[7] *= r, t[11] *= s, this;
  }
  /**
   * Gets the maximum scale value of the three axes.
   *
   * @return {number} The maximum scale.
   */
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], i = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, i, r));
  }
  /**
   * Sets this matrix as a translation transform from the given vector.
   *
   * @param {number|Vector3} x - The amount to translate in the X axis or alternatively a translation vector.
   * @param {number} y - The amount to translate in the Y axis.
   * @param {number} z - The amount to translate in the z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeTranslation(e, t, i) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      i,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the X axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationX(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -i,
      0,
      0,
      i,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Y axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationY(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(
      t,
      0,
      i,
      0,
      0,
      1,
      0,
      0,
      -i,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the Z axis by
   * the given angle.
   *
   * @param {number} theta - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationZ(e) {
    const t = Math.cos(e), i = Math.sin(e);
    return this.set(
      t,
      -i,
      0,
      0,
      i,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a rotational transformation around the given axis by
   * the given angle.
   *
   * This is a somewhat controversial but mathematically sound alternative to
   * rotating via Quaternions. See the discussion [here](https://www.gamedev.net/articles/programming/math-and-physics/do-we-really-need-quaternions-r1199).
   *
   * @param {Vector3} axis - The normalized rotation axis.
   * @param {number} angle - The rotation in radians.
   * @return {Matrix4} A reference to this matrix.
   */
  makeRotationAxis(e, t) {
    const i = Math.cos(t), r = Math.sin(t), s = 1 - i, a = e.x, o = e.y, c = e.z, l = s * a, f = s * o;
    return this.set(
      l * a + i,
      l * o - r * c,
      l * c + r * o,
      0,
      l * o + r * c,
      f * o + i,
      f * c - r * a,
      0,
      l * c - r * o,
      f * c + r * a,
      s * c * c + i,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a scale transformation.
   *
   * @param {number} x - The amount to scale in the X axis.
   * @param {number} y - The amount to scale in the Y axis.
   * @param {number} z - The amount to scale in the Z axis.
   * @return {Matrix4} A reference to this matrix.
   */
  makeScale(e, t, i) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      i,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix as a shear transformation.
   *
   * @param {number} xy - The amount to shear X by Y.
   * @param {number} xz - The amount to shear X by Z.
   * @param {number} yx - The amount to shear Y by X.
   * @param {number} yz - The amount to shear Y by Z.
   * @param {number} zx - The amount to shear Z by X.
   * @param {number} zy - The amount to shear Z by Y.
   * @return {Matrix4} A reference to this matrix.
   */
  makeShear(e, t, i, r, s, a) {
    return this.set(
      1,
      i,
      s,
      0,
      e,
      1,
      a,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  /**
   * Sets this matrix to the transformation composed of the given position,
   * rotation (Quaternion) and scale.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  compose(e, t, i) {
    const r = this.elements, s = t._x, a = t._y, o = t._z, c = t._w, l = s + s, f = a + a, d = o + o, u = s * l, m = s * f, g = s * d, M = a * f, p = a * d, h = o * d, S = c * l, b = c * f, y = c * d, C = i.x, A = i.y, D = i.z;
    return r[0] = (1 - (M + h)) * C, r[1] = (m + y) * C, r[2] = (g - b) * C, r[3] = 0, r[4] = (m - y) * A, r[5] = (1 - (u + h)) * A, r[6] = (p + S) * A, r[7] = 0, r[8] = (g + b) * D, r[9] = (p - S) * D, r[10] = (1 - (u + M)) * D, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  /**
   * Decomposes this matrix into its position, rotation and scale components
   * and provides the result in the given objects.
   *
   * Note: Not all matrices are decomposable in this way. For example, if an
   * object has a non-uniformly scaled parent, then the object's world matrix
   * may not be decomposable, and this method may not be appropriate.
   *
   * @param {Vector3} position - The position vector.
   * @param {Quaternion} quaternion - The rotation as a Quaternion.
   * @param {Vector3} scale - The scale vector.
   * @return {Matrix4} A reference to this matrix.
   */
  decompose(e, t, i) {
    const r = this.elements;
    e.x = r[12], e.y = r[13], e.z = r[14];
    const s = this.determinant();
    if (s === 0)
      return i.set(1, 1, 1), t.identity(), this;
    let a = Di.set(r[0], r[1], r[2]).length();
    const o = Di.set(r[4], r[5], r[6]).length(), c = Di.set(r[8], r[9], r[10]).length();
    s < 0 && (a = -a), Zt.copy(this);
    const l = 1 / a, f = 1 / o, d = 1 / c;
    return Zt.elements[0] *= l, Zt.elements[1] *= l, Zt.elements[2] *= l, Zt.elements[4] *= f, Zt.elements[5] *= f, Zt.elements[6] *= f, Zt.elements[8] *= d, Zt.elements[9] *= d, Zt.elements[10] *= d, t.setFromRotationMatrix(Zt), i.x = a, i.y = o, i.z = c, this;
  }
  /**
  	 * Creates a perspective projection matrix. This is used internally by
  	 * {@link PerspectiveCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makePerspective(e, t, i, r, s, a, o = un, c = !1) {
    const l = this.elements, f = 2 * s / (t - e), d = 2 * s / (i - r), u = (t + e) / (t - e), m = (i + r) / (i - r);
    let g, M;
    if (c)
      g = s / (a - s), M = a * s / (a - s);
    else if (o === un)
      g = -(a + s) / (a - s), M = -2 * a * s / (a - s);
    else if (o === gs)
      g = -a / (a - s), M = -a * s / (a - s);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + o);
    return l[0] = f, l[4] = 0, l[8] = u, l[12] = 0, l[1] = 0, l[5] = d, l[9] = m, l[13] = 0, l[2] = 0, l[6] = 0, l[10] = g, l[14] = M, l[3] = 0, l[7] = 0, l[11] = -1, l[15] = 0, this;
  }
  /**
  	 * Creates a orthographic projection matrix. This is used internally by
  	 * {@link OrthographicCamera#updateProjectionMatrix}.
  
  	 * @param {number} left - Left boundary of the viewing frustum at the near plane.
  	 * @param {number} right - Right boundary of the viewing frustum at the near plane.
  	 * @param {number} top - Top boundary of the viewing frustum at the near plane.
  	 * @param {number} bottom - Bottom boundary of the viewing frustum at the near plane.
  	 * @param {number} near - The distance from the camera to the near plane.
  	 * @param {number} far - The distance from the camera to the far plane.
  	 * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} [coordinateSystem=WebGLCoordinateSystem] - The coordinate system.
  	 * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
  	 * @return {Matrix4} A reference to this matrix.
  	 */
  makeOrthographic(e, t, i, r, s, a, o = un, c = !1) {
    const l = this.elements, f = 2 / (t - e), d = 2 / (i - r), u = -(t + e) / (t - e), m = -(i + r) / (i - r);
    let g, M;
    if (c)
      g = 1 / (a - s), M = a / (a - s);
    else if (o === un)
      g = -2 / (a - s), M = -(a + s) / (a - s);
    else if (o === gs)
      g = -1 / (a - s), M = -s / (a - s);
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + o);
    return l[0] = f, l[4] = 0, l[8] = 0, l[12] = u, l[1] = 0, l[5] = d, l[9] = 0, l[13] = m, l[2] = 0, l[6] = 0, l[10] = g, l[14] = M, l[3] = 0, l[7] = 0, l[11] = 0, l[15] = 1, this;
  }
  /**
   * Returns `true` if this matrix is equal with the given one.
   *
   * @param {Matrix4} matrix - The matrix to test for equality.
   * @return {boolean} Whether this matrix is equal with the given one.
   */
  equals(e) {
    const t = this.elements, i = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== i[r]) return !1;
    return !0;
  }
  /**
   * Sets the elements of the matrix from the given array.
   *
   * @param {Array<number>} array - The matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Matrix4} A reference to this matrix.
   */
  fromArray(e, t = 0) {
    for (let i = 0; i < 16; i++)
      this.elements[i] = e[i + t];
    return this;
  }
  /**
   * Writes the elements of this matrix to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the matrix elements in column-major order.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The matrix elements in column-major order.
   */
  toArray(e = [], t = 0) {
    const i = this.elements;
    return e[t] = i[0], e[t + 1] = i[1], e[t + 2] = i[2], e[t + 3] = i[3], e[t + 4] = i[4], e[t + 5] = i[5], e[t + 6] = i[6], e[t + 7] = i[7], e[t + 8] = i[8], e[t + 9] = i[9], e[t + 10] = i[10], e[t + 11] = i[11], e[t + 12] = i[12], e[t + 13] = i[13], e[t + 14] = i[14], e[t + 15] = i[15], e;
  }
}
const Di = /* @__PURE__ */ new B(), Zt = /* @__PURE__ */ new ht(), wh = /* @__PURE__ */ new B(0, 0, 0), Rh = /* @__PURE__ */ new B(1, 1, 1), Xn = /* @__PURE__ */ new B(), Nr = /* @__PURE__ */ new B(), Ot = /* @__PURE__ */ new B(), ol = /* @__PURE__ */ new ht(), ll = /* @__PURE__ */ new sr();
class zn {
  /**
   * Constructs a new euler instance.
   *
   * @param {number} [x=0] - The angle of the x axis in radians.
   * @param {number} [y=0] - The angle of the y axis in radians.
   * @param {number} [z=0] - The angle of the z axis in radians.
   * @param {string} [order=Euler.DEFAULT_ORDER] - A string representing the order that the rotations are applied.
   */
  constructor(e = 0, t = 0, i = 0, r = zn.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = i, this._order = r;
  }
  /**
   * The angle of the x axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  /**
   * The angle of the y axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  /**
   * The angle of the z axis in radians.
   *
   * @type {number}
   * @default 0
   */
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  /**
   * A string representing the order that the rotations are applied.
   *
   * @type {string}
   * @default 'XYZ'
   */
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  /**
   * Sets the Euler components.
   *
   * @param {number} x - The angle of the x axis in radians.
   * @param {number} y - The angle of the y axis in radians.
   * @param {number} z - The angle of the z axis in radians.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  set(e, t, i, r = this._order) {
    return this._x = e, this._y = t, this._z = i, this._order = r, this._onChangeCallback(), this;
  }
  /**
   * Returns a new Euler instance with copied values from this instance.
   *
   * @return {Euler} A clone of this instance.
   */
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  /**
   * Copies the values of the given Euler instance to this instance.
   *
   * @param {Euler} euler - The Euler instance to copy.
   * @return {Euler} A reference to this Euler instance.
   */
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a pure rotation matrix.
   *
   * @param {Matrix4} m - A 4x4 matrix of which the upper 3x3 of matrix is a pure rotation matrix (i.e. unscaled).
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromRotationMatrix(e, t = this._order, i = !0) {
    const r = e.elements, s = r[0], a = r[4], o = r[8], c = r[1], l = r[5], f = r[9], d = r[2], u = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(ze(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-f, m), this._z = Math.atan2(-a, s)) : (this._x = Math.atan2(u, l), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-ze(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(o, m), this._z = Math.atan2(c, l)) : (this._y = Math.atan2(-d, s), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(ze(u, -1, 1)), Math.abs(u) < 0.9999999 ? (this._y = Math.atan2(-d, m), this._z = Math.atan2(-a, l)) : (this._y = 0, this._z = Math.atan2(c, s));
        break;
      case "ZYX":
        this._y = Math.asin(-ze(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(u, m), this._z = Math.atan2(c, s)) : (this._x = 0, this._z = Math.atan2(-a, l));
        break;
      case "YZX":
        this._z = Math.asin(ze(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-f, l), this._y = Math.atan2(-d, s)) : (this._x = 0, this._y = Math.atan2(o, m));
        break;
      case "XZY":
        this._z = Math.asin(-ze(a, -1, 1)), Math.abs(a) < 0.9999999 ? (this._x = Math.atan2(u, l), this._y = Math.atan2(o, s)) : (this._x = Math.atan2(-f, m), this._y = 0);
        break;
      default:
        Ce("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, i === !0 && this._onChangeCallback(), this;
  }
  /**
   * Sets the angles of this Euler instance from a normalized quaternion.
   *
   * @param {Quaternion} q - A normalized Quaternion.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @param {boolean} [update=true] - Whether the internal `onChange` callback should be executed or not.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromQuaternion(e, t, i) {
    return ol.makeRotationFromQuaternion(e), this.setFromRotationMatrix(ol, t, i);
  }
  /**
   * Sets the angles of this Euler instance from the given vector.
   *
   * @param {Vector3} v - The vector.
   * @param {string} [order] - A string representing the order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  /**
   * Resets the euler angle with a new order by creating a quaternion from this
   * euler angle and then setting this euler angle with the quaternion and the
   * new order.
   *
   * Warning: This discards revolution information.
   *
   * @param {string} [newOrder] - A string representing the new order that the rotations are applied.
   * @return {Euler} A reference to this Euler instance.
   */
  reorder(e) {
    return ll.setFromEuler(this), this.setFromQuaternion(ll, e);
  }
  /**
   * Returns `true` if this Euler instance is equal with the given one.
   *
   * @param {Euler} euler - The Euler instance to test for equality.
   * @return {boolean} Whether this Euler instance is equal with the given one.
   */
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  /**
   * Sets this Euler instance's components to values from the given array. The first three
   * entries of the array are assign to the x,y and z components. An optional fourth entry
   * defines the Euler order.
   *
   * @param {Array<number,number,number,?string>} array - An array holding the Euler component values.
   * @return {Euler} A reference to this Euler instance.
   */
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  /**
   * Writes the components of this Euler instance to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number,number,number,string>} [array=[]] - The target array holding the Euler components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number,number,number,string>} The Euler components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
zn.DEFAULT_ORDER = "XYZ";
class Kc {
  /**
   * Constructs a new layers instance, with membership
   * initially set to layer `0`.
   */
  constructor() {
    this.mask = 1;
  }
  /**
   * Sets membership to the given layer, and remove membership all other layers.
   *
   * @param {number} layer - The layer to set.
   */
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  /**
   * Adds membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  /**
   * Adds membership to all layers.
   */
  enableAll() {
    this.mask = -1;
  }
  /**
   * Toggles the membership of the given layer.
   *
   * @param {number} layer - The layer to toggle.
   */
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  /**
   * Removes membership of the given layer.
   *
   * @param {number} layer - The layer to enable.
   */
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  /**
   * Removes the membership from all layers.
   */
  disableAll() {
    this.mask = 0;
  }
  /**
   * Returns `true` if this and the given layers object have at least one
   * layer in common.
   *
   * @param {Layers} layers - The layers to test.
   * @return {boolean } Whether this and the given layers object have at least one layer in common or not.
   */
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  /**
   * Returns `true` if the given layer is enabled.
   *
   * @param {number} layer - The layer to test.
   * @return {boolean } Whether the given layer is enabled or not.
   */
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Ch = 0;
const cl = /* @__PURE__ */ new B(), Li = /* @__PURE__ */ new sr(), En = /* @__PURE__ */ new ht(), Fr = /* @__PURE__ */ new B(), lr = /* @__PURE__ */ new B(), Ph = /* @__PURE__ */ new B(), Dh = /* @__PURE__ */ new sr(), ul = /* @__PURE__ */ new B(1, 0, 0), fl = /* @__PURE__ */ new B(0, 1, 0), hl = /* @__PURE__ */ new B(0, 0, 1), dl = { type: "added" }, Lh = { type: "removed" }, Ii = { type: "childadded", child: null }, Bs = { type: "childremoved", child: null };
class Vt extends rr {
  /**
   * Constructs a new 3D object.
   */
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Ch++ }), this.uuid = br(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Vt.DEFAULT_UP.clone();
    const e = new B(), t = new zn(), i = new sr(), r = new B(1, 1, 1);
    function s() {
      i.setFromEuler(t, !1);
    }
    function a() {
      t.setFromQuaternion(i, void 0, !1);
    }
    t._onChange(s), i._onChange(a), Object.defineProperties(this, {
      /**
       * Represents the object's local position.
       *
       * @name Object3D#position
       * @type {Vector3}
       * @default (0,0,0)
       */
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      /**
       * Represents the object's local rotation as Euler angles, in radians.
       *
       * @name Object3D#rotation
       * @type {Euler}
       * @default (0,0,0)
       */
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      /**
       * Represents the object's local rotation as Quaternions.
       *
       * @name Object3D#quaternion
       * @type {Quaternion}
       */
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: i
      },
      /**
       * Represents the object's local scale.
       *
       * @name Object3D#scale
       * @type {Vector3}
       * @default (1,1,1)
       */
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      /**
       * Represents the object's model-view matrix.
       *
       * @name Object3D#modelViewMatrix
       * @type {Matrix4}
       */
      modelViewMatrix: {
        value: new ht()
      },
      /**
       * Represents the object's normal matrix.
       *
       * @name Object3D#normalMatrix
       * @type {Matrix3}
       */
      normalMatrix: {
        value: new Le()
      }
    }), this.matrix = new ht(), this.matrixWorld = new ht(), this.matrixAutoUpdate = Vt.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new Kc(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = !1, this.userData = {}, this.pivot = null;
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeShadow() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered to a shadow map.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {Camera} shadowCamera - The shadow camera.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} depthMaterial - The depth material.
   * @param {Object} group - The geometry group data.
   */
  onAfterShadow() {
  }
  /**
   * A callback that is executed immediately before a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * A callback that is executed immediately after a 3D object is rendered.
   *
   * @param {Renderer|WebGLRenderer} renderer - The renderer.
   * @param {Object3D} object - The 3D object.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Material} material - The 3D object's material.
   * @param {Object} group - The geometry group data.
   */
  onAfterRender() {
  }
  /**
   * Applies the given transformation matrix to the object and updates the object's position,
   * rotation and scale.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   */
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  /**
   * Applies a rotation represented by given the quaternion to the 3D object.
   *
   * @param {Quaternion} q - The quaternion.
   * @return {Object3D} A reference to this instance.
   */
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  /**
   * Sets the given rotation represented as an axis/angle couple to the 3D object.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   */
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  /**
   * Sets the given rotation represented as Euler angles to the 3D object.
   *
   * @param {Euler} euler - The Euler angles.
   */
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  /**
   * Sets the given rotation represented as rotation matrix to the 3D object.
   *
   * @param {Matrix4} m - Although a 4x4 matrix is expected, the upper 3x3 portion must be
   * a pure rotation matrix (i.e, unscaled).
   */
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  /**
   * Sets the given rotation represented as a Quaternion to the 3D object.
   *
   * @param {Quaternion} q - The Quaternion
   */
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  /**
   * Rotates the 3D object along an axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnAxis(e, t) {
    return Li.setFromAxisAngle(e, t), this.quaternion.multiply(Li), this;
  }
  /**
   * Rotates the 3D object along an axis in world space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateOnWorldAxis(e, t) {
    return Li.setFromAxisAngle(e, t), this.quaternion.premultiply(Li), this;
  }
  /**
   * Rotates the 3D object around its X axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateX(e) {
    return this.rotateOnAxis(ul, e);
  }
  /**
   * Rotates the 3D object around its Y axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateY(e) {
    return this.rotateOnAxis(fl, e);
  }
  /**
   * Rotates the 3D object around its Z axis in local space.
   *
   * @param {number} angle - The angle in radians.
   * @return {Object3D} A reference to this instance.
   */
  rotateZ(e) {
    return this.rotateOnAxis(hl, e);
  }
  /**
   * Translate the 3D object by a distance along the given axis in local space.
   *
   * @param {Vector3} axis - The (normalized) axis vector.
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateOnAxis(e, t) {
    return cl.copy(e).applyQuaternion(this.quaternion), this.position.add(cl.multiplyScalar(t)), this;
  }
  /**
   * Translate the 3D object by a distance along its X-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateX(e) {
    return this.translateOnAxis(ul, e);
  }
  /**
   * Translate the 3D object by a distance along its Y-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateY(e) {
    return this.translateOnAxis(fl, e);
  }
  /**
   * Translate the 3D object by a distance along its Z-axis in local space.
   *
   * @param {number} distance - The distance in world units.
   * @return {Object3D} A reference to this instance.
   */
  translateZ(e) {
    return this.translateOnAxis(hl, e);
  }
  /**
   * Converts the given vector from this 3D object's local space to world space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  /**
   * Converts the given vector from this 3D object's world space to local space.
   *
   * @param {Vector3} vector - The vector to convert.
   * @return {Vector3} The converted vector.
   */
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(En.copy(this.matrixWorld).invert());
  }
  /**
   * Rotates the object to face a point in world space.
   *
   * This method does not support objects having non-uniformly-scaled parent(s).
   *
   * @param {number|Vector3} x - The x coordinate in world space. Alternatively, a vector representing a position in world space
   * @param {number} [y] - The y coordinate in world space.
   * @param {number} [z] - The z coordinate in world space.
   */
  lookAt(e, t, i) {
    e.isVector3 ? Fr.copy(e) : Fr.set(e, t, i);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), lr.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? En.lookAt(lr, Fr, this.up) : En.lookAt(Fr, lr, this.up), this.quaternion.setFromRotationMatrix(En), r && (En.extractRotation(r.matrixWorld), Li.setFromRotationMatrix(En), this.quaternion.premultiply(Li.invert()));
  }
  /**
   * Adds the given 3D object as a child to this 3D object. An arbitrary number of
   * objects may be added. Any current parent on an object passed in here will be
   * removed, since an object can have at most one parent.
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to add.
   * @return {Object3D} A reference to this instance.
   */
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (We("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(dl), Ii.child = e, this.dispatchEvent(Ii), Ii.child = null) : We("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  /**
   * Removes the given 3D object as child from this 3D object.
   * An arbitrary number of objects may be removed.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @param {Object3D} object - The 3D object to remove.
   * @return {Object3D} A reference to this instance.
   */
  remove(e) {
    if (arguments.length > 1) {
      for (let i = 0; i < arguments.length; i++)
        this.remove(arguments[i]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Lh), Bs.child = e, this.dispatchEvent(Bs), Bs.child = null), this;
  }
  /**
   * Removes this 3D object from its current parent.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  /**
   * Removes all child objects.
   *
   * @fires Object3D#removed
   * @fires Object3D#childremoved
   * @return {Object3D} A reference to this instance.
   */
  clear() {
    return this.remove(...this.children);
  }
  /**
   * Adds the given 3D object as a child of this 3D object, while maintaining the object's world
   * transform. This method does not support scene graphs having non-uniformly-scaled nodes(s).
   *
   * @fires Object3D#added
   * @fires Object3D#childadded
   * @param {Object3D} object - The 3D object to attach.
   * @return {Object3D} A reference to this instance.
   */
  attach(e) {
    return this.updateWorldMatrix(!0, !1), En.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), En.multiply(e.parent.matrixWorld)), e.applyMatrix4(En), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(!1, !0), e.dispatchEvent(dl), Ii.child = e, this.dispatchEvent(Ii), Ii.child = null, this;
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching ID.
   *
   * @param {number} id - The id.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching name.
   *
   * @param {string} name - The name.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns the first with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @return {Object3D|undefined} The found 3D object. Returns `undefined` if no 3D object has been found.
   */
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let i = 0, r = this.children.length; i < r; i++) {
      const a = this.children[i].getObjectByProperty(e, t);
      if (a !== void 0)
        return a;
    }
  }
  /**
   * Searches through the 3D object and its children, starting with the 3D object
   * itself, and returns all 3D objects with a matching property value.
   *
   * @param {string} name - The name of the property.
   * @param {any} value - The value.
   * @param {Array<Object3D>} result - The method stores the result in this array.
   * @return {Array<Object3D>} The found 3D objects.
   */
  getObjectsByProperty(e, t, i = []) {
    this[e] === t && i.push(this);
    const r = this.children;
    for (let s = 0, a = r.length; s < a; s++)
      r[s].getObjectsByProperty(e, t, i);
    return i;
  }
  /**
   * Returns a vector representing the position of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's position in world space.
   */
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  /**
   * Returns a Quaternion representing the position of the 3D object in world space.
   *
   * @param {Quaternion} target - The target Quaternion the result is stored to.
   * @return {Quaternion} The 3D object's rotation in world space.
   */
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(lr, e, Ph), e;
  }
  /**
   * Returns a vector representing the scale of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's scale in world space.
   */
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(lr, Dh, e), e;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  /**
   * Abstract method to get intersections between a casted ray and this
   * 3D object. Renderable 3D objects such as {@link Mesh}, {@link Line} or {@link Points}
   * implement this method in order to use raycasting.
   *
   * @abstract
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - An array holding the result of the method.
   */
  raycast() {
  }
  /**
   * Executes the callback on this 3D object and all descendants.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverse(e) {
    e(this);
    const t = this.children;
    for (let i = 0, r = t.length; i < r; i++)
      t[i].traverse(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for visible 3D objects.
   * Descendants of invisible 3D objects are not traversed.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let i = 0, r = t.length; i < r; i++)
      t[i].traverseVisible(e);
  }
  /**
   * Like {@link Object3D#traverse}, but the callback will only be executed for all ancestors.
   *
   * Note: Modifying the scene graph inside the callback is discouraged.
   *
   * @param {Function} callback - A callback function that allows to process the current 3D object.
   */
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  /**
   * Updates the transformation matrix in local space by computing it from the current
   * position, rotation and scale values.
   */
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    const e = this.pivot;
    if (e !== null) {
      const t = e.x, i = e.y, r = e.z, s = this.matrix.elements;
      s[12] += t - s[0] * t - s[4] * i - s[8] * r, s[13] += i - s[1] * t - s[5] * i - s[9] * r, s[14] += r - s[2] * t - s[6] * i - s[10] * r;
    }
    this.matrixWorldNeedsUpdate = !0;
  }
  /**
   * Updates the transformation matrix in world space of this 3D objects and its descendants.
   *
   * To ensure correct results, this method also recomputes the 3D object's transformation matrix in
   * local space. The computation of the local and world matrix can be controlled with the
   * {@link Object3D#matrixAutoUpdate} and {@link Object3D#matrixWorldAutoUpdate} flags which are both
   * `true` by default.  Set these flags to `false` if you need more control over the update matrix process.
   *
   * @param {boolean} [force=false] - When set to `true`, a recomputation of world matrices is forced even
   * when {@link Object3D#matrixWorldNeedsUpdate} is `false`.
   */
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let i = 0, r = t.length; i < r; i++)
      t[i].updateMatrixWorld(e);
  }
  /**
   * An alternative version of {@link Object3D#updateMatrixWorld} with more control over the
   * update of ancestor and descendant nodes.
   *
   * @param {boolean} [updateParents=false] Whether ancestor nodes should be updated or not.
   * @param {boolean} [updateChildren=false] Whether descendant nodes should be updated or not.
   */
  updateWorldMatrix(e, t) {
    const i = this.parent;
    if (e === !0 && i !== null && i.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.matrixWorldAutoUpdate === !0 && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), t === !0) {
      const r = this.children;
      for (let s = 0, a = r.length; s < a; s++)
        r[s].updateWorldMatrix(!1, !0);
    }
  }
  /**
   * Serializes the 3D object into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized 3D object.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", i = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, i.metadata = {
      version: 4.7,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), this.static !== !1 && (r.static = this.static), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.pivot !== null && (r.pivot = this.pivot.toArray()), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.morphTargetDictionary !== void 0 && (r.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (r.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.geometryInfo = this._geometryInfo.map((o) => ({
      ...o,
      boundingBox: o.boundingBox ? o.boundingBox.toJSON() : void 0,
      boundingSphere: o.boundingSphere ? o.boundingSphere.toJSON() : void 0
    })), r.instanceInfo = this._instanceInfo.map((o) => ({ ...o })), r.availableInstanceIds = this._availableInstanceIds.slice(), r.availableGeometryIds = this._availableGeometryIds.slice(), r.nextIndexStart = this._nextIndexStart, r.nextVertexStart = this._nextVertexStart, r.geometryCount = this._geometryCount, r.maxInstanceCount = this._maxInstanceCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.matricesTexture = this._matricesTexture.toJSON(e), r.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (r.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (r.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (r.boundingBox = this.boundingBox.toJSON()));
    function s(o, c) {
      return o[c.uuid] === void 0 && (o[c.uuid] = c.toJSON(e)), c.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = s(e.geometries, this.geometry);
      const o = this.geometry.parameters;
      if (o !== void 0 && o.shapes !== void 0) {
        const c = o.shapes;
        if (Array.isArray(c))
          for (let l = 0, f = c.length; l < f; l++) {
            const d = c[l];
            s(e.shapes, d);
          }
        else
          s(e.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (s(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const o = [];
        for (let c = 0, l = this.material.length; c < l; c++)
          o.push(s(e.materials, this.material[c]));
        r.material = o;
      } else
        r.material = s(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let o = 0; o < this.children.length; o++)
        r.children.push(this.children[o].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let o = 0; o < this.animations.length; o++) {
        const c = this.animations[o];
        r.animations.push(s(e.animations, c));
      }
    }
    if (t) {
      const o = a(e.geometries), c = a(e.materials), l = a(e.textures), f = a(e.images), d = a(e.shapes), u = a(e.skeletons), m = a(e.animations), g = a(e.nodes);
      o.length > 0 && (i.geometries = o), c.length > 0 && (i.materials = c), l.length > 0 && (i.textures = l), f.length > 0 && (i.images = f), d.length > 0 && (i.shapes = d), u.length > 0 && (i.skeletons = u), m.length > 0 && (i.animations = m), g.length > 0 && (i.nodes = g);
    }
    return i.object = r, i;
    function a(o) {
      const c = [];
      for (const l in o) {
        const f = o[l];
        delete f.metadata, c.push(f);
      }
      return c;
    }
  }
  /**
   * Returns a new 3D object with copied values from this instance.
   *
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are also cloned.
   * @return {Object3D} A clone of this instance.
   */
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  /**
   * Copies the values of the given 3D object to this instance.
   *
   * @param {Object3D} source - The 3D object to copy.
   * @param {boolean} [recursive=true] - When set to `true`, descendants of the 3D object are cloned.
   * @return {Object3D} A reference to this instance.
   */
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), e.pivot !== null && (this.pivot = e.pivot.clone()), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let i = 0; i < e.children.length; i++) {
        const r = e.children[i];
        this.add(r.clone());
      }
    return this;
  }
}
Vt.DEFAULT_UP = /* @__PURE__ */ new B(0, 1, 0);
Vt.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Vt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
class Or extends Vt {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const Ih = { type: "move" };
class zs {
  /**
   * Constructs a new XR controller.
   */
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  /**
   * Returns a group representing the hand space of the XR controller.
   *
   * @return {Group} A group representing the hand space of the XR controller.
   */
  getHandSpace() {
    return this._hand === null && (this._hand = new Or(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  /**
   * Returns a group representing the target ray space of the XR controller.
   *
   * @return {Group} A group representing the target ray space of the XR controller.
   */
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new Or(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new B(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new B()), this._targetRay;
  }
  /**
   * Returns a group representing the grip space of the XR controller.
   *
   * @return {Group} A group representing the grip space of the XR controller.
   */
  getGripSpace() {
    return this._grip === null && (this._grip = new Or(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new B(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new B()), this._grip;
  }
  /**
   * Dispatches the given event to the groups representing
   * the different coordinate spaces of the XR controller.
   *
   * @param {Object} event - The event to dispatch.
   * @return {WebXRController} A reference to this instance.
   */
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  /**
   * Connects the controller with the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const i of e.hand.values())
          this._getHandJoint(t, i);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  /**
   * Disconnects the controller from the given XR input source.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @return {WebXRController} A reference to this instance.
   */
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  /**
   * Updates the controller with the given input source, XR frame and reference space.
   * This updates the transformations of the groups that represent the different
   * coordinate systems of the controller.
   *
   * @param {XRInputSource} inputSource - The input source.
   * @param {XRFrame} frame - The XR frame.
   * @param {XRReferenceSpace} referenceSpace - The reference space.
   * @return {WebXRController} A reference to this instance.
   */
  update(e, t, i) {
    let r = null, s = null, a = null;
    const o = this._targetRay, c = this._grip, l = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (l && e.hand) {
        a = !0;
        for (const M of e.hand.values()) {
          const p = t.getJointPose(M, i), h = this._getHandJoint(l, M);
          p !== null && (h.matrix.fromArray(p.transform.matrix), h.matrix.decompose(h.position, h.rotation, h.scale), h.matrixWorldNeedsUpdate = !0, h.jointRadius = p.radius), h.visible = p !== null;
        }
        const f = l.joints["index-finger-tip"], d = l.joints["thumb-tip"], u = f.position.distanceTo(d.position), m = 0.02, g = 5e-3;
        l.inputState.pinching && u > m + g ? (l.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !l.inputState.pinching && u <= m - g && (l.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        c !== null && e.gripSpace && (s = t.getPose(e.gripSpace, i), s !== null && (c.matrix.fromArray(s.transform.matrix), c.matrix.decompose(c.position, c.rotation, c.scale), c.matrixWorldNeedsUpdate = !0, s.linearVelocity ? (c.hasLinearVelocity = !0, c.linearVelocity.copy(s.linearVelocity)) : c.hasLinearVelocity = !1, s.angularVelocity ? (c.hasAngularVelocity = !0, c.angularVelocity.copy(s.angularVelocity)) : c.hasAngularVelocity = !1));
      o !== null && (r = t.getPose(e.targetRaySpace, i), r === null && s !== null && (r = s), r !== null && (o.matrix.fromArray(r.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(r.linearVelocity)) : o.hasLinearVelocity = !1, r.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(r.angularVelocity)) : o.hasAngularVelocity = !1, this.dispatchEvent(Ih)));
    }
    return o !== null && (o.visible = r !== null), c !== null && (c.visible = s !== null), l !== null && (l.visible = a !== null), this;
  }
  /**
   * Returns a group representing the hand joint for the given input joint.
   *
   * @private
   * @param {Group} hand - The group representing the hand space.
   * @param {XRJointSpace} inputjoint - The hand joint data.
   * @return {Group} A group representing the hand joint for the given input joint.
   */
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const i = new Or();
      i.matrixAutoUpdate = !1, i.visible = !1, e.joints[t.jointName] = i, e.add(i);
    }
    return e.joints[t.jointName];
  }
}
const Zc = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, qn = { h: 0, s: 0, l: 0 }, Br = { h: 0, s: 0, l: 0 };
function Vs(n, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? n + (e - n) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? n + (e - n) * 6 * (2 / 3 - t) : n;
}
class Je {
  /**
   * Constructs a new color.
   *
   * Note that standard method of specifying color in three.js is with a hexadecimal triplet,
   * and that method is used throughout the rest of the documentation.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   */
  constructor(e, t, i) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, i);
  }
  /**
   * Sets the colors's components from the given values.
   *
   * @param {(number|string|Color)} [r] - The red component of the color. If `g` and `b` are
   * not provided, it can be hexadecimal triplet, a CSS-style string or another `Color` instance.
   * @param {number} [g] - The green component.
   * @param {number} [b] - The blue component.
   * @return {Color} A reference to this color.
   */
  set(e, t, i) {
    if (t === void 0 && i === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, i);
    return this;
  }
  /**
   * Sets the colors's components to the given scalar value.
   *
   * @param {number} scalar - The scalar value.
   * @return {Color} A reference to this color.
   */
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  /**
   * Sets this color from a hexadecimal value.
   *
   * @param {number} hex - The hexadecimal value.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHex(e, t = kt) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, Ge.colorSpaceToWorking(this, t), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} r - Red channel value between `0.0` and `1.0`.
   * @param {number} g - Green channel value between `0.0` and `1.0`.
   * @param {number} b - Blue channel value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setRGB(e, t, i, r = Ge.workingColorSpace) {
    return this.r = e, this.g = t, this.b = i, Ge.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from RGB values.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setHSL(e, t, i, r = Ge.workingColorSpace) {
    if (e = Mh(e, 1), t = ze(t, 0, 1), i = ze(i, 0, 1), t === 0)
      this.r = this.g = this.b = i;
    else {
      const s = i <= 0.5 ? i * (1 + t) : i + t - i * t, a = 2 * i - s;
      this.r = Vs(a, s, e + 1 / 3), this.g = Vs(a, s, e), this.b = Vs(a, s, e - 1 / 3);
    }
    return Ge.colorSpaceToWorking(this, r), this;
  }
  /**
   * Sets this color from a CSS-style string. For example, `rgb(250, 0,0)`,
   * `rgb(100%, 0%, 0%)`, `hsl(0, 100%, 50%)`, `#ff0000`, `#f00`, or `red` ( or
   * any [X11 color name](https://en.wikipedia.org/wiki/X11_color_names#Color_name_chart) -
   * all 140 color names are supported).
   *
   * @param {string} style - Color as a CSS-style string.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setStyle(e, t = kt) {
    function i(s) {
      s !== void 0 && parseFloat(s) < 1 && Ce("Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let s;
      const a = r[1], o = r[2];
      switch (a) {
        case "rgb":
        case "rgba":
          if (s = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return i(s[4]), this.setRGB(
              Math.min(255, parseInt(s[1], 10)) / 255,
              Math.min(255, parseInt(s[2], 10)) / 255,
              Math.min(255, parseInt(s[3], 10)) / 255,
              t
            );
          if (s = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return i(s[4]), this.setRGB(
              Math.min(100, parseInt(s[1], 10)) / 100,
              Math.min(100, parseInt(s[2], 10)) / 100,
              Math.min(100, parseInt(s[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (s = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))
            return i(s[4]), this.setHSL(
              parseFloat(s[1]) / 360,
              parseFloat(s[2]) / 100,
              parseFloat(s[3]) / 100,
              t
            );
          break;
        default:
          Ce("Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const s = r[1], a = s.length;
      if (a === 3)
        return this.setRGB(
          parseInt(s.charAt(0), 16) / 15,
          parseInt(s.charAt(1), 16) / 15,
          parseInt(s.charAt(2), 16) / 15,
          t
        );
      if (a === 6)
        return this.setHex(parseInt(s, 16), t);
      Ce("Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  /**
   * Sets this color from a color name. Faster than {@link Color#setStyle} if
   * you don't need the other CSS-style formats.
   *
   * For convenience, the list of names is exposed in `Color.NAMES` as a hash.
   * ```js
   * Color.NAMES.aliceblue // returns 0xF0F8FF
   * ```
   *
   * @param {string} style - The color name.
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {Color} A reference to this color.
   */
  setColorName(e, t = kt) {
    const i = Zc[e.toLowerCase()];
    return i !== void 0 ? this.setHex(i, t) : Ce("Color: Unknown color " + e), this;
  }
  /**
   * Returns a new color with copied values from this instance.
   *
   * @return {Color} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  /**
   * Copies the values of the given color to this instance.
   *
   * @param {Color} color - The color to copy.
   * @return {Color} A reference to this color.
   */
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copySRGBToLinear(e) {
    return this.r = Un(e.r), this.g = Un(e.g), this.b = Un(e.b), this;
  }
  /**
   * Copies the given color into this color, and then converts this color from
   * `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @param {Color} color - The color to copy/convert.
   * @return {Color} A reference to this color.
   */
  copyLinearToSRGB(e) {
    return this.r = Yi(e.r), this.g = Yi(e.g), this.b = Yi(e.b), this;
  }
  /**
   * Converts this color from `SRGBColorSpace` to `LinearSRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  /**
   * Converts this color from `LinearSRGBColorSpace` to `SRGBColorSpace`.
   *
   * @return {Color} A reference to this color.
   */
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  /**
   * Returns the hexadecimal value of this color.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {number} The hexadecimal value.
   */
  getHex(e = kt) {
    return Ge.workingToColorSpace(wt.copy(this), e), Math.round(ze(wt.r * 255, 0, 255)) * 65536 + Math.round(ze(wt.g * 255, 0, 255)) * 256 + Math.round(ze(wt.b * 255, 0, 255));
  }
  /**
   * Returns the hexadecimal value of this color as a string (for example, 'FFFFFF').
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The hexadecimal value as a string.
   */
  getHexString(e = kt) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  /**
   * Converts the colors RGB values into the HSL format and stores them into the
   * given target object.
   *
   * @param {{h:number,s:number,l:number}} target - The target object that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {{h:number,s:number,l:number}} The HSL representation of this color.
   */
  getHSL(e, t = Ge.workingColorSpace) {
    Ge.workingToColorSpace(wt.copy(this), t);
    const i = wt.r, r = wt.g, s = wt.b, a = Math.max(i, r, s), o = Math.min(i, r, s);
    let c, l;
    const f = (o + a) / 2;
    if (o === a)
      c = 0, l = 0;
    else {
      const d = a - o;
      switch (l = f <= 0.5 ? d / (a + o) : d / (2 - a - o), a) {
        case i:
          c = (r - s) / d + (r < s ? 6 : 0);
          break;
        case r:
          c = (s - i) / d + 2;
          break;
        case s:
          c = (i - r) / d + 4;
          break;
      }
      c /= 6;
    }
    return e.h = c, e.s = l, e.l = f, e;
  }
  /**
   * Returns the RGB values of this color and stores them into the given target object.
   *
   * @param {Color} target - The target color that is used to store the method's result.
   * @param {string} [colorSpace=ColorManagement.workingColorSpace] - The color space.
   * @return {Color} The RGB representation of this color.
   */
  getRGB(e, t = Ge.workingColorSpace) {
    return Ge.workingToColorSpace(wt.copy(this), t), e.r = wt.r, e.g = wt.g, e.b = wt.b, e;
  }
  /**
   * Returns the value of this color as a CSS style string. Example: `rgb(255,0,0)`.
   *
   * @param {string} [colorSpace=SRGBColorSpace] - The color space.
   * @return {string} The CSS representation of this color.
   */
  getStyle(e = kt) {
    Ge.workingToColorSpace(wt.copy(this), e);
    const t = wt.r, i = wt.g, r = wt.b;
    return e !== kt ? `color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(i * 255)},${Math.round(r * 255)})`;
  }
  /**
   * Adds the given HSL values to this color's values.
   * Internally, this converts the color's RGB values to HSL, adds HSL
   * and then converts the color back to RGB.
   *
   * @param {number} h - Hue value between `0.0` and `1.0`.
   * @param {number} s - Saturation value between `0.0` and `1.0`.
   * @param {number} l - Lightness value between `0.0` and `1.0`.
   * @return {Color} A reference to this color.
   */
  offsetHSL(e, t, i) {
    return this.getHSL(qn), this.setHSL(qn.h + e, qn.s + t, qn.l + i);
  }
  /**
   * Adds the RGB values of the given color to the RGB values of this color.
   *
   * @param {Color} color - The color to add.
   * @return {Color} A reference to this color.
   */
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  /**
   * Adds the RGB values of the given colors and stores the result in this instance.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @return {Color} A reference to this color.
   */
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  /**
   * Adds the given scalar value to the RGB values of this color.
   *
   * @param {number} s - The scalar to add.
   * @return {Color} A reference to this color.
   */
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  /**
   * Subtracts the RGB values of the given color from the RGB values of this color.
   *
   * @param {Color} color - The color to subtract.
   * @return {Color} A reference to this color.
   */
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  /**
   * Multiplies the RGB values of the given color with the RGB values of this color.
   *
   * @param {Color} color - The color to multiply.
   * @return {Color} A reference to this color.
   */
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  /**
   * Multiplies the given scalar value with the RGB values of this color.
   *
   * @param {number} s - The scalar to multiply.
   * @return {Color} A reference to this color.
   */
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  /**
   * Linearly interpolates this color's RGB values toward the RGB values of the
   * given color. The alpha argument can be thought of as the ratio between
   * the two colors, where `0.0` is this color and `1.0` is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  /**
   * Linearly interpolates between the given colors and stores the result in this instance.
   * The alpha argument can be thought of as the ratio between the two colors, where `0.0`
   * is the first and `1.0` is the second color.
   *
   * @param {Color} color1 - The first color.
   * @param {Color} color2 - The second color.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpColors(e, t, i) {
    return this.r = e.r + (t.r - e.r) * i, this.g = e.g + (t.g - e.g) * i, this.b = e.b + (t.b - e.b) * i, this;
  }
  /**
   * Linearly interpolates this color's HSL values toward the HSL values of the
   * given color. It differs from {@link Color#lerp} by not interpolating straight
   * from one color to the other, but instead going through all the hues in between
   * those two colors. The alpha argument can be thought of as the ratio between
   * the two colors, where 0.0 is this color and 1.0 is the first argument.
   *
   * @param {Color} color - The color to converge on.
   * @param {number} alpha - The interpolation factor in the closed interval `[0,1]`.
   * @return {Color} A reference to this color.
   */
  lerpHSL(e, t) {
    this.getHSL(qn), e.getHSL(Br);
    const i = Is(qn.h, Br.h, t), r = Is(qn.s, Br.s, t), s = Is(qn.l, Br.l, t);
    return this.setHSL(i, r, s), this;
  }
  /**
   * Sets the color's RGB components from the given 3D vector.
   *
   * @param {Vector3} v - The vector to set.
   * @return {Color} A reference to this color.
   */
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  /**
   * Transforms this color with the given 3x3 matrix.
   *
   * @param {Matrix3} m - The matrix.
   * @return {Color} A reference to this color.
   */
  applyMatrix3(e) {
    const t = this.r, i = this.g, r = this.b, s = e.elements;
    return this.r = s[0] * t + s[3] * i + s[6] * r, this.g = s[1] * t + s[4] * i + s[7] * r, this.b = s[2] * t + s[5] * i + s[8] * r, this;
  }
  /**
   * Returns `true` if this color is equal with the given one.
   *
   * @param {Color} c - The color to test for equality.
   * @return {boolean} Whether this bounding color is equal with the given one.
   */
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  /**
   * Sets this color's RGB components from the given array.
   *
   * @param {Array<number>} array - An array holding the RGB values.
   * @param {number} [offset=0] - The offset into the array.
   * @return {Color} A reference to this color.
   */
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  /**
   * Writes the RGB components of this color to the given array. If no array is provided,
   * the method returns a new instance.
   *
   * @param {Array<number>} [array=[]] - The target array holding the color components.
   * @param {number} [offset=0] - Index of the first element in the array.
   * @return {Array<number>} The color components.
   */
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  /**
   * Sets the components of this color from the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - The buffer attribute holding color data.
   * @param {number} index - The index into the attribute.
   * @return {Color} A reference to this color.
   */
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  /**
   * This methods defines the serialization result of this class. Returns the color
   * as a hexadecimal value.
   *
   * @return {number} The hexadecimal value.
   */
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const wt = /* @__PURE__ */ new Je();
Je.NAMES = Zc;
class Uh extends Vt {
  /**
   * Constructs a new scene.
   */
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.backgroundRotation = new zn(), this.environmentIntensity = 1, this.environmentRotation = new zn(), this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, this.backgroundRotation.copy(e.backgroundRotation), this.environmentIntensity = e.environmentIntensity, this.environmentRotation.copy(e.environmentRotation), e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t.object.backgroundRotation = this.backgroundRotation.toArray(), this.environmentIntensity !== 1 && (t.object.environmentIntensity = this.environmentIntensity), t.object.environmentRotation = this.environmentRotation.toArray(), t;
  }
}
const $t = /* @__PURE__ */ new B(), Tn = /* @__PURE__ */ new B(), Gs = /* @__PURE__ */ new B(), yn = /* @__PURE__ */ new B(), Ui = /* @__PURE__ */ new B(), Ni = /* @__PURE__ */ new B(), pl = /* @__PURE__ */ new B(), Hs = /* @__PURE__ */ new B(), ks = /* @__PURE__ */ new B(), Ws = /* @__PURE__ */ new B(), Xs = /* @__PURE__ */ new ct(), qs = /* @__PURE__ */ new ct(), Ys = /* @__PURE__ */ new ct();
class Qt {
  /**
   * Constructs a new triangle.
   *
   * @param {Vector3} [a=(0,0,0)] - The first corner of the triangle.
   * @param {Vector3} [b=(0,0,0)] - The second corner of the triangle.
   * @param {Vector3} [c=(0,0,0)] - The third corner of the triangle.
   */
  constructor(e = new B(), t = new B(), i = new B()) {
    this.a = e, this.b = t, this.c = i;
  }
  /**
   * Computes the normal vector of a triangle.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  static getNormal(e, t, i, r) {
    r.subVectors(i, t), $t.subVectors(e, t), r.cross($t);
    const s = r.lengthSq();
    return s > 0 ? r.multiplyScalar(1 / Math.sqrt(s)) : r.set(0, 0, 0);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  static getBarycoord(e, t, i, r, s) {
    $t.subVectors(r, t), Tn.subVectors(i, t), Gs.subVectors(e, t);
    const a = $t.dot($t), o = $t.dot(Tn), c = $t.dot(Gs), l = Tn.dot(Tn), f = Tn.dot(Gs), d = a * l - o * o;
    if (d === 0)
      return s.set(0, 0, 0), null;
    const u = 1 / d, m = (l * c - o * f) * u, g = (a * f - o * c) * u;
    return s.set(1 - m - g, g, m);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  static containsPoint(e, t, i, r) {
    return this.getBarycoord(e, t, i, r, yn) === null ? !1 : yn.x >= 0 && yn.y >= 0 && yn.x + yn.y <= 1;
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} p1 - The first corner of the triangle.
   * @param {Vector3} p2 - The second corner of the triangle.
   * @param {Vector3} p3 - The third corner of the triangle.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  static getInterpolation(e, t, i, r, s, a, o, c) {
    return this.getBarycoord(e, t, i, r, yn) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(s, yn.x), c.addScaledVector(a, yn.y), c.addScaledVector(o, yn.z), c);
  }
  /**
   * Computes the value barycentrically interpolated for the given attribute and indices.
   *
   * @param {BufferAttribute} attr - The attribute to interpolate.
   * @param {number} i1 - Index of first vertex.
   * @param {number} i2 - Index of second vertex.
   * @param {number} i3 - Index of third vertex.
   * @param {Vector3} barycoord - The barycoordinate value to use to interpolate.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The interpolated attribute value.
   */
  static getInterpolatedAttribute(e, t, i, r, s, a) {
    return Xs.setScalar(0), qs.setScalar(0), Ys.setScalar(0), Xs.fromBufferAttribute(e, t), qs.fromBufferAttribute(e, i), Ys.fromBufferAttribute(e, r), a.setScalar(0), a.addScaledVector(Xs, s.x), a.addScaledVector(qs, s.y), a.addScaledVector(Ys, s.z), a;
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  static isFrontFacing(e, t, i, r) {
    return $t.subVectors(i, t), Tn.subVectors(e, t), $t.cross(Tn).dot(r) < 0;
  }
  /**
   * Sets the triangle's vertices by copying the given values.
   *
   * @param {Vector3} a - The first corner of the triangle.
   * @param {Vector3} b - The second corner of the triangle.
   * @param {Vector3} c - The third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  set(e, t, i) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(i), this;
  }
  /**
   * Sets the triangle's vertices by copying the given array values.
   *
   * @param {Array<Vector3>} points - An array with 3D points.
   * @param {number} i0 - The array index representing the first corner of the triangle.
   * @param {number} i1 - The array index representing the second corner of the triangle.
   * @param {number} i2 - The array index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromPointsAndIndices(e, t, i, r) {
    return this.a.copy(e[t]), this.b.copy(e[i]), this.c.copy(e[r]), this;
  }
  /**
   * Sets the triangle's vertices by copying the given attribute values.
   *
   * @param {BufferAttribute} attribute - A buffer attribute with 3D points data.
   * @param {number} i0 - The attribute index representing the first corner of the triangle.
   * @param {number} i1 - The attribute index representing the second corner of the triangle.
   * @param {number} i2 - The attribute index representing the third corner of the triangle.
   * @return {Triangle} A reference to this triangle.
   */
  setFromAttributeAndIndices(e, t, i, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, i), this.c.fromBufferAttribute(e, r), this;
  }
  /**
   * Returns a new triangle with copied values from this instance.
   *
   * @return {Triangle} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given triangle to this instance.
   *
   * @param {Triangle} triangle - The triangle to copy.
   * @return {Triangle} A reference to this triangle.
   */
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  /**
   * Computes the area of the triangle.
   *
   * @return {number} The triangle's area.
   */
  getArea() {
    return $t.subVectors(this.c, this.b), Tn.subVectors(this.a, this.b), $t.cross(Tn).length() * 0.5;
  }
  /**
   * Computes the midpoint of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's midpoint.
   */
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  /**
   * Computes the normal of the triangle.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The triangle's normal.
   */
  getNormal(e) {
    return Qt.getNormal(this.a, this.b, this.c, e);
  }
  /**
   * Computes a plane the triangle lies within.
   *
   * @param {Plane} target - The target vector that is used to store the method's result.
   * @return {Plane} The plane the triangle lies within.
   */
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  /**
   * Computes a barycentric coordinates from the given vector.
   * Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The barycentric coordinates for the given point
   */
  getBarycoord(e, t) {
    return Qt.getBarycoord(e, this.a, this.b, this.c, t);
  }
  /**
   * Computes the value barycentrically interpolated for the given point on the
   * triangle. Returns `null` if the triangle is degenerate.
   *
   * @param {Vector3} point - Position of interpolated point.
   * @param {Vector3} v1 - Value to interpolate of first vertex.
   * @param {Vector3} v2 - Value to interpolate of second vertex.
   * @param {Vector3} v3 - Value to interpolate of third vertex.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The interpolated value.
   */
  getInterpolation(e, t, i, r, s) {
    return Qt.getInterpolation(e, this.a, this.b, this.c, t, i, r, s);
  }
  /**
   * Returns `true` if the given point, when projected onto the plane of the
   * triangle, lies within the triangle.
   *
   * @param {Vector3} point - The point in 3D space to test.
   * @return {boolean} Whether the given point, when projected onto the plane of the
   * triangle, lies within the triangle or not.
   */
  containsPoint(e) {
    return Qt.containsPoint(e, this.a, this.b, this.c);
  }
  /**
   * Returns `true` if the triangle is oriented towards the given direction.
   *
   * @param {Vector3} direction - The (normalized) direction vector.
   * @return {boolean} Whether the triangle is oriented towards the given direction or not.
   */
  isFrontFacing(e) {
    return Qt.isFrontFacing(this.a, this.b, this.c, e);
  }
  /**
   * Returns `true` if this triangle intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this triangle intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  /**
   * Returns the closest point on the triangle to the given point.
   *
   * @param {Vector3} p - The point to compute the closest point for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on the triangle.
   */
  closestPointToPoint(e, t) {
    const i = this.a, r = this.b, s = this.c;
    let a, o;
    Ui.subVectors(r, i), Ni.subVectors(s, i), Hs.subVectors(e, i);
    const c = Ui.dot(Hs), l = Ni.dot(Hs);
    if (c <= 0 && l <= 0)
      return t.copy(i);
    ks.subVectors(e, r);
    const f = Ui.dot(ks), d = Ni.dot(ks);
    if (f >= 0 && d <= f)
      return t.copy(r);
    const u = c * d - f * l;
    if (u <= 0 && c >= 0 && f <= 0)
      return a = c / (c - f), t.copy(i).addScaledVector(Ui, a);
    Ws.subVectors(e, s);
    const m = Ui.dot(Ws), g = Ni.dot(Ws);
    if (g >= 0 && m <= g)
      return t.copy(s);
    const M = m * l - c * g;
    if (M <= 0 && l >= 0 && g <= 0)
      return o = l / (l - g), t.copy(i).addScaledVector(Ni, o);
    const p = f * g - m * d;
    if (p <= 0 && d - f >= 0 && m - g >= 0)
      return pl.subVectors(s, r), o = (d - f) / (d - f + (m - g)), t.copy(r).addScaledVector(pl, o);
    const h = 1 / (p + M + u);
    return a = M * h, o = u * h, t.copy(i).addScaledVector(Ui, a).addScaledVector(Ni, o);
  }
  /**
   * Returns `true` if this triangle is equal with the given one.
   *
   * @param {Triangle} triangle - The triangle to test for equality.
   * @return {boolean} Whether this triangle is equal with the given one.
   */
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
class Ar {
  /**
   * Constructs a new bounding box.
   *
   * @param {Vector3} [min=(Infinity,Infinity,Infinity)] - A vector representing the lower boundary of the box.
   * @param {Vector3} [max=(-Infinity,-Infinity,-Infinity)] - A vector representing the upper boundary of the box.
   */
  constructor(e = new B(1 / 0, 1 / 0, 1 / 0), t = new B(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  /**
   * Sets the lower and upper boundaries of this box.
   * Please note that this method only copies the values from the given objects.
   *
   * @param {Vector3} min - The lower boundary of the box.
   * @param {Vector3} max - The upper boundary of the box.
   * @return {Box3} A reference to this bounding box.
   */
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<number>} array - An array holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t += 3)
      this.expandByPoint(jt.fromArray(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given buffer attribute.
   *
   * @param {BufferAttribute} attribute - A buffer attribute holding 3D position data.
   * @return {Box3} A reference to this bounding box.
   */
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, i = e.count; t < i; t++)
      this.expandByPoint(jt.fromBufferAttribute(e, t));
    return this;
  }
  /**
   * Sets the upper and lower bounds of this box so it encloses the position data
   * in the given array.
   *
   * @param {Array<Vector3>} points - An array holding 3D position data as instances of {@link Vector3}.
   * @return {Box3} A reference to this bounding box.
   */
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, i = e.length; t < i; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  /**
   * Centers this box on the given center vector and sets this box's width, height and
   * depth to the given size values.
   *
   * @param {Vector3} center - The center of the box.
   * @param {Vector3} size - The x, y and z dimensions of the box.
   * @return {Box3} A reference to this bounding box.
   */
  setFromCenterAndSize(e, t) {
    const i = jt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(i), this.max.copy(e).add(i), this;
  }
  /**
   * Computes the world-axis-aligned bounding box for the given 3D object
   * (including its children), accounting for the object's, and children's,
   * world transforms. The function may result in a larger box than strictly necessary.
   *
   * @param {Object3D} object - The 3D object to compute the bounding box for.
   * @param {boolean} [precise=false] - If set to `true`, the method computes the smallest
   * world-axis-aligned bounding box at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  /**
   * Returns a new box with copied values from this instance.
   *
   * @return {Box3} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given box to this instance.
   *
   * @param {Box3} box - The box to copy.
   * @return {Box3} A reference to this bounding box.
   */
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  /**
   * Makes this box empty which means in encloses a zero space in 3D.
   *
   * @return {Box3} A reference to this bounding box.
   */
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  /**
   * Returns true if this box includes zero points within its bounds.
   * Note that a box with equal lower and upper bounds still includes one
   * point, the one both bounds share.
   *
   * @return {boolean} Whether this box is empty or not.
   */
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  /**
   * Returns the center point of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The center point.
   */
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  /**
   * Returns the dimensions of this box.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The size.
   */
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  /**
   * Expands the boundaries of this box to include the given point.
   *
   * @param {Vector3} point - The point that should be included by the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  /**
   * Expands this box equilaterally by the given vector. The width of this
   * box will be expanded by the x component of the vector in both
   * directions. The height of this box will be expanded by the y component of
   * the vector in both directions. The depth of this box will be
   * expanded by the z component of the vector in both directions.
   *
   * @param {Vector3} vector - The vector that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  /**
   * Expands each dimension of the box by the given scalar. If negative, the
   * dimensions of the box will be contracted.
   *
   * @param {number} scalar - The scalar value that should expand the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  /**
   * Expands the boundaries of this box to include the given 3D object and
   * its children, accounting for the object's, and children's, world
   * transforms. The function may result in a larger box than strictly
   * necessary (unless the precise parameter is set to true).
   *
   * @param {Object3D} object - The 3D object that should expand the bounding box.
   * @param {boolean} precise - If set to `true`, the method expands the bounding box
   * as little as necessary at the expense of more computation.
   * @return {Box3} A reference to this bounding box.
   */
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const i = e.geometry;
    if (i !== void 0) {
      const s = i.getAttribute("position");
      if (t === !0 && s !== void 0 && e.isInstancedMesh !== !0)
        for (let a = 0, o = s.count; a < o; a++)
          e.isMesh === !0 ? e.getVertexPosition(a, jt) : jt.fromBufferAttribute(s, a), jt.applyMatrix4(e.matrixWorld), this.expandByPoint(jt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), zr.copy(e.boundingBox)) : (i.boundingBox === null && i.computeBoundingBox(), zr.copy(i.boundingBox)), zr.applyMatrix4(e.matrixWorld), this.union(zr);
    }
    const r = e.children;
    for (let s = 0, a = r.length; s < a; s++)
      this.expandByObject(r[s], t);
    return this;
  }
  /**
   * Returns `true` if the given point lies within or on the boundaries of this box.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the bounding box contains the given point or not.
   */
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  /**
   * Returns `true` if this bounding box includes the entirety of the given bounding box.
   * If this box and the given one are identical, this function also returns `true`.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box contains the given bounding box or not.
   */
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  /**
   * Returns a point as a proportion of this box's width, height and depth.
   *
   * @param {Vector3} point - A point in 3D space.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A point as a proportion of this box's width, height and depth.
   */
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  /**
   * Returns `true` if the given bounding box intersects with this bounding box.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with this bounding box.
   */
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  /**
   * Returns `true` if the given bounding sphere intersects with this bounding box.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with this bounding box.
   */
  intersectsSphere(e) {
    return this.clampPoint(e.center, jt), jt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  /**
   * Returns `true` if the given plane intersects with this bounding box.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether the given plane intersects with this bounding box.
   */
  intersectsPlane(e) {
    let t, i;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, i = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, i = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, i += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, i += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, i += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, i += e.normal.z * this.min.z), t <= -e.constant && i >= -e.constant;
  }
  /**
   * Returns `true` if the given triangle intersects with this bounding box.
   *
   * @param {Triangle} triangle - The triangle to test.
   * @return {boolean} Whether the given triangle intersects with this bounding box.
   */
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(cr), Vr.subVectors(this.max, cr), Fi.subVectors(e.a, cr), Oi.subVectors(e.b, cr), Bi.subVectors(e.c, cr), Yn.subVectors(Oi, Fi), Kn.subVectors(Bi, Oi), li.subVectors(Fi, Bi);
    let t = [
      0,
      -Yn.z,
      Yn.y,
      0,
      -Kn.z,
      Kn.y,
      0,
      -li.z,
      li.y,
      Yn.z,
      0,
      -Yn.x,
      Kn.z,
      0,
      -Kn.x,
      li.z,
      0,
      -li.x,
      -Yn.y,
      Yn.x,
      0,
      -Kn.y,
      Kn.x,
      0,
      -li.y,
      li.x,
      0
    ];
    return !Ks(t, Fi, Oi, Bi, Vr) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Ks(t, Fi, Oi, Bi, Vr)) ? !1 : (Gr.crossVectors(Yn, Kn), t = [Gr.x, Gr.y, Gr.z], Ks(t, Fi, Oi, Bi, Vr));
  }
  /**
   * Clamps the given point within the bounds of this box.
   *
   * @param {Vector3} point - The point to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  /**
   * Returns the euclidean distance from any edge of this box to the specified point. If
   * the given point lies inside of this box, the distance will be `0`.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The euclidean distance.
   */
  distanceToPoint(e) {
    return this.clampPoint(e, jt).distanceTo(e);
  }
  /**
   * Returns a bounding sphere that encloses this bounding box.
   *
   * @param {Sphere} target - The target sphere that is used to store the method's result.
   * @return {Sphere} The bounding sphere that encloses this bounding box.
   */
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(jt).length() * 0.5), e;
  }
  /**
   * Computes the intersection of this bounding box and the given one, setting the upper
   * bound of this box to the lesser of the two boxes' upper bounds and the
   * lower bound of this box to the greater of the two boxes' lower bounds. If
   * there's no overlap, makes this box empty.
   *
   * @param {Box3} box - The bounding box to intersect with.
   * @return {Box3} A reference to this bounding box.
   */
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  /**
   * Computes the union of this box and another and the given one, setting the upper
   * bound of this box to the greater of the two boxes' upper bounds and the
   * lower bound of this box to the lesser of the two boxes' lower bounds.
   *
   * @param {Box3} box - The bounding box that will be unioned with this instance.
   * @return {Box3} A reference to this bounding box.
   */
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  /**
   * Transforms this bounding box by the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Box3} A reference to this bounding box.
   */
  applyMatrix4(e) {
    return this.isEmpty() ? this : (bn[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), bn[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), bn[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), bn[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), bn[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), bn[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), bn[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), bn[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(bn), this);
  }
  /**
   * Adds the given offset to both the upper and lower bounds of this bounding box,
   * effectively moving it in 3D space.
   *
   * @param {Vector3} offset - The offset that should be used to translate the bounding box.
   * @return {Box3} A reference to this bounding box.
   */
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  /**
   * Returns `true` if this bounding box is equal with the given one.
   *
   * @param {Box3} box - The box to test for equality.
   * @return {boolean} Whether this bounding box is equal with the given one.
   */
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      min: this.min.toArray(),
      max: this.max.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding box.
   *
   * @param {Object} json - The serialized json to set the box from.
   * @return {Box3} A reference to this bounding box.
   */
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}
const bn = [
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B()
], jt = /* @__PURE__ */ new B(), zr = /* @__PURE__ */ new Ar(), Fi = /* @__PURE__ */ new B(), Oi = /* @__PURE__ */ new B(), Bi = /* @__PURE__ */ new B(), Yn = /* @__PURE__ */ new B(), Kn = /* @__PURE__ */ new B(), li = /* @__PURE__ */ new B(), cr = /* @__PURE__ */ new B(), Vr = /* @__PURE__ */ new B(), Gr = /* @__PURE__ */ new B(), ci = /* @__PURE__ */ new B();
function Ks(n, e, t, i, r) {
  for (let s = 0, a = n.length - 3; s <= a; s += 3) {
    ci.fromArray(n, s);
    const o = r.x * Math.abs(ci.x) + r.y * Math.abs(ci.y) + r.z * Math.abs(ci.z), c = e.dot(ci), l = t.dot(ci), f = i.dot(ci);
    if (Math.max(-Math.max(c, l, f), Math.min(c, l, f)) > o)
      return !1;
  }
  return !0;
}
const ft = /* @__PURE__ */ new B(), Hr = /* @__PURE__ */ new Ze();
let Nh = 0;
class mn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {TypedArray} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, i = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, Object.defineProperty(this, "id", { value: Nh++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = i, this.usage = el, this.updateRanges = [], this.gpuType = cn, this.version = 0;
  }
  /**
   * A callback function that is executed after the renderer has transferred the attribute
   * array data to the GPU.
   */
  onUploadCallback() {
  }
  /**
   * Flag to indicate that this attribute has changed and should be re-sent to
   * the GPU. Set this to `true` when you modify the value of the array.
   *
   * @type {number}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  /**
   * Sets the usage of this buffer attribute.
   *
   * @param {(StaticDrawUsage|DynamicDrawUsage|StreamDrawUsage|StaticReadUsage|DynamicReadUsage|StreamReadUsage|StaticCopyUsage|DynamicCopyUsage|StreamCopyUsage)} value - The usage to set.
   * @return {BufferAttribute} A reference to this buffer attribute.
   */
  setUsage(e) {
    return this.usage = e, this;
  }
  /**
   * Adds a range of data in the data array to be updated on the GPU.
   *
   * @param {number} start - Position at which to start update.
   * @param {number} count - The number of components to update.
   */
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  /**
   * Clears the update ranges.
   */
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  /**
   * Copies the values of the given buffer attribute to this instance.
   *
   * @param {BufferAttribute} source - The buffer attribute to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  /**
   * Copies a vector from the given buffer attribute to this one. The start
   * and destination position in the attribute buffers are represented by the
   * given indices.
   *
   * @param {number} index1 - The destination index into this buffer attribute.
   * @param {BufferAttribute} attribute - The buffer attribute to copy from.
   * @param {number} index2 - The source index into the given buffer attribute.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyAt(e, t, i) {
    e *= this.itemSize, i *= t.itemSize;
    for (let r = 0, s = this.itemSize; r < s; r++)
      this.array[e + r] = t.array[i + r];
    return this;
  }
  /**
   * Copies the given array data into this buffer attribute.
   *
   * @param {(TypedArray|Array)} array - The array to copy.
   * @return {BufferAttribute} A reference to this instance.
   */
  copyArray(e) {
    return this.array.set(e), this;
  }
  /**
   * Applies the given 3x3 matrix to the given attribute. Works with
   * item size `2` and `3`.
   *
   * @param {Matrix3} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, i = this.count; t < i; t++)
        Hr.fromBufferAttribute(this, t), Hr.applyMatrix3(e), this.setXY(t, Hr.x, Hr.y);
    else if (this.itemSize === 3)
      for (let t = 0, i = this.count; t < i; t++)
        ft.fromBufferAttribute(this, t), ft.applyMatrix3(e), this.setXYZ(t, ft.x, ft.y, ft.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyMatrix4(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ft.fromBufferAttribute(this, t), ft.applyMatrix4(e), this.setXYZ(t, ft.x, ft.y, ft.z);
    return this;
  }
  /**
   * Applies the given 3x3 normal matrix to the given attribute. Only works with
   * item size `3`.
   *
   * @param {Matrix3} m - The normal matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  applyNormalMatrix(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ft.fromBufferAttribute(this, t), ft.applyNormalMatrix(e), this.setXYZ(t, ft.x, ft.y, ft.z);
    return this;
  }
  /**
   * Applies the given 4x4 matrix to the given attribute. Only works with
   * item size `3` and with direction vectors.
   *
   * @param {Matrix4} m - The matrix to apply.
   * @return {BufferAttribute} A reference to this instance.
   */
  transformDirection(e) {
    for (let t = 0, i = this.count; t < i; t++)
      ft.fromBufferAttribute(this, t), ft.transformDirection(e), this.setXYZ(t, ft.x, ft.y, ft.z);
    return this;
  }
  /**
   * Sets the given array data in the buffer attribute.
   *
   * @param {(TypedArray|Array)} value - The array data to set.
   * @param {number} [offset=0] - The offset in this buffer attribute's array.
   * @return {BufferAttribute} A reference to this instance.
   */
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  /**
   * Returns the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @return {number} The returned value.
   */
  getComponent(e, t) {
    let i = this.array[e * this.itemSize + t];
    return this.normalized && (i = or(i, this.array)), i;
  }
  /**
   * Sets the given value to the given component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} component - The component index.
   * @param {number} value - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setComponent(e, t, i) {
    return this.normalized && (i = Dt(i, this.array)), this.array[e * this.itemSize + t] = i, this;
  }
  /**
   * Returns the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The x component.
   */
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = or(t, this.array)), t;
  }
  /**
   * Sets the x component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setX(e, t) {
    return this.normalized && (t = Dt(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  /**
   * Returns the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The y component.
   */
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = or(t, this.array)), t;
  }
  /**
   * Sets the y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} y - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setY(e, t) {
    return this.normalized && (t = Dt(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  /**
   * Returns the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The z component.
   */
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = or(t, this.array)), t;
  }
  /**
   * Sets the z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} z - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setZ(e, t) {
    return this.normalized && (t = Dt(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  /**
   * Returns the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @return {number} The w component.
   */
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = or(t, this.array)), t;
  }
  /**
   * Sets the w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} w - The value to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setW(e, t) {
    return this.normalized && (t = Dt(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  /**
   * Sets the x and y component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXY(e, t, i) {
    return e *= this.itemSize, this.normalized && (t = Dt(t, this.array), i = Dt(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this;
  }
  /**
   * Sets the x, y and z component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZ(e, t, i, r) {
    return e *= this.itemSize, this.normalized && (t = Dt(t, this.array), i = Dt(i, this.array), r = Dt(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = r, this;
  }
  /**
   * Sets the x, y, z and w component of the vector at the given index.
   *
   * @param {number} index - The index into the buffer attribute.
   * @param {number} x - The value for the x component to set.
   * @param {number} y - The value for the y component to set.
   * @param {number} z - The value for the z component to set.
   * @param {number} w - The value for the w component to set.
   * @return {BufferAttribute} A reference to this instance.
   */
  setXYZW(e, t, i, r, s) {
    return e *= this.itemSize, this.normalized && (t = Dt(t, this.array), i = Dt(i, this.array), r = Dt(r, this.array), s = Dt(s, this.array)), this.array[e + 0] = t, this.array[e + 1] = i, this.array[e + 2] = r, this.array[e + 3] = s, this;
  }
  /**
   * Sets the given callback function that is executed after the Renderer has transferred
   * the attribute array data to the GPU. Can be used to perform clean-up operations after
   * the upload when attribute data are not needed anymore on the CPU side.
   *
   * @param {Function} callback - The `onUpload()` callback.
   * @return {BufferAttribute} A reference to this instance.
   */
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  /**
   * Returns a new buffer attribute with copied values from this instance.
   *
   * @return {BufferAttribute} A clone of this instance.
   */
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  /**
   * Serializes the buffer attribute into JSON.
   *
   * @return {Object} A JSON object representing the serialized buffer attribute.
   */
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== el && (e.usage = this.usage), e;
  }
}
class $c extends mn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint16Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, i) {
    super(new Uint16Array(e), t, i);
  }
}
class jc extends mn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Uint32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, i) {
    super(new Uint32Array(e), t, i);
  }
}
class Nn extends mn {
  /**
   * Constructs a new buffer attribute.
   *
   * @param {(Array<number>|Float32Array)} array - The array holding the attribute data.
   * @param {number} itemSize - The item size.
   * @param {boolean} [normalized=false] - Whether the data are normalized or not.
   */
  constructor(e, t, i) {
    super(new Float32Array(e), t, i);
  }
}
const Fh = /* @__PURE__ */ new Ar(), ur = /* @__PURE__ */ new B(), Zs = /* @__PURE__ */ new B();
class Ao {
  /**
   * Constructs a new sphere.
   *
   * @param {Vector3} [center=(0,0,0)] - The center of the sphere
   * @param {number} [radius=-1] - The radius of the sphere.
   */
  constructor(e = new B(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  /**
   * Sets the sphere's components by copying the given values.
   *
   * @param {Vector3} center - The center.
   * @param {number} radius - The radius.
   * @return {Sphere} A reference to this sphere.
   */
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  /**
   * Computes the minimum bounding sphere for list of points.
   * If the optional center point is given, it is used as the sphere's
   * center. Otherwise, the center of the axis-aligned bounding box
   * encompassing the points is calculated.
   *
   * @param {Array<Vector3>} points - A list of points in 3D space.
   * @param {Vector3} [optionalCenter] - The center of the sphere.
   * @return {Sphere} A reference to this sphere.
   */
  setFromPoints(e, t) {
    const i = this.center;
    t !== void 0 ? i.copy(t) : Fh.setFromPoints(e).getCenter(i);
    let r = 0;
    for (let s = 0, a = e.length; s < a; s++)
      r = Math.max(r, i.distanceToSquared(e[s]));
    return this.radius = Math.sqrt(r), this;
  }
  /**
   * Copies the values of the given sphere to this instance.
   *
   * @param {Sphere} sphere - The sphere to copy.
   * @return {Sphere} A reference to this sphere.
   */
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  /**
   * Returns `true` if the sphere is empty (the radius set to a negative number).
   *
   * Spheres with a radius of `0` contain only their center point and are not
   * considered to be empty.
   *
   * @return {boolean} Whether this sphere is empty or not.
   */
  isEmpty() {
    return this.radius < 0;
  }
  /**
   * Makes this sphere empty which means in encloses a zero space in 3D.
   *
   * @return {Sphere} A reference to this sphere.
   */
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  /**
   * Returns `true` if this sphere contains the given point inclusive of
   * the surface of the sphere.
   *
   * @param {Vector3} point - The point to check.
   * @return {boolean} Whether this sphere contains the given point or not.
   */
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  /**
   * Returns the closest distance from the boundary of the sphere to the
   * given point. If the sphere contains the point, the distance will
   * be negative.
   *
   * @param {Vector3} point - The point to compute the distance to.
   * @return {number} The distance to the point.
   */
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  /**
   * Returns `true` if this sphere intersects with the given one.
   *
   * @param {Sphere} sphere - The sphere to test.
   * @return {boolean} Whether this sphere intersects with the given one or not.
   */
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  /**
   * Returns `true` if this sphere intersects with the given box.
   *
   * @param {Box3} box - The box to test.
   * @return {boolean} Whether this sphere intersects with the given box or not.
   */
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  /**
   * Returns `true` if this sphere intersects with the given plane.
   *
   * @param {Plane} plane - The plane to test.
   * @return {boolean} Whether this sphere intersects with the given plane or not.
   */
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  /**
   * Clamps a point within the sphere. If the point is outside the sphere, it
   * will clamp it to the closest point on the edge of the sphere. Points
   * already inside the sphere will not be affected.
   *
   * @param {Vector3} point - The plane to clamp.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The clamped point.
   */
  clampPoint(e, t) {
    const i = this.center.distanceToSquared(e);
    return t.copy(e), i > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  /**
   * Returns a bounding box that encloses this sphere.
   *
   * @param {Box3} target - The target box that is used to store the method's result.
   * @return {Box3} The bounding box that encloses this sphere.
   */
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  /**
   * Transforms this sphere with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @return {Sphere} A reference to this sphere.
   */
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  /**
   * Translates the sphere's center by the given offset.
   *
   * @param {Vector3} offset - The offset.
   * @return {Sphere} A reference to this sphere.
   */
  translate(e) {
    return this.center.add(e), this;
  }
  /**
   * Expands the boundaries of this sphere to include the given point.
   *
   * @param {Vector3} point - The point to include.
   * @return {Sphere} A reference to this sphere.
   */
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    ur.subVectors(e, this.center);
    const t = ur.lengthSq();
    if (t > this.radius * this.radius) {
      const i = Math.sqrt(t), r = (i - this.radius) * 0.5;
      this.center.addScaledVector(ur, r / i), this.radius += r;
    }
    return this;
  }
  /**
   * Expands this sphere to enclose both the original sphere and the given sphere.
   *
   * @param {Sphere} sphere - The sphere to include.
   * @return {Sphere} A reference to this sphere.
   */
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Zs.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(ur.copy(e.center).add(Zs)), this.expandByPoint(ur.copy(e.center).sub(Zs))), this);
  }
  /**
   * Returns `true` if this sphere is equal with the given one.
   *
   * @param {Sphere} sphere - The sphere to test for equality.
   * @return {boolean} Whether this bounding sphere is equal with the given one.
   */
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  /**
   * Returns a new sphere with copied values from this instance.
   *
   * @return {Sphere} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @return {Object} Serialized structure with fields representing the object state.
   */
  toJSON() {
    return {
      radius: this.radius,
      center: this.center.toArray()
    };
  }
  /**
   * Returns a serialized structure of the bounding sphere.
   *
   * @param {Object} json - The serialized json to set the sphere from.
   * @return {Sphere} A reference to this bounding sphere.
   */
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}
let Oh = 0;
const Gt = /* @__PURE__ */ new ht(), $s = /* @__PURE__ */ new Vt(), zi = /* @__PURE__ */ new B(), Bt = /* @__PURE__ */ new Ar(), fr = /* @__PURE__ */ new Ar(), vt = /* @__PURE__ */ new B();
class Gn extends rr {
  /**
   * Constructs a new geometry.
   */
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: Oh++ }), this.uuid = br(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  /**
   * Returns the index of this geometry.
   *
   * @return {?BufferAttribute} The index. Returns `null` if no index is defined.
   */
  getIndex() {
    return this.index;
  }
  /**
   * Sets the given index to this geometry.
   *
   * @param {Array<number>|BufferAttribute} index - The index to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (_h(e) ? jc : $c)(e, 1) : this.index = e, this;
  }
  /**
   * Sets the given indirect attribute to this geometry.
   *
   * @param {BufferAttribute} indirect - The attribute holding indirect draw calls.
   * @param {number|Array<number>} [indirectOffset=0] - The offset, in bytes, into the indirect drawing buffer where the value data begins. If an array is provided, multiple indirect draw calls will be made for each offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  setIndirect(e, t = 0) {
    return this.indirect = e, this.indirectOffset = t, this;
  }
  /**
   * Returns the indirect attribute of this geometry.
   *
   * @return {?BufferAttribute} The indirect attribute. Returns `null` if no indirect attribute is defined.
   */
  getIndirect() {
    return this.indirect;
  }
  /**
   * Returns the buffer attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {BufferAttribute|InterleavedBufferAttribute|undefined} The buffer attribute.
   * Returns `undefined` if not attribute has been found.
   */
  getAttribute(e) {
    return this.attributes[e];
  }
  /**
   * Sets the given attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @param {BufferAttribute|InterleavedBufferAttribute} attribute - The attribute to set.
   * @return {BufferGeometry} A reference to this instance.
   */
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  /**
   * Deletes the attribute for the given name.
   *
   * @param {string} name - The attribute name to delete.
   * @return {BufferGeometry} A reference to this instance.
   */
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  /**
   * Returns `true` if this geometry has an attribute for the given name.
   *
   * @param {string} name - The attribute name.
   * @return {boolean} Whether this geometry has an attribute for the given name or not.
   */
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  /**
   * Adds a group to this geometry.
   *
   * @param {number} start - The first element in this draw call. That is the first
   * vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - Specifies how many vertices (or indices) are part of this group.
   * @param {number} [materialIndex=0] - The material array index to use.
   */
  addGroup(e, t, i = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: i
    });
  }
  /**
   * Clears all groups.
   */
  clearGroups() {
    this.groups = [];
  }
  /**
   * Sets the draw range for this geometry.
   *
   * @param {number} start - The first vertex for non-indexed geometry, otherwise the first triangle index.
   * @param {number} count - For non-indexed BufferGeometry, `count` is the number of vertices to render.
   * For indexed BufferGeometry, `count` is the number of indices to render.
   */
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  /**
   * Applies the given 4x4 transformation matrix to the geometry.
   *
   * @param {Matrix4} matrix - The matrix to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const i = this.attributes.normal;
    if (i !== void 0) {
      const s = new Le().getNormalMatrix(e);
      i.applyNormalMatrix(s), i.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  /**
   * Applies the rotation represented by the Quaternion to the geometry.
   *
   * @param {Quaternion} q - The Quaternion to apply.
   * @return {BufferGeometry} A reference to this instance.
   */
  applyQuaternion(e) {
    return Gt.makeRotationFromQuaternion(e), this.applyMatrix4(Gt), this;
  }
  /**
   * Rotates the geometry about the X axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateX(e) {
    return Gt.makeRotationX(e), this.applyMatrix4(Gt), this;
  }
  /**
   * Rotates the geometry about the Y axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateY(e) {
    return Gt.makeRotationY(e), this.applyMatrix4(Gt), this;
  }
  /**
   * Rotates the geometry about the Z axis. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#rotation} for typical
   * real-time mesh rotation.
   *
   * @param {number} angle - The angle in radians.
   * @return {BufferGeometry} A reference to this instance.
   */
  rotateZ(e) {
    return Gt.makeRotationZ(e), this.applyMatrix4(Gt), this;
  }
  /**
   * Translates the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#position} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x offset.
   * @param {number} y - The y offset.
   * @param {number} z - The z offset.
   * @return {BufferGeometry} A reference to this instance.
   */
  translate(e, t, i) {
    return Gt.makeTranslation(e, t, i), this.applyMatrix4(Gt), this;
  }
  /**
   * Scales the geometry. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#scale} for typical
   * real-time mesh rotation.
   *
   * @param {number} x - The x scale.
   * @param {number} y - The y scale.
   * @param {number} z - The z scale.
   * @return {BufferGeometry} A reference to this instance.
   */
  scale(e, t, i) {
    return Gt.makeScale(e, t, i), this.applyMatrix4(Gt), this;
  }
  /**
   * Rotates the geometry to face a point in 3D space. This is typically done as a one time
   * operation, and not during a loop. Use {@link Object3D#lookAt} for typical
   * real-time mesh rotation.
   *
   * @param {Vector3} vector - The target point.
   * @return {BufferGeometry} A reference to this instance.
   */
  lookAt(e) {
    return $s.lookAt(e), $s.updateMatrix(), this.applyMatrix4($s.matrix), this;
  }
  /**
   * Center the geometry based on its bounding box.
   *
   * @return {BufferGeometry} A reference to this instance.
   */
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(zi).negate(), this.translate(zi.x, zi.y, zi.z), this;
  }
  /**
   * Defines a geometry by creating a `position` attribute based on the given array of points. The array
   * can hold 2D or 3D vectors. When using two-dimensional data, the `z` coordinate for all vertices is
   * set to `0`.
   *
   * If the method is used with an existing `position` attribute, the vertex data are overwritten with the
   * data from the array. The length of the array must match the vertex count.
   *
   * @param {Array<Vector2>|Array<Vector3>} points - The points.
   * @return {BufferGeometry} A reference to this instance.
   */
  setFromPoints(e) {
    const t = this.getAttribute("position");
    if (t === void 0) {
      const i = [];
      for (let r = 0, s = e.length; r < s; r++) {
        const a = e[r];
        i.push(a.x, a.y, a.z || 0);
      }
      this.setAttribute("position", new Nn(i, 3));
    } else {
      const i = Math.min(e.length, t.count);
      for (let r = 0; r < i; r++) {
        const s = e[r];
        t.setXYZ(r, s.x, s.y, s.z || 0);
      }
      e.length > t.count && Ce("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = !0;
    }
    return this;
  }
  /**
   * Computes the bounding box of the geometry, and updates the `boundingBox` member.
   * The bounding box is not computed by the engine; it must be computed by your app.
   * You may need to recompute the bounding box if the geometry vertices are modified.
   */
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Ar());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      We("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(
        new B(-1 / 0, -1 / 0, -1 / 0),
        new B(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let i = 0, r = t.length; i < r; i++) {
          const s = t[i];
          Bt.setFromBufferAttribute(s), this.morphTargetsRelative ? (vt.addVectors(this.boundingBox.min, Bt.min), this.boundingBox.expandByPoint(vt), vt.addVectors(this.boundingBox.max, Bt.max), this.boundingBox.expandByPoint(vt)) : (this.boundingBox.expandByPoint(Bt.min), this.boundingBox.expandByPoint(Bt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && We('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  /**
   * Computes the bounding sphere of the geometry, and updates the `boundingSphere` member.
   * The engine automatically computes the bounding sphere when it is needed, e.g., for ray casting or view frustum culling.
   * You may need to recompute the bounding sphere if the geometry vertices are modified.
   */
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new Ao());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      We("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new B(), 1 / 0);
      return;
    }
    if (e) {
      const i = this.boundingSphere.center;
      if (Bt.setFromBufferAttribute(e), t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s];
          fr.setFromBufferAttribute(o), this.morphTargetsRelative ? (vt.addVectors(Bt.min, fr.min), Bt.expandByPoint(vt), vt.addVectors(Bt.max, fr.max), Bt.expandByPoint(vt)) : (Bt.expandByPoint(fr.min), Bt.expandByPoint(fr.max));
        }
      Bt.getCenter(i);
      let r = 0;
      for (let s = 0, a = e.count; s < a; s++)
        vt.fromBufferAttribute(e, s), r = Math.max(r, i.distanceToSquared(vt));
      if (t)
        for (let s = 0, a = t.length; s < a; s++) {
          const o = t[s], c = this.morphTargetsRelative;
          for (let l = 0, f = o.count; l < f; l++)
            vt.fromBufferAttribute(o, l), c && (zi.fromBufferAttribute(e, l), vt.add(zi)), r = Math.max(r, i.distanceToSquared(vt));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && We('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  /**
   * Calculates and adds a tangent attribute to this geometry.
   *
   * The computation is only supported for indexed geometries and if position, normal, and uv attributes
   * are defined. When using a tangent space normal map, prefer the MikkTSpace algorithm provided by
   * {@link BufferGeometryUtils#computeMikkTSpaceTangents} instead.
   */
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      We("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const i = t.position, r = t.normal, s = t.uv;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new mn(new Float32Array(4 * i.count), 4));
    const a = this.getAttribute("tangent"), o = [], c = [];
    for (let v = 0; v < i.count; v++)
      o[v] = new B(), c[v] = new B();
    const l = new B(), f = new B(), d = new B(), u = new Ze(), m = new Ze(), g = new Ze(), M = new B(), p = new B();
    function h(v, T, Y) {
      l.fromBufferAttribute(i, v), f.fromBufferAttribute(i, T), d.fromBufferAttribute(i, Y), u.fromBufferAttribute(s, v), m.fromBufferAttribute(s, T), g.fromBufferAttribute(s, Y), f.sub(l), d.sub(l), m.sub(u), g.sub(u);
      const R = 1 / (m.x * g.y - g.x * m.y);
      isFinite(R) && (M.copy(f).multiplyScalar(g.y).addScaledVector(d, -m.y).multiplyScalar(R), p.copy(d).multiplyScalar(m.x).addScaledVector(f, -g.x).multiplyScalar(R), o[v].add(M), o[T].add(M), o[Y].add(M), c[v].add(p), c[T].add(p), c[Y].add(p));
    }
    let S = this.groups;
    S.length === 0 && (S = [{
      start: 0,
      count: e.count
    }]);
    for (let v = 0, T = S.length; v < T; ++v) {
      const Y = S[v], R = Y.start, V = Y.count;
      for (let z = R, k = R + V; z < k; z += 3)
        h(
          e.getX(z + 0),
          e.getX(z + 1),
          e.getX(z + 2)
        );
    }
    const b = new B(), y = new B(), C = new B(), A = new B();
    function D(v) {
      C.fromBufferAttribute(r, v), A.copy(C);
      const T = o[v];
      b.copy(T), b.sub(C.multiplyScalar(C.dot(T))).normalize(), y.crossVectors(A, T);
      const R = y.dot(c[v]) < 0 ? -1 : 1;
      a.setXYZW(v, b.x, b.y, b.z, R);
    }
    for (let v = 0, T = S.length; v < T; ++v) {
      const Y = S[v], R = Y.start, V = Y.count;
      for (let z = R, k = R + V; z < k; z += 3)
        D(e.getX(z + 0)), D(e.getX(z + 1)), D(e.getX(z + 2));
    }
  }
  /**
   * Computes vertex normals for the given vertex data. For indexed geometries, the method sets
   * each vertex normal to be the average of the face normals of the faces that share that vertex.
   * For non-indexed geometries, vertices are not shared, and the method sets each vertex normal
   * to be the same as the face normal.
   */
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let i = this.getAttribute("normal");
      if (i === void 0)
        i = new mn(new Float32Array(t.count * 3), 3), this.setAttribute("normal", i);
      else
        for (let u = 0, m = i.count; u < m; u++)
          i.setXYZ(u, 0, 0, 0);
      const r = new B(), s = new B(), a = new B(), o = new B(), c = new B(), l = new B(), f = new B(), d = new B();
      if (e)
        for (let u = 0, m = e.count; u < m; u += 3) {
          const g = e.getX(u + 0), M = e.getX(u + 1), p = e.getX(u + 2);
          r.fromBufferAttribute(t, g), s.fromBufferAttribute(t, M), a.fromBufferAttribute(t, p), f.subVectors(a, s), d.subVectors(r, s), f.cross(d), o.fromBufferAttribute(i, g), c.fromBufferAttribute(i, M), l.fromBufferAttribute(i, p), o.add(f), c.add(f), l.add(f), i.setXYZ(g, o.x, o.y, o.z), i.setXYZ(M, c.x, c.y, c.z), i.setXYZ(p, l.x, l.y, l.z);
        }
      else
        for (let u = 0, m = t.count; u < m; u += 3)
          r.fromBufferAttribute(t, u + 0), s.fromBufferAttribute(t, u + 1), a.fromBufferAttribute(t, u + 2), f.subVectors(a, s), d.subVectors(r, s), f.cross(d), i.setXYZ(u + 0, f.x, f.y, f.z), i.setXYZ(u + 1, f.x, f.y, f.z), i.setXYZ(u + 2, f.x, f.y, f.z);
      this.normalizeNormals(), i.needsUpdate = !0;
    }
  }
  /**
   * Ensures every normal vector in a geometry will have a magnitude of `1`. This will
   * correct lighting on the geometry surfaces.
   */
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, i = e.count; t < i; t++)
      vt.fromBufferAttribute(e, t), vt.normalize(), e.setXYZ(t, vt.x, vt.y, vt.z);
  }
  /**
   * Return a new non-index version of this indexed geometry. If the geometry
   * is already non-indexed, the method is a NOOP.
   *
   * @return {BufferGeometry} The non-indexed version of this indexed geometry.
   */
  toNonIndexed() {
    function e(o, c) {
      const l = o.array, f = o.itemSize, d = o.normalized, u = new l.constructor(c.length * f);
      let m = 0, g = 0;
      for (let M = 0, p = c.length; M < p; M++) {
        o.isInterleavedBufferAttribute ? m = c[M] * o.data.stride + o.offset : m = c[M] * f;
        for (let h = 0; h < f; h++)
          u[g++] = l[m++];
      }
      return new mn(u, f, d);
    }
    if (this.index === null)
      return Ce("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Gn(), i = this.index.array, r = this.attributes;
    for (const o in r) {
      const c = r[o], l = e(c, i);
      t.setAttribute(o, l);
    }
    const s = this.morphAttributes;
    for (const o in s) {
      const c = [], l = s[o];
      for (let f = 0, d = l.length; f < d; f++) {
        const u = l[f], m = e(u, i);
        c.push(m);
      }
      t.morphAttributes[o] = c;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const a = this.groups;
    for (let o = 0, c = a.length; o < c; o++) {
      const l = a[o];
      t.addGroup(l.start, l.count, l.materialIndex);
    }
    return t;
  }
  /**
   * Serializes the geometry into JSON.
   *
   * @return {Object} A JSON object representing the serialized geometry.
   */
  toJSON() {
    const e = {
      metadata: {
        version: 4.7,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const c = this.parameters;
      for (const l in c)
        c[l] !== void 0 && (e[l] = c[l]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const i = this.attributes;
    for (const c in i) {
      const l = i[c];
      e.data.attributes[c] = l.toJSON(e.data);
    }
    const r = {};
    let s = !1;
    for (const c in this.morphAttributes) {
      const l = this.morphAttributes[c], f = [];
      for (let d = 0, u = l.length; d < u; d++) {
        const m = l[d];
        f.push(m.toJSON(e.data));
      }
      f.length > 0 && (r[c] = f, s = !0);
    }
    s && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const a = this.groups;
    a.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(a)));
    const o = this.boundingSphere;
    return o !== null && (e.data.boundingSphere = o.toJSON()), e;
  }
  /**
   * Returns a new geometry with copied values from this instance.
   *
   * @return {BufferGeometry} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given geometry to this instance.
   *
   * @param {BufferGeometry} source - The geometry to copy.
   * @return {BufferGeometry} A reference to this instance.
   */
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const i = e.index;
    i !== null && this.setIndex(i.clone());
    const r = e.attributes;
    for (const l in r) {
      const f = r[l];
      this.setAttribute(l, f.clone(t));
    }
    const s = e.morphAttributes;
    for (const l in s) {
      const f = [], d = s[l];
      for (let u = 0, m = d.length; u < m; u++)
        f.push(d[u].clone(t));
      this.morphAttributes[l] = f;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const a = e.groups;
    for (let l = 0, f = a.length; l < f; l++) {
      const d = a[l];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const o = e.boundingBox;
    o !== null && (this.boundingBox = o.clone());
    const c = e.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires BufferGeometry#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
let Bh = 0;
class Ts extends rr {
  /**
   * Constructs a new material.
   */
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Bh++ }), this.uuid = br(), this.name = "", this.type = "Material", this.blending = qi, this.side = ii, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = ma, this.blendDst = _a, this.blendEquation = mi, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new Je(0, 0, 0), this.blendAlpha = 0, this.depthFunc = Ji, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = Qo, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = Ci, this.stencilZFail = Ci, this.stencilZPass = Ci, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.allowOverride = !0, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  /**
   * Sets the alpha value to be used when running an alpha test. The material
   * will not be rendered if the opacity is lower than this value.
   *
   * @type {number}
   * @readonly
   * @default 0
   */
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  /**
   * An optional callback that is executed immediately before the material is used to render a 3D object.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Scene} scene - The scene.
   * @param {Camera} camera - The camera that is used to render the scene.
   * @param {BufferGeometry} geometry - The 3D object's geometry.
   * @param {Object3D} object - The 3D object.
   * @param {Object} group - The geometry group data.
   */
  onBeforeRender() {
  }
  /**
   * An optional callback that is executed immediately before the shader
   * program is compiled. This function is called with the shader source code
   * as a parameter. Useful for the modification of built-in materials.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}. The
   * recommended approach when customizing materials is to use `WebGPURenderer` with the new
   * Node Material system and [TSL](https://github.com/mrdoob/three.js/wiki/Three.js-Shading-Language).
   *
   * @param {{vertexShader:string,fragmentShader:string,uniforms:Object}} shaderobject - The object holds the uniforms and the vertex and fragment shader source.
   * @param {WebGLRenderer} renderer - A reference to the renderer.
   */
  onBeforeCompile() {
  }
  /**
   * In case {@link Material#onBeforeCompile} is used, this callback can be used to identify
   * values of settings used in `onBeforeCompile()`, so three.js can reuse a cached
   * shader or recompile the shader for this material as needed.
   *
   * This method can only be used when rendering with {@link WebGLRenderer}.
   *
   * @return {string} The custom program cache key.
   */
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  /**
   * This method can be used to set default values from parameter objects.
   * It is a generic implementation so it can be used with different types
   * of materials.
   *
   * @param {Object} [values] - The material values to set.
   */
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const i = e[t];
        if (i === void 0) {
          Ce(`Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          Ce(`Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(i) : r && r.isVector3 && i && i.isVector3 ? r.copy(i) : this[t] = i;
      }
  }
  /**
   * Serializes the material into JSON.
   *
   * @param {?(Object|string)} meta - An optional value holding meta information about the serialization.
   * @return {Object} A JSON object representing the serialized material.
   * @see {@link ObjectLoader#parse}
   */
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const i = {
      metadata: {
        version: 4.7,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    i.uuid = this.uuid, i.type = this.type, this.name !== "" && (i.name = this.name), this.color && this.color.isColor && (i.color = this.color.getHex()), this.roughness !== void 0 && (i.roughness = this.roughness), this.metalness !== void 0 && (i.metalness = this.metalness), this.sheen !== void 0 && (i.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (i.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (i.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (i.emissive = this.emissive.getHex()), this.emissiveIntensity !== void 0 && this.emissiveIntensity !== 1 && (i.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (i.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (i.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (i.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (i.shininess = this.shininess), this.clearcoat !== void 0 && (i.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (i.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (i.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (i.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (i.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, i.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.sheenColorMap && this.sheenColorMap.isTexture && (i.sheenColorMap = this.sheenColorMap.toJSON(e).uuid), this.sheenRoughnessMap && this.sheenRoughnessMap.isTexture && (i.sheenRoughnessMap = this.sheenRoughnessMap.toJSON(e).uuid), this.dispersion !== void 0 && (i.dispersion = this.dispersion), this.iridescence !== void 0 && (i.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (i.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (i.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (i.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (i.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (i.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (i.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (i.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (i.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (i.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (i.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (i.lightMap = this.lightMap.toJSON(e).uuid, i.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (i.aoMap = this.aoMap.toJSON(e).uuid, i.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (i.bumpMap = this.bumpMap.toJSON(e).uuid, i.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (i.normalMap = this.normalMap.toJSON(e).uuid, i.normalMapType = this.normalMapType, i.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (i.displacementMap = this.displacementMap.toJSON(e).uuid, i.displacementScale = this.displacementScale, i.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (i.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (i.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (i.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (i.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (i.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (i.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (i.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (i.combine = this.combine)), this.envMapRotation !== void 0 && (i.envMapRotation = this.envMapRotation.toArray()), this.envMapIntensity !== void 0 && (i.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (i.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (i.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (i.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (i.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (i.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (i.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (i.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (i.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (i.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (i.size = this.size), this.shadowSide !== null && (i.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (i.sizeAttenuation = this.sizeAttenuation), this.blending !== qi && (i.blending = this.blending), this.side !== ii && (i.side = this.side), this.vertexColors === !0 && (i.vertexColors = !0), this.opacity < 1 && (i.opacity = this.opacity), this.transparent === !0 && (i.transparent = !0), this.blendSrc !== ma && (i.blendSrc = this.blendSrc), this.blendDst !== _a && (i.blendDst = this.blendDst), this.blendEquation !== mi && (i.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (i.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (i.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (i.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (i.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (i.blendAlpha = this.blendAlpha), this.depthFunc !== Ji && (i.depthFunc = this.depthFunc), this.depthTest === !1 && (i.depthTest = this.depthTest), this.depthWrite === !1 && (i.depthWrite = this.depthWrite), this.colorWrite === !1 && (i.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (i.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== Qo && (i.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (i.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (i.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== Ci && (i.stencilFail = this.stencilFail), this.stencilZFail !== Ci && (i.stencilZFail = this.stencilZFail), this.stencilZPass !== Ci && (i.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (i.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (i.rotation = this.rotation), this.polygonOffset === !0 && (i.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (i.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (i.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (i.linewidth = this.linewidth), this.dashSize !== void 0 && (i.dashSize = this.dashSize), this.gapSize !== void 0 && (i.gapSize = this.gapSize), this.scale !== void 0 && (i.scale = this.scale), this.dithering === !0 && (i.dithering = !0), this.alphaTest > 0 && (i.alphaTest = this.alphaTest), this.alphaHash === !0 && (i.alphaHash = !0), this.alphaToCoverage === !0 && (i.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (i.premultipliedAlpha = !0), this.forceSinglePass === !0 && (i.forceSinglePass = !0), this.allowOverride === !1 && (i.allowOverride = !1), this.wireframe === !0 && (i.wireframe = !0), this.wireframeLinewidth > 1 && (i.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (i.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (i.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (i.flatShading = !0), this.visible === !1 && (i.visible = !1), this.toneMapped === !1 && (i.toneMapped = !1), this.fog === !1 && (i.fog = !1), Object.keys(this.userData).length > 0 && (i.userData = this.userData);
    function r(s) {
      const a = [];
      for (const o in s) {
        const c = s[o];
        delete c.metadata, a.push(c);
      }
      return a;
    }
    if (t) {
      const s = r(e.textures), a = r(e.images);
      s.length > 0 && (i.textures = s), a.length > 0 && (i.images = a);
    }
    return i;
  }
  /**
   * Returns a new material with copied values from this instance.
   *
   * @return {Material} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
  /**
   * Copies the values of the given material to this instance.
   *
   * @param {Material} source - The material to copy.
   * @return {Material} A reference to this instance.
   */
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let i = null;
    if (t !== null) {
      const r = t.length;
      i = new Array(r);
      for (let s = 0; s !== r; ++s)
        i[s] = t[s].clone();
    }
    return this.clippingPlanes = i, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.allowOverride = e.allowOverride, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  /**
   * Frees the GPU-related resources allocated by this instance. Call this
   * method whenever this instance is no longer used in your app.
   *
   * @fires Material#dispose
   */
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  /**
   * Setting this property to `true` indicates the engine the material
   * needs to be recompiled.
   *
   * @type {boolean}
   * @default false
   * @param {boolean} value
   */
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
const An = /* @__PURE__ */ new B(), js = /* @__PURE__ */ new B(), kr = /* @__PURE__ */ new B(), Zn = /* @__PURE__ */ new B(), Js = /* @__PURE__ */ new B(), Wr = /* @__PURE__ */ new B(), Qs = /* @__PURE__ */ new B();
class zh {
  /**
   * Constructs a new ray.
   *
   * @param {Vector3} [origin=(0,0,0)] - The origin of the ray.
   * @param {Vector3} [direction=(0,0,-1)] - The (normalized) direction of the ray.
   */
  constructor(e = new B(), t = new B(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  /**
   * Sets the ray's components by copying the given values.
   *
   * @param {Vector3} origin - The origin.
   * @param {Vector3} direction - The direction.
   * @return {Ray} A reference to this ray.
   */
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  /**
   * Copies the values of the given ray to this instance.
   *
   * @param {Ray} ray - The ray to copy.
   * @return {Ray} A reference to this ray.
   */
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  /**
   * Returns a vector that is located at a given distance along this ray.
   *
   * @param {number} t - The distance along the ray to retrieve a position for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} A position on the ray.
   */
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  /**
   * Adjusts the direction of the ray to point at the given vector in world space.
   *
   * @param {Vector3} v - The target position.
   * @return {Ray} A reference to this ray.
   */
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  /**
   * Shift the origin of this ray along its direction by the given distance.
   *
   * @param {number} t - The distance along the ray to interpolate.
   * @return {Ray} A reference to this ray.
   */
  recast(e) {
    return this.origin.copy(this.at(e, An)), this;
  }
  /**
   * Returns the point along this ray that is closest to the given point.
   *
   * @param {Vector3} point - A point in 3D space to get the closet location on the ray for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The closest point on this ray.
   */
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const i = t.dot(this.direction);
    return i < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, i);
  }
  /**
   * Returns the distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The distance.
   */
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  /**
   * Returns the squared distance of the closest approach between this ray and the given point.
   *
   * @param {Vector3} point - A point in 3D space to compute the distance to.
   * @return {number} The squared distance.
   */
  distanceSqToPoint(e) {
    const t = An.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (An.copy(this.origin).addScaledVector(this.direction, t), An.distanceToSquared(e));
  }
  /**
   * Returns the squared distance between this ray and the given line segment.
   *
   * @param {Vector3} v0 - The start point of the line segment.
   * @param {Vector3} v1 - The end point of the line segment.
   * @param {Vector3} [optionalPointOnRay] - When provided, it receives the point on this ray that is closest to the segment.
   * @param {Vector3} [optionalPointOnSegment] - When provided, it receives the point on the line segment that is closest to this ray.
   * @return {number} The squared distance.
   */
  distanceSqToSegment(e, t, i, r) {
    js.copy(e).add(t).multiplyScalar(0.5), kr.copy(t).sub(e).normalize(), Zn.copy(this.origin).sub(js);
    const s = e.distanceTo(t) * 0.5, a = -this.direction.dot(kr), o = Zn.dot(this.direction), c = -Zn.dot(kr), l = Zn.lengthSq(), f = Math.abs(1 - a * a);
    let d, u, m, g;
    if (f > 0)
      if (d = a * c - o, u = a * o - c, g = s * f, d >= 0)
        if (u >= -g)
          if (u <= g) {
            const M = 1 / f;
            d *= M, u *= M, m = d * (d + a * u + 2 * o) + u * (a * d + u + 2 * c) + l;
          } else
            u = s, d = Math.max(0, -(a * u + o)), m = -d * d + u * (u + 2 * c) + l;
        else
          u = -s, d = Math.max(0, -(a * u + o)), m = -d * d + u * (u + 2 * c) + l;
      else
        u <= -g ? (d = Math.max(0, -(-a * s + o)), u = d > 0 ? -s : Math.min(Math.max(-s, -c), s), m = -d * d + u * (u + 2 * c) + l) : u <= g ? (d = 0, u = Math.min(Math.max(-s, -c), s), m = u * (u + 2 * c) + l) : (d = Math.max(0, -(a * s + o)), u = d > 0 ? s : Math.min(Math.max(-s, -c), s), m = -d * d + u * (u + 2 * c) + l);
    else
      u = a > 0 ? -s : s, d = Math.max(0, -(a * u + o)), m = -d * d + u * (u + 2 * c) + l;
    return i && i.copy(this.origin).addScaledVector(this.direction, d), r && r.copy(js).addScaledVector(kr, u), m;
  }
  /**
   * Intersects this ray with the given sphere, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectSphere(e, t) {
    An.subVectors(e.center, this.origin);
    const i = An.dot(this.direction), r = An.dot(An) - i * i, s = e.radius * e.radius;
    if (r > s) return null;
    const a = Math.sqrt(s - r), o = i - a, c = i + a;
    return c < 0 ? null : o < 0 ? this.at(c, t) : this.at(o, t);
  }
  /**
   * Returns `true` if this ray intersects with the given sphere.
   *
   * @param {Sphere} sphere - The sphere to intersect.
   * @return {boolean} Whether this ray intersects with the given sphere or not.
   */
  intersectsSphere(e) {
    return e.radius < 0 ? !1 : this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  /**
   * Computes the distance from the ray's origin to the given plane. Returns `null` if the ray
   * does not intersect with the plane.
   *
   * @param {Plane} plane - The plane to compute the distance to.
   * @return {?number} Whether this ray intersects with the given sphere or not.
   */
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const i = -(this.origin.dot(e.normal) + e.constant) / t;
    return i >= 0 ? i : null;
  }
  /**
   * Intersects this ray with the given plane, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Plane} plane - The plane to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectPlane(e, t) {
    const i = this.distanceToPlane(e);
    return i === null ? null : this.at(i, t);
  }
  /**
   * Returns `true` if this ray intersects with the given plane.
   *
   * @param {Plane} plane - The plane to intersect.
   * @return {boolean} Whether this ray intersects with the given plane or not.
   */
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  /**
   * Intersects this ray with the given bounding box, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Box3} box - The box to intersect.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectBox(e, t) {
    let i, r, s, a, o, c;
    const l = 1 / this.direction.x, f = 1 / this.direction.y, d = 1 / this.direction.z, u = this.origin;
    return l >= 0 ? (i = (e.min.x - u.x) * l, r = (e.max.x - u.x) * l) : (i = (e.max.x - u.x) * l, r = (e.min.x - u.x) * l), f >= 0 ? (s = (e.min.y - u.y) * f, a = (e.max.y - u.y) * f) : (s = (e.max.y - u.y) * f, a = (e.min.y - u.y) * f), i > a || s > r || ((s > i || isNaN(i)) && (i = s), (a < r || isNaN(r)) && (r = a), d >= 0 ? (o = (e.min.z - u.z) * d, c = (e.max.z - u.z) * d) : (o = (e.max.z - u.z) * d, c = (e.min.z - u.z) * d), i > c || o > r) || ((o > i || i !== i) && (i = o), (c < r || r !== r) && (r = c), r < 0) ? null : this.at(i >= 0 ? i : r, t);
  }
  /**
   * Returns `true` if this ray intersects with the given box.
   *
   * @param {Box3} box - The box to intersect.
   * @return {boolean} Whether this ray intersects with the given box or not.
   */
  intersectsBox(e) {
    return this.intersectBox(e, An) !== null;
  }
  /**
   * Intersects this ray with the given triangle, returning the intersection
   * point or `null` if there is no intersection.
   *
   * @param {Vector3} a - The first vertex of the triangle.
   * @param {Vector3} b - The second vertex of the triangle.
   * @param {Vector3} c - The third vertex of the triangle.
   * @param {boolean} backfaceCulling - Whether to use backface culling or not.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectTriangle(e, t, i, r, s) {
    Js.subVectors(t, e), Wr.subVectors(i, e), Qs.crossVectors(Js, Wr);
    let a = this.direction.dot(Qs), o;
    if (a > 0) {
      if (r) return null;
      o = 1;
    } else if (a < 0)
      o = -1, a = -a;
    else
      return null;
    Zn.subVectors(this.origin, e);
    const c = o * this.direction.dot(Wr.crossVectors(Zn, Wr));
    if (c < 0)
      return null;
    const l = o * this.direction.dot(Js.cross(Zn));
    if (l < 0 || c + l > a)
      return null;
    const f = -o * Zn.dot(Qs);
    return f < 0 ? null : this.at(f / a, s);
  }
  /**
   * Transforms this ray with the given 4x4 transformation matrix.
   *
   * @param {Matrix4} matrix4 - The transformation matrix.
   * @return {Ray} A reference to this ray.
   */
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  /**
   * Returns `true` if this ray is equal with the given one.
   *
   * @param {Ray} ray - The ray to test for equality.
   * @return {boolean} Whether this ray is equal with the given one.
   */
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  /**
   * Returns a new ray with copied values from this instance.
   *
   * @return {Ray} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class Jc extends Ts {
  /**
   * Constructs a new mesh basic material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new Je(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.envMapRotation = new zn(), this.combine = Pc, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.envMapRotation.copy(e.envMapRotation), this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const ml = /* @__PURE__ */ new ht(), ui = /* @__PURE__ */ new zh(), Xr = /* @__PURE__ */ new Ao(), _l = /* @__PURE__ */ new B(), qr = /* @__PURE__ */ new B(), Yr = /* @__PURE__ */ new B(), Kr = /* @__PURE__ */ new B(), ea = /* @__PURE__ */ new B(), Zr = /* @__PURE__ */ new B(), gl = /* @__PURE__ */ new B(), $r = /* @__PURE__ */ new B();
class xn extends Vt {
  /**
   * Constructs a new mesh.
   *
   * @param {BufferGeometry} [geometry] - The mesh geometry.
   * @param {Material|Array<Material>} [material] - The mesh material.
   */
  constructor(e = new Gn(), t = new Jc()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.morphTargetDictionary = void 0, this.morphTargetInfluences = void 0, this.count = 1, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  /**
   * Sets the values of {@link Mesh#morphTargetDictionary} and {@link Mesh#morphTargetInfluences}
   * to make sure existing morph targets can influence this 3D object.
   */
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, i = Object.keys(t);
    if (i.length > 0) {
      const r = t[i[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let s = 0, a = r.length; s < a; s++) {
          const o = r[s].name || String(s);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[o] = s;
        }
      }
    }
  }
  /**
   * Returns the local-space position of the vertex at the given index, taking into
   * account the current animation state of both morph targets and skinning.
   *
   * @param {number} index - The vertex index.
   * @param {Vector3} target - The target object that is used to store the method's result.
   * @return {Vector3} The vertex position in local space.
   */
  getVertexPosition(e, t) {
    const i = this.geometry, r = i.attributes.position, s = i.morphAttributes.position, a = i.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const o = this.morphTargetInfluences;
    if (s && o) {
      Zr.set(0, 0, 0);
      for (let c = 0, l = s.length; c < l; c++) {
        const f = o[c], d = s[c];
        f !== 0 && (ea.fromBufferAttribute(d, e), a ? Zr.addScaledVector(ea, f) : Zr.addScaledVector(ea.sub(t), f));
      }
      t.add(Zr);
    }
    return t;
  }
  /**
   * Computes intersection points between a casted ray and this line.
   *
   * @param {Raycaster} raycaster - The raycaster.
   * @param {Array<Object>} intersects - The target array that holds the intersection points.
   */
  raycast(e, t) {
    const i = this.geometry, r = this.material, s = this.matrixWorld;
    r !== void 0 && (i.boundingSphere === null && i.computeBoundingSphere(), Xr.copy(i.boundingSphere), Xr.applyMatrix4(s), ui.copy(e.ray).recast(e.near), !(Xr.containsPoint(ui.origin) === !1 && (ui.intersectSphere(Xr, _l) === null || ui.origin.distanceToSquared(_l) > (e.far - e.near) ** 2)) && (ml.copy(s).invert(), ui.copy(e.ray).applyMatrix4(ml), !(i.boundingBox !== null && ui.intersectsBox(i.boundingBox) === !1) && this._computeIntersections(e, t, ui)));
  }
  _computeIntersections(e, t, i) {
    let r;
    const s = this.geometry, a = this.material, o = s.index, c = s.attributes.position, l = s.attributes.uv, f = s.attributes.uv1, d = s.attributes.normal, u = s.groups, m = s.drawRange;
    if (o !== null)
      if (Array.isArray(a))
        for (let g = 0, M = u.length; g < M; g++) {
          const p = u[g], h = a[p.materialIndex], S = Math.max(p.start, m.start), b = Math.min(o.count, Math.min(p.start + p.count, m.start + m.count));
          for (let y = S, C = b; y < C; y += 3) {
            const A = o.getX(y), D = o.getX(y + 1), v = o.getX(y + 2);
            r = jr(this, h, e, i, l, f, d, A, D, v), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const g = Math.max(0, m.start), M = Math.min(o.count, m.start + m.count);
        for (let p = g, h = M; p < h; p += 3) {
          const S = o.getX(p), b = o.getX(p + 1), y = o.getX(p + 2);
          r = jr(this, a, e, i, l, f, d, S, b, y), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
    else if (c !== void 0)
      if (Array.isArray(a))
        for (let g = 0, M = u.length; g < M; g++) {
          const p = u[g], h = a[p.materialIndex], S = Math.max(p.start, m.start), b = Math.min(c.count, Math.min(p.start + p.count, m.start + m.count));
          for (let y = S, C = b; y < C; y += 3) {
            const A = y, D = y + 1, v = y + 2;
            r = jr(this, h, e, i, l, f, d, A, D, v), r && (r.faceIndex = Math.floor(y / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const g = Math.max(0, m.start), M = Math.min(c.count, m.start + m.count);
        for (let p = g, h = M; p < h; p += 3) {
          const S = p, b = p + 1, y = p + 2;
          r = jr(this, a, e, i, l, f, d, S, b, y), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
  }
}
function Vh(n, e, t, i, r, s, a, o) {
  let c;
  if (e.side === It ? c = i.intersectTriangle(a, s, r, !0, o) : c = i.intersectTriangle(r, s, a, e.side === ii, o), c === null) return null;
  $r.copy(o), $r.applyMatrix4(n.matrixWorld);
  const l = t.ray.origin.distanceTo($r);
  return l < t.near || l > t.far ? null : {
    distance: l,
    point: $r.clone(),
    object: n
  };
}
function jr(n, e, t, i, r, s, a, o, c, l) {
  n.getVertexPosition(o, qr), n.getVertexPosition(c, Yr), n.getVertexPosition(l, Kr);
  const f = Vh(n, e, t, i, qr, Yr, Kr, gl);
  if (f) {
    const d = new B();
    Qt.getBarycoord(gl, qr, Yr, Kr, d), r && (f.uv = Qt.getInterpolatedAttribute(r, o, c, l, d, new Ze())), s && (f.uv1 = Qt.getInterpolatedAttribute(s, o, c, l, d, new Ze())), a && (f.normal = Qt.getInterpolatedAttribute(a, o, c, l, d, new B()), f.normal.dot(i.direction) > 0 && f.normal.multiplyScalar(-1));
    const u = {
      a: o,
      b: c,
      c: l,
      normal: new B(),
      materialIndex: 0
    };
    Qt.getNormal(qr, Yr, Kr, u.normal), f.face = u, f.barycoord = d;
  }
  return f;
}
class Gh extends Pt {
  /**
   * Constructs a new data texture.
   *
   * @param {?TypedArray} [data=null] - The buffer data.
   * @param {number} [width=1] - The width of the texture.
   * @param {number} [height=1] - The height of the texture.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space.
   */
  constructor(e = null, t = 1, i = 1, r, s, a, o, c, l = yt, f = yt, d, u) {
    super(null, a, o, c, l, f, r, s, d, u), this.isDataTexture = !0, this.image = { data: e, width: t, height: i }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
const ta = /* @__PURE__ */ new B(), Hh = /* @__PURE__ */ new B(), kh = /* @__PURE__ */ new Le();
class pi {
  /**
   * Constructs a new plane.
   *
   * @param {Vector3} [normal=(1,0,0)] - A unit length vector defining the normal of the plane.
   * @param {number} [constant=0] - The signed distance from the origin to the plane.
   */
  constructor(e = new B(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  /**
   * Sets the plane components by copying the given values.
   *
   * @param {Vector3} normal - The normal.
   * @param {number} constant - The constant.
   * @return {Plane} A reference to this plane.
   */
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  /**
   * Sets the plane components by defining `x`, `y`, `z` as the
   * plane normal and `w` as the constant.
   *
   * @param {number} x - The value for the normal's x component.
   * @param {number} y - The value for the normal's y component.
   * @param {number} z - The value for the normal's z component.
   * @param {number} w - The constant value.
   * @return {Plane} A reference to this plane.
   */
  setComponents(e, t, i, r) {
    return this.normal.set(e, t, i), this.constant = r, this;
  }
  /**
   * Sets the plane from the given normal and coplanar point (that is a point
   * that lies onto the plane).
   *
   * @param {Vector3} normal - The normal.
   * @param {Vector3} point - A coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  /**
   * Sets the plane from three coplanar points. The winding order is
   * assumed to be counter-clockwise, and determines the direction of
   * the plane normal.
   *
   * @param {Vector3} a - The first coplanar point.
   * @param {Vector3} b - The second coplanar point.
   * @param {Vector3} c - The third coplanar point.
   * @return {Plane} A reference to this plane.
   */
  setFromCoplanarPoints(e, t, i) {
    const r = ta.subVectors(i, t).cross(Hh.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  /**
   * Copies the values of the given plane to this instance.
   *
   * @param {Plane} plane - The plane to copy.
   * @return {Plane} A reference to this plane.
   */
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  /**
   * Normalizes the plane normal and adjusts the constant accordingly.
   *
   * @return {Plane} A reference to this plane.
   */
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  /**
   * Negates both the plane normal and the constant.
   *
   * @return {Plane} A reference to this plane.
   */
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  /**
   * Returns the signed distance from the given point to this plane.
   *
   * @param {Vector3} point - The point to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  /**
   * Returns the signed distance from the given sphere to this plane.
   *
   * @param {Sphere} sphere - The sphere to compute the distance for.
   * @return {number} The signed distance.
   */
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  /**
   * Projects a the given point onto the plane.
   *
   * @param {Vector3} point - The point to project.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The projected point on the plane.
   */
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  /**
   * Returns the intersection point of the passed line and the plane. Returns
   * `null` if the line does not intersect. Returns the line's starting point if
   * the line is coplanar with the plane.
   *
   * @param {Line3} line - The line to compute the intersection for.
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {?Vector3} The intersection point.
   */
  intersectLine(e, t) {
    const i = e.delta(ta), r = this.normal.dot(i);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const s = -(e.start.dot(this.normal) + this.constant) / r;
    return s < 0 || s > 1 ? null : t.copy(e.start).addScaledVector(i, s);
  }
  /**
   * Returns `true` if the given line segment intersects with (passes through) the plane.
   *
   * @param {Line3} line - The line to test.
   * @return {boolean} Whether the given line segment intersects with the plane or not.
   */
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), i = this.distanceToPoint(e.end);
    return t < 0 && i > 0 || i < 0 && t > 0;
  }
  /**
   * Returns `true` if the given bounding box intersects with the plane.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the given bounding box intersects with the plane or not.
   */
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns `true` if the given bounding sphere intersects with the plane.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the given bounding sphere intersects with the plane or not.
   */
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  /**
   * Returns a coplanar vector to the plane, by calculating the
   * projection of the normal at the origin onto the plane.
   *
   * @param {Vector3} target - The target vector that is used to store the method's result.
   * @return {Vector3} The coplanar point.
   */
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  /**
   * Apply a 4x4 matrix to the plane. The matrix must be an affine, homogeneous transform.
   *
   * The optional normal matrix can be pre-computed like so:
   * ```js
   * const optionalNormalMatrix = new THREE.Matrix3().getNormalMatrix( matrix );
   * ```
   *
   * @param {Matrix4} matrix - The transformation matrix.
   * @param {Matrix4} [optionalNormalMatrix] - A pre-computed normal matrix.
   * @return {Plane} A reference to this plane.
   */
  applyMatrix4(e, t) {
    const i = t || kh.getNormalMatrix(e), r = this.coplanarPoint(ta).applyMatrix4(e), s = this.normal.applyMatrix3(i).normalize();
    return this.constant = -r.dot(s), this;
  }
  /**
   * Translates the plane by the distance defined by the given offset vector.
   * Note that this only affects the plane constant and will not affect the normal vector.
   *
   * @param {Vector3} offset - The offset vector.
   * @return {Plane} A reference to this plane.
   */
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  /**
   * Returns `true` if this plane is equal with the given one.
   *
   * @param {Plane} plane - The plane to test for equality.
   * @return {boolean} Whether this plane is equal with the given one.
   */
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  /**
   * Returns a new plane with copied values from this instance.
   *
   * @return {Plane} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
const fi = /* @__PURE__ */ new Ao(), Wh = /* @__PURE__ */ new Ze(0.5, 0.5), Jr = /* @__PURE__ */ new B();
class Qc {
  /**
   * Constructs a new frustum.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   */
  constructor(e = new pi(), t = new pi(), i = new pi(), r = new pi(), s = new pi(), a = new pi()) {
    this.planes = [e, t, i, r, s, a];
  }
  /**
   * Sets the frustum planes by copying the given planes.
   *
   * @param {Plane} [p0] - The first plane that encloses the frustum.
   * @param {Plane} [p1] - The second plane that encloses the frustum.
   * @param {Plane} [p2] - The third plane that encloses the frustum.
   * @param {Plane} [p3] - The fourth plane that encloses the frustum.
   * @param {Plane} [p4] - The fifth plane that encloses the frustum.
   * @param {Plane} [p5] - The sixth plane that encloses the frustum.
   * @return {Frustum} A reference to this frustum.
   */
  set(e, t, i, r, s, a) {
    const o = this.planes;
    return o[0].copy(e), o[1].copy(t), o[2].copy(i), o[3].copy(r), o[4].copy(s), o[5].copy(a), this;
  }
  /**
   * Copies the values of the given frustum to this instance.
   *
   * @param {Frustum} frustum - The frustum to copy.
   * @return {Frustum} A reference to this frustum.
   */
  copy(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++)
      t[i].copy(e.planes[i]);
    return this;
  }
  /**
   * Sets the frustum planes from the given projection matrix.
   *
   * @param {Matrix4} m - The projection matrix.
   * @param {(WebGLCoordinateSystem|WebGPUCoordinateSystem)} coordinateSystem - The coordinate system.
   * @param {boolean} [reversedDepth=false] - Whether to use a reversed depth.
   * @return {Frustum} A reference to this frustum.
   */
  setFromProjectionMatrix(e, t = un, i = !1) {
    const r = this.planes, s = e.elements, a = s[0], o = s[1], c = s[2], l = s[3], f = s[4], d = s[5], u = s[6], m = s[7], g = s[8], M = s[9], p = s[10], h = s[11], S = s[12], b = s[13], y = s[14], C = s[15];
    if (r[0].setComponents(l - a, m - f, h - g, C - S).normalize(), r[1].setComponents(l + a, m + f, h + g, C + S).normalize(), r[2].setComponents(l + o, m + d, h + M, C + b).normalize(), r[3].setComponents(l - o, m - d, h - M, C - b).normalize(), i)
      r[4].setComponents(c, u, p, y).normalize(), r[5].setComponents(l - c, m - u, h - p, C - y).normalize();
    else if (r[4].setComponents(l - c, m - u, h - p, C - y).normalize(), t === un)
      r[5].setComponents(l + c, m + u, h + p, C + y).normalize();
    else if (t === gs)
      r[5].setComponents(c, u, p, y).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  /**
   * Returns `true` if the 3D object's bounding sphere is intersecting this frustum.
   *
   * Note that the 3D object must have a geometry so that the bounding sphere can be calculated.
   *
   * @param {Object3D} object - The 3D object to test.
   * @return {boolean} Whether the 3D object's bounding sphere is intersecting this frustum or not.
   */
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), fi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), fi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(fi);
  }
  /**
   * Returns `true` if the given sprite is intersecting this frustum.
   *
   * @param {Sprite} sprite - The sprite to test.
   * @return {boolean} Whether the sprite is intersecting this frustum or not.
   */
  intersectsSprite(e) {
    fi.center.set(0, 0, 0);
    const t = Wh.distanceTo(e.center);
    return fi.radius = 0.7071067811865476 + t, fi.applyMatrix4(e.matrixWorld), this.intersectsSphere(fi);
  }
  /**
   * Returns `true` if the given bounding sphere is intersecting this frustum.
   *
   * @param {Sphere} sphere - The bounding sphere to test.
   * @return {boolean} Whether the bounding sphere is intersecting this frustum or not.
   */
  intersectsSphere(e) {
    const t = this.planes, i = e.center, r = -e.radius;
    for (let s = 0; s < 6; s++)
      if (t[s].distanceToPoint(i) < r)
        return !1;
    return !0;
  }
  /**
   * Returns `true` if the given bounding box is intersecting this frustum.
   *
   * @param {Box3} box - The bounding box to test.
   * @return {boolean} Whether the bounding box is intersecting this frustum or not.
   */
  intersectsBox(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++) {
      const r = t[i];
      if (Jr.x = r.normal.x > 0 ? e.max.x : e.min.x, Jr.y = r.normal.y > 0 ? e.max.y : e.min.y, Jr.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(Jr) < 0)
        return !1;
    }
    return !0;
  }
  /**
   * Returns `true` if the given point lies within the frustum.
   *
   * @param {Vector3} point - The point to test.
   * @return {boolean} Whether the point lies within this frustum or not.
   */
  containsPoint(e) {
    const t = this.planes;
    for (let i = 0; i < 6; i++)
      if (t[i].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  /**
   * Returns a new frustum with copied values from this instance.
   *
   * @return {Frustum} A clone of this instance.
   */
  clone() {
    return new this.constructor().copy(this);
  }
}
class eu extends Pt {
  /**
   * Constructs a new cube texture.
   *
   * @param {Array<Image>} [images=[]] - An array holding a image for each side of a cube.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearMipmapLinearFilter] - The min filter value.
   * @param {number} [format=RGBAFormat] - The texture format.
   * @param {number} [type=UnsignedByteType] - The texture type.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {string} [colorSpace=NoColorSpace] - The color space value.
   */
  constructor(e = [], t = bi, i, r, s, a, o, c, l, f) {
    super(e, t, i, r, s, a, o, c, l, f), this.isCubeTexture = !0, this.flipY = !1;
  }
  /**
   * Alias for {@link CubeTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Tr extends Pt {
  /**
   * Constructs a new depth texture.
   *
   * @param {number} width - The width of the texture.
   * @param {number} height - The height of the texture.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=Texture.DEFAULT_MAPPING] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=LinearFilter] - The mag filter value.
   * @param {number} [minFilter=LinearFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   * @param {number} [depth=1] - The depth of the texture.
   */
  constructor(e, t, i = vn, r, s, a, o = yt, c = yt, l, f = Bn, d = 1) {
    if (f !== Bn && f !== xi)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    const u = { width: e, height: t, depth: d };
    super(u, r, s, a, o, c, f, i, l), this.isDepthTexture = !0, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.source = new bo(Object.assign({}, e.image)), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
class Xh extends Tr {
  /**
   * Constructs a new cube depth texture.
   *
   * @param {number} size - The size (width and height) of each cube face.
   * @param {number} [type=UnsignedIntType] - The texture type.
   * @param {number} [mapping=CubeReflectionMapping] - The texture mapping.
   * @param {number} [wrapS=ClampToEdgeWrapping] - The wrapS value.
   * @param {number} [wrapT=ClampToEdgeWrapping] - The wrapT value.
   * @param {number} [magFilter=NearestFilter] - The mag filter value.
   * @param {number} [minFilter=NearestFilter] - The min filter value.
   * @param {number} [anisotropy=Texture.DEFAULT_ANISOTROPY] - The anisotropy value.
   * @param {number} [format=DepthFormat] - The texture format.
   */
  constructor(e, t = vn, i = bi, r, s, a = yt, o = yt, c, l = Bn) {
    const f = { width: e, height: e, depth: 1 }, d = [f, f, f, f, f, f];
    super(e, e, t, i, r, s, a, o, c, l), this.image = d, this.isCubeDepthTexture = !0, this.isCubeTexture = !0;
  }
  /**
   * Alias for {@link CubeDepthTexture#image}.
   *
   * @type {Array<Image>}
   */
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class tu extends Pt {
  /**
   * Creates a new raw texture.
   *
   * @param {?(WebGLTexture|GPUTexture)} [sourceTexture=null] - The external texture.
   */
  constructor(e = null) {
    super(), this.sourceTexture = e, this.isExternalTexture = !0;
  }
  copy(e) {
    return super.copy(e), this.sourceTexture = e.sourceTexture, this;
  }
}
class wr extends Gn {
  /**
   * Constructs a new box geometry.
   *
   * @param {number} [width=1] - The width. That is, the length of the edges parallel to the X axis.
   * @param {number} [height=1] - The height. That is, the length of the edges parallel to the Y axis.
   * @param {number} [depth=1] - The depth. That is, the length of the edges parallel to the Z axis.
   * @param {number} [widthSegments=1] - Number of segmented rectangular faces along the width of the sides.
   * @param {number} [heightSegments=1] - Number of segmented rectangular faces along the height of the sides.
   * @param {number} [depthSegments=1] - Number of segmented rectangular faces along the depth of the sides.
   */
  constructor(e = 1, t = 1, i = 1, r = 1, s = 1, a = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: i,
      widthSegments: r,
      heightSegments: s,
      depthSegments: a
    };
    const o = this;
    r = Math.floor(r), s = Math.floor(s), a = Math.floor(a);
    const c = [], l = [], f = [], d = [];
    let u = 0, m = 0;
    g("z", "y", "x", -1, -1, i, t, e, a, s, 0), g("z", "y", "x", 1, -1, i, t, -e, a, s, 1), g("x", "z", "y", 1, 1, e, i, t, r, a, 2), g("x", "z", "y", 1, -1, e, i, -t, r, a, 3), g("x", "y", "z", 1, -1, e, t, i, r, s, 4), g("x", "y", "z", -1, -1, e, t, -i, r, s, 5), this.setIndex(c), this.setAttribute("position", new Nn(l, 3)), this.setAttribute("normal", new Nn(f, 3)), this.setAttribute("uv", new Nn(d, 2));
    function g(M, p, h, S, b, y, C, A, D, v, T) {
      const Y = y / D, R = C / v, V = y / 2, z = C / 2, k = A / 2, G = D + 1, F = v + 1;
      let O = 0, Q = 0;
      const $ = new B();
      for (let ce = 0; ce < F; ce++) {
        const pe = ce * R - z;
        for (let fe = 0; fe < G; fe++) {
          const Ie = fe * Y - V;
          $[M] = Ie * S, $[p] = pe * b, $[h] = k, l.push($.x, $.y, $.z), $[M] = 0, $[p] = 0, $[h] = A > 0 ? 1 : -1, f.push($.x, $.y, $.z), d.push(fe / D), d.push(1 - ce / v), O += 1;
        }
      }
      for (let ce = 0; ce < v; ce++)
        for (let pe = 0; pe < D; pe++) {
          const fe = u + pe + G * ce, Ie = u + pe + G * (ce + 1), rt = u + (pe + 1) + G * (ce + 1), it = u + (pe + 1) + G * ce;
          c.push(fe, Ie, it), c.push(Ie, rt, it), Q += 6;
        }
      o.addGroup(m, Q, T), m += Q, u += O;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {BoxGeometry} A new instance.
   */
  static fromJSON(e) {
    return new wr(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
class Rr extends Gn {
  /**
   * Constructs a new plane geometry.
   *
   * @param {number} [width=1] - The width along the X axis.
   * @param {number} [height=1] - The height along the Y axis
   * @param {number} [widthSegments=1] - The number of segments along the X axis.
   * @param {number} [heightSegments=1] - The number of segments along the Y axis.
   */
  constructor(e = 1, t = 1, i = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: i,
      heightSegments: r
    };
    const s = e / 2, a = t / 2, o = Math.floor(i), c = Math.floor(r), l = o + 1, f = c + 1, d = e / o, u = t / c, m = [], g = [], M = [], p = [];
    for (let h = 0; h < f; h++) {
      const S = h * u - a;
      for (let b = 0; b < l; b++) {
        const y = b * d - s;
        g.push(y, -S, 0), M.push(0, 0, 1), p.push(b / o), p.push(1 - h / c);
      }
    }
    for (let h = 0; h < c; h++)
      for (let S = 0; S < o; S++) {
        const b = S + l * h, y = S + l * (h + 1), C = S + 1 + l * (h + 1), A = S + 1 + l * h;
        m.push(b, y, A), m.push(y, C, A);
      }
    this.setIndex(m), this.setAttribute("position", new Nn(g, 3)), this.setAttribute("normal", new Nn(M, 3)), this.setAttribute("uv", new Nn(p, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  /**
   * Factory method for creating an instance of this class from the given
   * JSON object.
   *
   * @param {Object} data - A JSON object representing the serialized geometry.
   * @return {PlaneGeometry} A new instance.
   */
  static fromJSON(e) {
    return new Rr(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
function nr(n) {
  const e = {};
  for (const t in n) {
    e[t] = {};
    for (const i in n[t]) {
      const r = n[t][i];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (Ce("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][i] = null) : e[t][i] = r.clone() : Array.isArray(r) ? e[t][i] = r.slice() : e[t][i] = r;
    }
  }
  return e;
}
function Ct(n) {
  const e = {};
  for (let t = 0; t < n.length; t++) {
    const i = nr(n[t]);
    for (const r in i)
      e[r] = i[r];
  }
  return e;
}
function qh(n) {
  const e = [];
  for (let t = 0; t < n.length; t++)
    e.push(n[t].clone());
  return e;
}
function nu(n) {
  const e = n.getRenderTarget();
  return e === null ? n.outputColorSpace : e.isXRRenderTarget === !0 ? e.texture.colorSpace : Ge.workingColorSpace;
}
const Yh = { clone: nr, merge: Ct };
var Kh = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, Zh = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class rn extends Ts {
  /**
   * Constructs a new shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Kh, this.fragmentShader = Zh, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      clipCullDistance: !1,
      // set to use vertex shader clipping
      multiDraw: !1
      // set to use vertex shader multi_draw / enable gl_DrawID
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = nr(e.uniforms), this.uniformsGroups = qh(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this.defaultAttributeValues = Object.assign({}, e.defaultAttributeValues), this.index0AttributeName = e.index0AttributeName, this.uniformsNeedUpdate = e.uniformsNeedUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const a = this.uniforms[r].value;
      a && a.isTexture ? t.uniforms[r] = {
        type: "t",
        value: a.toJSON(e).uuid
      } : a && a.isColor ? t.uniforms[r] = {
        type: "c",
        value: a.getHex()
      } : a && a.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: a.toArray()
      } : a && a.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: a.toArray()
      } : a && a.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: a.toArray()
      } : a && a.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: a.toArray()
      } : a && a.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: a.toArray()
      } : t.uniforms[r] = {
        value: a
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const i = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (i[r] = !0);
    return Object.keys(i).length > 0 && (t.extensions = i), t;
  }
}
class $h extends rn {
  /**
   * Constructs a new raw shader material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
class jh extends Ts {
  /**
   * Constructs a new mesh depth material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = oh, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Jh extends Ts {
  /**
   * Constructs a new mesh distance material.
   *
   * @param {Object} [parameters] - An object with one or more properties
   * defining the material's appearance. Any property of the material
   * (including any property from inherited materials) can be passed
   * in here. Color values can be passed any type of value accepted
   * by {@link Color#set}.
   */
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const Qr = /* @__PURE__ */ new B(), es = /* @__PURE__ */ new sr(), an = /* @__PURE__ */ new B();
class iu extends Vt {
  /**
   * Constructs a new camera.
   */
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ht(), this.projectionMatrix = new ht(), this.projectionMatrixInverse = new ht(), this.coordinateSystem = un, this._reversedDepth = !1;
  }
  /**
   * The flag that indicates whether the camera uses a reversed depth buffer.
   *
   * @type {boolean}
   * @default false
   */
  get reversedDepth() {
    return this._reversedDepth;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  /**
   * Returns a vector representing the ("look") direction of the 3D object in world space.
   *
   * This method is overwritten since cameras have a different forward vector compared to other
   * 3D objects. A camera looks down its local, negative z-axis by default.
   *
   * @param {Vector3} target - The target vector the result is stored to.
   * @return {Vector3} The 3D object's direction in world space.
   */
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorld.decompose(Qr, es, an), an.x === 1 && an.y === 1 && an.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Qr, es, an.set(1, 1, 1)).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorld.decompose(Qr, es, an), an.x === 1 && an.y === 1 && an.z === 1 ? this.matrixWorldInverse.copy(this.matrixWorld).invert() : this.matrixWorldInverse.compose(Qr, es, an.set(1, 1, 1)).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const $n = /* @__PURE__ */ new B(), vl = /* @__PURE__ */ new Ze(), xl = /* @__PURE__ */ new Ze();
class Jt extends iu {
  /**
   * Constructs a new perspective camera.
   *
   * @param {number} [fov=50] - The vertical field of view.
   * @param {number} [aspect=1] - The aspect ratio.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = 50, t = 1, i = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = i, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current {@link PerspectiveCamera#filmGauge}.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * @param {number} focalLength - Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = ro * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Returns the focal length from the current {@link PerspectiveCamera#fov} and
   * {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The computed focal length.
   */
  getFocalLength() {
    const e = Math.tan(Ls * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  /**
   * Returns the current vertical field of view angle in degrees considering {@link PerspectiveCamera#zoom}.
   *
   * @return {number} The effective FOV.
   */
  getEffectiveFOV() {
    return ro * 2 * Math.atan(
      Math.tan(Ls * 0.5 * this.fov) / this.zoom
    );
  }
  /**
   * Returns the width of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  /**
   * Returns the height of the image on the film. If {@link PerspectiveCamera#aspect} is greater than or
   * equal to one (landscape format), the result equals {@link PerspectiveCamera#filmGauge}.
   *
   * @return {number} The film width.
   */
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Computes the 2D bounds of the camera's viewable rectangle at a given distance along the viewing direction.
   * Sets `minTarget` and `maxTarget` to the coordinates of the lower-left and upper-right corners of the view rectangle.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} minTarget - The lower-left corner of the view rectangle is written into this vector.
   * @param {Vector2} maxTarget - The upper-right corner of the view rectangle is written into this vector.
   */
  getViewBounds(e, t, i) {
    $n.set(-1, -1, 0.5).applyMatrix4(this.projectionMatrixInverse), t.set($n.x, $n.y).multiplyScalar(-e / $n.z), $n.set(1, 1, 0.5).applyMatrix4(this.projectionMatrixInverse), i.set($n.x, $n.y).multiplyScalar(-e / $n.z);
  }
  /**
   * Computes the width and height of the camera's viewable rectangle at a given distance along the viewing direction.
   *
   * @param {number} distance - The viewing distance.
   * @param {Vector2} target - The target vector that is used to store result where x is width and y is height.
   * @returns {Vector2} The view size.
   */
  getViewSize(e, t) {
    return this.getViewBounds(e, vl, xl), t.subVectors(xl, vl);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *```
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *```
   * then for each monitor you would call it like this:
   *```js
   * const w = 1920;
   * const h = 1080;
   * const fullWidth = w * 3;
   * const fullHeight = h * 2;
   *
   * // --A--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   * // --B--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   * // --C--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   * // --D--
   * camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   * // --E--
   * camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   * // --F--
   * camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   * ```
   *
   * Note there is no reason monitors have to be the same size or in a grid.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   */
  setViewOffset(e, t, i, r, s, a) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(Ls * 0.5 * this.fov) / this.zoom, i = 2 * t, r = this.aspect * i, s = -0.5 * r;
    const a = this.view;
    if (this.view !== null && this.view.enabled) {
      const c = a.fullWidth, l = a.fullHeight;
      s += a.offsetX * r / c, t -= a.offsetY * i / l, r *= a.width / c, i *= a.height / l;
    }
    const o = this.filmOffset;
    o !== 0 && (s += e * o / this.getFilmWidth()), this.projectionMatrix.makePerspective(s, s + r, t, t - i, e, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
class wo extends iu {
  /**
   * Constructs a new orthographic camera.
   *
   * @param {number} [left=-1] - The left plane of the camera's frustum.
   * @param {number} [right=1] - The right plane of the camera's frustum.
   * @param {number} [top=1] - The top plane of the camera's frustum.
   * @param {number} [bottom=-1] - The bottom plane of the camera's frustum.
   * @param {number} [near=0.1] - The camera's near plane.
   * @param {number} [far=2000] - The camera's far plane.
   */
  constructor(e = -1, t = 1, i = 1, r = -1, s = 0.1, a = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = i, this.bottom = r, this.near = s, this.far = a, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * @param {number} fullWidth - The full width of multiview setup.
   * @param {number} fullHeight - The full height of multiview setup.
   * @param {number} x - The horizontal offset of the subcamera.
   * @param {number} y - The vertical offset of the subcamera.
   * @param {number} width - The width of subcamera.
   * @param {number} height - The height of subcamera.
   * @see {@link PerspectiveCamera#setViewOffset}
   */
  setViewOffset(e, t, i, r, s, a) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = i, this.view.offsetY = r, this.view.width = s, this.view.height = a, this.updateProjectionMatrix();
  }
  /**
   * Removes the view offset from the projection matrix.
   */
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  /**
   * Updates the camera's projection matrix. Must be called after any change of
   * camera properties.
   */
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), i = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let s = i - e, a = i + e, o = r + t, c = r - t;
    if (this.view !== null && this.view.enabled) {
      const l = (this.right - this.left) / this.view.fullWidth / this.zoom, f = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      s += l * this.view.offsetX, a = s + l * this.view.width, o -= f * this.view.offsetY, c = o - f * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(s, a, o, c, this.near, this.far, this.coordinateSystem, this.reversedDepth), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const Vi = -90, Gi = 1;
class Qh extends Vt {
  /**
   * Constructs a new cube camera.
   *
   * @param {number} near - The camera's near plane.
   * @param {number} far - The camera's far plane.
   * @param {WebGLCubeRenderTarget} renderTarget - The cube render target.
   */
  constructor(e, t, i) {
    super(), this.type = "CubeCamera", this.renderTarget = i, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Jt(Vi, Gi, e, t);
    r.layers = this.layers, this.add(r);
    const s = new Jt(Vi, Gi, e, t);
    s.layers = this.layers, this.add(s);
    const a = new Jt(Vi, Gi, e, t);
    a.layers = this.layers, this.add(a);
    const o = new Jt(Vi, Gi, e, t);
    o.layers = this.layers, this.add(o);
    const c = new Jt(Vi, Gi, e, t);
    c.layers = this.layers, this.add(c);
    const l = new Jt(Vi, Gi, e, t);
    l.layers = this.layers, this.add(l);
  }
  /**
   * Must be called when the coordinate system of the cube camera is changed.
   */
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [i, r, s, a, o, c] = t;
    for (const l of t) this.remove(l);
    if (e === un)
      i.up.set(0, 1, 0), i.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), s.up.set(0, 0, -1), s.lookAt(0, 1, 0), a.up.set(0, 0, 1), a.lookAt(0, -1, 0), o.up.set(0, 1, 0), o.lookAt(0, 0, 1), c.up.set(0, 1, 0), c.lookAt(0, 0, -1);
    else if (e === gs)
      i.up.set(0, -1, 0), i.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), s.up.set(0, 0, 1), s.lookAt(0, 1, 0), a.up.set(0, 0, -1), a.lookAt(0, -1, 0), o.up.set(0, -1, 0), o.lookAt(0, 0, 1), c.up.set(0, -1, 0), c.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const l of t)
      this.add(l), l.updateMatrixWorld();
  }
  /**
   * Calling this method will render the given scene with the given renderer
   * into the cube render target of the camera.
   *
   * @param {(Renderer|WebGLRenderer)} renderer - The renderer.
   * @param {Scene} scene - The scene to render.
   */
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: i, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [s, a, o, c, l, f] = this.children, d = e.getRenderTarget(), u = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), g = e.xr.enabled;
    e.xr.enabled = !1;
    const M = i.texture.generateMipmaps;
    i.texture.generateMipmaps = !1;
    let p = !1;
    e.isWebGLRenderer === !0 ? p = e.state.buffers.depth.getReversed() : p = e.reversedDepthBuffer, e.setRenderTarget(i, 0, r), p && e.autoClear === !1 && e.clearDepth(), e.render(t, s), e.setRenderTarget(i, 1, r), p && e.autoClear === !1 && e.clearDepth(), e.render(t, a), e.setRenderTarget(i, 2, r), p && e.autoClear === !1 && e.clearDepth(), e.render(t, o), e.setRenderTarget(i, 3, r), p && e.autoClear === !1 && e.clearDepth(), e.render(t, c), e.setRenderTarget(i, 4, r), p && e.autoClear === !1 && e.clearDepth(), e.render(t, l), i.texture.generateMipmaps = M, e.setRenderTarget(i, 5, r), p && e.autoClear === !1 && e.clearDepth(), e.render(t, f), e.setRenderTarget(d, u, m), e.xr.enabled = g, i.texture.needsPMREMUpdate = !0;
  }
}
class ed extends Jt {
  /**
   * Constructs a new array camera.
   *
   * @param {Array<PerspectiveCamera>} [array=[]] - An array of perspective sub cameras.
   */
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.isMultiViewCamera = !1, this.cameras = e;
  }
}
function Ml(n, e, t, i) {
  const r = td(i);
  switch (t) {
    // https://registry.khronos.org/OpenGL-Refpages/es3.0/html/glTexImage2D.xhtml
    case kc:
      return n * e;
    case Xc:
      return n * e / r.components * r.byteLength;
    case Mo:
      return n * e / r.components * r.byteLength;
    case er:
      return n * e * 2 / r.components * r.byteLength;
    case So:
      return n * e * 2 / r.components * r.byteLength;
    case Wc:
      return n * e * 3 / r.components * r.byteLength;
    case nn:
      return n * e * 4 / r.components * r.byteLength;
    case Eo:
      return n * e * 4 / r.components * r.byteLength;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_s3tc_srgb/
    case ls:
    case cs:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case us:
    case fs:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_pvrtc/
    case wa:
    case Ca:
      return Math.max(n, 16) * Math.max(e, 8) / 4;
    case Aa:
    case Ra:
      return Math.max(n, 8) * Math.max(e, 8) / 2;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_etc/
    case Pa:
    case Da:
    case Ia:
    case Ua:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 8;
    case La:
    case Na:
    case Fa:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/WEBGL_compressed_texture_astc/
    case Oa:
      return Math.floor((n + 3) / 4) * Math.floor((e + 3) / 4) * 16;
    case Ba:
      return Math.floor((n + 4) / 5) * Math.floor((e + 3) / 4) * 16;
    case za:
      return Math.floor((n + 4) / 5) * Math.floor((e + 4) / 5) * 16;
    case Va:
      return Math.floor((n + 5) / 6) * Math.floor((e + 4) / 5) * 16;
    case Ga:
      return Math.floor((n + 5) / 6) * Math.floor((e + 5) / 6) * 16;
    case Ha:
      return Math.floor((n + 7) / 8) * Math.floor((e + 4) / 5) * 16;
    case ka:
      return Math.floor((n + 7) / 8) * Math.floor((e + 5) / 6) * 16;
    case Wa:
      return Math.floor((n + 7) / 8) * Math.floor((e + 7) / 8) * 16;
    case Xa:
      return Math.floor((n + 9) / 10) * Math.floor((e + 4) / 5) * 16;
    case qa:
      return Math.floor((n + 9) / 10) * Math.floor((e + 5) / 6) * 16;
    case Ya:
      return Math.floor((n + 9) / 10) * Math.floor((e + 7) / 8) * 16;
    case Ka:
      return Math.floor((n + 9) / 10) * Math.floor((e + 9) / 10) * 16;
    case Za:
      return Math.floor((n + 11) / 12) * Math.floor((e + 9) / 10) * 16;
    case $a:
      return Math.floor((n + 11) / 12) * Math.floor((e + 11) / 12) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_bptc/
    case ja:
    case Ja:
    case Qa:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
    // https://registry.khronos.org/webgl/extensions/EXT_texture_compression_rgtc/
    case eo:
    case to:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 8;
    case no:
    case io:
      return Math.ceil(n / 4) * Math.ceil(e / 4) * 16;
  }
  throw new Error(
    `Unable to determine texture byte length for ${t} format.`
  );
}
function td(n) {
  switch (n) {
    case Wt:
    case zc:
      return { byteLength: 1, components: 1 };
    case Sr:
    case Vc:
    case On:
      return { byteLength: 2, components: 1 };
    case vo:
    case xo:
      return { byteLength: 2, components: 4 };
    case vn:
    case go:
    case cn:
      return { byteLength: 4, components: 1 };
    case Gc:
    case Hc:
      return { byteLength: 4, components: 3 };
  }
  throw new Error(`Unknown texture type ${n}.`);
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: _o
} }));
typeof window < "u" && (window.__THREE__ ? Ce("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = _o);
function ru() {
  let n = null, e = !1, t = null, i = null;
  function r(s, a) {
    t(s, a), i = n.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (i = n.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      n.cancelAnimationFrame(i), e = !1;
    },
    setAnimationLoop: function(s) {
      t = s;
    },
    setContext: function(s) {
      n = s;
    }
  };
}
function nd(n) {
  const e = /* @__PURE__ */ new WeakMap();
  function t(o, c) {
    const l = o.array, f = o.usage, d = l.byteLength, u = n.createBuffer();
    n.bindBuffer(c, u), n.bufferData(c, l, f), o.onUploadCallback();
    let m;
    if (l instanceof Float32Array)
      m = n.FLOAT;
    else if (typeof Float16Array < "u" && l instanceof Float16Array)
      m = n.HALF_FLOAT;
    else if (l instanceof Uint16Array)
      o.isFloat16BufferAttribute ? m = n.HALF_FLOAT : m = n.UNSIGNED_SHORT;
    else if (l instanceof Int16Array)
      m = n.SHORT;
    else if (l instanceof Uint32Array)
      m = n.UNSIGNED_INT;
    else if (l instanceof Int32Array)
      m = n.INT;
    else if (l instanceof Int8Array)
      m = n.BYTE;
    else if (l instanceof Uint8Array)
      m = n.UNSIGNED_BYTE;
    else if (l instanceof Uint8ClampedArray)
      m = n.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + l);
    return {
      buffer: u,
      type: m,
      bytesPerElement: l.BYTES_PER_ELEMENT,
      version: o.version,
      size: d
    };
  }
  function i(o, c, l) {
    const f = c.array, d = c.updateRanges;
    if (n.bindBuffer(l, o), d.length === 0)
      n.bufferSubData(l, 0, f);
    else {
      d.sort((m, g) => m.start - g.start);
      let u = 0;
      for (let m = 1; m < d.length; m++) {
        const g = d[u], M = d[m];
        M.start <= g.start + g.count + 1 ? g.count = Math.max(
          g.count,
          M.start + M.count - g.start
        ) : (++u, d[u] = M);
      }
      d.length = u + 1;
      for (let m = 0, g = d.length; m < g; m++) {
        const M = d[m];
        n.bufferSubData(
          l,
          M.start * f.BYTES_PER_ELEMENT,
          f,
          M.start,
          M.count
        );
      }
      c.clearUpdateRanges();
    }
    c.onUploadCallback();
  }
  function r(o) {
    return o.isInterleavedBufferAttribute && (o = o.data), e.get(o);
  }
  function s(o) {
    o.isInterleavedBufferAttribute && (o = o.data);
    const c = e.get(o);
    c && (n.deleteBuffer(c.buffer), e.delete(o));
  }
  function a(o, c) {
    if (o.isInterleavedBufferAttribute && (o = o.data), o.isGLBufferAttribute) {
      const f = e.get(o);
      (!f || f.version < o.version) && e.set(o, {
        buffer: o.buffer,
        type: o.type,
        bytesPerElement: o.elementSize,
        version: o.version
      });
      return;
    }
    const l = e.get(o);
    if (l === void 0)
      e.set(o, t(o, c));
    else if (l.version < o.version) {
      if (l.size !== o.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      i(l.buffer, o, c), l.version = o.version;
    }
  }
  return {
    get: r,
    remove: s,
    update: a
  };
}
var id = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, rd = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, sd = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, ad = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, od = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, ld = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, cd = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, ud = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, fd = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`, hd = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, dd = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, pd = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, md = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, _d = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, gd = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, vd = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, xd = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Md = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Sd = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Ed = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, Td = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, yd = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, bd = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`, Ad = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, wd = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Rd = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, Cd = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, Pd = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, Dd = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Ld = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Id = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Ud = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Nd = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`, Fd = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, Od = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Bd = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, zd = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Vd = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Gd = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Hd = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, kd = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Wd = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Xd = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, qd = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, Yd = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Kd = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Zd = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, $d = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, jd = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Jd = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Qd = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, ep = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, tp = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
		vec3 iridescenceFresnelDielectric;
		vec3 iridescenceFresnelMetallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return v;
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
vec3 BRDF_GGX_Multiscatter( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 singleScatter = BRDF_GGX( lightDir, viewDir, normal, material );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 dfgV = texture2D( dfgLUT, vec2( material.roughness, dotNV ) ).rg;
	vec2 dfgL = texture2D( dfgLUT, vec2( material.roughness, dotNL ) ).rg;
	vec3 FssEss_V = material.specularColorBlended * dfgV.x + material.specularF90 * dfgV.y;
	vec3 FssEss_L = material.specularColorBlended * dfgL.x + material.specularF90 * dfgL.y;
	float Ess_V = dfgV.x + dfgV.y;
	float Ess_L = dfgL.x + dfgL.y;
	float Ems_V = 1.0 - Ess_V;
	float Ems_L = 1.0 - Ess_L;
	vec3 Favg = material.specularColorBlended + ( 1.0 - material.specularColorBlended ) * 0.047619;
	vec3 Fms = FssEss_V * FssEss_L * Favg / ( 1.0 - Ems_V * Ems_L * Favg + EPSILON );
	float compensationFactor = Ems_V * Ems_L;
	vec3 multiScatter = Fms * compensationFactor;
	return singleScatter + multiScatter;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX_Multiscatter( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnelDielectric, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceFresnelMetallic, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( geometryNormal, geometryViewDir, material.diffuseColor, material.specularF90, material.roughness, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, np = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( material.iridescenceFresnelDielectric, material.iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, ip = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, rp = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, sp = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, ap = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, op = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, lp = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, cp = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, up = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, fp = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, hp = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, dp = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, pp = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, mp = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, _p = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, gp = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, vp = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, xp = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Mp = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Sp = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Ep = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Tp = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, yp = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, bp = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Ap = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, wp = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Rp = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Cp = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, Pp = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Dp = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`, Lp = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Ip = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Up = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Np = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Fp = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Op = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Bp = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`, zp = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Vp = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Gp = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Hp = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, kp = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Wp = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, Xp = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, qp = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, Yp = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Kp = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Zp = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, $p = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, jp = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Jp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Qp = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, em = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, tm = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const nm = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, im = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, rm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, sm = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, am = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, om = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, lm = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, cm = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, um = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, fm = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`, hm = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, dm = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, pm = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, mm = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, _m = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, gm = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, vm = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, xm = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Mm = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Sm = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Em = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Tm = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, ym = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, bm = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Am = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, wm = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Rm = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Cm = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Pm = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Dm = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Lm = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Im = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Um = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Nm = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ue = {
  alphahash_fragment: id,
  alphahash_pars_fragment: rd,
  alphamap_fragment: sd,
  alphamap_pars_fragment: ad,
  alphatest_fragment: od,
  alphatest_pars_fragment: ld,
  aomap_fragment: cd,
  aomap_pars_fragment: ud,
  batching_pars_vertex: fd,
  batching_vertex: hd,
  begin_vertex: dd,
  beginnormal_vertex: pd,
  bsdfs: md,
  iridescence_fragment: _d,
  bumpmap_pars_fragment: gd,
  clipping_planes_fragment: vd,
  clipping_planes_pars_fragment: xd,
  clipping_planes_pars_vertex: Md,
  clipping_planes_vertex: Sd,
  color_fragment: Ed,
  color_pars_fragment: Td,
  color_pars_vertex: yd,
  color_vertex: bd,
  common: Ad,
  cube_uv_reflection_fragment: wd,
  defaultnormal_vertex: Rd,
  displacementmap_pars_vertex: Cd,
  displacementmap_vertex: Pd,
  emissivemap_fragment: Dd,
  emissivemap_pars_fragment: Ld,
  colorspace_fragment: Id,
  colorspace_pars_fragment: Ud,
  envmap_fragment: Nd,
  envmap_common_pars_fragment: Fd,
  envmap_pars_fragment: Od,
  envmap_pars_vertex: Bd,
  envmap_physical_pars_fragment: Zd,
  envmap_vertex: zd,
  fog_vertex: Vd,
  fog_pars_vertex: Gd,
  fog_fragment: Hd,
  fog_pars_fragment: kd,
  gradientmap_pars_fragment: Wd,
  lightmap_pars_fragment: Xd,
  lights_lambert_fragment: qd,
  lights_lambert_pars_fragment: Yd,
  lights_pars_begin: Kd,
  lights_toon_fragment: $d,
  lights_toon_pars_fragment: jd,
  lights_phong_fragment: Jd,
  lights_phong_pars_fragment: Qd,
  lights_physical_fragment: ep,
  lights_physical_pars_fragment: tp,
  lights_fragment_begin: np,
  lights_fragment_maps: ip,
  lights_fragment_end: rp,
  logdepthbuf_fragment: sp,
  logdepthbuf_pars_fragment: ap,
  logdepthbuf_pars_vertex: op,
  logdepthbuf_vertex: lp,
  map_fragment: cp,
  map_pars_fragment: up,
  map_particle_fragment: fp,
  map_particle_pars_fragment: hp,
  metalnessmap_fragment: dp,
  metalnessmap_pars_fragment: pp,
  morphinstance_vertex: mp,
  morphcolor_vertex: _p,
  morphnormal_vertex: gp,
  morphtarget_pars_vertex: vp,
  morphtarget_vertex: xp,
  normal_fragment_begin: Mp,
  normal_fragment_maps: Sp,
  normal_pars_fragment: Ep,
  normal_pars_vertex: Tp,
  normal_vertex: yp,
  normalmap_pars_fragment: bp,
  clearcoat_normal_fragment_begin: Ap,
  clearcoat_normal_fragment_maps: wp,
  clearcoat_pars_fragment: Rp,
  iridescence_pars_fragment: Cp,
  opaque_fragment: Pp,
  packing: Dp,
  premultiplied_alpha_fragment: Lp,
  project_vertex: Ip,
  dithering_fragment: Up,
  dithering_pars_fragment: Np,
  roughnessmap_fragment: Fp,
  roughnessmap_pars_fragment: Op,
  shadowmap_pars_fragment: Bp,
  shadowmap_pars_vertex: zp,
  shadowmap_vertex: Vp,
  shadowmask_pars_fragment: Gp,
  skinbase_vertex: Hp,
  skinning_pars_vertex: kp,
  skinning_vertex: Wp,
  skinnormal_vertex: Xp,
  specularmap_fragment: qp,
  specularmap_pars_fragment: Yp,
  tonemapping_fragment: Kp,
  tonemapping_pars_fragment: Zp,
  transmission_fragment: $p,
  transmission_pars_fragment: jp,
  uv_pars_fragment: Jp,
  uv_pars_vertex: Qp,
  uv_vertex: em,
  worldpos_vertex: tm,
  background_vert: nm,
  background_frag: im,
  backgroundCube_vert: rm,
  backgroundCube_frag: sm,
  cube_vert: am,
  cube_frag: om,
  depth_vert: lm,
  depth_frag: cm,
  distance_vert: um,
  distance_frag: fm,
  equirect_vert: hm,
  equirect_frag: dm,
  linedashed_vert: pm,
  linedashed_frag: mm,
  meshbasic_vert: _m,
  meshbasic_frag: gm,
  meshlambert_vert: vm,
  meshlambert_frag: xm,
  meshmatcap_vert: Mm,
  meshmatcap_frag: Sm,
  meshnormal_vert: Em,
  meshnormal_frag: Tm,
  meshphong_vert: ym,
  meshphong_frag: bm,
  meshphysical_vert: Am,
  meshphysical_frag: wm,
  meshtoon_vert: Rm,
  meshtoon_frag: Cm,
  points_vert: Pm,
  points_frag: Dm,
  shadow_vert: Lm,
  shadow_frag: Im,
  sprite_vert: Um,
  sprite_frag: Nm
}, ae = {
  common: {
    diffuse: { value: /* @__PURE__ */ new Je(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  envmap: {
    envMap: { value: null },
    envMapRotation: { value: /* @__PURE__ */ new Le() },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 },
    // basic, lambert, phong
    dfgLUT: { value: null }
    // DFG LUT for physically-based rendering
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Le() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Le() },
    normalScale: { value: /* @__PURE__ */ new Ze(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Le() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Le() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new Je(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowIntensity: 1,
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new Je(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Le() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new Je(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new Ze(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Le() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Le() },
    alphaTest: { value: 0 }
  }
}, ln = {
  basic: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.specularmap,
      ae.envmap,
      ae.aomap,
      ae.lightmap,
      ae.fog
    ]),
    vertexShader: Ue.meshbasic_vert,
    fragmentShader: Ue.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.specularmap,
      ae.envmap,
      ae.aomap,
      ae.lightmap,
      ae.emissivemap,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.fog,
      ae.lights,
      {
        emissive: { value: /* @__PURE__ */ new Je(0) },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshlambert_vert,
    fragmentShader: Ue.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.specularmap,
      ae.envmap,
      ae.aomap,
      ae.lightmap,
      ae.emissivemap,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.fog,
      ae.lights,
      {
        emissive: { value: /* @__PURE__ */ new Je(0) },
        specular: { value: /* @__PURE__ */ new Je(1118481) },
        shininess: { value: 30 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphong_vert,
    fragmentShader: Ue.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.envmap,
      ae.aomap,
      ae.lightmap,
      ae.emissivemap,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.roughnessmap,
      ae.metalnessmap,
      ae.fog,
      ae.lights,
      {
        emissive: { value: /* @__PURE__ */ new Je(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshphysical_vert,
    fragmentShader: Ue.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.aomap,
      ae.lightmap,
      ae.emissivemap,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.gradientmap,
      ae.fog,
      ae.lights,
      {
        emissive: { value: /* @__PURE__ */ new Je(0) }
      }
    ]),
    vertexShader: Ue.meshtoon_vert,
    fragmentShader: Ue.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      ae.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Ue.meshmatcap_vert,
    fragmentShader: Ue.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ Ct([
      ae.points,
      ae.fog
    ]),
    vertexShader: Ue.points_vert,
    fragmentShader: Ue.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Ue.linedashed_vert,
    fragmentShader: Ue.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.displacementmap
    ]),
    vertexShader: Ue.depth_vert,
    fragmentShader: Ue.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.bumpmap,
      ae.normalmap,
      ae.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.meshnormal_vert,
    fragmentShader: Ue.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ Ct([
      ae.sprite,
      ae.fog
    ]),
    vertexShader: Ue.sprite_vert,
    fragmentShader: Ue.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Le() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Ue.background_vert,
    fragmentShader: Ue.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 },
      backgroundRotation: { value: /* @__PURE__ */ new Le() }
    },
    vertexShader: Ue.backgroundCube_vert,
    fragmentShader: Ue.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Ue.cube_vert,
    fragmentShader: Ue.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Ue.equirect_vert,
    fragmentShader: Ue.equirect_frag
  },
  distance: {
    uniforms: /* @__PURE__ */ Ct([
      ae.common,
      ae.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new B() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Ue.distance_vert,
    fragmentShader: Ue.distance_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ Ct([
      ae.lights,
      ae.fog,
      {
        color: { value: /* @__PURE__ */ new Je(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Ue.shadow_vert,
    fragmentShader: Ue.shadow_frag
  }
};
ln.physical = {
  uniforms: /* @__PURE__ */ Ct([
    ln.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Le() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new Ze(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Le() },
      dispersion: { value: 0 },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Le() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Le() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new Je(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Le() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Le() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Le() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new Ze() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Le() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new Je(0) },
      specularColor: { value: /* @__PURE__ */ new Je(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Le() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Le() },
      anisotropyVector: { value: /* @__PURE__ */ new Ze() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Le() }
    }
  ]),
  vertexShader: Ue.meshphysical_vert,
  fragmentShader: Ue.meshphysical_frag
};
const ts = { r: 0, b: 0, g: 0 }, hi = /* @__PURE__ */ new zn(), Fm = /* @__PURE__ */ new ht();
function Om(n, e, t, i, r, s) {
  const a = new Je(0);
  let o = r === !0 ? 0 : 1, c, l, f = null, d = 0, u = null;
  function m(S) {
    let b = S.isScene === !0 ? S.background : null;
    if (b && b.isTexture) {
      const y = S.backgroundBlurriness > 0;
      b = e.get(b, y);
    }
    return b;
  }
  function g(S) {
    let b = !1;
    const y = m(S);
    y === null ? p(a, o) : y && y.isColor && (p(y, 1), b = !0);
    const C = n.xr.getEnvironmentBlendMode();
    C === "additive" ? t.buffers.color.setClear(0, 0, 0, 1, s) : C === "alpha-blend" && t.buffers.color.setClear(0, 0, 0, 0, s), (n.autoClear || b) && (t.buffers.depth.setTest(!0), t.buffers.depth.setMask(!0), t.buffers.color.setMask(!0), n.clear(n.autoClearColor, n.autoClearDepth, n.autoClearStencil));
  }
  function M(S, b) {
    const y = m(b);
    y && (y.isCubeTexture || y.mapping === Es) ? (l === void 0 && (l = new xn(
      new wr(1, 1, 1),
      new rn({
        name: "BackgroundCubeMaterial",
        uniforms: nr(ln.backgroundCube.uniforms),
        vertexShader: ln.backgroundCube.vertexShader,
        fragmentShader: ln.backgroundCube.fragmentShader,
        side: It,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), l.geometry.deleteAttribute("normal"), l.geometry.deleteAttribute("uv"), l.onBeforeRender = function(C, A, D) {
      this.matrixWorld.copyPosition(D.matrixWorld);
    }, Object.defineProperty(l.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), i.update(l)), hi.copy(b.backgroundRotation), hi.x *= -1, hi.y *= -1, hi.z *= -1, y.isCubeTexture && y.isRenderTargetTexture === !1 && (hi.y *= -1, hi.z *= -1), l.material.uniforms.envMap.value = y, l.material.uniforms.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, l.material.uniforms.backgroundBlurriness.value = b.backgroundBlurriness, l.material.uniforms.backgroundIntensity.value = b.backgroundIntensity, l.material.uniforms.backgroundRotation.value.setFromMatrix4(Fm.makeRotationFromEuler(hi)), l.material.toneMapped = Ge.getTransfer(y.colorSpace) !== Ke, (f !== y || d !== y.version || u !== n.toneMapping) && (l.material.needsUpdate = !0, f = y, d = y.version, u = n.toneMapping), l.layers.enableAll(), S.unshift(l, l.geometry, l.material, 0, 0, null)) : y && y.isTexture && (c === void 0 && (c = new xn(
      new Rr(2, 2),
      new rn({
        name: "BackgroundMaterial",
        uniforms: nr(ln.background.uniforms),
        vertexShader: ln.background.vertexShader,
        fragmentShader: ln.background.fragmentShader,
        side: ii,
        depthTest: !1,
        depthWrite: !1,
        fog: !1,
        allowOverride: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), i.update(c)), c.material.uniforms.t2D.value = y, c.material.uniforms.backgroundIntensity.value = b.backgroundIntensity, c.material.toneMapped = Ge.getTransfer(y.colorSpace) !== Ke, y.matrixAutoUpdate === !0 && y.updateMatrix(), c.material.uniforms.uvTransform.value.copy(y.matrix), (f !== y || d !== y.version || u !== n.toneMapping) && (c.material.needsUpdate = !0, f = y, d = y.version, u = n.toneMapping), c.layers.enableAll(), S.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function p(S, b) {
    S.getRGB(ts, nu(n)), t.buffers.color.setClear(ts.r, ts.g, ts.b, b, s);
  }
  function h() {
    l !== void 0 && (l.geometry.dispose(), l.material.dispose(), l = void 0), c !== void 0 && (c.geometry.dispose(), c.material.dispose(), c = void 0);
  }
  return {
    getClearColor: function() {
      return a;
    },
    setClearColor: function(S, b = 1) {
      a.set(S), o = b, p(a, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(S) {
      o = S, p(a, o);
    },
    render: g,
    addToRenderList: M,
    dispose: h
  };
}
function Bm(n, e) {
  const t = n.getParameter(n.MAX_VERTEX_ATTRIBS), i = {}, r = u(null);
  let s = r, a = !1;
  function o(R, V, z, k, G) {
    let F = !1;
    const O = d(R, k, z, V);
    s !== O && (s = O, l(s.object)), F = m(R, k, z, G), F && g(R, k, z, G), G !== null && e.update(G, n.ELEMENT_ARRAY_BUFFER), (F || a) && (a = !1, y(R, V, z, k), G !== null && n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, e.get(G).buffer));
  }
  function c() {
    return n.createVertexArray();
  }
  function l(R) {
    return n.bindVertexArray(R);
  }
  function f(R) {
    return n.deleteVertexArray(R);
  }
  function d(R, V, z, k) {
    const G = k.wireframe === !0;
    let F = i[V.id];
    F === void 0 && (F = {}, i[V.id] = F);
    const O = R.isInstancedMesh === !0 ? R.id : 0;
    let Q = F[O];
    Q === void 0 && (Q = {}, F[O] = Q);
    let $ = Q[z.id];
    $ === void 0 && ($ = {}, Q[z.id] = $);
    let ce = $[G];
    return ce === void 0 && (ce = u(c()), $[G] = ce), ce;
  }
  function u(R) {
    const V = [], z = [], k = [];
    for (let G = 0; G < t; G++)
      V[G] = 0, z[G] = 0, k[G] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: V,
      enabledAttributes: z,
      attributeDivisors: k,
      object: R,
      attributes: {},
      index: null
    };
  }
  function m(R, V, z, k) {
    const G = s.attributes, F = V.attributes;
    let O = 0;
    const Q = z.getAttributes();
    for (const $ in Q)
      if (Q[$].location >= 0) {
        const pe = G[$];
        let fe = F[$];
        if (fe === void 0 && ($ === "instanceMatrix" && R.instanceMatrix && (fe = R.instanceMatrix), $ === "instanceColor" && R.instanceColor && (fe = R.instanceColor)), pe === void 0 || pe.attribute !== fe || fe && pe.data !== fe.data) return !0;
        O++;
      }
    return s.attributesNum !== O || s.index !== k;
  }
  function g(R, V, z, k) {
    const G = {}, F = V.attributes;
    let O = 0;
    const Q = z.getAttributes();
    for (const $ in Q)
      if (Q[$].location >= 0) {
        let pe = F[$];
        pe === void 0 && ($ === "instanceMatrix" && R.instanceMatrix && (pe = R.instanceMatrix), $ === "instanceColor" && R.instanceColor && (pe = R.instanceColor));
        const fe = {};
        fe.attribute = pe, pe && pe.data && (fe.data = pe.data), G[$] = fe, O++;
      }
    s.attributes = G, s.attributesNum = O, s.index = k;
  }
  function M() {
    const R = s.newAttributes;
    for (let V = 0, z = R.length; V < z; V++)
      R[V] = 0;
  }
  function p(R) {
    h(R, 0);
  }
  function h(R, V) {
    const z = s.newAttributes, k = s.enabledAttributes, G = s.attributeDivisors;
    z[R] = 1, k[R] === 0 && (n.enableVertexAttribArray(R), k[R] = 1), G[R] !== V && (n.vertexAttribDivisor(R, V), G[R] = V);
  }
  function S() {
    const R = s.newAttributes, V = s.enabledAttributes;
    for (let z = 0, k = V.length; z < k; z++)
      V[z] !== R[z] && (n.disableVertexAttribArray(z), V[z] = 0);
  }
  function b(R, V, z, k, G, F, O) {
    O === !0 ? n.vertexAttribIPointer(R, V, z, G, F) : n.vertexAttribPointer(R, V, z, k, G, F);
  }
  function y(R, V, z, k) {
    M();
    const G = k.attributes, F = z.getAttributes(), O = V.defaultAttributeValues;
    for (const Q in F) {
      const $ = F[Q];
      if ($.location >= 0) {
        let ce = G[Q];
        if (ce === void 0 && (Q === "instanceMatrix" && R.instanceMatrix && (ce = R.instanceMatrix), Q === "instanceColor" && R.instanceColor && (ce = R.instanceColor)), ce !== void 0) {
          const pe = ce.normalized, fe = ce.itemSize, Ie = e.get(ce);
          if (Ie === void 0) continue;
          const rt = Ie.buffer, it = Ie.type, K = Ie.bytesPerElement, ne = it === n.INT || it === n.UNSIGNED_INT || ce.gpuType === go;
          if (ce.isInterleavedBufferAttribute) {
            const se = ce.data, De = se.stride, be = ce.offset;
            if (se.isInstancedInterleavedBuffer) {
              for (let we = 0; we < $.locationSize; we++)
                h($.location + we, se.meshPerAttribute);
              R.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = se.meshPerAttribute * se.count);
            } else
              for (let we = 0; we < $.locationSize; we++)
                p($.location + we);
            n.bindBuffer(n.ARRAY_BUFFER, rt);
            for (let we = 0; we < $.locationSize; we++)
              b(
                $.location + we,
                fe / $.locationSize,
                it,
                pe,
                De * K,
                (be + fe / $.locationSize * we) * K,
                ne
              );
          } else {
            if (ce.isInstancedBufferAttribute) {
              for (let se = 0; se < $.locationSize; se++)
                h($.location + se, ce.meshPerAttribute);
              R.isInstancedMesh !== !0 && k._maxInstanceCount === void 0 && (k._maxInstanceCount = ce.meshPerAttribute * ce.count);
            } else
              for (let se = 0; se < $.locationSize; se++)
                p($.location + se);
            n.bindBuffer(n.ARRAY_BUFFER, rt);
            for (let se = 0; se < $.locationSize; se++)
              b(
                $.location + se,
                fe / $.locationSize,
                it,
                pe,
                fe * K,
                fe / $.locationSize * se * K,
                ne
              );
          }
        } else if (O !== void 0) {
          const pe = O[Q];
          if (pe !== void 0)
            switch (pe.length) {
              case 2:
                n.vertexAttrib2fv($.location, pe);
                break;
              case 3:
                n.vertexAttrib3fv($.location, pe);
                break;
              case 4:
                n.vertexAttrib4fv($.location, pe);
                break;
              default:
                n.vertexAttrib1fv($.location, pe);
            }
        }
      }
    }
    S();
  }
  function C() {
    T();
    for (const R in i) {
      const V = i[R];
      for (const z in V) {
        const k = V[z];
        for (const G in k) {
          const F = k[G];
          for (const O in F)
            f(F[O].object), delete F[O];
          delete k[G];
        }
      }
      delete i[R];
    }
  }
  function A(R) {
    if (i[R.id] === void 0) return;
    const V = i[R.id];
    for (const z in V) {
      const k = V[z];
      for (const G in k) {
        const F = k[G];
        for (const O in F)
          f(F[O].object), delete F[O];
        delete k[G];
      }
    }
    delete i[R.id];
  }
  function D(R) {
    for (const V in i) {
      const z = i[V];
      for (const k in z) {
        const G = z[k];
        if (G[R.id] === void 0) continue;
        const F = G[R.id];
        for (const O in F)
          f(F[O].object), delete F[O];
        delete G[R.id];
      }
    }
  }
  function v(R) {
    for (const V in i) {
      const z = i[V], k = R.isInstancedMesh === !0 ? R.id : 0, G = z[k];
      if (G !== void 0) {
        for (const F in G) {
          const O = G[F];
          for (const Q in O)
            f(O[Q].object), delete O[Q];
          delete G[F];
        }
        delete z[k], Object.keys(z).length === 0 && delete i[V];
      }
    }
  }
  function T() {
    Y(), a = !0, s !== r && (s = r, l(s.object));
  }
  function Y() {
    r.geometry = null, r.program = null, r.wireframe = !1;
  }
  return {
    setup: o,
    reset: T,
    resetDefaultState: Y,
    dispose: C,
    releaseStatesOfGeometry: A,
    releaseStatesOfObject: v,
    releaseStatesOfProgram: D,
    initAttributes: M,
    enableAttribute: p,
    disableUnusedAttributes: S
  };
}
function zm(n, e, t) {
  let i;
  function r(l) {
    i = l;
  }
  function s(l, f) {
    n.drawArrays(i, l, f), t.update(f, i, 1);
  }
  function a(l, f, d) {
    d !== 0 && (n.drawArraysInstanced(i, l, f, d), t.update(f, i, d));
  }
  function o(l, f, d) {
    if (d === 0) return;
    e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i, l, 0, f, 0, d);
    let m = 0;
    for (let g = 0; g < d; g++)
      m += f[g];
    t.update(m, i, 1);
  }
  function c(l, f, d, u) {
    if (d === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let g = 0; g < l.length; g++)
        a(l[g], f[g], u[g]);
    else {
      m.multiDrawArraysInstancedWEBGL(i, l, 0, f, 0, u, 0, d);
      let g = 0;
      for (let M = 0; M < d; M++)
        g += f[M] * u[M];
      t.update(g, i, 1);
    }
  }
  this.setMode = r, this.render = s, this.renderInstances = a, this.renderMultiDraw = o, this.renderMultiDrawInstances = c;
}
function Vm(n, e, t, i) {
  let r;
  function s() {
    if (r !== void 0) return r;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const D = e.get("EXT_texture_filter_anisotropic");
      r = n.getParameter(D.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      r = 0;
    return r;
  }
  function a(D) {
    return !(D !== nn && i.convert(D) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT));
  }
  function o(D) {
    const v = D === On && (e.has("EXT_color_buffer_half_float") || e.has("EXT_color_buffer_float"));
    return !(D !== Wt && i.convert(D) !== n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
    D !== cn && !v);
  }
  function c(D) {
    if (D === "highp") {
      if (n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.HIGH_FLOAT).precision > 0 && n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.HIGH_FLOAT).precision > 0)
        return "highp";
      D = "mediump";
    }
    return D === "mediump" && n.getShaderPrecisionFormat(n.VERTEX_SHADER, n.MEDIUM_FLOAT).precision > 0 && n.getShaderPrecisionFormat(n.FRAGMENT_SHADER, n.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  let l = t.precision !== void 0 ? t.precision : "highp";
  const f = c(l);
  f !== l && (Ce("WebGLRenderer:", l, "not supported, using", f, "instead."), l = f);
  const d = t.logarithmicDepthBuffer === !0, u = t.reversedDepthBuffer === !0 && e.has("EXT_clip_control"), m = n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS), g = n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS), M = n.getParameter(n.MAX_TEXTURE_SIZE), p = n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE), h = n.getParameter(n.MAX_VERTEX_ATTRIBS), S = n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS), b = n.getParameter(n.MAX_VARYING_VECTORS), y = n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS), C = n.getParameter(n.MAX_SAMPLES), A = n.getParameter(n.SAMPLES);
  return {
    isWebGL2: !0,
    // keeping this for backwards compatibility
    getMaxAnisotropy: s,
    getMaxPrecision: c,
    textureFormatReadable: a,
    textureTypeReadable: o,
    precision: l,
    logarithmicDepthBuffer: d,
    reversedDepthBuffer: u,
    maxTextures: m,
    maxVertexTextures: g,
    maxTextureSize: M,
    maxCubemapSize: p,
    maxAttributes: h,
    maxVertexUniforms: S,
    maxVaryings: b,
    maxFragmentUniforms: y,
    maxSamples: C,
    samples: A
  };
}
function Gm(n) {
  const e = this;
  let t = null, i = 0, r = !1, s = !1;
  const a = new pi(), o = new Le(), c = { value: null, needsUpdate: !1 };
  this.uniform = c, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, u) {
    const m = d.length !== 0 || u || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    i !== 0 || r;
    return r = u, i = d.length, m;
  }, this.beginShadows = function() {
    s = !0, f(null);
  }, this.endShadows = function() {
    s = !1;
  }, this.setGlobalState = function(d, u) {
    t = f(d, u, 0);
  }, this.setState = function(d, u, m) {
    const g = d.clippingPlanes, M = d.clipIntersection, p = d.clipShadows, h = n.get(d);
    if (!r || g === null || g.length === 0 || s && !p)
      s ? f(null) : l();
    else {
      const S = s ? 0 : i, b = S * 4;
      let y = h.clippingState || null;
      c.value = y, y = f(g, u, b, m);
      for (let C = 0; C !== b; ++C)
        y[C] = t[C];
      h.clippingState = y, this.numIntersection = M ? this.numPlanes : 0, this.numPlanes += S;
    }
  };
  function l() {
    c.value !== t && (c.value = t, c.needsUpdate = i > 0), e.numPlanes = i, e.numIntersection = 0;
  }
  function f(d, u, m, g) {
    const M = d !== null ? d.length : 0;
    let p = null;
    if (M !== 0) {
      if (p = c.value, g !== !0 || p === null) {
        const h = m + M * 4, S = u.matrixWorldInverse;
        o.getNormalMatrix(S), (p === null || p.length < h) && (p = new Float32Array(h));
        for (let b = 0, y = m; b !== M; ++b, y += 4)
          a.copy(d[b]).applyMatrix4(S, o), a.normal.toArray(p, y), p[y + 3] = a.constant;
      }
      c.value = p, c.needsUpdate = !0;
    }
    return e.numPlanes = M, e.numIntersection = 0, p;
  }
}
const Qn = 4, Sl = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], _i = 20, Hm = 256, hr = /* @__PURE__ */ new wo(), El = /* @__PURE__ */ new Je();
let na = null, ia = 0, ra = 0, sa = !1;
const km = /* @__PURE__ */ new B();
class Tl {
  /**
   * Constructs a new PMREM generator.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   */
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._sizeLods = [], this._sigmas = [], this._lodMeshes = [], this._backgroundBox = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._blurMaterial = null, this._ggxMaterial = null;
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety.
   *
   * @param {Scene} scene - The scene to be captured.
   * @param {number} [sigma=0] - The blur radius in radians.
   * @param {number} [near=0.1] - The near plane distance.
   * @param {number} [far=100] - The far plane distance.
   * @param {Object} [options={}] - The configuration options.
   * @param {number} [options.size=256] - The texture size of the PMREM.
   * @param {Vector3} [options.position=origin] - The position of the internal cube camera that renders the scene.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromScene(e, t = 0, i = 0.1, r = 100, s = {}) {
    const {
      size: a = 256,
      position: o = km
    } = s;
    na = this._renderer.getRenderTarget(), ia = this._renderer.getActiveCubeFace(), ra = this._renderer.getActiveMipmapLevel(), sa = this._renderer.xr.enabled, this._renderer.xr.enabled = !1, this._setSize(a);
    const c = this._allocateTargets();
    return c.depthBuffer = !0, this._sceneToCubeUV(e, i, r, c, o), t > 0 && this._blur(c, 0, 0, t), this._applyPMREM(c), this._cleanup(c), c;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   *
   * @param {Texture} equirectangular - The equirectangular texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   *
   * @param {Texture} cubemap - The cubemap texture to be converted.
   * @param {?WebGLRenderTarget} [renderTarget=null] - The render target to use.
   * @return {WebGLRenderTarget} The resulting PMREM.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Al(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = bl(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose(), this._backgroundBox !== null && (this._backgroundBox.geometry.dispose(), this._backgroundBox.material.dispose());
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._ggxMaterial !== null && this._ggxMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodMeshes.length; e++)
      this._lodMeshes[e].geometry.dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(na, ia, ra), this._renderer.xr.enabled = sa, e.scissorTest = !1, Hi(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === bi || e.mapping === Qi ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), na = this._renderer.getRenderTarget(), ia = this._renderer.getActiveCubeFace(), ra = this._renderer.getActiveMipmapLevel(), sa = this._renderer.xr.enabled, this._renderer.xr.enabled = !1;
    const i = t || this._allocateTargets();
    return this._textureToCubeUV(e, i), this._applyPMREM(i), this._cleanup(i), i;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, i = {
      magFilter: Rt,
      minFilter: Rt,
      generateMipmaps: !1,
      type: On,
      format: nn,
      colorSpace: tr,
      depthBuffer: !1
    }, r = yl(e, t, i);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = yl(e, t, i);
      const { _lodMax: s } = this;
      ({ lodMeshes: this._lodMeshes, sizeLods: this._sizeLods, sigmas: this._sigmas } = Wm(s)), this._blurMaterial = qm(s, e, t), this._ggxMaterial = Xm(s, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new xn(new Gn(), e);
    this._renderer.compile(t, hr);
  }
  _sceneToCubeUV(e, t, i, r, s) {
    const c = new Jt(90, 1, t, i), l = [1, -1, 1, 1, 1, 1], f = [1, 1, 1, -1, -1, -1], d = this._renderer, u = d.autoClear, m = d.toneMapping;
    d.getClearColor(El), d.toneMapping = dn, d.autoClear = !1, d.state.buffers.depth.getReversed() && (d.setRenderTarget(r), d.clearDepth(), d.setRenderTarget(null)), this._backgroundBox === null && (this._backgroundBox = new xn(
      new wr(),
      new Jc({
        name: "PMREM.Background",
        side: It,
        depthWrite: !1,
        depthTest: !1
      })
    ));
    const M = this._backgroundBox, p = M.material;
    let h = !1;
    const S = e.background;
    S ? S.isColor && (p.color.copy(S), e.background = null, h = !0) : (p.color.copy(El), h = !0);
    for (let b = 0; b < 6; b++) {
      const y = b % 3;
      y === 0 ? (c.up.set(0, l[b], 0), c.position.set(s.x, s.y, s.z), c.lookAt(s.x + f[b], s.y, s.z)) : y === 1 ? (c.up.set(0, 0, l[b]), c.position.set(s.x, s.y, s.z), c.lookAt(s.x, s.y + f[b], s.z)) : (c.up.set(0, l[b], 0), c.position.set(s.x, s.y, s.z), c.lookAt(s.x, s.y, s.z + f[b]));
      const C = this._cubeSize;
      Hi(r, y * C, b > 2 ? C : 0, C, C), d.setRenderTarget(r), h && d.render(M, c), d.render(e, c);
    }
    d.toneMapping = m, d.autoClear = u, e.background = S;
  }
  _textureToCubeUV(e, t) {
    const i = this._renderer, r = e.mapping === bi || e.mapping === Qi;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Al()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = bl());
    const s = r ? this._cubemapMaterial : this._equirectMaterial, a = this._lodMeshes[0];
    a.material = s;
    const o = s.uniforms;
    o.envMap.value = e;
    const c = this._cubeSize;
    Hi(t, 0, 0, 3 * c, 2 * c), i.setRenderTarget(t), i.render(a, hr);
  }
  _applyPMREM(e) {
    const t = this._renderer, i = t.autoClear;
    t.autoClear = !1;
    const r = this._lodMeshes.length;
    for (let s = 1; s < r; s++)
      this._applyGGXFilter(e, s - 1, s);
    t.autoClear = i;
  }
  /**
   * Applies GGX VNDF importance sampling filter to generate a prefiltered environment map.
   * Uses Monte Carlo integration with VNDF importance sampling to accurately represent the
   * GGX BRDF for physically-based rendering. Reads from the previous LOD level and
   * applies incremental roughness filtering to avoid over-blurring.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn - Source LOD level to read from
   * @param {number} lodOut - Target LOD level to write to
   */
  _applyGGXFilter(e, t, i) {
    const r = this._renderer, s = this._pingPongRenderTarget, a = this._ggxMaterial, o = this._lodMeshes[i];
    o.material = a;
    const c = a.uniforms, l = i / (this._lodMeshes.length - 1), f = t / (this._lodMeshes.length - 1), d = Math.sqrt(l * l - f * f), u = 0 + l * 1.25, m = d * u, { _lodMax: g } = this, M = this._sizeLods[i], p = 3 * M * (i > g - Qn ? i - g + Qn : 0), h = 4 * (this._cubeSize - M);
    c.envMap.value = e.texture, c.roughness.value = m, c.mipInt.value = g - t, Hi(s, p, h, 3 * M, 2 * M), r.setRenderTarget(s), r.render(o, hr), c.envMap.value = s.texture, c.roughness.value = 0, c.mipInt.value = g - i, Hi(e, p, h, 3 * M, 2 * M), r.setRenderTarget(e), r.render(o, hr);
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   *
   * Used for initial scene blur in fromScene() method when sigma > 0.
   *
   * @private
   * @param {WebGLRenderTarget} cubeUVRenderTarget
   * @param {number} lodIn
   * @param {number} lodOut
   * @param {number} sigma
   * @param {Vector3} [poleAxis]
   */
  _blur(e, t, i, r, s) {
    const a = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      a,
      t,
      i,
      r,
      "latitudinal",
      s
    ), this._halfBlur(
      a,
      e,
      i,
      i,
      r,
      "longitudinal",
      s
    );
  }
  _halfBlur(e, t, i, r, s, a, o) {
    const c = this._renderer, l = this._blurMaterial;
    a !== "latitudinal" && a !== "longitudinal" && We(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const f = 3, d = this._lodMeshes[r];
    d.material = l;
    const u = l.uniforms, m = this._sizeLods[i] - 1, g = isFinite(s) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * _i - 1), M = s / g, p = isFinite(s) ? 1 + Math.floor(f * M) : _i;
    p > _i && Ce(`sigmaRadians, ${s}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${_i}`);
    const h = [];
    let S = 0;
    for (let D = 0; D < _i; ++D) {
      const v = D / M, T = Math.exp(-v * v / 2);
      h.push(T), D === 0 ? S += T : D < p && (S += 2 * T);
    }
    for (let D = 0; D < h.length; D++)
      h[D] = h[D] / S;
    u.envMap.value = e.texture, u.samples.value = p, u.weights.value = h, u.latitudinal.value = a === "latitudinal", o && (u.poleAxis.value = o);
    const { _lodMax: b } = this;
    u.dTheta.value = g, u.mipInt.value = b - i;
    const y = this._sizeLods[r], C = 3 * y * (r > b - Qn ? r - b + Qn : 0), A = 4 * (this._cubeSize - y);
    Hi(t, C, A, 3 * y, 2 * y), c.setRenderTarget(t), c.render(d, hr);
  }
}
function Wm(n) {
  const e = [], t = [], i = [];
  let r = n;
  const s = n - Qn + 1 + Sl.length;
  for (let a = 0; a < s; a++) {
    const o = Math.pow(2, r);
    e.push(o);
    let c = 1 / o;
    a > n - Qn ? c = Sl[a - n + Qn - 1] : a === 0 && (c = 0), t.push(c);
    const l = 1 / (o - 2), f = -l, d = 1 + l, u = [f, f, d, f, d, d, f, f, d, d, f, d], m = 6, g = 6, M = 3, p = 2, h = 1, S = new Float32Array(M * g * m), b = new Float32Array(p * g * m), y = new Float32Array(h * g * m);
    for (let A = 0; A < m; A++) {
      const D = A % 3 * 2 / 3 - 1, v = A > 2 ? 0 : -1, T = [
        D,
        v,
        0,
        D + 2 / 3,
        v,
        0,
        D + 2 / 3,
        v + 1,
        0,
        D,
        v,
        0,
        D + 2 / 3,
        v + 1,
        0,
        D,
        v + 1,
        0
      ];
      S.set(T, M * g * A), b.set(u, p * g * A);
      const Y = [A, A, A, A, A, A];
      y.set(Y, h * g * A);
    }
    const C = new Gn();
    C.setAttribute("position", new mn(S, M)), C.setAttribute("uv", new mn(b, p)), C.setAttribute("faceIndex", new mn(y, h)), i.push(new xn(C, null)), r > Qn && r--;
  }
  return { lodMeshes: i, sizeLods: e, sigmas: t };
}
function yl(n, e, t) {
  const i = new pn(n, e, t);
  return i.texture.mapping = Es, i.texture.name = "PMREM.cubeUv", i.scissorTest = !0, i;
}
function Hi(n, e, t, i, r) {
  n.viewport.set(e, t, i, r), n.scissor.set(e, t, i, r);
}
function Xm(n, e, t) {
  return new rn({
    name: "PMREMGGXConvolution",
    defines: {
      GGX_SAMPLES: Hm,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${n}.0`
    },
    uniforms: {
      envMap: { value: null },
      roughness: { value: 0 },
      mipInt: { value: 0 }
    },
    vertexShader: ys(),
    fragmentShader: (
      /* glsl */
      `

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`
    ),
    blending: In,
    depthTest: !1,
    depthWrite: !1
  });
}
function qm(n, e, t) {
  const i = new Float32Array(_i), r = new B(0, 1, 0);
  return new rn({
    name: "SphericalGaussianBlur",
    defines: {
      n: _i,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${n}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: i },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: ys(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: In,
    depthTest: !1,
    depthWrite: !1
  });
}
function bl() {
  return new rn({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: ys(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: In,
    depthTest: !1,
    depthWrite: !1
  });
}
function Al() {
  return new rn({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: ys(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: In,
    depthTest: !1,
    depthWrite: !1
  });
}
function ys() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
class su extends pn {
  /**
   * Constructs a new cube render target.
   *
   * @param {number} [size=1] - The size of the render target.
   * @param {RenderTarget~Options} [options] - The configuration object.
   */
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const i = { width: e, height: e, depth: 1 }, r = [i, i, i, i, i, i];
    this.texture = new eu(r), this._setTextureOptions(t), this.texture.isRenderTargetTexture = !0;
  }
  /**
   * Converts the given equirectangular texture to a cube map.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {Texture} texture - The equirectangular texture.
   * @return {WebGLCubeRenderTarget} A reference to this cube render target.
   */
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const i = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new wr(5, 5, 5), s = new rn({
      name: "CubemapFromEquirect",
      uniforms: nr(i.uniforms),
      vertexShader: i.vertexShader,
      fragmentShader: i.fragmentShader,
      side: It,
      blending: In
    });
    s.uniforms.tEquirect.value = t;
    const a = new xn(r, s), o = t.minFilter;
    return t.minFilter === vi && (t.minFilter = Rt), new Qh(1, 10, this).update(e, a), t.minFilter = o, a.geometry.dispose(), a.material.dispose(), this;
  }
  /**
   * Clears this cube render target.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {boolean} [color=true] - Whether the color buffer should be cleared or not.
   * @param {boolean} [depth=true] - Whether the depth buffer should be cleared or not.
   * @param {boolean} [stencil=true] - Whether the stencil buffer should be cleared or not.
   */
  clear(e, t = !0, i = !0, r = !0) {
    const s = e.getRenderTarget();
    for (let a = 0; a < 6; a++)
      e.setRenderTarget(this, a), e.clear(t, i, r);
    e.setRenderTarget(s);
  }
}
function Ym(n) {
  let e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), i = null;
  function r(u, m = !1) {
    return u == null ? null : m ? a(u) : s(u);
  }
  function s(u) {
    if (u && u.isTexture) {
      const m = u.mapping;
      if (m === Cs || m === Ps)
        if (e.has(u)) {
          const g = e.get(u).texture;
          return o(g, u.mapping);
        } else {
          const g = u.image;
          if (g && g.height > 0) {
            const M = new su(g.height);
            return M.fromEquirectangularTexture(n, u), e.set(u, M), u.addEventListener("dispose", l), o(M.texture, u.mapping);
          } else
            return null;
        }
    }
    return u;
  }
  function a(u) {
    if (u && u.isTexture) {
      const m = u.mapping, g = m === Cs || m === Ps, M = m === bi || m === Qi;
      if (g || M) {
        let p = t.get(u);
        const h = p !== void 0 ? p.texture.pmremVersion : 0;
        if (u.isRenderTargetTexture && u.pmremVersion !== h)
          return i === null && (i = new Tl(n)), p = g ? i.fromEquirectangular(u, p) : i.fromCubemap(u, p), p.texture.pmremVersion = u.pmremVersion, t.set(u, p), p.texture;
        if (p !== void 0)
          return p.texture;
        {
          const S = u.image;
          return g && S && S.height > 0 || M && S && c(S) ? (i === null && (i = new Tl(n)), p = g ? i.fromEquirectangular(u) : i.fromCubemap(u), p.texture.pmremVersion = u.pmremVersion, t.set(u, p), u.addEventListener("dispose", f), p.texture) : null;
        }
      }
    }
    return u;
  }
  function o(u, m) {
    return m === Cs ? u.mapping = bi : m === Ps && (u.mapping = Qi), u;
  }
  function c(u) {
    let m = 0;
    const g = 6;
    for (let M = 0; M < g; M++)
      u[M] !== void 0 && m++;
    return m === g;
  }
  function l(u) {
    const m = u.target;
    m.removeEventListener("dispose", l);
    const g = e.get(m);
    g !== void 0 && (e.delete(m), g.dispose());
  }
  function f(u) {
    const m = u.target;
    m.removeEventListener("dispose", f);
    const g = t.get(m);
    g !== void 0 && (t.delete(m), g.dispose());
  }
  function d() {
    e = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap(), i !== null && (i.dispose(), i = null);
  }
  return {
    get: r,
    dispose: d
  };
}
function Km(n) {
  const e = {};
  function t(i) {
    if (e[i] !== void 0)
      return e[i];
    const r = n.getExtension(i);
    return e[i] = r, r;
  }
  return {
    has: function(i) {
      return t(i) !== null;
    },
    init: function() {
      t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance"), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture"), t("WEBGL_render_shared_exponent");
    },
    get: function(i) {
      const r = t(i);
      return r === null && xs("WebGLRenderer: " + i + " extension not supported."), r;
    }
  };
}
function Zm(n, e, t, i) {
  const r = {}, s = /* @__PURE__ */ new WeakMap();
  function a(d) {
    const u = d.target;
    u.index !== null && e.remove(u.index);
    for (const g in u.attributes)
      e.remove(u.attributes[g]);
    u.removeEventListener("dispose", a), delete r[u.id];
    const m = s.get(u);
    m && (e.remove(m), s.delete(u)), i.releaseStatesOfGeometry(u), u.isInstancedBufferGeometry === !0 && delete u._maxInstanceCount, t.memory.geometries--;
  }
  function o(d, u) {
    return r[u.id] === !0 || (u.addEventListener("dispose", a), r[u.id] = !0, t.memory.geometries++), u;
  }
  function c(d) {
    const u = d.attributes;
    for (const m in u)
      e.update(u[m], n.ARRAY_BUFFER);
  }
  function l(d) {
    const u = [], m = d.index, g = d.attributes.position;
    let M = 0;
    if (g === void 0)
      return;
    if (m !== null) {
      const S = m.array;
      M = m.version;
      for (let b = 0, y = S.length; b < y; b += 3) {
        const C = S[b + 0], A = S[b + 1], D = S[b + 2];
        u.push(C, A, A, D, D, C);
      }
    } else {
      const S = g.array;
      M = g.version;
      for (let b = 0, y = S.length / 3 - 1; b < y; b += 3) {
        const C = b + 0, A = b + 1, D = b + 2;
        u.push(C, A, A, D, D, C);
      }
    }
    const p = new (g.count >= 65535 ? jc : $c)(u, 1);
    p.version = M;
    const h = s.get(d);
    h && e.remove(h), s.set(d, p);
  }
  function f(d) {
    const u = s.get(d);
    if (u) {
      const m = d.index;
      m !== null && u.version < m.version && l(d);
    } else
      l(d);
    return s.get(d);
  }
  return {
    get: o,
    update: c,
    getWireframeAttribute: f
  };
}
function $m(n, e, t) {
  let i;
  function r(u) {
    i = u;
  }
  let s, a;
  function o(u) {
    s = u.type, a = u.bytesPerElement;
  }
  function c(u, m) {
    n.drawElements(i, m, s, u * a), t.update(m, i, 1);
  }
  function l(u, m, g) {
    g !== 0 && (n.drawElementsInstanced(i, m, s, u * a, g), t.update(m, i, g));
  }
  function f(u, m, g) {
    if (g === 0) return;
    e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i, m, 0, s, u, 0, g);
    let p = 0;
    for (let h = 0; h < g; h++)
      p += m[h];
    t.update(p, i, 1);
  }
  function d(u, m, g, M) {
    if (g === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let h = 0; h < u.length; h++)
        l(u[h] / a, m[h], M[h]);
    else {
      p.multiDrawElementsInstancedWEBGL(i, m, 0, s, u, 0, M, 0, g);
      let h = 0;
      for (let S = 0; S < g; S++)
        h += m[S] * M[S];
      t.update(h, i, 1);
    }
  }
  this.setMode = r, this.setIndex = o, this.render = c, this.renderInstances = l, this.renderMultiDraw = f, this.renderMultiDrawInstances = d;
}
function jm(n) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function i(s, a, o) {
    switch (t.calls++, a) {
      case n.TRIANGLES:
        t.triangles += o * (s / 3);
        break;
      case n.LINES:
        t.lines += o * (s / 2);
        break;
      case n.LINE_STRIP:
        t.lines += o * (s - 1);
        break;
      case n.LINE_LOOP:
        t.lines += o * s;
        break;
      case n.POINTS:
        t.points += o * s;
        break;
      default:
        We("WebGLInfo: Unknown draw mode:", a);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: i
  };
}
function Jm(n, e, t) {
  const i = /* @__PURE__ */ new WeakMap(), r = new ct();
  function s(a, o, c) {
    const l = a.morphTargetInfluences, f = o.morphAttributes.position || o.morphAttributes.normal || o.morphAttributes.color, d = f !== void 0 ? f.length : 0;
    let u = i.get(o);
    if (u === void 0 || u.count !== d) {
      let T = function() {
        D.dispose(), i.delete(o), o.removeEventListener("dispose", T);
      };
      u !== void 0 && u.texture.dispose();
      const m = o.morphAttributes.position !== void 0, g = o.morphAttributes.normal !== void 0, M = o.morphAttributes.color !== void 0, p = o.morphAttributes.position || [], h = o.morphAttributes.normal || [], S = o.morphAttributes.color || [];
      let b = 0;
      m === !0 && (b = 1), g === !0 && (b = 2), M === !0 && (b = 3);
      let y = o.attributes.position.count * b, C = 1;
      y > e.maxTextureSize && (C = Math.ceil(y / e.maxTextureSize), y = e.maxTextureSize);
      const A = new Float32Array(y * C * 4 * d), D = new Yc(A, y, C, d);
      D.type = cn, D.needsUpdate = !0;
      const v = b * 4;
      for (let Y = 0; Y < d; Y++) {
        const R = p[Y], V = h[Y], z = S[Y], k = y * C * 4 * Y;
        for (let G = 0; G < R.count; G++) {
          const F = G * v;
          m === !0 && (r.fromBufferAttribute(R, G), A[k + F + 0] = r.x, A[k + F + 1] = r.y, A[k + F + 2] = r.z, A[k + F + 3] = 0), g === !0 && (r.fromBufferAttribute(V, G), A[k + F + 4] = r.x, A[k + F + 5] = r.y, A[k + F + 6] = r.z, A[k + F + 7] = 0), M === !0 && (r.fromBufferAttribute(z, G), A[k + F + 8] = r.x, A[k + F + 9] = r.y, A[k + F + 10] = r.z, A[k + F + 11] = z.itemSize === 4 ? r.w : 1);
        }
      }
      u = {
        count: d,
        texture: D,
        size: new Ze(y, C)
      }, i.set(o, u), o.addEventListener("dispose", T);
    }
    if (a.isInstancedMesh === !0 && a.morphTexture !== null)
      c.getUniforms().setValue(n, "morphTexture", a.morphTexture, t);
    else {
      let m = 0;
      for (let M = 0; M < l.length; M++)
        m += l[M];
      const g = o.morphTargetsRelative ? 1 : 1 - m;
      c.getUniforms().setValue(n, "morphTargetBaseInfluence", g), c.getUniforms().setValue(n, "morphTargetInfluences", l);
    }
    c.getUniforms().setValue(n, "morphTargetsTexture", u.texture, t), c.getUniforms().setValue(n, "morphTargetsTextureSize", u.size);
  }
  return {
    update: s
  };
}
function Qm(n, e, t, i, r) {
  let s = /* @__PURE__ */ new WeakMap();
  function a(l) {
    const f = r.render.frame, d = l.geometry, u = e.get(l, d);
    if (s.get(u) !== f && (e.update(u), s.set(u, f)), l.isInstancedMesh && (l.hasEventListener("dispose", c) === !1 && l.addEventListener("dispose", c), s.get(l) !== f && (t.update(l.instanceMatrix, n.ARRAY_BUFFER), l.instanceColor !== null && t.update(l.instanceColor, n.ARRAY_BUFFER), s.set(l, f))), l.isSkinnedMesh) {
      const m = l.skeleton;
      s.get(m) !== f && (m.update(), s.set(m, f));
    }
    return u;
  }
  function o() {
    s = /* @__PURE__ */ new WeakMap();
  }
  function c(l) {
    const f = l.target;
    f.removeEventListener("dispose", c), i.releaseStatesOfObject(f), t.remove(f.instanceMatrix), f.instanceColor !== null && t.remove(f.instanceColor);
  }
  return {
    update: a,
    dispose: o
  };
}
const e_ = {
  [Dc]: "LINEAR_TONE_MAPPING",
  [Lc]: "REINHARD_TONE_MAPPING",
  [Ic]: "CINEON_TONE_MAPPING",
  [Uc]: "ACES_FILMIC_TONE_MAPPING",
  [Fc]: "AGX_TONE_MAPPING",
  [Oc]: "NEUTRAL_TONE_MAPPING",
  [Nc]: "CUSTOM_TONE_MAPPING"
};
function t_(n, e, t, i, r) {
  const s = new pn(e, t, {
    type: n,
    depthBuffer: i,
    stencilBuffer: r
  }), a = new pn(e, t, {
    type: On,
    depthBuffer: !1,
    stencilBuffer: !1
  }), o = new Gn();
  o.setAttribute("position", new Nn([-1, 3, 0, -1, -1, 0, 3, -1, 0], 3)), o.setAttribute("uv", new Nn([0, 2, 0, 0, 2, 0], 2));
  const c = new $h({
    uniforms: {
      tDiffuse: { value: null }
    },
    vertexShader: (
      /* glsl */
      `
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`
    ),
    fragmentShader: (
      /* glsl */
      `
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`
    ),
    depthTest: !1,
    depthWrite: !1
  }), l = new xn(o, c), f = new wo(-1, 1, 1, -1, 0, 1);
  let d = null, u = null, m = !1, g, M = null, p = [], h = !1;
  this.setSize = function(S, b) {
    s.setSize(S, b), a.setSize(S, b);
    for (let y = 0; y < p.length; y++) {
      const C = p[y];
      C.setSize && C.setSize(S, b);
    }
  }, this.setEffects = function(S) {
    p = S, h = p.length > 0 && p[0].isRenderPass === !0;
    const b = s.width, y = s.height;
    for (let C = 0; C < p.length; C++) {
      const A = p[C];
      A.setSize && A.setSize(b, y);
    }
  }, this.begin = function(S, b) {
    if (m || S.toneMapping === dn && p.length === 0) return !1;
    if (M = b, b !== null) {
      const y = b.width, C = b.height;
      (s.width !== y || s.height !== C) && this.setSize(y, C);
    }
    return h === !1 && S.setRenderTarget(s), g = S.toneMapping, S.toneMapping = dn, !0;
  }, this.hasRenderPass = function() {
    return h;
  }, this.end = function(S, b) {
    S.toneMapping = g, m = !0;
    let y = s, C = a;
    for (let A = 0; A < p.length; A++) {
      const D = p[A];
      if (D.enabled !== !1 && (D.render(S, C, y, b), D.needsSwap !== !1)) {
        const v = y;
        y = C, C = v;
      }
    }
    if (d !== S.outputColorSpace || u !== S.toneMapping) {
      d = S.outputColorSpace, u = S.toneMapping, c.defines = {}, Ge.getTransfer(d) === Ke && (c.defines.SRGB_TRANSFER = "");
      const A = e_[u];
      A && (c.defines[A] = ""), c.needsUpdate = !0;
    }
    c.uniforms.tDiffuse.value = y.texture, S.setRenderTarget(M), S.render(l, f), M = null, m = !1;
  }, this.isCompositing = function() {
    return m;
  }, this.dispose = function() {
    s.dispose(), a.dispose(), o.dispose(), c.dispose();
  };
}
const au = /* @__PURE__ */ new Pt(), so = /* @__PURE__ */ new Tr(1, 1), ou = /* @__PURE__ */ new Yc(), lu = /* @__PURE__ */ new Ah(), cu = /* @__PURE__ */ new eu(), wl = [], Rl = [], Cl = new Float32Array(16), Pl = new Float32Array(9), Dl = new Float32Array(4);
function ar(n, e, t) {
  const i = n[0];
  if (i <= 0 || i > 0) return n;
  const r = e * t;
  let s = wl[r];
  if (s === void 0 && (s = new Float32Array(r), wl[r] = s), e !== 0) {
    i.toArray(s, 0);
    for (let a = 1, o = 0; a !== e; ++a)
      o += t, n[a].toArray(s, o);
  }
  return s;
}
function pt(n, e) {
  if (n.length !== e.length) return !1;
  for (let t = 0, i = n.length; t < i; t++)
    if (n[t] !== e[t]) return !1;
  return !0;
}
function mt(n, e) {
  for (let t = 0, i = e.length; t < i; t++)
    n[t] = e[t];
}
function bs(n, e) {
  let t = Rl[e];
  t === void 0 && (t = new Int32Array(e), Rl[e] = t);
  for (let i = 0; i !== e; ++i)
    t[i] = n.allocateTextureUnit();
  return t;
}
function n_(n, e) {
  const t = this.cache;
  t[0] !== e && (n.uniform1f(this.addr, e), t[0] = e);
}
function i_(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (n.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (pt(t, e)) return;
    n.uniform2fv(this.addr, e), mt(t, e);
  }
}
function r_(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (n.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (pt(t, e)) return;
    n.uniform3fv(this.addr, e), mt(t, e);
  }
}
function s_(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (pt(t, e)) return;
    n.uniform4fv(this.addr, e), mt(t, e);
  }
}
function a_(n, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (pt(t, e)) return;
    n.uniformMatrix2fv(this.addr, !1, e), mt(t, e);
  } else {
    if (pt(t, i)) return;
    Dl.set(i), n.uniformMatrix2fv(this.addr, !1, Dl), mt(t, i);
  }
}
function o_(n, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (pt(t, e)) return;
    n.uniformMatrix3fv(this.addr, !1, e), mt(t, e);
  } else {
    if (pt(t, i)) return;
    Pl.set(i), n.uniformMatrix3fv(this.addr, !1, Pl), mt(t, i);
  }
}
function l_(n, e) {
  const t = this.cache, i = e.elements;
  if (i === void 0) {
    if (pt(t, e)) return;
    n.uniformMatrix4fv(this.addr, !1, e), mt(t, e);
  } else {
    if (pt(t, i)) return;
    Cl.set(i), n.uniformMatrix4fv(this.addr, !1, Cl), mt(t, i);
  }
}
function c_(n, e) {
  const t = this.cache;
  t[0] !== e && (n.uniform1i(this.addr, e), t[0] = e);
}
function u_(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (n.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (pt(t, e)) return;
    n.uniform2iv(this.addr, e), mt(t, e);
  }
}
function f_(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (pt(t, e)) return;
    n.uniform3iv(this.addr, e), mt(t, e);
  }
}
function h_(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (pt(t, e)) return;
    n.uniform4iv(this.addr, e), mt(t, e);
  }
}
function d_(n, e) {
  const t = this.cache;
  t[0] !== e && (n.uniform1ui(this.addr, e), t[0] = e);
}
function p_(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (n.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (pt(t, e)) return;
    n.uniform2uiv(this.addr, e), mt(t, e);
  }
}
function m_(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (n.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (pt(t, e)) return;
    n.uniform3uiv(this.addr, e), mt(t, e);
  }
}
function __(n, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (n.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (pt(t, e)) return;
    n.uniform4uiv(this.addr, e), mt(t, e);
  }
}
function g_(n, e, t) {
  const i = this.cache, r = t.allocateTextureUnit();
  i[0] !== r && (n.uniform1i(this.addr, r), i[0] = r);
  let s;
  this.type === n.SAMPLER_2D_SHADOW ? (so.compareFunction = t.isReversedDepthBuffer() ? yo : To, s = so) : s = au, t.setTexture2D(e || s, r);
}
function v_(n, e, t) {
  const i = this.cache, r = t.allocateTextureUnit();
  i[0] !== r && (n.uniform1i(this.addr, r), i[0] = r), t.setTexture3D(e || lu, r);
}
function x_(n, e, t) {
  const i = this.cache, r = t.allocateTextureUnit();
  i[0] !== r && (n.uniform1i(this.addr, r), i[0] = r), t.setTextureCube(e || cu, r);
}
function M_(n, e, t) {
  const i = this.cache, r = t.allocateTextureUnit();
  i[0] !== r && (n.uniform1i(this.addr, r), i[0] = r), t.setTexture2DArray(e || ou, r);
}
function S_(n) {
  switch (n) {
    case 5126:
      return n_;
    // FLOAT
    case 35664:
      return i_;
    // _VEC2
    case 35665:
      return r_;
    // _VEC3
    case 35666:
      return s_;
    // _VEC4
    case 35674:
      return a_;
    // _MAT2
    case 35675:
      return o_;
    // _MAT3
    case 35676:
      return l_;
    // _MAT4
    case 5124:
    case 35670:
      return c_;
    // INT, BOOL
    case 35667:
    case 35671:
      return u_;
    // _VEC2
    case 35668:
    case 35672:
      return f_;
    // _VEC3
    case 35669:
    case 35673:
      return h_;
    // _VEC4
    case 5125:
      return d_;
    // UINT
    case 36294:
      return p_;
    // _VEC2
    case 36295:
      return m_;
    // _VEC3
    case 36296:
      return __;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return g_;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return v_;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return x_;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return M_;
  }
}
function E_(n, e) {
  n.uniform1fv(this.addr, e);
}
function T_(n, e) {
  const t = ar(e, this.size, 2);
  n.uniform2fv(this.addr, t);
}
function y_(n, e) {
  const t = ar(e, this.size, 3);
  n.uniform3fv(this.addr, t);
}
function b_(n, e) {
  const t = ar(e, this.size, 4);
  n.uniform4fv(this.addr, t);
}
function A_(n, e) {
  const t = ar(e, this.size, 4);
  n.uniformMatrix2fv(this.addr, !1, t);
}
function w_(n, e) {
  const t = ar(e, this.size, 9);
  n.uniformMatrix3fv(this.addr, !1, t);
}
function R_(n, e) {
  const t = ar(e, this.size, 16);
  n.uniformMatrix4fv(this.addr, !1, t);
}
function C_(n, e) {
  n.uniform1iv(this.addr, e);
}
function P_(n, e) {
  n.uniform2iv(this.addr, e);
}
function D_(n, e) {
  n.uniform3iv(this.addr, e);
}
function L_(n, e) {
  n.uniform4iv(this.addr, e);
}
function I_(n, e) {
  n.uniform1uiv(this.addr, e);
}
function U_(n, e) {
  n.uniform2uiv(this.addr, e);
}
function N_(n, e) {
  n.uniform3uiv(this.addr, e);
}
function F_(n, e) {
  n.uniform4uiv(this.addr, e);
}
function O_(n, e, t) {
  const i = this.cache, r = e.length, s = bs(t, r);
  pt(i, s) || (n.uniform1iv(this.addr, s), mt(i, s));
  let a;
  this.type === n.SAMPLER_2D_SHADOW ? a = so : a = au;
  for (let o = 0; o !== r; ++o)
    t.setTexture2D(e[o] || a, s[o]);
}
function B_(n, e, t) {
  const i = this.cache, r = e.length, s = bs(t, r);
  pt(i, s) || (n.uniform1iv(this.addr, s), mt(i, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture3D(e[a] || lu, s[a]);
}
function z_(n, e, t) {
  const i = this.cache, r = e.length, s = bs(t, r);
  pt(i, s) || (n.uniform1iv(this.addr, s), mt(i, s));
  for (let a = 0; a !== r; ++a)
    t.setTextureCube(e[a] || cu, s[a]);
}
function V_(n, e, t) {
  const i = this.cache, r = e.length, s = bs(t, r);
  pt(i, s) || (n.uniform1iv(this.addr, s), mt(i, s));
  for (let a = 0; a !== r; ++a)
    t.setTexture2DArray(e[a] || ou, s[a]);
}
function G_(n) {
  switch (n) {
    case 5126:
      return E_;
    // FLOAT
    case 35664:
      return T_;
    // _VEC2
    case 35665:
      return y_;
    // _VEC3
    case 35666:
      return b_;
    // _VEC4
    case 35674:
      return A_;
    // _MAT2
    case 35675:
      return w_;
    // _MAT3
    case 35676:
      return R_;
    // _MAT4
    case 5124:
    case 35670:
      return C_;
    // INT, BOOL
    case 35667:
    case 35671:
      return P_;
    // _VEC2
    case 35668:
    case 35672:
      return D_;
    // _VEC3
    case 35669:
    case 35673:
      return L_;
    // _VEC4
    case 5125:
      return I_;
    // UINT
    case 36294:
      return U_;
    // _VEC2
    case 36295:
      return N_;
    // _VEC3
    case 36296:
      return F_;
    // _VEC4
    case 35678:
    // SAMPLER_2D
    case 36198:
    // SAMPLER_EXTERNAL_OES
    case 36298:
    // INT_SAMPLER_2D
    case 36306:
    // UNSIGNED_INT_SAMPLER_2D
    case 35682:
      return O_;
    case 35679:
    // SAMPLER_3D
    case 36299:
    // INT_SAMPLER_3D
    case 36307:
      return B_;
    case 35680:
    // SAMPLER_CUBE
    case 36300:
    // INT_SAMPLER_CUBE
    case 36308:
    // UNSIGNED_INT_SAMPLER_CUBE
    case 36293:
      return z_;
    case 36289:
    // SAMPLER_2D_ARRAY
    case 36303:
    // INT_SAMPLER_2D_ARRAY
    case 36311:
    // UNSIGNED_INT_SAMPLER_2D_ARRAY
    case 36292:
      return V_;
  }
}
class H_ {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.setValue = S_(t.type);
  }
}
class k_ {
  constructor(e, t, i) {
    this.id = e, this.addr = i, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = G_(t.type);
  }
}
class W_ {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, i) {
    const r = this.seq;
    for (let s = 0, a = r.length; s !== a; ++s) {
      const o = r[s];
      o.setValue(e, t[o.id], i);
    }
  }
}
const aa = /(\w+)(\])?(\[|\.)?/g;
function Ll(n, e) {
  n.seq.push(e), n.map[e.id] = e;
}
function X_(n, e, t) {
  const i = n.name, r = i.length;
  for (aa.lastIndex = 0; ; ) {
    const s = aa.exec(i), a = aa.lastIndex;
    let o = s[1];
    const c = s[2] === "]", l = s[3];
    if (c && (o = o | 0), l === void 0 || l === "[" && a + 2 === r) {
      Ll(t, l === void 0 ? new H_(o, n, e) : new k_(o, n, e));
      break;
    } else {
      let d = t.map[o];
      d === void 0 && (d = new W_(o), Ll(t, d)), t = d;
    }
  }
}
class hs {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const i = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let a = 0; a < i; ++a) {
      const o = e.getActiveUniform(t, a), c = e.getUniformLocation(t, o.name);
      X_(o, c, this);
    }
    const r = [], s = [];
    for (const a of this.seq)
      a.type === e.SAMPLER_2D_SHADOW || a.type === e.SAMPLER_CUBE_SHADOW || a.type === e.SAMPLER_2D_ARRAY_SHADOW ? r.push(a) : s.push(a);
    r.length > 0 && (this.seq = r.concat(s));
  }
  setValue(e, t, i, r) {
    const s = this.map[t];
    s !== void 0 && s.setValue(e, i, r);
  }
  setOptional(e, t, i) {
    const r = t[i];
    r !== void 0 && this.setValue(e, i, r);
  }
  static upload(e, t, i, r) {
    for (let s = 0, a = t.length; s !== a; ++s) {
      const o = t[s], c = i[o.id];
      c.needsUpdate !== !1 && o.setValue(e, c.value, r);
    }
  }
  static seqWithValue(e, t) {
    const i = [];
    for (let r = 0, s = e.length; r !== s; ++r) {
      const a = e[r];
      a.id in t && i.push(a);
    }
    return i;
  }
}
function Il(n, e, t) {
  const i = n.createShader(e);
  return n.shaderSource(i, t), n.compileShader(i), i;
}
const q_ = 37297;
let Y_ = 0;
function K_(n, e) {
  const t = n.split(`
`), i = [], r = Math.max(e - 6, 0), s = Math.min(e + 6, t.length);
  for (let a = r; a < s; a++) {
    const o = a + 1;
    i.push(`${o === e ? ">" : " "} ${o}: ${t[a]}`);
  }
  return i.join(`
`);
}
const Ul = /* @__PURE__ */ new Le();
function Z_(n) {
  Ge._getMatrix(Ul, Ge.workingColorSpace, n);
  const e = `mat3( ${Ul.elements.map((t) => t.toFixed(4))} )`;
  switch (Ge.getTransfer(n)) {
    case _s:
      return [e, "LinearTransferOETF"];
    case Ke:
      return [e, "sRGBTransferOETF"];
    default:
      return Ce("WebGLProgram: Unsupported color space: ", n), [e, "LinearTransferOETF"];
  }
}
function Nl(n, e, t) {
  const i = n.getShaderParameter(e, n.COMPILE_STATUS), s = (n.getShaderInfoLog(e) || "").trim();
  if (i && s === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(s);
  if (a) {
    const o = parseInt(a[1]);
    return t.toUpperCase() + `

` + s + `

` + K_(n.getShaderSource(e), o);
  } else
    return s;
}
function $_(n, e) {
  const t = Z_(e);
  return [
    `vec4 ${n}( vec4 value ) {`,
    `	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,
    "}"
  ].join(`
`);
}
const j_ = {
  [Dc]: "Linear",
  [Lc]: "Reinhard",
  [Ic]: "Cineon",
  [Uc]: "ACESFilmic",
  [Fc]: "AgX",
  [Oc]: "Neutral",
  [Nc]: "Custom"
};
function J_(n, e) {
  const t = j_[e];
  return t === void 0 ? (Ce("WebGLProgram: Unsupported toneMapping:", e), "vec3 " + n + "( vec3 color ) { return LinearToneMapping( color ); }") : "vec3 " + n + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
const ns = /* @__PURE__ */ new B();
function Q_() {
  Ge.getLuminanceCoefficients(ns);
  const n = ns.x.toFixed(4), e = ns.y.toFixed(4), t = ns.z.toFixed(4);
  return [
    "float luminance( const in vec3 rgb ) {",
    `	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,
    "	return dot( weights, rgb );",
    "}"
  ].join(`
`);
}
function eg(n) {
  return [
    n.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : "",
    n.extensionMultiDraw ? "#extension GL_ANGLE_multi_draw : require" : ""
  ].filter(gr).join(`
`);
}
function tg(n) {
  const e = [];
  for (const t in n) {
    const i = n[t];
    i !== !1 && e.push("#define " + t + " " + i);
  }
  return e.join(`
`);
}
function ng(n, e) {
  const t = {}, i = n.getProgramParameter(e, n.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < i; r++) {
    const s = n.getActiveAttrib(e, r), a = s.name;
    let o = 1;
    s.type === n.FLOAT_MAT2 && (o = 2), s.type === n.FLOAT_MAT3 && (o = 3), s.type === n.FLOAT_MAT4 && (o = 4), t[a] = {
      type: s.type,
      location: n.getAttribLocation(e, a),
      locationSize: o
    };
  }
  return t;
}
function gr(n) {
  return n !== "";
}
function Fl(n, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return n.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Ol(n, e) {
  return n.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const ig = /^[ \t]*#include +<([\w\d./]+)>/gm;
function ao(n) {
  return n.replace(ig, sg);
}
const rg = /* @__PURE__ */ new Map();
function sg(n, e) {
  let t = Ue[e];
  if (t === void 0) {
    const i = rg.get(e);
    if (i !== void 0)
      t = Ue[i], Ce('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, i);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return ao(t);
}
const ag = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function Bl(n) {
  return n.replace(ag, og);
}
function og(n, e, t, i) {
  let r = "";
  for (let s = parseInt(e); s < parseInt(t); s++)
    r += i.replace(/\[\s*i\s*\]/g, "[ " + s + " ]").replace(/UNROLLED_LOOP_INDEX/g, s);
  return r;
}
function zl(n) {
  let e = `precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;
  return n.precision === "highp" ? e += `
#define HIGH_PRECISION` : n.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : n.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
const lg = {
  [os]: "SHADOWMAP_TYPE_PCF",
  [_r]: "SHADOWMAP_TYPE_VSM"
};
function cg(n) {
  return lg[n.shadowMapType] || "SHADOWMAP_TYPE_BASIC";
}
const ug = {
  [bi]: "ENVMAP_TYPE_CUBE",
  [Qi]: "ENVMAP_TYPE_CUBE",
  [Es]: "ENVMAP_TYPE_CUBE_UV"
};
function fg(n) {
  return n.envMap === !1 ? "ENVMAP_TYPE_CUBE" : ug[n.envMapMode] || "ENVMAP_TYPE_CUBE";
}
const hg = {
  [Qi]: "ENVMAP_MODE_REFRACTION"
};
function dg(n) {
  return n.envMap === !1 ? "ENVMAP_MODE_REFLECTION" : hg[n.envMapMode] || "ENVMAP_MODE_REFLECTION";
}
const pg = {
  [Pc]: "ENVMAP_BLENDING_MULTIPLY",
  [rh]: "ENVMAP_BLENDING_MIX",
  [sh]: "ENVMAP_BLENDING_ADD"
};
function mg(n) {
  return n.envMap === !1 ? "ENVMAP_BLENDING_NONE" : pg[n.combine] || "ENVMAP_BLENDING_NONE";
}
function _g(n) {
  const e = n.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, i = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 112)), texelHeight: i, maxMip: t };
}
function gg(n, e, t, i) {
  const r = n.getContext(), s = t.defines;
  let a = t.vertexShader, o = t.fragmentShader;
  const c = cg(t), l = fg(t), f = dg(t), d = mg(t), u = _g(t), m = eg(t), g = tg(s), M = r.createProgram();
  let p, h, S = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (p = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(gr).join(`
`), p.length > 0 && (p += `
`), h = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g
  ].filter(gr).join(`
`), h.length > 0 && (h += `
`)) : (p = [
    zl(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.batchingColor ? "#define USE_BATCHING_COLOR" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.instancingMorph ? "#define USE_INSTANCING_MORPH" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + f : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "#ifdef USE_INSTANCING_MORPH",
    "	uniform sampler2D morphTexture;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(gr).join(`
`), h = [
    zl(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    g,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.alphaToCoverage ? "#define ALPHA_TO_COVERAGE" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + l : "",
    t.envMap ? "#define " + f : "",
    t.envMap ? "#define " + d : "",
    u ? "#define CUBEUV_TEXEL_WIDTH " + u.texelWidth : "",
    u ? "#define CUBEUV_TEXEL_HEIGHT " + u.texelHeight : "",
    u ? "#define CUBEUV_MAX_MIP " + u.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.dispersion ? "#define USE_DISPERSION" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas || t.batchingColor ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + c : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.decodeVideoTextureEmissive ? "#define DECODE_VIDEO_TEXTURE_EMISSIVE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGARITHMIC_DEPTH_BUFFER" : "",
    t.reversedDepthBuffer ? "#define USE_REVERSED_DEPTH_BUFFER" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== dn ? "#define TONE_MAPPING" : "",
    t.toneMapping !== dn ? Ue.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== dn ? J_("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Ue.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    $_("linearToOutputTexel", t.outputColorSpace),
    Q_(),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(gr).join(`
`)), a = ao(a), a = Fl(a, t), a = Ol(a, t), o = ao(o), o = Fl(o, t), o = Ol(o, t), a = Bl(a), o = Bl(o), t.isRawShaderMaterial !== !0 && (S = `#version 300 es
`, p = [
    m,
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + p, h = [
    "#define varying in",
    t.glslVersion === tl ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === tl ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + h);
  const b = S + p + a, y = S + h + o, C = Il(r, r.VERTEX_SHADER, b), A = Il(r, r.FRAGMENT_SHADER, y);
  r.attachShader(M, C), r.attachShader(M, A), t.index0AttributeName !== void 0 ? r.bindAttribLocation(M, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(M, 0, "position"), r.linkProgram(M);
  function D(R) {
    if (n.debug.checkShaderErrors) {
      const V = r.getProgramInfoLog(M) || "", z = r.getShaderInfoLog(C) || "", k = r.getShaderInfoLog(A) || "", G = V.trim(), F = z.trim(), O = k.trim();
      let Q = !0, $ = !0;
      if (r.getProgramParameter(M, r.LINK_STATUS) === !1)
        if (Q = !1, typeof n.debug.onShaderError == "function")
          n.debug.onShaderError(r, M, C, A);
        else {
          const ce = Nl(r, C, "vertex"), pe = Nl(r, A, "fragment");
          We(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(M, r.VALIDATE_STATUS) + `

Material Name: ` + R.name + `
Material Type: ` + R.type + `

Program Info Log: ` + G + `
` + ce + `
` + pe
          );
        }
      else G !== "" ? Ce("WebGLProgram: Program Info Log:", G) : (F === "" || O === "") && ($ = !1);
      $ && (R.diagnostics = {
        runnable: Q,
        programLog: G,
        vertexShader: {
          log: F,
          prefix: p
        },
        fragmentShader: {
          log: O,
          prefix: h
        }
      });
    }
    r.deleteShader(C), r.deleteShader(A), v = new hs(r, M), T = ng(r, M);
  }
  let v;
  this.getUniforms = function() {
    return v === void 0 && D(this), v;
  };
  let T;
  this.getAttributes = function() {
    return T === void 0 && D(this), T;
  };
  let Y = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return Y === !1 && (Y = r.getProgramParameter(M, q_)), Y;
  }, this.destroy = function() {
    i.releaseStatesOfProgram(this), r.deleteProgram(M), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Y_++, this.cacheKey = e, this.usedTimes = 1, this.program = M, this.vertexShader = C, this.fragmentShader = A, this;
}
let vg = 0;
class xg {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, i = e.fragmentShader, r = this._getShaderStage(t), s = this._getShaderStage(i), a = this._getShaderCacheForMaterial(e);
    return a.has(r) === !1 && (a.add(r), r.usedTimes++), a.has(s) === !1 && (a.add(s), s.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const i of t)
      i.usedTimes--, i.usedTimes === 0 && this.shaderCache.delete(i.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let i = t.get(e);
    return i === void 0 && (i = /* @__PURE__ */ new Set(), t.set(e, i)), i;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let i = t.get(e);
    return i === void 0 && (i = new Mg(e), t.set(e, i)), i;
  }
}
class Mg {
  constructor(e) {
    this.id = vg++, this.code = e, this.usedTimes = 0;
  }
}
function Sg(n, e, t, i, r, s) {
  const a = new Kc(), o = new xg(), c = /* @__PURE__ */ new Set(), l = [], f = /* @__PURE__ */ new Map(), d = i.logarithmicDepthBuffer;
  let u = i.precision;
  const m = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distance",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function g(v) {
    return c.add(v), v === 0 ? "uv" : `uv${v}`;
  }
  function M(v, T, Y, R, V) {
    const z = R.fog, k = V.geometry, G = v.isMeshStandardMaterial || v.isMeshLambertMaterial || v.isMeshPhongMaterial ? R.environment : null, F = v.isMeshStandardMaterial || v.isMeshLambertMaterial && !v.envMap || v.isMeshPhongMaterial && !v.envMap, O = e.get(v.envMap || G, F), Q = O && O.mapping === Es ? O.image.height : null, $ = m[v.type];
    v.precision !== null && (u = i.getMaxPrecision(v.precision), u !== v.precision && Ce("WebGLProgram.getParameters:", v.precision, "not supported, using", u, "instead."));
    const ce = k.morphAttributes.position || k.morphAttributes.normal || k.morphAttributes.color, pe = ce !== void 0 ? ce.length : 0;
    let fe = 0;
    k.morphAttributes.position !== void 0 && (fe = 1), k.morphAttributes.normal !== void 0 && (fe = 2), k.morphAttributes.color !== void 0 && (fe = 3);
    let Ie, rt, it, K;
    if ($) {
      const Ye = ln[$];
      Ie = Ye.vertexShader, rt = Ye.fragmentShader;
    } else
      Ie = v.vertexShader, rt = v.fragmentShader, o.update(v), it = o.getVertexShaderID(v), K = o.getFragmentShaderID(v);
    const ne = n.getRenderTarget(), se = n.state.buffers.depth.getReversed(), De = V.isInstancedMesh === !0, be = V.isBatchedMesh === !0, we = !!v.map, _t = !!v.matcap, Ve = !!O, qe = !!v.aoMap, Qe = !!v.lightMap, Ne = !!v.bumpMap, ot = !!v.normalMap, w = !!v.displacementMap, ut = !!v.emissiveMap, Xe = !!v.metalnessMap, tt = !!v.roughnessMap, Me = v.anisotropy > 0, E = v.clearcoat > 0, _ = v.dispersion > 0, L = v.iridescence > 0, q = v.sheen > 0, Z = v.transmission > 0, X = Me && !!v.anisotropyMap, me = E && !!v.clearcoatMap, ie = E && !!v.clearcoatNormalMap, ye = E && !!v.clearcoatRoughnessMap, Ae = L && !!v.iridescenceMap, j = L && !!v.iridescenceThicknessMap, ee = q && !!v.sheenColorMap, _e = q && !!v.sheenRoughnessMap, ve = !!v.specularMap, ue = !!v.specularColorMap, Fe = !!v.specularIntensityMap, P = Z && !!v.transmissionMap, re = Z && !!v.thicknessMap, te = !!v.gradientMap, de = !!v.alphaMap, J = v.alphaTest > 0, W = !!v.alphaHash, ge = !!v.extensions;
    let Re = dn;
    v.toneMapped && (ne === null || ne.isXRRenderTarget === !0) && (Re = n.toneMapping);
    const nt = {
      shaderID: $,
      shaderType: v.type,
      shaderName: v.name,
      vertexShader: Ie,
      fragmentShader: rt,
      defines: v.defines,
      customVertexShaderID: it,
      customFragmentShaderID: K,
      isRawShaderMaterial: v.isRawShaderMaterial === !0,
      glslVersion: v.glslVersion,
      precision: u,
      batching: be,
      batchingColor: be && V._colorsTexture !== null,
      instancing: De,
      instancingColor: De && V.instanceColor !== null,
      instancingMorph: De && V.morphTexture !== null,
      outputColorSpace: ne === null ? n.outputColorSpace : ne.isXRRenderTarget === !0 ? ne.texture.colorSpace : tr,
      alphaToCoverage: !!v.alphaToCoverage,
      map: we,
      matcap: _t,
      envMap: Ve,
      envMapMode: Ve && O.mapping,
      envMapCubeUVHeight: Q,
      aoMap: qe,
      lightMap: Qe,
      bumpMap: Ne,
      normalMap: ot,
      displacementMap: w,
      emissiveMap: ut,
      normalMapObjectSpace: ot && v.normalMapType === ch,
      normalMapTangentSpace: ot && v.normalMapType === lh,
      metalnessMap: Xe,
      roughnessMap: tt,
      anisotropy: Me,
      anisotropyMap: X,
      clearcoat: E,
      clearcoatMap: me,
      clearcoatNormalMap: ie,
      clearcoatRoughnessMap: ye,
      dispersion: _,
      iridescence: L,
      iridescenceMap: Ae,
      iridescenceThicknessMap: j,
      sheen: q,
      sheenColorMap: ee,
      sheenRoughnessMap: _e,
      specularMap: ve,
      specularColorMap: ue,
      specularIntensityMap: Fe,
      transmission: Z,
      transmissionMap: P,
      thicknessMap: re,
      gradientMap: te,
      opaque: v.transparent === !1 && v.blending === qi && v.alphaToCoverage === !1,
      alphaMap: de,
      alphaTest: J,
      alphaHash: W,
      combine: v.combine,
      //
      mapUv: we && g(v.map.channel),
      aoMapUv: qe && g(v.aoMap.channel),
      lightMapUv: Qe && g(v.lightMap.channel),
      bumpMapUv: Ne && g(v.bumpMap.channel),
      normalMapUv: ot && g(v.normalMap.channel),
      displacementMapUv: w && g(v.displacementMap.channel),
      emissiveMapUv: ut && g(v.emissiveMap.channel),
      metalnessMapUv: Xe && g(v.metalnessMap.channel),
      roughnessMapUv: tt && g(v.roughnessMap.channel),
      anisotropyMapUv: X && g(v.anisotropyMap.channel),
      clearcoatMapUv: me && g(v.clearcoatMap.channel),
      clearcoatNormalMapUv: ie && g(v.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: ye && g(v.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Ae && g(v.iridescenceMap.channel),
      iridescenceThicknessMapUv: j && g(v.iridescenceThicknessMap.channel),
      sheenColorMapUv: ee && g(v.sheenColorMap.channel),
      sheenRoughnessMapUv: _e && g(v.sheenRoughnessMap.channel),
      specularMapUv: ve && g(v.specularMap.channel),
      specularColorMapUv: ue && g(v.specularColorMap.channel),
      specularIntensityMapUv: Fe && g(v.specularIntensityMap.channel),
      transmissionMapUv: P && g(v.transmissionMap.channel),
      thicknessMapUv: re && g(v.thicknessMap.channel),
      alphaMapUv: de && g(v.alphaMap.channel),
      //
      vertexTangents: !!k.attributes.tangent && (ot || Me),
      vertexColors: v.vertexColors,
      vertexAlphas: v.vertexColors === !0 && !!k.attributes.color && k.attributes.color.itemSize === 4,
      pointsUvs: V.isPoints === !0 && !!k.attributes.uv && (we || de),
      fog: !!z,
      useFog: v.fog === !0,
      fogExp2: !!z && z.isFogExp2,
      flatShading: v.wireframe === !1 && (v.flatShading === !0 || k.attributes.normal === void 0 && ot === !1 && (v.isMeshLambertMaterial || v.isMeshPhongMaterial || v.isMeshStandardMaterial || v.isMeshPhysicalMaterial)),
      sizeAttenuation: v.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      reversedDepthBuffer: se,
      skinning: V.isSkinnedMesh === !0,
      morphTargets: k.morphAttributes.position !== void 0,
      morphNormals: k.morphAttributes.normal !== void 0,
      morphColors: k.morphAttributes.color !== void 0,
      morphTargetsCount: pe,
      morphTextureStride: fe,
      numDirLights: T.directional.length,
      numPointLights: T.point.length,
      numSpotLights: T.spot.length,
      numSpotLightMaps: T.spotLightMap.length,
      numRectAreaLights: T.rectArea.length,
      numHemiLights: T.hemi.length,
      numDirLightShadows: T.directionalShadowMap.length,
      numPointLightShadows: T.pointShadowMap.length,
      numSpotLightShadows: T.spotShadowMap.length,
      numSpotLightShadowsWithMaps: T.numSpotLightShadowsWithMaps,
      numLightProbes: T.numLightProbes,
      numClippingPlanes: s.numPlanes,
      numClipIntersection: s.numIntersection,
      dithering: v.dithering,
      shadowMapEnabled: n.shadowMap.enabled && Y.length > 0,
      shadowMapType: n.shadowMap.type,
      toneMapping: Re,
      decodeVideoTexture: we && v.map.isVideoTexture === !0 && Ge.getTransfer(v.map.colorSpace) === Ke,
      decodeVideoTextureEmissive: ut && v.emissiveMap.isVideoTexture === !0 && Ge.getTransfer(v.emissiveMap.colorSpace) === Ke,
      premultipliedAlpha: v.premultipliedAlpha,
      doubleSided: v.side === Dn,
      flipSided: v.side === It,
      useDepthPacking: v.depthPacking >= 0,
      depthPacking: v.depthPacking || 0,
      index0AttributeName: v.index0AttributeName,
      extensionClipCullDistance: ge && v.extensions.clipCullDistance === !0 && t.has("WEBGL_clip_cull_distance"),
      extensionMultiDraw: (ge && v.extensions.multiDraw === !0 || be) && t.has("WEBGL_multi_draw"),
      rendererExtensionParallelShaderCompile: t.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: v.customProgramCacheKey()
    };
    return nt.vertexUv1s = c.has(1), nt.vertexUv2s = c.has(2), nt.vertexUv3s = c.has(3), c.clear(), nt;
  }
  function p(v) {
    const T = [];
    if (v.shaderID ? T.push(v.shaderID) : (T.push(v.customVertexShaderID), T.push(v.customFragmentShaderID)), v.defines !== void 0)
      for (const Y in v.defines)
        T.push(Y), T.push(v.defines[Y]);
    return v.isRawShaderMaterial === !1 && (h(T, v), S(T, v), T.push(n.outputColorSpace)), T.push(v.customProgramCacheKey), T.join();
  }
  function h(v, T) {
    v.push(T.precision), v.push(T.outputColorSpace), v.push(T.envMapMode), v.push(T.envMapCubeUVHeight), v.push(T.mapUv), v.push(T.alphaMapUv), v.push(T.lightMapUv), v.push(T.aoMapUv), v.push(T.bumpMapUv), v.push(T.normalMapUv), v.push(T.displacementMapUv), v.push(T.emissiveMapUv), v.push(T.metalnessMapUv), v.push(T.roughnessMapUv), v.push(T.anisotropyMapUv), v.push(T.clearcoatMapUv), v.push(T.clearcoatNormalMapUv), v.push(T.clearcoatRoughnessMapUv), v.push(T.iridescenceMapUv), v.push(T.iridescenceThicknessMapUv), v.push(T.sheenColorMapUv), v.push(T.sheenRoughnessMapUv), v.push(T.specularMapUv), v.push(T.specularColorMapUv), v.push(T.specularIntensityMapUv), v.push(T.transmissionMapUv), v.push(T.thicknessMapUv), v.push(T.combine), v.push(T.fogExp2), v.push(T.sizeAttenuation), v.push(T.morphTargetsCount), v.push(T.morphAttributeCount), v.push(T.numDirLights), v.push(T.numPointLights), v.push(T.numSpotLights), v.push(T.numSpotLightMaps), v.push(T.numHemiLights), v.push(T.numRectAreaLights), v.push(T.numDirLightShadows), v.push(T.numPointLightShadows), v.push(T.numSpotLightShadows), v.push(T.numSpotLightShadowsWithMaps), v.push(T.numLightProbes), v.push(T.shadowMapType), v.push(T.toneMapping), v.push(T.numClippingPlanes), v.push(T.numClipIntersection), v.push(T.depthPacking);
  }
  function S(v, T) {
    a.disableAll(), T.instancing && a.enable(0), T.instancingColor && a.enable(1), T.instancingMorph && a.enable(2), T.matcap && a.enable(3), T.envMap && a.enable(4), T.normalMapObjectSpace && a.enable(5), T.normalMapTangentSpace && a.enable(6), T.clearcoat && a.enable(7), T.iridescence && a.enable(8), T.alphaTest && a.enable(9), T.vertexColors && a.enable(10), T.vertexAlphas && a.enable(11), T.vertexUv1s && a.enable(12), T.vertexUv2s && a.enable(13), T.vertexUv3s && a.enable(14), T.vertexTangents && a.enable(15), T.anisotropy && a.enable(16), T.alphaHash && a.enable(17), T.batching && a.enable(18), T.dispersion && a.enable(19), T.batchingColor && a.enable(20), T.gradientMap && a.enable(21), v.push(a.mask), a.disableAll(), T.fog && a.enable(0), T.useFog && a.enable(1), T.flatShading && a.enable(2), T.logarithmicDepthBuffer && a.enable(3), T.reversedDepthBuffer && a.enable(4), T.skinning && a.enable(5), T.morphTargets && a.enable(6), T.morphNormals && a.enable(7), T.morphColors && a.enable(8), T.premultipliedAlpha && a.enable(9), T.shadowMapEnabled && a.enable(10), T.doubleSided && a.enable(11), T.flipSided && a.enable(12), T.useDepthPacking && a.enable(13), T.dithering && a.enable(14), T.transmission && a.enable(15), T.sheen && a.enable(16), T.opaque && a.enable(17), T.pointsUvs && a.enable(18), T.decodeVideoTexture && a.enable(19), T.decodeVideoTextureEmissive && a.enable(20), T.alphaToCoverage && a.enable(21), v.push(a.mask);
  }
  function b(v) {
    const T = m[v.type];
    let Y;
    if (T) {
      const R = ln[T];
      Y = Yh.clone(R.uniforms);
    } else
      Y = v.uniforms;
    return Y;
  }
  function y(v, T) {
    let Y = f.get(T);
    return Y !== void 0 ? ++Y.usedTimes : (Y = new gg(n, T, v, r), l.push(Y), f.set(T, Y)), Y;
  }
  function C(v) {
    if (--v.usedTimes === 0) {
      const T = l.indexOf(v);
      l[T] = l[l.length - 1], l.pop(), f.delete(v.cacheKey), v.destroy();
    }
  }
  function A(v) {
    o.remove(v);
  }
  function D() {
    o.dispose();
  }
  return {
    getParameters: M,
    getProgramCacheKey: p,
    getUniforms: b,
    acquireProgram: y,
    releaseProgram: C,
    releaseShaderCache: A,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: l,
    dispose: D
  };
}
function Eg() {
  let n = /* @__PURE__ */ new WeakMap();
  function e(a) {
    return n.has(a);
  }
  function t(a) {
    let o = n.get(a);
    return o === void 0 && (o = {}, n.set(a, o)), o;
  }
  function i(a) {
    n.delete(a);
  }
  function r(a, o, c) {
    n.get(a)[o] = c;
  }
  function s() {
    n = /* @__PURE__ */ new WeakMap();
  }
  return {
    has: e,
    get: t,
    remove: i,
    update: r,
    dispose: s
  };
}
function Tg(n, e) {
  return n.groupOrder !== e.groupOrder ? n.groupOrder - e.groupOrder : n.renderOrder !== e.renderOrder ? n.renderOrder - e.renderOrder : n.material.id !== e.material.id ? n.material.id - e.material.id : n.materialVariant !== e.materialVariant ? n.materialVariant - e.materialVariant : n.z !== e.z ? n.z - e.z : n.id - e.id;
}
function Vl(n, e) {
  return n.groupOrder !== e.groupOrder ? n.groupOrder - e.groupOrder : n.renderOrder !== e.renderOrder ? n.renderOrder - e.renderOrder : n.z !== e.z ? e.z - n.z : n.id - e.id;
}
function Gl() {
  const n = [];
  let e = 0;
  const t = [], i = [], r = [];
  function s() {
    e = 0, t.length = 0, i.length = 0, r.length = 0;
  }
  function a(u) {
    let m = 0;
    return u.isInstancedMesh && (m += 2), u.isSkinnedMesh && (m += 1), m;
  }
  function o(u, m, g, M, p, h) {
    let S = n[e];
    return S === void 0 ? (S = {
      id: u.id,
      object: u,
      geometry: m,
      material: g,
      materialVariant: a(u),
      groupOrder: M,
      renderOrder: u.renderOrder,
      z: p,
      group: h
    }, n[e] = S) : (S.id = u.id, S.object = u, S.geometry = m, S.material = g, S.materialVariant = a(u), S.groupOrder = M, S.renderOrder = u.renderOrder, S.z = p, S.group = h), e++, S;
  }
  function c(u, m, g, M, p, h) {
    const S = o(u, m, g, M, p, h);
    g.transmission > 0 ? i.push(S) : g.transparent === !0 ? r.push(S) : t.push(S);
  }
  function l(u, m, g, M, p, h) {
    const S = o(u, m, g, M, p, h);
    g.transmission > 0 ? i.unshift(S) : g.transparent === !0 ? r.unshift(S) : t.unshift(S);
  }
  function f(u, m) {
    t.length > 1 && t.sort(u || Tg), i.length > 1 && i.sort(m || Vl), r.length > 1 && r.sort(m || Vl);
  }
  function d() {
    for (let u = e, m = n.length; u < m; u++) {
      const g = n[u];
      if (g.id === null) break;
      g.id = null, g.object = null, g.geometry = null, g.material = null, g.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: i,
    transparent: r,
    init: s,
    push: c,
    unshift: l,
    finish: d,
    sort: f
  };
}
function yg() {
  let n = /* @__PURE__ */ new WeakMap();
  function e(i, r) {
    const s = n.get(i);
    let a;
    return s === void 0 ? (a = new Gl(), n.set(i, [a])) : r >= s.length ? (a = new Gl(), s.push(a)) : a = s[r], a;
  }
  function t() {
    n = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function bg() {
  const n = {};
  return {
    get: function(e) {
      if (n[e.id] !== void 0)
        return n[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new B(),
            color: new Je()
          };
          break;
        case "SpotLight":
          t = {
            position: new B(),
            direction: new B(),
            color: new Je(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new B(),
            color: new Je(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new B(),
            skyColor: new Je(),
            groundColor: new Je()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Je(),
            position: new B(),
            halfWidth: new B(),
            halfHeight: new B()
          };
          break;
      }
      return n[e.id] = t, t;
    }
  };
}
function Ag() {
  const n = {};
  return {
    get: function(e) {
      if (n[e.id] !== void 0)
        return n[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ze()
          };
          break;
        case "SpotLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ze()
          };
          break;
        case "PointLight":
          t = {
            shadowIntensity: 1,
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Ze(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return n[e.id] = t, t;
    }
  };
}
let wg = 0;
function Rg(n, e) {
  return (e.castShadow ? 2 : 0) - (n.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (n.map ? 1 : 0);
}
function Cg(n) {
  const e = new bg(), t = Ag(), i = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let l = 0; l < 9; l++) i.probe.push(new B());
  const r = new B(), s = new ht(), a = new ht();
  function o(l) {
    let f = 0, d = 0, u = 0;
    for (let T = 0; T < 9; T++) i.probe[T].set(0, 0, 0);
    let m = 0, g = 0, M = 0, p = 0, h = 0, S = 0, b = 0, y = 0, C = 0, A = 0, D = 0;
    l.sort(Rg);
    for (let T = 0, Y = l.length; T < Y; T++) {
      const R = l[T], V = R.color, z = R.intensity, k = R.distance;
      let G = null;
      if (R.shadow && R.shadow.map && (R.shadow.map.texture.format === er ? G = R.shadow.map.texture : G = R.shadow.map.depthTexture || R.shadow.map.texture), R.isAmbientLight)
        f += V.r * z, d += V.g * z, u += V.b * z;
      else if (R.isLightProbe) {
        for (let F = 0; F < 9; F++)
          i.probe[F].addScaledVector(R.sh.coefficients[F], z);
        D++;
      } else if (R.isDirectionalLight) {
        const F = e.get(R);
        if (F.color.copy(R.color).multiplyScalar(R.intensity), R.castShadow) {
          const O = R.shadow, Q = t.get(R);
          Q.shadowIntensity = O.intensity, Q.shadowBias = O.bias, Q.shadowNormalBias = O.normalBias, Q.shadowRadius = O.radius, Q.shadowMapSize = O.mapSize, i.directionalShadow[m] = Q, i.directionalShadowMap[m] = G, i.directionalShadowMatrix[m] = R.shadow.matrix, S++;
        }
        i.directional[m] = F, m++;
      } else if (R.isSpotLight) {
        const F = e.get(R);
        F.position.setFromMatrixPosition(R.matrixWorld), F.color.copy(V).multiplyScalar(z), F.distance = k, F.coneCos = Math.cos(R.angle), F.penumbraCos = Math.cos(R.angle * (1 - R.penumbra)), F.decay = R.decay, i.spot[M] = F;
        const O = R.shadow;
        if (R.map && (i.spotLightMap[C] = R.map, C++, O.updateMatrices(R), R.castShadow && A++), i.spotLightMatrix[M] = O.matrix, R.castShadow) {
          const Q = t.get(R);
          Q.shadowIntensity = O.intensity, Q.shadowBias = O.bias, Q.shadowNormalBias = O.normalBias, Q.shadowRadius = O.radius, Q.shadowMapSize = O.mapSize, i.spotShadow[M] = Q, i.spotShadowMap[M] = G, y++;
        }
        M++;
      } else if (R.isRectAreaLight) {
        const F = e.get(R);
        F.color.copy(V).multiplyScalar(z), F.halfWidth.set(R.width * 0.5, 0, 0), F.halfHeight.set(0, R.height * 0.5, 0), i.rectArea[p] = F, p++;
      } else if (R.isPointLight) {
        const F = e.get(R);
        if (F.color.copy(R.color).multiplyScalar(R.intensity), F.distance = R.distance, F.decay = R.decay, R.castShadow) {
          const O = R.shadow, Q = t.get(R);
          Q.shadowIntensity = O.intensity, Q.shadowBias = O.bias, Q.shadowNormalBias = O.normalBias, Q.shadowRadius = O.radius, Q.shadowMapSize = O.mapSize, Q.shadowCameraNear = O.camera.near, Q.shadowCameraFar = O.camera.far, i.pointShadow[g] = Q, i.pointShadowMap[g] = G, i.pointShadowMatrix[g] = R.shadow.matrix, b++;
        }
        i.point[g] = F, g++;
      } else if (R.isHemisphereLight) {
        const F = e.get(R);
        F.skyColor.copy(R.color).multiplyScalar(z), F.groundColor.copy(R.groundColor).multiplyScalar(z), i.hemi[h] = F, h++;
      }
    }
    p > 0 && (n.has("OES_texture_float_linear") === !0 ? (i.rectAreaLTC1 = ae.LTC_FLOAT_1, i.rectAreaLTC2 = ae.LTC_FLOAT_2) : (i.rectAreaLTC1 = ae.LTC_HALF_1, i.rectAreaLTC2 = ae.LTC_HALF_2)), i.ambient[0] = f, i.ambient[1] = d, i.ambient[2] = u;
    const v = i.hash;
    (v.directionalLength !== m || v.pointLength !== g || v.spotLength !== M || v.rectAreaLength !== p || v.hemiLength !== h || v.numDirectionalShadows !== S || v.numPointShadows !== b || v.numSpotShadows !== y || v.numSpotMaps !== C || v.numLightProbes !== D) && (i.directional.length = m, i.spot.length = M, i.rectArea.length = p, i.point.length = g, i.hemi.length = h, i.directionalShadow.length = S, i.directionalShadowMap.length = S, i.pointShadow.length = b, i.pointShadowMap.length = b, i.spotShadow.length = y, i.spotShadowMap.length = y, i.directionalShadowMatrix.length = S, i.pointShadowMatrix.length = b, i.spotLightMatrix.length = y + C - A, i.spotLightMap.length = C, i.numSpotLightShadowsWithMaps = A, i.numLightProbes = D, v.directionalLength = m, v.pointLength = g, v.spotLength = M, v.rectAreaLength = p, v.hemiLength = h, v.numDirectionalShadows = S, v.numPointShadows = b, v.numSpotShadows = y, v.numSpotMaps = C, v.numLightProbes = D, i.version = wg++);
  }
  function c(l, f) {
    let d = 0, u = 0, m = 0, g = 0, M = 0;
    const p = f.matrixWorldInverse;
    for (let h = 0, S = l.length; h < S; h++) {
      const b = l[h];
      if (b.isDirectionalLight) {
        const y = i.directional[d];
        y.direction.setFromMatrixPosition(b.matrixWorld), r.setFromMatrixPosition(b.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(p), d++;
      } else if (b.isSpotLight) {
        const y = i.spot[m];
        y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(p), y.direction.setFromMatrixPosition(b.matrixWorld), r.setFromMatrixPosition(b.target.matrixWorld), y.direction.sub(r), y.direction.transformDirection(p), m++;
      } else if (b.isRectAreaLight) {
        const y = i.rectArea[g];
        y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(p), a.identity(), s.copy(b.matrixWorld), s.premultiply(p), a.extractRotation(s), y.halfWidth.set(b.width * 0.5, 0, 0), y.halfHeight.set(0, b.height * 0.5, 0), y.halfWidth.applyMatrix4(a), y.halfHeight.applyMatrix4(a), g++;
      } else if (b.isPointLight) {
        const y = i.point[u];
        y.position.setFromMatrixPosition(b.matrixWorld), y.position.applyMatrix4(p), u++;
      } else if (b.isHemisphereLight) {
        const y = i.hemi[M];
        y.direction.setFromMatrixPosition(b.matrixWorld), y.direction.transformDirection(p), M++;
      }
    }
  }
  return {
    setup: o,
    setupView: c,
    state: i
  };
}
function Hl(n) {
  const e = new Cg(n), t = [], i = [];
  function r(f) {
    l.camera = f, t.length = 0, i.length = 0;
  }
  function s(f) {
    t.push(f);
  }
  function a(f) {
    i.push(f);
  }
  function o() {
    e.setup(t);
  }
  function c(f) {
    e.setupView(t, f);
  }
  const l = {
    lightsArray: t,
    shadowsArray: i,
    camera: null,
    lights: e,
    transmissionRenderTarget: {}
  };
  return {
    init: r,
    state: l,
    setupLights: o,
    setupLightsView: c,
    pushLight: s,
    pushShadow: a
  };
}
function Pg(n) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(r, s = 0) {
    const a = e.get(r);
    let o;
    return a === void 0 ? (o = new Hl(n), e.set(r, [o])) : s >= a.length ? (o = new Hl(n), a.push(o)) : o = a[s], o;
  }
  function i() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: t,
    dispose: i
  };
}
const Dg = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Lg = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`, Ig = [
  /* @__PURE__ */ new B(1, 0, 0),
  /* @__PURE__ */ new B(-1, 0, 0),
  /* @__PURE__ */ new B(0, 1, 0),
  /* @__PURE__ */ new B(0, -1, 0),
  /* @__PURE__ */ new B(0, 0, 1),
  /* @__PURE__ */ new B(0, 0, -1)
], Ug = [
  /* @__PURE__ */ new B(0, -1, 0),
  /* @__PURE__ */ new B(0, -1, 0),
  /* @__PURE__ */ new B(0, 0, 1),
  /* @__PURE__ */ new B(0, 0, -1),
  /* @__PURE__ */ new B(0, -1, 0),
  /* @__PURE__ */ new B(0, -1, 0)
], kl = /* @__PURE__ */ new ht(), dr = /* @__PURE__ */ new B(), oa = /* @__PURE__ */ new B();
function Ng(n, e, t) {
  let i = new Qc();
  const r = new Ze(), s = new Ze(), a = new ct(), o = new jh(), c = new Jh(), l = {}, f = t.maxTextureSize, d = { [ii]: It, [It]: ii, [Dn]: Dn }, u = new rn({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new Ze() },
      radius: { value: 4 }
    },
    vertexShader: Dg,
    fragmentShader: Lg
  }), m = u.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const g = new Gn();
  g.setAttribute(
    "position",
    new mn(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const M = new xn(g, u), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = os;
  let h = this.type;
  this.render = function(A, D, v) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || A.length === 0) return;
    this.type === zf && (Ce("WebGLShadowMap: PCFSoftShadowMap has been deprecated. Using PCFShadowMap instead."), this.type = os);
    const T = n.getRenderTarget(), Y = n.getActiveCubeFace(), R = n.getActiveMipmapLevel(), V = n.state;
    V.setBlending(In), V.buffers.depth.getReversed() === !0 ? V.buffers.color.setClear(0, 0, 0, 0) : V.buffers.color.setClear(1, 1, 1, 1), V.buffers.depth.setTest(!0), V.setScissorTest(!1);
    const z = h !== this.type;
    z && D.traverse(function(k) {
      k.material && (Array.isArray(k.material) ? k.material.forEach((G) => G.needsUpdate = !0) : k.material.needsUpdate = !0);
    });
    for (let k = 0, G = A.length; k < G; k++) {
      const F = A[k], O = F.shadow;
      if (O === void 0) {
        Ce("WebGLShadowMap:", F, "has no shadow.");
        continue;
      }
      if (O.autoUpdate === !1 && O.needsUpdate === !1) continue;
      r.copy(O.mapSize);
      const Q = O.getFrameExtents();
      r.multiply(Q), s.copy(O.mapSize), (r.x > f || r.y > f) && (r.x > f && (s.x = Math.floor(f / Q.x), r.x = s.x * Q.x, O.mapSize.x = s.x), r.y > f && (s.y = Math.floor(f / Q.y), r.y = s.y * Q.y, O.mapSize.y = s.y));
      const $ = n.state.buffers.depth.getReversed();
      if (O.camera._reversedDepth = $, O.map === null || z === !0) {
        if (O.map !== null && (O.map.depthTexture !== null && (O.map.depthTexture.dispose(), O.map.depthTexture = null), O.map.dispose()), this.type === _r) {
          if (F.isPointLight) {
            Ce("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");
            continue;
          }
          O.map = new pn(r.x, r.y, {
            format: er,
            type: On,
            minFilter: Rt,
            magFilter: Rt,
            generateMipmaps: !1
          }), O.map.texture.name = F.name + ".shadowMap", O.map.depthTexture = new Tr(r.x, r.y, cn), O.map.depthTexture.name = F.name + ".shadowMapDepth", O.map.depthTexture.format = Bn, O.map.depthTexture.compareFunction = null, O.map.depthTexture.minFilter = yt, O.map.depthTexture.magFilter = yt;
        } else
          F.isPointLight ? (O.map = new su(r.x), O.map.depthTexture = new Xh(r.x, vn)) : (O.map = new pn(r.x, r.y), O.map.depthTexture = new Tr(r.x, r.y, vn)), O.map.depthTexture.name = F.name + ".shadowMap", O.map.depthTexture.format = Bn, this.type === os ? (O.map.depthTexture.compareFunction = $ ? yo : To, O.map.depthTexture.minFilter = Rt, O.map.depthTexture.magFilter = Rt) : (O.map.depthTexture.compareFunction = null, O.map.depthTexture.minFilter = yt, O.map.depthTexture.magFilter = yt);
        O.camera.updateProjectionMatrix();
      }
      const ce = O.map.isWebGLCubeRenderTarget ? 6 : 1;
      for (let pe = 0; pe < ce; pe++) {
        if (O.map.isWebGLCubeRenderTarget)
          n.setRenderTarget(O.map, pe), n.clear();
        else {
          pe === 0 && (n.setRenderTarget(O.map), n.clear());
          const fe = O.getViewport(pe);
          a.set(
            s.x * fe.x,
            s.y * fe.y,
            s.x * fe.z,
            s.y * fe.w
          ), V.viewport(a);
        }
        if (F.isPointLight) {
          const fe = O.camera, Ie = O.matrix, rt = F.distance || fe.far;
          rt !== fe.far && (fe.far = rt, fe.updateProjectionMatrix()), dr.setFromMatrixPosition(F.matrixWorld), fe.position.copy(dr), oa.copy(fe.position), oa.add(Ig[pe]), fe.up.copy(Ug[pe]), fe.lookAt(oa), fe.updateMatrixWorld(), Ie.makeTranslation(-dr.x, -dr.y, -dr.z), kl.multiplyMatrices(fe.projectionMatrix, fe.matrixWorldInverse), O._frustum.setFromProjectionMatrix(kl, fe.coordinateSystem, fe.reversedDepth);
        } else
          O.updateMatrices(F);
        i = O.getFrustum(), y(D, v, O.camera, F, this.type);
      }
      O.isPointLightShadow !== !0 && this.type === _r && S(O, v), O.needsUpdate = !1;
    }
    h = this.type, p.needsUpdate = !1, n.setRenderTarget(T, Y, R);
  };
  function S(A, D) {
    const v = e.update(M);
    u.defines.VSM_SAMPLES !== A.blurSamples && (u.defines.VSM_SAMPLES = A.blurSamples, m.defines.VSM_SAMPLES = A.blurSamples, u.needsUpdate = !0, m.needsUpdate = !0), A.mapPass === null && (A.mapPass = new pn(r.x, r.y, {
      format: er,
      type: On
    })), u.uniforms.shadow_pass.value = A.map.depthTexture, u.uniforms.resolution.value = A.mapSize, u.uniforms.radius.value = A.radius, n.setRenderTarget(A.mapPass), n.clear(), n.renderBufferDirect(D, null, v, u, M, null), m.uniforms.shadow_pass.value = A.mapPass.texture, m.uniforms.resolution.value = A.mapSize, m.uniforms.radius.value = A.radius, n.setRenderTarget(A.map), n.clear(), n.renderBufferDirect(D, null, v, m, M, null);
  }
  function b(A, D, v, T) {
    let Y = null;
    const R = v.isPointLight === !0 ? A.customDistanceMaterial : A.customDepthMaterial;
    if (R !== void 0)
      Y = R;
    else if (Y = v.isPointLight === !0 ? c : o, n.localClippingEnabled && D.clipShadows === !0 && Array.isArray(D.clippingPlanes) && D.clippingPlanes.length !== 0 || D.displacementMap && D.displacementScale !== 0 || D.alphaMap && D.alphaTest > 0 || D.map && D.alphaTest > 0 || D.alphaToCoverage === !0) {
      const V = Y.uuid, z = D.uuid;
      let k = l[V];
      k === void 0 && (k = {}, l[V] = k);
      let G = k[z];
      G === void 0 && (G = Y.clone(), k[z] = G, D.addEventListener("dispose", C)), Y = G;
    }
    if (Y.visible = D.visible, Y.wireframe = D.wireframe, T === _r ? Y.side = D.shadowSide !== null ? D.shadowSide : D.side : Y.side = D.shadowSide !== null ? D.shadowSide : d[D.side], Y.alphaMap = D.alphaMap, Y.alphaTest = D.alphaToCoverage === !0 ? 0.5 : D.alphaTest, Y.map = D.map, Y.clipShadows = D.clipShadows, Y.clippingPlanes = D.clippingPlanes, Y.clipIntersection = D.clipIntersection, Y.displacementMap = D.displacementMap, Y.displacementScale = D.displacementScale, Y.displacementBias = D.displacementBias, Y.wireframeLinewidth = D.wireframeLinewidth, Y.linewidth = D.linewidth, v.isPointLight === !0 && Y.isMeshDistanceMaterial === !0) {
      const V = n.properties.get(Y);
      V.light = v;
    }
    return Y;
  }
  function y(A, D, v, T, Y) {
    if (A.visible === !1) return;
    if (A.layers.test(D.layers) && (A.isMesh || A.isLine || A.isPoints) && (A.castShadow || A.receiveShadow && Y === _r) && (!A.frustumCulled || i.intersectsObject(A))) {
      A.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse, A.matrixWorld);
      const z = e.update(A), k = A.material;
      if (Array.isArray(k)) {
        const G = z.groups;
        for (let F = 0, O = G.length; F < O; F++) {
          const Q = G[F], $ = k[Q.materialIndex];
          if ($ && $.visible) {
            const ce = b(A, $, T, Y);
            A.onBeforeShadow(n, A, D, v, z, ce, Q), n.renderBufferDirect(v, null, z, ce, A, Q), A.onAfterShadow(n, A, D, v, z, ce, Q);
          }
        }
      } else if (k.visible) {
        const G = b(A, k, T, Y);
        A.onBeforeShadow(n, A, D, v, z, G, null), n.renderBufferDirect(v, null, z, G, A, null), A.onAfterShadow(n, A, D, v, z, G, null);
      }
    }
    const V = A.children;
    for (let z = 0, k = V.length; z < k; z++)
      y(V[z], D, v, T, Y);
  }
  function C(A) {
    A.target.removeEventListener("dispose", C);
    for (const v in l) {
      const T = l[v], Y = A.target.uuid;
      Y in T && (T[Y].dispose(), delete T[Y]);
    }
  }
}
function Fg(n, e) {
  function t() {
    let P = !1;
    const re = new ct();
    let te = null;
    const de = new ct(0, 0, 0, 0);
    return {
      setMask: function(J) {
        te !== J && !P && (n.colorMask(J, J, J, J), te = J);
      },
      setLocked: function(J) {
        P = J;
      },
      setClear: function(J, W, ge, Re, nt) {
        nt === !0 && (J *= Re, W *= Re, ge *= Re), re.set(J, W, ge, Re), de.equals(re) === !1 && (n.clearColor(J, W, ge, Re), de.copy(re));
      },
      reset: function() {
        P = !1, te = null, de.set(-1, 0, 0, 0);
      }
    };
  }
  function i() {
    let P = !1, re = !1, te = null, de = null, J = null;
    return {
      setReversed: function(W) {
        if (re !== W) {
          const ge = e.get("EXT_clip_control");
          W ? ge.clipControlEXT(ge.LOWER_LEFT_EXT, ge.ZERO_TO_ONE_EXT) : ge.clipControlEXT(ge.LOWER_LEFT_EXT, ge.NEGATIVE_ONE_TO_ONE_EXT), re = W;
          const Re = J;
          J = null, this.setClear(Re);
        }
      },
      getReversed: function() {
        return re;
      },
      setTest: function(W) {
        W ? ne(n.DEPTH_TEST) : se(n.DEPTH_TEST);
      },
      setMask: function(W) {
        te !== W && !P && (n.depthMask(W), te = W);
      },
      setFunc: function(W) {
        if (re && (W = xh[W]), de !== W) {
          switch (W) {
            case ga:
              n.depthFunc(n.NEVER);
              break;
            case va:
              n.depthFunc(n.ALWAYS);
              break;
            case xa:
              n.depthFunc(n.LESS);
              break;
            case Ji:
              n.depthFunc(n.LEQUAL);
              break;
            case Ma:
              n.depthFunc(n.EQUAL);
              break;
            case Sa:
              n.depthFunc(n.GEQUAL);
              break;
            case Ea:
              n.depthFunc(n.GREATER);
              break;
            case Ta:
              n.depthFunc(n.NOTEQUAL);
              break;
            default:
              n.depthFunc(n.LEQUAL);
          }
          de = W;
        }
      },
      setLocked: function(W) {
        P = W;
      },
      setClear: function(W) {
        J !== W && (J = W, re && (W = 1 - W), n.clearDepth(W));
      },
      reset: function() {
        P = !1, te = null, de = null, J = null, re = !1;
      }
    };
  }
  function r() {
    let P = !1, re = null, te = null, de = null, J = null, W = null, ge = null, Re = null, nt = null;
    return {
      setTest: function(Ye) {
        P || (Ye ? ne(n.STENCIL_TEST) : se(n.STENCIL_TEST));
      },
      setMask: function(Ye) {
        re !== Ye && !P && (n.stencilMask(Ye), re = Ye);
      },
      setFunc: function(Ye, Mn, Sn) {
        (te !== Ye || de !== Mn || J !== Sn) && (n.stencilFunc(Ye, Mn, Sn), te = Ye, de = Mn, J = Sn);
      },
      setOp: function(Ye, Mn, Sn) {
        (W !== Ye || ge !== Mn || Re !== Sn) && (n.stencilOp(Ye, Mn, Sn), W = Ye, ge = Mn, Re = Sn);
      },
      setLocked: function(Ye) {
        P = Ye;
      },
      setClear: function(Ye) {
        nt !== Ye && (n.clearStencil(Ye), nt = Ye);
      },
      reset: function() {
        P = !1, re = null, te = null, de = null, J = null, W = null, ge = null, Re = null, nt = null;
      }
    };
  }
  const s = new t(), a = new i(), o = new r(), c = /* @__PURE__ */ new WeakMap(), l = /* @__PURE__ */ new WeakMap();
  let f = {}, d = {}, u = /* @__PURE__ */ new WeakMap(), m = [], g = null, M = !1, p = null, h = null, S = null, b = null, y = null, C = null, A = null, D = new Je(0, 0, 0), v = 0, T = !1, Y = null, R = null, V = null, z = null, k = null;
  const G = n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let F = !1, O = 0;
  const Q = n.getParameter(n.VERSION);
  Q.indexOf("WebGL") !== -1 ? (O = parseFloat(/^WebGL (\d)/.exec(Q)[1]), F = O >= 1) : Q.indexOf("OpenGL ES") !== -1 && (O = parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]), F = O >= 2);
  let $ = null, ce = {};
  const pe = n.getParameter(n.SCISSOR_BOX), fe = n.getParameter(n.VIEWPORT), Ie = new ct().fromArray(pe), rt = new ct().fromArray(fe);
  function it(P, re, te, de) {
    const J = new Uint8Array(4), W = n.createTexture();
    n.bindTexture(P, W), n.texParameteri(P, n.TEXTURE_MIN_FILTER, n.NEAREST), n.texParameteri(P, n.TEXTURE_MAG_FILTER, n.NEAREST);
    for (let ge = 0; ge < te; ge++)
      P === n.TEXTURE_3D || P === n.TEXTURE_2D_ARRAY ? n.texImage3D(re, 0, n.RGBA, 1, 1, de, 0, n.RGBA, n.UNSIGNED_BYTE, J) : n.texImage2D(re + ge, 0, n.RGBA, 1, 1, 0, n.RGBA, n.UNSIGNED_BYTE, J);
    return W;
  }
  const K = {};
  K[n.TEXTURE_2D] = it(n.TEXTURE_2D, n.TEXTURE_2D, 1), K[n.TEXTURE_CUBE_MAP] = it(n.TEXTURE_CUBE_MAP, n.TEXTURE_CUBE_MAP_POSITIVE_X, 6), K[n.TEXTURE_2D_ARRAY] = it(n.TEXTURE_2D_ARRAY, n.TEXTURE_2D_ARRAY, 1, 1), K[n.TEXTURE_3D] = it(n.TEXTURE_3D, n.TEXTURE_3D, 1, 1), s.setClear(0, 0, 0, 1), a.setClear(1), o.setClear(0), ne(n.DEPTH_TEST), a.setFunc(Ji), Ne(!1), ot(Zo), ne(n.CULL_FACE), qe(In);
  function ne(P) {
    f[P] !== !0 && (n.enable(P), f[P] = !0);
  }
  function se(P) {
    f[P] !== !1 && (n.disable(P), f[P] = !1);
  }
  function De(P, re) {
    return d[P] !== re ? (n.bindFramebuffer(P, re), d[P] = re, P === n.DRAW_FRAMEBUFFER && (d[n.FRAMEBUFFER] = re), P === n.FRAMEBUFFER && (d[n.DRAW_FRAMEBUFFER] = re), !0) : !1;
  }
  function be(P, re) {
    let te = m, de = !1;
    if (P) {
      te = u.get(re), te === void 0 && (te = [], u.set(re, te));
      const J = P.textures;
      if (te.length !== J.length || te[0] !== n.COLOR_ATTACHMENT0) {
        for (let W = 0, ge = J.length; W < ge; W++)
          te[W] = n.COLOR_ATTACHMENT0 + W;
        te.length = J.length, de = !0;
      }
    } else
      te[0] !== n.BACK && (te[0] = n.BACK, de = !0);
    de && n.drawBuffers(te);
  }
  function we(P) {
    return g !== P ? (n.useProgram(P), g = P, !0) : !1;
  }
  const _t = {
    [mi]: n.FUNC_ADD,
    [Gf]: n.FUNC_SUBTRACT,
    [Hf]: n.FUNC_REVERSE_SUBTRACT
  };
  _t[kf] = n.MIN, _t[Wf] = n.MAX;
  const Ve = {
    [Xf]: n.ZERO,
    [qf]: n.ONE,
    [Yf]: n.SRC_COLOR,
    [ma]: n.SRC_ALPHA,
    [Qf]: n.SRC_ALPHA_SATURATE,
    [jf]: n.DST_COLOR,
    [Zf]: n.DST_ALPHA,
    [Kf]: n.ONE_MINUS_SRC_COLOR,
    [_a]: n.ONE_MINUS_SRC_ALPHA,
    [Jf]: n.ONE_MINUS_DST_COLOR,
    [$f]: n.ONE_MINUS_DST_ALPHA,
    [eh]: n.CONSTANT_COLOR,
    [th]: n.ONE_MINUS_CONSTANT_COLOR,
    [nh]: n.CONSTANT_ALPHA,
    [ih]: n.ONE_MINUS_CONSTANT_ALPHA
  };
  function qe(P, re, te, de, J, W, ge, Re, nt, Ye) {
    if (P === In) {
      M === !0 && (se(n.BLEND), M = !1);
      return;
    }
    if (M === !1 && (ne(n.BLEND), M = !0), P !== Vf) {
      if (P !== p || Ye !== T) {
        if ((h !== mi || y !== mi) && (n.blendEquation(n.FUNC_ADD), h = mi, y = mi), Ye)
          switch (P) {
            case qi:
              n.blendFuncSeparate(n.ONE, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case $o:
              n.blendFunc(n.ONE, n.ONE);
              break;
            case jo:
              n.blendFuncSeparate(n.ZERO, n.ONE_MINUS_SRC_COLOR, n.ZERO, n.ONE);
              break;
            case Jo:
              n.blendFuncSeparate(n.DST_COLOR, n.ONE_MINUS_SRC_ALPHA, n.ZERO, n.ONE);
              break;
            default:
              We("WebGLState: Invalid blending: ", P);
              break;
          }
        else
          switch (P) {
            case qi:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE_MINUS_SRC_ALPHA, n.ONE, n.ONE_MINUS_SRC_ALPHA);
              break;
            case $o:
              n.blendFuncSeparate(n.SRC_ALPHA, n.ONE, n.ONE, n.ONE);
              break;
            case jo:
              We("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");
              break;
            case Jo:
              We("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");
              break;
            default:
              We("WebGLState: Invalid blending: ", P);
              break;
          }
        S = null, b = null, C = null, A = null, D.set(0, 0, 0), v = 0, p = P, T = Ye;
      }
      return;
    }
    J = J || re, W = W || te, ge = ge || de, (re !== h || J !== y) && (n.blendEquationSeparate(_t[re], _t[J]), h = re, y = J), (te !== S || de !== b || W !== C || ge !== A) && (n.blendFuncSeparate(Ve[te], Ve[de], Ve[W], Ve[ge]), S = te, b = de, C = W, A = ge), (Re.equals(D) === !1 || nt !== v) && (n.blendColor(Re.r, Re.g, Re.b, nt), D.copy(Re), v = nt), p = P, T = !1;
  }
  function Qe(P, re) {
    P.side === Dn ? se(n.CULL_FACE) : ne(n.CULL_FACE);
    let te = P.side === It;
    re && (te = !te), Ne(te), P.blending === qi && P.transparent === !1 ? qe(In) : qe(P.blending, P.blendEquation, P.blendSrc, P.blendDst, P.blendEquationAlpha, P.blendSrcAlpha, P.blendDstAlpha, P.blendColor, P.blendAlpha, P.premultipliedAlpha), a.setFunc(P.depthFunc), a.setTest(P.depthTest), a.setMask(P.depthWrite), s.setMask(P.colorWrite);
    const de = P.stencilWrite;
    o.setTest(de), de && (o.setMask(P.stencilWriteMask), o.setFunc(P.stencilFunc, P.stencilRef, P.stencilFuncMask), o.setOp(P.stencilFail, P.stencilZFail, P.stencilZPass)), ut(P.polygonOffset, P.polygonOffsetFactor, P.polygonOffsetUnits), P.alphaToCoverage === !0 ? ne(n.SAMPLE_ALPHA_TO_COVERAGE) : se(n.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Ne(P) {
    Y !== P && (P ? n.frontFace(n.CW) : n.frontFace(n.CCW), Y = P);
  }
  function ot(P) {
    P !== Of ? (ne(n.CULL_FACE), P !== R && (P === Zo ? n.cullFace(n.BACK) : P === Bf ? n.cullFace(n.FRONT) : n.cullFace(n.FRONT_AND_BACK))) : se(n.CULL_FACE), R = P;
  }
  function w(P) {
    P !== V && (F && n.lineWidth(P), V = P);
  }
  function ut(P, re, te) {
    P ? (ne(n.POLYGON_OFFSET_FILL), (z !== re || k !== te) && (z = re, k = te, a.getReversed() && (re = -re), n.polygonOffset(re, te))) : se(n.POLYGON_OFFSET_FILL);
  }
  function Xe(P) {
    P ? ne(n.SCISSOR_TEST) : se(n.SCISSOR_TEST);
  }
  function tt(P) {
    P === void 0 && (P = n.TEXTURE0 + G - 1), $ !== P && (n.activeTexture(P), $ = P);
  }
  function Me(P, re, te) {
    te === void 0 && ($ === null ? te = n.TEXTURE0 + G - 1 : te = $);
    let de = ce[te];
    de === void 0 && (de = { type: void 0, texture: void 0 }, ce[te] = de), (de.type !== P || de.texture !== re) && ($ !== te && (n.activeTexture(te), $ = te), n.bindTexture(P, re || K[P]), de.type = P, de.texture = re);
  }
  function E() {
    const P = ce[$];
    P !== void 0 && P.type !== void 0 && (n.bindTexture(P.type, null), P.type = void 0, P.texture = void 0);
  }
  function _() {
    try {
      n.compressedTexImage2D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function L() {
    try {
      n.compressedTexImage3D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function q() {
    try {
      n.texSubImage2D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function Z() {
    try {
      n.texSubImage3D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function X() {
    try {
      n.compressedTexSubImage2D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function me() {
    try {
      n.compressedTexSubImage3D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function ie() {
    try {
      n.texStorage2D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function ye() {
    try {
      n.texStorage3D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function Ae() {
    try {
      n.texImage2D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function j() {
    try {
      n.texImage3D(...arguments);
    } catch (P) {
      We("WebGLState:", P);
    }
  }
  function ee(P) {
    Ie.equals(P) === !1 && (n.scissor(P.x, P.y, P.z, P.w), Ie.copy(P));
  }
  function _e(P) {
    rt.equals(P) === !1 && (n.viewport(P.x, P.y, P.z, P.w), rt.copy(P));
  }
  function ve(P, re) {
    let te = l.get(re);
    te === void 0 && (te = /* @__PURE__ */ new WeakMap(), l.set(re, te));
    let de = te.get(P);
    de === void 0 && (de = n.getUniformBlockIndex(re, P.name), te.set(P, de));
  }
  function ue(P, re) {
    const de = l.get(re).get(P);
    c.get(re) !== de && (n.uniformBlockBinding(re, de, P.__bindingPointIndex), c.set(re, de));
  }
  function Fe() {
    n.disable(n.BLEND), n.disable(n.CULL_FACE), n.disable(n.DEPTH_TEST), n.disable(n.POLYGON_OFFSET_FILL), n.disable(n.SCISSOR_TEST), n.disable(n.STENCIL_TEST), n.disable(n.SAMPLE_ALPHA_TO_COVERAGE), n.blendEquation(n.FUNC_ADD), n.blendFunc(n.ONE, n.ZERO), n.blendFuncSeparate(n.ONE, n.ZERO, n.ONE, n.ZERO), n.blendColor(0, 0, 0, 0), n.colorMask(!0, !0, !0, !0), n.clearColor(0, 0, 0, 0), n.depthMask(!0), n.depthFunc(n.LESS), a.setReversed(!1), n.clearDepth(1), n.stencilMask(4294967295), n.stencilFunc(n.ALWAYS, 0, 4294967295), n.stencilOp(n.KEEP, n.KEEP, n.KEEP), n.clearStencil(0), n.cullFace(n.BACK), n.frontFace(n.CCW), n.polygonOffset(0, 0), n.activeTexture(n.TEXTURE0), n.bindFramebuffer(n.FRAMEBUFFER, null), n.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), n.bindFramebuffer(n.READ_FRAMEBUFFER, null), n.useProgram(null), n.lineWidth(1), n.scissor(0, 0, n.canvas.width, n.canvas.height), n.viewport(0, 0, n.canvas.width, n.canvas.height), f = {}, $ = null, ce = {}, d = {}, u = /* @__PURE__ */ new WeakMap(), m = [], g = null, M = !1, p = null, h = null, S = null, b = null, y = null, C = null, A = null, D = new Je(0, 0, 0), v = 0, T = !1, Y = null, R = null, V = null, z = null, k = null, Ie.set(0, 0, n.canvas.width, n.canvas.height), rt.set(0, 0, n.canvas.width, n.canvas.height), s.reset(), a.reset(), o.reset();
  }
  return {
    buffers: {
      color: s,
      depth: a,
      stencil: o
    },
    enable: ne,
    disable: se,
    bindFramebuffer: De,
    drawBuffers: be,
    useProgram: we,
    setBlending: qe,
    setMaterial: Qe,
    setFlipSided: Ne,
    setCullFace: ot,
    setLineWidth: w,
    setPolygonOffset: ut,
    setScissorTest: Xe,
    activeTexture: tt,
    bindTexture: Me,
    unbindTexture: E,
    compressedTexImage2D: _,
    compressedTexImage3D: L,
    texImage2D: Ae,
    texImage3D: j,
    updateUBOMapping: ve,
    uniformBlockBinding: ue,
    texStorage2D: ie,
    texStorage3D: ye,
    texSubImage2D: q,
    texSubImage3D: Z,
    compressedTexSubImage2D: X,
    compressedTexSubImage3D: me,
    scissor: ee,
    viewport: _e,
    reset: Fe
  };
}
function Og(n, e, t, i, r, s, a) {
  const o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), l = new Ze(), f = /* @__PURE__ */ new WeakMap();
  let d;
  const u = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(E, _) {
    return m ? new OffscreenCanvas(E, _) : vs("canvas");
  }
  function M(E, _, L) {
    let q = 1;
    const Z = Me(E);
    if ((Z.width > L || Z.height > L) && (q = L / Math.max(Z.width, Z.height)), q < 1)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap || typeof VideoFrame < "u" && E instanceof VideoFrame) {
        const X = Math.floor(q * Z.width), me = Math.floor(q * Z.height);
        d === void 0 && (d = g(X, me));
        const ie = _ ? g(X, me) : d;
        return ie.width = X, ie.height = me, ie.getContext("2d").drawImage(E, 0, 0, X, me), Ce("WebGLRenderer: Texture has been resized from (" + Z.width + "x" + Z.height + ") to (" + X + "x" + me + ")."), ie;
      } else
        return "data" in E && Ce("WebGLRenderer: Image in DataTexture is too big (" + Z.width + "x" + Z.height + ")."), E;
    return E;
  }
  function p(E) {
    return E.generateMipmaps;
  }
  function h(E) {
    n.generateMipmap(E);
  }
  function S(E) {
    return E.isWebGLCubeRenderTarget ? n.TEXTURE_CUBE_MAP : E.isWebGL3DRenderTarget ? n.TEXTURE_3D : E.isWebGLArrayRenderTarget || E.isCompressedArrayTexture ? n.TEXTURE_2D_ARRAY : n.TEXTURE_2D;
  }
  function b(E, _, L, q, Z = !1) {
    if (E !== null) {
      if (n[E] !== void 0) return n[E];
      Ce("WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let X = _;
    if (_ === n.RED && (L === n.FLOAT && (X = n.R32F), L === n.HALF_FLOAT && (X = n.R16F), L === n.UNSIGNED_BYTE && (X = n.R8)), _ === n.RED_INTEGER && (L === n.UNSIGNED_BYTE && (X = n.R8UI), L === n.UNSIGNED_SHORT && (X = n.R16UI), L === n.UNSIGNED_INT && (X = n.R32UI), L === n.BYTE && (X = n.R8I), L === n.SHORT && (X = n.R16I), L === n.INT && (X = n.R32I)), _ === n.RG && (L === n.FLOAT && (X = n.RG32F), L === n.HALF_FLOAT && (X = n.RG16F), L === n.UNSIGNED_BYTE && (X = n.RG8)), _ === n.RG_INTEGER && (L === n.UNSIGNED_BYTE && (X = n.RG8UI), L === n.UNSIGNED_SHORT && (X = n.RG16UI), L === n.UNSIGNED_INT && (X = n.RG32UI), L === n.BYTE && (X = n.RG8I), L === n.SHORT && (X = n.RG16I), L === n.INT && (X = n.RG32I)), _ === n.RGB_INTEGER && (L === n.UNSIGNED_BYTE && (X = n.RGB8UI), L === n.UNSIGNED_SHORT && (X = n.RGB16UI), L === n.UNSIGNED_INT && (X = n.RGB32UI), L === n.BYTE && (X = n.RGB8I), L === n.SHORT && (X = n.RGB16I), L === n.INT && (X = n.RGB32I)), _ === n.RGBA_INTEGER && (L === n.UNSIGNED_BYTE && (X = n.RGBA8UI), L === n.UNSIGNED_SHORT && (X = n.RGBA16UI), L === n.UNSIGNED_INT && (X = n.RGBA32UI), L === n.BYTE && (X = n.RGBA8I), L === n.SHORT && (X = n.RGBA16I), L === n.INT && (X = n.RGBA32I)), _ === n.RGB && (L === n.UNSIGNED_INT_5_9_9_9_REV && (X = n.RGB9_E5), L === n.UNSIGNED_INT_10F_11F_11F_REV && (X = n.R11F_G11F_B10F)), _ === n.RGBA) {
      const me = Z ? _s : Ge.getTransfer(q);
      L === n.FLOAT && (X = n.RGBA32F), L === n.HALF_FLOAT && (X = n.RGBA16F), L === n.UNSIGNED_BYTE && (X = me === Ke ? n.SRGB8_ALPHA8 : n.RGBA8), L === n.UNSIGNED_SHORT_4_4_4_4 && (X = n.RGBA4), L === n.UNSIGNED_SHORT_5_5_5_1 && (X = n.RGB5_A1);
    }
    return (X === n.R16F || X === n.R32F || X === n.RG16F || X === n.RG32F || X === n.RGBA16F || X === n.RGBA32F) && e.get("EXT_color_buffer_float"), X;
  }
  function y(E, _) {
    let L;
    return E ? _ === null || _ === vn || _ === Er ? L = n.DEPTH24_STENCIL8 : _ === cn ? L = n.DEPTH32F_STENCIL8 : _ === Sr && (L = n.DEPTH24_STENCIL8, Ce("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")) : _ === null || _ === vn || _ === Er ? L = n.DEPTH_COMPONENT24 : _ === cn ? L = n.DEPTH_COMPONENT32F : _ === Sr && (L = n.DEPTH_COMPONENT16), L;
  }
  function C(E, _) {
    return p(E) === !0 || E.isFramebufferTexture && E.minFilter !== yt && E.minFilter !== Rt ? Math.log2(Math.max(_.width, _.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? _.mipmaps.length : 1;
  }
  function A(E) {
    const _ = E.target;
    _.removeEventListener("dispose", A), v(_), _.isVideoTexture && f.delete(_);
  }
  function D(E) {
    const _ = E.target;
    _.removeEventListener("dispose", D), Y(_);
  }
  function v(E) {
    const _ = i.get(E);
    if (_.__webglInit === void 0) return;
    const L = E.source, q = u.get(L);
    if (q) {
      const Z = q[_.__cacheKey];
      Z.usedTimes--, Z.usedTimes === 0 && T(E), Object.keys(q).length === 0 && u.delete(L);
    }
    i.remove(E);
  }
  function T(E) {
    const _ = i.get(E);
    n.deleteTexture(_.__webglTexture);
    const L = E.source, q = u.get(L);
    delete q[_.__cacheKey], a.memory.textures--;
  }
  function Y(E) {
    const _ = i.get(E);
    if (E.depthTexture && (E.depthTexture.dispose(), i.remove(E.depthTexture)), E.isWebGLCubeRenderTarget)
      for (let q = 0; q < 6; q++) {
        if (Array.isArray(_.__webglFramebuffer[q]))
          for (let Z = 0; Z < _.__webglFramebuffer[q].length; Z++) n.deleteFramebuffer(_.__webglFramebuffer[q][Z]);
        else
          n.deleteFramebuffer(_.__webglFramebuffer[q]);
        _.__webglDepthbuffer && n.deleteRenderbuffer(_.__webglDepthbuffer[q]);
      }
    else {
      if (Array.isArray(_.__webglFramebuffer))
        for (let q = 0; q < _.__webglFramebuffer.length; q++) n.deleteFramebuffer(_.__webglFramebuffer[q]);
      else
        n.deleteFramebuffer(_.__webglFramebuffer);
      if (_.__webglDepthbuffer && n.deleteRenderbuffer(_.__webglDepthbuffer), _.__webglMultisampledFramebuffer && n.deleteFramebuffer(_.__webglMultisampledFramebuffer), _.__webglColorRenderbuffer)
        for (let q = 0; q < _.__webglColorRenderbuffer.length; q++)
          _.__webglColorRenderbuffer[q] && n.deleteRenderbuffer(_.__webglColorRenderbuffer[q]);
      _.__webglDepthRenderbuffer && n.deleteRenderbuffer(_.__webglDepthRenderbuffer);
    }
    const L = E.textures;
    for (let q = 0, Z = L.length; q < Z; q++) {
      const X = i.get(L[q]);
      X.__webglTexture && (n.deleteTexture(X.__webglTexture), a.memory.textures--), i.remove(L[q]);
    }
    i.remove(E);
  }
  let R = 0;
  function V() {
    R = 0;
  }
  function z() {
    const E = R;
    return E >= r.maxTextures && Ce("WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + r.maxTextures), R += 1, E;
  }
  function k(E) {
    const _ = [];
    return _.push(E.wrapS), _.push(E.wrapT), _.push(E.wrapR || 0), _.push(E.magFilter), _.push(E.minFilter), _.push(E.anisotropy), _.push(E.internalFormat), _.push(E.format), _.push(E.type), _.push(E.generateMipmaps), _.push(E.premultiplyAlpha), _.push(E.flipY), _.push(E.unpackAlignment), _.push(E.colorSpace), _.join();
  }
  function G(E, _) {
    const L = i.get(E);
    if (E.isVideoTexture && Xe(E), E.isRenderTargetTexture === !1 && E.isExternalTexture !== !0 && E.version > 0 && L.__version !== E.version) {
      const q = E.image;
      if (q === null)
        Ce("WebGLRenderer: Texture marked for update but no image data found.");
      else if (q.complete === !1)
        Ce("WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        K(L, E, _);
        return;
      }
    } else E.isExternalTexture && (L.__webglTexture = E.sourceTexture ? E.sourceTexture : null);
    t.bindTexture(n.TEXTURE_2D, L.__webglTexture, n.TEXTURE0 + _);
  }
  function F(E, _) {
    const L = i.get(E);
    if (E.isRenderTargetTexture === !1 && E.version > 0 && L.__version !== E.version) {
      K(L, E, _);
      return;
    } else E.isExternalTexture && (L.__webglTexture = E.sourceTexture ? E.sourceTexture : null);
    t.bindTexture(n.TEXTURE_2D_ARRAY, L.__webglTexture, n.TEXTURE0 + _);
  }
  function O(E, _) {
    const L = i.get(E);
    if (E.isRenderTargetTexture === !1 && E.version > 0 && L.__version !== E.version) {
      K(L, E, _);
      return;
    }
    t.bindTexture(n.TEXTURE_3D, L.__webglTexture, n.TEXTURE0 + _);
  }
  function Q(E, _) {
    const L = i.get(E);
    if (E.isCubeDepthTexture !== !0 && E.version > 0 && L.__version !== E.version) {
      ne(L, E, _);
      return;
    }
    t.bindTexture(n.TEXTURE_CUBE_MAP, L.__webglTexture, n.TEXTURE0 + _);
  }
  const $ = {
    [ya]: n.REPEAT,
    [Ln]: n.CLAMP_TO_EDGE,
    [ba]: n.MIRRORED_REPEAT
  }, ce = {
    [yt]: n.NEAREST,
    [ah]: n.NEAREST_MIPMAP_NEAREST,
    [Ur]: n.NEAREST_MIPMAP_LINEAR,
    [Rt]: n.LINEAR,
    [Ds]: n.LINEAR_MIPMAP_NEAREST,
    [vi]: n.LINEAR_MIPMAP_LINEAR
  }, pe = {
    [uh]: n.NEVER,
    [mh]: n.ALWAYS,
    [fh]: n.LESS,
    [To]: n.LEQUAL,
    [hh]: n.EQUAL,
    [yo]: n.GEQUAL,
    [dh]: n.GREATER,
    [ph]: n.NOTEQUAL
  };
  function fe(E, _) {
    if (_.type === cn && e.has("OES_texture_float_linear") === !1 && (_.magFilter === Rt || _.magFilter === Ds || _.magFilter === Ur || _.magFilter === vi || _.minFilter === Rt || _.minFilter === Ds || _.minFilter === Ur || _.minFilter === vi) && Ce("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."), n.texParameteri(E, n.TEXTURE_WRAP_S, $[_.wrapS]), n.texParameteri(E, n.TEXTURE_WRAP_T, $[_.wrapT]), (E === n.TEXTURE_3D || E === n.TEXTURE_2D_ARRAY) && n.texParameteri(E, n.TEXTURE_WRAP_R, $[_.wrapR]), n.texParameteri(E, n.TEXTURE_MAG_FILTER, ce[_.magFilter]), n.texParameteri(E, n.TEXTURE_MIN_FILTER, ce[_.minFilter]), _.compareFunction && (n.texParameteri(E, n.TEXTURE_COMPARE_MODE, n.COMPARE_REF_TO_TEXTURE), n.texParameteri(E, n.TEXTURE_COMPARE_FUNC, pe[_.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      if (_.magFilter === yt || _.minFilter !== Ur && _.minFilter !== vi || _.type === cn && e.has("OES_texture_float_linear") === !1) return;
      if (_.anisotropy > 1 || i.get(_).__currentAnisotropy) {
        const L = e.get("EXT_texture_filter_anisotropic");
        n.texParameterf(E, L.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, r.getMaxAnisotropy())), i.get(_).__currentAnisotropy = _.anisotropy;
      }
    }
  }
  function Ie(E, _) {
    let L = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, _.addEventListener("dispose", A));
    const q = _.source;
    let Z = u.get(q);
    Z === void 0 && (Z = {}, u.set(q, Z));
    const X = k(_);
    if (X !== E.__cacheKey) {
      Z[X] === void 0 && (Z[X] = {
        texture: n.createTexture(),
        usedTimes: 0
      }, a.memory.textures++, L = !0), Z[X].usedTimes++;
      const me = Z[E.__cacheKey];
      me !== void 0 && (Z[E.__cacheKey].usedTimes--, me.usedTimes === 0 && T(_)), E.__cacheKey = X, E.__webglTexture = Z[X].texture;
    }
    return L;
  }
  function rt(E, _, L) {
    return Math.floor(Math.floor(E / L) / _);
  }
  function it(E, _, L, q) {
    const X = E.updateRanges;
    if (X.length === 0)
      t.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, _.width, _.height, L, q, _.data);
    else {
      X.sort((j, ee) => j.start - ee.start);
      let me = 0;
      for (let j = 1; j < X.length; j++) {
        const ee = X[me], _e = X[j], ve = ee.start + ee.count, ue = rt(_e.start, _.width, 4), Fe = rt(ee.start, _.width, 4);
        _e.start <= ve + 1 && ue === Fe && rt(_e.start + _e.count - 1, _.width, 4) === ue ? ee.count = Math.max(
          ee.count,
          _e.start + _e.count - ee.start
        ) : (++me, X[me] = _e);
      }
      X.length = me + 1;
      const ie = n.getParameter(n.UNPACK_ROW_LENGTH), ye = n.getParameter(n.UNPACK_SKIP_PIXELS), Ae = n.getParameter(n.UNPACK_SKIP_ROWS);
      n.pixelStorei(n.UNPACK_ROW_LENGTH, _.width);
      for (let j = 0, ee = X.length; j < ee; j++) {
        const _e = X[j], ve = Math.floor(_e.start / 4), ue = Math.ceil(_e.count / 4), Fe = ve % _.width, P = Math.floor(ve / _.width), re = ue, te = 1;
        n.pixelStorei(n.UNPACK_SKIP_PIXELS, Fe), n.pixelStorei(n.UNPACK_SKIP_ROWS, P), t.texSubImage2D(n.TEXTURE_2D, 0, Fe, P, re, te, L, q, _.data);
      }
      E.clearUpdateRanges(), n.pixelStorei(n.UNPACK_ROW_LENGTH, ie), n.pixelStorei(n.UNPACK_SKIP_PIXELS, ye), n.pixelStorei(n.UNPACK_SKIP_ROWS, Ae);
    }
  }
  function K(E, _, L) {
    let q = n.TEXTURE_2D;
    (_.isDataArrayTexture || _.isCompressedArrayTexture) && (q = n.TEXTURE_2D_ARRAY), _.isData3DTexture && (q = n.TEXTURE_3D);
    const Z = Ie(E, _), X = _.source;
    t.bindTexture(q, E.__webglTexture, n.TEXTURE0 + L);
    const me = i.get(X);
    if (X.version !== me.__version || Z === !0) {
      t.activeTexture(n.TEXTURE0 + L);
      const ie = Ge.getPrimaries(Ge.workingColorSpace), ye = _.colorSpace === jn ? null : Ge.getPrimaries(_.colorSpace), Ae = _.colorSpace === jn || ie === ye ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, _.flipY), n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), n.pixelStorei(n.UNPACK_ALIGNMENT, _.unpackAlignment), n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, Ae);
      let j = M(_.image, !1, r.maxTextureSize);
      j = tt(_, j);
      const ee = s.convert(_.format, _.colorSpace), _e = s.convert(_.type);
      let ve = b(_.internalFormat, ee, _e, _.colorSpace, _.isVideoTexture);
      fe(q, _);
      let ue;
      const Fe = _.mipmaps, P = _.isVideoTexture !== !0, re = me.__version === void 0 || Z === !0, te = X.dataReady, de = C(_, j);
      if (_.isDepthTexture)
        ve = y(_.format === xi, _.type), re && (P ? t.texStorage2D(n.TEXTURE_2D, 1, ve, j.width, j.height) : t.texImage2D(n.TEXTURE_2D, 0, ve, j.width, j.height, 0, ee, _e, null));
      else if (_.isDataTexture)
        if (Fe.length > 0) {
          P && re && t.texStorage2D(n.TEXTURE_2D, de, ve, Fe[0].width, Fe[0].height);
          for (let J = 0, W = Fe.length; J < W; J++)
            ue = Fe[J], P ? te && t.texSubImage2D(n.TEXTURE_2D, J, 0, 0, ue.width, ue.height, ee, _e, ue.data) : t.texImage2D(n.TEXTURE_2D, J, ve, ue.width, ue.height, 0, ee, _e, ue.data);
          _.generateMipmaps = !1;
        } else
          P ? (re && t.texStorage2D(n.TEXTURE_2D, de, ve, j.width, j.height), te && it(_, j, ee, _e)) : t.texImage2D(n.TEXTURE_2D, 0, ve, j.width, j.height, 0, ee, _e, j.data);
      else if (_.isCompressedTexture)
        if (_.isCompressedArrayTexture) {
          P && re && t.texStorage3D(n.TEXTURE_2D_ARRAY, de, ve, Fe[0].width, Fe[0].height, j.depth);
          for (let J = 0, W = Fe.length; J < W; J++)
            if (ue = Fe[J], _.format !== nn)
              if (ee !== null)
                if (P) {
                  if (te)
                    if (_.layerUpdates.size > 0) {
                      const ge = Ml(ue.width, ue.height, _.format, _.type);
                      for (const Re of _.layerUpdates) {
                        const nt = ue.data.subarray(
                          Re * ge / ue.data.BYTES_PER_ELEMENT,
                          (Re + 1) * ge / ue.data.BYTES_PER_ELEMENT
                        );
                        t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, J, 0, 0, Re, ue.width, ue.height, 1, ee, nt);
                      }
                      _.clearLayerUpdates();
                    } else
                      t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY, J, 0, 0, 0, ue.width, ue.height, j.depth, ee, ue.data);
                } else
                  t.compressedTexImage3D(n.TEXTURE_2D_ARRAY, J, ve, ue.width, ue.height, j.depth, 0, ue.data, 0, 0);
              else
                Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
            else
              P ? te && t.texSubImage3D(n.TEXTURE_2D_ARRAY, J, 0, 0, 0, ue.width, ue.height, j.depth, ee, _e, ue.data) : t.texImage3D(n.TEXTURE_2D_ARRAY, J, ve, ue.width, ue.height, j.depth, 0, ee, _e, ue.data);
        } else {
          P && re && t.texStorage2D(n.TEXTURE_2D, de, ve, Fe[0].width, Fe[0].height);
          for (let J = 0, W = Fe.length; J < W; J++)
            ue = Fe[J], _.format !== nn ? ee !== null ? P ? te && t.compressedTexSubImage2D(n.TEXTURE_2D, J, 0, 0, ue.width, ue.height, ee, ue.data) : t.compressedTexImage2D(n.TEXTURE_2D, J, ve, ue.width, ue.height, 0, ue.data) : Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : P ? te && t.texSubImage2D(n.TEXTURE_2D, J, 0, 0, ue.width, ue.height, ee, _e, ue.data) : t.texImage2D(n.TEXTURE_2D, J, ve, ue.width, ue.height, 0, ee, _e, ue.data);
        }
      else if (_.isDataArrayTexture)
        if (P) {
          if (re && t.texStorage3D(n.TEXTURE_2D_ARRAY, de, ve, j.width, j.height, j.depth), te)
            if (_.layerUpdates.size > 0) {
              const J = Ml(j.width, j.height, _.format, _.type);
              for (const W of _.layerUpdates) {
                const ge = j.data.subarray(
                  W * J / j.data.BYTES_PER_ELEMENT,
                  (W + 1) * J / j.data.BYTES_PER_ELEMENT
                );
                t.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, W, j.width, j.height, 1, ee, _e, ge);
              }
              _.clearLayerUpdates();
            } else
              t.texSubImage3D(n.TEXTURE_2D_ARRAY, 0, 0, 0, 0, j.width, j.height, j.depth, ee, _e, j.data);
        } else
          t.texImage3D(n.TEXTURE_2D_ARRAY, 0, ve, j.width, j.height, j.depth, 0, ee, _e, j.data);
      else if (_.isData3DTexture)
        P ? (re && t.texStorage3D(n.TEXTURE_3D, de, ve, j.width, j.height, j.depth), te && t.texSubImage3D(n.TEXTURE_3D, 0, 0, 0, 0, j.width, j.height, j.depth, ee, _e, j.data)) : t.texImage3D(n.TEXTURE_3D, 0, ve, j.width, j.height, j.depth, 0, ee, _e, j.data);
      else if (_.isFramebufferTexture) {
        if (re)
          if (P)
            t.texStorage2D(n.TEXTURE_2D, de, ve, j.width, j.height);
          else {
            let J = j.width, W = j.height;
            for (let ge = 0; ge < de; ge++)
              t.texImage2D(n.TEXTURE_2D, ge, ve, J, W, 0, ee, _e, null), J >>= 1, W >>= 1;
          }
      } else if (Fe.length > 0) {
        if (P && re) {
          const J = Me(Fe[0]);
          t.texStorage2D(n.TEXTURE_2D, de, ve, J.width, J.height);
        }
        for (let J = 0, W = Fe.length; J < W; J++)
          ue = Fe[J], P ? te && t.texSubImage2D(n.TEXTURE_2D, J, 0, 0, ee, _e, ue) : t.texImage2D(n.TEXTURE_2D, J, ve, ee, _e, ue);
        _.generateMipmaps = !1;
      } else if (P) {
        if (re) {
          const J = Me(j);
          t.texStorage2D(n.TEXTURE_2D, de, ve, J.width, J.height);
        }
        te && t.texSubImage2D(n.TEXTURE_2D, 0, 0, 0, ee, _e, j);
      } else
        t.texImage2D(n.TEXTURE_2D, 0, ve, ee, _e, j);
      p(_) && h(q), me.__version = X.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function ne(E, _, L) {
    if (_.image.length !== 6) return;
    const q = Ie(E, _), Z = _.source;
    t.bindTexture(n.TEXTURE_CUBE_MAP, E.__webglTexture, n.TEXTURE0 + L);
    const X = i.get(Z);
    if (Z.version !== X.__version || q === !0) {
      t.activeTexture(n.TEXTURE0 + L);
      const me = Ge.getPrimaries(Ge.workingColorSpace), ie = _.colorSpace === jn ? null : Ge.getPrimaries(_.colorSpace), ye = _.colorSpace === jn || me === ie ? n.NONE : n.BROWSER_DEFAULT_WEBGL;
      n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL, _.flipY), n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), n.pixelStorei(n.UNPACK_ALIGNMENT, _.unpackAlignment), n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL, ye);
      const Ae = _.isCompressedTexture || _.image[0].isCompressedTexture, j = _.image[0] && _.image[0].isDataTexture, ee = [];
      for (let W = 0; W < 6; W++)
        !Ae && !j ? ee[W] = M(_.image[W], !0, r.maxCubemapSize) : ee[W] = j ? _.image[W].image : _.image[W], ee[W] = tt(_, ee[W]);
      const _e = ee[0], ve = s.convert(_.format, _.colorSpace), ue = s.convert(_.type), Fe = b(_.internalFormat, ve, ue, _.colorSpace), P = _.isVideoTexture !== !0, re = X.__version === void 0 || q === !0, te = Z.dataReady;
      let de = C(_, _e);
      fe(n.TEXTURE_CUBE_MAP, _);
      let J;
      if (Ae) {
        P && re && t.texStorage2D(n.TEXTURE_CUBE_MAP, de, Fe, _e.width, _e.height);
        for (let W = 0; W < 6; W++) {
          J = ee[W].mipmaps;
          for (let ge = 0; ge < J.length; ge++) {
            const Re = J[ge];
            _.format !== nn ? ve !== null ? P ? te && t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, ge, 0, 0, Re.width, Re.height, ve, Re.data) : t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, ge, Fe, Re.width, Re.height, 0, Re.data) : Ce("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : P ? te && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, ge, 0, 0, Re.width, Re.height, ve, ue, Re.data) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, ge, Fe, Re.width, Re.height, 0, ve, ue, Re.data);
          }
        }
      } else {
        if (J = _.mipmaps, P && re) {
          J.length > 0 && de++;
          const W = Me(ee[0]);
          t.texStorage2D(n.TEXTURE_CUBE_MAP, de, Fe, W.width, W.height);
        }
        for (let W = 0; W < 6; W++)
          if (j) {
            P ? te && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, 0, 0, 0, ee[W].width, ee[W].height, ve, ue, ee[W].data) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, 0, Fe, ee[W].width, ee[W].height, 0, ve, ue, ee[W].data);
            for (let ge = 0; ge < J.length; ge++) {
              const nt = J[ge].image[W].image;
              P ? te && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, ge + 1, 0, 0, nt.width, nt.height, ve, ue, nt.data) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, ge + 1, Fe, nt.width, nt.height, 0, ve, ue, nt.data);
            }
          } else {
            P ? te && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, 0, 0, 0, ve, ue, ee[W]) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, 0, Fe, ve, ue, ee[W]);
            for (let ge = 0; ge < J.length; ge++) {
              const Re = J[ge];
              P ? te && t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, ge + 1, 0, 0, ve, ue, Re.image[W]) : t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + W, ge + 1, Fe, ve, ue, Re.image[W]);
            }
          }
      }
      p(_) && h(n.TEXTURE_CUBE_MAP), X.__version = Z.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function se(E, _, L, q, Z, X) {
    const me = s.convert(L.format, L.colorSpace), ie = s.convert(L.type), ye = b(L.internalFormat, me, ie, L.colorSpace), Ae = i.get(_), j = i.get(L);
    if (j.__renderTarget = _, !Ae.__hasExternalTextures) {
      const ee = Math.max(1, _.width >> X), _e = Math.max(1, _.height >> X);
      Z === n.TEXTURE_3D || Z === n.TEXTURE_2D_ARRAY ? t.texImage3D(Z, X, ye, ee, _e, _.depth, 0, me, ie, null) : t.texImage2D(Z, X, ye, ee, _e, 0, me, ie, null);
    }
    t.bindFramebuffer(n.FRAMEBUFFER, E), ut(_) ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, q, Z, j.__webglTexture, 0, w(_)) : (Z === n.TEXTURE_2D || Z >= n.TEXTURE_CUBE_MAP_POSITIVE_X && Z <= n.TEXTURE_CUBE_MAP_NEGATIVE_Z) && n.framebufferTexture2D(n.FRAMEBUFFER, q, Z, j.__webglTexture, X), t.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  function De(E, _, L) {
    if (n.bindRenderbuffer(n.RENDERBUFFER, E), _.depthBuffer) {
      const q = _.depthTexture, Z = q && q.isDepthTexture ? q.type : null, X = y(_.stencilBuffer, Z), me = _.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
      ut(_) ? o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, w(_), X, _.width, _.height) : L ? n.renderbufferStorageMultisample(n.RENDERBUFFER, w(_), X, _.width, _.height) : n.renderbufferStorage(n.RENDERBUFFER, X, _.width, _.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, me, n.RENDERBUFFER, E);
    } else {
      const q = _.textures;
      for (let Z = 0; Z < q.length; Z++) {
        const X = q[Z], me = s.convert(X.format, X.colorSpace), ie = s.convert(X.type), ye = b(X.internalFormat, me, ie, X.colorSpace);
        ut(_) ? o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER, w(_), ye, _.width, _.height) : L ? n.renderbufferStorageMultisample(n.RENDERBUFFER, w(_), ye, _.width, _.height) : n.renderbufferStorage(n.RENDERBUFFER, ye, _.width, _.height);
      }
    }
    n.bindRenderbuffer(n.RENDERBUFFER, null);
  }
  function be(E, _, L) {
    const q = _.isWebGLCubeRenderTarget === !0;
    if (t.bindFramebuffer(n.FRAMEBUFFER, E), !(_.depthTexture && _.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    const Z = i.get(_.depthTexture);
    if (Z.__renderTarget = _, (!Z.__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = !0), q) {
      if (Z.__webglInit === void 0 && (Z.__webglInit = !0, _.depthTexture.addEventListener("dispose", A)), Z.__webglTexture === void 0) {
        Z.__webglTexture = n.createTexture(), t.bindTexture(n.TEXTURE_CUBE_MAP, Z.__webglTexture), fe(n.TEXTURE_CUBE_MAP, _.depthTexture);
        const Ae = s.convert(_.depthTexture.format), j = s.convert(_.depthTexture.type);
        let ee;
        _.depthTexture.format === Bn ? ee = n.DEPTH_COMPONENT24 : _.depthTexture.format === xi && (ee = n.DEPTH24_STENCIL8);
        for (let _e = 0; _e < 6; _e++)
          n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X + _e, 0, ee, _.width, _.height, 0, Ae, j, null);
      }
    } else
      G(_.depthTexture, 0);
    const X = Z.__webglTexture, me = w(_), ie = q ? n.TEXTURE_CUBE_MAP_POSITIVE_X + L : n.TEXTURE_2D, ye = _.depthTexture.format === xi ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
    if (_.depthTexture.format === Bn)
      ut(_) ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, ye, ie, X, 0, me) : n.framebufferTexture2D(n.FRAMEBUFFER, ye, ie, X, 0);
    else if (_.depthTexture.format === xi)
      ut(_) ? o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER, ye, ie, X, 0, me) : n.framebufferTexture2D(n.FRAMEBUFFER, ye, ie, X, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function we(E) {
    const _ = i.get(E), L = E.isWebGLCubeRenderTarget === !0;
    if (_.__boundDepthTexture !== E.depthTexture) {
      const q = E.depthTexture;
      if (_.__depthDisposeCallback && _.__depthDisposeCallback(), q) {
        const Z = () => {
          delete _.__boundDepthTexture, delete _.__depthDisposeCallback, q.removeEventListener("dispose", Z);
        };
        q.addEventListener("dispose", Z), _.__depthDisposeCallback = Z;
      }
      _.__boundDepthTexture = q;
    }
    if (E.depthTexture && !_.__autoAllocateDepthBuffer)
      if (L)
        for (let q = 0; q < 6; q++)
          be(_.__webglFramebuffer[q], E, q);
      else {
        const q = E.texture.mipmaps;
        q && q.length > 0 ? be(_.__webglFramebuffer[0], E, 0) : be(_.__webglFramebuffer, E, 0);
      }
    else if (L) {
      _.__webglDepthbuffer = [];
      for (let q = 0; q < 6; q++)
        if (t.bindFramebuffer(n.FRAMEBUFFER, _.__webglFramebuffer[q]), _.__webglDepthbuffer[q] === void 0)
          _.__webglDepthbuffer[q] = n.createRenderbuffer(), De(_.__webglDepthbuffer[q], E, !1);
        else {
          const Z = E.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, X = _.__webglDepthbuffer[q];
          n.bindRenderbuffer(n.RENDERBUFFER, X), n.framebufferRenderbuffer(n.FRAMEBUFFER, Z, n.RENDERBUFFER, X);
        }
    } else {
      const q = E.texture.mipmaps;
      if (q && q.length > 0 ? t.bindFramebuffer(n.FRAMEBUFFER, _.__webglFramebuffer[0]) : t.bindFramebuffer(n.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer === void 0)
        _.__webglDepthbuffer = n.createRenderbuffer(), De(_.__webglDepthbuffer, E, !1);
      else {
        const Z = E.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, X = _.__webglDepthbuffer;
        n.bindRenderbuffer(n.RENDERBUFFER, X), n.framebufferRenderbuffer(n.FRAMEBUFFER, Z, n.RENDERBUFFER, X);
      }
    }
    t.bindFramebuffer(n.FRAMEBUFFER, null);
  }
  function _t(E, _, L) {
    const q = i.get(E);
    _ !== void 0 && se(q.__webglFramebuffer, E, E.texture, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, 0), L !== void 0 && we(E);
  }
  function Ve(E) {
    const _ = E.texture, L = i.get(E), q = i.get(_);
    E.addEventListener("dispose", D);
    const Z = E.textures, X = E.isWebGLCubeRenderTarget === !0, me = Z.length > 1;
    if (me || (q.__webglTexture === void 0 && (q.__webglTexture = n.createTexture()), q.__version = _.version, a.memory.textures++), X) {
      L.__webglFramebuffer = [];
      for (let ie = 0; ie < 6; ie++)
        if (_.mipmaps && _.mipmaps.length > 0) {
          L.__webglFramebuffer[ie] = [];
          for (let ye = 0; ye < _.mipmaps.length; ye++)
            L.__webglFramebuffer[ie][ye] = n.createFramebuffer();
        } else
          L.__webglFramebuffer[ie] = n.createFramebuffer();
    } else {
      if (_.mipmaps && _.mipmaps.length > 0) {
        L.__webglFramebuffer = [];
        for (let ie = 0; ie < _.mipmaps.length; ie++)
          L.__webglFramebuffer[ie] = n.createFramebuffer();
      } else
        L.__webglFramebuffer = n.createFramebuffer();
      if (me)
        for (let ie = 0, ye = Z.length; ie < ye; ie++) {
          const Ae = i.get(Z[ie]);
          Ae.__webglTexture === void 0 && (Ae.__webglTexture = n.createTexture(), a.memory.textures++);
        }
      if (E.samples > 0 && ut(E) === !1) {
        L.__webglMultisampledFramebuffer = n.createFramebuffer(), L.__webglColorRenderbuffer = [], t.bindFramebuffer(n.FRAMEBUFFER, L.__webglMultisampledFramebuffer);
        for (let ie = 0; ie < Z.length; ie++) {
          const ye = Z[ie];
          L.__webglColorRenderbuffer[ie] = n.createRenderbuffer(), n.bindRenderbuffer(n.RENDERBUFFER, L.__webglColorRenderbuffer[ie]);
          const Ae = s.convert(ye.format, ye.colorSpace), j = s.convert(ye.type), ee = b(ye.internalFormat, Ae, j, ye.colorSpace, E.isXRRenderTarget === !0), _e = w(E);
          n.renderbufferStorageMultisample(n.RENDERBUFFER, _e, ee, E.width, E.height), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + ie, n.RENDERBUFFER, L.__webglColorRenderbuffer[ie]);
        }
        n.bindRenderbuffer(n.RENDERBUFFER, null), E.depthBuffer && (L.__webglDepthRenderbuffer = n.createRenderbuffer(), De(L.__webglDepthRenderbuffer, E, !0)), t.bindFramebuffer(n.FRAMEBUFFER, null);
      }
    }
    if (X) {
      t.bindTexture(n.TEXTURE_CUBE_MAP, q.__webglTexture), fe(n.TEXTURE_CUBE_MAP, _);
      for (let ie = 0; ie < 6; ie++)
        if (_.mipmaps && _.mipmaps.length > 0)
          for (let ye = 0; ye < _.mipmaps.length; ye++)
            se(L.__webglFramebuffer[ie][ye], E, _, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + ie, ye);
        else
          se(L.__webglFramebuffer[ie], E, _, n.COLOR_ATTACHMENT0, n.TEXTURE_CUBE_MAP_POSITIVE_X + ie, 0);
      p(_) && h(n.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (me) {
      for (let ie = 0, ye = Z.length; ie < ye; ie++) {
        const Ae = Z[ie], j = i.get(Ae);
        let ee = n.TEXTURE_2D;
        (E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (ee = E.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY), t.bindTexture(ee, j.__webglTexture), fe(ee, Ae), se(L.__webglFramebuffer, E, Ae, n.COLOR_ATTACHMENT0 + ie, ee, 0), p(Ae) && h(ee);
      }
      t.unbindTexture();
    } else {
      let ie = n.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (ie = E.isWebGL3DRenderTarget ? n.TEXTURE_3D : n.TEXTURE_2D_ARRAY), t.bindTexture(ie, q.__webglTexture), fe(ie, _), _.mipmaps && _.mipmaps.length > 0)
        for (let ye = 0; ye < _.mipmaps.length; ye++)
          se(L.__webglFramebuffer[ye], E, _, n.COLOR_ATTACHMENT0, ie, ye);
      else
        se(L.__webglFramebuffer, E, _, n.COLOR_ATTACHMENT0, ie, 0);
      p(_) && h(ie), t.unbindTexture();
    }
    E.depthBuffer && we(E);
  }
  function qe(E) {
    const _ = E.textures;
    for (let L = 0, q = _.length; L < q; L++) {
      const Z = _[L];
      if (p(Z)) {
        const X = S(E), me = i.get(Z).__webglTexture;
        t.bindTexture(X, me), h(X), t.unbindTexture();
      }
    }
  }
  const Qe = [], Ne = [];
  function ot(E) {
    if (E.samples > 0) {
      if (ut(E) === !1) {
        const _ = E.textures, L = E.width, q = E.height;
        let Z = n.COLOR_BUFFER_BIT;
        const X = E.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT, me = i.get(E), ie = _.length > 1;
        if (ie)
          for (let Ae = 0; Ae < _.length; Ae++)
            t.bindFramebuffer(n.FRAMEBUFFER, me.__webglMultisampledFramebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Ae, n.RENDERBUFFER, null), t.bindFramebuffer(n.FRAMEBUFFER, me.__webglFramebuffer), n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Ae, n.TEXTURE_2D, null, 0);
        t.bindFramebuffer(n.READ_FRAMEBUFFER, me.__webglMultisampledFramebuffer);
        const ye = E.texture.mipmaps;
        ye && ye.length > 0 ? t.bindFramebuffer(n.DRAW_FRAMEBUFFER, me.__webglFramebuffer[0]) : t.bindFramebuffer(n.DRAW_FRAMEBUFFER, me.__webglFramebuffer);
        for (let Ae = 0; Ae < _.length; Ae++) {
          if (E.resolveDepthBuffer && (E.depthBuffer && (Z |= n.DEPTH_BUFFER_BIT), E.stencilBuffer && E.resolveStencilBuffer && (Z |= n.STENCIL_BUFFER_BIT)), ie) {
            n.framebufferRenderbuffer(n.READ_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.RENDERBUFFER, me.__webglColorRenderbuffer[Ae]);
            const j = i.get(_[Ae]).__webglTexture;
            n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0, n.TEXTURE_2D, j, 0);
          }
          n.blitFramebuffer(0, 0, L, q, 0, 0, L, q, Z, n.NEAREST), c === !0 && (Qe.length = 0, Ne.length = 0, Qe.push(n.COLOR_ATTACHMENT0 + Ae), E.depthBuffer && E.resolveDepthBuffer === !1 && (Qe.push(X), Ne.push(X), n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, Ne)), n.invalidateFramebuffer(n.READ_FRAMEBUFFER, Qe));
        }
        if (t.bindFramebuffer(n.READ_FRAMEBUFFER, null), t.bindFramebuffer(n.DRAW_FRAMEBUFFER, null), ie)
          for (let Ae = 0; Ae < _.length; Ae++) {
            t.bindFramebuffer(n.FRAMEBUFFER, me.__webglMultisampledFramebuffer), n.framebufferRenderbuffer(n.FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Ae, n.RENDERBUFFER, me.__webglColorRenderbuffer[Ae]);
            const j = i.get(_[Ae]).__webglTexture;
            t.bindFramebuffer(n.FRAMEBUFFER, me.__webglFramebuffer), n.framebufferTexture2D(n.DRAW_FRAMEBUFFER, n.COLOR_ATTACHMENT0 + Ae, n.TEXTURE_2D, j, 0);
          }
        t.bindFramebuffer(n.DRAW_FRAMEBUFFER, me.__webglMultisampledFramebuffer);
      } else if (E.depthBuffer && E.resolveDepthBuffer === !1 && c) {
        const _ = E.stencilBuffer ? n.DEPTH_STENCIL_ATTACHMENT : n.DEPTH_ATTACHMENT;
        n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER, [_]);
      }
    }
  }
  function w(E) {
    return Math.min(r.maxSamples, E.samples);
  }
  function ut(E) {
    const _ = i.get(E);
    return E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && _.__useRenderToTexture !== !1;
  }
  function Xe(E) {
    const _ = a.render.frame;
    f.get(E) !== _ && (f.set(E, _), E.update());
  }
  function tt(E, _) {
    const L = E.colorSpace, q = E.format, Z = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || L !== tr && L !== jn && (Ge.getTransfer(L) === Ke ? (q !== nn || Z !== Wt) && Ce("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : We("WebGLTextures: Unsupported texture color space:", L)), _;
  }
  function Me(E) {
    return typeof HTMLImageElement < "u" && E instanceof HTMLImageElement ? (l.width = E.naturalWidth || E.width, l.height = E.naturalHeight || E.height) : typeof VideoFrame < "u" && E instanceof VideoFrame ? (l.width = E.displayWidth, l.height = E.displayHeight) : (l.width = E.width, l.height = E.height), l;
  }
  this.allocateTextureUnit = z, this.resetTextureUnits = V, this.setTexture2D = G, this.setTexture2DArray = F, this.setTexture3D = O, this.setTextureCube = Q, this.rebindTextures = _t, this.setupRenderTarget = Ve, this.updateRenderTargetMipmap = qe, this.updateMultisampleRenderTarget = ot, this.setupDepthRenderbuffer = we, this.setupFrameBufferTexture = se, this.useMultisampledRTT = ut, this.isReversedDepthBuffer = function() {
    return t.buffers.depth.getReversed();
  };
}
function Bg(n, e) {
  function t(i, r = jn) {
    let s;
    const a = Ge.getTransfer(r);
    if (i === Wt) return n.UNSIGNED_BYTE;
    if (i === vo) return n.UNSIGNED_SHORT_4_4_4_4;
    if (i === xo) return n.UNSIGNED_SHORT_5_5_5_1;
    if (i === Gc) return n.UNSIGNED_INT_5_9_9_9_REV;
    if (i === Hc) return n.UNSIGNED_INT_10F_11F_11F_REV;
    if (i === zc) return n.BYTE;
    if (i === Vc) return n.SHORT;
    if (i === Sr) return n.UNSIGNED_SHORT;
    if (i === go) return n.INT;
    if (i === vn) return n.UNSIGNED_INT;
    if (i === cn) return n.FLOAT;
    if (i === On) return n.HALF_FLOAT;
    if (i === kc) return n.ALPHA;
    if (i === Wc) return n.RGB;
    if (i === nn) return n.RGBA;
    if (i === Bn) return n.DEPTH_COMPONENT;
    if (i === xi) return n.DEPTH_STENCIL;
    if (i === Xc) return n.RED;
    if (i === Mo) return n.RED_INTEGER;
    if (i === er) return n.RG;
    if (i === So) return n.RG_INTEGER;
    if (i === Eo) return n.RGBA_INTEGER;
    if (i === ls || i === cs || i === us || i === fs)
      if (a === Ke)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (i === ls) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (i === cs) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (i === us) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (i === fs) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (i === ls) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (i === cs) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (i === us) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (i === fs) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (i === Aa || i === wa || i === Ra || i === Ca)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (i === Aa) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (i === wa) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (i === Ra) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (i === Ca) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (i === Pa || i === Da || i === La || i === Ia || i === Ua || i === Na || i === Fa)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (i === Pa || i === Da) return a === Ke ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (i === La) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
        if (i === Ia) return s.COMPRESSED_R11_EAC;
        if (i === Ua) return s.COMPRESSED_SIGNED_R11_EAC;
        if (i === Na) return s.COMPRESSED_RG11_EAC;
        if (i === Fa) return s.COMPRESSED_SIGNED_RG11_EAC;
      } else
        return null;
    if (i === Oa || i === Ba || i === za || i === Va || i === Ga || i === Ha || i === ka || i === Wa || i === Xa || i === qa || i === Ya || i === Ka || i === Za || i === $a)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (i === Oa) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (i === Ba) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (i === za) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (i === Va) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (i === Ga) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (i === Ha) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (i === ka) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (i === Wa) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (i === Xa) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (i === qa) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (i === Ya) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (i === Ka) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (i === Za) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (i === $a) return a === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (i === ja || i === Ja || i === Qa)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (i === ja) return a === Ke ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (i === Ja) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (i === Qa) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (i === eo || i === to || i === no || i === io)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (i === eo) return s.COMPRESSED_RED_RGTC1_EXT;
        if (i === to) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (i === no) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (i === io) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return i === Er ? n.UNSIGNED_INT_24_8 : n[i] !== void 0 ? n[i] : null;
  }
  return { convert: t };
}
const zg = `
void main() {

	gl_Position = vec4( position, 1.0 );

}`, Vg = `
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;
class Gg {
  /**
   * Constructs a new depth sensing module.
   */
  constructor() {
    this.texture = null, this.mesh = null, this.depthNear = 0, this.depthFar = 0;
  }
  /**
   * Inits the depth sensing module
   *
   * @param {XRWebGLDepthInformation} depthData - The XR depth data.
   * @param {XRRenderState} renderState - The XR render state.
   */
  init(e, t) {
    if (this.texture === null) {
      const i = new tu(e.texture);
      (e.depthNear !== t.depthNear || e.depthFar !== t.depthFar) && (this.depthNear = e.depthNear, this.depthFar = e.depthFar), this.texture = i;
    }
  }
  /**
   * Returns a plane mesh that visualizes the depth texture.
   *
   * @param {ArrayCamera} cameraXR - The XR camera.
   * @return {?Mesh} The plane mesh.
   */
  getMesh(e) {
    if (this.texture !== null && this.mesh === null) {
      const t = e.cameras[0].viewport, i = new rn({
        vertexShader: zg,
        fragmentShader: Vg,
        uniforms: {
          depthColor: { value: this.texture },
          depthWidth: { value: t.z },
          depthHeight: { value: t.w }
        }
      });
      this.mesh = new xn(new Rr(20, 20), i);
    }
    return this.mesh;
  }
  /**
   * Resets the module
   */
  reset() {
    this.texture = null, this.mesh = null;
  }
  /**
   * Returns a texture representing the depth of the user's environment.
   *
   * @return {?ExternalTexture} The depth texture.
   */
  getDepthTexture() {
    return this.texture;
  }
}
class Hg extends rr {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer} renderer - The renderer.
   * @param {WebGL2RenderingContext} gl - The rendering context.
   */
  constructor(e, t) {
    super();
    const i = this;
    let r = null, s = 1, a = null, o = "local-floor", c = 1, l = null, f = null, d = null, u = null, m = null, g = null;
    const M = typeof XRWebGLBinding < "u", p = new Gg(), h = {}, S = t.getContextAttributes();
    let b = null, y = null;
    const C = [], A = [], D = new Ze();
    let v = null;
    const T = new Jt();
    T.viewport = new ct();
    const Y = new Jt();
    Y.viewport = new ct();
    const R = [T, Y], V = new ed();
    let z = null, k = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(K) {
      let ne = C[K];
      return ne === void 0 && (ne = new zs(), C[K] = ne), ne.getTargetRaySpace();
    }, this.getControllerGrip = function(K) {
      let ne = C[K];
      return ne === void 0 && (ne = new zs(), C[K] = ne), ne.getGripSpace();
    }, this.getHand = function(K) {
      let ne = C[K];
      return ne === void 0 && (ne = new zs(), C[K] = ne), ne.getHandSpace();
    };
    function G(K) {
      const ne = A.indexOf(K.inputSource);
      if (ne === -1)
        return;
      const se = C[ne];
      se !== void 0 && (se.update(K.inputSource, K.frame, l || a), se.dispatchEvent({ type: K.type, data: K.inputSource }));
    }
    function F() {
      r.removeEventListener("select", G), r.removeEventListener("selectstart", G), r.removeEventListener("selectend", G), r.removeEventListener("squeeze", G), r.removeEventListener("squeezestart", G), r.removeEventListener("squeezeend", G), r.removeEventListener("end", F), r.removeEventListener("inputsourceschange", O);
      for (let K = 0; K < C.length; K++) {
        const ne = A[K];
        ne !== null && (A[K] = null, C[K].disconnect(ne));
      }
      z = null, k = null, p.reset();
      for (const K in h)
        delete h[K];
      e.setRenderTarget(b), m = null, u = null, d = null, r = null, y = null, it.stop(), i.isPresenting = !1, e.setPixelRatio(v), e.setSize(D.width, D.height, !1), i.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(K) {
      s = K, i.isPresenting === !0 && Ce("WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(K) {
      o = K, i.isPresenting === !0 && Ce("WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return l || a;
    }, this.setReferenceSpace = function(K) {
      l = K;
    }, this.getBaseLayer = function() {
      return u !== null ? u : m;
    }, this.getBinding = function() {
      return d === null && M && (d = new XRWebGLBinding(r, t)), d;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(K) {
      if (r = K, r !== null) {
        if (b = e.getRenderTarget(), r.addEventListener("select", G), r.addEventListener("selectstart", G), r.addEventListener("selectend", G), r.addEventListener("squeeze", G), r.addEventListener("squeezestart", G), r.addEventListener("squeezeend", G), r.addEventListener("end", F), r.addEventListener("inputsourceschange", O), S.xrCompatible !== !0 && await t.makeXRCompatible(), v = e.getPixelRatio(), e.getSize(D), M && "createProjectionLayer" in XRWebGLBinding.prototype) {
          let se = null, De = null, be = null;
          S.depth && (be = S.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, se = S.stencil ? xi : Bn, De = S.stencil ? Er : vn);
          const we = {
            colorFormat: t.RGBA8,
            depthFormat: be,
            scaleFactor: s
          };
          d = this.getBinding(), u = d.createProjectionLayer(we), r.updateRenderState({ layers: [u] }), e.setPixelRatio(1), e.setSize(u.textureWidth, u.textureHeight, !1), y = new pn(
            u.textureWidth,
            u.textureHeight,
            {
              format: nn,
              type: Wt,
              depthTexture: new Tr(u.textureWidth, u.textureHeight, De, void 0, void 0, void 0, void 0, void 0, void 0, se),
              stencilBuffer: S.stencil,
              colorSpace: e.outputColorSpace,
              samples: S.antialias ? 4 : 0,
              resolveDepthBuffer: u.ignoreDepthValues === !1,
              resolveStencilBuffer: u.ignoreDepthValues === !1
            }
          );
        } else {
          const se = {
            antialias: S.antialias,
            alpha: !0,
            depth: S.depth,
            stencil: S.stencil,
            framebufferScaleFactor: s
          };
          m = new XRWebGLLayer(r, t, se), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), y = new pn(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: nn,
              type: Wt,
              colorSpace: e.outputColorSpace,
              stencilBuffer: S.stencil,
              resolveDepthBuffer: m.ignoreDepthValues === !1,
              resolveStencilBuffer: m.ignoreDepthValues === !1
            }
          );
        }
        y.isXRRenderTarget = !0, this.setFoveation(c), l = null, a = await r.requestReferenceSpace(o), it.setContext(r), it.start(), i.isPresenting = !0, i.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    }, this.getDepthTexture = function() {
      return p.getDepthTexture();
    };
    function O(K) {
      for (let ne = 0; ne < K.removed.length; ne++) {
        const se = K.removed[ne], De = A.indexOf(se);
        De >= 0 && (A[De] = null, C[De].disconnect(se));
      }
      for (let ne = 0; ne < K.added.length; ne++) {
        const se = K.added[ne];
        let De = A.indexOf(se);
        if (De === -1) {
          for (let we = 0; we < C.length; we++)
            if (we >= A.length) {
              A.push(se), De = we;
              break;
            } else if (A[we] === null) {
              A[we] = se, De = we;
              break;
            }
          if (De === -1) break;
        }
        const be = C[De];
        be && be.connect(se);
      }
    }
    const Q = new B(), $ = new B();
    function ce(K, ne, se) {
      Q.setFromMatrixPosition(ne.matrixWorld), $.setFromMatrixPosition(se.matrixWorld);
      const De = Q.distanceTo($), be = ne.projectionMatrix.elements, we = se.projectionMatrix.elements, _t = be[14] / (be[10] - 1), Ve = be[14] / (be[10] + 1), qe = (be[9] + 1) / be[5], Qe = (be[9] - 1) / be[5], Ne = (be[8] - 1) / be[0], ot = (we[8] + 1) / we[0], w = _t * Ne, ut = _t * ot, Xe = De / (-Ne + ot), tt = Xe * -Ne;
      if (ne.matrixWorld.decompose(K.position, K.quaternion, K.scale), K.translateX(tt), K.translateZ(Xe), K.matrixWorld.compose(K.position, K.quaternion, K.scale), K.matrixWorldInverse.copy(K.matrixWorld).invert(), be[10] === -1)
        K.projectionMatrix.copy(ne.projectionMatrix), K.projectionMatrixInverse.copy(ne.projectionMatrixInverse);
      else {
        const Me = _t + Xe, E = Ve + Xe, _ = w - tt, L = ut + (De - tt), q = qe * Ve / E * Me, Z = Qe * Ve / E * Me;
        K.projectionMatrix.makePerspective(_, L, q, Z, Me, E), K.projectionMatrixInverse.copy(K.projectionMatrix).invert();
      }
    }
    function pe(K, ne) {
      ne === null ? K.matrixWorld.copy(K.matrix) : K.matrixWorld.multiplyMatrices(ne.matrixWorld, K.matrix), K.matrixWorldInverse.copy(K.matrixWorld).invert();
    }
    this.updateCamera = function(K) {
      if (r === null) return;
      let ne = K.near, se = K.far;
      p.texture !== null && (p.depthNear > 0 && (ne = p.depthNear), p.depthFar > 0 && (se = p.depthFar)), V.near = Y.near = T.near = ne, V.far = Y.far = T.far = se, (z !== V.near || k !== V.far) && (r.updateRenderState({
        depthNear: V.near,
        depthFar: V.far
      }), z = V.near, k = V.far), V.layers.mask = K.layers.mask | 6, T.layers.mask = V.layers.mask & -5, Y.layers.mask = V.layers.mask & -3;
      const De = K.parent, be = V.cameras;
      pe(V, De);
      for (let we = 0; we < be.length; we++)
        pe(be[we], De);
      be.length === 2 ? ce(V, T, Y) : V.projectionMatrix.copy(T.projectionMatrix), fe(K, V, De);
    };
    function fe(K, ne, se) {
      se === null ? K.matrix.copy(ne.matrixWorld) : (K.matrix.copy(se.matrixWorld), K.matrix.invert(), K.matrix.multiply(ne.matrixWorld)), K.matrix.decompose(K.position, K.quaternion, K.scale), K.updateMatrixWorld(!0), K.projectionMatrix.copy(ne.projectionMatrix), K.projectionMatrixInverse.copy(ne.projectionMatrixInverse), K.isPerspectiveCamera && (K.fov = ro * 2 * Math.atan(1 / K.projectionMatrix.elements[5]), K.zoom = 1);
    }
    this.getCamera = function() {
      return V;
    }, this.getFoveation = function() {
      if (!(u === null && m === null))
        return c;
    }, this.setFoveation = function(K) {
      c = K, u !== null && (u.fixedFoveation = K), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = K);
    }, this.hasDepthSensing = function() {
      return p.texture !== null;
    }, this.getDepthSensingMesh = function() {
      return p.getMesh(V);
    }, this.getCameraTexture = function(K) {
      return h[K];
    };
    let Ie = null;
    function rt(K, ne) {
      if (f = ne.getViewerPose(l || a), g = ne, f !== null) {
        const se = f.views;
        m !== null && (e.setRenderTargetFramebuffer(y, m.framebuffer), e.setRenderTarget(y));
        let De = !1;
        se.length !== V.cameras.length && (V.cameras.length = 0, De = !0);
        for (let Ve = 0; Ve < se.length; Ve++) {
          const qe = se[Ve];
          let Qe = null;
          if (m !== null)
            Qe = m.getViewport(qe);
          else {
            const ot = d.getViewSubImage(u, qe);
            Qe = ot.viewport, Ve === 0 && (e.setRenderTargetTextures(
              y,
              ot.colorTexture,
              ot.depthStencilTexture
            ), e.setRenderTarget(y));
          }
          let Ne = R[Ve];
          Ne === void 0 && (Ne = new Jt(), Ne.layers.enable(Ve), Ne.viewport = new ct(), R[Ve] = Ne), Ne.matrix.fromArray(qe.transform.matrix), Ne.matrix.decompose(Ne.position, Ne.quaternion, Ne.scale), Ne.projectionMatrix.fromArray(qe.projectionMatrix), Ne.projectionMatrixInverse.copy(Ne.projectionMatrix).invert(), Ne.viewport.set(Qe.x, Qe.y, Qe.width, Qe.height), Ve === 0 && (V.matrix.copy(Ne.matrix), V.matrix.decompose(V.position, V.quaternion, V.scale)), De === !0 && V.cameras.push(Ne);
        }
        const be = r.enabledFeatures;
        if (be && be.includes("depth-sensing") && r.depthUsage == "gpu-optimized" && M) {
          d = i.getBinding();
          const Ve = d.getDepthInformation(se[0]);
          Ve && Ve.isValid && Ve.texture && p.init(Ve, r.renderState);
        }
        if (be && be.includes("camera-access") && M) {
          e.state.unbindTexture(), d = i.getBinding();
          for (let Ve = 0; Ve < se.length; Ve++) {
            const qe = se[Ve].camera;
            if (qe) {
              let Qe = h[qe];
              Qe || (Qe = new tu(), h[qe] = Qe);
              const Ne = d.getCameraImage(qe);
              Qe.sourceTexture = Ne;
            }
          }
        }
      }
      for (let se = 0; se < C.length; se++) {
        const De = A[se], be = C[se];
        De !== null && be !== void 0 && be.update(De, ne, l || a);
      }
      Ie && Ie(K, ne), ne.detectedPlanes && i.dispatchEvent({ type: "planesdetected", data: ne }), g = null;
    }
    const it = new ru();
    it.setAnimationLoop(rt), this.setAnimationLoop = function(K) {
      Ie = K;
    }, this.dispose = function() {
    };
  }
}
const di = /* @__PURE__ */ new zn(), kg = /* @__PURE__ */ new ht();
function Wg(n, e) {
  function t(p, h) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), h.value.copy(p.matrix);
  }
  function i(p, h) {
    h.color.getRGB(p.fogColor.value, nu(n)), h.isFog ? (p.fogNear.value = h.near, p.fogFar.value = h.far) : h.isFogExp2 && (p.fogDensity.value = h.density);
  }
  function r(p, h, S, b, y) {
    h.isMeshBasicMaterial ? s(p, h) : h.isMeshLambertMaterial ? (s(p, h), h.envMap && (p.envMapIntensity.value = h.envMapIntensity)) : h.isMeshToonMaterial ? (s(p, h), d(p, h)) : h.isMeshPhongMaterial ? (s(p, h), f(p, h), h.envMap && (p.envMapIntensity.value = h.envMapIntensity)) : h.isMeshStandardMaterial ? (s(p, h), u(p, h), h.isMeshPhysicalMaterial && m(p, h, y)) : h.isMeshMatcapMaterial ? (s(p, h), g(p, h)) : h.isMeshDepthMaterial ? s(p, h) : h.isMeshDistanceMaterial ? (s(p, h), M(p, h)) : h.isMeshNormalMaterial ? s(p, h) : h.isLineBasicMaterial ? (a(p, h), h.isLineDashedMaterial && o(p, h)) : h.isPointsMaterial ? c(p, h, S, b) : h.isSpriteMaterial ? l(p, h) : h.isShadowMaterial ? (p.color.value.copy(h.color), p.opacity.value = h.opacity) : h.isShaderMaterial && (h.uniformsNeedUpdate = !1);
  }
  function s(p, h) {
    p.opacity.value = h.opacity, h.color && p.diffuse.value.copy(h.color), h.emissive && p.emissive.value.copy(h.emissive).multiplyScalar(h.emissiveIntensity), h.map && (p.map.value = h.map, t(h.map, p.mapTransform)), h.alphaMap && (p.alphaMap.value = h.alphaMap, t(h.alphaMap, p.alphaMapTransform)), h.bumpMap && (p.bumpMap.value = h.bumpMap, t(h.bumpMap, p.bumpMapTransform), p.bumpScale.value = h.bumpScale, h.side === It && (p.bumpScale.value *= -1)), h.normalMap && (p.normalMap.value = h.normalMap, t(h.normalMap, p.normalMapTransform), p.normalScale.value.copy(h.normalScale), h.side === It && p.normalScale.value.negate()), h.displacementMap && (p.displacementMap.value = h.displacementMap, t(h.displacementMap, p.displacementMapTransform), p.displacementScale.value = h.displacementScale, p.displacementBias.value = h.displacementBias), h.emissiveMap && (p.emissiveMap.value = h.emissiveMap, t(h.emissiveMap, p.emissiveMapTransform)), h.specularMap && (p.specularMap.value = h.specularMap, t(h.specularMap, p.specularMapTransform)), h.alphaTest > 0 && (p.alphaTest.value = h.alphaTest);
    const S = e.get(h), b = S.envMap, y = S.envMapRotation;
    b && (p.envMap.value = b, di.copy(y), di.x *= -1, di.y *= -1, di.z *= -1, b.isCubeTexture && b.isRenderTargetTexture === !1 && (di.y *= -1, di.z *= -1), p.envMapRotation.value.setFromMatrix4(kg.makeRotationFromEuler(di)), p.flipEnvMap.value = b.isCubeTexture && b.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = h.reflectivity, p.ior.value = h.ior, p.refractionRatio.value = h.refractionRatio), h.lightMap && (p.lightMap.value = h.lightMap, p.lightMapIntensity.value = h.lightMapIntensity, t(h.lightMap, p.lightMapTransform)), h.aoMap && (p.aoMap.value = h.aoMap, p.aoMapIntensity.value = h.aoMapIntensity, t(h.aoMap, p.aoMapTransform));
  }
  function a(p, h) {
    p.diffuse.value.copy(h.color), p.opacity.value = h.opacity, h.map && (p.map.value = h.map, t(h.map, p.mapTransform));
  }
  function o(p, h) {
    p.dashSize.value = h.dashSize, p.totalSize.value = h.dashSize + h.gapSize, p.scale.value = h.scale;
  }
  function c(p, h, S, b) {
    p.diffuse.value.copy(h.color), p.opacity.value = h.opacity, p.size.value = h.size * S, p.scale.value = b * 0.5, h.map && (p.map.value = h.map, t(h.map, p.uvTransform)), h.alphaMap && (p.alphaMap.value = h.alphaMap, t(h.alphaMap, p.alphaMapTransform)), h.alphaTest > 0 && (p.alphaTest.value = h.alphaTest);
  }
  function l(p, h) {
    p.diffuse.value.copy(h.color), p.opacity.value = h.opacity, p.rotation.value = h.rotation, h.map && (p.map.value = h.map, t(h.map, p.mapTransform)), h.alphaMap && (p.alphaMap.value = h.alphaMap, t(h.alphaMap, p.alphaMapTransform)), h.alphaTest > 0 && (p.alphaTest.value = h.alphaTest);
  }
  function f(p, h) {
    p.specular.value.copy(h.specular), p.shininess.value = Math.max(h.shininess, 1e-4);
  }
  function d(p, h) {
    h.gradientMap && (p.gradientMap.value = h.gradientMap);
  }
  function u(p, h) {
    p.metalness.value = h.metalness, h.metalnessMap && (p.metalnessMap.value = h.metalnessMap, t(h.metalnessMap, p.metalnessMapTransform)), p.roughness.value = h.roughness, h.roughnessMap && (p.roughnessMap.value = h.roughnessMap, t(h.roughnessMap, p.roughnessMapTransform)), h.envMap && (p.envMapIntensity.value = h.envMapIntensity);
  }
  function m(p, h, S) {
    p.ior.value = h.ior, h.sheen > 0 && (p.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen), p.sheenRoughness.value = h.sheenRoughness, h.sheenColorMap && (p.sheenColorMap.value = h.sheenColorMap, t(h.sheenColorMap, p.sheenColorMapTransform)), h.sheenRoughnessMap && (p.sheenRoughnessMap.value = h.sheenRoughnessMap, t(h.sheenRoughnessMap, p.sheenRoughnessMapTransform))), h.clearcoat > 0 && (p.clearcoat.value = h.clearcoat, p.clearcoatRoughness.value = h.clearcoatRoughness, h.clearcoatMap && (p.clearcoatMap.value = h.clearcoatMap, t(h.clearcoatMap, p.clearcoatMapTransform)), h.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = h.clearcoatRoughnessMap, t(h.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), h.clearcoatNormalMap && (p.clearcoatNormalMap.value = h.clearcoatNormalMap, t(h.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(h.clearcoatNormalScale), h.side === It && p.clearcoatNormalScale.value.negate())), h.dispersion > 0 && (p.dispersion.value = h.dispersion), h.iridescence > 0 && (p.iridescence.value = h.iridescence, p.iridescenceIOR.value = h.iridescenceIOR, p.iridescenceThicknessMinimum.value = h.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = h.iridescenceThicknessRange[1], h.iridescenceMap && (p.iridescenceMap.value = h.iridescenceMap, t(h.iridescenceMap, p.iridescenceMapTransform)), h.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = h.iridescenceThicknessMap, t(h.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), h.transmission > 0 && (p.transmission.value = h.transmission, p.transmissionSamplerMap.value = S.texture, p.transmissionSamplerSize.value.set(S.width, S.height), h.transmissionMap && (p.transmissionMap.value = h.transmissionMap, t(h.transmissionMap, p.transmissionMapTransform)), p.thickness.value = h.thickness, h.thicknessMap && (p.thicknessMap.value = h.thicknessMap, t(h.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = h.attenuationDistance, p.attenuationColor.value.copy(h.attenuationColor)), h.anisotropy > 0 && (p.anisotropyVector.value.set(h.anisotropy * Math.cos(h.anisotropyRotation), h.anisotropy * Math.sin(h.anisotropyRotation)), h.anisotropyMap && (p.anisotropyMap.value = h.anisotropyMap, t(h.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = h.specularIntensity, p.specularColor.value.copy(h.specularColor), h.specularColorMap && (p.specularColorMap.value = h.specularColorMap, t(h.specularColorMap, p.specularColorMapTransform)), h.specularIntensityMap && (p.specularIntensityMap.value = h.specularIntensityMap, t(h.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function g(p, h) {
    h.matcap && (p.matcap.value = h.matcap);
  }
  function M(p, h) {
    const S = e.get(h).light;
    p.referencePosition.value.setFromMatrixPosition(S.matrixWorld), p.nearDistance.value = S.shadow.camera.near, p.farDistance.value = S.shadow.camera.far;
  }
  return {
    refreshFogUniforms: i,
    refreshMaterialUniforms: r
  };
}
function Xg(n, e, t, i) {
  let r = {}, s = {}, a = [];
  const o = n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);
  function c(S, b) {
    const y = b.program;
    i.uniformBlockBinding(S, y);
  }
  function l(S, b) {
    let y = r[S.id];
    y === void 0 && (g(S), y = f(S), r[S.id] = y, S.addEventListener("dispose", p));
    const C = b.program;
    i.updateUBOMapping(S, C);
    const A = e.render.frame;
    s[S.id] !== A && (u(S), s[S.id] = A);
  }
  function f(S) {
    const b = d();
    S.__bindingPointIndex = b;
    const y = n.createBuffer(), C = S.__size, A = S.usage;
    return n.bindBuffer(n.UNIFORM_BUFFER, y), n.bufferData(n.UNIFORM_BUFFER, C, A), n.bindBuffer(n.UNIFORM_BUFFER, null), n.bindBufferBase(n.UNIFORM_BUFFER, b, y), y;
  }
  function d() {
    for (let S = 0; S < o; S++)
      if (a.indexOf(S) === -1)
        return a.push(S), S;
    return We("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function u(S) {
    const b = r[S.id], y = S.uniforms, C = S.__cache;
    n.bindBuffer(n.UNIFORM_BUFFER, b);
    for (let A = 0, D = y.length; A < D; A++) {
      const v = Array.isArray(y[A]) ? y[A] : [y[A]];
      for (let T = 0, Y = v.length; T < Y; T++) {
        const R = v[T];
        if (m(R, A, T, C) === !0) {
          const V = R.__offset, z = Array.isArray(R.value) ? R.value : [R.value];
          let k = 0;
          for (let G = 0; G < z.length; G++) {
            const F = z[G], O = M(F);
            typeof F == "number" || typeof F == "boolean" ? (R.__data[0] = F, n.bufferSubData(n.UNIFORM_BUFFER, V + k, R.__data)) : F.isMatrix3 ? (R.__data[0] = F.elements[0], R.__data[1] = F.elements[1], R.__data[2] = F.elements[2], R.__data[3] = 0, R.__data[4] = F.elements[3], R.__data[5] = F.elements[4], R.__data[6] = F.elements[5], R.__data[7] = 0, R.__data[8] = F.elements[6], R.__data[9] = F.elements[7], R.__data[10] = F.elements[8], R.__data[11] = 0) : (F.toArray(R.__data, k), k += O.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          n.bufferSubData(n.UNIFORM_BUFFER, V, R.__data);
        }
      }
    }
    n.bindBuffer(n.UNIFORM_BUFFER, null);
  }
  function m(S, b, y, C) {
    const A = S.value, D = b + "_" + y;
    if (C[D] === void 0)
      return typeof A == "number" || typeof A == "boolean" ? C[D] = A : C[D] = A.clone(), !0;
    {
      const v = C[D];
      if (typeof A == "number" || typeof A == "boolean") {
        if (v !== A)
          return C[D] = A, !0;
      } else if (v.equals(A) === !1)
        return v.copy(A), !0;
    }
    return !1;
  }
  function g(S) {
    const b = S.uniforms;
    let y = 0;
    const C = 16;
    for (let D = 0, v = b.length; D < v; D++) {
      const T = Array.isArray(b[D]) ? b[D] : [b[D]];
      for (let Y = 0, R = T.length; Y < R; Y++) {
        const V = T[Y], z = Array.isArray(V.value) ? V.value : [V.value];
        for (let k = 0, G = z.length; k < G; k++) {
          const F = z[k], O = M(F), Q = y % C, $ = Q % O.boundary, ce = Q + $;
          y += $, ce !== 0 && C - ce < O.storage && (y += C - ce), V.__data = new Float32Array(O.storage / Float32Array.BYTES_PER_ELEMENT), V.__offset = y, y += O.storage;
        }
      }
    }
    const A = y % C;
    return A > 0 && (y += C - A), S.__size = y, S.__cache = {}, this;
  }
  function M(S) {
    const b = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof S == "number" || typeof S == "boolean" ? (b.boundary = 4, b.storage = 4) : S.isVector2 ? (b.boundary = 8, b.storage = 8) : S.isVector3 || S.isColor ? (b.boundary = 16, b.storage = 12) : S.isVector4 ? (b.boundary = 16, b.storage = 16) : S.isMatrix3 ? (b.boundary = 48, b.storage = 48) : S.isMatrix4 ? (b.boundary = 64, b.storage = 64) : S.isTexture ? Ce("WebGLRenderer: Texture samplers can not be part of an uniforms group.") : Ce("WebGLRenderer: Unsupported uniform value type.", S), b;
  }
  function p(S) {
    const b = S.target;
    b.removeEventListener("dispose", p);
    const y = a.indexOf(b.__bindingPointIndex);
    a.splice(y, 1), n.deleteBuffer(r[b.id]), delete r[b.id], delete s[b.id];
  }
  function h() {
    for (const S in r)
      n.deleteBuffer(r[S]);
    a = [], r = {}, s = {};
  }
  return {
    bind: c,
    update: l,
    dispose: h
  };
}
const qg = new Uint16Array([
  12469,
  15057,
  12620,
  14925,
  13266,
  14620,
  13807,
  14376,
  14323,
  13990,
  14545,
  13625,
  14713,
  13328,
  14840,
  12882,
  14931,
  12528,
  14996,
  12233,
  15039,
  11829,
  15066,
  11525,
  15080,
  11295,
  15085,
  10976,
  15082,
  10705,
  15073,
  10495,
  13880,
  14564,
  13898,
  14542,
  13977,
  14430,
  14158,
  14124,
  14393,
  13732,
  14556,
  13410,
  14702,
  12996,
  14814,
  12596,
  14891,
  12291,
  14937,
  11834,
  14957,
  11489,
  14958,
  11194,
  14943,
  10803,
  14921,
  10506,
  14893,
  10278,
  14858,
  9960,
  14484,
  14039,
  14487,
  14025,
  14499,
  13941,
  14524,
  13740,
  14574,
  13468,
  14654,
  13106,
  14743,
  12678,
  14818,
  12344,
  14867,
  11893,
  14889,
  11509,
  14893,
  11180,
  14881,
  10751,
  14852,
  10428,
  14812,
  10128,
  14765,
  9754,
  14712,
  9466,
  14764,
  13480,
  14764,
  13475,
  14766,
  13440,
  14766,
  13347,
  14769,
  13070,
  14786,
  12713,
  14816,
  12387,
  14844,
  11957,
  14860,
  11549,
  14868,
  11215,
  14855,
  10751,
  14825,
  10403,
  14782,
  10044,
  14729,
  9651,
  14666,
  9352,
  14599,
  9029,
  14967,
  12835,
  14966,
  12831,
  14963,
  12804,
  14954,
  12723,
  14936,
  12564,
  14917,
  12347,
  14900,
  11958,
  14886,
  11569,
  14878,
  11247,
  14859,
  10765,
  14828,
  10401,
  14784,
  10011,
  14727,
  9600,
  14660,
  9289,
  14586,
  8893,
  14508,
  8533,
  15111,
  12234,
  15110,
  12234,
  15104,
  12216,
  15092,
  12156,
  15067,
  12010,
  15028,
  11776,
  14981,
  11500,
  14942,
  11205,
  14902,
  10752,
  14861,
  10393,
  14812,
  9991,
  14752,
  9570,
  14682,
  9252,
  14603,
  8808,
  14519,
  8445,
  14431,
  8145,
  15209,
  11449,
  15208,
  11451,
  15202,
  11451,
  15190,
  11438,
  15163,
  11384,
  15117,
  11274,
  15055,
  10979,
  14994,
  10648,
  14932,
  10343,
  14871,
  9936,
  14803,
  9532,
  14729,
  9218,
  14645,
  8742,
  14556,
  8381,
  14461,
  8020,
  14365,
  7603,
  15273,
  10603,
  15272,
  10607,
  15267,
  10619,
  15256,
  10631,
  15231,
  10614,
  15182,
  10535,
  15118,
  10389,
  15042,
  10167,
  14963,
  9787,
  14883,
  9447,
  14800,
  9115,
  14710,
  8665,
  14615,
  8318,
  14514,
  7911,
  14411,
  7507,
  14279,
  7198,
  15314,
  9675,
  15313,
  9683,
  15309,
  9712,
  15298,
  9759,
  15277,
  9797,
  15229,
  9773,
  15166,
  9668,
  15084,
  9487,
  14995,
  9274,
  14898,
  8910,
  14800,
  8539,
  14697,
  8234,
  14590,
  7790,
  14479,
  7409,
  14367,
  7067,
  14178,
  6621,
  15337,
  8619,
  15337,
  8631,
  15333,
  8677,
  15325,
  8769,
  15305,
  8871,
  15264,
  8940,
  15202,
  8909,
  15119,
  8775,
  15022,
  8565,
  14916,
  8328,
  14804,
  8009,
  14688,
  7614,
  14569,
  7287,
  14448,
  6888,
  14321,
  6483,
  14088,
  6171,
  15350,
  7402,
  15350,
  7419,
  15347,
  7480,
  15340,
  7613,
  15322,
  7804,
  15287,
  7973,
  15229,
  8057,
  15148,
  8012,
  15046,
  7846,
  14933,
  7611,
  14810,
  7357,
  14682,
  7069,
  14552,
  6656,
  14421,
  6316,
  14251,
  5948,
  14007,
  5528,
  15356,
  5942,
  15356,
  5977,
  15353,
  6119,
  15348,
  6294,
  15332,
  6551,
  15302,
  6824,
  15249,
  7044,
  15171,
  7122,
  15070,
  7050,
  14949,
  6861,
  14818,
  6611,
  14679,
  6349,
  14538,
  6067,
  14398,
  5651,
  14189,
  5311,
  13935,
  4958,
  15359,
  4123,
  15359,
  4153,
  15356,
  4296,
  15353,
  4646,
  15338,
  5160,
  15311,
  5508,
  15263,
  5829,
  15188,
  6042,
  15088,
  6094,
  14966,
  6001,
  14826,
  5796,
  14678,
  5543,
  14527,
  5287,
  14377,
  4985,
  14133,
  4586,
  13869,
  4257,
  15360,
  1563,
  15360,
  1642,
  15358,
  2076,
  15354,
  2636,
  15341,
  3350,
  15317,
  4019,
  15273,
  4429,
  15203,
  4732,
  15105,
  4911,
  14981,
  4932,
  14836,
  4818,
  14679,
  4621,
  14517,
  4386,
  14359,
  4156,
  14083,
  3795,
  13808,
  3437,
  15360,
  122,
  15360,
  137,
  15358,
  285,
  15355,
  636,
  15344,
  1274,
  15322,
  2177,
  15281,
  2765,
  15215,
  3223,
  15120,
  3451,
  14995,
  3569,
  14846,
  3567,
  14681,
  3466,
  14511,
  3305,
  14344,
  3121,
  14037,
  2800,
  13753,
  2467,
  15360,
  0,
  15360,
  1,
  15359,
  21,
  15355,
  89,
  15346,
  253,
  15325,
  479,
  15287,
  796,
  15225,
  1148,
  15133,
  1492,
  15008,
  1749,
  14856,
  1882,
  14685,
  1886,
  14506,
  1783,
  14324,
  1608,
  13996,
  1398,
  13702,
  1183
]);
let on = null;
function Yg() {
  return on === null && (on = new Gh(qg, 16, 16, er, On), on.name = "DFG_LUT", on.minFilter = Rt, on.magFilter = Rt, on.wrapS = Ln, on.wrapT = Ln, on.generateMipmaps = !1, on.needsUpdate = !0), on;
}
class Kg {
  /**
   * Constructs a new WebGL renderer.
   *
   * @param {WebGLRenderer~Options} [parameters] - The configuration parameter.
   */
  constructor(e = {}) {
    const {
      canvas: t = gh(),
      context: i = null,
      depth: r = !0,
      stencil: s = !1,
      alpha: a = !1,
      antialias: o = !1,
      premultipliedAlpha: c = !0,
      preserveDrawingBuffer: l = !1,
      powerPreference: f = "default",
      failIfMajorPerformanceCaveat: d = !1,
      reversedDepthBuffer: u = !1,
      outputBufferType: m = Wt
    } = e;
    this.isWebGLRenderer = !0;
    let g;
    if (i !== null) {
      if (typeof WebGLRenderingContext < "u" && i instanceof WebGLRenderingContext)
        throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");
      g = i.getContextAttributes().alpha;
    } else
      g = a;
    const M = m, p = /* @__PURE__ */ new Set([
      Eo,
      So,
      Mo
    ]), h = /* @__PURE__ */ new Set([
      Wt,
      vn,
      Sr,
      Er,
      vo,
      xo
    ]), S = new Uint32Array(4), b = new Int32Array(4);
    let y = null, C = null;
    const A = [], D = [];
    let v = null;
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled.
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this.toneMapping = dn, this.toneMappingExposure = 1, this.transmissionResolutionScale = 1;
    const T = this;
    let Y = !1;
    this._outputColorSpace = kt;
    let R = 0, V = 0, z = null, k = -1, G = null;
    const F = new ct(), O = new ct();
    let Q = null;
    const $ = new Je(0);
    let ce = 0, pe = t.width, fe = t.height, Ie = 1, rt = null, it = null;
    const K = new ct(0, 0, pe, fe), ne = new ct(0, 0, pe, fe);
    let se = !1;
    const De = new Qc();
    let be = !1, we = !1;
    const _t = new ht(), Ve = new B(), qe = new ct(), Qe = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    let Ne = !1;
    function ot() {
      return z === null ? Ie : 1;
    }
    let w = i;
    function ut(x, I) {
      return t.getContext(x, I);
    }
    try {
      const x = {
        alpha: !0,
        depth: r,
        stencil: s,
        antialias: o,
        premultipliedAlpha: c,
        preserveDrawingBuffer: l,
        powerPreference: f,
        failIfMajorPerformanceCaveat: d
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${_o}`), t.addEventListener("webglcontextlost", ge, !1), t.addEventListener("webglcontextrestored", Re, !1), t.addEventListener("webglcontextcreationerror", nt, !1), w === null) {
        const I = "webgl2";
        if (w = ut(I, x), w === null)
          throw ut(I) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
    } catch (x) {
      throw We("WebGLRenderer: " + x.message), x;
    }
    let Xe, tt, Me, E, _, L, q, Z, X, me, ie, ye, Ae, j, ee, _e, ve, ue, Fe, P, re, te, de;
    function J() {
      Xe = new Km(w), Xe.init(), re = new Bg(w, Xe), tt = new Vm(w, Xe, e, re), Me = new Fg(w, Xe), tt.reversedDepthBuffer && u && Me.buffers.depth.setReversed(!0), E = new jm(w), _ = new Eg(), L = new Og(w, Xe, Me, _, tt, re, E), q = new Ym(T), Z = new nd(w), te = new Bm(w, Z), X = new Zm(w, Z, E, te), me = new Qm(w, X, Z, te, E), ue = new Jm(w, tt, L), ee = new Gm(_), ie = new Sg(T, q, Xe, tt, te, ee), ye = new Wg(T, _), Ae = new yg(), j = new Pg(Xe), ve = new Om(T, q, Me, me, g, c), _e = new Ng(T, me, tt), de = new Xg(w, E, tt, Me), Fe = new zm(w, Xe, E), P = new $m(w, Xe, E), E.programs = ie.programs, T.capabilities = tt, T.extensions = Xe, T.properties = _, T.renderLists = Ae, T.shadowMap = _e, T.state = Me, T.info = E;
    }
    J(), M !== Wt && (v = new t_(M, t.width, t.height, r, s));
    const W = new Hg(T, w);
    this.xr = W, this.getContext = function() {
      return w;
    }, this.getContextAttributes = function() {
      return w.getContextAttributes();
    }, this.forceContextLoss = function() {
      const x = Xe.get("WEBGL_lose_context");
      x && x.loseContext();
    }, this.forceContextRestore = function() {
      const x = Xe.get("WEBGL_lose_context");
      x && x.restoreContext();
    }, this.getPixelRatio = function() {
      return Ie;
    }, this.setPixelRatio = function(x) {
      x !== void 0 && (Ie = x, this.setSize(pe, fe, !1));
    }, this.getSize = function(x) {
      return x.set(pe, fe);
    }, this.setSize = function(x, I, H = !0) {
      if (W.isPresenting) {
        Ce("WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      pe = x, fe = I, t.width = Math.floor(x * Ie), t.height = Math.floor(I * Ie), H === !0 && (t.style.width = x + "px", t.style.height = I + "px"), v !== null && v.setSize(t.width, t.height), this.setViewport(0, 0, x, I);
    }, this.getDrawingBufferSize = function(x) {
      return x.set(pe * Ie, fe * Ie).floor();
    }, this.setDrawingBufferSize = function(x, I, H) {
      pe = x, fe = I, Ie = H, t.width = Math.floor(x * H), t.height = Math.floor(I * H), this.setViewport(0, 0, x, I);
    }, this.setEffects = function(x) {
      if (M === Wt) {
        console.error("THREE.WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");
        return;
      }
      if (x) {
        for (let I = 0; I < x.length; I++)
          if (x[I].isOutputPass === !0) {
            console.warn("THREE.WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");
            break;
          }
      }
      v.setEffects(x || []);
    }, this.getCurrentViewport = function(x) {
      return x.copy(F);
    }, this.getViewport = function(x) {
      return x.copy(K);
    }, this.setViewport = function(x, I, H, N) {
      x.isVector4 ? K.set(x.x, x.y, x.z, x.w) : K.set(x, I, H, N), Me.viewport(F.copy(K).multiplyScalar(Ie).round());
    }, this.getScissor = function(x) {
      return x.copy(ne);
    }, this.setScissor = function(x, I, H, N) {
      x.isVector4 ? ne.set(x.x, x.y, x.z, x.w) : ne.set(x, I, H, N), Me.scissor(O.copy(ne).multiplyScalar(Ie).round());
    }, this.getScissorTest = function() {
      return se;
    }, this.setScissorTest = function(x) {
      Me.setScissorTest(se = x);
    }, this.setOpaqueSort = function(x) {
      rt = x;
    }, this.setTransparentSort = function(x) {
      it = x;
    }, this.getClearColor = function(x) {
      return x.copy(ve.getClearColor());
    }, this.setClearColor = function() {
      ve.setClearColor(...arguments);
    }, this.getClearAlpha = function() {
      return ve.getClearAlpha();
    }, this.setClearAlpha = function() {
      ve.setClearAlpha(...arguments);
    }, this.clear = function(x = !0, I = !0, H = !0) {
      let N = 0;
      if (x) {
        let U = !1;
        if (z !== null) {
          const oe = z.texture.format;
          U = p.has(oe);
        }
        if (U) {
          const oe = z.texture.type, he = h.has(oe), le = ve.getClearColor(), xe = ve.getClearAlpha(), Ee = le.r, Pe = le.g, Oe = le.b;
          he ? (S[0] = Ee, S[1] = Pe, S[2] = Oe, S[3] = xe, w.clearBufferuiv(w.COLOR, 0, S)) : (b[0] = Ee, b[1] = Pe, b[2] = Oe, b[3] = xe, w.clearBufferiv(w.COLOR, 0, b));
        } else
          N |= w.COLOR_BUFFER_BIT;
      }
      I && (N |= w.DEPTH_BUFFER_BIT), H && (N |= w.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), N !== 0 && w.clear(N);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", ge, !1), t.removeEventListener("webglcontextrestored", Re, !1), t.removeEventListener("webglcontextcreationerror", nt, !1), ve.dispose(), Ae.dispose(), j.dispose(), _.dispose(), q.dispose(), me.dispose(), te.dispose(), de.dispose(), ie.dispose(), W.dispose(), W.removeEventListener("sessionstart", Co), W.removeEventListener("sessionend", Po), si.stop();
    };
    function ge(x) {
      x.preventDefault(), il("WebGLRenderer: Context Lost."), Y = !0;
    }
    function Re() {
      il("WebGLRenderer: Context Restored."), Y = !1;
      const x = E.autoReset, I = _e.enabled, H = _e.autoUpdate, N = _e.needsUpdate, U = _e.type;
      J(), E.autoReset = x, _e.enabled = I, _e.autoUpdate = H, _e.needsUpdate = N, _e.type = U;
    }
    function nt(x) {
      We("WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function Ye(x) {
      const I = x.target;
      I.removeEventListener("dispose", Ye), Mn(I);
    }
    function Mn(x) {
      Sn(x), _.remove(x);
    }
    function Sn(x) {
      const I = _.get(x).programs;
      I !== void 0 && (I.forEach(function(H) {
        ie.releaseProgram(H);
      }), x.isShaderMaterial && ie.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, I, H, N, U, oe) {
      I === null && (I = Qe);
      const he = U.isMesh && U.matrixWorld.determinant() < 0, le = fu(x, I, H, N, U);
      Me.setMaterial(N, he);
      let xe = H.index, Ee = 1;
      if (N.wireframe === !0) {
        if (xe = X.getWireframeAttribute(H), xe === void 0) return;
        Ee = 2;
      }
      const Pe = H.drawRange, Oe = H.attributes.position;
      let Te = Pe.start * Ee, $e = (Pe.start + Pe.count) * Ee;
      oe !== null && (Te = Math.max(Te, oe.start * Ee), $e = Math.min($e, (oe.start + oe.count) * Ee)), xe !== null ? (Te = Math.max(Te, 0), $e = Math.min($e, xe.count)) : Oe != null && (Te = Math.max(Te, 0), $e = Math.min($e, Oe.count));
      const lt = $e - Te;
      if (lt < 0 || lt === 1 / 0) return;
      te.setup(U, N, le, H, xe);
      let st, je = Fe;
      if (xe !== null && (st = Z.get(xe), je = P, je.setIndex(st)), U.isMesh)
        N.wireframe === !0 ? (Me.setLineWidth(N.wireframeLinewidth * ot()), je.setMode(w.LINES)) : je.setMode(w.TRIANGLES);
      else if (U.isLine) {
        let bt = N.linewidth;
        bt === void 0 && (bt = 1), Me.setLineWidth(bt * ot()), U.isLineSegments ? je.setMode(w.LINES) : U.isLineLoop ? je.setMode(w.LINE_LOOP) : je.setMode(w.LINE_STRIP);
      } else U.isPoints ? je.setMode(w.POINTS) : U.isSprite && je.setMode(w.TRIANGLES);
      if (U.isBatchedMesh)
        if (U._multiDrawInstances !== null)
          xs("WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."), je.renderMultiDrawInstances(U._multiDrawStarts, U._multiDrawCounts, U._multiDrawCount, U._multiDrawInstances);
        else if (Xe.get("WEBGL_multi_draw"))
          je.renderMultiDraw(U._multiDrawStarts, U._multiDrawCounts, U._multiDrawCount);
        else {
          const bt = U._multiDrawStarts, Se = U._multiDrawCounts, Ft = U._multiDrawCount, ke = xe ? Z.get(xe).bytesPerElement : 1, Kt = _.get(N).currentProgram.getUniforms();
          for (let sn = 0; sn < Ft; sn++)
            Kt.setValue(w, "_gl_DrawID", sn), je.render(bt[sn] / ke, Se[sn]);
        }
      else if (U.isInstancedMesh)
        je.renderInstances(Te, lt, U.count);
      else if (H.isInstancedBufferGeometry) {
        const bt = H._maxInstanceCount !== void 0 ? H._maxInstanceCount : 1 / 0, Se = Math.min(H.instanceCount, bt);
        je.renderInstances(Te, lt, Se);
      } else
        je.render(Te, lt);
    };
    function Ro(x, I, H) {
      x.transparent === !0 && x.side === Dn && x.forceSinglePass === !1 ? (x.side = It, x.needsUpdate = !0, Pr(x, I, H), x.side = ii, x.needsUpdate = !0, Pr(x, I, H), x.side = Dn) : Pr(x, I, H);
    }
    this.compile = function(x, I, H = null) {
      H === null && (H = x), C = j.get(H), C.init(I), D.push(C), H.traverseVisible(function(U) {
        U.isLight && U.layers.test(I.layers) && (C.pushLight(U), U.castShadow && C.pushShadow(U));
      }), x !== H && x.traverseVisible(function(U) {
        U.isLight && U.layers.test(I.layers) && (C.pushLight(U), U.castShadow && C.pushShadow(U));
      }), C.setupLights();
      const N = /* @__PURE__ */ new Set();
      return x.traverse(function(U) {
        if (!(U.isMesh || U.isPoints || U.isLine || U.isSprite))
          return;
        const oe = U.material;
        if (oe)
          if (Array.isArray(oe))
            for (let he = 0; he < oe.length; he++) {
              const le = oe[he];
              Ro(le, H, U), N.add(le);
            }
          else
            Ro(oe, H, U), N.add(oe);
      }), C = D.pop(), N;
    }, this.compileAsync = function(x, I, H = null) {
      const N = this.compile(x, I, H);
      return new Promise((U) => {
        function oe() {
          if (N.forEach(function(he) {
            _.get(he).currentProgram.isReady() && N.delete(he);
          }), N.size === 0) {
            U(x);
            return;
          }
          setTimeout(oe, 10);
        }
        Xe.get("KHR_parallel_shader_compile") !== null ? oe() : setTimeout(oe, 10);
      });
    };
    let As = null;
    function uu(x) {
      As && As(x);
    }
    function Co() {
      si.stop();
    }
    function Po() {
      si.start();
    }
    const si = new ru();
    si.setAnimationLoop(uu), typeof self < "u" && si.setContext(self), this.setAnimationLoop = function(x) {
      As = x, W.setAnimationLoop(x), x === null ? si.stop() : si.start();
    }, W.addEventListener("sessionstart", Co), W.addEventListener("sessionend", Po), this.render = function(x, I) {
      if (I !== void 0 && I.isCamera !== !0) {
        We("WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (Y === !0) return;
      const H = W.enabled === !0 && W.isPresenting === !0, N = v !== null && (z === null || H) && v.begin(T, z);
      if (x.matrixWorldAutoUpdate === !0 && x.updateMatrixWorld(), I.parent === null && I.matrixWorldAutoUpdate === !0 && I.updateMatrixWorld(), W.enabled === !0 && W.isPresenting === !0 && (v === null || v.isCompositing() === !1) && (W.cameraAutoUpdate === !0 && W.updateCamera(I), I = W.getCamera()), x.isScene === !0 && x.onBeforeRender(T, x, I, z), C = j.get(x, D.length), C.init(I), D.push(C), _t.multiplyMatrices(I.projectionMatrix, I.matrixWorldInverse), De.setFromProjectionMatrix(_t, un, I.reversedDepth), we = this.localClippingEnabled, be = ee.init(this.clippingPlanes, we), y = Ae.get(x, A.length), y.init(), A.push(y), W.enabled === !0 && W.isPresenting === !0) {
        const he = T.xr.getDepthSensingMesh();
        he !== null && ws(he, I, -1 / 0, T.sortObjects);
      }
      ws(x, I, 0, T.sortObjects), y.finish(), T.sortObjects === !0 && y.sort(rt, it), Ne = W.enabled === !1 || W.isPresenting === !1 || W.hasDepthSensing() === !1, Ne && ve.addToRenderList(y, x), this.info.render.frame++, be === !0 && ee.beginShadows();
      const U = C.state.shadowsArray;
      if (_e.render(U, x, I), be === !0 && ee.endShadows(), this.info.autoReset === !0 && this.info.reset(), (N && v.hasRenderPass()) === !1) {
        const he = y.opaque, le = y.transmissive;
        if (C.setupLights(), I.isArrayCamera) {
          const xe = I.cameras;
          if (le.length > 0)
            for (let Ee = 0, Pe = xe.length; Ee < Pe; Ee++) {
              const Oe = xe[Ee];
              Lo(he, le, x, Oe);
            }
          Ne && ve.render(x);
          for (let Ee = 0, Pe = xe.length; Ee < Pe; Ee++) {
            const Oe = xe[Ee];
            Do(y, x, Oe, Oe.viewport);
          }
        } else
          le.length > 0 && Lo(he, le, x, I), Ne && ve.render(x), Do(y, x, I);
      }
      z !== null && V === 0 && (L.updateMultisampleRenderTarget(z), L.updateRenderTargetMipmap(z)), N && v.end(T), x.isScene === !0 && x.onAfterRender(T, x, I), te.resetDefaultState(), k = -1, G = null, D.pop(), D.length > 0 ? (C = D[D.length - 1], be === !0 && ee.setGlobalState(T.clippingPlanes, C.state.camera)) : C = null, A.pop(), A.length > 0 ? y = A[A.length - 1] : y = null;
    };
    function ws(x, I, H, N) {
      if (x.visible === !1) return;
      if (x.layers.test(I.layers)) {
        if (x.isGroup)
          H = x.renderOrder;
        else if (x.isLOD)
          x.autoUpdate === !0 && x.update(I);
        else if (x.isLight)
          C.pushLight(x), x.castShadow && C.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || De.intersectsSprite(x)) {
            N && qe.setFromMatrixPosition(x.matrixWorld).applyMatrix4(_t);
            const he = me.update(x), le = x.material;
            le.visible && y.push(x, he, le, H, qe.z, null);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || De.intersectsObject(x))) {
          const he = me.update(x), le = x.material;
          if (N && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), qe.copy(x.boundingSphere.center)) : (he.boundingSphere === null && he.computeBoundingSphere(), qe.copy(he.boundingSphere.center)), qe.applyMatrix4(x.matrixWorld).applyMatrix4(_t)), Array.isArray(le)) {
            const xe = he.groups;
            for (let Ee = 0, Pe = xe.length; Ee < Pe; Ee++) {
              const Oe = xe[Ee], Te = le[Oe.materialIndex];
              Te && Te.visible && y.push(x, he, Te, H, qe.z, Oe);
            }
          } else le.visible && y.push(x, he, le, H, qe.z, null);
        }
      }
      const oe = x.children;
      for (let he = 0, le = oe.length; he < le; he++)
        ws(oe[he], I, H, N);
    }
    function Do(x, I, H, N) {
      const { opaque: U, transmissive: oe, transparent: he } = x;
      C.setupLightsView(H), be === !0 && ee.setGlobalState(T.clippingPlanes, H), N && Me.viewport(F.copy(N)), U.length > 0 && Cr(U, I, H), oe.length > 0 && Cr(oe, I, H), he.length > 0 && Cr(he, I, H), Me.buffers.depth.setTest(!0), Me.buffers.depth.setMask(!0), Me.buffers.color.setMask(!0), Me.setPolygonOffset(!1);
    }
    function Lo(x, I, H, N) {
      if ((H.isScene === !0 ? H.overrideMaterial : null) !== null)
        return;
      if (C.state.transmissionRenderTarget[N.id] === void 0) {
        const Te = Xe.has("EXT_color_buffer_half_float") || Xe.has("EXT_color_buffer_float");
        C.state.transmissionRenderTarget[N.id] = new pn(1, 1, {
          generateMipmaps: !0,
          type: Te ? On : Wt,
          minFilter: vi,
          samples: Math.max(4, tt.samples),
          // to avoid feedback loops, the transmission render target requires a resolve, see #26177
          stencilBuffer: s,
          resolveDepthBuffer: !1,
          resolveStencilBuffer: !1,
          colorSpace: Ge.workingColorSpace
        });
      }
      const oe = C.state.transmissionRenderTarget[N.id], he = N.viewport || F;
      oe.setSize(he.z * T.transmissionResolutionScale, he.w * T.transmissionResolutionScale);
      const le = T.getRenderTarget(), xe = T.getActiveCubeFace(), Ee = T.getActiveMipmapLevel();
      T.setRenderTarget(oe), T.getClearColor($), ce = T.getClearAlpha(), ce < 1 && T.setClearColor(16777215, 0.5), T.clear(), Ne && ve.render(H);
      const Pe = T.toneMapping;
      T.toneMapping = dn;
      const Oe = N.viewport;
      if (N.viewport !== void 0 && (N.viewport = void 0), C.setupLightsView(N), be === !0 && ee.setGlobalState(T.clippingPlanes, N), Cr(x, H, N), L.updateMultisampleRenderTarget(oe), L.updateRenderTargetMipmap(oe), Xe.has("WEBGL_multisampled_render_to_texture") === !1) {
        let Te = !1;
        for (let $e = 0, lt = I.length; $e < lt; $e++) {
          const st = I[$e], { object: je, geometry: bt, material: Se, group: Ft } = st;
          if (Se.side === Dn && je.layers.test(N.layers)) {
            const ke = Se.side;
            Se.side = It, Se.needsUpdate = !0, Io(je, H, N, bt, Se, Ft), Se.side = ke, Se.needsUpdate = !0, Te = !0;
          }
        }
        Te === !0 && (L.updateMultisampleRenderTarget(oe), L.updateRenderTargetMipmap(oe));
      }
      T.setRenderTarget(le, xe, Ee), T.setClearColor($, ce), Oe !== void 0 && (N.viewport = Oe), T.toneMapping = Pe;
    }
    function Cr(x, I, H) {
      const N = I.isScene === !0 ? I.overrideMaterial : null;
      for (let U = 0, oe = x.length; U < oe; U++) {
        const he = x[U], { object: le, geometry: xe, group: Ee } = he;
        let Pe = he.material;
        Pe.allowOverride === !0 && N !== null && (Pe = N), le.layers.test(H.layers) && Io(le, I, H, xe, Pe, Ee);
      }
    }
    function Io(x, I, H, N, U, oe) {
      x.onBeforeRender(T, I, H, N, U, oe), x.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), U.onBeforeRender(T, I, H, N, x, oe), U.transparent === !0 && U.side === Dn && U.forceSinglePass === !1 ? (U.side = It, U.needsUpdate = !0, T.renderBufferDirect(H, I, N, U, x, oe), U.side = ii, U.needsUpdate = !0, T.renderBufferDirect(H, I, N, U, x, oe), U.side = Dn) : T.renderBufferDirect(H, I, N, U, x, oe), x.onAfterRender(T, I, H, N, U, oe);
    }
    function Pr(x, I, H) {
      I.isScene !== !0 && (I = Qe);
      const N = _.get(x), U = C.state.lights, oe = C.state.shadowsArray, he = U.state.version, le = ie.getParameters(x, U.state, oe, I, H), xe = ie.getProgramCacheKey(le);
      let Ee = N.programs;
      N.environment = x.isMeshStandardMaterial || x.isMeshLambertMaterial || x.isMeshPhongMaterial ? I.environment : null, N.fog = I.fog;
      const Pe = x.isMeshStandardMaterial || x.isMeshLambertMaterial && !x.envMap || x.isMeshPhongMaterial && !x.envMap;
      N.envMap = q.get(x.envMap || N.environment, Pe), N.envMapRotation = N.environment !== null && x.envMap === null ? I.environmentRotation : x.envMapRotation, Ee === void 0 && (x.addEventListener("dispose", Ye), Ee = /* @__PURE__ */ new Map(), N.programs = Ee);
      let Oe = Ee.get(xe);
      if (Oe !== void 0) {
        if (N.currentProgram === Oe && N.lightsStateVersion === he)
          return No(x, le), Oe;
      } else
        le.uniforms = ie.getUniforms(x), x.onBeforeCompile(le, T), Oe = ie.acquireProgram(le, xe), Ee.set(xe, Oe), N.uniforms = le.uniforms;
      const Te = N.uniforms;
      return (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === !0) && (Te.clippingPlanes = ee.uniform), No(x, le), N.needsLights = du(x), N.lightsStateVersion = he, N.needsLights && (Te.ambientLightColor.value = U.state.ambient, Te.lightProbe.value = U.state.probe, Te.directionalLights.value = U.state.directional, Te.directionalLightShadows.value = U.state.directionalShadow, Te.spotLights.value = U.state.spot, Te.spotLightShadows.value = U.state.spotShadow, Te.rectAreaLights.value = U.state.rectArea, Te.ltc_1.value = U.state.rectAreaLTC1, Te.ltc_2.value = U.state.rectAreaLTC2, Te.pointLights.value = U.state.point, Te.pointLightShadows.value = U.state.pointShadow, Te.hemisphereLights.value = U.state.hemi, Te.directionalShadowMatrix.value = U.state.directionalShadowMatrix, Te.spotLightMatrix.value = U.state.spotLightMatrix, Te.spotLightMap.value = U.state.spotLightMap, Te.pointShadowMatrix.value = U.state.pointShadowMatrix), N.currentProgram = Oe, N.uniformsList = null, Oe;
    }
    function Uo(x) {
      if (x.uniformsList === null) {
        const I = x.currentProgram.getUniforms();
        x.uniformsList = hs.seqWithValue(I.seq, x.uniforms);
      }
      return x.uniformsList;
    }
    function No(x, I) {
      const H = _.get(x);
      H.outputColorSpace = I.outputColorSpace, H.batching = I.batching, H.batchingColor = I.batchingColor, H.instancing = I.instancing, H.instancingColor = I.instancingColor, H.instancingMorph = I.instancingMorph, H.skinning = I.skinning, H.morphTargets = I.morphTargets, H.morphNormals = I.morphNormals, H.morphColors = I.morphColors, H.morphTargetsCount = I.morphTargetsCount, H.numClippingPlanes = I.numClippingPlanes, H.numIntersection = I.numClipIntersection, H.vertexAlphas = I.vertexAlphas, H.vertexTangents = I.vertexTangents, H.toneMapping = I.toneMapping;
    }
    function fu(x, I, H, N, U) {
      I.isScene !== !0 && (I = Qe), L.resetTextureUnits();
      const oe = I.fog, he = N.isMeshStandardMaterial || N.isMeshLambertMaterial || N.isMeshPhongMaterial ? I.environment : null, le = z === null ? T.outputColorSpace : z.isXRRenderTarget === !0 ? z.texture.colorSpace : tr, xe = N.isMeshStandardMaterial || N.isMeshLambertMaterial && !N.envMap || N.isMeshPhongMaterial && !N.envMap, Ee = q.get(N.envMap || he, xe), Pe = N.vertexColors === !0 && !!H.attributes.color && H.attributes.color.itemSize === 4, Oe = !!H.attributes.tangent && (!!N.normalMap || N.anisotropy > 0), Te = !!H.morphAttributes.position, $e = !!H.morphAttributes.normal, lt = !!H.morphAttributes.color;
      let st = dn;
      N.toneMapped && (z === null || z.isXRRenderTarget === !0) && (st = T.toneMapping);
      const je = H.morphAttributes.position || H.morphAttributes.normal || H.morphAttributes.color, bt = je !== void 0 ? je.length : 0, Se = _.get(N), Ft = C.state.lights;
      if (be === !0 && (we === !0 || x !== G)) {
        const gt = x === G && N.id === k;
        ee.setState(N, x, gt);
      }
      let ke = !1;
      N.version === Se.__version ? (Se.needsLights && Se.lightsStateVersion !== Ft.state.version || Se.outputColorSpace !== le || U.isBatchedMesh && Se.batching === !1 || !U.isBatchedMesh && Se.batching === !0 || U.isBatchedMesh && Se.batchingColor === !0 && U.colorTexture === null || U.isBatchedMesh && Se.batchingColor === !1 && U.colorTexture !== null || U.isInstancedMesh && Se.instancing === !1 || !U.isInstancedMesh && Se.instancing === !0 || U.isSkinnedMesh && Se.skinning === !1 || !U.isSkinnedMesh && Se.skinning === !0 || U.isInstancedMesh && Se.instancingColor === !0 && U.instanceColor === null || U.isInstancedMesh && Se.instancingColor === !1 && U.instanceColor !== null || U.isInstancedMesh && Se.instancingMorph === !0 && U.morphTexture === null || U.isInstancedMesh && Se.instancingMorph === !1 && U.morphTexture !== null || Se.envMap !== Ee || N.fog === !0 && Se.fog !== oe || Se.numClippingPlanes !== void 0 && (Se.numClippingPlanes !== ee.numPlanes || Se.numIntersection !== ee.numIntersection) || Se.vertexAlphas !== Pe || Se.vertexTangents !== Oe || Se.morphTargets !== Te || Se.morphNormals !== $e || Se.morphColors !== lt || Se.toneMapping !== st || Se.morphTargetsCount !== bt) && (ke = !0) : (ke = !0, Se.__version = N.version);
      let Kt = Se.currentProgram;
      ke === !0 && (Kt = Pr(N, I, U));
      let sn = !1, ai = !1, wi = !1;
      const et = Kt.getUniforms(), St = Se.uniforms;
      if (Me.useProgram(Kt.program) && (sn = !0, ai = !0, wi = !0), N.id !== k && (k = N.id, ai = !0), sn || G !== x) {
        Me.buffers.depth.getReversed() && x.reversedDepth !== !0 && (x._reversedDepth = !0, x.updateProjectionMatrix()), et.setValue(w, "projectionMatrix", x.projectionMatrix), et.setValue(w, "viewMatrix", x.matrixWorldInverse);
        const kn = et.map.cameraPosition;
        kn !== void 0 && kn.setValue(w, Ve.setFromMatrixPosition(x.matrixWorld)), tt.logarithmicDepthBuffer && et.setValue(
          w,
          "logDepthBufFC",
          2 / (Math.log(x.far + 1) / Math.LN2)
        ), (N.isMeshPhongMaterial || N.isMeshToonMaterial || N.isMeshLambertMaterial || N.isMeshBasicMaterial || N.isMeshStandardMaterial || N.isShaderMaterial) && et.setValue(w, "isOrthographic", x.isOrthographicCamera === !0), G !== x && (G = x, ai = !0, wi = !0);
      }
      if (Se.needsLights && (Ft.state.directionalShadowMap.length > 0 && et.setValue(w, "directionalShadowMap", Ft.state.directionalShadowMap, L), Ft.state.spotShadowMap.length > 0 && et.setValue(w, "spotShadowMap", Ft.state.spotShadowMap, L), Ft.state.pointShadowMap.length > 0 && et.setValue(w, "pointShadowMap", Ft.state.pointShadowMap, L)), U.isSkinnedMesh) {
        et.setOptional(w, U, "bindMatrix"), et.setOptional(w, U, "bindMatrixInverse");
        const gt = U.skeleton;
        gt && (gt.boneTexture === null && gt.computeBoneTexture(), et.setValue(w, "boneTexture", gt.boneTexture, L));
      }
      U.isBatchedMesh && (et.setOptional(w, U, "batchingTexture"), et.setValue(w, "batchingTexture", U._matricesTexture, L), et.setOptional(w, U, "batchingIdTexture"), et.setValue(w, "batchingIdTexture", U._indirectTexture, L), et.setOptional(w, U, "batchingColorTexture"), U._colorsTexture !== null && et.setValue(w, "batchingColorTexture", U._colorsTexture, L));
      const Hn = H.morphAttributes;
      if ((Hn.position !== void 0 || Hn.normal !== void 0 || Hn.color !== void 0) && ue.update(U, H, Kt), (ai || Se.receiveShadow !== U.receiveShadow) && (Se.receiveShadow = U.receiveShadow, et.setValue(w, "receiveShadow", U.receiveShadow)), (N.isMeshStandardMaterial || N.isMeshLambertMaterial || N.isMeshPhongMaterial) && N.envMap === null && I.environment !== null && (St.envMapIntensity.value = I.environmentIntensity), St.dfgLUT !== void 0 && (St.dfgLUT.value = Yg()), ai && (et.setValue(w, "toneMappingExposure", T.toneMappingExposure), Se.needsLights && hu(St, wi), oe && N.fog === !0 && ye.refreshFogUniforms(St, oe), ye.refreshMaterialUniforms(St, N, Ie, fe, C.state.transmissionRenderTarget[x.id]), hs.upload(w, Uo(Se), St, L)), N.isShaderMaterial && N.uniformsNeedUpdate === !0 && (hs.upload(w, Uo(Se), St, L), N.uniformsNeedUpdate = !1), N.isSpriteMaterial && et.setValue(w, "center", U.center), et.setValue(w, "modelViewMatrix", U.modelViewMatrix), et.setValue(w, "normalMatrix", U.normalMatrix), et.setValue(w, "modelMatrix", U.matrixWorld), N.isShaderMaterial || N.isRawShaderMaterial) {
        const gt = N.uniformsGroups;
        for (let kn = 0, Ri = gt.length; kn < Ri; kn++) {
          const Fo = gt[kn];
          de.update(Fo, Kt), de.bind(Fo, Kt);
        }
      }
      return Kt;
    }
    function hu(x, I) {
      x.ambientLightColor.needsUpdate = I, x.lightProbe.needsUpdate = I, x.directionalLights.needsUpdate = I, x.directionalLightShadows.needsUpdate = I, x.pointLights.needsUpdate = I, x.pointLightShadows.needsUpdate = I, x.spotLights.needsUpdate = I, x.spotLightShadows.needsUpdate = I, x.rectAreaLights.needsUpdate = I, x.hemisphereLights.needsUpdate = I;
    }
    function du(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return R;
    }, this.getActiveMipmapLevel = function() {
      return V;
    }, this.getRenderTarget = function() {
      return z;
    }, this.setRenderTargetTextures = function(x, I, H) {
      const N = _.get(x);
      N.__autoAllocateDepthBuffer = x.resolveDepthBuffer === !1, N.__autoAllocateDepthBuffer === !1 && (N.__useRenderToTexture = !1), _.get(x.texture).__webglTexture = I, _.get(x.depthTexture).__webglTexture = N.__autoAllocateDepthBuffer ? void 0 : H, N.__hasExternalTextures = !0;
    }, this.setRenderTargetFramebuffer = function(x, I) {
      const H = _.get(x);
      H.__webglFramebuffer = I, H.__useDefaultFramebuffer = I === void 0;
    };
    const pu = w.createFramebuffer();
    this.setRenderTarget = function(x, I = 0, H = 0) {
      z = x, R = I, V = H;
      let N = null, U = !1, oe = !1;
      if (x) {
        const le = _.get(x);
        if (le.__useDefaultFramebuffer !== void 0) {
          Me.bindFramebuffer(w.FRAMEBUFFER, le.__webglFramebuffer), F.copy(x.viewport), O.copy(x.scissor), Q = x.scissorTest, Me.viewport(F), Me.scissor(O), Me.setScissorTest(Q), k = -1;
          return;
        } else if (le.__webglFramebuffer === void 0)
          L.setupRenderTarget(x);
        else if (le.__hasExternalTextures)
          L.rebindTextures(x, _.get(x.texture).__webglTexture, _.get(x.depthTexture).__webglTexture);
        else if (x.depthBuffer) {
          const Pe = x.depthTexture;
          if (le.__boundDepthTexture !== Pe) {
            if (Pe !== null && _.has(Pe) && (x.width !== Pe.image.width || x.height !== Pe.image.height))
              throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");
            L.setupDepthRenderbuffer(x);
          }
        }
        const xe = x.texture;
        (xe.isData3DTexture || xe.isDataArrayTexture || xe.isCompressedArrayTexture) && (oe = !0);
        const Ee = _.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(Ee[I]) ? N = Ee[I][H] : N = Ee[I], U = !0) : x.samples > 0 && L.useMultisampledRTT(x) === !1 ? N = _.get(x).__webglMultisampledFramebuffer : Array.isArray(Ee) ? N = Ee[H] : N = Ee, F.copy(x.viewport), O.copy(x.scissor), Q = x.scissorTest;
      } else
        F.copy(K).multiplyScalar(Ie).floor(), O.copy(ne).multiplyScalar(Ie).floor(), Q = se;
      if (H !== 0 && (N = pu), Me.bindFramebuffer(w.FRAMEBUFFER, N) && Me.drawBuffers(x, N), Me.viewport(F), Me.scissor(O), Me.setScissorTest(Q), U) {
        const le = _.get(x.texture);
        w.framebufferTexture2D(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_CUBE_MAP_POSITIVE_X + I, le.__webglTexture, H);
      } else if (oe) {
        const le = I;
        for (let xe = 0; xe < x.textures.length; xe++) {
          const Ee = _.get(x.textures[xe]);
          w.framebufferTextureLayer(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0 + xe, Ee.__webglTexture, H, le);
        }
      } else if (x !== null && H !== 0) {
        const le = _.get(x.texture);
        w.framebufferTexture2D(w.FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, le.__webglTexture, H);
      }
      k = -1;
    }, this.readRenderTargetPixels = function(x, I, H, N, U, oe, he, le = 0) {
      if (!(x && x.isWebGLRenderTarget)) {
        We("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let xe = _.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && he !== void 0 && (xe = xe[he]), xe) {
        Me.bindFramebuffer(w.FRAMEBUFFER, xe);
        try {
          const Ee = x.textures[le], Pe = Ee.format, Oe = Ee.type;
          if (x.textures.length > 1 && w.readBuffer(w.COLOR_ATTACHMENT0 + le), !tt.textureFormatReadable(Pe)) {
            We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          if (!tt.textureTypeReadable(Oe)) {
            We("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          I >= 0 && I <= x.width - N && H >= 0 && H <= x.height - U && w.readPixels(I, H, N, U, re.convert(Pe), re.convert(Oe), oe);
        } finally {
          const Ee = z !== null ? _.get(z).__webglFramebuffer : null;
          Me.bindFramebuffer(w.FRAMEBUFFER, Ee);
        }
      }
    }, this.readRenderTargetPixelsAsync = async function(x, I, H, N, U, oe, he, le = 0) {
      if (!(x && x.isWebGLRenderTarget))
        throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
      let xe = _.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && he !== void 0 && (xe = xe[he]), xe)
        if (I >= 0 && I <= x.width - N && H >= 0 && H <= x.height - U) {
          Me.bindFramebuffer(w.FRAMEBUFFER, xe);
          const Ee = x.textures[le], Pe = Ee.format, Oe = Ee.type;
          if (x.textures.length > 1 && w.readBuffer(w.COLOR_ATTACHMENT0 + le), !tt.textureFormatReadable(Pe))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");
          if (!tt.textureTypeReadable(Oe))
            throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");
          const Te = w.createBuffer();
          w.bindBuffer(w.PIXEL_PACK_BUFFER, Te), w.bufferData(w.PIXEL_PACK_BUFFER, oe.byteLength, w.STREAM_READ), w.readPixels(I, H, N, U, re.convert(Pe), re.convert(Oe), 0);
          const $e = z !== null ? _.get(z).__webglFramebuffer : null;
          Me.bindFramebuffer(w.FRAMEBUFFER, $e);
          const lt = w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE, 0);
          return w.flush(), await vh(w, lt, 4), w.bindBuffer(w.PIXEL_PACK_BUFFER, Te), w.getBufferSubData(w.PIXEL_PACK_BUFFER, 0, oe), w.deleteBuffer(Te), w.deleteSync(lt), oe;
        } else
          throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.");
    }, this.copyFramebufferToTexture = function(x, I = null, H = 0) {
      const N = Math.pow(2, -H), U = Math.floor(x.image.width * N), oe = Math.floor(x.image.height * N), he = I !== null ? I.x : 0, le = I !== null ? I.y : 0;
      L.setTexture2D(x, 0), w.copyTexSubImage2D(w.TEXTURE_2D, H, 0, 0, he, le, U, oe), Me.unbindTexture();
    };
    const mu = w.createFramebuffer(), _u = w.createFramebuffer();
    this.copyTextureToTexture = function(x, I, H = null, N = null, U = 0, oe = 0) {
      let he, le, xe, Ee, Pe, Oe, Te, $e, lt;
      const st = x.isCompressedTexture ? x.mipmaps[oe] : x.image;
      if (H !== null)
        he = H.max.x - H.min.x, le = H.max.y - H.min.y, xe = H.isBox3 ? H.max.z - H.min.z : 1, Ee = H.min.x, Pe = H.min.y, Oe = H.isBox3 ? H.min.z : 0;
      else {
        const St = Math.pow(2, -U);
        he = Math.floor(st.width * St), le = Math.floor(st.height * St), x.isDataArrayTexture ? xe = st.depth : x.isData3DTexture ? xe = Math.floor(st.depth * St) : xe = 1, Ee = 0, Pe = 0, Oe = 0;
      }
      N !== null ? (Te = N.x, $e = N.y, lt = N.z) : (Te = 0, $e = 0, lt = 0);
      const je = re.convert(I.format), bt = re.convert(I.type);
      let Se;
      I.isData3DTexture ? (L.setTexture3D(I, 0), Se = w.TEXTURE_3D) : I.isDataArrayTexture || I.isCompressedArrayTexture ? (L.setTexture2DArray(I, 0), Se = w.TEXTURE_2D_ARRAY) : (L.setTexture2D(I, 0), Se = w.TEXTURE_2D), w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL, I.flipY), w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL, I.premultiplyAlpha), w.pixelStorei(w.UNPACK_ALIGNMENT, I.unpackAlignment);
      const Ft = w.getParameter(w.UNPACK_ROW_LENGTH), ke = w.getParameter(w.UNPACK_IMAGE_HEIGHT), Kt = w.getParameter(w.UNPACK_SKIP_PIXELS), sn = w.getParameter(w.UNPACK_SKIP_ROWS), ai = w.getParameter(w.UNPACK_SKIP_IMAGES);
      w.pixelStorei(w.UNPACK_ROW_LENGTH, st.width), w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, st.height), w.pixelStorei(w.UNPACK_SKIP_PIXELS, Ee), w.pixelStorei(w.UNPACK_SKIP_ROWS, Pe), w.pixelStorei(w.UNPACK_SKIP_IMAGES, Oe);
      const wi = x.isDataArrayTexture || x.isData3DTexture, et = I.isDataArrayTexture || I.isData3DTexture;
      if (x.isDepthTexture) {
        const St = _.get(x), Hn = _.get(I), gt = _.get(St.__renderTarget), kn = _.get(Hn.__renderTarget);
        Me.bindFramebuffer(w.READ_FRAMEBUFFER, gt.__webglFramebuffer), Me.bindFramebuffer(w.DRAW_FRAMEBUFFER, kn.__webglFramebuffer);
        for (let Ri = 0; Ri < xe; Ri++)
          wi && (w.framebufferTextureLayer(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, _.get(x).__webglTexture, U, Oe + Ri), w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, _.get(I).__webglTexture, oe, lt + Ri)), w.blitFramebuffer(Ee, Pe, he, le, Te, $e, he, le, w.DEPTH_BUFFER_BIT, w.NEAREST);
        Me.bindFramebuffer(w.READ_FRAMEBUFFER, null), Me.bindFramebuffer(w.DRAW_FRAMEBUFFER, null);
      } else if (U !== 0 || x.isRenderTargetTexture || _.has(x)) {
        const St = _.get(x), Hn = _.get(I);
        Me.bindFramebuffer(w.READ_FRAMEBUFFER, mu), Me.bindFramebuffer(w.DRAW_FRAMEBUFFER, _u);
        for (let gt = 0; gt < xe; gt++)
          wi ? w.framebufferTextureLayer(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, St.__webglTexture, U, Oe + gt) : w.framebufferTexture2D(w.READ_FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, St.__webglTexture, U), et ? w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, Hn.__webglTexture, oe, lt + gt) : w.framebufferTexture2D(w.DRAW_FRAMEBUFFER, w.COLOR_ATTACHMENT0, w.TEXTURE_2D, Hn.__webglTexture, oe), U !== 0 ? w.blitFramebuffer(Ee, Pe, he, le, Te, $e, he, le, w.COLOR_BUFFER_BIT, w.NEAREST) : et ? w.copyTexSubImage3D(Se, oe, Te, $e, lt + gt, Ee, Pe, he, le) : w.copyTexSubImage2D(Se, oe, Te, $e, Ee, Pe, he, le);
        Me.bindFramebuffer(w.READ_FRAMEBUFFER, null), Me.bindFramebuffer(w.DRAW_FRAMEBUFFER, null);
      } else
        et ? x.isDataTexture || x.isData3DTexture ? w.texSubImage3D(Se, oe, Te, $e, lt, he, le, xe, je, bt, st.data) : I.isCompressedArrayTexture ? w.compressedTexSubImage3D(Se, oe, Te, $e, lt, he, le, xe, je, st.data) : w.texSubImage3D(Se, oe, Te, $e, lt, he, le, xe, je, bt, st) : x.isDataTexture ? w.texSubImage2D(w.TEXTURE_2D, oe, Te, $e, he, le, je, bt, st.data) : x.isCompressedTexture ? w.compressedTexSubImage2D(w.TEXTURE_2D, oe, Te, $e, st.width, st.height, je, st.data) : w.texSubImage2D(w.TEXTURE_2D, oe, Te, $e, he, le, je, bt, st);
      w.pixelStorei(w.UNPACK_ROW_LENGTH, Ft), w.pixelStorei(w.UNPACK_IMAGE_HEIGHT, ke), w.pixelStorei(w.UNPACK_SKIP_PIXELS, Kt), w.pixelStorei(w.UNPACK_SKIP_ROWS, sn), w.pixelStorei(w.UNPACK_SKIP_IMAGES, ai), oe === 0 && I.generateMipmaps && w.generateMipmap(Se), Me.unbindTexture();
    }, this.initRenderTarget = function(x) {
      _.get(x).__webglFramebuffer === void 0 && L.setupRenderTarget(x);
    }, this.initTexture = function(x) {
      x.isCubeTexture ? L.setTextureCube(x, 0) : x.isData3DTexture ? L.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? L.setTexture2DArray(x, 0) : L.setTexture2D(x, 0), Me.unbindTexture();
    }, this.resetState = function() {
      R = 0, V = 0, z = null, Me.reset(), te.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  /**
   * Defines the coordinate system of the renderer.
   *
   * In `WebGLRenderer`, the value is always `WebGLCoordinateSystem`.
   *
   * @type {WebGLCoordinateSystem|WebGPUCoordinateSystem}
   * @default WebGLCoordinateSystem
   * @readonly
   */
  get coordinateSystem() {
    return un;
  }
  /**
   * Defines the output color space of the renderer.
   *
   * @type {SRGBColorSpace|LinearSRGBColorSpace}
   * @default SRGBColorSpace
   */
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = Ge._getDrawingBufferColorSpace(e), t.unpackColorSpace = Ge._getUnpackColorSpace();
  }
}
var Zg = /* @__PURE__ */ Af('<main class="svelte-k2m300"><button><canvas class="svelte-k2m300"></canvas> <div><span class="svelte-k2m300"> </span></div></button></main>');
const $g = {
  hash: "svelte-k2m300",
  code: `main.svelte-k2m300 {margin:0;padding:0;width:100vw;height:100vh;overflow:hidden;}.wrap.svelte-k2m300 {position:relative;display:block;width:100%;height:100%;border:none;padding:0;margin:0;background:#0a0a0a;cursor:default;transition:opacity 0.7s ease;}.wrap.svelte-k2m300:not(:disabled) {cursor:pointer;}.wrap.completing.svelte-k2m300 {opacity:0;pointer-events:none;}canvas.svelte-k2m300 {display:block;width:100%;height:100%;}.continue.svelte-k2m300 {position:absolute;inset:0;display:flex;align-items:center;justify-content:center;
        animation: svelte-k2m300-fadeIn 1.2s ease both;}.continue.completing.svelte-k2m300 {opacity:0;transition:opacity 0.5s ease;}.continue.svelte-k2m300 span:where(.svelte-k2m300) {padding:10px 28px;border-radius:24px;background:rgba(0, 0, 0, 0.35);backdrop-filter:blur(12px);color:rgba(255, 255, 255, 0.7);font:300 13px system-ui, sans-serif;letter-spacing:0.35em;pointer-events:none;}

    @keyframes svelte-k2m300-fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }`
};
function jg(n, e) {
  Yl(e, !0), Lf(n, $g);
  const t = /* @__PURE__ */ Dr(() => typeof e.ctx.settings.duration == "number" ? e.ctx.settings.duration : 15), i = /* @__PURE__ */ Dr(() => typeof e.ctx.settings.palette == "string" ? e.ctx.settings.palette : "jupiter"), r = /* @__PURE__ */ Dr(() => typeof e.ctx.settings.speed == "number" ? e.ctx.settings.speed : 10), s = /* @__PURE__ */ Dr(() => typeof e.ctx.settings.style == "string" ? e.ctx.settings.style : "diffusion"), a = { diffusion: 0, vortex: 1 }, o = {
    cosmic: 0,
    aurora: 1,
    ember: 2,
    ocean: 3,
    jupiter: 4,
    water: 5
  };
  let c, l = /* @__PURE__ */ wn("running");
  function f() {
    Tt(l) === "ready" && (Pn(l, "completing"), setTimeout(() => e.ctx.complete(), 700));
  }
  const d = "void main() { gl_Position = vec4(position, 1.0); }", u = `
uniform float uTime;
uniform vec2 uResolution;
uniform int uPalette;
uniform float uSpeed;
uniform int uStyle;

float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(
        mix(hash(i), hash(i + vec2(1, 0)), u.x),
        mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x),
        u.y
    );
}

float fbm(vec2 p) {
    mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 5; i++) {
        v += a * noise(p);
        p = m * p * 2.0 + 100.0;
        a *= 0.5;
    }
    return v;
}

vec2 warpField(vec2 p) {
    float t = uTime * uSpeed;

    vec2 q = vec2(
        fbm(p + t * 0.9),
        fbm(p + vec2(5.2, 1.3) - t * 0.7)
    );

    vec2 r = vec2(
        fbm(p + 4.0 * q + vec2(1.7, 9.2) + t * 0.5),
        fbm(p + 4.0 * q + vec2(8.3, 2.8) - t * 0.4)
    );

    vec2 s = vec2(
        fbm(p + 3.5 * r + vec2(21.3, 17.8) + t * 0.3),
        fbm(p + 3.5 * r + vec2(14.1, 23.5) - t * 0.35)
    );

    return vec2(
        fbm(p + 4.0 * s),
        fbm(p + 4.0 * s + vec2(7.3, 3.1))
    );
}

vec3 pal(float t, vec3 a, vec3 b, vec3 c, vec3 d) {
    return a + b * cos(6.28318 * (c * t + d));
}

vec3 getColor(float f, float f2) {
    vec3 col;
    if (uPalette == 1) {
        col = pal(f, vec3(0.05, 0.2, 0.15), vec3(0.4, 0.55, 0.5),
                     vec3(0.8, 1.0, 1.0), vec3(0.3, 0.0, 0.2));
        col += 0.15 * pal(f2, vec3(0.3, 0.1, 0.4), vec3(0.3, 0.4, 0.3),
                              vec3(1.0, 0.7, 0.9), vec3(0.1, 0.25, 0.4));
    } else if (uPalette == 2) {
        col = pal(f, vec3(0.3, 0.1, 0.05), vec3(0.5, 0.4, 0.3),
                     vec3(0.8, 1.0, 0.7), vec3(0.0, 0.05, 0.15));
        col += 0.12 * pal(f2, vec3(0.4, 0.2, 0.0), vec3(0.4, 0.3, 0.2),
                              vec3(1.0, 0.8, 0.6), vec3(0.05, 0.1, 0.2));
    } else if (uPalette == 3) {
        col = pal(f, vec3(0.02, 0.08, 0.22), vec3(0.35, 0.5, 0.55),
                     vec3(0.8, 1.0, 1.0), vec3(0.35, 0.2, 0.0));
        col += 0.15 * pal(f2, vec3(0.0, 0.15, 0.3), vec3(0.3, 0.35, 0.4),
                              vec3(1.0, 0.9, 0.8), vec3(0.25, 0.15, 0.05));
    } else if (uPalette == 4) {
        col = pal(f, vec3(0.45, 0.52, 0.65), vec3(0.35, 0.35, 0.3),
                     vec3(0.8, 0.9, 1.0), vec3(0.55, 0.6, 0.7));
        col += 0.12 * pal(f2, vec3(0.3, 0.4, 0.55), vec3(0.3, 0.3, 0.25),
                              vec3(1.0, 1.0, 0.8), vec3(0.6, 0.65, 0.75));
    } else if (uPalette == 5) {
        col = pal(f, vec3(0.05, 0.12, 0.3), vec3(0.4, 0.42, 0.45),
                     vec3(0.7, 0.8, 0.9), vec3(0.55, 0.58, 0.62));
        col += 0.1 * pal(f2, vec3(0.1, 0.18, 0.35), vec3(0.35, 0.38, 0.4),
                              vec3(0.9, 0.9, 1.0), vec3(0.5, 0.55, 0.6));
    } else {
        col = pal(f, vec3(0.15, 0.05, 0.25), vec3(0.55, 0.45, 0.5),
                     vec3(1.0, 0.7, 0.8), vec3(0.0, 0.15, 0.35));
        col += 0.15 * pal(f2, vec3(0.1, 0.2, 0.3), vec3(0.4, 0.3, 0.4),
                              vec3(0.8, 1.0, 1.0), vec3(0.2, 0.0, 0.1));
    }
    return col;
}

void main() {
    vec2 uv = gl_FragCoord.xy / uResolution;
    float aspect = uResolution.x / uResolution.y;
    vec2 centered = vec2((uv.x - 0.5) * aspect, uv.y - 0.5);
    vec2 p;

    if (uStyle == 1) {
        float r = length(centered);
        float a = atan(centered.y, centered.x);
        float spiral = a / 6.28318 + r * 2.5 - uTime * uSpeed * 0.4;
        p = vec2(r * 3.0, spiral * 3.0);
    } else {
        p = centered * 3.0;
    }

    vec2 f = warpField(p);
    vec3 color = getColor(f.x, f.y);

    float shimmer = abs(f.x - f.y);
    color += shimmer * vec3(0.15, 0.25, 0.35) * 0.4;

    if (uStyle == 1) {
        float r = length(centered);
        color += 0.015 / (r + 0.015) * color * 0.3;
        color *= 1.0 - 0.3 * r * 2.0;
    } else {
        vec2 vc = uv - 0.5;
        color *= 1.0 - 0.5 * dot(vc, vc) * 2.0;
    }

    color *= 0.95 + 0.05 * sin(uTime * 0.3);
    color = pow(color, vec3(1.15));

    gl_FragColor = vec4(max(color, 0.0), 1.0);
}`;
  Nf(() => {
    const C = new Kg({ canvas: c, antialias: !1 });
    C.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const A = new Uh(), D = new wo(-1, 1, 1, -1, 0, 1), v = {
      uTime: { value: 0 },
      uResolution: { value: new Ze() },
      uPalette: { value: o[Tt(i)] ?? 4 },
      uSpeed: { value: Tt(r) / 100 * 0.16 },
      uStyle: { value: a[Tt(s)] ?? 0 }
    }, T = new rn({ uniforms: v, vertexShader: d, fragmentShader: u }), Y = new xn(new Rr(2, 2), T);
    A.add(Y);
    function R() {
      const F = window.innerWidth, O = window.innerHeight;
      C.setSize(F, O), v.uResolution.value.set(F * C.getPixelRatio(), O * C.getPixelRatio());
    }
    R(), window.addEventListener("resize", R);
    let V;
    const z = performance.now(), k = Tt(t) * 1e3;
    function G() {
      const F = performance.now() - z;
      v.uTime.value = F / 1e3, F >= k && Tt(l) === "running" && Pn(l, "ready"), C.render(A, D), V = requestAnimationFrame(G);
    }
    return G(), () => {
      cancelAnimationFrame(V), window.removeEventListener("resize", R), C.dispose(), T.dispose();
    };
  });
  var m = Zg(), g = Lr(m);
  let M;
  var p = Lr(g);
  Uf(p, (C) => c = C, () => c);
  var h = rf(p, 2);
  let S;
  var b = Lr(h), y = Lr(b);
  ff(() => {
    M = Yo(g, 1, "wrap svelte-k2m300", null, M, { completing: Tt(l) === "completing" }), g.disabled = Tt(l) === "running", S = Yo(h, 1, "continue svelte-k2m300", null, S, { completing: Tt(l) === "completing" }), Rf(y, Tt(l) === "running" ? "LOADING" : "CONTINUE");
  }), Mf("click", g, f), wf(n, m), Kl();
}
Sf(["click"]);
function Qg(n, e) {
  return Cf(jg, { target: n, props: e });
}
function e0(n) {
  Df(n);
}
export {
  Qg as mountPlugin,
  e0 as unmountPlugin
};
