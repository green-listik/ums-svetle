import svelte from "rollup-plugin-svelte";
import smelte from "smelte/rollup-plugin-smelte"
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import livereload from "rollup-plugin-livereload";
import { terser } from "rollup-plugin-terser";
import sveltePreprocess from "svelte-preprocess";
import typescript from "@rollup/plugin-typescript";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";

const production = !process.env.ROLLUP_WATCH;
const dir = production ? "dist" : "public";

const buildthese = ["", "pages/admin", "pages/form", "pages/login"];

var server = null;
function serve() {
	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('npm', ['run', 'start', '--', '--dev'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

const COMMON = function (mydir, page) {
  return {
    input: "src/" + page + "/main.ts",
    output: {
      sourcemap: !production,
      format: "iife",
      name: "app",
      file: mydir + '/' + page + "/bundle.js",
    },
    plugins: [
      copy({
        targets: [{ src: "src/index.html", dest: mydir + '/' + page }],
      }),
      svelte({
        preprocess: sveltePreprocess({ sourceMap: !production }),
        compilerOptions: {
          dev: !production,
        },
      }),
	  smelte({
		output: mydir + '/global.css',
	  }),
      css({ output: "bundle.css" }),
      resolve({ browser: true }),
      commonjs(),
      typescript({
        sourceMap: !production,
        inlineSources: !production,
      }),
	  !production && serve(),
      !production && livereload(mydir),
      production && terser({ compress: true, mangle: true }),
    ],
    watch: {
      clearScreen: true,
    },
  };
};

const exp = buildthese.map((a) => COMMON(dir, a));

export default exp;
