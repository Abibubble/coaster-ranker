#!/bin/bash

# Accessibility Audit for Coaster Ranker
echo "🎢 Accessibility Audit for Coaster Ranker"
echo "=========================================="

# Function to check color contrast
check_color_contrast() {
    echo ""
    echo "🎨 Checking Color Contrast..."

    if [ -f "src/theme/colours.json" ]; then
        node -e "
        const colors = require('./src/theme/colours.json');

        function getLuminance(hex) {
          const rgb = hex.match(/[0-9a-f]{2}/gi).map(x => parseInt(x, 16));
          const sRGB = rgb.map(c => {
            c = c / 255;
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * sRGB[0] + 0.7152 * sRGB[1] + 0.0722 * sRGB[2];
        }

        function getContrastRatio(color1, color2) {
          const lum1 = getLuminance(color1);
          const lum2 = getLuminance(color2);
          const brightest = Math.max(lum1, lum2);
          const darkest = Math.min(lum1, lum2);
          return (brightest + 0.05) / (darkest + 0.05);
        }

        const combinations = [
          ['white', 'black'], ['white', 'darkGrey'], ['white', 'blue'],
          ['white', 'darkBlue'], ['white', 'green'], ['white', 'red']
        ];

        let allPass = true;
        combinations.forEach(([bg, fg]) => {
          if (colors[bg] && colors[fg]) {
            const ratio = getContrastRatio(colors[bg], colors[fg]);
            const status = ratio >= 4.5 ? '✅' : '❌';
            if (ratio < 4.5) allPass = false;
            console.log(\`\${status} \${bg} on \${fg}: \${ratio.toFixed(2)}:1\`);
          }
        });

        console.log(allPass ? '\\n✅ All color combinations pass WCAG AA' : '\\n❌ Some colors fail WCAG AA');
        " 2>/dev/null || echo "⚠️  Could not check colors (colours.json not found or Node.js error)"
    else
        echo "⚠️  Colors file not found - skipping contrast check"
    fi
}

# Function to check accessibility features in code
check_accessibility_features() {
    echo ""
    echo "🔍 Checking Accessibility Features..."

    # Check for essential accessibility features
    features=(
        "aria-label:ARIA labels"
        "role=:ARIA roles"
        "htmlFor:Form labels"
        "alt=:Image alt text"
        "Skip to:Skip links"
        "aria-live:Live regions"
    )

    for feature in "${features[@]}"; do
        pattern="${feature%%:*}"
        name="${feature##*:}"
        count=$(grep -r "$pattern" src/ --include="*.tsx" 2>/dev/null | wc -l || echo 0)
        if [ "$count" -gt 0 ]; then
            echo "✅ $name: $count found"
        else
            echo "❌ $name: Not found"
        fi
    done
}

# Function to check if server is running
check_server() {
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "✅ Development server is running"
        return 0
    else
        echo "⚠️  Development server not running"
        return 1
    fi
}

# Main execution
echo "Starting accessibility audit..."

check_color_contrast
check_accessibility_features

echo ""
echo "🧪 Server-dependent Tests:"
if check_server; then
    echo "   npm run lint:a11y           # ESLint accessibility rules"
    echo "   npm run test:a11y:lighthouse # Lighthouse accessibility audit"
    echo "   npm run test:a11y:axe       # axe-core automated testing"
else
    echo "   Start server first: npm start"
    echo "   Then run: npm run test:a11y"
fi

echo ""
echo "📋 Manual Testing Checklist:"
echo "   - [ ] Tab through all interactive elements"
echo "   - [ ] Test with screen reader (VoiceOver/NVDA)"
echo "   - [ ] Check skip link functionality"
echo "   - [ ] Verify form error announcements"
echo "   - [ ] Test keyboard-only navigation"

echo ""
echo "🏁 Accessibility audit complete!"