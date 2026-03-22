import "svelte/internal/disclose-version";
import * as $ from "svelte/internal/client";
import { onMount, tick } from "svelte";
const VIEWBOX = "0 0 200 520";
const NODES = [
  { id: "hello", label: "Hello World", chapter: "1", x: 100, y: 30, prereqs: [] },
  { id: "variables", label: "Variables", chapter: "3.1", x: 55, y: 100, prereqs: ["hello"] },
  { id: "types", label: "Data Types", chapter: "3.2", x: 145, y: 100, prereqs: ["hello"] },
  { id: "functions", label: "Functions", chapter: "3.3", x: 55, y: 170, prereqs: ["variables"] },
  { id: "control_flow", label: "Control Flow", chapter: "3.5", x: 145, y: 170, prereqs: ["types"] },
  { id: "ownership", label: "Ownership", chapter: "4.1", x: 100, y: 245, prereqs: ["functions", "control_flow"], milestone: true },
  { id: "references", label: "References", chapter: "4.2", x: 55, y: 315, prereqs: ["ownership"] },
  { id: "slices", label: "Slices", chapter: "4.3", x: 145, y: 315, prereqs: ["ownership"] },
  { id: "structs", label: "Structs", chapter: "5", x: 55, y: 385, prereqs: ["references"] },
  { id: "enums", label: "Enums & Match", chapter: "6", x: 145, y: 385, prereqs: ["slices"] },
  { id: "error_handling", label: "Error Handling", chapter: "9", x: 55, y: 455, prereqs: ["structs"] },
  { id: "collections", label: "Collections", chapter: "8", x: 145, y: 455, prereqs: ["enums"] }
];
const EDGES = [
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
];
const NODE_MAP = new Map(NODES.map((n) => [n.id, n]));
const getNode = (id) => NODE_MAP.get(id);
function nodeStatus(id, completed, activeId) {
  if (completed.has(id)) return "completed";
  if (id === activeId) return "active";
  const node = getNode(id);
  if (node.prereqs.every((p) => completed.has(p))) return "available";
  return "locked";
}
function nextAvailable(completed) {
  for (const node of NODES) {
    if (completed.has(node.id)) continue;
    if (node.prereqs.every((p) => completed.has(p))) return node.id;
  }
  return null;
}
function edgePath(fromId, toId) {
  const f = getNode(fromId);
  const t = getNode(toId);
  const my = (f.y + t.y) / 2;
  return `M ${f.x} ${f.y} C ${f.x} ${my}, ${t.x} ${my}, ${t.x} ${t.y}`;
}
const STARS = Array.from({ length: 60 }, (_, i) => ({
  x: (i * 137.5 + 17) % 196 + 2,
  y: (i * 97.3 + 9) % 510 + 5,
  r: 0.3 + i * 7 % 5 * 0.12,
  o: 0.05 + i * 13 % 7 * 0.025
}));
const EXERCISES = {
  hello: {
    title: "Your First Program",
    concept: "In Rust, println is a macro — macros use ! after the name.",
    hint: "Change println(...) to println!(...)",
    starter: 'fn main() {\n    println("Hello, Rust!");\n}',
    checks: ["println!"]
  },
  variables: {
    title: "Mutability",
    concept: "Variables are immutable by default. Use mut to allow reassignment.",
    hint: "Declare with: let mut x = 5;",
    starter: 'fn main() {\n    let x = 5;\n    x = 10;\n    println!("x = {}", x);\n}',
    checks: ["let mut"]
  },
  types: {
    title: "Type Annotations",
    concept: "Rust needs a type annotation when it cannot infer from context.",
    hint: "Add a type: let x: i32 = ...",
    starter: 'fn main() {\n    let x = "42".parse().expect("NaN");\n    println!("x + 1 = {}", x + 1);\n}',
    checks: ["i32"]
  },
  functions: {
    title: "Function Signatures",
    concept: "Every parameter must have a type annotation, and return types use ->.",
    hint: "fn add(a: i32, b: i32) -> i32",
    starter: 'fn add(a, b) {\n    a + b\n}\n\nfn main() {\n    println!("3 + 5 = {}", add(3, 5));\n}',
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
    starter: 'fn main() {\n    let s1 = String::from("hello");\n    let s2 = s1;\n    println!("{} {}", s1, s2);\n}',
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
    starter: '// Define a Rectangle struct with width and height (f64)\n// Add a method area() that returns width * height\n\nfn main() {\n    let rect = Rectangle { width: 30.0, height: 50.0 };\n    println!("Area: {}", rect.area());\n}',
    checks: ["struct Rectangle", "fn area"]
  },
  enums: {
    title: "Pattern Matching",
    concept: "match must handle every enum variant. Each arm uses => to map to a value.",
    hint: "match coin { Coin::Penny => 1, Coin::Nickel => 5, ... }",
    starter: 'enum Coin {\n    Penny,\n    Nickel,\n    Dime,\n    Quarter,\n}\n\nfn value(coin: Coin) -> u32 {\n    // Use match to return the cent value\n    0\n}\n\nfn main() {\n    println!("Quarter = {} cents", value(Coin::Quarter));\n}',
    checks: ["match", "=>"]
  },
  error_handling: {
    title: "The Result Type",
    concept: "Fallible operations return Result<T, E>. Handle both Ok and Err.",
    hint: "match input.parse::<i32>() { Ok(n) => ..., Err(e) => ... }",
    starter: 'fn main() {\n    let input = "42";\n    // parse() returns Result, not i32 directly.\n    // Use match to handle Ok and Err.\n    let n: i32 = input.parse();\n    println!("parsed: {}", n);\n}',
    checks: ["match", "Ok"]
  },
  collections: {
    title: "Vectors",
    concept: "Vec<T> is a growable array. Create with vec![], grow with push(), iterate with for.",
    hint: "let mut v = vec![1, 2, 3]; v.push(4); for x in &v { ... }",
    starter: "fn main() {\n    // Create a mutable vector with 1, 2, 3\n    // Push 4 and 5\n    // Print each value with a for loop\n}",
    checks: ["vec!", ".push(", "for"]
  }
};
var root_2 = $.from_svg(`<circle fill="#c8beb0" class="svelte-swvdfi"></circle>`);
var root_3 = $.from_svg(`<path fill="none" class="svelte-swvdfi"></path>`);
var root_5 = $.from_svg(`<circle fill="var(--r-rust)" filter="url(#gl)" opacity="0.35" class="svelte-swvdfi"></circle>`);
var root_6 = $.from_svg(`<circle fill="var(--r-rust)" filter="url(#gl-active)" class="halo svelte-swvdfi"></circle>`);
var root_7 = $.from_svg(`<text class="node-chapter svelte-swvdfi"> </text>`);
var root_4 = $.from_svg(`<g><!><!><circle></circle><text> </text><!></g>`);
var root_8 = $.from_html(`<div class="done-state svelte-swvdfi"><span class="done-crab svelte-swvdfi">🦀</span> <h2 class="done-title svelte-swvdfi">All exercises complete</h2> <p class="done-sub svelte-swvdfi">You've covered the Rust fundamentals.</p> <button class="btn-primary svelte-swvdfi">Continue</button></div>`);
var root_10 = $.from_html(`<div><pre class="svelte-swvdfi"> </pre></div>`);
var root_11 = $.from_html(`<div class="hint-box svelte-swvdfi"><span class="hint-label svelte-swvdfi">hint</span> </div>`);
var root_12 = $.from_html(`<span class="compile-spinner svelte-swvdfi"></span> Compiling…`, 1);
var root_9 = $.from_html(`<div class="ex-header svelte-swvdfi"><span class="ch-badge svelte-swvdfi"> </span> <h2 class="ex-title svelte-swvdfi"> </h2> <p class="ex-concept svelte-swvdfi"> </p></div> <div class="editor-wrap svelte-swvdfi"><div class="editor-chrome svelte-swvdfi"><span class="dot red svelte-swvdfi"></span> <span class="dot yellow svelte-swvdfi"></span> <span class="dot green svelte-swvdfi"></span> <span class="editor-filename svelte-swvdfi">main.rs</span></div> <textarea class="editor svelte-swvdfi" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off"></textarea></div> <!> <!> <div class="action-bar svelte-swvdfi"><button class="btn-ghost svelte-swvdfi"> </button> <div class="action-right svelte-swvdfi"><button class="btn-ghost svelte-swvdfi">Skip</button> <button class="btn-primary svelte-swvdfi"><!></button></div></div> <div class="shortcut-hint svelte-swvdfi">Ctrl+Enter to run</div>`, 1);
var root_1 = $.from_html(`<div class="rustlings svelte-swvdfi"><div class="tree-panel svelte-swvdfi"><div class="tree-head svelte-swvdfi"><span class="tree-title svelte-swvdfi">rustlings</span> <span class="tree-count svelte-swvdfi"> <span class="tree-count-sep svelte-swvdfi">/</span> </span></div> <svg class="tree-svg svelte-swvdfi" xmlns="http://www.w3.org/2000/svg"><defs class="svelte-swvdfi"><filter id="gl" x="-80%" y="-80%" width="260%" height="260%" class="svelte-swvdfi"><feGaussianBlur in="SourceGraphic" stdDeviation="3" class="svelte-swvdfi"></feGaussianBlur></filter><filter id="gl-active" x="-100%" y="-100%" width="300%" height="300%" class="svelte-swvdfi"><feGaussianBlur in="SourceGraphic" stdDeviation="5" class="svelte-swvdfi"></feGaussianBlur></filter></defs><!><!><!></svg> <div class="tree-foot svelte-swvdfi"><div class="progress-track svelte-swvdfi"><div class="progress-fill svelte-swvdfi"></div></div></div></div> <div class="exercise-panel svelte-swvdfi"><!></div></div>`);
const $$css = {
  hash: "svelte-swvdfi",
  code: ".rustlings.svelte-swvdfi {--r-rust: #CE422B;--r-rust-dim: #8a4030;--r-warm: #D4956A;--r-bg: #060606;--r-panel: #0b0b0b;--r-surface: #111;--r-border: rgba(255, 255, 255, 0.06);--r-text: #d0c8c0;--r-text-dim: #555;--r-edge-lit: rgba(206, 66, 43, 0.4);--r-edge-warm: rgba(206, 66, 43, 0.12);--r-edge-dim: rgba(255, 255, 255, 0.03);position:fixed;inset:0;display:flex;background:var(--r-bg);color:var(--r-text);font-family:'IBM Plex Sans', 'Segoe UI', system-ui, sans-serif;font-weight:400;overflow:hidden;}\n\n	/* ── tree panel ── */.tree-panel.svelte-swvdfi {width:240px;flex-shrink:0;display:flex;flex-direction:column;background:linear-gradient(180deg, #080808 0%, #050505 100%);border-right:1px solid var(--r-border);}.tree-head.svelte-swvdfi {display:flex;align-items:center;justify-content:space-between;padding:16px 18px 8px;}.tree-title.svelte-swvdfi {font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;font-size:13px;font-weight:600;color:var(--r-rust);letter-spacing:0.04em;}.tree-count.svelte-swvdfi {font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;font-size:11px;color:var(--r-text-dim);font-variant-numeric:tabular-nums;}.tree-count-sep.svelte-swvdfi {opacity:0.4;margin:0 1px;}.tree-svg.svelte-swvdfi {flex:1;width:100%;padding:0 8px;}.tree-foot.svelte-swvdfi {padding:12px 18px 16px;}.progress-track.svelte-swvdfi {height:2px;background:rgba(255, 255, 255, 0.04);border-radius:1px;overflow:hidden;}.progress-fill.svelte-swvdfi {height:100%;background:var(--r-rust);border-radius:1px;transition:width 600ms ease;}\n\n	/* ── svg nodes ── */.node-g.svelte-swvdfi {cursor:default;}.node-clickable.svelte-swvdfi {cursor:pointer;}.node-dot.svelte-swvdfi {transition:fill 400ms ease, stroke 400ms ease;}.node-completed.svelte-swvdfi {fill:var(--r-rust);stroke:var(--r-rust);stroke-width:1;}.node-active.svelte-swvdfi {fill:var(--r-rust);stroke:var(--r-warm);stroke-width:1.5;}.node-available.svelte-swvdfi {fill:none;stroke:var(--r-rust-dim);stroke-width:1;}.node-locked.svelte-swvdfi {fill:rgba(255, 255, 255, 0.03);stroke:rgba(255, 255, 255, 0.05);stroke-width:0.5;}.halo.svelte-swvdfi {\n		animation: svelte-swvdfi-pulse 2.4s ease-in-out infinite;}\n\n	@keyframes svelte-swvdfi-pulse {\n		0%, 100% { opacity: 0.15; }\n		50% { opacity: 0.45; }\n	}.node-label.svelte-swvdfi {font-family:'IBM Plex Sans', system-ui, sans-serif;font-size:6.5px;text-anchor:middle;fill:var(--r-text-dim);transition:fill 400ms ease;}.label-lit.svelte-swvdfi {fill:var(--r-text);}.label-avail.svelte-swvdfi {fill:var(--r-rust-dim);}.label-dim.svelte-swvdfi {fill:rgba(255, 255, 255, 0.08);}.node-chapter.svelte-swvdfi {font-family:'JetBrains Mono', monospace;font-size:4.5px;text-anchor:middle;fill:var(--r-text-dim);opacity:0.5;}\n\n	/* ── exercise panel ── */.exercise-panel.svelte-swvdfi {flex:1;display:flex;flex-direction:column;padding:32px 40px;overflow-y:auto;min-width:0;}.ex-header.svelte-swvdfi {margin-bottom:20px;}.ch-badge.svelte-swvdfi {display:inline-block;font-family:'JetBrains Mono', monospace;font-size:10px;font-weight:500;color:var(--r-rust);background:rgba(206, 66, 43, 0.08);border:1px solid rgba(206, 66, 43, 0.15);border-radius:4px;padding:2px 8px;margin-bottom:10px;letter-spacing:0.03em;}.ex-title.svelte-swvdfi {font-size:22px;font-weight:600;color:#eee;margin:0 0 8px;letter-spacing:-0.01em;}.ex-concept.svelte-swvdfi {font-size:13px;color:var(--r-text-dim);margin:0;line-height:1.6;max-width:520px;}\n\n	/* ── code editor ── */.editor-wrap.svelte-swvdfi {flex:1;min-height:180px;max-height:360px;display:flex;flex-direction:column;border:1px solid var(--r-border);border-radius:8px;overflow:hidden;background:var(--r-surface);}.editor-chrome.svelte-swvdfi {display:flex;align-items:center;gap:6px;padding:8px 12px;background:rgba(255, 255, 255, 0.02);border-bottom:1px solid var(--r-border);}.dot.svelte-swvdfi {width:8px;height:8px;border-radius:50%;}.dot.red.svelte-swvdfi {background:#ff5f57;opacity:0.6;}.dot.yellow.svelte-swvdfi {background:#febc2e;opacity:0.6;}.dot.green.svelte-swvdfi {background:#28c840;opacity:0.6;}.editor-filename.svelte-swvdfi {font-family:'JetBrains Mono', monospace;font-size:10px;color:var(--r-text-dim);margin-left:8px;}.editor.svelte-swvdfi {flex:1;width:100%;padding:14px 16px;background:transparent;color:#c8c0b8;font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', 'Cascadia Code', monospace;font-size:13px;line-height:1.65;border:none;outline:none;resize:none;tab-size:4;}.editor.svelte-swvdfi::selection {background:rgba(206, 66, 43, 0.25);}\n\n	/* ── output ── */.output.svelte-swvdfi {margin-top:10px;padding:10px 14px;border-radius:6px;font-family:'JetBrains Mono', monospace;font-size:12px;line-height:1.5;}.output.svelte-swvdfi pre:where(.svelte-swvdfi) {margin:0;white-space:pre-wrap;}.out-ok.svelte-swvdfi {background:rgba(40, 200, 64, 0.06);border:1px solid rgba(40, 200, 64, 0.15);color:#5cdb6a;}.out-err.svelte-swvdfi {background:rgba(206, 66, 43, 0.06);border:1px solid rgba(206, 66, 43, 0.15);color:var(--r-rust);}.hint-box.svelte-swvdfi {margin-top:8px;padding:10px 14px;border-radius:6px;background:rgba(212, 149, 106, 0.05);border:1px solid rgba(212, 149, 106, 0.12);font-size:12px;color:var(--r-warm);line-height:1.5;}.hint-label.svelte-swvdfi {font-family:'JetBrains Mono', monospace;font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.06em;margin-right:8px;opacity:0.6;}\n\n	/* ── action bar ── */.action-bar.svelte-swvdfi {display:flex;align-items:center;justify-content:space-between;margin-top:16px;gap:8px;}.action-right.svelte-swvdfi {display:flex;gap:8px;}.btn-primary.svelte-swvdfi {display:inline-flex;align-items:center;gap:6px;padding:8px 20px;background:var(--r-rust);color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;transition:background 150ms ease, opacity 150ms ease;}.btn-primary.svelte-swvdfi:hover {background:#b8371f;}.btn-primary.svelte-swvdfi:disabled {opacity:0.6;cursor:not-allowed;}.btn-ghost.svelte-swvdfi {padding:8px 14px;background:transparent;color:var(--r-text-dim);border:1px solid var(--r-border);border-radius:6px;font-size:12px;cursor:pointer;transition:color 150ms ease, border-color 150ms ease;}.btn-ghost.svelte-swvdfi:hover {color:var(--r-text);border-color:rgba(255, 255, 255, 0.12);}.compile-spinner.svelte-swvdfi {display:inline-block;width:12px;height:12px;border:1.5px solid rgba(255, 255, 255, 0.3);border-top-color:#fff;border-radius:50%;\n		animation: svelte-swvdfi-spin 0.6s linear infinite;}\n\n	@keyframes svelte-swvdfi-spin {\n		to { transform: rotate(360deg); }\n	}.shortcut-hint.svelte-swvdfi {margin-top:10px;font-size:10px;color:var(--r-text-dim);opacity:0.4;font-family:'JetBrains Mono', monospace;}\n\n	/* ── done state ── */.done-state.svelte-swvdfi {flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:12px;}.done-crab.svelte-swvdfi {font-size:48px;margin-bottom:8px;}.done-title.svelte-swvdfi {font-size:24px;font-weight:600;color:#eee;margin:0;}.done-sub.svelte-swvdfi {font-size:14px;color:var(--r-text-dim);margin:0;}\n\n	/* ── mobile ── */\n\n	@media (max-width: 640px) {.tree-panel.svelte-swvdfi {display:none;}.exercise-panel.svelte-swvdfi {padding:24px 20px;}.editor-wrap.svelte-swvdfi {max-height:280px;}\n	}"
};
function RustlingsBox($$anchor, $$props) {
  $.push($$props, true);
  $.append_styles($$anchor, $$css);
  let completedIds = $.state($.proxy([]));
  let activeNodeId = $.state(null);
  let code = $.state("");
  let output = $.state(null);
  let compiling = $.state(false);
  let showHint = $.state(false);
  let loaded = $.state(false);
  let editorEl = $.state(void 0);
  let completedSet = $.derived(() => new Set($.get(completedIds)));
  let activeNode = $.derived(() => $.get(activeNodeId) ? getNode($.get(activeNodeId)) : null);
  let exercise = $.derived(() => $.get(activeNodeId) ? EXERCISES[$.get(activeNodeId)] : null);
  let allDone = $.derived(() => $.get(completedIds).length === NODES.length);
  function selectNode(id) {
    $.set(activeNodeId, id, true);
    $.set(code, EXERCISES[id].starter, true);
    $.set(output, null);
    $.set(showHint, false);
    tick().then(() => $.get(editorEl)?.focus());
  }
  function pickNext() {
    const id = nextAvailable($.get(completedSet));
    if (id) selectNode(id);
    else $.set(activeNodeId, null);
  }
  function status(id) {
    return nodeStatus(id, $.get(completedSet), $.get(activeNodeId));
  }
  async function runCode() {
    if (!$.get(exercise) || $.get(compiling)) return;
    $.set(compiling, true);
    $.set(output, null);
    await new Promise((r) => setTimeout(r, 500));
    const pass = $.get(exercise).checks.every((c) => $.get(code).includes(c));
    $.set(compiling, false);
    if (pass) {
      $.set(output, { kind: "success", text: "✓ Compiles and runs successfully!" }, true);
      $.set(completedIds, [...$.get(completedIds), $.get(activeNodeId)], true);
      await $$props.ctx.state.set("completed", $.get(completedIds));
      setTimeout(() => $$props.ctx.complete(), 1600);
    } else {
      $.set(
        output,
        {
          kind: "error",
          text: "✗ Compilation failed. Check your code."
        },
        true
      );
    }
  }
  function handleEditorKey(e) {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = e.currentTarget;
      const s = el.selectionStart;
      const end = el.selectionEnd;
      $.set(code, $.get(code).substring(0, s) + "    " + $.get(code).substring(end));
      tick().then(() => {
        el.selectionStart = el.selectionEnd = s + 4;
      });
    }
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  }
  function nodeClick(id) {
    const s = status(id);
    if (s === "available") selectNode(id);
  }
  function edgeStroke(fromId, toId) {
    const fd = $.get(completedSet).has(fromId);
    const td = $.get(completedSet).has(toId);
    if (fd && td) return "var(--r-edge-lit)";
    if (fd) return "var(--r-edge-warm)";
    return "var(--r-edge-dim)";
  }
  function edgeWidth(fromId, toId) {
    return $.get(completedSet).has(fromId) && $.get(completedSet).has(toId) ? 1.5 : 0.6;
  }
  onMount(async () => {
    const saved = await $$props.ctx.state.get("completed");
    if (saved) $.set(completedIds, saved, true);
    pickNext();
    $.set(loaded, true);
  });
  var fragment = $.comment();
  var node_1 = $.first_child(fragment);
  {
    var consequent_8 = ($$anchor2) => {
      var div = root_1();
      var div_1 = $.child(div);
      var div_2 = $.child(div_1);
      var span = $.sibling($.child(div_2), 2);
      var text = $.child(span, true);
      var text_1 = $.sibling(text, 2, true);
      $.reset(span);
      $.reset(div_2);
      var svg = $.sibling(div_2, 2);
      var node_2 = $.sibling($.child(svg));
      $.each(node_2, 17, () => STARS, $.index, ($$anchor3, s) => {
        var circle = root_2();
        $.template_effect(() => {
          $.set_attribute(circle, "cx", $.get(s).x);
          $.set_attribute(circle, "cy", $.get(s).y);
          $.set_attribute(circle, "r", $.get(s).r);
          $.set_attribute(circle, "opacity", $.get(s).o);
        });
        $.append($$anchor3, circle);
      });
      var node_3 = $.sibling(node_2);
      $.each(node_3, 17, () => EDGES, $.index, ($$anchor3, $$item) => {
        var $$array = $.derived(() => $.to_array($.get($$item), 2));
        let fromId = () => $.get($$array)[0];
        let toId = () => $.get($$array)[1];
        var path = root_3();
        $.template_effect(
          ($0, $1, $2) => {
            $.set_attribute(path, "d", $0);
            $.set_attribute(path, "stroke", $1);
            $.set_attribute(path, "stroke-width", $2);
          },
          [
            () => edgePath(fromId(), toId()),
            () => edgeStroke(fromId(), toId()),
            () => edgeWidth(fromId(), toId())
          ]
        );
        $.append($$anchor3, path);
      });
      var node_4 = $.sibling(node_3);
      $.each(node_4, 17, () => NODES, $.index, ($$anchor3, node) => {
        const st = $.derived(() => status($.get(node).id));
        const r = $.derived(() => $.get(node).milestone ? 7 : 4.5);
        var g = root_4();
        let classes;
        var node_5 = $.child(g);
        {
          var consequent = ($$anchor4) => {
            var circle_1 = root_5();
            $.template_effect(() => {
              $.set_attribute(circle_1, "cx", $.get(node).x);
              $.set_attribute(circle_1, "cy", $.get(node).y);
              $.set_attribute(circle_1, "r", $.get(r) * 2.5);
            });
            $.append($$anchor4, circle_1);
          };
          $.if(node_5, ($$render) => {
            if ($.get(st) === "completed") $$render(consequent);
          });
        }
        var node_6 = $.sibling(node_5);
        {
          var consequent_1 = ($$anchor4) => {
            var circle_2 = root_6();
            $.template_effect(() => {
              $.set_attribute(circle_2, "cx", $.get(node).x);
              $.set_attribute(circle_2, "cy", $.get(node).y);
              $.set_attribute(circle_2, "r", $.get(r) * 3);
            });
            $.append($$anchor4, circle_2);
          };
          $.if(node_6, ($$render) => {
            if ($.get(st) === "active") $$render(consequent_1);
          });
        }
        var circle_3 = $.sibling(node_6);
        let classes_1;
        var text_2 = $.sibling(circle_3);
        let classes_2;
        var text_3 = $.child(text_2, true);
        $.reset(text_2);
        var node_7 = $.sibling(text_2);
        {
          var consequent_2 = ($$anchor4) => {
            var text_4 = root_7();
            var text_5 = $.child(text_4);
            $.reset(text_4);
            $.template_effect(() => {
              $.set_attribute(text_4, "x", $.get(node).x);
              $.set_attribute(text_4, "y", $.get(node).y + $.get(r) + 20);
              $.set_text(text_5, `Ch. ${$.get(node).chapter ?? ""}`);
            });
            $.append($$anchor4, text_4);
          };
          $.if(node_7, ($$render) => {
            if ($.get(node).milestone && $.get(st) !== "locked") $$render(consequent_2);
          });
        }
        $.reset(g);
        $.template_effect(() => {
          classes = $.set_class(g, 0, "node-g svelte-swvdfi", null, classes, { "node-clickable": $.get(st) === "available" });
          $.set_attribute(circle_3, "cx", $.get(node).x);
          $.set_attribute(circle_3, "cy", $.get(node).y);
          $.set_attribute(circle_3, "r", $.get(r));
          classes_1 = $.set_class(circle_3, 0, "node-dot svelte-swvdfi", null, classes_1, {
            "node-completed": $.get(st) === "completed",
            "node-active": $.get(st) === "active",
            "node-available": $.get(st) === "available",
            "node-locked": $.get(st) === "locked"
          });
          $.set_attribute(text_2, "x", $.get(node).x);
          $.set_attribute(text_2, "y", $.get(node).y + $.get(r) + 10);
          classes_2 = $.set_class(text_2, 0, "node-label svelte-swvdfi", null, classes_2, {
            "label-lit": $.get(st) === "completed" || $.get(st) === "active",
            "label-avail": $.get(st) === "available",
            "label-dim": $.get(st) === "locked"
          });
          $.set_text(text_3, $.get(node).label);
        });
        $.delegated("click", g, () => nodeClick($.get(node).id));
        $.append($$anchor3, g);
      });
      $.reset(svg);
      var div_3 = $.sibling(svg, 2);
      var div_4 = $.child(div_3);
      var div_5 = $.child(div_4);
      let styles;
      $.reset(div_4);
      $.reset(div_3);
      $.reset(div_1);
      var div_6 = $.sibling(div_1, 2);
      var node_8 = $.child(div_6);
      {
        var consequent_3 = ($$anchor3) => {
          var div_7 = root_8();
          var button = $.sibling($.child(div_7), 6);
          $.reset(div_7);
          $.delegated("click", button, () => $$props.ctx.complete());
          $.append($$anchor3, div_7);
        };
        var consequent_7 = ($$anchor3) => {
          var fragment_1 = root_9();
          var div_8 = $.first_child(fragment_1);
          var span_1 = $.child(div_8);
          var text_6 = $.child(span_1);
          $.reset(span_1);
          var h2 = $.sibling(span_1, 2);
          var text_7 = $.child(h2, true);
          $.reset(h2);
          var p = $.sibling(h2, 2);
          var text_8 = $.child(p, true);
          $.reset(p);
          $.reset(div_8);
          var div_9 = $.sibling(div_8, 2);
          var textarea = $.sibling($.child(div_9), 2);
          $.remove_textarea_child(textarea);
          $.bind_this(textarea, ($$value) => $.set(editorEl, $$value), () => $.get(editorEl));
          $.reset(div_9);
          var node_9 = $.sibling(div_9, 2);
          {
            var consequent_4 = ($$anchor4) => {
              var div_10 = root_10();
              let classes_3;
              var pre = $.child(div_10);
              var text_9 = $.child(pre, true);
              $.reset(pre);
              $.reset(div_10);
              $.template_effect(() => {
                classes_3 = $.set_class(div_10, 1, "output svelte-swvdfi", null, classes_3, {
                  "out-ok": $.get(output).kind === "success",
                  "out-err": $.get(output).kind === "error"
                });
                $.set_text(text_9, $.get(output).text);
              });
              $.append($$anchor4, div_10);
            };
            $.if(node_9, ($$render) => {
              if ($.get(output)) $$render(consequent_4);
            });
          }
          var node_10 = $.sibling(node_9, 2);
          {
            var consequent_5 = ($$anchor4) => {
              var div_11 = root_11();
              var text_10 = $.sibling($.child(div_11));
              $.reset(div_11);
              $.template_effect(() => $.set_text(text_10, ` ${$.get(exercise).hint ?? ""}`));
              $.append($$anchor4, div_11);
            };
            $.if(node_10, ($$render) => {
              if ($.get(showHint)) $$render(consequent_5);
            });
          }
          var div_12 = $.sibling(node_10, 2);
          var button_1 = $.child(div_12);
          var text_11 = $.child(button_1, true);
          $.reset(button_1);
          var div_13 = $.sibling(button_1, 2);
          var button_2 = $.child(div_13);
          var button_3 = $.sibling(button_2, 2);
          var node_11 = $.child(button_3);
          {
            var consequent_6 = ($$anchor4) => {
              var fragment_2 = root_12();
              $.next();
              $.append($$anchor4, fragment_2);
            };
            var alternate = ($$anchor4) => {
              var text_12 = $.text("▶ Run");
              $.append($$anchor4, text_12);
            };
            $.if(node_11, ($$render) => {
              if ($.get(compiling)) $$render(consequent_6);
              else $$render(alternate, -1);
            });
          }
          $.reset(button_3);
          $.reset(div_13);
          $.reset(div_12);
          $.next(2);
          $.template_effect(() => {
            $.set_text(text_6, `Ch. ${$.get(activeNode).chapter ?? ""}`);
            $.set_text(text_7, $.get(exercise).title);
            $.set_text(text_8, $.get(exercise).concept);
            $.set_text(text_11, $.get(showHint) ? "Hide hint" : "Hint");
            button_3.disabled = $.get(compiling);
          });
          $.delegated("keydown", textarea, handleEditorKey);
          $.bind_value(textarea, () => $.get(code), ($$value) => $.set(code, $$value));
          $.delegated("click", button_1, () => $.set(showHint, !$.get(showHint)));
          $.delegated("click", button_2, () => $$props.ctx.complete());
          $.delegated("click", button_3, runCode);
          $.append($$anchor3, fragment_1);
        };
        $.if(node_8, ($$render) => {
          if ($.get(allDone)) $$render(consequent_3);
          else if ($.get(activeNode) && $.get(exercise)) $$render(consequent_7, 1);
        });
      }
      $.reset(div_6);
      $.reset(div);
      $.template_effect(() => {
        $.set_text(text, $.get(completedIds).length);
        $.set_text(text_1, NODES.length);
        $.set_attribute(svg, "viewBox", VIEWBOX);
        styles = $.set_style(div_5, "", styles, { width: `${$.get(completedIds).length / NODES.length * 100}%` });
      });
      $.append($$anchor2, div);
    };
    $.if(node_1, ($$render) => {
      if ($.get(loaded)) $$render(consequent_8);
    });
  }
  $.append($$anchor, fragment);
  $.pop();
}
$.delegate(["click", "keydown"]);
export {
  RustlingsBox as default
};
