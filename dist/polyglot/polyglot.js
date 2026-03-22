import "svelte/internal/disclose-version";
import * as $ from "svelte/internal/client";
import { onMount } from "svelte";
var root_1 = $.from_html(`<div class="center-state svelte-12q00nq"><div class="spinner svelte-12q00nq"></div> <p class="loading-text svelte-12q00nq">Generating problem…</p></div>`);
var root_3 = $.from_html(`<span> </span>`);
var root_4 = $.from_html(`<p class="prompt-text svelte-12q00nq">What does this print?</p> <div class="answer-row svelte-12q00nq"><input type="text" class="answer-input svelte-12q00nq" placeholder="…" autocomplete="off" spellcheck="false"/> <button class="btn-run svelte-12q00nq">Submit</button></div> <button class="btn-skip svelte-12q00nq">Skip</button>`, 1);
var root_6 = $.from_html(`<div class="diff svelte-12q00nq"><div class="diff-row svelte-12q00nq"><span class="diff-label svelte-12q00nq">Expected</span> <code class="diff-val svelte-12q00nq"> </code></div> <div class="diff-row svelte-12q00nq"><span class="diff-label svelte-12q00nq">Yours</span> <code class="diff-val yours svelte-12q00nq"> </code></div></div>`);
var root_5 = $.from_html(`<div><span class="result-icon svelte-12q00nq"> </span> <span class="result-word svelte-12q00nq"> </span></div> <!> <div class="explanation svelte-12q00nq"><span class="concept svelte-12q00nq"> </span> <p class="svelte-12q00nq"> </p></div> <div class="actions svelte-12q00nq"><button class="btn-ghost svelte-12q00nq">Next problem</button> <button class="btn-run svelte-12q00nq">Continue</button></div>`, 1);
var root_2 = $.from_html(`<div class="content svelte-12q00nq"><div class="header svelte-12q00nq"><div class="lang-badge svelte-12q00nq"><span class="lang-dot svelte-12q00nq"></span> <span class="lang-name svelte-12q00nq"> </span> <span class="tier-pill svelte-12q00nq"> </span></div> <!></div> <div class="code-block svelte-12q00nq"><pre class="svelte-12q00nq"><code class="svelte-12q00nq"> </code></pre></div> <!> <p class="footer-stats svelte-12q00nq"> </p></div>`);
var root = $.from_html(`<div class="polyglot svelte-12q00nq"><!></div>`);
const $$css = {
  hash: "svelte-12q00nq",
  code: ".polyglot.svelte-12q00nq {position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#080808;color:#c8c0b8;font-family:'DM Sans', 'IBM Plex Sans', system-ui, sans-serif;overflow-y:auto;}.center-state.svelte-12q00nq {display:flex;flex-direction:column;align-items:center;gap:14px;}.spinner.svelte-12q00nq {width:22px;height:22px;border:2px solid rgba(255, 255, 255, 0.08);border-top-color:var(--lang, #666);border-radius:50%;\n		animation: svelte-12q00nq-spin 0.6s linear infinite;}\n\n	@keyframes svelte-12q00nq-spin { to { transform: rotate(360deg); } }.loading-text.svelte-12q00nq {font-size:13px;color:#444;margin:0;}.content.svelte-12q00nq {width:100%;max-width:540px;padding:40px 28px;display:flex;flex-direction:column;gap:14px;}.header.svelte-12q00nq {display:flex;align-items:center;justify-content:space-between;}.lang-badge.svelte-12q00nq {display:flex;align-items:center;gap:8px;}.lang-dot.svelte-12q00nq {width:8px;height:8px;border-radius:50%;background:var(--lang);box-shadow:0 0 6px color-mix(in srgb, var(--lang) 40%, transparent);}.lang-name.svelte-12q00nq {font-size:14px;font-weight:600;color:var(--lang);}.tier-pill.svelte-12q00nq {font-family:'JetBrains Mono', 'Fira Code', monospace;font-size:10px;color:#555;background:rgba(255, 255, 255, 0.03);border:1px solid rgba(255, 255, 255, 0.06);padding:2px 8px;border-radius:4px;}.tier-delta.svelte-12q00nq {font-family:'JetBrains Mono', monospace;font-size:11px;font-weight:500;}.tier-delta.up.svelte-12q00nq {color:#4caf50;}.tier-delta.down.svelte-12q00nq {color:#ce422b;}\n\n	/* ── code block ── */.code-block.svelte-12q00nq {background:#0c0c0c;border:1px solid rgba(255, 255, 255, 0.05);border-left:3px solid var(--lang);border-radius:8px;overflow:hidden;}.code-block.svelte-12q00nq pre:where(.svelte-12q00nq) {margin:0;padding:18px 20px;overflow-x:auto;}.code-block.svelte-12q00nq code:where(.svelte-12q00nq) {font-family:'JetBrains Mono', 'Fira Code', 'SF Mono', monospace;font-size:13px;line-height:1.7;color:#bbb5ad;}\n\n	/* ── answering ── */.prompt-text.svelte-12q00nq {font-size:13px;color:#555;margin:4px 0 0;}.answer-row.svelte-12q00nq {display:flex;gap:8px;}.answer-input.svelte-12q00nq {flex:1;background:#0c0c0c;border:1px solid rgba(255, 255, 255, 0.07);border-radius:6px;color:#e0e0e0;font-family:'JetBrains Mono', monospace;font-size:14px;padding:10px 14px;outline:none;transition:border-color 150ms ease;}.answer-input.svelte-12q00nq:focus {border-color:var(--lang);}.answer-input.svelte-12q00nq::placeholder {color:#333;}.btn-run.svelte-12q00nq {padding:10px 20px;background:var(--lang);color:#fff;border:none;border-radius:6px;font-size:13px;font-weight:500;cursor:pointer;transition:opacity 150ms ease;flex-shrink:0;}.btn-run.svelte-12q00nq:hover {opacity:0.85;}.btn-skip.svelte-12q00nq {align-self:flex-start;background:none;border:none;color:#444;font-size:11px;cursor:pointer;padding:0;transition:color 150ms ease;}.btn-skip.svelte-12q00nq:hover {color:#888;}\n\n	/* ── result ── */.result.svelte-12q00nq {display:flex;align-items:center;gap:8px;padding:12px 16px;border-radius:8px;}.result.ok.svelte-12q00nq {background:rgba(76, 175, 80, 0.06);border:1px solid rgba(76, 175, 80, 0.12);}.result.fail.svelte-12q00nq {background:rgba(206, 66, 43, 0.06);border:1px solid rgba(206, 66, 43, 0.12);}.result-icon.svelte-12q00nq {font-size:16px;}.result.ok.svelte-12q00nq .result-icon:where(.svelte-12q00nq) {color:#4caf50;}.result.fail.svelte-12q00nq .result-icon:where(.svelte-12q00nq) {color:#ce422b;}.result-word.svelte-12q00nq {font-weight:600;font-size:14px;}.result.ok.svelte-12q00nq .result-word:where(.svelte-12q00nq) {color:#4caf50;}.result.fail.svelte-12q00nq .result-word:where(.svelte-12q00nq) {color:#ce422b;}.diff.svelte-12q00nq {display:flex;flex-direction:column;gap:6px;padding:10px 14px;background:rgba(255, 255, 255, 0.015);border-radius:6px;}.diff-row.svelte-12q00nq {display:flex;align-items:baseline;gap:10px;}.diff-label.svelte-12q00nq {font-size:9px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#444;width:56px;flex-shrink:0;}.diff-val.svelte-12q00nq {font-family:'JetBrains Mono', monospace;font-size:13px;color:#aaa;}.diff-val.yours.svelte-12q00nq {color:#666;text-decoration:line-through;text-decoration-color:rgba(206, 66, 43, 0.3);}.explanation.svelte-12q00nq {padding:12px 16px;background:rgba(255, 255, 255, 0.02);border:1px solid rgba(255, 255, 255, 0.04);border-radius:8px;}.concept.svelte-12q00nq {font-size:11px;font-weight:600;color:var(--lang);text-transform:uppercase;letter-spacing:0.05em;}.explanation.svelte-12q00nq p:where(.svelte-12q00nq) {margin:6px 0 0;font-size:13px;color:#777;line-height:1.6;}.actions.svelte-12q00nq {display:flex;justify-content:space-between;gap:8px;}.btn-ghost.svelte-12q00nq {padding:10px 16px;background:transparent;border:1px solid rgba(255, 255, 255, 0.06);border-radius:6px;color:#666;font-size:12px;cursor:pointer;transition:color 150ms ease, border-color 150ms ease;}.btn-ghost.svelte-12q00nq:hover {color:#aaa;border-color:rgba(255, 255, 255, 0.12);}.footer-stats.svelte-12q00nq {font-size:10px;color:#2a2a2a;text-align:center;margin:8px 0 0;font-variant-numeric:tabular-nums;}\n\n	@media (max-width: 480px) {.content.svelte-12q00nq {padding:24px 16px;}\n	}"
};
function PolyglotBox($$anchor, $$props) {
  $.push($$props, true);
  $.append_styles($$anchor, $$css);
  const LANGS = {
    python: { display: "Python", color: "#3572A5" },
    javascript: { display: "JavaScript", color: "#F0DB4F" },
    typescript: { display: "TypeScript", color: "#3178C6" },
    rust: { display: "Rust", color: "#CE422B" },
    go: { display: "Go", color: "#00ADD8" },
    java: { display: "Java", color: "#B07219" },
    c: { display: "C", color: "#A8B9CC" },
    ruby: { display: "Ruby", color: "#CC342D" }
  };
  const DEFAULTS = { tiers: {}, totalCorrect: 0, totalIncorrect: 0 };
  const SCHEMA = {
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
      additionalProperties: false
    }
  };
  let enabledLangs = $.derived(() => Object.keys(LANGS).filter((l) => $$props.ctx.settings[l] !== false));
  let focus = $.derived(() => typeof $$props.ctx.settings.focus === "string" ? $$props.ctx.settings.focus : "mixed");
  let stats = $.state($.proxy({ ...DEFAULTS }));
  let problem = $.state(null);
  let phase = $.state("loading");
  let userAnswer = $.state("");
  let answerCorrect = $.state(null);
  let startTime = $.state(0);
  let prevTier = $.state(0);
  let inputEl = $.state(void 0);
  let langMeta = $.derived(() => $.get(problem) ? LANGS[$.get(problem).language] : null);
  let langColor = $.derived(() => $.get(langMeta)?.color ?? "#666");
  let currentTier = $.derived(() => $.get(problem) ? tierFor($.get(problem).language) : 0);
  function tierFor(lang) {
    return $.get(stats).tiers[lang] ?? 3;
  }
  function adjustTier(lang, correct, fast) {
    let t = tierFor(lang);
    if (correct) {
      t += fast ? 2 : 1;
    } else {
      t -= 1;
    }
    $.get(stats).tiers = { ...$.get(stats).tiers, [lang]: Math.max(1, Math.min(10, t)) };
    if (correct) $.get(stats).totalCorrect++;
    else $.get(stats).totalIncorrect++;
    $.set(stats, { ...$.get(stats) }, true);
    $$props.ctx.state.set("polyglot-stats", $.get(stats));
  }
  async function generateProblem() {
    $.set(phase, "loading");
    $.set(problem, null);
    $.set(userAnswer, "");
    $.set(answerCorrect, null);
    const langs = $.get(enabledLangs).length > 0 ? $.get(enabledLangs) : ["python"];
    const lang = langs[Math.floor(Math.random() * langs.length)];
    const tier = tierFor(lang);
    const meta = LANGS[lang];
    const system = `You generate "What does this print?" programming challenges.

TIER ${tier}/10:
1-3: Basic syntax — variables, arithmetic, string ops, simple loops
4-6: Language features — closures, iterators, type system, standard library
7-8: Edge cases — coercion, scoping gotchas, subtle behaviors
9-10: Expert — obscure spec behavior, complex feature interactions

RULES:
- Self-contained ${meta.display} code, 3-12 lines, no comments
- Exactly one print/output statement producing the answer
- Output must be a single line
- Answer: exactly what gets printed (visible text only)
- Concept: 2-5 word name for the feature tested
- Explanation: 2-3 sentences teaching WHY
- VERIFY your answer by tracing execution step by step`;
    const prompt = `Generate a ${$.get(focus)} problem for ${meta.display} at tier ${tier}.`;
    const result = await $$props.ctx.ai.generateJson(system, prompt, SCHEMA, { maxTokens: 400, timeoutMs: 1e4 });
    if (!result?.code || !result?.answer) return;
    $.set(
      problem,
      {
        kind: "output",
        language: lang,
        concept: result.concept,
        code: result.code,
        answer: result.answer,
        explanation: result.explanation
      },
      true
    );
    $.set(phase, "answering");
    $.set(startTime, Date.now(), true);
    setTimeout(() => $.get(inputEl)?.focus(), 50);
  }
  function submit() {
    if (!$.get(problem) || $.get(phase) !== "answering") return;
    $.set(prevTier, tierFor($.get(problem).language), true);
    const correct = $.get(userAnswer).trim() === $.get(problem).answer.trim();
    $.set(answerCorrect, correct);
    adjustTier($.get(problem).language, correct, Date.now() - $.get(startTime) < 3e4);
    $.set(phase, "result");
  }
  function onKeydown(e) {
    if (e.key === "Enter") submit();
  }
  onMount(async () => {
    const saved = await $$props.ctx.state.get("polyglot-stats");
    if (saved) $.set(stats, { ...DEFAULTS, ...saved }, true);
    generateProblem();
  });
  var div = root();
  let styles;
  var node = $.child(div);
  {
    var consequent = ($$anchor2) => {
      var div_1 = root_1();
      $.append($$anchor2, div_1);
    };
    var consequent_4 = ($$anchor2) => {
      var div_2 = root_2();
      var div_3 = $.child(div_2);
      var div_4 = $.child(div_3);
      var span = $.sibling($.child(div_4), 2);
      var text = $.child(span, true);
      $.reset(span);
      var span_1 = $.sibling(span, 2);
      var text_1 = $.child(span_1);
      $.reset(span_1);
      $.reset(div_4);
      var node_1 = $.sibling(div_4, 2);
      {
        var consequent_1 = ($$anchor3) => {
          var span_2 = root_3();
          let classes;
          var text_2 = $.child(span_2);
          $.reset(span_2);
          $.template_effect(() => {
            classes = $.set_class(span_2, 1, "tier-delta svelte-12q00nq", null, classes, {
              up: $.get(currentTier) > $.get(prevTier),
              down: $.get(currentTier) < $.get(prevTier)
            });
            $.set_text(text_2, `${$.get(prevTier) ?? ""} → ${$.get(currentTier) ?? ""}`);
          });
          $.append($$anchor3, span_2);
        };
        $.if(node_1, ($$render) => {
          if ($.get(phase) === "result" && $.get(prevTier) !== $.get(currentTier)) $$render(consequent_1);
        });
      }
      $.reset(div_3);
      var div_5 = $.sibling(div_3, 2);
      var pre = $.child(div_5);
      var code = $.child(pre);
      var text_3 = $.child(code, true);
      $.reset(code);
      $.reset(pre);
      $.reset(div_5);
      var node_2 = $.sibling(div_5, 2);
      {
        var consequent_2 = ($$anchor3) => {
          var fragment = root_4();
          var div_6 = $.sibling($.first_child(fragment), 2);
          var input = $.child(div_6);
          $.remove_input_defaults(input);
          $.bind_this(input, ($$value) => $.set(inputEl, $$value), () => $.get(inputEl));
          var button = $.sibling(input, 2);
          $.reset(div_6);
          var button_1 = $.sibling(div_6, 2);
          $.delegated("keydown", input, onKeydown);
          $.bind_value(input, () => $.get(userAnswer), ($$value) => $.set(userAnswer, $$value));
          $.delegated("click", button, submit);
          $.delegated("click", button_1, () => $$props.ctx.complete());
          $.append($$anchor3, fragment);
        };
        var alternate = ($$anchor3) => {
          var fragment_1 = root_5();
          var div_7 = $.first_child(fragment_1);
          let classes_1;
          var span_3 = $.child(div_7);
          var text_4 = $.child(span_3, true);
          $.reset(span_3);
          var span_4 = $.sibling(span_3, 2);
          var text_5 = $.child(span_4, true);
          $.reset(span_4);
          $.reset(div_7);
          var node_3 = $.sibling(div_7, 2);
          {
            var consequent_3 = ($$anchor4) => {
              var div_8 = root_6();
              var div_9 = $.child(div_8);
              var code_1 = $.sibling($.child(div_9), 2);
              var text_6 = $.child(code_1, true);
              $.reset(code_1);
              $.reset(div_9);
              var div_10 = $.sibling(div_9, 2);
              var code_2 = $.sibling($.child(div_10), 2);
              var text_7 = $.child(code_2, true);
              $.reset(code_2);
              $.reset(div_10);
              $.reset(div_8);
              $.template_effect(() => {
                $.set_text(text_6, $.get(problem).answer);
                $.set_text(text_7, $.get(userAnswer) || "(empty)");
              });
              $.append($$anchor4, div_8);
            };
            $.if(node_3, ($$render) => {
              if (!$.get(answerCorrect)) $$render(consequent_3);
            });
          }
          var div_11 = $.sibling(node_3, 2);
          var span_5 = $.child(div_11);
          var text_8 = $.child(span_5, true);
          $.reset(span_5);
          var p = $.sibling(span_5, 2);
          var text_9 = $.child(p, true);
          $.reset(p);
          $.reset(div_11);
          var div_12 = $.sibling(div_11, 2);
          var button_2 = $.child(div_12);
          var button_3 = $.sibling(button_2, 2);
          $.reset(div_12);
          $.template_effect(() => {
            classes_1 = $.set_class(div_7, 1, "result svelte-12q00nq", null, classes_1, { ok: $.get(answerCorrect), fail: !$.get(answerCorrect) });
            $.set_text(text_4, $.get(answerCorrect) ? "✓" : "✗");
            $.set_text(text_5, $.get(answerCorrect) ? "Correct" : "Not quite");
            $.set_text(text_8, $.get(problem).concept);
            $.set_text(text_9, $.get(problem).explanation);
          });
          $.delegated("click", button_2, generateProblem);
          $.delegated("click", button_3, () => $$props.ctx.complete());
          $.append($$anchor3, fragment_1);
        };
        $.if(node_2, ($$render) => {
          if ($.get(phase) === "answering") $$render(consequent_2);
          else $$render(alternate, -1);
        });
      }
      var p_1 = $.sibling(node_2, 2);
      var text_10 = $.child(p_1);
      $.reset(p_1);
      $.reset(div_2);
      $.template_effect(() => {
        $.set_text(text, $.get(langMeta)?.display);
        $.set_text(text_1, `Lv. ${$.get(currentTier) ?? ""}`);
        $.set_text(text_3, $.get(problem).code);
        $.set_text(text_10, `${$.get(stats).totalCorrect ?? ""} correct · ${$.get(stats).totalIncorrect ?? ""} incorrect`);
      });
      $.append($$anchor2, div_2);
    };
    $.if(node, ($$render) => {
      if ($.get(phase) === "loading") $$render(consequent);
      else if ($.get(problem)) $$render(consequent_4, 1);
    });
  }
  $.reset(div);
  $.template_effect(() => styles = $.set_style(div, "", styles, { "--lang": $.get(langColor) }));
  $.append($$anchor, div);
  $.pop();
}
$.delegate(["keydown", "click"]);
export {
  PolyglotBox as default
};
