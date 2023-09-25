import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  // resolve: {
  //   alias: [
  //     { find: "@", replacement: path.resolve(__dirname, "./src") },
  //     { find: "@root", replacement: path.resolve(__dirname, "./") },
  //   ],
  // },
  server: {
    proxy: {
      "/api": {
        target: "https://mail-jni1wj8g9-ohiienko-r.vercel.app/",
      },
    },
  },
});
