// admin/index.ts
export { default as extend } from "./extend";

app.initializers.add("luzzardik-third-party-login-only", () => {
  // Imperative-only logic goes here. Keep your settings, permissions,
  // and page registration in extend.ts.
});
