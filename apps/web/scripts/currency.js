const fs = require('fs');
const { globSync } = require('glob');

// Use this file as a standalone script to do a regex replace across the whole frontend
// Since the database uses cents, we need `₹{someVar}` to become `₹{(someVar / 100).toFixed(2)}`

const SRC_DIR = './src';

const files = globSync(SRC_DIR + '/**/*.{tsx,ts}');
let modifiedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
        
        // This Regex matches exactly ₹{...} but prevents double-replacing ₹{(.../100)} 
        // We look for ₹{ followed by anything NOT containing / 100 }
        // Simple heuristic regex: ₹\{([^}]+)\}
        // Only replace if the inner content doesn't already contain '/ 100' or 'toFixed'
        const regex = /₹\{([^}]+)\}/g;
        
        const newContent = content.replace(regex, (match, inner) => {
            if (inner.includes('/ 100') || inner.includes('toFixed')) {
                return match; 
            }
            return `₹{(${inner} / 100).toFixed(2)}`;
        });

        if (content !== newContent) {
            fs.writeFileSync(file, newContent);
            modifiedFiles++;
            console.log("Updated", file);
        }
    });
    console.log(`Updated ${modifiedFiles} files.`);
