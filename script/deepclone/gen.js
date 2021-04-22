// 随机key
function randomKey() {
  return String(Math.random()).slice(8);
}
// 随机value
function randomValue(flag) {
  const random = Math.random();
  if (random > 0.85) {
    // 数字
    return random * 1000;
  }
  if (random > 0.7) {
    // boolean
    return random > 0.7;
  }
  if (random > 0.55 && !flag) {
    // array
    return new Array(Math.round(Math.random() * 10))
      .fill(0)
      .map(() => randomValue(true));
  }
  if (random > 0.4) {
    // 字符串
    return String(random);
  }
  // if (random > 0.2) {
  //   // date
  //   return new Date();
  // }
  // if (random > 0.1) {
  //   // 包装对象
  //   return new Number(random);
  // }
  // null、undefined
  return random > 0.05 ? null : undefined;
}

// 测试，生成m*n阶对象
const M = 2;
const N = 5;
function gen(source = {}, index = 0) {
  if (index > M) {
    return;
  } else if (index === M) {
    // 最后一层
    for (let i = 0; i < N; i++) {
      source[randomKey()] = randomValue();
    }
  } else {
    // 循环层
    for (let i = 0; i < M; i++) {
      gen((source[randomKey()] = {}), index + 1);
    }
  }
  return source;
}
