# 0.0.10

- Cleaned up git history

# 0.0.9

- Translations of readme and changelog
- Removed remote logger

# 0.0.8

- Added unit tests for plugins
- Added new formatter stylish, and option for a flag -f
- Added extender `{% js %} {% endjs %}`

- Plugins:
    - Wrong tab padding on logic brackets (tags-padding)
    - Do not use spaceless tag (no-spaceless)

# 0.0.7

- Fixed `in [` with new line
- Changed twig.js dependency for https://github.com/DKunin/twig.js with smaller package, and minor adjustments.
- Fixed selfclosing tag bug
- Plugins:
    - Prefer camelcase variable naming (prefer-camel-case-vars)

# 0.0.6

- Failed attempt at version update notifier
- Added graphana logger

- Plugins:
    - Do not use closing bracket on selfclosing tags (`\/>`  => `>`) (no-closed-self-closing-tags)

# 0.0.1

- Basic functionality
- Plugins:
    - Warn if there is no only in include function (no-only)
    - Variables declared, but not used (no-unused-vars)
    - Variables used without declaration, or docblock (no-undeclared)