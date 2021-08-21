# Naming files for Contributors to OneStop

## What is the naming convention for files?
OneStop runs mainly on two platforms as of now, namely Telegram and Discord.

Commands have been separated into two files, one for Telegram and one for Discord.

Files for Telegram are named as `t<command name>.js` and files for Discord are named as `d<command name>.js`.
**Each command has a `.js` extension.**

Telegram files should be placed in the `commands/telegram` directory.

Discord files should be placed in the `commands/discord` directory.

## How can I easily add basic starter code into a new command file?
The `template.js` is a file that contains basic code that can be used as a starting point for a new command.

The code has been separated into a Discord and Telegram Version so copy accordingly and fill in the respective fields and take note of the parameters.