// const body = document.querySelector("body");
// const MIN_DURATION = 10;
// const MAX_SNOWFLAKES = 30;
// let activeSnowflakes = 0;

// function makeSnowflake() {
//   if (activeSnowflakes >= MAX_SNOWFLAKES) {
//     return;
//   }
//   activeSnowflakes++;
//   const snowflake = document.createElement("div");
//   const delay = Math.random() * 10;
//   const initialOpacity = Math.random();
//   const duration = Math.random() * 20 + MIN_DURATION;
//   snowflake.classList.add("snowflake");
//   snowflake.style.left = `${Math.random() * window.screen.width}px`;
//   snowflake.style.animationDelay = `${delay}s`;
//   snowflake.style.opacity = initialOpacity;
//   snowflake.style.animationDelay = `fall ${duration}s linear`;
//
//   body.appendChild(snowflake);
//
//   setTimeout(
//     () => {
//       body.removeChild(snowflake);
//       activeSnowflakes--;
//       makeSnowflake();
//     },
//     (duration + delay) * 1000,
//   );
// }
// // 초기 snowflake 생성
// makeSnowflake();
//
// // 추가적인 snowflake 생성
// setInterval(() => {
//   if (activeSnowflakes < MAX_SNOWFLAKES) {
//     makeSnowflake();
//   }
// }, 1000); // 1초 간격으로 변경

// makeSnowflake();
// for (let i = 0; i < 20; i++) {
//   setTimeout(makeSnowflake, 500 * i);
// }
