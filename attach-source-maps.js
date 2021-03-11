let fs = require('fs');
let path = require('path');

const TARGET_DIR = 'www';

function getFiles() {
  return fs.readdirSync(TARGET_DIR);
}

function addBase64SourceMaps() {
  console.log('===========================');
  console.log('attaching bas64 source maps');
  console.log('===========================');

  getFiles().forEach(file => {
    const mapFile = path.join(TARGET_DIR, file + '.map');
    const targetFile = path.join(TARGET_DIR, file);
    if (path.extname(file) === '.js' && fs.existsSync(mapFile)) {
      const bufMap = fs.readFileSync(mapFile).toString('base64');
      const bufFile = fs.readFileSync(targetFile, "utf8");
      const result = bufFile.replace('sourceMappingURL=' + file + '.map', 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + bufMap);
      fs.writeFileSync(targetFile, result);
    }
  });
}

function deleteSourceMaps() {
  console.log('===========================');
  console.log('deleteing source map files ');
  console.log('===========================');

  fs.readdirSync(TARGET_DIR).filter(f => path.extname(f) === '.map').forEach((file) => {
    const targetFile = path.join(TARGET_DIR, file);
    fs.unlinkSync(targetFile);
  });
}

const shellScript = `
APP_PATH="\${TARGET_BUILD_DIR}/\${WRAPPER_NAME}"

# This script loops through the frameworks embedded in the application and
# removes unused architectures.
find "$APP_PATH" -name '*.framework' -type d | while read -r FRAMEWORK
do
FRAMEWORK_EXECUTABLE_NAME=$(defaults read "$FRAMEWORK/Info.plist" CFBundleExecutable)
FRAMEWORK_EXECUTABLE_PATH="$FRAMEWORK/$FRAMEWORK_EXECUTABLE_NAME"
echo "Executable is $FRAMEWORK_EXECUTABLE_PATH"

EXTRACTED_ARCHS=()

for ARCH in $ARCHS
do
echo "Extracting $ARCH from $FRAMEWORK_EXECUTABLE_NAME"
lipo -extract "$ARCH" "$FRAMEWORK_EXECUTABLE_PATH" -o "$FRAMEWORK_EXECUTABLE_PATH-$ARCH"
EXTRACTED_ARCHS+=("$FRAMEWORK_EXECUTABLE_PATH-$ARCH")
done

echo "Merging extracted architectures: \${ARCHS}"
lipo -o "$FRAMEWORK_EXECUTABLE_PATH-merged" -create "\${EXTRACTED_ARCHS[@]}"
rm "\${EXTRACTED_ARCHS[@]}"

echo "Replacing original executable with thinned version"
rm "$FRAMEWORK_EXECUTABLE_PATH"
mv "$FRAMEWORK_EXECUTABLE_PATH-merged" "$FRAMEWORK_EXECUTABLE_PATH"

done
`;

function removeUnwantedArchitectures(context) {
  const projectDir = path.resolve(context.opts.projectRoot, 'platforms/ios');
    if ( !fs.existsSync(projectDir) ) {
        console.warn(
            `\nDirectory ${projectDir} does not exist, skipping removal of unwanted ios architectures.\n\n Did you run 'ionic cordova platform add ios'?`
        );
        return;
    }

    console.log('===========================');
    console.log('Removing unwanted arhitectures');
    console.log('===========================');

    const xcode = require('xcode');
    const dirContent = fs.readdirSync(projectDir);
    const matchingProjectFiles = dirContent.filter(filePath => /.*\.xcodeproj/gi.test(filePath));
    const projectPath = path.join(projectDir, matchingProjectFiles[0], 'project.pbxproj');

    const project = xcode.project(projectPath);

    project.parse(error => {
        if (error) {
            console.error('Failed to parse project', error);
            process.exit(1);
        }
        const options = {
            shellPath: '/bin/sh',
            shellScript,
            inputPaths: ['"$(BUILT_PRODUCTS_DIR)/$(INFOPLIST_PATH)"']
        };
        project.addBuildPhase(
            [],
            'PBXShellScriptBuildPhase',
            'Remove Unused Architectures',
            project.getFirstTarget().uuid,
            options
        );
        fs.writeFileSync(projectPath, project.writeSync());

        console.log('Completed removing unwanted arhitectures');
    })
}


module.exports = function (ctx) {
  if (ctx.argv.includes('--release')) {
    // deleteSourceMaps();
    removeUnwantedArchitectures(ctx);
  } else {
    addBase64SourceMaps();
  }
};