const fs = require('fs');
const js_minifier = require("terser");
const CleanCSS = require('clean-css');

const _BASE_PATH = "../INGInious/inginious/frontend/plugins";
const UNCODE_PLUGIN_PATH = _BASE_PATH + "/UNCode/static";
const UN_TEMPLATE_PLUGIN_PATH = _BASE_PATH + "/UN_template/static";
const STATISTICS_PLUGIN_PATH = _BASE_PATH + "/statistics/static";
const REGISTER_STUDENTS_PLUGIN_PATH = _BASE_PATH + "/register_students/static";
const MULTILANG_PLUGIN_PATH = _BASE_PATH + "/multilang/static";
const GRADER_GENERATOR_PLUGIN_PATH = _BASE_PATH + "/grader_generator/static";
const CUSTOM_INPUT_PLUGIN_PATH = _BASE_PATH + "/custom_input/static";
const CODE_PREVIEW_PLUGIN_PATH = _BASE_PATH + "/code_preview/static"

/**
 * Read file synchronously.
 * @param file_name
 * @returns String containing the read text.
 */
function read_file(file_name) {
    return fs.readFileSync(file_name, "utf8");
}

/**
 * Read all js files.
 * @param js_files Array containing the path of every file.
 * @returns Object where the key is the file path and value is a string with the read file.
 */
function read_js_files(js_files) {
    let js_code = {};
    js_files.forEach(file => {
        js_code[file] = read_file(file)
    });
    return js_code;
}

/**
 * Write file asynchronously with the minified text.
 * @param file_name e.g /INGInious/inginious/frontend/plugins/UNCode/static/js/test.js
 * @param data Minified text to be wrote in the file.
 */
function write_file(file_name, data) {
    fs.writeFile(file_name, data, "utf8", (err) => {
        if (err) {
            console.log("There was an error creating file " + file_name);
            return;
        }
        console.log('The file ' + file_name + ' has been saved!');
    });
}

/**
 * Generates minified text from the given files and writes the result into a new file.
 * @param css_files
 * @param output_file_path Location for the new file.
 * @param output_file_name Name for the new file (Without file extensions).
 */
function minify_css_files(css_files, output_file_path, output_file_name) {
    let result = new CleanCSS().minify(css_files);
    if (result.errors.length) {
        console.log("There were some errors while minifying css files: " + result.errors);
    } else {
        write_file(output_file_path + output_file_name + ".min.css", result.styles);
    }
}

/**
 * Generates minified text from the given files and writes the result into a new file.
 * @param js_files
 * @param output_file_path Location for the new file.
 * @param output_file_name Name for the new file (Without file extensions).
 */
function minify_js_files(js_files, output_file_path, output_file_name) {
    let js_code = read_js_files(js_files);
    let result = js_minifier.minify(js_code);
    if (result.error) {
        console.log("There was an error minifying JS files. Check files name.");
    } else {
        write_file(output_file_path + output_file_name + ".min.js", result.code);
    }
}

function parse_css_files_callback(file_path, name) {
    return file_path + name + ".css";
}

function parse_js_files_callback(file_path, name) {
    return file_path + name + ".js";
}

function minify_UNCode() {
    const js_files_path = UNCODE_PLUGIN_PATH + "/js/";
    const css_files_path = UNCODE_PLUGIN_PATH + "/css/";
    const js_files = ["task_files_tab", "uncode"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    const css_files = ["uncode"].map(name => {
        return parse_css_files_callback(css_files_path, name)
    });

    console.log("Minify 'UNCode' static files.");

    minify_js_files(js_files, js_files_path, "UNCode");

    minify_css_files(css_files, css_files_path, "UNCode");
}

function minify_UN_Template() {
    const js_files_path = UN_TEMPLATE_PLUGIN_PATH + "/js/";
    const css_files_path = UN_TEMPLATE_PLUGIN_PATH + "/css/";
    const js_files = ["unal"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    const css_files = ["reset", "unal", "base", "tablet", "phone", "small", "printer", "new_unal"].map(name => {
        return parse_css_files_callback(css_files_path, name)
    });

    console.log("Minify 'UN_template' static files.");

    minify_js_files(js_files, js_files_path, "unal");

    minify_css_files(css_files, css_files_path, "UN_template");
}

function minify_statistics() {
    const js_files_path = STATISTICS_PLUGIN_PATH + "/js/";
    const css_files_path = STATISTICS_PLUGIN_PATH + "/css/";
    const css_files = ["statistics"].map(name => {
        return parse_css_files_callback(css_files_path, name)
    });

    console.log("Minify 'statistics' static files.");

    minify_css_files(css_files, css_files_path, "statistics");

    let js_files = ["statistics", "course_admin_statistics"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    minify_js_files(js_files, js_files_path, "course_admin_statistics");

    js_files = ["statistics", "user_statistics"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    minify_js_files(js_files, js_files_path, "user_statistics");
}

function minify_register_students() {
    const js_files_path = REGISTER_STUDENTS_PLUGIN_PATH + "/js/";
    const css_files_path = REGISTER_STUDENTS_PLUGIN_PATH + "/css/";
    const js_files = ["register"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    const css_files = ["register_students"].map(name => {
        return parse_css_files_callback(css_files_path, name)
    });

    console.log("Minify 'register_students' static files.");

    minify_js_files(js_files, js_files_path, "register");

    minify_css_files(css_files, css_files_path, "register_students");
}

function minify_multilang() {
    const js_files_path = MULTILANG_PLUGIN_PATH + "/";
    const css_files_path = MULTILANG_PLUGIN_PATH + "/";

    console.log("Minify 'multilang' static files.");

    let js_files = ["pythonTutor", "codemirror_linter", "lint"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    minify_js_files(js_files, js_files_path, "tools");

    js_files = ["multilang", "grader"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    minify_js_files(js_files, js_files_path, "multilang");

    js_files = ["hdlgrader"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    minify_js_files(js_files, js_files_path, "hdlgrader");

    let css_files = ["lint"].map(name => {
        return parse_css_files_callback(css_files_path, name)
    });
    minify_css_files(css_files, css_files_path, "tools");

    css_files = ["multilang"].map(name => {
        return parse_css_files_callback(css_files_path, name)
    });
    minify_css_files(css_files, css_files_path, "multilang");
}

function minify_grader_generator() {
    const js_files_path = GRADER_GENERATOR_PLUGIN_PATH + "/js/";
    const js_files = ["grader_generator", "notebook_grader_generator"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });

    console.log("Minify 'grader_generator' static files.");

    minify_js_files(js_files, js_files_path, "grader_generator");
}

function minify_custom_input() {
    const js_files_path = CUSTOM_INPUT_PLUGIN_PATH + "/";
    const js_files = ["custom_input"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });

    console.log("Minify 'custom_input' static files.");

    minify_js_files(js_files, js_files_path, "custom_input");
}

function minify_code_preview() {
	const js_files_path = CODE_PREVIEW_PLUGIN_PATH + "/js/";
	const js_files = ["code_preview_load"].map(name => {
		return parse_js_files_callback(js_files_path, name)
	});

	console.log("Minfy 'code_preview' static files.");

	minify_js_files(js_files, js_files_path, "code_preview_load")

}

minify_UNCode();
minify_UN_Template();
minify_statistics();
minify_register_students();
minify_multilang();
minify_grader_generator();
minify_custom_input();
minify_code_preview();
