# TwigLint [WIP][ALPHA]

Twig templates linter

# Install

```bash

    npm install twiglint -g

```

# Usage

```bash
    Usage
      $ twiglint <filename>

    Options
      -s, --silent Show only errors
      -f, --format Use a specific output format - default: stylish [compact]
      -d, --debug Write debug file, and prepend every check with filename
      -h, --help  This help
```

# Rules to be included

For now rules are hardwired, there will be configurable config, and external plugins in the future

- [x] Warn if there is no only in include function (no-only)
- [x] Variables declared, but not used (no-unused-vars)
- [x] Variables used without declaration, or docblock (no-undeclared)
- [x] Do not use closing bracket on selfclosing tags (`\/>`  => `>`) (no-closed-self-closing-tags)
- [x] Prefer camelcase variable naming (prefer-camel-case-vars)
- [x] Do not use spaceless tag (no-spaceless)
- [x] Wrong tab padding on logic brackets (tags-padding)
- [ ] use staticUrl functions for resources
- [ ] Spelling

# Roadmap

- [x] Write tests for plugins
- [x] Maximum usage of the parser
- [x] Visual reporter with the ability to jump to the needed line (compact)
- [x] Plugins as seperate modules
- [ ] Write pluggable logic for external pluginx
- [ ] Allow to use local config
- [ ] cli testing
- [ ] Sublime/VSCode/PhpStorm extentions

# Known Bugs

- [ ] Doesn't understand include with objects

# Docblock formatting

    {# @param {string} imageLink #}
    {# @param {string} view_change_uri  #}
    {# @param {int} user_location_id #}

or

    {# 
        @param {string} imageLink
        @param {string} view_change_uri 
        @param {int} user_location_id 
    #}

# License

MIT