# Minify static files

Repository with program to minify static files on plugins in INGInious repository.

Program done in Node JS. Where it takes the different JS and CSS files and creates the minified file.

**PROGRAM DONE ONLY FOR DEVELOPERS.**

The plugins being minified are:
- Custom input.
- Grader generator.
- UNCOde.
- UN template.
- Statistics.
- Register students.
- Multilang.

This program will create/update the already defined minified files for every plugin.
Bear in mind that some plugins have more than one minified file.

**Note:** If a file changes in INGInious or there is a new file. Make sure to update the corresponding plugin function.

### How to run

Download or clone this repository where you have the INGInious repository (Not inside the INGInious folder).
 
First of all, check you have installed node, otherwise, proceed to install the latest version before moving forward.

Run the next, inside the folder:
```npm install```

Then
```node index.js```