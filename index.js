const fs = require('fs');
const js_minifier = require("terser");
const CleanCSS = require('clean-css');

const base_path = "../INGInious/inginious/frontend/plugins";
const UNCode_plugin_path = base_path + "/UNCode/static";
const UN_template_plugin_path = base_path + "/UN_template/static";
const statistics_plugin_path = base_path + "/statistics/static";
const register_students_plugin_path = base_path + "/register_students/static";
const multilang_plugin_path = base_path + "/multilang/static";
const grader_generator_plugin_path = base_path + "/grader_generator/static";
const custom_input_plugin_path = base_path + "/custom_input/static";

function read_file(file_name) {
    return fs.readFileSync(file_name, "utf8");
}

function read_js_files(js_files) {
    let js_code = {};
    js_files.forEach(file => {
        js_code[file] = read_file(file)
    });
    return js_code;
}

function write_file(file_name, data) {
    fs.writeFile(file_name, data, "utf8", (err) => {
        if (err) {
            console.log("There was an error creating file " + file_name);
            return;
        }
        console.log('The file ' + file_name + ' has been saved!');
    });
}

function minify_css_files(css_files, output_file_path, output_file_name) {
    let result = new CleanCSS().minify(css_files);
    if (result.errors.length) {
        console.log("There were some errors while minifying css files: " + result.errors);
    } else {
        write_file(output_file_path + output_file_name + ".min.css", result.styles);
    }
}

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
    const js_files_path = UNCode_plugin_path + "/js/";
    const css_files_path = UNCode_plugin_path + "/css/";
    const js_files = ["task_files_upload_multiple", "uncode"].map(name => {
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
    const js_files_path = UN_template_plugin_path + "/js/";
    const css_files_path = UN_template_plugin_path + "/css/";
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
    const js_files_path = statistics_plugin_path + "/js/";
    const css_files_path = statistics_plugin_path + "/css/";
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
    const js_files_path = register_students_plugin_path + "/js/";
    const css_files_path = register_students_plugin_path + "/css/";
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
    const js_files_path = multilang_plugin_path + "/";
    const css_files_path = multilang_plugin_path + "/";

    console.log("Minify 'multilang' static files.");

    let js_files = ["pythonTutor", "codemirror_linter", "lint"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    minify_js_files(js_files, js_files_path, "tools");

    js_files = ["multilang", "grader"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });
    minify_js_files(js_files, js_files_path, "multilang");

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
    const js_files_path = grader_generator_plugin_path + "/js/";
    const js_files = ["grader_generator"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });

    console.log("Minify 'grader_generator' static files.");

    minify_js_files(js_files, js_files_path, "grader_generator");
}

function minify_custom_input() {
    const js_files_path = custom_input_plugin_path + "/";
    const js_files = ["custom_input"].map(name => {
        return parse_js_files_callback(js_files_path, name)
    });

    console.log("Minify 'custom_input' static files.");

    minify_js_files(js_files, js_files_path, "custom_input");
}

minify_UNCode();
minify_UN_Template();
minify_statistics();
minify_register_students();
minify_multilang();
minify_grader_generator();
minify_custom_input();