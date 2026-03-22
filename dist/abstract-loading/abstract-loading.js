import "svelte/internal/disclose-version";
import * as $ from "svelte/internal/client";
import { onMount } from "svelte";
import * as THREE from "three";
var root = $.from_html(`<main class="svelte-1mekf2t"><button><canvas class="svelte-1mekf2t"></canvas> <div><span class="svelte-1mekf2t"> </span></div></button></main>`);
const $$css = {
  hash: "svelte-1mekf2t",
  code: "main.svelte-1mekf2t {margin:0;padding:0;width:100vw;height:100vh;overflow:hidden;}.wrap.svelte-1mekf2t {position:relative;display:block;width:100%;height:100%;border:none;padding:0;margin:0;background:#0a0a0a;cursor:default;transition:opacity 0.7s ease;}.wrap.svelte-1mekf2t:not(:disabled) {cursor:pointer;}.wrap.completing.svelte-1mekf2t {opacity:0;pointer-events:none;}canvas.svelte-1mekf2t {display:block;width:100%;height:100%;}.continue.svelte-1mekf2t {position:absolute;inset:0;display:flex;align-items:center;justify-content:center;\n        animation: svelte-1mekf2t-fadeIn 1.2s ease both;}.continue.completing.svelte-1mekf2t {opacity:0;transition:opacity 0.5s ease;}.continue.svelte-1mekf2t span:where(.svelte-1mekf2t) {padding:10px 28px;border-radius:24px;background:rgba(0, 0, 0, 0.35);backdrop-filter:blur(12px);color:rgba(255, 255, 255, 0.7);font:300 13px system-ui, sans-serif;letter-spacing:0.35em;pointer-events:none;}\n\n    @keyframes svelte-1mekf2t-fadeIn {\n        from { opacity: 0; }\n        to { opacity: 1; }\n    }"
};
function AbstractLoadingBox($$anchor, $$props) {
  $.push($$props, true);
  $.append_styles($$anchor, $$css);
  const duration = $.derived(() => typeof $$props.ctx.settings.duration === "number" ? $$props.ctx.settings.duration : 15);
  const paletteKey = $.derived(() => typeof $$props.ctx.settings.palette === "string" ? $$props.ctx.settings.palette : "jupiter");
  const speed = $.derived(() => typeof $$props.ctx.settings.speed === "number" ? $$props.ctx.settings.speed : 10);
  const styleKey = $.derived(() => typeof $$props.ctx.settings.style === "string" ? $$props.ctx.settings.style : "diffusion");
  const STYLE_INDEX = { diffusion: 0, vortex: 1 };
  const PALETTE_INDEX = {
    cosmic: 0,
    aurora: 1,
    ember: 2,
    ocean: 3,
    jupiter: 4,
    water: 5
  };
  let canvas;
  let phase = $.state("running");
  function handleTap() {
    if ($.get(phase) !== "ready") return;
    $.set(phase, "completing");
    setTimeout(() => $$props.ctx.complete(), 700);
  }
  const VERT = `void main() { gl_Position = vec4(position, 1.0); }`;
  const FRAG = `
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
  onMount(() => {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const uniforms = {
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2() },
      uPalette: { value: PALETTE_INDEX[$.get(paletteKey)] ?? 4 },
      uSpeed: { value: $.get(speed) / 100 * 0.16 },
      uStyle: { value: STYLE_INDEX[$.get(styleKey)] ?? 0 }
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader: VERT, fragmentShader: FRAG });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), material);
    scene.add(mesh);
    function resize() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w * renderer.getPixelRatio(), h * renderer.getPixelRatio());
    }
    resize();
    window.addEventListener("resize", resize);
    let frame;
    const t0 = performance.now();
    const totalMs = $.get(duration) * 1e3;
    function animate() {
      const elapsed = performance.now() - t0;
      uniforms.uTime.value = elapsed / 1e3;
      if (elapsed >= totalMs && $.get(phase) === "running") $.set(phase, "ready");
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      renderer.dispose();
      material.dispose();
    };
  });
  var main = root();
  var button = $.child(main);
  let classes;
  var canvas_1 = $.child(button);
  $.bind_this(canvas_1, ($$value) => canvas = $$value, () => canvas);
  var div = $.sibling(canvas_1, 2);
  let classes_1;
  var span = $.child(div);
  var text = $.child(span, true);
  $.reset(span);
  $.reset(div);
  $.reset(button);
  $.reset(main);
  $.template_effect(() => {
    classes = $.set_class(button, 1, "wrap svelte-1mekf2t", null, classes, { completing: $.get(phase) === "completing" });
    button.disabled = $.get(phase) === "running";
    classes_1 = $.set_class(div, 1, "continue svelte-1mekf2t", null, classes_1, { completing: $.get(phase) === "completing" });
    $.set_text(text, $.get(phase) === "running" ? "LOADING" : "CONTINUE");
  });
  $.delegated("click", button, handleTap);
  $.append($$anchor, main);
  $.pop();
}
$.delegate(["click"]);
export {
  AbstractLoadingBox as default
};
