import { v3 } from "./twgl-full.module.js";

export function degToRad(angleInDegrees) {
  return angleInDegrees / 180 * Math.PI;
}

export function radToDeg(angleInRadians) {
  return angleInRadians / Math.PI * 180;
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function lerpV3(a, b, t) {
  return v3.lerp(a, b, t);
}

export function clamp(v, min, max) {
  return v < min ? min : (v > max ? max : v);
}


export const randBetween = function (min, max, isGaussian = true) {
  const rand = isGaussian ? randomFromGaussian() : Math.random();
  return rand * (max - min) + min;
};

export const randWithDelta = function (value, delta, isGaussian = true) {
  const rand = (isGaussian ? randomFromGaussian() : Math.random()) - 0.5;
  return value + (rand * delta);
}

export const randWithDeltaV3 = function(value, delta, isGaussian = true) {
  return v3.create(
    randWithDelta(value[0], delta, isGaussian),
    randWithDelta(value[1], delta, isGaussian),
    randWithDelta(value[2], delta, isGaussian)
  );
}

// retorna entre 0 e 1 com distribuição normal (pico em 0.5)
export const randomFromGaussian = function () {
  let u = 0;
  let v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();

  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);
  num = num / 10.0 + 0.5;
  if (num > 1 || num < 0) return randomFromGaussian();

  return num;
}

export const v2 = (function () {
  // adds 1 or more v2s
  function add(a, ...args) {
    const n = a.slice();
    [...args].forEach(p => {
      n[0] += p[0];
      n[1] += p[1];
    });
    return n;
  }

  function sub(a, ...args) {
    const n = a.slice();
    [...args].forEach(p => {
      n[0] -= p[0];
      n[1] -= p[1];
    });
    return n;
  }

  function mult(a, s) {
    if (Array.isArray(s)) {
      let t = s;
      s = a;
      a = t;
    }
    if (Array.isArray(s)) {
      return [
        a[0] * s[0],
        a[1] * s[1],
      ];
    } else {
      return [a[0] * s, a[1] * s];
    }
  }

  function lerp(a, b, t) {
    return [
      a[0] + (b[0] - a[0]) * t,
      a[1] + (b[1] - a[1]) * t,
    ];
  }

  function min(a, b) {
    return [
      Math.min(a[0], b[0]),
      Math.min(a[1], b[1]),
    ];
  }

  function max(a, b) {
    return [
      Math.max(a[0], b[0]),
      Math.max(a[1], b[1]),
    ];
  }

  // compute the distance squared between a and b
  function distanceSq(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return dx * dx + dy * dy;
  }

  // compute the distance between a and b
  function distance(a, b) {
    return Math.sqrt(distanceSq(a, b));
  }

  // compute the distance squared from p to the line segment
  // formed by v and w
  function distanceToSegmentSq(p, v, w) {
    const l2 = distanceSq(v, w);
    if (l2 === 0) {
      return distanceSq(p, v);
    }
    let t = ((p[0] - v[0]) * (w[0] - v[0]) + (p[1] - v[1]) * (w[1] - v[1])) / l2;
    t = Math.max(0, Math.min(1, t));
    return distanceSq(p, lerp(v, w, t));
  }

  // compute the distance from p to the line segment
  // formed by v and w
  function distanceToSegment(p, v, w) {
    return Math.sqrt(distanceToSegmentSq(p, v, w));
  }

  return {
    add: add,
    sub: sub,
    max: max,
    min: min,
    mult: mult,
    lerp: lerp,
    distance: distance,
    distanceSq: distanceSq,
    distanceToSegment: distanceToSegment,
    distanceToSegmentSq: distanceToSegmentSq,
  };
}());
